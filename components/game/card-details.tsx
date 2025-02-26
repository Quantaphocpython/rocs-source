"use client";

import { Card, Class, OnAttackEffect, OnDeadEffect, OnDefenseEffect, ActiveSkill } from "@/types/game";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Heart, Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";
import { motion } from "framer-motion";

interface CardDetailsProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
}

function getEffectDescription(card: Card | null) {
  if (!card) return [];
  const effects = [];
  if (card.onAttackEffect === OnAttackEffect.CRITICAL_STRIKE) effects.push("30% chance to deal double damage");
  if (card.onAttackEffect === OnAttackEffect.LIFESTEAL) effects.push("Heals for 50% of damage dealt");
  if (card.onDeadEffect === OnDeadEffect.EXPLODE) effects.push("Deals 3 damage to enemy when destroyed");
  if (card.onDefenseEffect === OnDefenseEffect.THORNS) effects.push("Reflects 2 damage when attacked");
  if (card.activeSkill === ActiveSkill.SACRIFICE) effects.push("Can be sacrificed to gain 2 stamina");
  return effects;
}

function getClassIcon(className: Class) {
  const classIcons = {
    [Class.FIRE]: <Flame className="w-5 h-5 text-orange-400" />,
    [Class.WATER]: <Droplet className="w-5 h-5 text-blue-400" />,
    [Class.WOOD]: <Trees className="w-5 h-5 text-green-400" />,
    [Class.EARTH]: <Mountain className="w-5 h-5 text-amber-400" />,
    [Class.METAL]: <Cog className="w-5 h-5 text-gray-400" />,
  };
  return classIcons[className];
}

export function CardDetails({ card, isOpen, onClose }: CardDetailsProps) {
  if (!card) return null;
  const effects = getEffectDescription(card);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-950 via-black to-gray-900 border border-yellow-900/50 
        text-yellow-300 p-0 max-w-md shadow-[0_0_40px_rgba(234,179,8,0.2)] backdrop-blur-md">
        <DialogHeader className="p-5 border-b border-yellow-900/30 bg-black/50">
          <DialogTitle className="text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 to-amber-600 
            bg-clip-text text-transparent">
            {card.name}
          </DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="p-5 space-y-6">
          {/* Classes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-yellow-500 tracking-wider">Classes</h3>
            <div className="flex flex-wrap gap-2">
              {card.class.map((cls, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 
                  border border-yellow-900/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  {getClassIcon(cls)}
                  <span className="text-sm font-medium">{cls}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-yellow-500 tracking-wider">Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Sword className="w-5 h-5 text-red-400" />, label: "Attack", value: card.attack },
                { icon: <Heart className="w-5 h-5 text-green-400" />, label: "Health", value: card.health },
                { icon: <Zap className="w-5 h-5 text-blue-400" />, label: "Cost", value: card.staminaCost },
              ].map((stat, idx) => (
                <motion.div key={idx} whileHover={{ y: -2 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gray-900/50 border border-yellow-900/40 
                  shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  {stat.icon}
                  <div>
                    <div className="text-xs text-yellow-400/80">{stat.label}</div>
                    <div className="text-lg font-bold">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Effects */}
          {effects.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-yellow-500 tracking-wider">Effects</h3>
              <div className="space-y-2">
                {effects.map((effect, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-yellow-900/40 
                    shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{effect}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Deck Limit */}
          <motion.div whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 
            border border-yellow-900/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
            <span className="text-sm">Max {card.maxPerSession} copies per deck</span>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}