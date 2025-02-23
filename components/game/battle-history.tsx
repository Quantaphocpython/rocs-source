"use client";

import { GameState } from "@/types/game";

interface BattleHistoryProps {
  history: GameState["battleHistory"];
}

export function BattleHistory({ history }: BattleHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Battle History</h2>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {history.map((entry, index) => (
          <div key={index} className="text-sm bg-gray-50 rounded-lg p-3 flex items-center gap-2">
            <span className="font-semibold">Turn {entry.turn}:</span>
            <span>
              {entry.action === "play_card"
                ? `Played card ${entry.cardId} dealing ${entry.damageDealt} damage. Monster HP: ${entry.monsterHpLeft}`
                : `Monster attacked. Player HP: ${entry.playerHpLeft}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}