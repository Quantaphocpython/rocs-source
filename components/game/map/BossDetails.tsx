'use client';

import { Monster } from '@/types/game';
import { motion } from 'framer-motion';
import {
  Cog,
  Droplet,
  Flame,
  Heart,
  Mountain,
  Shield,
  Sword,
  Trees,
} from 'lucide-react';

interface BossDetailsProps {
  boss: Monster;
}

export function BossDetails({ boss }: BossDetailsProps) {
  const getClassIcon = (className: string) => {
    switch (className) {
      case 'FIRE':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'WATER':
        return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'WOOD':
        return <Trees className="w-5 h-5 text-green-400" />;
      case 'EARTH':
        return <Mountain className="w-5 h-5 text-yellow-400" />;
      case 'METAL':
        return <Cog className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getClassColor = (className: string) => {
    switch (className) {
      case 'FIRE':
        return 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20';
      case 'WATER':
        return 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20';
      case 'WOOD':
        return 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20';
      case 'EARTH':
        return 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20';
      case 'METAL':
        return 'bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20';
      default:
        return 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20';
    }
  };

  return (
    <motion.div
      className="bg-gray-900/95 rounded-xl overflow-hidden shadow-2xl backdrop-blur-lg max-w-4xl mx-auto border border-gray-800/50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Boss Image - Full Width */}
      <div className="relative w-full h-[400px] md:h-[500px] group overflow-hidden">
        <img
          src={boss.image}
          alt={boss.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent" />
        <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Name and Class Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-xl tracking-wide">
            {boss.name}
          </h2>
          <div className="flex items-center gap-3 mt-3">
            {boss.class.map((cls, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/50 shadow-sm"
              >
                {getClassIcon(cls)}
                <span className="text-sm font-medium text-gray-100">{cls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Boss Stats and Info */}
      <div className="p-6 md:p-8 space-y-8 bg-gradient-to-b from-gray-900/95 to-gray-950/95">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/60 border border-red-500/30 shadow-md hover:bg-gray-800/80 transition-colors">
            <Heart className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400">Health</p>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {boss.health}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/60 border border-orange-500/30 shadow-md hover:bg-gray-800/80 transition-colors">
            <Sword className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400">Attack</p>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {boss.health}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 rounded-xl bg-gray-800/60 border border-gray-700/30 shadow-inner">
          <p className="text-gray-200 text-sm md:text-base leading-relaxed italic">
            "A legendary beast of immense strength, forged by ancient elemental
            forces, its name echoes in terror across the vast realms of chaos
            and conquest."
          </p>
        </div>

        {/* Element Analysis */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-400" />
            Element Analysis
          </h3>
          <div className="grid gap-3">
            {boss.class.map((cls, i) => (
              <div
                key={i}
                className={`rounded-lg shadow-md overflow-hidden border ${getClassColor(
                  cls
                )} transition-all duration-200 hover:shadow-lg`}
              >
                {/* Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50">
                  {getClassIcon(cls)}
                  <h4 className="text-base font-medium text-white tracking-tight">
                    {cls}
                  </h4>
                </div>
                {/* Table-like Content */}
                <div className="grid grid-cols-2 text-xs text-gray-200 divide-x divide-gray-700/50">
                  <div className="p-3">
                    <p className="text-gray-400 font-medium mb-1.5">Strong</p>
                    {getStrongAgainst(cls).map((element, j) => (
                      <div key={j} className="flex items-center gap-1.5 py-0.5">
                        {getClassIcon(element)}
                        <span>{element}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <p className="text-gray-400 font-medium mb-1.5">Weak</p>
                    {getWeakAgainst(cls).map((element, j) => (
                      <div key={j} className="flex items-center gap-1.5 py-0.5">
                        {getClassIcon(element)}
                        <span>{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper functions remain unchanged
function getStrongAgainst(element: string): string[] {
  switch (element) {
    case 'FIRE':
      return ['METAL', 'WOOD'];
    case 'WATER':
      return ['FIRE', 'EARTH'];
    case 'WOOD':
      return ['WATER', 'EARTH'];
    case 'EARTH':
      return ['METAL', 'FIRE'];
    case 'METAL':
      return ['WOOD', 'WATER'];
    default:
      return [];
  }
}

function getWeakAgainst(element: string): string[] {
  switch (element) {
    case 'FIRE':
      return ['WATER', 'EARTH'];
    case 'WATER':
      return ['WOOD', 'METAL'];
    case 'WOOD':
      return ['FIRE', 'METAL'];
    case 'EARTH':
      return ['WOOD', 'WATER'];
    case 'METAL':
      return ['FIRE', 'EARTH'];
    default:
      return [];
  }
}
