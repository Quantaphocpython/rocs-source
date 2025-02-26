"use client";

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
    effects.push({ name: "Critical Strike", description: "30% chance to deal double damage", type: "attack" });
  } else if (card.onAttackEffect === OnAttackEffect.LIFESTEAL) {
    effects.push({ name: "Lifesteal", description: "Heals for 50% of damage dealt", type: "heal" });
  }
  if (card.onDeadEffect === OnDeadEffect.EXPLODE) {
    effects.push({ name: "Death Explosion", description: "Deals 3 damage when destroyed", type: "damage" });
  }
  if (card.onDefenseEffect === OnDefenseEffect.THORNS) {
    effects.push({ name: "Thorns", description: "Reflects 2 damage when attacked", type: "defense" });
  }
  if (card.activeSkill === ActiveSkill.SACRIFICE) {
    effects.push({ name: "Sacrifice", description: "Can be sacrificed to gain 2 stamina", type: "utility" });
  }
  return effects;
}

function getClassIcon(className: Class) {
  switch (className) {
    case Class.FIRE: return <Flame className="w-4 h-4 text-red-700" />;
    case Class.WATER: return <Droplet className="w-4 h-4 text-blue-700" />;
    case Class.WOOD: return <Trees className="w-4 h-4 text-green-700" />;
    case Class.EARTH: return <Mountain className="w-4 h-4 text-yellow-700" />;
    case Class.METAL: return <Cog className="w-4 h-4 text-gray-700" />;
  }
}

export function CardDetails({ card, isOpen, onClose }: CardDetailsProps) {
  if (!card) return null;
  const effects = getEffectDescription(card);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700 rounded-lg p-0 max-w-[600px] overflow-hidden">
        <div className="p-6 space-y-6 bg-gradient-to-b from-gray-800 to-gray-900">
          {/* Card Header */}
          <div className="flex gap-6">
            <div className="w-[180px] h-[240px] rounded-lg overflow-hidden relative border border-gray-600">
              <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70" />
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-semibold text-white tracking-wide">{card.name}</h2>

              {/* Classes */}
              <div className="flex gap-3">
                {card.class.map((cls, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-700/50 border border-gray-600">
                    {getClassIcon(cls)}
                    <span className="text-xs font-medium text-white">{cls}</span>
                  </div>
                ))}
              </div>

              {/* Core Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-md bg-gray-700/50 border border-red-800/50">
                  <Sword className="w-4 h-4 text-red-700" />
                  <div>
                    <p className="text-xs text-gray-400">Attack</p>
                    <p className="text-lg font-semibold text-white">{card.attack}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md bg-gray-700/50 border border-green-800/50">
                  <Heart className="w-4 h-4 text-green-700" />
                  <div>
                    <p className="text-xs text-gray-400">Health</p>
                    <p className="text-lg font-semibold text-white">
                      {'currentHealth' in card ? `${card.currentHealth}/${card.health}` : card.health}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md bg-gray-700/50 border border-yellow-800/50">
                  <Zap className="w-4 h-4 text-yellow-700" />
                  <div>
                    <p className="text-xs text-gray-400">Cost</p>
                    <p className="text-lg font-semibold text-white">{card.staminaCost}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Effects */}
          {effects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                Special Effects
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {effects.map((effect, index) => (
                  <div key={index} className="p-3 rounded-md bg-gray-700/50 border border-gray-600">
                    <h4 className="font-medium text-sm text-white mb-1">{effect.name}</h4>
                    <p className="text-xs text-gray-300">{effect.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Tips */}
          <div className="p-4 rounded-md bg-gray-700/50 border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-700" />
              <h3 className="text-base font-medium text-white">Strategy Tips</h3>
            </div>
            <div className="space-y-1 text-xs text-gray-300">
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