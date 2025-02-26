'use client';

import { Button } from '@/components/ui/button';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { PlayerStats } from './PlayerStats';
import { MonsterDisplay } from './MonsterDisplay';
import { calculateStaminaGain } from '@/utils/gameLogic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  isPlayerTurn: boolean;
  playerHealth: number;
  playerStamina: number;
  currentStage: number;
  roundCounter: number;
  monsterHealth: number;
  monsterAttack: number;
  onTutorialOpen: () => void;
}

export function GameHeader({
  isPlayerTurn,
  playerHealth,
  playerStamina,
  currentStage,
  roundCounter,
  monsterHealth,
  monsterAttack,
  onTutorialOpen,
}: GameHeaderProps) {
  return (
    <div className="relative px-4 py-2 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md border-b border-violet-900/30 shadow-md shadow-violet-900/10">
      <div className="flex items-center justify-between">
        {/* Left Side - Player Stats */}
        <div id="player-stats" className="flex-1">
          <PlayerStats
            health={playerHealth}
            stamina={playerStamina}
            stage={currentStage}
            round={roundCounter}
            nextStaminaGain={calculateStaminaGain(roundCounter)}
          />
        </div>

        {/* Center - Turn Indicator */}
        <motion.div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-full",
            "bg-gradient-to-r from-black/80 to-violet-900/50 backdrop-blur-sm border",
            isPlayerTurn ? "border-violet-400/50" : "border-red-400/50",
            "shadow-lg shadow-violet-900/20"
          )}
          animate={{
            scale: isPlayerTurn ? [1, 1.05, 1] : 1,
            transition: { duration: 0.5, repeat: isPlayerTurn ? Infinity : 0, repeatDelay: 1 },
          }}
        >
          <div
            className={cn(
              "text-sm font-semibold transition-colors duration-300",
              isPlayerTurn ? "text-violet-300" : "text-red-300"
            )}
          >
            {isPlayerTurn ? "Your Turn" : "Monster's Turn"}
          </div>
        </motion.div>

        {/* Right Side - Monster Stats & Tutorial */}
        <div className="flex items-center gap-3">
          <div id="monster-stats">
            <MonsterDisplay health={monsterHealth} attack={monsterAttack} />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-black/40 hover:bg-violet-900/50 text-violet-300
                       border border-violet-400/20 backdrop-blur-sm rounded-full
                       transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-violet-900/30"
            onClick={onTutorialOpen}
          >
            <QuestionMarkCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}