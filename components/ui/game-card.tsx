'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sword, Zap, Shield, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, Class, GameCard as GameCardType } from '@/types/game';
import { CardDetails } from '@/components/game/card/CardDetails';

interface GameCardProps {
  card: any;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: 'normal' | 'small' | 'tiny';
}

export function GameCard({
  card,
  onClick,
  selected = false,
  disabled = false,
  size = 'normal',
}: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isGameCard = card !== null && 'currentHealth' in card;

  const sizeClasses = {
    normal: 'w-[160px] h-[220px]',
    small: 'w-[120px] h-[175px]',
    tiny: 'w-[80px] h-[120px]',
  };

  const textSizes = {
    normal: 'text-sm',
    small: 'text-xs',
    tiny: 'text-[8px]',
  };

  const iconSizes = {
    normal: 'w-4 h-4',
    small: 'w-3.5 h-3.5',
    tiny: 'w-2.5 h-2.5',
  };

  const getElementColors = (elementClass: string) => {
    switch (elementClass) {
      case 'FIRE':
        return 'from-red-600 to-orange-400';
      case 'WATER':
        return 'from-blue-600 to-cyan-400';
      case 'WOOD':
        return 'from-green-600 to-emerald-400';
      case 'EARTH':
        return 'from-yellow-600 to-amber-400';
      case 'METAL':
        return 'from-gray-600 to-slate-400';
      default:
        return 'from-violet-600 to-violet-400';
    }
  };

  const mainElementColor = getElementColors(card?.classes[0] ?? Class.EARTH);

  return (
    <>
      <motion.div
        className={cn(
          sizeClasses[size],
          'relative cursor-pointer select-none transform-gpu',
          disabled && 'opacity-60 cursor-not-allowed',
          'transition-all duration-300'
        )}
        whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
        onClick={() => !disabled && onClick?.()}
        onContextMenu={(e) => {
          e.preventDefault();
          !disabled && setShowDetails(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Frame */}
        <div
          className={cn(
            'absolute inset-0 rounded-lg overflow-hidden',
            'transition-all duration-300',
            selected && 'ring-2 ring-violet-400 shadow-lg shadow-violet-400/20'
          )}
        >
          {/* Background Gradient */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-20',
              mainElementColor
            )}
          />

          {/* Card Content */}
          <div className="relative h-full flex flex-col bg-black/60">
            {/* Card Header */}
            <div
              className={cn(
                'px-2 py-1 bg-black/40 border-b border-white/10 flex items-center justify-between',
                size === 'tiny' && 'px-1.5 py-0.5'
              )}
            >
              <span
                className={cn(
                  'font-medium text-white truncate',
                  textSizes[size]
                )}
              >
                {card?.name}
              </span>
              <div className="flex items-center gap-0.5">
                {card?.classes.map((cls: any, idx: any) => (
                  <div
                    key={idx}
                    className={cn(
                      'rounded-full bg-gradient-to-br shadow-sm',
                      getElementColors(cls),
                      size === 'tiny' ? 'w-1.5 h-1.5' : 'w-2 h-2'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Card Image */}
            <div className="relative flex-grow">
              <img
                src={card?.image}
                alt={card?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Card Stats */}
            <div
              className={cn(
                'p-1.5 bg-black/40 border-t border-white/10',
                size === 'tiny' && 'p-1'
              )}
            >
              <div className="flex justify-between items-center">
                {/* Attack */}
                <div
                  className={cn(
                    'flex items-center gap-0.5',
                    'px-1 py-0.5 rounded bg-black/30',
                    size === 'tiny' && 'px-0.5 py-0.5'
                  )}
                >
                  <Sword className={cn('text-orange-400', iconSizes[size])} />
                  <span
                    className={cn(
                      'text-orange-400 font-medium',
                      textSizes[size]
                    )}
                  >
                    {card?.attack}
                  </span>
                </div>

                {/* Health */}
                <div
                  className={cn(
                    'flex items-center gap-0.5',
                    'px-1 py-0.5 rounded bg-black/30',
                    size === 'tiny' && 'px-0.5 py-0.5'
                  )}
                >
                  <Heart className={cn('text-red-400', iconSizes[size])} />
                  <span
                    className={cn('text-red-400 font-medium', textSizes[size])}
                  >
                    {isGameCard
                      ? `${card.currentHealth}/${card.health}`
                      : card?.health}
                  </span>
                </div>

                {/* Stamina Cost */}
                <div
                  className={cn(
                    'flex items-center gap-0.5',
                    'px-1 py-0.5 rounded bg-black/30',
                    size === 'tiny' && 'px-0.5 py-0.5'
                  )}
                >
                  <Zap className={cn('text-yellow-400', iconSizes[size])} />
                  <span
                    className={cn(
                      'text-yellow-400 font-medium',
                      textSizes[size]
                    )}
                  >
                    {card?.staminaCost}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        {isHovered && !disabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-lg"
          >
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-10',
                mainElementColor
              )}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Card Details Dialog */}
      <CardDetails
        card={card}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
