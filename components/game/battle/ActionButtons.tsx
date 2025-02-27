'use client';

import { Button } from '../../ui/button';

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
  onEndTurn,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-6 p-6 bg-gradient-to-t from-gray-900 to-black/50 border-t border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
      <Button
        className={`font-semibold py-3 px-8 rounded-lg transition-all duration-200 ${
          isPlayerTurn && selectedCard !== null && targetSlot !== null
            ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-500/50'
        }`}
        disabled={!isPlayerTurn || selectedCard === null || targetSlot === null}
        onClick={() =>
          selectedCard !== null && targetSlot !== null && onPlayCard()
        }
      >
        Play Card
      </Button>
      <Button
        className={`font-semibold py-3 px-8 rounded-lg transition-all duration-200 ${
          isPlayerTurn
            ? 'bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:shadow-[0_0_15px_rgba(234,179,8,0.8)]'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-500/50'
        }`}
        disabled={!isPlayerTurn}
        onClick={onEndTurn}
      >
        End Turn
      </Button>
    </div>
  );
}
