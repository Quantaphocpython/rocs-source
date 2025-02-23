"use client";

import { GameCard } from "@/types/game";
import { cn } from "@/lib/utils";
import { Heart, Sword, Zap, Shield, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface GameCardProps {
  card: GameCard;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: "normal" | "small";
}

export function GameCard({ card, onClick, selected, disabled, size = "normal" }: GameCardProps) {
  const getClassIcon = (className: string) => {
    switch (className) {
      case "FIRE":
        return <Flame className="w-3 h-3" />;
      case "WATER":
        return <Droplet className="w-3 h-3" />;
      case "WOOD":
        return <Trees className="w-3 h-3" />;
      case "EARTH":
        return <Mountain className="w-3 h-3" />;
      case "METAL":
        return <Cog className="w-3 h-3" />;
    }
  };

  const getEffectIcons = () => {
    const effects = [];

    if (card.onAttackEffect === "CRITICAL_STRIKE") {
      effects.push({ icon: "⚡", tooltip: "30% Critical Strike" });
    }
    if (card.onAttackEffect === "LIFESTEAL") {
      effects.push({ icon: "💫", tooltip: "Lifesteal" });
    }
    if (card.onDeadEffect === "EXPLODE") {
      effects.push({ icon: "💥", tooltip: "Explode on Death" });
    }
    if (card.onDefenseEffect === "THORNS") {
      effects.push({ icon: "🛡️", tooltip: "Thorns" });
    }

    return effects;
  };

  const healthPercentage = (card.currentHealth / card.health) * 100;
  const isHealthy = healthPercentage > 66;
  const isDamaged = healthPercentage <= 66 && healthPercentage > 33;
  const isCritical = healthPercentage <= 33;

  return (
    <motion.div
      className={cn(
        "game-card",
        size === "small" && "game-card-small",
        disabled && "disabled",
        selected && "selected"
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className={cn("card-frame", card.class[0])}>
        {/* Top Bar with Name and Classes */}
        <div className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-2 py-1 bg-black/80 backdrop-blur-sm border-b border-yellow-900/50">
          <div className="flex items-center gap-1.5">
            {card.class.map((cls, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <div className={cn("w-4 h-4 rounded-full flex items-center justify-center", `class-${cls}`)}>
                    {getClassIcon(cls)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{cls}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="text-xs font-bold text-white truncate ml-1">
            {card.name}
          </div>
        </div>

        {/* Effects Icons */}
        <div className="absolute top-8 left-0 right-0 flex justify-center gap-1 px-1">
          {getEffectIcons().map((effect, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <div className="w-5 h-5 flex items-center justify-center text-xs bg-black/60 rounded-full backdrop-blur-sm border border-yellow-900/50">
                  {effect.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{effect.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Card Image */}
        <div className="flex justify-center mt-2">
          <img
            src={card.image}
            alt={card.name}
            className={cn(
              "object-cover",
              size === "small" ? "w-24 h-24" : "w-48 h-48"
            )}
          />
        </div>


        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Health Bar */}
          <div className="h-1 bg-black/30">
            <div
              className={cn(
                "h-full transition-all duration-300",
                isHealthy && "bg-green-500",
                isDamaged && "bg-yellow-500",
                isCritical && "bg-red-500"
              )}
              style={{ width: `${healthPercentage}%` }}
            />
          </div>

          {/* Stats Bar */}
          <div className="h-7 bg-black/80 backdrop-blur-sm flex items-center justify-between px-2 py-1 border-t border-yellow-900/50">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Sword className="w-3 h-3 text-orange-400" />
                  <span className="text-xs font-bold text-orange-400">{card.attack}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attack</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className={cn(
                    "text-xs font-bold",
                    isHealthy && "text-green-400",
                    isDamaged && "text-yellow-400",
                    isCritical && "text-red-400"
                  )}>
                    {card.currentHealth}/{card.health}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Health</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400">{card.staminaCost}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stamina Cost</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </motion.div>
  );
}