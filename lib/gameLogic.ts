import type { Card, GameCard } from "@/types/game";
import { BASE_STAMINA_GAIN, STAMINA_SCALING_FACTOR } from "@/constants/game";

export function calculateStaminaGain(round: number) {
  return Math.floor(BASE_STAMINA_GAIN + (round - 1) * STAMINA_SCALING_FACTOR);
}

export function convertToGameCard(card: Card): GameCard {
  return {
    ...card,
    currentHealth: card.health,
  };
}
