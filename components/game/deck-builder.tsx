"use client";

import { useState, useEffect } from "react";
import { Card } from "@/types/game";
import { Button } from "../ui/button";
import { GameCard as GameCardComponent } from "../ui/game-card";
import { toast } from "sonner";
import { Sword } from "lucide-react";

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative h-32 bg-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624559888077-1a829f93c9f8?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="relative h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Build Your Deck
          </h1>
          <div className="flex items-center gap-4">
            <div className="px-4 py-1 bg-black/50 border border-gray-800">
              <span className="text-sm font-medium">Round {currentRound} / {deckSize}</span>
            </div>
            <div className="px-4 py-1 bg-black/50 border border-gray-800">
              <span className="text-sm font-medium">Selected {selectedDeck.length} / {deckSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Card Choices */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-400">Choose one card to add to your deck</h2>
          </div>

          <div className="grid grid-cols-5 gap-6 justify-items-center">
            {currentChoices.map((card, index) => (
              <div
                key={`choice-${index}`}
                className="relative group transform transition-all duration-300 hover:scale-105"
              >
                <GameCardComponent
                  card={card}
                  onClick={() => handleCardSelection(card)}
                  disabled={false}
                />
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/90 backdrop-blur-sm px-2 py-1 border border-gray-800">
                  <span className="text-xs font-medium text-white">
                    {selectedDeck.filter(c => c.id === card.id).length} / {card.maxPerSession}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Cards */}
        <div className="relative">
          <div className="absolute -top-6 left-0 right-0 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-400">Selected Cards</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-black/90 border border-gray-800">
              <Sword className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Deck Power: {selectedDeck.reduce((sum, card) => sum + card.attack, 0)}</span>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4 p-6 bg-gray-900/50 border border-gray-800">
            {selectedDeck.map((card, index) => (
              <div
                key={`selected-${index}`}
                className="transform transition-all duration-300"
              >
                <GameCardComponent
                  card={card}
                  disabled={true}
                  size="small"
                />
              </div>
            ))}
            {[...Array(deckSize - selectedDeck.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-[100px] h-[140px] border border-dashed border-gray-800 rounded-lg bg-black/30"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}