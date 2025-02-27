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
    currentPhase,
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
        bossName={'boss'}
        cardsOnField={gameState.cardsOnField}
        selectedCard={selectedCard}
        targetSlot={targetSlot}
        isPlayerTurn={isPlayerTurn}
        currentPhase={currentPhase}
        onCardPlay={(cardIndex, slotIndex) => playCard(cardIndex, slotIndex)}
        onTargetSlotChange={setTargetSlot}
        battleHistory={gameState.battleHistory}
        bossHealth={gameState.currentMonster.health}
        bossMaxHealth={60} // This should come from monster data
        bossAttack={gameState.currentMonster.attack}
        bossImage="https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png" // This should come from monster data
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
