"use client";

import { Heart, Sword } from "lucide-react";

interface MonsterDisplayProps {
  health: number;
  attack: number;
}

export function MonsterDisplay({ health, attack }: MonsterDisplayProps) {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="text-lg font-medium text-yellow-400 text-right px-6 py-3 bg-black border border-yellow-900 rounded-lg">
        Dark Overlord
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 px-6 py-3 bg-black border border-yellow-900 rounded-lg">
          <Heart className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{health}</span>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-black border border-yellow-900 rounded-lg">
          <Sword className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-medium text-yellow-400">{attack}</span>
        </div>
      </div>
    </div>
  );
}