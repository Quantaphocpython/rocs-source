"use client";

import { useState } from "react";
import { GameState } from "@/types/game";
import { Scroll, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../ui/button";

interface BattleStatsProps {
  history: GameState["battleHistory"];
}

export function BattleStats({ history }: BattleStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lastFiveActions = history.slice(-5).reverse();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-2 w-96 bg-black border border-yellow-900 rounded-lg overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-yellow-900 bg-yellow-950">
              <div className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-medium text-yellow-400">Battle Log</h3>
              </div>
              <div className="text-sm text-yellow-600">Last {lastFiveActions.length} actions</div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {lastFiveActions.map((entry, index) => (
                <div
                  key={index}
                  className="px-4 py-3 border-b border-yellow-900 last:border-b-0 hover:bg-yellow-950/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-400">Turn {entry.turn}</span>
                    <span className="text-xs text-yellow-600">
                      {entry.action === "play_card" ? "Card Play" : "Monster Action"}
                    </span>
                  </div>
                  {entry.action === "play_card" ? (
                    <div className="mt-1 text-sm">
                      <div className="text-yellow-500">
                        • Card #{entry.cardId} was played
                      </div>
                      <div className="text-red-400">
                        • Dealt {entry.damageDealt} damage
                      </div>
                      <div className="text-yellow-600">
                        • Monster HP reduced to {entry.monsterHpLeft}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-sm">
                      <div className="text-red-400">
                        • Monster attacked
                      </div>
                      <div className="text-yellow-600">
                        • Your HP reduced to {entry.playerHpLeft}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="bg-yellow-950 hover:bg-yellow-900 text-yellow-400 border border-yellow-900 shadow-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Scroll className="w-4 h-4 mr-2" />
        Battle Log
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 ml-2" />
        ) : (
          <ChevronUp className="w-4 h-4 ml-2" />
        )}
      </Button>
    </div>
  );
}