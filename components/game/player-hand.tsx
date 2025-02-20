import { cn } from '@/lib/utils';
import type { GameCard } from '@/types/game';
import { GameCard as GameCardComponent } from '../ui/game-card';

interface PlayerHandProps {
  deck: GameCard[];
  selectedCard: number | null;
  isPlayerTurn: boolean;
  playerStamina: number;
  onCardSelect: (index: number) => void;
}

export function PlayerHand({
  deck,
  selectedCard,
  isPlayerTurn,
  playerStamina,
  onCardSelect,
}: PlayerHandProps) {
  return (
    <div id="player-hand" className="player-hand">
      <div className="h-full flex items-center justify-center gap-6">
        {deck.map((card, index) => (
          <div
            key={`hand-${index}`}
            className={cn(
              'transform transition-all duration-300 hover:-translate-y-4',
              selectedCard === index && '-translate-y-4 ring-2 ring-yellow-400'
            )}
          >
            <GameCardComponent
              card={card}
              onClick={() => isPlayerTurn && onCardSelect(index)}
              selected={selectedCard === index}
              disabled={!isPlayerTurn || playerStamina < card.staminaCost}
              size="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
