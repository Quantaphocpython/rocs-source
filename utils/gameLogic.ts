import { BASE_STAMINA_GAIN, STAMINA_SCALING_FACTOR } from '@/constants/game';
import { Card, GameCard } from '@/types/game';

export const calculateStaminaGain = (round: number) => {
  return Math.floor(BASE_STAMINA_GAIN + (round - 1) * STAMINA_SCALING_FACTOR);
};

export const convertToGameCard = (card: Card): GameCard => ({
  ...card,
  currentHealth: card.health,
});
