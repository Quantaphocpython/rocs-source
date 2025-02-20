import type { GameCard, GameState } from '@/types/game';
import { cn } from '@/lib/utils';
import { GameCard as GameCardComponent } from '../ui/game-card';
import { BattleStats } from './battle-stats';

const CARD_SLOT = {
  width: 100,
  height: 140,
  gap: 16,
};

interface GameFieldProps {
  cardsOnField: (GameCard | null)[];
  selectedCard: number | null;
  targetSlot: number | null;
  isPlayerTurn: boolean;
  onCardPlay: (cardIndex: number, slotIndex: number) => void;
  onTargetSlotChange: (slotIndex: number | null) => void;
  battleHistory: GameState['battleHistory'];
}

export function GameField({
  cardsOnField,
  selectedCard,
  targetSlot,
  isPlayerTurn,
  onCardPlay,
  onTargetSlotChange,
  battleHistory,
}: GameFieldProps) {
  return (
    <div id="battle-field" className="battle-field">
      <div className="relative h-full flex flex-col p-6">
        <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-4 p-8">
          {[...Array(10)].map((_, index) => {
            const card = cardsOnField[index];
            return (
              <div
                key={`slot-${index}`}
                className={cn(
                  'card-slot',
                  targetSlot === index && 'targetable',
                  selectedCard !== null && !card && 'cursor-pointer'
                )}
                style={{
                  width: CARD_SLOT.width,
                  height: CARD_SLOT.height,
                }}
                onClick={() => {
                  if (selectedCard !== null && !card) {
                    onCardPlay(selectedCard, index);
                  }
                }}
                onMouseEnter={() => {
                  if (selectedCard !== null && !card) {
                    onTargetSlotChange(index);
                  }
                }}
                onMouseLeave={() => {
                  if (targetSlot === index) {
                    onTargetSlotChange(null);
                  }
                }}
              >
                {card && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GameCardComponent
                      card={card}
                      disabled={true}
                      size="small"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div id="battle-log">
          <BattleStats history={battleHistory} />
        </div>
      </div>
    </div>
  );
}
