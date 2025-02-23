'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../ui/button';
import { GameCard } from '../../ui/game-card';
import { Sword, Shield, Zap } from 'lucide-react';
import type { Card } from '@/types/game';
import { DECK_SIZE } from '@/constants/game';

interface CustomDeckProps {
    deck: Card[];
    onRemoveCard: (index: number) => void;
}

function getDeckStats(cards: Card[]) {
    return {
        totalAttack: cards.reduce((sum, card) => sum + card.attack, 0),
        totalHealth: cards.reduce((sum, card) => sum + card.health, 0),
        avgCost: cards.length > 0
            ? (cards.reduce((sum, card) => sum + card.staminaCost, 0) / cards.length).toFixed(1)
            : '0.0'
    };
}

export function CustomDeck({ deck, onRemoveCard }: CustomDeckProps) {
    const stats = getDeckStats(deck);

    return (
        <div className="bg-black/30 border border-yellow-900/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
                Your Deck ({deck.length}/{DECK_SIZE})
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Sword className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">{stats.totalAttack}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">{stats.totalHealth}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">{stats.avgCost}</span>
                </div>
            </div>

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
                                card={card}
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