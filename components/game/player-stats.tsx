"use client";

import { Heart, Zap } from "lucide-react";

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
}

export function PlayerStats({ health, stamina, stage }: PlayerStatsProps) {
  return (
    <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full">
          <Heart className="w-5 h-5" />
          <span className="text-xl font-bold">{health}</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full">
          <Zap className="w-5 h-5" />
          <span className="text-xl font-bold">{stamina}</span>
        </div>
      </div>
      <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold">
        Stage {stage}
      </div>
    </div>
  );
}