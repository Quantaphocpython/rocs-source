"use client";

import { useEffect, useState } from "react";
import { GameState, Card, GameCard } from "@/types/game";
import { mockGameState, cardPool } from "@/lib/mock-data";
import { Heart, Sword, Shield, Zap, HelpCircle as QuestionMarkCircle } from "lucide-react";
import { toast } from "sonner";
import { PlayerStats } from "./game/player-stats";
import { MonsterDisplay } from "./game/monster-display";
import { DeckBuilder } from "./game/deck-builder";
import { GameCard as GameCardComponent } from "./ui/game-card";
import { Button } from "./ui/button";
import { TutorialDialog } from "./game/tutorial-dialog";
import { PhaseAnnouncement } from "./game/phase-announcement";
import { BattleStats } from "./game/battle-stats";
import { cn } from "@/lib/utils";

const DECK_SIZE = 13;
const INITIAL_HAND_SIZE = 5;
const CARDS_TO_SHOW = 40;

const CARD_SLOT = {
  width: 100,
  height: 140,
  gap: 16
};

const convertToGameCard = (card: Card): GameCard => ({
  ...card,
  currentHealth: card.health
});

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(mockGameState);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isDeckBuilding, setIsDeckBuilding] = useState(true);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [remainingDeck, setRemainingDeck] = useState<GameCard[]>([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState<{
    message: string | null;
    type: "phase" | "effect" | "damage" | "heal";
  }>({ message: null, type: "phase" });

  useEffect(() => {
    const shuffledCards = [...cardPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, CARDS_TO_SHOW);
    setAvailableCards(shuffledCards);
  }, []);

  const handleCardEffect = (card: GameCard, damage: number) => {
    let finalDamage = damage;
    let healAmount = 0;

    if (card.onAttackEffect === "CRITICAL_STRIKE") {
      if (Math.random() < 0.3) {
        finalDamage *= 2;
        setAnnouncement({
          message: "Critical Strike!",
          type: "effect"
        });
      }
    } else if (card.onAttackEffect === "LIFESTEAL") {
      healAmount = Math.floor(damage * 0.5);
      setAnnouncement({
        message: `Lifesteal: +${healAmount} HP`,
        type: "heal"
      });
    }

    return { finalDamage, healAmount };
  };

  const handleDefenseEffect = (card: GameCard | undefined) => {
    if (!card) return 0;

    if (card.onDefenseEffect === "THORNS") {
      setAnnouncement({
        message: "Thorns Activated!",
        type: "effect"
      });
      return 2;
    }
    return 0;
  };

  const handleDeadEffect = (card: GameCard) => {
    if (card.onDeadEffect === "EXPLODE") {
      const explodeDamage = 3;
      setAnnouncement({
        message: "Card Explodes!",
        type: "effect"
      });
      return explodeDamage;
    }
    return 0;
  };

  const startGame = (selectedDeck: Card[]) => {
    const shuffledDeck = [...selectedDeck].sort(() => Math.random() - 0.5);
    const initialHand = shuffledDeck.slice(0, INITIAL_HAND_SIZE).map(convertToGameCard);
    const remaining = shuffledDeck.slice(INITIAL_HAND_SIZE).map(convertToGameCard);

    setGameState(prev => ({
      ...prev,
      deck: initialHand
    }));

    setRemainingDeck(remaining);
    setIsDeckBuilding(false);
    setAnnouncement({
      message: "Battle Start!",
      type: "phase"
    });
  };

  const drawCard = () => {
    if (remainingDeck.length === 0) {
      toast.error("No more cards to draw!");
      return;
    }

    const [newCard, ...restDeck] = remainingDeck;
    setGameState(prev => ({
      ...prev,
      deck: [...prev.deck, newCard]
    }));
    setRemainingDeck(restDeck);
  };

  const playCard = (cardIndex: number, slotIndex: number) => {
    if (!isPlayerTurn) return;
    if (gameState.playerStamina < gameState.deck[cardIndex].staminaCost) {
      toast.error("Not enough stamina!");
      return;
    }

    const card = gameState.deck[cardIndex];
    setAnnouncement({
      message: `Playing ${card.name}`,
      type: "phase"
    });

    setTimeout(() => {
      setGameState((prev) => {
        const newDeck = [...prev.deck];
        newDeck.splice(cardIndex, 1);

        const { finalDamage, healAmount } = handleCardEffect(card, card.attack);

        setTimeout(() => {
          setAnnouncement({
            message: `Dealing ${finalDamage} Damage!`,
            type: "damage"
          });
        }, 1000);

        if (healAmount > 0) {
          setTimeout(() => {
            setAnnouncement({
              message: `Healing for ${healAmount}!`,
              type: "heal"
            });
          }, 2000);
        }

        const newMonsterHealth = Math.max(0, prev.currentMonster.health - finalDamage);
        const deadEffectDamage = card.currentHealth <= 0 ? handleDeadEffect(card) : 0;
        const finalMonsterHealth = Math.max(0, newMonsterHealth - deadEffectDamage);

        const newCardsOnField = [...prev.cardsOnField];
        newCardsOnField[slotIndex] = card;

        return {
          ...prev,
          deck: newDeck,
          cardsOnField: newCardsOnField,
          playerStamina: prev.playerStamina - card.staminaCost,
          playerHealth: Math.min(40, prev.playerHealth + healAmount),
          battleHistory: [
            ...prev.battleHistory,
            {
              turn: prev.battleHistory.length + 1,
              action: "play_card",
              cardId: card.id,
              damageDealt: finalDamage + deadEffectDamage,
              monsterHpLeft: finalMonsterHealth,
            },
          ],
          currentMonster: {
            ...prev.currentMonster,
            health: finalMonsterHealth,
          },
        };
      });

      setSelectedCard(null);
      setTargetSlot(null);

      setTimeout(() => {
        setAnnouncement({
          message: "Monster's Turn",
          type: "phase"
        });
        setIsPlayerTurn(false);
      }, 3000);
    }, 1000);
  };

  const endTurn = () => {
    if (!isPlayerTurn) return;
    setAnnouncement({
      message: "Ending Turn...",
      type: "phase"
    });
    drawCard();
    setTimeout(() => {
      setAnnouncement({
        message: "Monster's Turn",
        type: "phase"
      });
      setIsPlayerTurn(false);
      setSelectedCard(null);
    }, 1500);
  };

  const handleMonsterAttack = (cardIndex: number) => {
    setGameState(prev => {
      const targetCard = prev.cardsOnField[cardIndex];
      if (!targetCard) return prev;

      const monsterAttack = prev.currentMonster.attack;
      let finalDamage = monsterAttack;
      let healAmount = 0;

      // Monster critical hit chance
      const hasCritical = Math.random() < 0.2;
      if (hasCritical) {
        finalDamage *= 1.5;
        setAnnouncement({
          message: "Monster Critical Hit!",
          type: "effect"
        });
      }

      // Calculate thorns damage
      const thornsDamage = handleDefenseEffect(targetCard);
      if (thornsDamage > 0) {
        setAnnouncement({
          message: `Thorns Damage: ${thornsDamage}!`,
          type: "effect"
        });
      }

      // Update card health
      const newHealth = targetCard.currentHealth - finalDamage;
      const updatedCardsOnField = [...prev.cardsOnField];

      if (newHealth <= 0) {
        // Handle card death
        const deadEffectDamage = handleDeadEffect(targetCard);
        if (deadEffectDamage > 0) {
          const newMonsterHealth = Math.max(0, prev.currentMonster.health - deadEffectDamage);
          prev.currentMonster.health = newMonsterHealth;
        }
        // Remove dead card
        updatedCardsOnField[cardIndex] = null;
        setAnnouncement({
          message: `${targetCard.name} was destroyed!`,
          type: "damage"
        });
      } else {
        // Update card health
        updatedCardsOnField[cardIndex] = {
          ...targetCard,
          currentHealth: newHealth
        };
      }

      // Apply monster lifesteal
      const hasLifesteal = Math.random() < 0.3;
      if (hasLifesteal) {
        healAmount = Math.floor(finalDamage * 0.3);
        setAnnouncement({
          message: `Monster Heals for ${healAmount}!`,
          type: "heal"
        });
      }

      // Update monster health from thorns
      const monsterHealthAfterThorns = Math.max(0, prev.currentMonster.health - thornsDamage);
      const finalMonsterHealth = Math.min(monsterHealthAfterThorns + healAmount, 60);

      return {
        ...prev,
        cardsOnField: updatedCardsOnField,
        currentMonster: {
          ...prev.currentMonster,
          health: finalMonsterHealth,
        },
        battleHistory: [
          ...prev.battleHistory,
          {
            turn: prev.battleHistory.length + 1,
            action: "monster_attack",
            cardId: targetCard.id,
            damageDealt: finalDamage,
            monsterHpLeft: finalMonsterHealth,
          },
        ],
      };
    });
  };

  useEffect(() => {
    if (isPlayerTurn || isDeckBuilding) return;

    const monsterTurn = setTimeout(() => {
      // Get all valid cards on field (non-null)
      const cardsOnField = gameState.cardsOnField
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card !== null);

      if (cardsOnField.length === 0) {
        // If no cards on field, damage player directly
        setGameState(prev => ({
          ...prev,
          playerHealth: Math.max(0, prev.playerHealth - prev.currentMonster.attack),
          battleHistory: [
            ...prev.battleHistory,
            {
              turn: prev.battleHistory.length + 1,
              action: "monster_attack",
              playerHpLeft: Math.max(0, prev.playerHealth - prev.currentMonster.attack),
            },
          ],
        }));
        setAnnouncement({
          message: "Direct Attack on Player!",
          type: "damage"
        });
      } else {
        // Attack a random card
        const randomIndex = Math.floor(Math.random() * cardsOnField.length);
        const targetCard = cardsOnField[randomIndex];

        if (targetCard && targetCard.card) {
          setAnnouncement({
            message: `Monster attacks ${targetCard.card.name}!`,
            type: "phase"
          });

          setTimeout(() => {
            handleMonsterAttack(targetCard.index);
          }, 1000);
        }
      }

      // End monster turn
      setTimeout(() => {
        setAnnouncement({
          message: "Your Turn",
          type: "phase"
        });
        setGameState(prev => ({
          ...prev,
          playerStamina: Math.min(5, prev.playerStamina + 1),
        }));
        setIsPlayerTurn(true);
      }, 2500);
    }, 1000);

    return () => clearTimeout(monsterTurn);
  }, [isPlayerTurn, isDeckBuilding]);

  useEffect(() => {
    if (isDeckBuilding) return;

    if (gameState.playerHealth <= 0) {
      setAnnouncement({
        message: "Game Over!",
        type: "phase"
      });
      setTimeout(() => {
        setIsDeckBuilding(true);
        setGameState(mockGameState);
        setIsPlayerTurn(true);
      }, 2000);
    } else if (gameState.currentMonster.health <= 0) {
      setAnnouncement({
        message: "Victory!",
        type: "phase"
      });
      setTimeout(() => {
        setIsDeckBuilding(true);
        setGameState(mockGameState);
        setIsPlayerTurn(true);
      }, 2000);
    }
  }, [gameState.playerHealth, gameState.currentMonster.health, isDeckBuilding]);

  return (
    <div className="min-h-screen w-full max-w-[1920px] mx-auto bg-black flex flex-col">
      <PhaseAnnouncement
        message={announcement.message}
        type={announcement.type}
        onComplete={() => setAnnouncement({ message: null, type: "phase" })}
      />

      {isDeckBuilding ? (
        <>
          <DeckBuilder
            availableCards={availableCards}
            onStartGame={startGame}
            deckSize={DECK_SIZE}
          />
          <Button
            className="fixed bottom-4 right-4 bg-yellow-900 hover:bg-yellow-800 text-yellow-400 gap-2 border border-yellow-900"
            onClick={() => setIsTutorialOpen(true)}
          >
            <QuestionMarkCircle className="w-4 h-4" />
            How to Play
          </Button>
        </>
      ) : (
        <>
          <div className="h-[15%] relative bg-black border-b border-yellow-900 p-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-black border-x border-b border-yellow-900 rounded-b-lg">
              <div className="text-lg font-medium text-yellow-400">
                {isPlayerTurn ? "Your Turn" : "Monster's Turn"}
              </div>
            </div>

            <div className="h-full flex items-center justify-between">
              <PlayerStats
                health={gameState.playerHealth}
                stamina={gameState.playerStamina}
                stage={gameState.currentStage}
              />
              <Button
                className="absolute top-6 right-6 bg-yellow-900 hover:bg-yellow-800 text-yellow-400 gap-2 border border-yellow-900"
                onClick={() => setIsTutorialOpen(true)}
              >
                <QuestionMarkCircle className="w-4 h-4" />
                How to Play
              </Button>
              <MonsterDisplay
                health={gameState.currentMonster.health}
                attack={gameState.currentMonster.attack}
              />
            </div>
          </div>

          <div className="h-[65%] bg-black relative border-b border-yellow-900">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624559888077-1a829f93c9f8?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-5" />

            <div className="relative h-full flex flex-col p-6">
              <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-4 p-8">
                {[...Array(10)].map((_, index) => {
                  const card = gameState.cardsOnField[index];
                  return (
                    <div
                      key={`slot-${index}`}
                      className={cn(
                        "relative flex items-center justify-center",
                        "border border-yellow-900/20 rounded-lg transition-all duration-300",
                        targetSlot === index && "border-yellow-400 border-2",
                        !card && "hover:border-yellow-900/40",
                        selectedCard !== null && !card && "cursor-pointer"
                      )}
                      style={{
                        width: CARD_SLOT.width,
                        height: CARD_SLOT.height,
                      }}
                      onClick={() => {
                        if (selectedCard !== null && !card) {
                          playCard(selectedCard, index);
                        }
                      }}
                      onMouseEnter={() => {
                        if (selectedCard !== null && !card) {
                          setTargetSlot(index);
                        }
                      }}
                      onMouseLeave={() => {
                        if (targetSlot === index) {
                          setTargetSlot(null);
                        }
                      }}
                    >
                      {card && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GameCardComponent
                            card={card}
                            disabled={true}
                            size="small"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <BattleStats history={gameState.battleHistory} />

              <div className="flex justify-end gap-4 p-6 bg-black/30 border-t border-yellow-900">
                <Button
                  className="bg-yellow-900 hover:bg-yellow-800 text-yellow-400 border border-yellow-900 text-lg px-8 py-3"
                  disabled={!isPlayerTurn || selectedCard === null}
                  onClick={() => selectedCard !== null && targetSlot !== null && playCard(selectedCard, targetSlot)}
                >
                  Play Card
                </Button>
                <Button
                  className="bg-yellow-900 hover:bg-yellow-800 text-yellow-400 border border-yellow-900 text-lg px-8 py-3"
                  disabled={!isPlayerTurn}
                  onClick={endTurn}
                >
                  End Turn
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[20%] bg-black p-6">
            <div className="h-full flex items-center justify-center gap-6">
              {gameState.deck.map((card, index) => (
                <div
                  key={`hand-${index}`}
                  className={cn(
                    "transform transition-all duration-300 hover:-translate-y-4",
                    selectedCard === index && "-translate-y-4 ring-2 ring-yellow-400"
                  )}
                >
                  <GameCardComponent
                    card={card}
                    onClick={() => isPlayerTurn && setSelectedCard(index)}
                    selected={selectedCard === index}
                    disabled={!isPlayerTurn || gameState.playerStamina < card.staminaCost}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <TutorialDialog
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}

export default GameBoard

