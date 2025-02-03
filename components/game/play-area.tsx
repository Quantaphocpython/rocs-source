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
    <div className="space-y-8">
      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Cards on Field</h2>
        <div className="flex gap-4 flex-wrap">
          {cardsOnField.map((card, index) => (
            <GameCardComponent
              key={`field-${index}`}
              card={card}
              disabled={true}
            />
          ))}
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Your Hand</h2>
        <div className="flex gap-4 flex-wrap">
          {deck.map((card, index) => (
            <GameCardComponent
              key={`hand-${index}`}
              card={card}
              onClick={() => isPlayerTurn && onCardSelect(index)}
              selected={selectedCard === index}
              disabled={!isPlayerTurn || playerStamina < card.staminaCost}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="default"
          disabled={!isPlayerTurn || selectedCard === null}
          onClick={onPlayCard}
        >
          Play Selected Card
        </Button>
        <Button 
          variant="destructive" 
          disabled={!isPlayerTurn}
          onClick={onEndTurn}
        >
          End Turn
        </Button>
      </div>
    </div>
  );
}