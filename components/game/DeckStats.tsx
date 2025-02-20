import type { Card } from '@/types/game';
import { Sword, Sparkles, Filter } from 'lucide-react';

interface DeckStatsProps {
  selectedDeck: Card[];
}

export function DeckStats({ selectedDeck }: DeckStatsProps) {
  const getDeckPower = () => {
    return selectedDeck.reduce((sum, card) => sum + card.attack, 0);
  };

  const getDeckHealth = () => {
    return selectedDeck.reduce((sum, card) => sum + card.health, 0);
  };

  const getAverageStamina = () => {
    if (selectedDeck.length === 0) return 0;
    return (
      selectedDeck.reduce((sum, card) => sum + card.staminaCost, 0) /
      selectedDeck.length
    ).toFixed(1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="stat-card bg-black/50 backdrop-blur-sm border border-yellow-600/30 rounded-lg px-4 py-2 flex items-center">
        <Sword className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="text-lg font-medium">Power: {getDeckPower()}</span>
      </div>
      <div className="stat-card bg-black/50 backdrop-blur-sm border border-yellow-600/30 rounded-lg px-4 py-2 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="text-lg font-medium">Health: {getDeckHealth()}</span>
      </div>
      <div className="stat-card bg-black/50 backdrop-blur-sm border border-yellow-600/30 rounded-lg px-4 py-2 flex items-center">
        <Filter className="w-5 h-5 mr-2 text-yellow-500" />
        <span className="text-lg font-medium">
          Avg Cost: {getAverageStamina()}
        </span>
      </div>
    </div>
  );
}
