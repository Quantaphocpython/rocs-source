'use client';

import { Card } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { motion, AnimatePresence } from "framer-motion";
import { convertToGameCard } from "@/utils/gameLogic";
import { cn } from "@/lib/utils";

interface CardGridProps {
    cards: Card[];
    customDeck: Card[];
    onCardSelect: (card: Card) => void;
}

export function CardGrid({ cards, customDeck, onCardSelect }: CardGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
                {cards.map((card) => {
                    const count = customDeck.filter(c => c.id === card.id).length;
                    const isMaxed = count >= card.maxPerSession;

                    return (
                        <motion.div
                            key={card.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative group"
                        >
                            <GameCard
                                card={convertToGameCard(card)}
                                onClick={() => onCardSelect(card)}
                                disabled={isMaxed}
                                className={cn(
                                    "transition-all duration-300",
                                    isMaxed && "opacity-50 grayscale"
                                )}
                            />
                            <div className={cn(
                                "absolute top-2 left-2 px-3 py-1 rounded-lg",
                                "bg-black/90 border border-yellow-900/50",
                                "text-sm font-medium",
                                isMaxed ? "text-red-400" : "text-yellow-400"
                            )}>
                                {count} / {card.maxPerSession}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}