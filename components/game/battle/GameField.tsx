'use client';

import { useState, useEffect } from 'react';
import type { GameCard, GameState } from '@/types/game';
import { cn } from '@/lib/utils';
import { GameCard as GameCardComponent } from '../../ui/game-card';
import { BattleStats } from './BattleStats';
import { BossDisplay } from './BossDisplay';
import { motion, AnimatePresence } from 'framer-motion';

interface GameFieldProps {
  cardsOnField: (GameCard | null)[];
  selectedCard: number | null;
  targetSlot: number | null;
  isPlayerTurn: boolean;
  onCardPlay: (cardIndex: number, slotIndex: number) => void;
  onTargetSlotChange: (slotIndex: number | null) => void;
  battleHistory: GameState['battleHistory'];
  bossHealth: number;
  bossMaxHealth: number;
  bossAttack: number;
  bossImage: string;
}

export function GameField({
  cardsOnField,
  selectedCard,
  targetSlot,
  isPlayerTurn,
  onCardPlay,
  onTargetSlotChange,
  battleHistory,
  bossHealth,
  bossMaxHealth,
  bossAttack,
  bossImage,
}: GameFieldProps) {
  const [attackingCard, setAttackingCard] = useState<number | null>(null);
  const [isBossHit, setIsBossHit] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);

  // Handle card attack animation
  useEffect(() => {
    if (!isPlayerTurn && cardsOnField.some(card => card !== null)) {
      const cardIndexes = cardsOnField
        .map((card, index) => card ? index : null)
        .filter((index): index is number => index !== null);

      const animateCards = async () => {
        for (const index of cardIndexes) {
          setAttackingCard(index);
          await new Promise(resolve => setTimeout(resolve, 800)); // Match animation duration
          setIsBossHit(true);
          await new Promise(resolve => setTimeout(resolve, 300));
          setIsBossHit(false);
          setAttackingCard(null);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      };

      animateCards();
    }
  }, [isPlayerTurn, cardsOnField]);

  // Handle boss attack animation
  useEffect(() => {
    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        setIsBossAttacking(true);
        setTimeout(() => setIsBossAttacking(false), 800);
      }, cardsOnField.filter(card => card !== null).length * 1500);

      return () => clearTimeout(timeout);
    }
  }, [isPlayerTurn, cardsOnField]);

  return (
    <div className="battle-field">
      <div className="battle-arena">
        {/* Player's Field */}
        <div className="player-field">
          <AnimatePresence>
            {[...Array(5)].map((_, index) => {
              const card = cardsOnField[index];
              return (
                <motion.div
                  key={`slot-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={cn(
                    'card-slot',
                    targetSlot === index && 'targetable',
                    selectedCard !== null && !card && 'cursor-pointer hover:bg-yellow-900/20',
                    attackingCard === index && 'card-attacking'
                  )}
                  onClick={() => {
                    if (selectedCard !== null && !card) {
                      onCardPlay(selectedCard, index);
                    }
                  }}
                  onMouseEnter={() => {
                    if (selectedCard !== null && !card) {
                      onTargetSlotChange(index);
                    }
                  }}
                  onMouseLeave={() => {
                    if (targetSlot === index) {
                      onTargetSlotChange(null);
                    }
                  }}
                >
                  {card && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <GameCardComponent
                        card={card}
                        disabled={true}
                        size="small"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Boss */}
        <BossDisplay
          health={bossHealth}
          maxHealth={bossMaxHealth}
          attack={bossAttack}
          image={bossImage}
          name="Dark Overlord"
          isAttacking={isBossAttacking}
          isHit={isBossHit}
        />
      </div>

      {/* Battle Log */}
      <div className="relative z-10">
        <BattleStats history={battleHistory} />
      </div>
    </div>
  );
}