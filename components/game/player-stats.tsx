"use client";

import { Heart, Zap, Trophy } from "lucide-react";

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
}

export function PlayerStats({ health, stamina, stage }: PlayerStatsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 px-6 py-3 border border-yellow-900 rounded-lg bg-black">
          <Heart className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{health}</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 border border-yellow-900 rounded-lg bg-black">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{stamina}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-6 py-3 border border-yellow-900 rounded-lg bg-black">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <span className="text-lg font-medium text-yellow-400">Stage {stage}</span>
      </div>
    </div>
  );
}