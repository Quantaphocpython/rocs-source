"use client";

import { Card as CardComponent } from "@/components/ui/card";
import { GameCard } from "@/types/game";
import { Shield, Sword, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: GameCard;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function GameCard({ card, onClick, disabled, selected }: GameCardProps) {
  const healthPercentage = (card.currentHealth / card.health) * 100;
  const healthColor = healthPercentage > 66 ? "bg-green-500" : healthPercentage > 33 ? "bg-yellow-500" : "bg-red-500";

  return (
    <CardComponent
      className={cn(
        "w-[200px] h-[280px] flex flex-col p-4 cursor-pointer transition-all duration-200 hover:scale-105",
        disabled && "opacity-50 cursor-not-allowed",
        selected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={() => !disabled && onClick?.()}
    >
      <div className="text-lg font-bold mb-2">{card.name}</div>
      
      <div className="flex items-center gap-2 mb-2">
        <Sword className="w-4 h-4" />
        <span>{card.attack}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4" />
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={cn("h-full rounded-full transition-all", healthColor)}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
        <span>{card.currentHealth}/{card.health}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4" />
        <span>{card.staminaCost}</span>
      </div>
      
      <div className="mt-auto space-y-1 text-sm">
        {card.onAttackEffect !== "NONE" && (
          <div className="flex items-center gap-1">
            <Sword className="w-3 h-3" />
            <span>{card.onAttackEffect}</span>
          </div>
        )}
        {card.onDefenseEffect !== "NONE" && (
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>{card.onDefenseEffect}</span>
          </div>
        )}
      </div>
    </CardComponent>
  );
}