'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrebuiltDeck } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { cn } from "@/lib/utils";
import { convertToGameCard } from "@/utils/gameLogic";
import { Sword, Shield, Zap, Star, Crosshair, ChevronDown } from 'lucide-react';

interface PrebuiltDeckCardProps {
    deck: PrebuiltDeck;
    isSelected: boolean;
    onSelect: (deck: PrebuiltDeck) => void;
}

export function PrebuiltDeckCard({ deck, isSelected, onSelect }: PrebuiltDeckCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const stats = {
        totalAttack: deck.cards.reduce((sum, card) => sum + card.attack, 0),
        totalHealth: deck.cards.reduce((sum, card) => sum + card.health, 0),
        avgCost: (deck.cards.reduce((sum, card) => sum + card.staminaCost, 0) / deck.cards.length).toFixed(1)
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-400';
            case 'Medium': return 'text-yellow-400';
            case 'Hard': return 'text-orange-400';
            case 'Expert': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getPlaystyleColor = (playstyle: string) => {
        switch (playstyle) {
            case 'Aggressive': return 'text-red-400';
            case 'Defensive': return 'text-blue-400';
            case 'Control': return 'text-purple-400';
            case 'Combo': return 'text-green-400';
            case 'Versatile': return 'text-yellow-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <motion.div
            className={cn(
                'relative rounded-xl overflow-hidden transition-all duration-500',
                'bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md',
                'border border-yellow-900/30 hover:border-yellow-400/50',
                'group hover:shadow-2xl hover:shadow-yellow-900/20',
                isSelected && 'ring-1 ring-yellow-400/50 shadow-lg shadow-yellow-400/10'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Background Image with Overlay */}
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(deck);
                    }}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-all duration-300",
                        "flex items-center gap-1.5 backdrop-blur-sm",
                        isSelected ? (
                            "bg-violet-500/20 text-violet-200 border-violet-400/30"
                        ) : (
                            "bg-black/40 text-yellow-400/80 hover:text-yellow-400 border-yellow-900/30 hover:border-yellow-400/30"
                        ),
                        "border",
                    )}
                >
                    {isSelected ? (
                        <>
                            <Star className="w-3.5 h-3.5" />
                            <span>Selected</span>
                        </>
                    ) : (
                        <>
                            <Sword className="w-3.5 h-3.5" />
                            <span>Select</span>
                        </>
                    )}
                </button>
            </div>

            {/* Select Button - Top Right Corner */}


            {/* Compact View */}
            <div
                className="relative p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between gap-6">
                    {/* Left: Basic Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                {deck.name}
                            </h3>
                            <p className="text-yellow-200/80 text-sm mt-1 line-clamp-2">
                                {deck.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <div className={cn(
                                "px-2 py-1 rounded-full flex items-center gap-1.5",
                                "bg-black/40 backdrop-blur-sm border border-yellow-900/30",
                                getDifficultyColor(deck.difficulty)
                            )}>
                                <Star className="w-3 h-3" />
                                <span className="text-xs font-medium">{deck.difficulty}</span>
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded-full flex items-center gap-1.5",
                                "bg-black/40 backdrop-blur-sm border border-yellow-900/30",
                                getPlaystyleColor(deck.playstyle)
                            )}>
                                <Crosshair className="w-3 h-3" />
                                <span className="text-xs font-medium">{deck.playstyle}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Quick Stats */}
                    <div className="flex items-center gap-3">
                        <div className="text-center">
                            <Sword className="w-4 h-4 text-red-400 mx-auto" />
                            <p className="text-xs text-red-400 mt-1">{stats.totalAttack}</p>
                        </div>
                        <div className="text-center">
                            <Shield className="w-4 h-4 text-green-400 mx-auto" />
                            <p className="text-xs text-green-400 mt-1">{stats.totalHealth}</p>
                        </div>
                        <div className="text-center">
                            <Zap className="w-4 h-4 text-blue-400 mx-auto" />
                            <p className="text-xs text-blue-400 mt-1">{stats.avgCost}</p>
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Expanded View */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 grid grid-cols-2 gap-6">
                            {/* Strategy */}
                            <div className="relative overflow-hidden rounded-lg border border-yellow-900/30 p-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
                                <div className="relative space-y-2">
                                    <h4 className="font-medium text-yellow-400">Strategy Guide</h4>
                                    <p className="text-sm text-yellow-200/70 leading-relaxed">{deck.strategy}</p>
                                </div>
                            </div>

                            {/* Cards Preview */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-yellow-200/60">Deck Cards</h4>
                                <div className="h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                    <div className="grid grid-cols-3 gap-2">
                                        {deck.cards.map((card, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="transform transition-all duration-300 hover:scale-105"
                                            >
                                                <GameCard
                                                    card={convertToGameCard(card)}
                                                    disabled={false}
                                                    size="tiny"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}