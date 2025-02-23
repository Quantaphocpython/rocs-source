'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../ui/button';
import { GameCard } from '../../ui/game-card';
import { Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Card } from '@/types/game';
import { Class } from '@/types/game';

interface CardPoolProps {
  cards: Card[];
  customDeck: Card[];
  activeFilter: Class | null;
  sortBy: 'attack' | 'health' | 'cost';
  onCardSelect: (card: Card) => void;
  onFilterChange: (filter: Class | null) => void;
  onSortChange: (sort: 'attack' | 'health' | 'cost') => void;
}

export function CardPool({
  cards,
  customDeck,
  activeFilter,
  sortBy,
  onCardSelect,
  onFilterChange,
  onSortChange,
}: CardPoolProps) {
  const sortCards = (cards: Card[]) => {
    return [...cards].sort((a, b) => {
      switch (sortBy) {
        case 'attack':
          return b.attack - a.attack;
        case 'health':
          return b.health - a.health;
        case 'cost':
          return a.staminaCost - b.staminaCost;
      }
    });
  };

  return (
    <div className="bg-black/30 border border-yellow-900/50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">Available Cards</h3>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2">
          {Object.values(Class).map((classType) => (
            <Button
              key={classType}
              className={cn(
                "filter-button",
                activeFilter === classType && "filter-button-active"
              )}
              onClick={() => onFilterChange(activeFilter === classType ? null : classType)}
            >
              {classType === Class.FIRE && <Flame className="w-4 h-4" />}
              {classType === Class.WATER && <Droplet className="w-4 h-4" />}
              {classType === Class.WOOD && <Trees className="w-4 h-4" />}
              {classType === Class.EARTH && <Mountain className="w-4 h-4" />}
              {classType === Class.METAL && <Cog className="w-4 h-4" />}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            className={cn(
              "sort-button",
              sortBy === 'attack' && "sort-button-active"
            )}
            onClick={() => onSortChange('attack')}
          >
            <Sword className="w-4 h-4 mr-2" />
            Attack
          </Button>
          <Button
            className={cn(
              "sort-button",
              sortBy === 'health' && "sort-button-active"
            )}
            onClick={() => onSortChange('health')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Health
          </Button>
          <Button
            className={cn(
              "sort-button",
              sortBy === 'cost' && "sort-button-active"
            )}
            onClick={() => onSortChange('cost')}
          >
            <Zap className="w-4 h-4 mr-2" />
            Cost
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {sortCards(cards).map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <GameCard
                card={card}
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
    </div>
  );
}