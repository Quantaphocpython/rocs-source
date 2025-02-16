"use client";

import { Heart, Sword } from "lucide-react";

interface MonsterDisplayProps {
  health: number;
  attack: number;
}

export function MonsterDisplay({ health, attack }: MonsterDisplayProps) {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="text-sm font-medium text-white text-right px-4 py-2 bg-black/50 border border-gray-800">
        Dark Overlord
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 border border-gray-800">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-lg font-medium text-red-500">{health}</span>
        </div>
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 border border-gray-800">
          <Sword className="w-4 h-4 text-orange-500" />
          <span className="text-lg font-medium text-orange-500">{attack}</span>
        </div>
      </div>
    </div>
  );
}