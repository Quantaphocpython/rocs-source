'use client';

import { Heart, Zap, Trophy, Clock } from "lucide-react";
import { motion } from 'framer-motion';

interface PlayerStatsProps {
  health: number;
  stamina: number;
  stage: number;
  round: number;
  nextStaminaGain: number;
}

export function PlayerStats({ health, stamina, stage, round, nextStaminaGain }: PlayerStatsProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 border border-red-900/30 backdrop-blur-sm group"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Heart className="w-4 h-4 text-red-400" />
        <div className="text-sm font-medium text-red-300">{health}</div>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 border border-red-900/50 rounded px-2 py-1 text-[10px] text-red-400 whitespace-nowrap z-50">
          HP
        </span>
      </motion.div>

      <motion.div
        className="stat-display group relative"
        whileHover={{ scale: 1.05 }}
      >
        <Zap className="w-3 h-3 text-yellow-400" />
        <div>
          <div className="text-[10px] text-yellow-400/80">Stamina</div>
          <div className="text-sm text-yellow-400">{stamina}/5</div>
        </div>
        <div className="absolute -bottom-8 left-0 hidden group-hover:block 
                      bg-black/90 border border-violet-900/50 rounded px-2 py-1 
                      text-[10px] text-violet-400 whitespace-nowrap z-50">
          Next turn: {nextStaminaGain}/5
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 border border-violet-900/30 backdrop-blur-sm group"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Trophy className="w-4 h-4 text-violet-400" />
        <div className="text-sm font-medium text-violet-300">{stage}</div>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 border border-violet-900/50 rounded px-2 py-1 text-[10px] text-violet-400 whitespace-nowrap z-50">
          Stage
        </span>
      </motion.div>

      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 border border-violet-900/30 backdrop-blur-sm group"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <Clock className="w-4 h-4 text-violet-400" />
        <div className="text-sm font-medium text-violet-300">{round}</div>
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 border border-violet-900/50 rounded px-2 py-1 text-[10px] text-violet-400 whitespace-nowrap z-50">
          Round
        </span>
      </motion.div>
    </div>
  );
}