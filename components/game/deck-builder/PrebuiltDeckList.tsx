'use client';

import { motion } from 'framer-motion';
import { Sword, Shield, Zap } from 'lucide-react';
import { GameCard } from '../../ui/game-card';
import { cn } from '@/lib/utils';
import type { PrebuiltDeck, Card } from '@/types/game';

interface PrebuiltDeckListProps {
    decks: PrebuiltDeck[];
    selectedDeck: PrebuiltDeck | null;
    onDeckSelect: (deck: PrebuiltDeck) => void;
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

export function PrebuiltDeckList({ decks, selectedDeck, onDeckSelect }: PrebuiltDeckListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {decks.map((deck) => (
                <motion.div
                    key={deck.id}
                    className={cn(
                        'relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300',
                        selectedDeck?.id === deck.id ? 'ring-4 ring-yellow-400 transform scale-105' : 'hover:scale-105'
                    )}
                    onClick={() => onDeckSelect(deck)}
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
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                                    <Sword className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-200">
                                        {getDeckStats(deck.cards).totalAttack}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                                    <Shield className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-200">
                                        {getDeckStats(deck.cards).totalHealth}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    <span className="text-yellow-200">
                                        {getDeckStats(deck.cards).avgCost}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-4">
                                {deck.cards.slice(0, 5).map((card, index) => (
                                    <div key={index} className="flex-shrink-0 w-20">
                                        <GameCard
                                            card={card}
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

                        {selectedDeck?.id === deck.id && (
                            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                                Selected
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}