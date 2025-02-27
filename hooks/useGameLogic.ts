'use client';

import { INITIAL_HAND_SIZE } from '@/constants/game';
import { mockGameState } from '@/lib/mock-data';
import type { Card, GameCard, GameState } from '@/types/game';
import { calculateStaminaGain, convertToGameCard } from '@/utils/gameLogic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type GamePhase = 'player' | 'battle' | 'end' | 'monster';

export function useGameLogic() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>(mockGameState);
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

  const startGame = useCallback((selectedDeck: Card[]) => {
    const shuffledDeck = [...selectedDeck].sort(() => Math.random() - 0.5);
    const initialHand = shuffledDeck
      .slice(0, INITIAL_HAND_SIZE)
      .map(convertToGameCard);
    const remaining = shuffledDeck
      .slice(INITIAL_HAND_SIZE)
      .map(convertToGameCard);

    setGameState({
      ...mockGameState,
      deck: initialHand,
      cardsOnField: Array(10).fill(null),
    });

    setRemainingDeck(remaining);
    setRoundCounter(1);
    setIsPlayerTurn(true);
    setSelectedCard(null);
    setTargetSlot(null);
    setCurrentPhase('player');

    setAnnouncement({
      message: 'Battle Start!',
      type: 'phase',
    });
  }, []);

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

  const handleMonsterAttack = useCallback(async () => {
    try {
      const cardsOnField = gameState.cardsOnField
        .slice(0, 5)
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card !== null);

      if (cardsOnField.length === 0) {
        setAnnouncement({
          message: 'Monster attacks you directly!',
          type: 'damage',
        });

        await sleep(1000);

        const monsterDamage = gameState.currentMonster.attack;
        const newPlayerHealth = Math.max(
          0,
          gameState.playerHealth - monsterDamage
        );

        setGameState((prev) => ({
          ...prev,
          playerHealth: newPlayerHealth,
          battleHistory: [
            ...prev.battleHistory,
            {
              turn: prev.battleHistory.length + 1,
              action: 'monster_attack',
              damageDealt: monsterDamage,
              playerHpLeft: newPlayerHealth,
            },
          ],
        }));

        if (newPlayerHealth <= 0) {
          setAnnouncement({
            message: 'Game Over!',
            type: 'phase',
          });
          await sleep(2000);
          router.push('/deck');
          return;
        }
      } else {
        const randomIndex = Math.floor(Math.random() * cardsOnField.length);
        const { card: targetCard, index: cardIndex } =
          cardsOnField[randomIndex];

        if (!targetCard) return;

        setAnnouncement({
          message: `Monster attacks ${targetCard.name}!`,
          type: 'phase',
        });

        await sleep(1000);

        const monsterAttack = gameState.currentMonster.attack;
        let finalDamage = monsterAttack;

        // 20% cơ hội đánh chí mạng
        const hasCritical = Math.random() < 0.2;
        if (hasCritical) {
          finalDamage *= 1.5;
          setAnnouncement({
            message: 'Monster Critical Hit!',
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
            currentMonster: {
              ...prev.currentMonster,
              health: Math.max(
                0,
                prev.currentMonster.health - deadEffectDamage
              ),
            },
            battleHistory: [
              ...prev.battleHistory,
              {
                turn: prev.battleHistory.length + 1,
                action: 'monster_attack',
                cardId: targetCard.id,
                damageDealt: finalDamage,
                monsterHpLeft: prev.currentMonster.health,
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
                monsterHpLeft: prev.currentMonster.health,
              },
            ],
          }));
        }
      }

      // Chuyển về lượt người chơi sau khi boss đánh xong
      await sleep(1000);
      setCurrentPhase('player');
      setIsPlayerTurn(true);

      const staminaGain = calculateStaminaGain(roundCounter);
      setGameState((prev) => ({
        ...prev,
        playerStamina: Math.min(10, prev.playerStamina + staminaGain),
      }));

      setAnnouncement({
        message: 'Your Turn',
        type: 'phase',
      });

      drawCard();
    } catch (error) {
      console.error('Error in monster attack:', error);
      // Fallback về lượt người chơi nếu có lỗi
      setCurrentPhase('player');
      setIsPlayerTurn(true);
    }
  }, [gameState, handleDeadEffect, roundCounter, router, drawCard]);

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
    if (currentPhase !== 'player') {
      console.log('❌ Không thể end turn vì không phải lượt player.');
      return;
    }

    console.log('✅ Bắt đầu End Turn.');
    setCurrentPhase('battle');
    setAnnouncement({
      message: 'Battle Phase',
      type: 'phase',
    });

    await sleep(1000);
    console.log('⏳ Đã chờ 1 giây, bắt đầu xử lý quái.');

    const cardsOnField = gameState.cardsOnField.filter((card) => card !== null);
    console.log('🃏 Cards trên field:', cardsOnField);

    for (const card of cardsOnField) {
      if (!card) continue;

      console.log(`⚔️ ${card.name} chuẩn bị tấn công!`);
      setAnnouncement({
        message: `${card.name} attacks!`,
        type: 'phase',
      });

      await sleep(800);

      const { finalDamage, healAmount } = handleCardEffect(card, card.attack);
      console.log(
        `💥 ${card.name} gây sát thương: ${finalDamage}, hồi máu: ${healAmount}`
      );

      const newMonsterHealth = Math.max(
        0,
        gameState.currentMonster.health - finalDamage
      );
      console.log(`🩸 Máu quái còn lại: ${newMonsterHealth}`);

      setGameState((prev) => ({
        ...prev,
        playerHealth: Math.min(40, prev.playerHealth + healAmount),
        currentMonster: {
          ...prev.currentMonster,
          health: newMonsterHealth,
        },
        battleHistory: [
          ...prev.battleHistory,
          {
            turn: prev.battleHistory.length + 1,
            action: 'play_card',
            cardId: card.id,
            damageDealt: finalDamage,
            monsterHpLeft: newMonsterHealth,
          },
        ],
      }));

      setAnnouncement({
        message: `${card.name} deals ${finalDamage} damage!`,
        type: 'damage',
      });

      await sleep(800);

      if (newMonsterHealth <= 0) {
        console.log('🏆 Quái bị đánh bại, chiến thắng!');
        setAnnouncement({
          message: 'Victory!',
          type: 'phase',
        });

        await sleep(2000);
        router.push('/deck');
        return;
      }
    }

    console.log('🛡 Đến lượt quái tấn công.');
    setCurrentPhase('monster');
    setIsPlayerTurn(false);
    setAnnouncement({
      message: "Monster's Turn",
      type: 'phase',
    });

    await sleep(1000);
    await handleMonsterAttack();
    console.log('🔥 Quái đã tấn công xong.');
  }, [currentPhase, gameState, handleCardEffect, handleMonsterAttack, router]);

  useEffect(() => {
    if (gameState.playerHealth <= 0) {
      setAnnouncement({
        message: 'Game Over!',
        type: 'phase',
      });
      setTimeout(() => {
        router.push('/deck');
      }, 2000);
    } else if (gameState.currentMonster.health <= 0) {
      setAnnouncement({
        message: 'Victory!',
        type: 'phase',
      });
      setTimeout(() => {
        router.push('/deck');
      }, 2000);
    }
  }, [gameState.playerHealth, gameState.currentMonster.health, router]);

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
