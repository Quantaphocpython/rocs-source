'use client';

import { motion } from 'framer-motion';
import { PrebuiltDeck } from "@/types/game";
import { GameCard } from "@/components/ui/game-card";
import { cn } from "@/lib/utils";
import { convertToGameCard } from "@/utils/gameLogic";
import { Sword, Shield, Zap, Star, Crosshair } from 'lucide-react';

interface PrebuiltDeckCardProps {
    deck: PrebuiltDeck;
    isSelected: boolean;
    onSelect: (deck: PrebuiltDeck) => void;
}

export function PrebuiltDeckCard({ deck, isSelected, onSelect }: PrebuiltDeckCardProps) {
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
                'group relative rounded-lg overflow-hidden cursor-pointer',
                'bg-gradient-to-br from-black/80 to-black/40',
                'hover:from-yellow-950/30 hover:to-black/60',
                'transition-all duration-500',
                isSelected ? 'ring-4 ring-yellow-400' : ''
            )}
            onClick={() => onSelect(deck)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={deck.coverImage}
                    alt={deck.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-transparent" />
            </div>

            <div className="relative p-8 flex flex-col md:flex-row gap-8">
                {/* Left Section: Info */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="space-y-4">
                        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                            {deck.name}
                        </h3>

                        <div className="flex items-center gap-4 text-sm">
                            <div className={cn(
                                "px-3 py-1.5 rounded-full flex items-center gap-2",
                                "bg-black/40 backdrop-blur-sm border border-yellow-900/30",
                                getDifficultyColor(deck.difficulty)
                            )}>
                                <Star className="w-4 h-4" />
                                <span className="font-medium">{deck.difficulty}</span>
                            </div>
                            <div className={cn(
                                "px-3 py-1.5 rounded-full flex items-center gap-2",
                                "bg-black/40 backdrop-blur-sm border border-yellow-900/30",
                                getPlaystyleColor(deck.playstyle)
                            )}>
                                <Crosshair className="w-4 h-4" />
                                <span className="font-medium">{deck.playstyle}</span>
                            </div>
                        </div>

                        <p className="text-yellow-200/80 text-lg leading-relaxed">
                            {deck.description}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="deck-stat-card">
                            <Sword className="w-6 h-6 text-red-400" />
                            <div>
                                <p className="text-xs text-yellow-200/60">Total Attack</p>
                                <p className="text-xl font-bold text-red-400">{stats.totalAttack}</p>
                            </div>
                        </div>
                        <div className="deck-stat-card">
                            <Shield className="w-6 h-6 text-green-400" />
                            <div>
                                <p className="text-xs text-yellow-200/60">Total Health</p>
                                <p className="text-xl font-bold text-green-400">{stats.totalHealth}</p>
                            </div>
                        </div>
                        <div className="deck-stat-card">
                            <Zap className="w-6 h-6 text-blue-400" />
                            <div>
                                <p className="text-xs text-yellow-200/60">Avg. Cost</p>
                                <p className="text-xl font-bold text-blue-400">{stats.avgCost}</p>
                            </div>
                        </div>
                    </div>

                    {/* Strategy */}
                    <div className="relative overflow-hidden rounded-lg border border-yellow-900/30 p-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
                        <div className="relative space-y-2">
                            <h4 className="font-medium text-yellow-400">Strategy Guide</h4>
                            <p className="text-sm text-yellow-200/70 leading-relaxed">{deck.strategy}</p>
                        </div>
                    </div>
                </div>

                {/* Right Section: Cards */}
                <div className="w-full md:w-[400px] space-y-4">
                    <h4 className="text-sm font-medium text-yellow-200/60">Deck Cards</h4>
                    <div className="relative h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-2 gap-3 pr-2">
                            {deck.cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="transform transition-all duration-300 hover:scale-105"
                                >
                                    <GameCard
                                        card={convertToGameCard(card)}
                                        disabled={true}
                                        size="small"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-4 px-4 py-2 bg-yellow-400 text-black rounded-full"
                    >
                        <span className="text-sm font-medium">Selected</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}