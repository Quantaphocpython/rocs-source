'use client';

import { Card } from '@/types/game';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { DECK_SIZE } from '@/constants/game';
import { DeckStats } from './DeckStats';
import { convertToGameCard } from '@/utils/gameLogic';
import { Trash2 } from 'lucide-react';

interface DeckPreviewProps {
  deck: Card[];
  onRemoveCard: (index: number) => void;
}

export function DeckPreview({ deck, onRemoveCard }: DeckPreviewProps) {
  return (
    <div className="bg-black/30 border border-yellow-900/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-yellow-400">Your Deck</h3>
        <span className="px-3 py-1 bg-black/60 rounded-lg text-sm font-medium text-yellow-400">
          {deck.length} / {DECK_SIZE}
        </span>
      </div>

      <DeckStats cards={deck} />

      <div className="space-y-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
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
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCard(index);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        {deck.length === 0 && (
          <div className="text-center py-8 text-yellow-400/60">
            Click on cards to add them to your deck
          </div>
        )}
      </div>
    </div>
  );
}
