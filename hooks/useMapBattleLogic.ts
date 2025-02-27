'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { GameState, Card, GameCard, Boss, Monster } from '@/types/game';
import { INITIAL_HAND_SIZE } from '@/constants/game';
import { calculateStaminaGain, convertToGameCard } from '@/utils/gameLogic';

type GamePhase = 'player' | 'battle' | 'end' | 'monster';

export function useMapBattleLogic(boss: Monster) {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    _id: `boss-battle-${boss.id}`,
    playerId: 'player-1',
    sessionId: `session-${Date.now()}`,
    currentStage: boss.id,
    playerHealth: 40,
    playerStamina: 1,
    deck: [],
    currentBoss: {
      bossId: boss.id,
      health: boss.health,
      attack: boss.attack,
    },
    cardsOnField: Array(10).fill(null),
    battleHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentMonster: boss,
  });

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [remainingDeck, setRemainingDeck] = useState<GameCard[]>([]);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);
  const [roundCounter, setRoundCounter] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('player');
  const [announcement, setAnnouncement] = useState<{
    message: string | null;
    type: 'phase' | 'effect' | 'damage' | 'heal';
  }>({ message: null, type: 'phase' });

  const gameStateRef = useRef(gameState);
  const isPlayerTurnRef = useRef(isPlayerTurn);
  const roundCounterRef = useRef(roundCounter);

  useEffect(() => {
    gameStateRef.current = gameState;
    isPlayerTurnRef.current = isPlayerTurn;
    roundCounterRef.current = roundCounter;
  }, [gameState, isPlayerTurn, roundCounter]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const canPlayAnyCard = useCallback(() => {
    return gameState.deck.some(
      (card) => card.staminaCost <= gameState.playerStamina
    );
  }, [gameState.deck, gameState.playerStamina]);

  const handleCardEffect = useCallback((card: GameCard, damage: number) => {
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
  }, []);

  const handleDefenseEffect = useCallback((card: GameCard | undefined) => {
    if (!card) return 0;

    if (card.onDefenseEffect === 'THORNS') {
      setAnnouncement({
        message: 'Thorns Activated!',
        type: 'effect',
      });
      return 2;
    }
    return 0;
  }, []);

  const handleDeadEffect = useCallback((card: GameCard) => {
    if (card.onDeadEffect === 'EXPLODE') {
      const explodeDamage = 3;
      setAnnouncement({
        message: 'Card Explodes!',
        type: 'effect',
      });
      return explodeDamage;
    }
    return 0;
  }, []);

  const startGame = useCallback(
    (selectedDeck: Card[]) => {
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
        cardsOnField: Array(10).fill(null),
      }));

      setRemainingDeck(remaining);
      setRoundCounter(1);
      setIsPlayerTurn(true);
      setSelectedCard(null);
      setTargetSlot(null);
      setCurrentPhase('player');

      setAnnouncement({
        message: `Battle vs ${boss.name} Start!`,
        type: 'phase',
      });
    },
    [boss.name]
  );

  const drawCard = useCallback(() => {
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
  }, [remainingDeck]);

  const handleBossAttack = useCallback(async () => {
    try {
      const cardsOnField = gameState.cardsOnField
        .slice(0, 5)
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card !== null);

      if (cardsOnField.length === 0) {
        setAnnouncement({
          message: `${boss.name} attacks you directly!`,
          type: 'damage',
        });

        await sleep(1000);

        const bossAttack = gameState.currentBoss.attack;
        const newPlayerHealth = Math.max(
          0,
          gameState.playerHealth - bossAttack
        );

        setGameState((prev) => ({
          ...prev,
          playerHealth: newPlayerHealth,
          battleHistory: [
            ...prev.battleHistory,
            {
              turn: prev.battleHistory.length + 1,
              action: 'monster_attack',
              damageDealt: bossAttack,
              playerHpLeft: newPlayerHealth,
            },
          ],
        }));

        if (newPlayerHealth <= 0) {
          setAnnouncement({
            message: 'Defeat!',
            type: 'phase',
          });
          return;
        }
      } else {
        const randomIndex = Math.floor(Math.random() * cardsOnField.length);
        const { card: targetCard, index: cardIndex } =
          cardsOnField[randomIndex];

        if (!targetCard) return;

        setAnnouncement({
          message: `${boss.name} attacks ${targetCard.name}!`,
          type: 'phase',
        });

        await sleep(1000);

        const bossAttack = gameState.currentBoss.attack;
        let finalDamage = bossAttack;

        const hasCritical = Math.random() < 0.2;
        if (hasCritical) {
          finalDamage *= 1.5;
          setAnnouncement({
            message: 'Boss Critical Hit!',
            type: 'effect',
          });
          await sleep(800);
        }

        const newHealth = targetCard.currentHealth - finalDamage;
        const updatedCardsOnField = [...gameState.cardsOnField];

        if (newHealth <= 0) {
          const deadEffectDamage = handleDeadEffect(targetCard);
          updatedCardsOnField[cardIndex] = null;

          setAnnouncement({
            message: `${targetCard.name} was destroyed!`,
            type: 'damage',
          });

          setGameState((prev) => ({
            ...prev,
            cardsOnField: updatedCardsOnField,
            currentBoss: {
              ...prev.currentBoss,
              health: Math.max(0, prev.currentBoss.health - deadEffectDamage),
            },
            battleHistory: [
              ...prev.battleHistory,
              {
                turn: prev.battleHistory.length + 1,
                action: 'monster_attack',
                cardId: targetCard.id,
                damageDealt: finalDamage,
                monsterHpLeft: prev.currentBoss.health,
              },
            ],
          }));
        } else {
          updatedCardsOnField[cardIndex] = {
            ...targetCard,
            currentHealth: newHealth,
          };

          setAnnouncement({
            message: `${targetCard.name} takes ${finalDamage} damage!`,
            type: 'damage',
          });

          setGameState((prev) => ({
            ...prev,
            cardsOnField: updatedCardsOnField,
            battleHistory: [
              ...prev.battleHistory,
              {
                turn: prev.battleHistory.length + 1,
                action: 'monster_attack',
                cardId: targetCard.id,
                damageDealt: finalDamage,
                monsterHpLeft: prev.currentBoss.health,
              },
            ],
          }));
        }
      }

      await sleep(1000);
      setCurrentPhase('player');
      setIsPlayerTurn(true);

      const nextStamina = calculateStaminaGain(roundCounter + 1);
      setGameState((prev) => ({
        ...prev,
        playerStamina: nextStamina,
      }));

      setAnnouncement({
        message: 'Your Turn',
        type: 'phase',
      });

      drawCard();
    } catch (error) {
      console.error('Error in boss attack:', error);
      setCurrentPhase('player');
      setIsPlayerTurn(true);
    }
  }, [gameState, boss.name, handleDeadEffect, roundCounter, drawCard]);

  const playCard = useCallback(
    (cardIndex: number, slotIndex: number) => {
      if (currentPhase !== 'player') return;

      const currentGameState = gameStateRef.current;
      if (
        currentGameState.playerStamina <
        currentGameState.deck[cardIndex].staminaCost
      ) {
        toast.error('Not enough stamina!');
        return;
      }

      const card = currentGameState.deck[cardIndex];
      setAnnouncement({
        message: `Playing ${card.name}`,
        type: 'phase',
      });

      setGameState((prev) => {
        const newDeck = [...prev.deck];
        newDeck.splice(cardIndex, 1);

        const newCardsOnField = [...prev.cardsOnField];
        newCardsOnField[slotIndex] = card;

        return {
          ...prev,
          deck: newDeck,
          cardsOnField: newCardsOnField,
          playerStamina: prev.playerStamina - card.staminaCost,
        };
      });

      setSelectedCard(null);
      setTargetSlot(null);
    },
    [currentPhase]
  );

  const endTurn = useCallback(async () => {
    if (currentPhase !== 'player') return;

    setCurrentPhase('battle');
    setAnnouncement({
      message: 'Battle Phase',
      type: 'phase',
    });

    await sleep(1000);

    const cardsOnField = gameState.cardsOnField.filter((card) => card !== null);

    for (const card of cardsOnField) {
      if (!card) continue;

      setAnnouncement({
        message: `${card.name} attacks!`,
        type: 'phase',
      });

      await sleep(800);

      const { finalDamage, healAmount } = handleCardEffect(card, card.attack);
      const newBossHealth = Math.max(
        0,
        gameState.currentBoss.health - finalDamage
      );

      setGameState((prev) => ({
        ...prev,
        playerHealth: Math.min(40, prev.playerHealth + healAmount),
        currentBoss: {
          ...prev.currentBoss,
          health: newBossHealth,
        },
        battleHistory: [
          ...prev.battleHistory,
          {
            turn: prev.battleHistory.length + 1,
            action: 'play_card',
            cardId: card.id,
            damageDealt: finalDamage,
            monsterHpLeft: newBossHealth,
          },
        ],
      }));

      setAnnouncement({
        message: `${card.name} deals ${finalDamage} damage!`,
        type: 'damage',
      });

      await sleep(800);

      if (newBossHealth <= 0) {
        setAnnouncement({
          message: 'Victory!',
          type: 'phase',
        });
        return;
      }
    }

    setCurrentPhase('monster');
    setIsPlayerTurn(false);
    setAnnouncement({
      message: `${boss.name}'s Turn`,
      type: 'phase',
    });

    await sleep(1000);
    await handleBossAttack();

    setRoundCounter((prev) => prev + 1);
  }, [currentPhase, gameState, handleCardEffect, handleBossAttack, boss.name]);

  return {
    gameState,
    selectedCard,
    isPlayerTurn,
    targetSlot,
    roundCounter,
    currentPhase,
    announcement,
    canPlayAnyCard,
    setSelectedCard,
    setTargetSlot,
    setAnnouncement,
    startGame,
    playCard,
    endTurn,
  };
}
