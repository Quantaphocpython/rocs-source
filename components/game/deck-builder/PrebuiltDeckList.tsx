'use client';

import { motion } from 'framer-motion';
import { PrebuiltDeck } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { cn } from "@/lib/utils";
import { DeckStats } from "./DeckStats";
import { convertToGameCard } from "@/utils/gameLogic";

interface PrebuiltDeckCardProps {
  deck: PrebuiltDeck;
  isSelected: boolean;
  onSelect: (deck: PrebuiltDeck) => void;
}

export function PrebuiltDeckCard({ deck, isSelected, onSelect }: PrebuiltDeckCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300',
        isSelected ? 'ring-4 ring-yellow-400 transform scale-105' : 'hover:scale-105'
      )}
      onClick={() => onSelect(deck)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0">
        <img
          src={deck.coverImage}
          alt={deck.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative p-6 min-h-[400px] flex flex-col">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{deck.name}</h3>
        <p className="text-yellow-200/80 mb-6">{deck.description}</p>

        <div className="mt-auto">
          <DeckStats cards={deck.cards} />

          <div className="flex gap-2 overflow-x-auto pb-4">
            {deck.cards.slice(0, 5).map((card, index) => (
              <div key={index} className="flex-shrink-0 w-20">
                <GameCard
                  card={convertToGameCard(card)}
                  disabled={true}
                  size="small"
                />
              </div>
            ))}
            {deck.cards.length > 5 && (
              <div className="flex-shrink-0 w-20 h-28 flex items-center justify-center bg-black/40 rounded-lg">
                <span className="text-yellow-400">+{deck.cards.length - 5}</span>
              </div>
            )}
          </div>
        </div>

        {isSelected && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
            Selected
          </div>
        )}
      </div>
    </motion.div>
  );
}