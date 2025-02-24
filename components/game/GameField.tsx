"use client";

import type { GameCard, GameState } from '@/types/game';
import { cn } from '@/lib/utils';
import { GameCard as GameCardComponent } from '../ui/game-card';
import { BattleStats } from './battle-stats';
import { motion, AnimatePresence } from 'framer-motion';

interface GameFieldProps {
  cardsOnField: (GameCard | null)[];
  selectedCard: number | null;
  targetSlot: number | null;
  isPlayerTurn: boolean;
  onCardPlay: (cardIndex: number, slotIndex: number) => void;
  onTargetSlotChange: (slotIndex: number | null) => void;
  battleHistory: GameState['battleHistory'];
}

export function GameField({
  cardsOnField,
  selectedCard,
  targetSlot,
  isPlayerTurn,
  onCardPlay,
  onTargetSlotChange,
  battleHistory,
}: GameFieldProps) {
  return (
    <div id="battle-field" className="battle-field">
      {/* Mystical Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm" />

      <div className="relative h-full flex flex-col">
        {/* Battle Arena */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="grid grid-cols-5 gap-6 max-w-6xl w-full">
            <AnimatePresence>
              {[...Array(5)].map((_, index) => {
                const card = cardsOnField[index];
                return (
                  <motion.div
                    key={`slot-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      'card-slot relative aspect-[3/4]',
                      'bg-gradient-to-br from-gray-800/30 to-gray-900/30',
                      'border border-yellow-900/30 backdrop-blur-sm',
                      'transition-all duration-300 ease-in-out',
                      'hover:border-yellow-600/50 hover:shadow-lg hover:shadow-yellow-900/20',
                      targetSlot === index && 'border-yellow-400 shadow-lg shadow-yellow-400/20',
                      selectedCard !== null && !card && 'cursor-pointer hover:bg-yellow-900/20'
                    )}
                    onClick={() => {
                      if (selectedCard !== null && !card) {
                        onCardPlay(selectedCard, index);
                      }
                    }}
                    onMouseEnter={() => {
                      if (selectedCard !== null && !card) {
                        onTargetSlotChange(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (targetSlot === index) {
                        onTargetSlotChange(null);
                      }
                    }}
                  >
                    {/* Slot Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {!card && (
                        <div className="text-yellow-900/30 text-lg font-medium">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    {/* Card Container */}
                    <AnimatePresence mode="wait">
                      {card && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="transform transition-all duration-300 hover:scale-105">
                            <GameCardComponent
                              card={card}
                              disabled={true}
                              size="small"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Effect */}
                    {selectedCard !== null && !card && (
                      <div className="absolute inset-0 bg-yellow-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Battle Log */}
        <div id="battle-log" className="relative z-10">
          <BattleStats history={battleHistory} />
        </div>
      </div>
    </div>
  );
}