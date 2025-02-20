'use client';

import { CARDS_TO_SHOW, DECK_SIZE } from '@/constants/game';
import { useGameLogic } from '@/hooks/useGameLogic';
import { cardPool } from '@/lib/mock-data';
import type { Card } from '@/types/game';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DeckBuilder } from './game/deck-builder';
import { GameField } from './game/GameField';
import { GameHeader } from './game/GameHeader';
import { PhaseAnnouncement } from './game/phase-announcement';
import { PlayerHand } from './game/player-hand';
import { TutorialDialog } from './game/tutorial-dialog';
import { Button } from './ui/button';

export function GameBoard() {
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

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
    setGameState,
    isDeckBuilding,
    announcement,
    setAnnouncement,
  } = useGameLogic();

  useEffect(() => {
    const shuffledCards = [...cardPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, CARDS_TO_SHOW);
    setAvailableCards(shuffledCards);
  }, []);

  return (
    <div className="game-board">
      <PhaseAnnouncement
        message={announcement.message}
        type={announcement.type}
        onComplete={() => setAnnouncement({ message: null, type: 'phase' })}
      />

      {isDeckBuilding ? (
        <>
          <DeckBuilder
            availableCards={availableCards}
            onStartGame={startGame}
            deckSize={DECK_SIZE}
          />
          <Button
            className="fixed bottom-4 right-4 action-button"
            onClick={() => setIsTutorialOpen(true)}
          >
            <QuestionMarkCircle className="w-4 h-4" />
            How to Play
          </Button>
        </>
      ) : (
        <>
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
            onCardPlay={playCard}
            onTargetSlotChange={setTargetSlot}
            battleHistory={gameState.battleHistory}
          />

          <PlayerHand
            deck={gameState.deck}
            selectedCard={selectedCard}
            isPlayerTurn={isPlayerTurn}
            playerStamina={gameState.playerStamina}
            onCardSelect={setSelectedCard}
          />

          <div className="flex justify-end gap-4 p-6 bg-black/30 border-t border-yellow-900/50">
            <Button
              className="action-button"
              disabled={!isPlayerTurn || selectedCard === null}
              onClick={() =>
                selectedCard !== null &&
                targetSlot !== null &&
                playCard(selectedCard, targetSlot)
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
        </>
      )}

      <TutorialDialog
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}

export default GameBoard;
