'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card, Class } from '@/types/game';
import { Button } from '../ui/button';
import { GameCard as GameCardComponent } from '../ui/game-card';
import { CardDetails } from './card-details';
import { ClassFilter } from './ClassFilter';
import { SortOptions } from './SortOptions';
import { DeckStats } from './DeckStats';
import { toast } from 'sonner';
import { Play } from 'lucide-react';

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
  }, [availableCards, activeFilter]);

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

  const sortCards = useCallback(
    (cards: Card[]) => {
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
    },
    [sortBy]
  );

  const sortedAndFilteredCards = useMemo(() => {
    const sorted = sortCards(currentChoices);
    return sorted.sort((a, b) => {
      const aCount = selectedDeck.filter((c) => c.id === a.id).length;
      const bCount = selectedDeck.filter((c) => c.id === b.id).length;
      if (aCount >= a.maxPerSession && bCount < b.maxPerSession) return 1;
      if (bCount >= b.maxPerSession && aCount < a.maxPerSession) return -1;
      return 0;
    });
  }, [currentChoices, selectedDeck, sortCards]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-yellow-400">
      {/* Header */}
      <header className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl font-bold mb-4 text-yellow-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Forge Your Destiny
          </motion.h1>
          <motion.p
            className="text-xl text-yellow-200 mb-6 text-center max-w-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose your cards wisely, for they shall shape the fate of your
            journey
          </motion.p>
          <div className="flex items-center gap-8">
            <motion.div
              className="stat-card bg-black/50 backdrop-blur-sm border border-yellow-600/30 rounded-lg px-6 py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-lg font-medium">
                Round {currentRound} / {deckSize}
              </span>
            </motion.div>
            <motion.div
              className="stat-card bg-black/50 backdrop-blur-sm border border-yellow-600/30 rounded-lg px-6 py-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-lg font-medium">
                Selected {selectedDeck.length} / {deckSize}
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Deck Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-medium text-yellow-300 mb-4">
                Your Arsenal
              </h2>
              <DeckStats selectedDeck={selectedDeck} />
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                  {[...Array(deckSize - selectedDeck.length)].map(
                    (_, index) => (
                      <motion.div
                        key={`empty-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full aspect-[2/3] border border-dashed border-yellow-900/30 rounded-lg bg-black/20"
                      />
                    )
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Card Choices Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-black/30 backdrop-blur-sm border border-yellow-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-medium text-center mb-6 text-yellow-300">
                Mystic Offerings
              </h2>
              <ClassFilter
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sortedAndFilteredCards.map((card, index) => (
                      <motion.div
                        key={`choice-${card.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
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
                            disabled={
                              selectedDeck.filter((c) => c.id === card.id)
                                .length >= card.maxPerSession
                            }
                            size="normal"
                          />
                          <div className="absolute top-2 left-2 px-3 py-1 bg-black/90 border border-yellow-900/50 rounded-md">
                            <span className="text-sm font-medium">
                              {
                                selectedDeck.filter((c) => c.id === card.id)
                                  .length
                              }{' '}
                              / {card.maxPerSession}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Start Game Button */}
      {selectedDeck.length === deckSize && (
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            className="start-game-button bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 px-6 rounded-lg text-lg flex items-center"
            onClick={() => onStartGame(selectedDeck)}
          >
            <Play className="w-6 h-6 mr-2" />
            Begin Your Quest
          </Button>
        </motion.div>
      )}

      {/* Card Details Dialog */}
      <CardDetails
        card={selectedCard}
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
