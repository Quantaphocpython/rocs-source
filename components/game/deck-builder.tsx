"use client";

import { useState, useEffect } from "react";
import { Card } from "@/types/game";
import { Button } from "../ui/button";
import { GameCard as GameCardComponent } from "../ui/game-card";
import { CardDetails } from "./card-details";
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
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

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
    <div className="min-h-screen h-full bg-black text-yellow-400 flex flex-col">
      {/* Header */}
      <div className="h-40 bg-black border-b border-yellow-900 flex-shrink-0">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Build Your Deck
          </h1>
          <div className="flex items-center gap-8">
            <div className="px-8 py-3 border border-yellow-900 rounded-lg">
              <span className="text-lg font-medium">Round {currentRound} / {deckSize}</span>
            </div>
            <div className="px-8 py-3 border border-yellow-900 rounded-lg">
              <span className="text-lg font-medium">Selected {selectedDeck.length} / {deckSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-[calc(100vh-10rem)]">
        {/* Main Deck Area (70%) */}
        <div className="w-[70%] border-r border-yellow-900 flex flex-col">
          <div className="p-8 flex-shrink-0 flex justify-between items-center border-b border-yellow-900">
            <h2 className="text-2xl font-medium">
              Your Deck
            </h2>
            <div className="flex items-center gap-3 px-6 py-3 border border-yellow-900 rounded-lg">
              <Sword className="w-5 h-5" />
              <span className="text-lg font-medium">
                Deck Power: {selectedDeck.reduce((sum, card) => sum + card.attack, 0)}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-6 gap-6 p-8 border border-yellow-900 rounded-lg min-h-full">
              {selectedDeck.map((card, index) => (
                <div
                  key={`selected-${index}`}
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
                </div>
              ))}
              {[...Array(deckSize - selectedDeck.length)].map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-[100px] h-[140px] border border-dashed border-yellow-900 rounded-lg bg-black/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card Choices Sidebar (30%) */}
        <div className="w-[30%] flex flex-col">
          <div className="p-8 flex-shrink-0 border-b border-yellow-900">
            <h2 className="text-2xl font-medium text-center">
              Available Cards
            </h2>
            <p className="text-sm text-center text-yellow-600 mt-3">Click to select, right-click to view details</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center gap-8 py-8">
              {currentChoices.map((card, index) => (
                <div
                  key={`choice-${index}`}
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
                    <div className="absolute top-2 left-2 px-4 py-2 bg-black/90 border border-yellow-900 rounded-lg">
                      <span className="text-sm font-medium">
                        {selectedDeck.filter(c => c.id === card.id).length} / {card.maxPerSession}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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