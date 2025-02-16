"use client";

import { Heart, Zap, Trophy } from "lucide-react";

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
}

export function PlayerStats({ health, stamina, stage }: PlayerStatsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 border border-gray-800">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-lg font-medium text-red-500">{health}</span>
        </div>
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 border border-gray-800">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-lg font-medium text-yellow-500">{stamina}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-black/50 px-4 py-2 border border-gray-800">
        <Trophy className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-500">Stage {stage}</span>
      </div>
    </div>
  );
}