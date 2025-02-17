"use client";

import { Card, GameCard as GameCardType } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: GameCardType | Card;
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
  if (!card) return null;

  const mainClass = cn(
    "game-card",
    disabled && "disabled",
    selected && "selected",
    size === "small" && "game-card-small"
  );

  return (
    <div className={mainClass} onClick={disabled ? undefined : onClick}>
      <div className={cn("card-frame", card.class?.[0])}>
        <div className="card-name-box">
          <div className="card-name">{card.name}</div>
        </div>

        <div className="card-class-box">
          {card.class?.map((cls, index) => (
            <div key={index} className={cn("card-class-icon", `class-${cls}`)}>
              {cls.charAt(0)}
            </div>
          ))}
        </div>

        <div className="card-image-box">
          {/* Card art would go here */}
        </div>

        <div className="card-effects-box">
          <div className="card-effect-title">Effects:</div>
          <div className="text-gray-600">
            {card.onAttackEffect !== "NONE" && "⚔️ " + card.onAttackEffect}
            {card.onDefenseEffect !== "NONE" && " 🛡️ " + card.onDefenseEffect}
          </div>
        </div>

        <div className="card-stats-box">
          <div className="card-stat">
            <svg className="card-stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="card-stat-value">{card.attack}</span>
          </div>
          <div className="card-stat">
            <svg className="card-stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.34 17C5.56 19.89 8.58 22 12 22C15.42 22 18.44 19.89 20.66 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2V14M12 14L16 10M12 14L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="card-stat-value">
              {'currentHealth' in card ? card.currentHealth : card.health}
            </span>
          </div>
          <div className="card-stat">
            <svg className="card-stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="card-stat-value">{card.staminaCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}