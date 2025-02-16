"use client";

import { Card as CardType } from "@/types/game";
import { Heart, Shield, Sword, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: CardType & { currentHealth?: number };
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  size?: "normal" | "small";
}

export function GameCard({
  card,
  onClick,
  disabled = false,
  selected = false,
  size = "normal"
}: GameCardProps) {
  const mainClass = cn(
    "game-card",
    size === "small" && "game-card-small",
    disabled && "disabled",
    selected && "selected"
  );

  return (
    <div className={mainClass} onClick={disabled ? undefined : onClick}>
      <div className={`card-frame ${card.class[0]}`}>
        <div className="card-name-box">
          <div className="card-name">{card.name}</div>
        </div>

        <div className="card-class-box">
          {card.class.map((c, i) => (
            <div key={i} className={`card-class-icon class-${c}`}>
              {c[0]}
            </div>
          ))}
        </div>

        <div className="card-image-box">
          {/* Card art would go here */}
        </div>

        <div className="card-effects-box">
          <div className="card-effect-title">Effects:</div>
          <div className="text-gray-600">
            {card.onAttackEffect !== "NONE" && (
              <div>• {card.onAttackEffect.replace("_", " ")}</div>
            )}
            {card.onDefenseEffect !== "NONE" && (
              <div>• {card.onDefenseEffect.replace("_", " ")}</div>
            )}
            {card.onDeadEffect !== "NONE" && (
              <div>• {card.onDeadEffect.replace("_", " ")}</div>
            )}
          </div>
        </div>

        <div className="card-stats-box">
          <div className="card-stat">
            <Sword className="card-stat-icon" />
            <span className="card-stat-value">{card.attack}</span>
          </div>
          <div className="card-stat">
            <Heart className="card-stat-icon" />
            <span className="card-stat-value">
              {card.currentHealth ?? card.health}
            </span>
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