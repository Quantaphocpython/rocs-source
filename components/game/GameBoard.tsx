import { GameCard } from "./GameCard";
import { Monster } from "./Monster";
import { PlayerStatus } from "./PlayerStatus";

export function GameBoard({
  monster,
  playerHealth,
  stamina,
  field,
  hand,
  deck,
  isPlayerTurn,
  onCardSummon,
  onEndTurn,
}: {
  monster: any;
  playerHealth: number;
  stamina: number;
  field: any[];
  hand: any[];
  deck: any[];
  isPlayerTurn: boolean;
  onCardSummon: (card: any) => void;
  onEndTurn: () => void;
}) {
  return (
    <div className="battle-area pixel-bg">
      <div className="max-w-7xl mx-auto w-full space-y-4">
        {monster && <Monster monster={monster} />}

        <PlayerStatus 
          health={playerHealth}
          stamina={stamina}
          onEndTurn={onEndTurn}
          canEndTurn={isPlayerTurn && field.length > 0}
        />

        {field.length > 0 && (
          <div className="space-y-2">
            <h3 className="pixel-text text-sm">Your Field</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
              {field.map((card) => (
                <GameCard 
                  key={card.id}
                  card={card}
                  showMaxHealth
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center pixel-text text-xs mt-4">
          Cards in deck: {deck.length}
        </div>
      </div>

      <div className="player-hand">
        <div className="hand-cards">
          {hand.map((card, index) => {
            const rotation = (index - (hand.length - 1) / 2) * 5;
            return (
              <div
                key={card.id}
                className="hand-card"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <GameCard 
                  card={card}
                  onClick={() => onCardSummon(card)}
                  isDisabled={!isPlayerTurn || stamina < card.staminaCost}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}