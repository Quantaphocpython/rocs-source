'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeck } from '@/hooks/useDeck';
import { prebuiltDecks, cardPool } from '@/lib/mock-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CardFilters } from './CardFilters';
import { CardGrid } from './CardGrid';
import { DeckPreview } from './DeckPreview';
import type { PrebuiltDeck, Card } from '@/types/game';
import { Class } from '@/types/game';
import { DECK_SIZE } from '@/constants/game';
import { PrebuiltDeckCard } from './PrebuiltDeckList';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900/20 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">Deck Builder</h1>

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
                <PrebuiltDeckCard
                  key={deck.id}
                  deck={deck}
                  isSelected={selectedDeck?.id === deck.id}
                  onSelect={handleDeckSelect}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 bg-black/30 border border-yellow-900/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Available Cards</h3>

                <CardFilters
                  activeFilter={activeFilter}
                  sortBy={sortBy}
                  onFilterChange={setActiveFilter}
                  onSortChange={setSortBy}
                />

                <CardGrid
                  cards={sortCards(filteredCards)}
                  customDeck={customDeck}
                  onCardSelect={handleCardSelect}
                />
              </div>

              <div className="col-span-4">
                <DeckPreview
                  deck={customDeck}
                  onRemoveCard={removeCard}
                />
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