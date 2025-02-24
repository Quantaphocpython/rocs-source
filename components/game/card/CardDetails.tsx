'use client';

import { Card, Class, OnAttackEffect, OnDeadEffect, OnDefenseEffect, ActiveSkill, GameCard } from "@/types/game";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Heart, Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog, Info } from "lucide-react";

interface CardDetailsProps {
  card: (Card | GameCard) | null;
  isOpen: boolean;
  onClose: () => void;
}

function getEffectDescription(card: (Card | GameCard) | null) {
  if (!card) return [];

  const effects = [];

  if (card.onAttackEffect === OnAttackEffect.CRITICAL_STRIKE) {
    effects.push({
      name: "Critical Strike",
      description: "30% chance to deal double damage",
      type: "attack"
    });
  } else if (card.onAttackEffect === OnAttackEffect.LIFESTEAL) {
    effects.push({
      name: "Lifesteal",
      description: "Heals for 50% of damage dealt",
      type: "heal"
    });
  }

  if (card.onDeadEffect === OnDeadEffect.EXPLODE) {
    effects.push({
      name: "Death Explosion",
      description: "Deals 3 damage when destroyed",
      type: "damage"
    });
  }

  if (card.onDefenseEffect === OnDefenseEffect.THORNS) {
    effects.push({
      name: "Thorns",
      description: "Reflects 2 damage when attacked",
      type: "defense"
    });
  }

  if (card.activeSkill === ActiveSkill.SACRIFICE) {
    effects.push({
      name: "Sacrifice",
      description: "Can be sacrificed to gain 2 stamina",
      type: "utility"
    });
  }

  return effects;
}

function getClassIcon(className: Class) {
  switch (className) {
    case Class.FIRE:
      return <Flame className="w-5 h-5 text-red-400" />;
    case Class.WATER:
      return <Droplet className="w-5 h-5 text-blue-400" />;
    case Class.WOOD:
      return <Trees className="w-5 h-5 text-green-400" />;
    case Class.EARTH:
      return <Mountain className="w-5 h-5 text-yellow-400" />;
    case Class.METAL:
      return <Cog className="w-5 h-5 text-gray-400" />;
  }
}

export function CardDetails({ card, isOpen, onClose }: CardDetailsProps) {
  if (!card) return null;

  const effects = getEffectDescription(card);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-yellow-900 text-yellow-400 p-0 max-w-2xl">
        <div className="p-6 space-y-6">
          {/* Card Header with Image */}
          <div className="flex gap-6">
            <div className="w-[200px] h-[280px] rounded-lg overflow-hidden relative">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold">{card.name}</h2>

              {/* Classes */}
              <div className="flex gap-2">
                {card.class.map((cls, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-yellow-900/30"
                  >
                    {getClassIcon(cls)}
                    <span className="font-medium">{cls}</span>
                  </div>
                ))}
              </div>

              {/* Core Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-black/50 border border-red-900/30">
                  <Sword className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-xs text-red-400/80">Attack</p>
                    <p className="text-xl font-bold text-red-400">{card.attack}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-black/50 border border-green-900/30">
                  <Heart className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-green-400/80">Health</p>
                    <p className="text-xl font-bold text-green-400">
                      {'currentHealth' in card ? `${card.currentHealth}/${card.health}` : card.health}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-black/50 border border-yellow-900/30">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-yellow-400/80">Cost</p>
                    <p className="text-xl font-bold text-yellow-400">{card.staminaCost}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Effects */}
          {effects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Special Effects
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {effects.map((effect, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-black/50 border border-yellow-900/30"
                  >
                    <h4 className="font-medium text-yellow-400 mb-1">{effect.name}</h4>
                    <p className="text-sm text-yellow-200/70">{effect.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Tips */}
          <div className="p-4 rounded-lg bg-black/50 border border-yellow-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-400">Strategy Tips</h3>
            </div>
            <div className="space-y-2 text-sm text-blue-200/70">
              <p>• Use this card's {card.class.join(" and ")} element synergies</p>
              {card.attack > 7 && <p>• High attack makes it great for offensive plays</p>}
              {card.health > 7 && <p>• High health makes it ideal for defensive positions</p>}
              {card.staminaCost < 3 && <p>• Low cost allows for flexible timing</p>}
              {effects.length > 0 && <p>• Combine effects with other cards for maximum impact</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}