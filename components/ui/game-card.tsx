'use client';

import { useState } from 'react';
import { GameCard as GameCardType, Class } from '@/types/game';
import { cn } from '@/lib/utils';
import { CardDetails } from '../game/card/CardDetails';
import { motion, AnimatePresence } from 'framer-motion';

interface GameCardProps {
  card: GameCardType;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  disableStyle?: 'grayscale' | 'opacity' | 'none';
  size?: 'small' | 'normal' | 'large';
  className?: string;
}

function getCardPowerLevel(card: GameCardType) {
  const powerScore = card.attack + card.health + card.staminaCost;
  if (powerScore >= 18) return 'legendary';
  if (powerScore >= 14) return 'epic';
  if (powerScore >= 10) return 'rare';
  return 'common';
}

function getClassColors(classes: Class[]) {
  if (classes.length === 1) {
    switch (classes[0]) {
      case Class.FIRE:
        return { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' };
      case Class.WATER:
        return { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa' };
      case Class.WOOD:
        return { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80' };
      case Class.EARTH:
        return { primary: '#ca8a04', secondary: '#eab308', accent: '#facc15' };
      case Class.METAL:
        return { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db' };
    }
  }
  return { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' };
}

function getCardSize(size: 'small' | 'normal' | 'large') {
  switch (size) {
    case 'small':
      return 'w-[140px] h-[200px]';
    case 'normal':
      return 'w-[180px] h-[260px]';
    case 'large':
      return 'w-[220px] h-[320px]';
  }
}

export function GameCard({
  card,
  onClick,
  selected = false,
  disabled = false,
  disableStyle = 'opacity',
  size = 'normal',
  className
}: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const powerLevel = getCardPowerLevel(card);
  const colors = getClassColors(card.class);
  const cardSize = getCardSize(size);

  return (
    <>
      <motion.div
        className={cn(
          'relative rounded-lg overflow-hidden',
          cardSize,
          selected && 'ring-2 ring-white scale-105',
          disabled && disableStyle === 'opacity' && 'opacity-50 cursor-not-allowed',
          disabled && disableStyle === 'grayscale' && 'grayscale cursor-not-allowed',
          'cursor-pointer transition-all duration-300',
          className
        )}
        style={{
          boxShadow: isHovered ? `0 0 20px ${colors.accent}40` : 'none',
          border: `2px solid ${colors.secondary}`,
        }}
        onClick={disabled ? undefined : onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDetails(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        animate={selected ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Card Image */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={isHovered && !disabled ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Card Content */}
        <div className="relative z-20 p-3 h-full flex flex-col">
          {/* Card Name */}
          <motion.h3
            className={cn(
              "font-bold text-base leading-tight text-white drop-shadow-lg",
              size === 'large' && "text-lg"
            )}
          >
            {card.name}
          </motion.h3>

          {/* Element Indicators */}
          <div className="absolute top-3 right-3 flex gap-1">
            {card.class.map((cls, index) => (
              <motion.div
                key={index}
                className="w-5 h-5 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm"
                style={{
                  border: `1px solid ${getClassColors([cls]).secondary}`,
                  color: getClassColors([cls]).accent,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-xs font-bold">{cls.charAt(0)}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <span className={cn(
                  "font-bold drop-shadow-lg",
                  size === 'large' ? "text-lg" : "text-base",
                  card.attack >= 8 ? "text-red-400" : "text-red-500"
                )}>
                  {card.attack}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <span className={cn(
                  "font-bold drop-shadow-lg",
                  size === 'large' ? "text-lg" : "text-base",
                  card.health >= 8 ? "text-green-400" : "text-green-500"
                )}>
                  {card.currentHealth}/{card.health}
                </span>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <span className={cn(
                "font-bold drop-shadow-lg",
                size === 'large' ? "text-lg" : "text-base",
                card.staminaCost <= 2 ? "text-yellow-400" : "text-yellow-500"
              )}>
                {card.staminaCost}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <CardDetails
        card={card}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}