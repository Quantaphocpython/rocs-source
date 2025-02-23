"use client";

import { memo } from 'react';
import { GameCard } from "@/types/game";
import { GameCard as GameCardComponent } from "../ui/game-card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerHandProps {
  deck: GameCard[];
  selectedCard: number | null;
  isPlayerTurn: boolean;
  playerStamina: number;
  onCardSelect: (index: number) => void;
}

export const PlayerHand = memo(function PlayerHand({
  deck,
  selectedCard,
  isPlayerTurn,
  playerStamina,
  onCardSelect
}: PlayerHandProps) {
  return (
    <div id="player-hand" className="player-hand">
      <div className="h-full flex items-center justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {deck.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "transform transition-all duration-300 hover:-translate-y-4",
                selectedCard === index && "-translate-y-4 ring-2 ring-yellow-400"
              )}
            >
              <GameCardComponent
                card={card}
                onClick={() => isPlayerTurn && onCardSelect(index)}
                selected={selectedCard === index}
                disabled={!isPlayerTurn || playerStamina < card.staminaCost}
                size="small"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});