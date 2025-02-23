'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGameLogic } from '@/hooks/useGameLogic';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { Button } from './ui/button';
import { GameField } from './game/GameField';
import { GameHeader } from './game/GameHeader';
import { PhaseAnnouncement } from './game/phase-announcement';
import { PlayerHand } from './game/player-hand';
import { TutorialDialog } from './game/tutorial-dialog';
import type { Card } from '@/types/game';

interface GameBoardProps {
  initialDeck: Card[];
}

export function GameBoard({ initialDeck }: GameBoardProps) {
  const router = useRouter();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const {
    isPlayerTurn,
    selectedCard,
    targetSlot,
    roundCounter,
    startGame,
    playCard,
    endTurn,
    setSelectedCard,
    setTargetSlot,
    gameState,
    announcement,
    setAnnouncement,
  } = useGameLogic();

  useEffect(() => {
    if (!isGameStarted && initialDeck) {
      startGame(initialDeck);
      setIsGameStarted(true);
    }
  }, [initialDeck, startGame, isGameStarted]);

  const handleCardSelect = useCallback((index: number) => {
    setSelectedCard(prev => prev === index ? null : index);
  }, [setSelectedCard]);

  const handleCardPlay = useCallback((cardIndex: number, slotIndex: number) => {
    playCard(cardIndex, slotIndex);
  }, [playCard]);

  return (
    <div className="game-board">
      <PhaseAnnouncement
        message={announcement.message}
        type={announcement.type}
        onComplete={() => setAnnouncement({ message: null, type: 'phase' })}
      />

      <GameHeader
        isPlayerTurn={isPlayerTurn}
        playerHealth={gameState.playerHealth}
        playerStamina={gameState.playerStamina}
        currentStage={gameState.currentStage}
        roundCounter={roundCounter}
        monsterHealth={gameState.currentMonster.health}
        monsterAttack={gameState.currentMonster.attack}
        onTutorialOpen={() => setIsTutorialOpen(true)}
      />

      <GameField
        cardsOnField={gameState.cardsOnField}
        selectedCard={selectedCard}
        targetSlot={targetSlot}
        isPlayerTurn={isPlayerTurn}
        onCardPlay={handleCardPlay}
        onTargetSlotChange={setTargetSlot}
        battleHistory={gameState.battleHistory}
      />

      <PlayerHand
        deck={gameState.deck}
        selectedCard={selectedCard}
        isPlayerTurn={isPlayerTurn}
        playerStamina={gameState.playerStamina}
        onCardSelect={handleCardSelect}
      />

      <div className="flex justify-end gap-4 p-6 bg-black/30 border-t border-yellow-900/50">
        <Button
          className="action-button"
          disabled={!isPlayerTurn || selectedCard === null}
          onClick={() =>
            selectedCard !== null &&
            targetSlot !== null &&
            handleCardPlay(selectedCard, targetSlot)
          }
        >
          Play Card
        </Button>
        <Button
          className="action-button"
          disabled={!isPlayerTurn}
          onClick={endTurn}
        >
          End Turn
        </Button>
      </div>

      <TutorialDialog
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}

export default GameBoard;