import type { Card, GameCard } from "@/types/game";

export function calculateStaminaGain(round: number) {
  // Cap stamina gain at 5
  return Math.min(round, 5);
}

export function convertToGameCard(card: Card): GameCard {
  return {
    ...card,
    currentHealth: card.health,
  };
}
