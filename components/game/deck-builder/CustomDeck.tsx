'use client';

import { Card } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { DECK_SIZE } from "@/constants/game";
import { DeckStats } from "./DeckStats";
import { convertToGameCard } from "@/utils/gameLogic";

interface CustomDeckProps {
  deck: Card[];
  onRemoveCard: (index: number) => void;
}

export function CustomDeck({ deck, onRemoveCard }: CustomDeckProps) {
  return (
    <div className="bg-black/30 border border-yellow-900/50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        Your Deck ({deck.length}/{DECK_SIZE})
      </h3>

      <DeckStats cards={deck} />

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {deck.map((card, index) => (
            <motion.div
              key={`${card.id}-${index}`}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative group"
            >
              <GameCard
                card={convertToGameCard(card)}
                onClick={() => onRemoveCard(index)}
                size="small"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCard(index);
                  }}
                >
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}