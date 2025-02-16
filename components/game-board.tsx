"use client";

import { useEffect, useState } from "react";
import { GameState, Card } from "@/types/game";
import { mockGameState, cardPool } from "@/lib/mock-data";
import { Heart, Shield, Sword } from "lucide-react";
import { toast } from "sonner";
import { PlayerStats } from "./game/player-stats";
import { MonsterDisplay } from "./game/monster-display";
import { PlayArea } from "./game/play-area";
import { BattleHistory } from "./game/battle-history";
import { DeckBuilder } from "./game/deck-builder";
import { GameCard as GameCardComponent } from "./ui/game-card";

const DECK_SIZE = 13;
const INITIAL_HAND_SIZE = 5;
const CARDS_TO_SHOW = 40;

export function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(mockGameState);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isDeckBuilding, setIsDeckBuilding] = useState(true);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [remainingDeck, setRemainingDeck] = useState<Card[]>([]);

  // Initialize available cards
  useEffect(() => {
    const shuffledCards = [...cardPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, CARDS_TO_SHOW);
    setAvailableCards(shuffledCards);
  }, []);

  const handleCardEffect = (card: GameState["deck"][0], damage: number) => {
    let finalDamage = damage;
    let healAmount = 0;

    if (card.onAttackEffect === "CRITICAL_STRIKE") {
      if (Math.random() < 0.3) {
        finalDamage *= 2;
        toast.success("Critical Strike! Double damage!", {
          icon: <Sword className="w-4 h-4 text-yellow-500" />,
        });
      }
    } else if (card.onAttackEffect === "LIFESTEAL") {
      healAmount = Math.floor(damage * 0.5);
      toast.success(`${card.name} lifesteal healed ${healAmount} HP!`, {
        icon: <Heart className="w-4 h-4 text-red-500" />,
      });
    }

    return { finalDamage, healAmount };
  };

  const handleDefenseEffect = (card: GameState["deck"][0]) => {
    if (card.onDefenseEffect === "THORNS") {
      toast.info(`${card.name}'s thorns activated!`, {
        icon: <Shield className="w-4 h-4 text-blue-500" />,
      });
      return 2;
    }
    return 0;
  };

  const handleDeadEffect = (card: GameState["deck"][0]) => {
    if (card.onDeadEffect === "EXPLODE") {
      const explodeDamage = 3;
      toast.warning(`${card.name} explodes dealing ${explodeDamage} damage!`, {
        icon: "💥",
      });
      return explodeDamage;
    }
    return 0;
  };

  const startGame = (selectedDeck: Card[]) => {
    // Shuffle the deck
    const shuffledDeck = [...selectedDeck].sort(() => Math.random() - 0.5);
    
    // Split into initial hand and remaining deck
    const initialHand = shuffledDeck.slice(0, INITIAL_HAND_SIZE);
    const remaining = shuffledDeck.slice(INITIAL_HAND_SIZE);

    setGameState(prev => ({
      ...prev,
      deck: initialHand.map(card => ({
        ...card,
        currentHealth: card.health
      }))
    }));
    
    setRemainingDeck(remaining);
    setIsDeckBuilding(false);
  };

  const drawCard = () => {
    if (remainingDeck.length === 0) {
      toast.error("No more cards to draw!");
      return;
    }

    const [newCard, ...restDeck] = remainingDeck;
    setGameState(prev => ({
      ...prev,
      deck: [...prev.deck, { ...newCard, currentHealth: newCard.health }]
    }));
    setRemainingDeck(restDeck);
  };

  const playCard = (cardIndex: number) => {
    if (!isPlayerTurn) return;
    if (gameState.playerStamina < gameState.deck[cardIndex].staminaCost) {
      toast.error("Not enough stamina!");
      return;
    }

    setGameState((prev) => {
      const card = prev.deck[cardIndex];
      const newDeck = [...prev.deck];
      newDeck.splice(cardIndex, 1);

      const { finalDamage, healAmount } = handleCardEffect(card, card.attack);
      const newMonsterHealth = Math.max(0, prev.currentMonster.health - finalDamage);

      const deadEffectDamage = card.currentHealth <= 0 ? handleDeadEffect(card) : 0;
      const finalMonsterHealth = Math.max(0, newMonsterHealth - deadEffectDamage);

      return {
        ...prev,
        deck: newDeck,
        cardsOnField: [...prev.cardsOnField, card],
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
    setIsPlayerTurn(false);
  };

  const endTurn = () => {
    if (!isPlayerTurn) return;
    drawCard(); // Draw a card at the end of turn
    setIsPlayerTurn(false);
    setSelectedCard(null);
  };

  // Monster's turn
  useEffect(() => {
    if (isPlayerTurn || isDeckBuilding) return;

    const monsterTurn = setTimeout(() => {
      setGameState((prev) => {
        const thornsDamage = prev.cardsOnField.reduce((total, card) => {
          const thornsDmg = handleDefenseEffect(card);
          return total + thornsDmg;
        }, 0);

        if (thornsDamage > 0) {
          toast.info(`Monster took ${thornsDamage} thorns damage from defensive cards!`, {
            icon: <Shield className="w-4 h-4 text-purple-500" />,
          });
        }

        const monsterHealthAfterThorns = Math.max(0, prev.currentMonster.health - thornsDamage);
        
        const monsterAttack = prev.currentMonster.attack;
        let finalDamage = monsterAttack;
        let healAmount = 0;

        const hasLifesteal = Math.random() < 0.3;
        if (hasLifesteal) {
          healAmount = Math.floor(monsterAttack * 0.3);
          toast.warning(`Monster uses Lifesteal - Drains ${healAmount} HP!`, {
            icon: <Heart className="w-4 h-4 text-red-500" />,
          });
        }

        const hasCritical = Math.random() < 0.2;
        if (hasCritical) {
          finalDamage *= 1.5;
          toast.warning(`Monster lands a Critical Hit! (${Math.floor(finalDamage)} damage)`, {
            icon: <Sword className="w-4 h-4 text-yellow-500" />,
          });
        } else {
          toast.warning(`Monster attacks for ${finalDamage} damage!`, {
            icon: <Sword className="w-4 h-4 text-red-500" />,
          });
        }
        
        const newPlayerHealth = Math.max(0, prev.playerHealth - finalDamage);
        const newMonsterHealth = Math.min(prev.currentMonster.health + healAmount, 60);
        const newStamina = Math.min(5, prev.playerStamina + 1);

        return {
          ...prev,
          playerHealth: newPlayerHealth,
          currentMonster: {
            ...prev.currentMonster,
            health: newMonsterHealth,
          },
          playerStamina: newStamina,
          battleHistory: [
            ...prev.battleHistory,
            {
              turn: prev.battleHistory.length + 1,
              action: "monster_attack",
              playerHpLeft: newPlayerHealth,
            },
          ],
        };
      });

      setIsPlayerTurn(true);
    }, 1000);

    return () => clearTimeout(monsterTurn);
  }, [isPlayerTurn, isDeckBuilding]);

  // Check win/lose conditions
  useEffect(() => {
    if (isDeckBuilding) return;

    if (gameState.playerHealth <= 0) {
      toast.error("Game Over! You lost!", {
        icon: "💀",
        duration: 5000,
      });
      setIsDeckBuilding(true);
      setGameState(mockGameState);
      setIsPlayerTurn(true);
    } else if (gameState.currentMonster.health <= 0) {
      toast.success("Victory! Monster defeated!", {
        icon: "🏆",
        duration: 5000,
      });
      setIsDeckBuilding(true);
      setGameState(mockGameState);
      setIsPlayerTurn(true);
    }
  }, [gameState.playerHealth, gameState.currentMonster.health, isDeckBuilding]);

  if (isDeckBuilding) {
    return (
      <DeckBuilder
        availableCards={availableCards}
        onStartGame={startGame}
        deckSize={DECK_SIZE}
      />
    );
  }

  return (
    <div className="h-screen max-h-[1080px] w-full max-w-[1920px] mx-auto bg-gray-100 flex flex-col">
      {/* Boss Area (15% height) */}
      <div className="h-[15%] p-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="h-full flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            {isPlayerTurn ? "Your Turn" : "Monster's Turn"}
          </div>
          <MonsterDisplay
            health={gameState.currentMonster.health}
            attack={gameState.currentMonster.attack}
          />
          <PlayerStats
            health={gameState.playerHealth}
            stamina={gameState.playerStamina}
            stage={gameState.currentStage}
          />
        </div>
      </div>

      {/* Field Area (65% height) */}
      <div className="h-[65%] p-4 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
        <PlayArea
          deck={gameState.deck}
          cardsOnField={gameState.cardsOnField}
          isPlayerTurn={isPlayerTurn}
          playerStamina={gameState.playerStamina}
          selectedCard={selectedCard}
          onCardSelect={setSelectedCard}
          onPlayCard={() => selectedCard !== null && playCard(selectedCard)}
          onEndTurn={endTurn}
        />
      </div>

      {/* Hand Area (20% height) */}
      <div className="h-[20%] p-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="h-full flex items-center justify-center gap-4">
          {gameState.deck.map((card, index) => (
            <div
              key={`hand-${index}`}
              className={`transform transition-all duration-300 hover:translate-y-[-20px] ${
                selectedCard === index ? 'translate-y-[-20px]' : ''
              }`}
              style={{ height: '90%' }}
            >
              <GameCardComponent
                card={card}
                onClick={() => isPlayerTurn && setSelectedCard(index)}
                selected={selectedCard === index}
                disabled={!isPlayerTurn || gameState.playerStamina < card.staminaCost}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}