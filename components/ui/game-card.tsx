'use client';

import { useState } from 'react';
import { GameCard as GameCardType, Class } from '@/types/game';
import { Heart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardDetails } from '../game/card/CardDetails';

interface GameCardProps {
  card: GameCardType;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: 'small' | 'normal';
  className?: string;
}

function getClassColors(classes: Class[]) {
  if (classes.length === 1) {
    switch (classes[0]) {
      case Class.FIRE:
        return 'border-red-500/50 hover:border-red-400 hover:shadow-red-500/20';
      case Class.WATER:
        return 'border-blue-500/50 hover:border-blue-400 hover:shadow-blue-500/20';
      case Class.WOOD:
        return 'border-green-500/50 hover:border-green-400 hover:shadow-green-500/20';
      case Class.EARTH:
        return 'border-yellow-500/50 hover:border-yellow-400 hover:shadow-yellow-500/20';
      case Class.METAL:
        return 'border-gray-400/50 hover:border-gray-300 hover:shadow-gray-400/20';
    }
  }
  return 'border-[3px] border-transparent bg-gradient-to-br from-yellow-400/50 via-red-400/50 to-blue-400/50 hover:from-yellow-400 hover:via-red-400 hover:to-blue-400';
}

function getClassBadgeColor(cls: Class) {
  switch (cls) {
    case Class.FIRE:
      return 'bg-red-500/20 text-red-400';
    case Class.WATER:
      return 'bg-blue-500/20 text-blue-400';
    case Class.WOOD:
      return 'bg-green-500/20 text-green-400';
    case Class.EARTH:
      return 'bg-yellow-500/20 text-yellow-400';
    case Class.METAL:
      return 'bg-gray-400/20 text-gray-400';
  }
}

export function GameCard({
  card,
  onClick,
  selected = false,
  disabled = false,
  size = 'normal',
  className
}: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const classColors = getClassColors(card.class);

  return (
    <>
      <div
        className={cn(
          'relative rounded-lg overflow-hidden transition-all duration-300',
          'border-2',
          classColors,
          selected && 'ring-2 ring-white/30 shadow-lg scale-105',
          disabled && 'opacity-50 cursor-not-allowed grayscale',
          size === 'small' ? 'w-[160px] h-[220px]' : 'w-[200px] h-[280px]',
          'cursor-pointer transform hover:scale-105',
          'backdrop-blur-sm',
          className
        )}
        onClick={disabled ? undefined : onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDetails(true);
        }}
      >
        {/* Card Image */}
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Card Name */}
        <div className="absolute top-2 left-2 right-2">
          <h3 className="text-white font-bold text-lg truncate drop-shadow-lg">
            {card.name}
          </h3>
        </div>

        {/* Element Indicators */}
        <div className="absolute top-2 right-2 flex gap-1">
          {card.class.map((cls, index) => (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                getClassBadgeColor(cls)
              )}
            >
              <span className="text-xs font-bold drop-shadow-lg">
                {cls.charAt(0)}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-red-400">
              <div className="w-4 h-4 relative">
                <img
                  src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-sword-mascot-logo-png-image_5901932.jpg"
                  alt="Attack"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className="font-bold text-sm drop-shadow-lg">{card.attack}</span>
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <Heart className="w-4 h-4" />
              <span className="font-bold text-sm drop-shadow-lg">
                {card.currentHealth}/{card.health}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Zap className="w-4 h-4" />
            <span className="font-bold text-sm drop-shadow-lg">{card.staminaCost}</span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={cn(
            "absolute inset-0 blur-xl",
            card.class[0] === Class.FIRE && "bg-red-500/10",
            card.class[0] === Class.WATER && "bg-blue-500/10",
            card.class[0] === Class.WOOD && "bg-green-500/10",
            card.class[0] === Class.EARTH && "bg-yellow-500/10",
            card.class[0] === Class.METAL && "bg-gray-400/10"
          )} />
        </div>
      </div>

      <CardDetails
        card={card}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}