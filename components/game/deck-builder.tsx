'use client';

import { useState, useEffect } from 'react';
import { Card, Class } from '@/types/game';
import { Button } from '../ui/button';
import { GameCard as GameCardComponent } from '../ui/game-card';
import { CardDetails } from './card-details';
import { toast } from 'sonner';
import {
  Sword,
  Filter,
  Sparkles,
  Flame,
  Droplet,
  Trees,
  Mountain,
  Cog,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DeckBuilderProps {
  availableCards: Card[];
  onStartGame: (deck: Card[]) => void;
  deckSize: number;
}

export function DeckBuilder({
  availableCards,
  onStartGame,
  deckSize,
}: DeckBuilderProps) {
  const [selectedDeck, setSelectedDeck] = useState<Card[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentChoices, setCurrentChoices] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeFilter, setActiveFilter] = useState<Class | null>(null);
  const [sortBy, setSortBy] = useState<'attack' | 'health' | 'cost'>('attack');

  useEffect(() => {
    const getRandomCards = () => {
      let filteredCards = [...availableCards];
      if (activeFilter) {
        filteredCards = filteredCards.filter((card) =>
          card.class.includes(activeFilter)
        );
      }
      const shuffled = filteredCards.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 5);
    };
    setCurrentChoices(getRandomCards());
  }, [currentRound, availableCards, activeFilter]);

  const handleCardSelection = (card: Card) => {
    const cardCount = selectedDeck.filter((c) => c.id === card.id).length;
    if (cardCount >= card.maxPerSession) {
      toast.error(`Can't add more copies of ${card.name}`);
      return;
    }

    setSelectedDeck([...selectedDeck, card]);

    if (currentRound < deckSize) {
      setCurrentRound(currentRound + 1);
    } else {
      onStartGame(selectedDeck.concat(card));
    }
  };

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
    <div className="min-h-screen h-full bg-black text-yellow-400 flex flex-col">
      {/* Header */}
      <div className="relative h-40 bg-black border-b border-yellow-900/50 flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

        <div className="relative h-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Build Your Deck
          </motion.h1>
          <div className="flex items-center gap-8">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-lg font-medium">
                Round {currentRound} / {deckSize}
              </span>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-lg font-medium">
                Selected {selectedDeck.length} / {deckSize}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-[calc(100vh-10rem)]">
        {/* Main Deck Area (70%) */}
        <div className="w-[70%] border-r border-yellow-900/50 flex flex-col">
          <div className="p-8 flex-shrink-0 flex justify-between items-center border-b border-yellow-900/50">
            <h2 className="text-2xl font-medium">Your Deck</h2>
            <div className="flex items-center gap-4">
              <div className="stat-card">
                <Sword className="w-5 h-5" />
                <span className="text-lg font-medium">
                  Power: {getDeckPower()}
                </span>
              </div>
              <div className="stat-card">
                <Sparkles className="w-5 h-5" />
                <span className="text-lg font-medium">
                  Health: {getDeckHealth()}
                </span>
              </div>
              <div className="stat-card">
                <Sword className="w-5 h-5" />
                <span className="text-lg font-medium">
                  Avg Cost: {getAverageStamina()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-6 gap-6 p-8 border border-yellow-900/50 rounded-lg bg-black/30 backdrop-blur-sm min-h-full">
              <AnimatePresence>
                {selectedDeck.map((card, index) => (
                  <motion.div
                    key={`selected-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="transform transition-all duration-300 hover:scale-105"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelectedCard(card);
                    }}
                  >
                    <GameCardComponent
                      card={card}
                      disabled={true}
                      size="small"
                    />
                  </motion.div>
                ))}
                {[...Array(deckSize - selectedDeck.length)].map((_, index) => (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-[100px] h-[140px] border border-dashed border-yellow-900/30 rounded-lg bg-black/20"
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Card Choices Sidebar (30%) */}
        <div className="w-[30%] flex flex-col">
          <div className="p-8 flex-shrink-0 border-b border-yellow-900/50">
            <h2 className="text-2xl font-medium text-center mb-4">
              Available Cards
            </h2>

            {/* Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2">
                {Object.values(Class).map((classType) => (
                  <Button
                    key={classType}
                    className={cn(
                      'filter-button',
                      activeFilter === classType && 'filter-button-active'
                    )}
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === classType ? null : classType
                      )
                    }
                  >
                    {classType === Class.FIRE && <Flame className="w-4 h-4" />}
                    {classType === Class.WATER && (
                      <Droplet className="w-4 h-4" />
                    )}
                    {classType === Class.WOOD && <Trees className="w-4 h-4" />}
                    {classType === Class.EARTH && (
                      <Mountain className="w-4 h-4" />
                    )}
                    {classType === Class.METAL && <Cog className="w-4 h-4" />}
                  </Button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2">
                <Button
                  className={cn(
                    'sort-button',
                    sortBy === 'attack' && 'sort-button-active'
                  )}
                  onClick={() => setSortBy('attack')}
                >
                  <Sword className="w-4 h-4 mr-2" />
                  Attack
                </Button>
                <Button
                  className={cn(
                    'sort-button',
                    sortBy === 'health' && 'sort-button-active'
                  )}
                  onClick={() => setSortBy('health')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Health
                </Button>
                <Button
                  className={cn(
                    'sort-button',
                    sortBy === 'cost' && 'sort-button-active'
                  )}
                  onClick={() => setSortBy('cost')}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Cost
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center gap-8 py-8">
              <AnimatePresence mode="wait">
                {sortCards(currentChoices).map((card, index) => (
                  <motion.div
                    key={`choice-${card.id}-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative group"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelectedCard(card);
                    }}
                  >
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <GameCardComponent
                        card={card}
                        onClick={() => handleCardSelection(card)}
                        disabled={false}
                      />
                      <div className="absolute top-2 left-2 px-4 py-2 bg-black/90 border border-yellow-900/50 rounded-lg">
                        <span className="text-sm font-medium">
                          {selectedDeck.filter((c) => c.id === card.id).length}{' '}
                          / {card.maxPerSession}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details Dialog */}
      <CardDetails
        card={selectedCard}
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
