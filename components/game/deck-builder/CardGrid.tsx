'use client';

import { Card } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { motion, AnimatePresence } from "framer-motion";
import { convertToGameCard } from "@/utils/gameLogic";

interface CardGridProps {
    cards: Card[];
    customDeck: Card[];
    onCardSelect: (card: Card) => void;
}

export function CardGrid({ cards, customDeck, onCardSelect }: CardGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
                {cards.map((card) => (
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
                            disabled={customDeck.filter(c => c.id === card.id).length >= card.maxPerSession}
                        />
                        <div className="absolute top-2 left-2 px-3 py-1 bg-black/90 border border-yellow-900/50 rounded-lg">
                            <span className="text-sm font-medium text-yellow-400">
                                {customDeck.filter(c => c.id === card.id).length} / {card.maxPerSession}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}