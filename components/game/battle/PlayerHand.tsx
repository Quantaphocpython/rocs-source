'use client';

import { memo } from 'react';
import { GameCard } from "@/types/game";
import { GameCard as GameCardComponent } from "../../ui/game-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerHandProps {
  deck: GameCard[];
  selectedCard: number | null;
  isPlayerTurn: boolean;
  playerStamina: number;
  onCardSelect: (index: number) => void;
  onPlayCard: () => void;
  onEndTurn: () => void;
  canPlayCard: boolean;
  canPlayAnyCard: () => boolean;
}

export const PlayerHand = memo(function PlayerHand({
  deck,
  selectedCard,
  isPlayerTurn,
  playerStamina,
  onCardSelect,
  onPlayCard,
  onEndTurn,
  canPlayCard,
  canPlayAnyCard
}: PlayerHandProps) {
  return (
    <div id="player-hand" className="player-hand relative">
      {/* Action Buttons */}
      <div className="absolute -top-16 right-8 flex items-center gap-4 z-10">
        <Button
          className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400"
          disabled={!isPlayerTurn || !canPlayCard}
          onClick={onPlayCard}
        >
          Play Card
        </Button>
        <Button
          className={cn(
            "bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400",
            !canPlayAnyCard() && isPlayerTurn && "animate-pulse ring-2 ring-yellow-400"
          )}
          disabled={!isPlayerTurn}
          onClick={onEndTurn}
        >
          End Turn
        </Button>
      </div>

      {/* Cards */}
      <div className="h-full flex items-center justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {deck.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              whileHover={{ y: -16, scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className={cn(
                "transform transition-all duration-300",
                selectedCard === index && "ring-2 ring-yellow-400"
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