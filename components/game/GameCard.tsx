import { cn } from "@/lib/utils";

const getCardType = (card: any) => {
  if (card.effects.onAttack?.includes('critical') || card.effects.onAttack?.includes('pierce')) {
    return 'warrior';
  }
  if (card.effects.onAttack?.includes('freeze') || card.effects.onAttack?.includes('splash')) {
    return 'mage';
  }
  return 'rogue';
};

export function GameCard({ 
  card, 
  onClick, 
  isSelected, 
  isDisabled,
  showMaxHealth = false 
}: { 
  card: any;
  onClick?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  showMaxHealth?: boolean;
}) {
  const cardType = getCardType(card);

  return (
    <div 
      className={cn(
        "pixel-card cursor-pointer transition-all",
        cardType,
        isSelected && "border-blue-500",
        isDisabled && "opacity-50",
        onClick && "hover:transform hover:translate-y-[-2px]"
      )}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="pixel-card-content">
        <div className="flex-1">
          <h3 className="pixel-text text-sm mb-4">{card.name}</h3>
          
          <div className="flex justify-between mb-4">
            <div className="pixel-text text-xs">⚡ {card.staminaCost}</div>
          </div>
          
          <div className="flex justify-between text-xs pixel-text mb-4">
            <div>⚔️ {card.damage}</div>
            <div>🛡️ {card.health}{showMaxHealth && `/${card.maxHealth}`}</div>
          </div>
        </div>

        {(card.effects.onAttack || card.effects.onDead) && (
          <div className="mt-auto space-y-2">
            {card.effects.onAttack && (
              <div className="effect-badge effect-attack pixel-text">
                ⚔️ {card.effects.onAttack}
              </div>
            )}
            {card.effects.onDead && (
              <div className="effect-badge effect-death pixel-text">
                💀 {card.effects.onDead}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}