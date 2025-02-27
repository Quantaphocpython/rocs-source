'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDeck } from '@/hooks/useDeck';
import { prebuiltDecks, cardPool } from '@/lib/mock-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardFilters } from './CardFilters';
import { CardGrid } from './CardGrid';
import { DeckPreview } from './DeckPreview';
import { PrebuiltDeckList } from './PrebuiltDeckList';
import type { PrebuiltDeck, Card } from '@/types/game';
import { Class } from '@/types/game';
import { DECK_SIZE } from '@/constants/game';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

export function DeckBuilder() {
  const router = useRouter();
  const { savedDeck, deckInfo, saveDeck } = useDeck();
  const [selectedDeck, setSelectedDeck] = useState<PrebuiltDeck | null>(
    deckInfo ? prebuiltDecks.find(d => d.id === deckInfo.id) || null : null
  );
  const [customDeck, setCustomDeck] = useState<Card[]>([]);
  const [activeFilter, setActiveFilter] = useState<Class | null>(null);
  const [sortBy, setSortBy] = useState<'attack' | 'health' | 'cost'>('attack');
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [hasDeck, setHasDeck] = useState(false);

  useEffect(() => {
    setHasDeck(!!savedDeck);
  }, [savedDeck]);

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

  const handleSaveDeck = () => {
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
          difficulty: 'Medium',
          playstyle: 'Versatile',
          strengths: ['Customized strategy', 'Personal playstyle'],
          weaknesses: ['Untested combinations'],
          cards: customDeck,
          coverImage: 'https://images.unsplash.com/photo-1635859890085-ec9e0c90f072',
          strategy: 'Use your custom combination of cards to develop your own unique strategy.',
        };
        saveDeck(customPrebuiltDeck);
      }

      setHasDeck(true);
      toast.success('Deck saved successfully!');
    } catch (error) {
      toast.error('Failed to save deck. Please try again.');
    }
  };

  const filteredCards = cardPool.filter(
    card => !activeFilter || card.class.includes(activeFilter)
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-yellow-900/20 to-black p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Deck Builder
          </h1>

          {hasDeck && (
            <Button
              className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 px-6 py-5 text-lg"
              onClick={() => router.push('/map')}
            >
              <Map className="mr-2 h-5 w-5" />
              Go to Map
            </Button>
          )}
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'prebuilt' | 'custom')}
          className="space-y-8"
        >
          <TabsList className="bg-black/50 border border-yellow-900/50 p-1 mb-8">
            <TabsTrigger
              value="prebuilt"
              className="text-yellow-400 data-[state=active]:bg-yellow-900/50 transition-all duration-300"
            >
              Pre-built Decks
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="text-yellow-400 data-[state=active]:bg-yellow-900/50 transition-all duration-300"
            >
              Custom Deck
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prebuilt">
            <PrebuiltDeckList
              decks={prebuiltDecks}
              selectedDeck={selectedDeck}
              onDeckSelect={handleDeckSelect}
              onSaveDeck={handleSaveDeck}
            />
          </TabsContent>

          <TabsContent value="custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-9">
                <div className="bg-black/30 border border-yellow-900/50 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-yellow-400">Available Cards</h3>
                    <div className="text-sm text-yellow-400/60">
                      Click on cards to add them to your deck
                    </div>
                  </div>

                  <CardFilters
                    activeFilter={activeFilter}
                    sortBy={sortBy}
                    onFilterChange={setActiveFilter}
                    onSortChange={setSortBy}
                  />

                  <CardGrid
                    cards={filteredCards}
                    customDeck={customDeck}
                    onCardSelect={handleCardSelect}
                    size="small"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <DeckPreview
                  deck={customDeck}
                  onRemoveCard={removeCard}
                />

                {customDeck.length === DECK_SIZE && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <Button
                      className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 py-6 text-lg"
                      onClick={handleSaveDeck}
                    >
                      Save Deck
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}