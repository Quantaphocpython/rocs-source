"use client";

import { Heart, Zap } from "lucide-react";

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
}

export function PlayerStats({ health, stamina, stage }: PlayerStatsProps) {
  return (
    <div className="flex justify-between items-center bg-card p-4 rounded-lg">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span className="text-xl font-bold">{health}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-bold">{stamina}</span>
        </div>
      </div>
      <div className="text-xl font-bold">
        Stage {stage}
      </div>
    </div>
  );
}