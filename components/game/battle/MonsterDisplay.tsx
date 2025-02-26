'use client';

import { Heart, Sword } from "lucide-react";
import { motion } from 'framer-motion';

interface MonsterDisplayProps {
  health: number;
  attack: number;
}

export function MonsterDisplay({ health, attack }: MonsterDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 border border-red-900/30 backdrop-blur-sm group"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Heart className="w-4 h-4 text-red-400" />
        <div className="text-sm font-medium text-red-300">{health}</div>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 border border-red-900/50 rounded px-2 py-1 text-[10px] text-red-400 whitespace-nowrap z-50">
          Monster HP
        </span>
      </motion.div>

      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 border border-orange-900/30 backdrop-blur-sm group"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Sword className="w-4 h-4 text-orange-400" />
        <div className="text-sm font-medium text-orange-300">{attack}</div>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 border border-orange-900/50 rounded px-2 py-1 text-[10px] text-orange-400 whitespace-nowrap z-50">
          Attack
        </span>
      </motion.div>
    </div>
  );
}