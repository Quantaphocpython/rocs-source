'use client';

import { Card } from "@/types/game";
import { Sword, Shield, Zap } from "lucide-react";

interface DeckStatsProps {
    cards: Card[];
}

export function getDeckStats(cards: Card[]) {
    return {
        totalAttack: cards.reduce((sum, card) => sum + card.attack, 0),
        totalHealth: cards.reduce((sum, card) => sum + card.health, 0),
        avgCost: cards.length > 0
            ? (cards.reduce((sum, card) => sum + card.staminaCost, 0) / cards.length).toFixed(1)
            : '0.0'
    };
}

export function DeckStats({ cards }: DeckStatsProps) {
    const stats = getDeckStats(cards);

    return (
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
    );
}