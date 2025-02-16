"use client";

import { useState, useEffect } from "react";
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
  const [currentRound, setCurrentRound] = useState(1);
  const [currentChoices, setCurrentChoices] = useState<Card[]>([]);

  useEffect(() => {
    // Get 5 random cards for the current round
    const getRandomCards = () => {
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 5);
    };
    setCurrentChoices(getRandomCards());
  }, [currentRound, availableCards]);

  const handleCardSelection = (card: Card) => {
    const cardCount = selectedDeck.filter(c => c.id === card.id).length;
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Build Your Deck
          </h1>
          <div className="mt-4 text-gray-600 text-lg">
            Round <span className="font-semibold text-blue-600">{currentRound}</span> / 
            <span className="font-semibold text-blue-600"> {deckSize}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Choose one card from the options below
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          {currentChoices.map((card, index) => (
            <div key={`choice-${index}`} className="relative group">
              <GameCardComponent
                card={card}
                onClick={() => handleCardSelection(card)}
                disabled={false}
              />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg text-xs">
                <span className="font-semibold text-blue-600">{selectedDeck.filter(c => c.id === card.id).length}</span>
                <span className="text-gray-600"> / </span>
                <span className="font-semibold text-gray-600">{card.maxPerSession}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-4 mt-8">
          <h2 className="text-xl font-semibold mb-4">Selected Cards ({selectedDeck.length})</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedDeck.map((card, index) => (
              <div key={`selected-${index}`} style={{ opacity: 0.7 }}>
                <GameCardComponent
                  card={card}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}