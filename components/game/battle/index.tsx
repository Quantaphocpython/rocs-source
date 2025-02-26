'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGameLogic } from '@/hooks/useGameLogic';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { GameField } from './GameField';
import { GameHeader } from './GameHeader';
import { PhaseAnnouncement } from './PhaseAnnouncement';
import { PlayerHand } from './PlayerHand';
import { TutorialDialog } from '../tutorial/TutorialDialog';
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
    canPlayAnyCard,
  } = useGameLogic();

  useEffect(() => {
    if (!isGameStarted && initialDeck) {
      startGame(initialDeck);
      setIsGameStarted(true);
    }
  }, [initialDeck, startGame, isGameStarted]);

  const handleCardSelect = useCallback(
    (index: number) => {
      setSelectedCard((prev) => (prev === index ? null : index));
    },
    [setSelectedCard]
  );

  const handleCardPlay = useCallback(() => {
    if (selectedCard !== null && targetSlot !== null) {
      playCard(selectedCard, targetSlot);
    }
  }, [playCard, selectedCard, targetSlot]);

  const canPlaySelectedCard = selectedCard !== null && targetSlot !== null;

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
        onCardPlay={(cardIndex, slotIndex) => playCard(cardIndex, slotIndex)}
        onTargetSlotChange={setTargetSlot}
        battleHistory={gameState.battleHistory}
      />

      <PlayerHand
        deck={gameState.deck}
        selectedCard={selectedCard}
        isPlayerTurn={isPlayerTurn}
        playerStamina={gameState.playerStamina}
        onCardSelect={handleCardSelect}
        onPlayCard={handleCardPlay}
        onEndTurn={endTurn}
        canPlayCard={canPlaySelectedCard}
        canPlayAnyCard={canPlayAnyCard}
      />

      <TutorialDialog
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}
