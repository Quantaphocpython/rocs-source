"use client";

import { Dialog, DialogContent } from "../../ui/dialog";
import { Heart, Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";
import { motion } from "framer-motion";

interface TutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialDialog({ isOpen, onClose }: TutorialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-gradient-to-br from-gray-950 via-black to-gray-900 border border-gray-700/50 
        text-white p-0 max-w-3xl max-h-[80vh] overflow-y-auto shadow-[0_0_50px_rgba(59,130,246,0.2)] 
        backdrop-blur-lg rounded-xl"
      >
        <div className="relative p-6 space-y-8">
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,transparent_70%)]" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent 
              tracking-wide mb-4">
              How to Play
            </h2>
            <p className="text-gray-300 text-sm">
              A strategic card game where you battle powerful monsters with elemental mastery.
            </p>
          </motion.div>

          {/* Game Flow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-400 tracking-wider">Game Flow</h3>
            <div className="space-y-3">
              {[
                {
                  title: "1. Deck Building",
                  desc: "Choose 13 cards to craft your deck. Each card has a copy limit.",
                },
                {
                  title: "2. Battle Phase",
                  desc: "Engage in turn-based combat with the monster. Each turn allows you to:",
                  list: ["Play one card (costs stamina)", "Attack with played cards", "End turn to draw a card"],
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.2)" }}
                  className="bg-gray-900/50 p-4 border border-gray-700/40 rounded-lg 
                    shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-sm"
                >
                  <p className="text-sm">
                    <span className="text-cyan-400 font-medium">{item.title}:</span> {item.desc}
                  </p>
                  {item.list && (
                    <ul className="mt-2 space-y-1 text-sm text-gray-300 list-disc pl-5">
                      {item.list.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card Elements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-400 tracking-wider">Card Elements</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Flame className="w-6 h-6 text-red-500" />, name: "Fire", desc: "High damage, explosive effects" },
                { icon: <Droplet className="w-6 h-6 text-blue-500" />, name: "Water", desc: "Healing and lifesteal abilities" },
                { icon: <Trees className="w-6 h-6 text-green-500" />, name: "Wood", desc: "Balanced stats and effects" },
                { icon: <Mountain className="w-6 h-6 text-yellow-500" />, name: "Earth", desc: "High health, defensive abilities" },
                { icon: <Cog className="w-6 h-6 text-gray-400" />, name: "Metal", desc: "Strong attacks, armor effects" },
              ].map((elem, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, boxShadow: "0 0 25px rgba(59,130,246,0.15)" }}
                  className="flex items-center gap-3 bg-gray-900/50 p-4 border border-gray-700/40 
                    rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                >
                  {elem.icon}
                  <div>
                    <p className="font-medium text-white">{elem.name}</p>
                    <p className="text-sm text-gray-300">{elem.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-400 tracking-wider">Card Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Sword className="w-5 h-5 text-orange-500" />, name: "Attack", desc: "Damage dealt to monster" },
                { icon: <Heart className="w-5 h-5 text-red-500" />, name: "Health", desc: "Card's durability" },
                { icon: <Zap className="w-5 h-5 text-yellow-500" />, name: "Stamina Cost", desc: "Required to play card" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, boxShadow: "0 0 25px rgba(59,130,246,0.15)" }}
                  className="flex items-center gap-3 bg-gray-900/50 p-4 border border-gray-700/40 
                    rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                >
                  {stat.icon}
                  <div>
                    <p className="font-medium text-white">{stat.name}</p>
                    <p className="text-sm text-gray-300">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Effects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-400 tracking-wider">Special Effects</h3>
            <div className="space-y-3">
              {[
                "Critical Strike: 30% chance to deal double damage",
                "Lifesteal: Heals for 50% of damage dealt",
                "Thorns: Reflects 2 damage when attacked",
                "Explode: Deals 3 damage when destroyed",
              ].map((effect, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.2)" }}
                  className="bg-gray-900/50 p-4 border border-gray-700/40 rounded-lg 
                    shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                >
                  <p className="text-sm">
                    <span className="text-cyan-400 font-medium">{effect.split(":")[0]}:</span>
                    {effect.split(":")[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-400 tracking-wider">Tips</h3>
            <div className="space-y-3">
              {[
                "Balance your deck with different card types and effects",
                "Consider stamina costs when building your deck",
                "Use defensive cards to protect against monster attacks",
                "Right-click cards to view detailed information",
              ].map((tip, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.2)" }}
                  className="bg-gray-900/50 p-4 border border-gray-700/40 rounded-lg 
                    shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                >
                  <p className="text-sm text-gray-300">• {tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}