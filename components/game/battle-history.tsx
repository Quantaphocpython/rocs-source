"use client";

import { GameState } from "@/types/game";

interface BattleHistoryProps {
  history: GameState["battleHistory"];
}

export function BattleHistory({ history }: BattleHistoryProps) {
  return (
    <div className="bg-card p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Battle History</h2>
      <div className="space-y-2">
        {history.map((entry, index) => (
          <div key={index} className="text-sm">
            Turn {entry.turn}:{" "}
            {entry.action === "play_card"
              ? `Played card ${entry.cardId} dealing ${entry.damageDealt} damage. Monster HP: ${entry.monsterHpLeft}`
              : `Monster attacked. Player HP: ${entry.playerHpLeft}`}
          </div>
        ))}
      </div>
    </div>
  );
}