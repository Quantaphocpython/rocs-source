"use client";

import { Heart, Sword } from "lucide-react";

interface MonsterDisplayProps {
  health: number;
  attack: number;
}

export function MonsterDisplay({ health, attack }: MonsterDisplayProps) {
  return (
    <div className="bg-card p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Current Monster</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <span className="text-xl">{health}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sword className="w-6 h-6" />
          <span className="text-xl">{attack}</span>
        </div>
      </div>
    </div>
  );
}