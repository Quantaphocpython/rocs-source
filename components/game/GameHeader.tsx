import { Button } from '../ui/button';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { PlayerStats } from './player-stats';
import { MonsterDisplay } from './monster-display';
import { calculateStaminaGain } from '@/utils/gameLogic';

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
    <div className="game-header">
      <div className="turn-indicator">
        <div className="text-lg font-medium text-yellow-400">
          {isPlayerTurn ? 'Your Turn' : "Monster's Turn"}
        </div>
      </div>

      <div className="h-full flex items-center justify-between">
        <div id="player-stats">
          <PlayerStats
            health={playerHealth}
            stamina={playerStamina}
            stage={currentStage}
            round={roundCounter}
            nextStaminaGain={calculateStaminaGain(roundCounter)}
          />
        </div>
        <Button
          className="absolute top-6 right-6 action-button"
          onClick={onTutorialOpen}
        >
          <QuestionMarkCircle className="w-4 h-4" />
          How to Play
        </Button>
        <div id="monster-stats">
          <MonsterDisplay health={monsterHealth} attack={monsterAttack} />
        </div>
      </div>
    </div>
  );
}
