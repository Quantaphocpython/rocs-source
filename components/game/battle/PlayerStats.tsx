"use client";

import { Heart, Zap, Trophy, Clock } from "lucide-react";

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
  round: number;
  nextStaminaGain: number;
}

export function PlayerStats({ health, stamina, stage, round, nextStaminaGain }: PlayerStatsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="stat-display">
          <Heart className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{health}</span>
        </div>
        <div className="stat-display group relative">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{stamina}</span>
          <div className="absolute -bottom-12 left-0 hidden group-hover:block bg-black/90 border border-yellow-900/50 rounded-lg px-3 py-2 text-sm text-yellow-400 whitespace-nowrap">
            +{nextStaminaGain} next turn
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="stat-display">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-medium text-yellow-400">Stage {stage}</span>
        </div>
        <div className="stat-display">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-medium text-yellow-400">Round {round}</span>
        </div>
      </div>
    </div>
  );
}