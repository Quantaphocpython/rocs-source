"use client";

import { Heart, Sword } from "lucide-react";

interface MonsterDisplayProps {
  health: number;
  attack: number;
}

export function MonsterDisplay({ health, attack }: MonsterDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Current Monster</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full">
          <Heart className="w-5 h-5" />
          <span className="text-xl font-bold">{health}</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
          <Sword className="w-5 h-5" />
          <span className="text-xl font-bold">{attack}</span>
        </div>
      </div>
    </div>
  );
}