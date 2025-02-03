"use client";

import { useState } from "react";
import { Card } from "@/types/game";
import { Button } from "../ui/button";
import { GameCard as GameCardComponent } from "../ui/game-card";
import { toast } from "sonner";

interface DeckBuilderProps {
  availableCards: Card[];
  onStartGame: (deck: Card[]) => void;
  deckSize: number;
}

export function DeckBuilder({ availableCards, onStartGame, deckSize }: DeckBuilderProps) {
  const [selectedDeck, setSelectedDeck] = useState<Card[]>([]);

  const handleCardSelection = (card: Card) => {
    if (selectedDeck.length >= deckSize) {
      toast.error("Deck is full!");
      return;
    }

    const cardCount = selectedDeck.filter(c => c.id === card.id).length;
    if (cardCount >= card.maxPerSession) {
      toast.error(`Can't add more copies of ${card.name}`);
      return;
    }

    setSelectedDeck([...selectedDeck, card]);
  };

  const handleStartGame = () => {
    if (selectedDeck.length !== deckSize) {
      toast.error(`Please select exactly ${deckSize} cards`);
      return;
    }

    onStartGame(selectedDeck);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Build Your Deck</h1>
        <div className="text-center">
          Selected: {selectedDeck.length} / {deckSize} cards
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableCards.map((card, index) => (
            <div key={`available-${index}`} className="relative">
              <GameCardComponent
                card={card}
                onClick={() => handleCardSelection(card)}
                disabled={selectedDeck.length >= deckSize}
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded">
                {selectedDeck.filter(c => c.id === card.id).length} / {card.maxPerSession}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStartGame}
            disabled={selectedDeck.length !== deckSize}
            size="lg"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}