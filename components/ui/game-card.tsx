"use client";

import { Card } from "@/types/game";
import { Heart, Sword, Zap, Shield, Bomb } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export function GameCard({ card, onClick, selected, disabled }: GameCardProps) {
  const getEffectDescription = () => {
    const effects = [];
    
    if (card.onAttackEffect !== 'NONE') {
      effects.push(`Attack Effect: ${card.onAttackEffect.replace(/_/g, ' ')}`);
    }
    if (card.onDefenseEffect !== 'NONE') {
      effects.push(`Defense Effect: ${card.onDefenseEffect.replace(/_/g, ' ')}`);
    }
    if (card.onDeadEffect !== 'NONE') {
      effects.push(`Death Effect: ${card.onDeadEffect.replace(/_/g, ' ')}`);
    }
    if (card.activeSkill !== 'NONE') {
      effects.push(`Active Skill: ${card.activeSkill.replace(/_/g, ' ')}`);
    }

    return effects;
  };

  const getClassColor = (cardClass: string) => {
    return `class-${cardClass}`;
  };

  const getCardImage = () => {
    // You can map card types to specific images
    return "https://images.unsplash.com/photo-1559813089-c41a4bf0aa1b?w=300&h=200&fit=crop";
  };

  return (
    <div
      className={cn(
        "game-card",
        selected && "selected",
        disabled && "disabled"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="card-frame">
        <div className="card-name-box">
          <h3 className="card-name">{card.name}</h3>
        </div>

        <div className="card-image-box">
          <img
            src={getCardImage()}
            alt={card.name}
            className="card-image"
          />
          <div className="card-class-box">
            {card.class.map((c, i) => (
              <div
                key={i}
                className={cn("card-class-icon", getClassColor(c))}
                title={c}
              >
                {c[0]}
              </div>
            ))}
          </div>
        </div>

        <div className="card-effects-box">
          <div className="card-effect-title">Effects:</div>
          {getEffectDescription().map((effect, index) => (
            <div key={index} className="mb-1">
              • {effect}
            </div>
          ))}
        </div>

        <div className="card-stats-box">
          <div className="flex gap-2">
            <div className="card-stat">
              <Sword className="card-stat-icon" />
              <span className="card-stat-value">{card.attack}</span>
            </div>
            <div className="card-stat">
              <Heart className="card-stat-icon" />
              <span className="card-stat-value">{card.health}</span>
            </div>
          </div>
          <div className="card-stat">
            <Zap className="card-stat-icon" />
            <span className="card-stat-value">{card.staminaCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}