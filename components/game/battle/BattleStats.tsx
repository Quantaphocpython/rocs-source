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
            className="mb-3 w-[380px] bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-gray-400" />
                <h3 className="text-base font-medium text-white">Battle Log</h3>
              </div>
              <div className="text-xs text-gray-400">Last {lastFiveActions.length} actions</div>
            </div>
            <div className="max-h-[300px] overflow-y-auto bg-gray-900">
              {lastFiveActions.map((entry, index) => (
                <div
                  key={index}
                  className="px-4 py-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white">Turn {entry.turn}</span>
                    <span className="text-xs text-gray-400">
                      {entry.action === "play_card" ? "Card Play" : "Monster Action"}
                    </span>
                  </div>
                  {entry.action === "play_card" ? (
                    <div className="mt-1 text-xs space-y-1">
                      <div className="text-gray-300">• Card #{entry.cardId} was played</div>
                      <div className="text-red-600">• Dealt {entry.damageDealt} damage</div>
                      <div className="text-gray-400">• Monster HP: {entry.monsterHpLeft}</div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs space-y-1">
                      <div className="text-red-600">• Monster attacked</div>
                      <div className="text-gray-400">• Your HP: {entry.playerHpLeft}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md border border-gray-700 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Scroll className="w-4 h-4 mr-2 text-gray-400" />
        Battle Log
        {isExpanded ? <ChevronDown className="w-4 h-4 ml-2 text-gray-400" /> : <ChevronUp className="w-4 h-4 ml-2 text-gray-400" />}
      </Button>
    </div>
  );
}