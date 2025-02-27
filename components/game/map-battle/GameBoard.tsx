'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMapBattleLogic } from '@/hooks/useMapBattleLogic';
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameField } from '@/components/game/battle/GameField';
import { GameHeader } from '@/components/game/battle/GameHeader';
import { PhaseAnnouncement } from '@/components/game/battle/PhaseAnnouncement';
import { PlayerHand } from '@/components/game/battle/PlayerHand';
import { TutorialDialog } from '@/components/game/tutorial/TutorialDialog';
import { VictoryScreen } from '@/components/game/map-battle/VictoryScreen';
import { DefeatScreen } from '@/components/game/map-battle/DefeatScreen';
import type { Card, Boss, Monster } from '@/types/game';

interface GameBoardProps {
  initialDeck: Card[];
  boss: Monster;
}

export function GameBoard({ initialDeck, boss }: GameBoardProps) {
  const router = useRouter();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState<'victory' | 'defeat' | null>(null);

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
  } = useMapBattleLogic(boss);

  useEffect(() => {
    if (!isGameStarted && initialDeck) {
      startGame(initialDeck);
      setIsGameStarted(true);
    }
  }, [initialDeck, startGame, isGameStarted]);

  useEffect(() => {
    if (gameState.playerHealth <= 0) {
      setGameEnded('defeat');
    } else if (gameState.currentBoss.health <= 0) {
      setGameEnded('victory');
    }
  }, [gameState.playerHealth, gameState.currentBoss.health]);

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

  const handleReturnToMap = useCallback(() => {
    router.push('/map');
  }, [router]);

  if (gameEnded === 'victory') {
    return <VictoryScreen boss={boss} onContinue={handleReturnToMap} />;
  }

  if (gameEnded === 'defeat') {
    return (
      <DefeatScreen
        boss={boss}
        onRetry={() => setGameEnded(null)}
        onReturnToMap={handleReturnToMap}
      />
    );
  }

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
        monsterHealth={gameState.currentBoss.health}
        monsterAttack={gameState.currentBoss.attack}
        onTutorialOpen={() => setIsTutorialOpen(true)}
      />

      <GameField
        cardsOnField={gameState.cardsOnField}
        selectedCard={selectedCard}
        targetSlot={targetSlot}
        isPlayerTurn={isPlayerTurn}
        currentPhase={currentPhase}
        onCardPlay={(cardIndex, slotIndex) => playCard(cardIndex, slotIndex)}
        onTargetSlotChange={setTargetSlot}
        battleHistory={gameState.battleHistory}
        bossHealth={gameState.currentBoss.health}
        bossMaxHealth={boss.health}
        bossAttack={gameState.currentBoss.attack}
        bossImage={boss.image}
        bossName={boss.name}
      />

      <PlayerHand
        deck={gameState.deck}
        selectedCard={selectedCard}
        isPlayerTurn={isPlayerTurn}
        playerStamina={gameState.playerStamina}
        onCardSelect={handleCardSelect}
        onPlayCard={handleCardPlay}
        onEndTurn={endTurn}
        canPlayCard={selectedCard !== null && targetSlot !== null}
        canPlayAnyCard={canPlayAnyCard}
      />

      <TutorialDialog
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}
