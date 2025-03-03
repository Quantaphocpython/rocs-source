'use client';

import { useState, useEffect } from 'react';
import type { GameCard, GameState } from '@/types/game';
import { Class } from '@/types/game';
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
  currentPhase: 'player' | 'battle' | 'end' | 'monster';
  onCardPlay: (cardIndex: number, slotIndex: number) => void;
  onTargetSlotChange: (slotIndex: number | null) => void;
  battleHistory: GameState['battleHistory'];
  bossHealth: number;
  bossMaxHealth: number;
  bossAttack: number;
  bossImage: string;
  bossName: string;
}

export function GameField({
  cardsOnField,
  selectedCard,
  targetSlot,
  isPlayerTurn,
  currentPhase,
  onCardPlay,
  onTargetSlotChange,
  battleHistory,
  bossHealth,
  bossMaxHealth,
  bossAttack,
  bossImage,
  bossName,
}: GameFieldProps) {
  const [attackingCard, setAttackingCard] = useState<number | null>(null);
  const [isBossHit, setIsBossHit] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const [cardUnderAttack, setCardUnderAttack] = useState<number | null>(null);

  // Get animation class based on card element
  const getElementalAnimationClass = (card: any) => {
    const primaryElement = (card.classes && card?.classes[0]) ?? '';

    console.log(card.classes);
    switch (primaryElement) {
      case Class.FIRE:
        return 'animate-fireAttack';
      case Class.WATER:
        return 'animate-waterAttack';
      case Class.WOOD:
        return 'animate-woodAttack';
      case Class.EARTH:
        return 'animate-earthAttack';
      case Class.METAL:
        return 'animate-metalAttack';
      default:
        return '';
    }
  };

  // Get particle class based on card element
  const getElementalParticleClass = (card: GameCard) => {
    const primaryElement = card.class[0];
    switch (primaryElement) {
      case Class.FIRE:
        return 'fire-particles';
      case Class.WATER:
        return 'water-particles';
      case Class.WOOD:
        return 'wood-particles';
      case Class.EARTH:
        return 'earth-particles';
      case Class.METAL:
        return 'metal-particles';
      default:
        return '';
    }
  };

  // Get trail class based on card element
  const getElementalTrailClass = (card: GameCard) => {
    const primaryElement = card.class[0];
    switch (primaryElement) {
      case Class.FIRE:
        return 'fire-trail';
      case Class.WATER:
        return 'water-trail';
      case Class.WOOD:
        return 'wood-trail';
      case Class.EARTH:
        return 'earth-trail';
      case Class.METAL:
        return 'metal-trail';
      default:
        return '';
    }
  };

  // Handle player's battle phase animations
  useEffect(() => {
    if (currentPhase === 'battle') {
      const cardIndexes = cardsOnField
        .slice(0, 5)
        .map((card, index) => (card ? index : null))
        .filter((index): index is number => index !== null);

      const animateCardAttacks = async () => {
        for (const index of cardIndexes) {
          setAttackingCard(index);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setIsBossHit(true);
          await new Promise((resolve) => setTimeout(resolve, 300));
          setIsBossHit(false);
          setAttackingCard(null);
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      };

      animateCardAttacks();
    }
  }, [currentPhase, cardsOnField]);

  // Handle monster's attack animations
  useEffect(() => {
    if (currentPhase === 'monster') {
      const cardIndexes = cardsOnField
        .slice(0, 5)
        .map((card, index) => (card ? index : null))
        .filter((index): index is number => index !== null);

      if (cardIndexes.length > 0) {
        const randomIndex = Math.floor(Math.random() * cardIndexes.length);
        const targetIndex = cardIndexes[randomIndex];

        const animateMonsterAttack = async () => {
          setIsBossAttacking(true);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setIsBossAttacking(false);

          setCardUnderAttack(targetIndex);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setCardUnderAttack(null);
        };

        animateMonsterAttack();
      }
    }
  }, [currentPhase, cardsOnField]);

  return (
    <div className="battle-field h-[calc(100vh-200px)] relative overflow-hidden">
      {/* Boss Display - Top Right */}
      <div className="absolute top-8 right-8">
        <BossDisplay
          health={bossHealth}
          maxHealth={bossMaxHealth}
          attack={bossAttack}
          image={bossImage}
          name={bossName}
          isAttacking={isBossAttacking}
          isHit={isBossHit}
        />
      </div>

      {/* Card Field - Bottom Left */}
      <div className="absolute bottom-8 left-8">
        <div className="flex gap-6">
          <AnimatePresence>
            {[...Array(5)].map((_, index) => {
              const card = cardsOnField[index];
              return (
                <CardSlot
                  key={index}
                  index={index}
                  card={card}
                  isTargetable={selectedCard !== null && targetSlot === index}
                  isAttacking={attackingCard === index}
                  isUnderAttack={cardUnderAttack === index}
                  selectedCard={selectedCard}
                  onCardPlay={onCardPlay}
                  onTargetChange={onTargetSlotChange}
                  elementalAnimationClass={
                    card ? getElementalAnimationClass(card) : ''
                  }
                  elementalParticleClass={
                    card ? getElementalParticleClass(card) : ''
                  }
                  elementalTrailClass={card ? getElementalTrailClass(card) : ''}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Battle Log */}
      <div className="absolute bottom-8 right-8 z-10">
        <BattleStats history={battleHistory} />
      </div>
    </div>
  );
}

interface CardSlotProps {
  index: number;
  card: GameCard | null;
  isTargetable: boolean;
  isAttacking: boolean;
  isUnderAttack: boolean;
  selectedCard: number | null;
  onCardPlay: (cardIndex: number, slotIndex: number) => void;
  onTargetChange: (slotIndex: number | null) => void;
  elementalAnimationClass: string;
  elementalParticleClass: string;
  elementalTrailClass: string;
}

function CardSlot({
  index,
  card,
  isTargetable,
  isAttacking,
  isUnderAttack,
  selectedCard,
  onCardPlay,
  onTargetChange,
  elementalAnimationClass,
  elementalParticleClass,
  elementalTrailClass,
}: CardSlotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isUnderAttack ? [1, 1.1, 0.9, 1] : 1,
        rotate: isUnderAttack ? [-5, 5, 0] : 0,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: isUnderAttack ? 0.4 : 0.3,
        times: isUnderAttack ? [0, 0.2, 0.5, 1] : undefined,
      }}
      className={cn(
        'w-[140px] aspect-[3/4]',
        'rounded-lg transition-all duration-300',
        'flex items-center justify-center',
        isTargetable && 'ring-2 ring-violet-400 shadow-lg shadow-violet-400/20',
        selectedCard !== null &&
          !card &&
          'cursor-pointer hover:bg-violet-500/10',
        isAttacking && elementalAnimationClass
      )}
      style={{
        border: '1px solid rgba(139, 92, 246, 0.1)',
        background: card ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
      }}
      onClick={() => {
        if (selectedCard !== null && !card) {
          onCardPlay(selectedCard, index);
        }
      }}
      onMouseEnter={() => {
        if (selectedCard !== null && !card) {
          onTargetChange(index);
        }
      }}
      onMouseLeave={() => {
        if (isTargetable) {
          onTargetChange(null);
        }
      }}
    >
      {!card && (
        <div className="text-violet-400/30 text-2xl font-medium">
          {index + 1}
        </div>
      )}

      {card && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="transform transition-transform duration-300 hover:scale-105">
            <GameCardComponent card={card} disabled={false} size="small" />
          </div>

          {/* Attack Trail Effect */}
          {isAttacking && (
            <div
              className={cn(
                'absolute left-full top-1/2 -translate-y-1/2 h-1 w-32',
                elementalTrailClass
              )}
            />
          )}

          {/* Attack Particles */}
          {isAttacking && (
            <div
              className={cn(
                'absolute w-4 h-4 rounded-full',
                elementalParticleClass
              )}
              style={{
                left: '100%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
