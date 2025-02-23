'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeck } from '@/hooks/useDeck';
import { prebuiltDecks, cardPool } from '@/lib/mock-data';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { GameCard } from '../ui/game-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sword, Shield, Zap, Filter, Sparkles, Flame, Droplet, Trees, Mountain, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PrebuiltDeck, Card } from '@/types/game';
import { Class } from '@/types/game';
import { DECK_SIZE } from '@/constants/game';

export function DeckBuilder() {
  const router = useRouter();
  const { saveDeck, deckInfo } = useDeck();
  const [selectedDeck, setSelectedDeck] = useState<PrebuiltDeck | null>(
    deckInfo ? prebuiltDecks.find(d => d.id === deckInfo.id) || null : null
  );
  const [customDeck, setCustomDeck] = useState<Card[]>([]);
  const [activeFilter, setActiveFilter] = useState<Class | null>(null);
  const [sortBy, setSortBy] = useState<'attack' | 'health' | 'cost'>('attack');
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');

  const handleDeckSelect = (deck: PrebuiltDeck) => {
    setSelectedDeck(deck);
    setCustomDeck([]);
  };

  const handleCardSelect = (card: Card) => {
    if (customDeck.length >= DECK_SIZE) {
      toast.error(`Deck is full (max ${DECK_SIZE} cards)`);
      return;
    }

    const cardCount = customDeck.filter(c => c.id === card.id).length;
    if (cardCount >= card.maxPerSession) {
      toast.error(`Can't add more copies of ${card.name}`);
      return;
    }

    setCustomDeck([...customDeck, card]);
    setSelectedDeck(null);
  };

  const removeCard = (index: number) => {
    setCustomDeck(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartGame = () => {
    if (activeTab === 'prebuilt' && !selectedDeck) {
      toast.error('Please select a deck first');
      return;
    }

    if (activeTab === 'custom' && customDeck.length < DECK_SIZE) {
      toast.error(`Please add ${DECK_SIZE} cards to your deck`);
      return;
    }

    try {
      if (activeTab === 'prebuilt' && selectedDeck) {
        saveDeck(selectedDeck);
      } else if (activeTab === 'custom') {
        const customPrebuiltDeck: PrebuiltDeck = {
          id: 'custom-deck',
          name: 'Custom Deck',
          description: 'Your personally crafted deck',
          cards: customDeck,
          coverImage: 'https://images.unsplash.com/photo-1635859890085-ec9e0c90f072',
        };
        saveDeck(customPrebuiltDeck);
      }

      toast.success('Deck selected successfully!');
      router.push('/battle');
    } catch (error) {
      toast.error('Failed to save deck. Please try again.');
    }
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

  const filteredCards = cardPool.filter(
    card => !activeFilter || card.class.includes(activeFilter)
  );

  const getDeckStats = (cards: Card[]) => ({
    totalAttack: cards.reduce((sum, card) => sum + card.attack, 0),
    totalHealth: cards.reduce((sum, card) => sum + card.health, 0),
    avgCost: cards.length > 0
      ? (cards.reduce((sum, card) => sum + card.staminaCost, 0) / cards.length).toFixed(1)
      : '0.0'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900/20 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-yellow-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Deck Builder
        </motion.h1>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'prebuilt' | 'custom')}>
          <TabsList className="bg-black/50 border border-yellow-900/50 p-1 mb-8">
            <TabsTrigger value="prebuilt" className="text-yellow-400 data-[state=active]:bg-yellow-900/50">
              Pre-built Decks
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-yellow-400 data-[state=active]:bg-yellow-900/50">
              Custom Deck
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prebuilt">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {prebuiltDecks.map((deck) => (
                <motion.div
                  key={deck.id}
                  className={cn(
                    'relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300',
                    selectedDeck?.id === deck.id ? 'ring-4 ring-yellow-400 transform scale-105' : 'hover:scale-105'
                  )}
                  onClick={() => handleDeckSelect(deck)}
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
          </TabsContent>

          <TabsContent value="custom">
            <div className="grid grid-cols-12 gap-8">
              {/* Card Pool */}
              <div className="col-span-8 bg-black/30 border border-yellow-900/50 rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Available Cards</h3>

                  {/* Filters */}
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      {Object.values(Class).map((classType) => (
                        <Button
                          key={classType}
                          className={cn(
                            "filter-button",
                            activeFilter === classType && "filter-button-active"
                          )}
                          onClick={() => setActiveFilter(activeFilter === classType ? null : classType)}
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
                        onClick={() => setSortBy('attack')}
                      >
                        <Sword className="w-4 h-4 mr-2" />
                        Attack
                      </Button>
                      <Button
                        className={cn(
                          "sort-button",
                          sortBy === 'health' && "sort-button-active"
                        )}
                        onClick={() => setSortBy('health')}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Health
                      </Button>
                      <Button
                        className={cn(
                          "sort-button",
                          sortBy === 'cost' && "sort-button-active"
                        )}
                        onClick={() => setSortBy('cost')}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Cost
                      </Button>
                    </div>
                  </div>

                  {/* Card Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                      {sortCards(filteredCards).map((card) => (
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
                            onClick={() => handleCardSelect(card)}
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
              </div>

              {/* Current Deck */}
              <div className="col-span-4 bg-black/30 border border-yellow-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Your Deck ({customDeck.length}/{DECK_SIZE})</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Sword className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">
                      {getDeckStats(customDeck).totalAttack}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">
                      {getDeckStats(customDeck).totalHealth}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-200">
                      {getDeckStats(customDeck).avgCost}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {customDeck.map((card, index) => (
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
                          onClick={() => removeCard(index)}
                          size="small"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCard(index);
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
            </div>
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-8 right-8">
          <Button
            className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 px-8 py-3 rounded-lg text-lg"
            onClick={handleStartGame}
            disabled={
              (activeTab === 'prebuilt' && !selectedDeck) ||
              (activeTab === 'custom' && customDeck.length < DECK_SIZE)
            }
          >
            {deckInfo ? 'Change Deck & Start Battle' : 'Start Battle'}
          </Button>
        </div>
      </div>
    </div>
  );
}