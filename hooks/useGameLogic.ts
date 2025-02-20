'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { GameState, Card, GameCard } from '@/types/game';
import { cardPool, mockGameState } from '@/lib/mock-data';
import { CARDS_TO_SHOW, INITIAL_HAND_SIZE } from '@/constants/game';
import { calculateStaminaGain, convertToGameCard } from '@/utils/gameLogic';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(mockGameState);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isDeckBuilding, setIsDeckBuilding] = useState(true);
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [remainingDeck, setRemainingDeck] = useState<GameCard[]>([]);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);
  const [roundCounter, setRoundCounter] = useState(1);
  const [announcement, setAnnouncement] = useState<{
    message: string | null;
    type: 'phase' | 'effect' | 'damage' | 'heal';
  }>({ message: null, type: 'phase' });

  useEffect(() => {
    const shuffledCards = [...cardPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, CARDS_TO_SHOW);
    setAvailableCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (isPlayerTurn || isDeckBuilding) return;

    const monsterTurn = setTimeout(() => {
      const cardsOnField = gameState.cardsOnField
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card !== null);

      if (cardsOnField.length === 0) {
        setAnnouncement({
          message: 'Monster attacks directly!',
          type: 'phase',
        });

        setTimeout(() => {
          setGameState((prev) => {
            const damage = prev.currentMonster.attack;
            return {
              ...prev,
              playerHealth: Math.max(0, prev.playerHealth - damage),
              battleHistory: [
                ...prev.battleHistory,
                {
                  turn: prev.battleHistory.length + 1,
                  action: 'monster_attack',
                  damageDealt: damage,
                  playerHpLeft: Math.max(0, prev.playerHealth - damage),
                },
              ],
            };
          });
          setAnnouncement({
            message: `Direct Attack: ${gameState.currentMonster.attack} damage!`,
            type: 'damage',
          });
        }, 1000);
      } else {
        const randomIndex = Math.floor(Math.random() * cardsOnField.length);
        const targetCard = cardsOnField[randomIndex];

        if (targetCard && targetCard.card) {
          setAnnouncement({
            message: `Monster attacks ${targetCard.card.name}!`,
            type: 'phase',
          });

          setTimeout(() => {
            handleMonsterAttack(targetCard.index);
          }, 1000);
        }
      }

      setTimeout(() => {
        setAnnouncement({
          message: 'Your Turn',
          type: 'phase',
        });
        const staminaGain = calculateStaminaGain(roundCounter);
        setGameState((prev) => ({
          ...prev,
          playerStamina: Math.min(10, prev.playerStamina + staminaGain),
        }));
        setIsPlayerTurn(true);
      }, 2500);
    }, 1000);

    return () => clearTimeout(monsterTurn);
  }, [isPlayerTurn, isDeckBuilding, roundCounter, gameState]);

  useEffect(() => {
    if (isDeckBuilding) return;

    if (gameState.playerHealth <= 0) {
      setAnnouncement({
        message: 'Game Over!',
        type: 'phase',
      });
      setTimeout(() => {
        setIsDeckBuilding(true);
        setGameState(mockGameState);
        setIsPlayerTurn(true);
        setRoundCounter(1);
      }, 2000);
    } else if (gameState.currentMonster.health <= 0) {
      setAnnouncement({
        message: 'Victory!',
        type: 'phase',
      });
      setTimeout(() => {
        setIsDeckBuilding(true);
        setGameState(mockGameState);
        setIsPlayerTurn(true);
        setRoundCounter(1);
      }, 2000);
    }
  }, [gameState.playerHealth, gameState.currentMonster.health, isDeckBuilding]);

  const handleCardEffect = (card: GameCard, damage: number) => {
    let finalDamage = damage;
    let healAmount = 0;

    if (card.onAttackEffect === 'CRITICAL_STRIKE') {
      if (Math.random() < 0.3) {
        finalDamage *= 2;
        setAnnouncement({
          message: 'Critical Strike!',
          type: 'effect',
        });
      }
    } else if (card.onAttackEffect === 'LIFESTEAL') {
      healAmount = Math.floor(damage * 0.5);
      setAnnouncement({
        message: `Lifesteal: +${healAmount} HP`,
        type: 'heal',
      });
    }

    return { finalDamage, healAmount };
  };

  const handleDefenseEffect = (card: GameCard | undefined) => {
    if (!card) return 0;

    if (card.onDefenseEffect === 'THORNS') {
      setAnnouncement({
        message: 'Thorns Activated!',
        type: 'effect',
      });
      return 2;
    }
    return 0;
  };

  const handleDeadEffect = (card: GameCard) => {
    if (card.onDeadEffect === 'EXPLODE') {
      const explodeDamage = 3;
      setAnnouncement({
        message: 'Card Explodes!',
        type: 'effect',
      });
      return explodeDamage;
    }
    return 0;
  };

  const startGame = (selectedDeck: Card[]) => {
    const shuffledDeck = [...selectedDeck].sort(() => Math.random() - 0.5);
    const initialHand = shuffledDeck
      .slice(0, INITIAL_HAND_SIZE)
      .map(convertToGameCard);
    const remaining = shuffledDeck
      .slice(INITIAL_HAND_SIZE)
      .map(convertToGameCard);

    setGameState((prev) => ({
      ...prev,
      deck: initialHand,
    }));

    setRemainingDeck(remaining);
    setIsDeckBuilding(false);
    setRoundCounter(1);
    setAnnouncement({
      message: 'Battle Start!',
      type: 'phase',
    });
  };

  const drawCard = () => {
    if (remainingDeck.length === 0) {
      toast.error('No more cards to draw!');
      return;
    }

    const [newCard, ...restDeck] = remainingDeck;
    setGameState((prev) => ({
      ...prev,
      deck: [...prev.deck, newCard],
    }));
    setRemainingDeck(restDeck);
  };

  const playCard = (cardIndex: number, slotIndex: number) => {
    if (!isPlayerTurn) return;
    if (gameState.playerStamina < gameState.deck[cardIndex].staminaCost) {
      toast.error('Not enough stamina!');
      return;
    }

    const card = gameState.deck[cardIndex];
    setAnnouncement({
      message: `Playing ${card.name}`,
      type: 'phase',
    });

    setTimeout(() => {
      setGameState((prev) => {
        const newDeck = [...prev.deck];
        newDeck.splice(cardIndex, 1);

        const { finalDamage, healAmount } = handleCardEffect(card, card.attack);

        setTimeout(() => {
          setAnnouncement({
            message: `Dealing ${finalDamage} Damage!`,
            type: 'damage',
          });
        }, 1000);

        if (healAmount > 0) {
          setTimeout(() => {
            setAnnouncement({
              message: `Healing for ${healAmount}!`,
              type: 'heal',
            });
          }, 2000);
        }

        const newMonsterHealth = Math.max(
          0,
          prev.currentMonster.health - finalDamage
        );
        const deadEffectDamage =
          card.currentHealth <= 0 ? handleDeadEffect(card) : 0;
        const finalMonsterHealth = Math.max(
          0,
          newMonsterHealth - deadEffectDamage
        );

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
              action: 'play_card',
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
          type: 'phase',
        });
        setIsPlayerTurn(false);
      }, 3000);
    }, 1000);
  };

  const endTurn = () => {
    if (!isPlayerTurn) return;
    setAnnouncement({
      message: 'Ending Turn...',
      type: 'phase',
    });
    drawCard();
    setRoundCounter((prev) => prev + 1);
    setTimeout(() => {
      setAnnouncement({
        message: "Monster's Turn",
        type: 'phase',
      });
      setIsPlayerTurn(false);
      setSelectedCard(null);
    }, 1500);
  };

  const handleMonsterAttack = (cardIndex: number) => {
    setGameState((prev) => {
      const targetCard = prev.cardsOnField[cardIndex];
      if (!targetCard) return prev;

      const monsterAttack = prev.currentMonster.attack;
      let finalDamage = monsterAttack;
      let healAmount = 0;

      const hasCritical = Math.random() < 0.2;
      if (hasCritical) {
        finalDamage *= 1.5;
        setAnnouncement({
          message: 'Monster Critical Hit!',
          type: 'effect',
        });
      }

      const thornsDamage = handleDefenseEffect(targetCard);
      if (thornsDamage > 0) {
        setAnnouncement({
          message: `Thorns Damage: ${thornsDamage}!`,
          type: 'effect',
        });
      }

      const newHealth = targetCard.currentHealth - finalDamage;
      const updatedCardsOnField = [...prev.cardsOnField];

      if (newHealth <= 0) {
        const deadEffectDamage = handleDeadEffect(targetCard);
        if (deadEffectDamage > 0) {
          const newMonsterHealth = Math.max(
            0,
            prev.currentMonster.health - deadEffectDamage
          );
          prev.currentMonster.health = newMonsterHealth;
        }
        updatedCardsOnField[cardIndex] = null;
        setAnnouncement({
          message: `${targetCard.name} was destroyed!`,
          type: 'damage',
        });
      } else {
        updatedCardsOnField[cardIndex] = {
          ...targetCard,
          currentHealth: newHealth,
        };
        setAnnouncement({
          message: `${targetCard.name} takes ${finalDamage} damage!`,
          type: 'damage',
        });
      }

      const hasLifesteal = Math.random() < 0.3;
      if (hasLifesteal) {
        healAmount = Math.floor(finalDamage * 0.3);
        setAnnouncement({
          message: `Monster Heals for ${healAmount}!`,
          type: 'heal',
        });
      }

      const monsterHealthAfterThorns = Math.max(
        0,
        prev.currentMonster.health - thornsDamage
      );
      const finalMonsterHealth = Math.min(
        monsterHealthAfterThorns + healAmount,
        60
      );

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
            action: 'monster_attack',
            cardId: targetCard.id,
            damageDealt: finalDamage,
            monsterHpLeft: finalMonsterHealth,
          },
        ],
      };
    });
  };

  return {
    gameState,
    setGameState,
    selectedCard,
    setSelectedCard,
    isPlayerTurn,
    setIsPlayerTurn,
    isDeckBuilding,
    setIsDeckBuilding,
    availableCards,
    remainingDeck,
    targetSlot,
    setTargetSlot,
    roundCounter,
    announcement,
    setAnnouncement,
    startGame,
    drawCard,
    playCard,
    endTurn,
    handleMonsterAttack,
  };
}
