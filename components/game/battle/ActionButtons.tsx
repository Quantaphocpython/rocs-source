"use client";

import { Button } from "../../ui/button";

interface ActionButtonsProps {
  isPlayerTurn: boolean;
  selectedCard: number | null;
  targetSlot: number | null;
  onPlayCard: () => void;
  onEndTurn: () => void;
}

export function ActionButtons({
  isPlayerTurn,
  selectedCard,
  targetSlot,
  onPlayCard,
  onEndTurn
}: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-4 p-6 bg-black/30 border-t border-yellow-900/50">
      <Button
        className="action-button"
        disabled={!isPlayerTurn || selectedCard === null}
        onClick={() => selectedCard !== null && targetSlot !== null && onPlayCard()}
      >
        Play Card
      </Button>
      <Button
        className="action-button"
        disabled={!isPlayerTurn}
        onClick={onEndTurn}
      >
        End Turn
      </Button>
    </div>
  );
}