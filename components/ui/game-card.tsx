'use client';

import { GameCard as GameCardType, Card } from '@/types/game';
import { cn } from '@/lib/utils';
import { Heart, Sword, Zap } from 'lucide-react';
import { useState } from 'react';
import { CardDetails } from '../game/card/CardDetails';
import { convertToGameCard } from '@/utils/gameLogic';

interface GameCardProps {
  card: GameCardType | Card;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: 'small' | 'normal';
  className?: string;
}

export function GameCard({
  card: initialCard,
  onClick,
  selected = false,
  disabled = false,
  size = 'normal',
  className,
}: GameCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Convert Card to GameCard if needed
  const card = 'currentHealth' in initialCard ? initialCard : convertToGameCard(initialCard);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDetails(true);
  };

  const getClassGradient = () => {
    const classColors = {
      FIRE: 'from-red-500/20 to-orange-700/20 border-red-500/50',
      WATER: 'from-blue-500/20 to-cyan-700/20 border-blue-500/50',
      WOOD: 'from-green-500/20 to-emerald-700/20 border-green-500/50',
      EARTH: 'from-yellow-500/20 to-amber-700/20 border-yellow-500/50',
      METAL: 'from-gray-400/20 to-slate-700/20 border-gray-400/50',
    };

    if (card.class.length === 1) {
      return classColors[card.class[0]];
    }

    // For dual-class cards, create a diagonal gradient
    const [primary, secondary] = card.class;
    const [primaryColor, secondaryColor] = [classColors[primary], classColors[secondary]];
    return `${primaryColor} via-transparent ${secondaryColor}`;
  };

  const getClassOverlay = () => {
    const overlayStyles = card.class.map(cls => {
      switch (cls) {
        case 'FIRE':
          return 'after:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]';
        case 'WATER':
          return 'after:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]';
        case 'WOOD':
          return 'after:bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]';
        case 'EARTH':
          return 'after:bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]';
        case 'METAL':
          return 'after:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.1)_0%,transparent_70%)]';
        default:
          return '';
      }
    });
    return overlayStyles.join(' ');
  };

  return (
    <>
      <div
        className={cn(
          'game-card relative group',
          size === 'small' && 'game-card-small',
          disabled && 'disabled',
          selected && 'selected',
          className
        )}
        onClick={!disabled ? onClick : undefined}
        onContextMenu={handleContextMenu}
      >
        <div
          className={cn(
            'card-frame relative overflow-hidden transition-all duration-300',
            'bg-gradient-to-br backdrop-blur-sm',
            getClassGradient(),
            'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300',
            'group-hover:after:opacity-100',
            getClassOverlay(),
            // Glowing border effect
            'before:absolute before:inset-0 before:p-[2px]',
            'before:bg-gradient-to-br before:from-white/20 before:to-transparent',
            'before:rounded-lg before:-z-10',
            // Inner shadow
            'shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]'
          )}
        >
          {/* Card Name */}
          <div className="card-name-box">
            <h3 className="card-name">{card.name}</h3>
          </div>

          {/* Card Classes */}
          <div className="card-class-box">
            {card.class.map((cls, index) => (
              <div
                key={index}
                className={cn(
                  'card-class-icon',
                  `class-${cls}`
                )}
              >
                {cls.charAt(0)}
              </div>
            ))}
          </div>

          {/* Card Image */}
          <div className="card-image-box">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Effects */}
          <div className="card-effects-box">
            <div className="card-effect-title">Effects:</div>
            <div className="text-gray-700">
              {card.onAttackEffect !== 'NONE' && (
                <span className="text-red-600">
                  {card.onAttackEffect === 'CRITICAL_STRIKE'
                    ? '30% Critical'
                    : 'Lifesteal'}
                </span>
              )}
              {card.onDefenseEffect === 'THORNS' && (
                <span className="text-yellow-600"> Thorns</span>
              )}
              {card.onDeadEffect === 'EXPLODE' && (
                <span className="text-orange-600"> Explode</span>
              )}
            </div>
          </div>

          {/* Card Stats */}
          <div className="card-stats-box">
            <div className="card-stat">
              <Sword className="card-stat-icon" />
              <span className="card-stat-value">{card.attack}</span>
            </div>
            <div className="card-stat">
              <Heart className="card-stat-icon" />
              <span className="card-stat-value">{card.currentHealth}</span>
            </div>
            <div className="card-stat">
              <Zap className="card-stat-icon" />
              <span className="card-stat-value">{card.staminaCost}</span>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
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