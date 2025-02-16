"use client";

import { GameCard as GameCardComponent } from "../ui/game-card";
import { Button } from "../ui/button";
import { GameState } from "@/types/game";

interface PlayAreaProps {
  deck: GameState["deck"];
  cardsOnField: GameState["cardsOnField"];
  isPlayerTurn: boolean;
  playerStamina: number;
  selectedCard: number | null;
  onCardSelect: (index: number) => void;
  onPlayCard: () => void;
  onEndTurn: () => void;
}

export function PlayArea({
  deck,
  cardsOnField,
  isPlayerTurn,
  playerStamina,
  selectedCard,
  onCardSelect,
  onPlayCard,
  onEndTurn,
}: PlayAreaProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Field Cards */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4 flex-wrap justify-center">
            {cardsOnField.map((card, index) => (
              <div key={`field-${index}`} style={{ height: '280px' }}>
                <GameCardComponent
                  card={card}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          disabled={!isPlayerTurn || selectedCard === null}
          onClick={onPlayCard}
        >
          Play Selected Card
        </Button>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          disabled={!isPlayerTurn}
          onClick={onEndTurn}
        >
          End Turn
        </Button>
      </div>
    </div>
  );
}