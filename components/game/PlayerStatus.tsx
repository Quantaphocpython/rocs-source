import { cn } from "@/lib/utils";

export function PlayerStatus({ 
  health,
  stamina,
  onEndTurn,
  canEndTurn
}: { 
  health: number;
  stamina: number;
  onEndTurn: () => void;
  canEndTurn: boolean;
}) {
  const healthPercentage = (health / 40) * 100;
  const staminaPercentage = (stamina / 5) * 100;

  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-white rounded-lg p-6 pixel-border">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="pixel-text text-sm">❤️ HP</span>
              <span className="pixel-text text-xs text-gray-600">{health}/40</span>
            </div>
            <div className="pixel-progress">
              <div 
                className="pixel-progress-bar pixel-health"
                style={{ width: `${healthPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="pixel-text text-sm">⚡ Stamina</span>
              <span className="pixel-text text-xs text-gray-600">{stamina}/5</span>
            </div>
            <div className="pixel-progress">
              <div 
                className="pixel-progress-bar pixel-stamina"
                style={{ width: `${staminaPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className={cn(
          "pixel-button min-w-[200px]",
          !canEndTurn && "opacity-50 cursor-not-allowed"
        )}
        onClick={onEndTurn}
        disabled={!canEndTurn}
      >
        End Turn & Battle
      </button>
    </div>
  );
}