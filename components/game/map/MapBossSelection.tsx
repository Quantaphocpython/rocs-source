'use client';

import { ClickSpark } from '@/components/ui/click-spark';
import { cn } from '@/lib/utils';
import { Monster } from '@/types/game';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Cog,
  Droplet,
  Flame,
  Lock,
  Mountain,
  Trees,
} from 'lucide-react';
import { useState } from 'react';

interface MapBossSelectionProps {
  bosses: any;
  selectedBoss: any;
  onSelectBoss: (boss: any) => void;
}

export function MapBossSelection({
  bosses,
  selectedBoss,
  onSelectBoss,
}: MapBossSelectionProps) {
  const [completedBosses] = useState<number[]>([]);

  const getClassIcon = (className: string) => {
    switch (className) {
      case 'FIRE':
        return <Flame className="w-4 h-4 text-red-600" />;
      case 'WATER':
        return <Droplet className="w-4 h-4 text-cyan-400" />;
      case 'WOOD':
        return <Trees className="w-4 h-4 text-emerald-500" />;
      case 'EARTH':
        return <Mountain className="w-4 h-4 text-amber-500" />;
      case 'METAL':
        return <Cog className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const isBossLocked = (bossId: number) => {
    if (bossId === bosses[0].id) return false;
    return !completedBosses.includes(bossId - 1);
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(147,51,234,0.2)] backdrop-blur-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center drop-shadow-[0_2px_4px_rgba(147,51,234,0.5)]">
        Select Your Challenge
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bosses.map((boss: any, index: any) => {
          const isLocked = isBossLocked(boss.id);
          const isCompleted = completedBosses.includes(boss.id);
          const isSelected = selectedBoss.id === boss.id;

          return (
            <ClickSpark
              key={boss.id}
              sparkColor="rgba(147, 51, 234, 0.8)"
              sparkSize={6}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <motion.div
                key={boss.id}
                className={cn(
                  'group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300',
                  'bg-gray-900/90 border border-gray-800/50 backdrop-blur-md shadow-xl',
                  isLocked
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-lg',
                  isSelected && !isLocked
                    ? 'ring-2 ring-purple-500 shadow-lg'
                    : '',
                  isCompleted ? 'border-green-600/50' : ''
                )}
                onClick={() => !isLocked && onSelectBoss(boss)}
                whileHover={!isLocked ? { scale: 1.03 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Boss Image - Full Width */}
                <div className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
                  <img
                    src={boss.image}
                    alt={boss.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 bg-white"
                  />
                  {/* Gradient overlay with subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Status Indicators */}
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-950/60">
                      <Lock className="w-12 h-12 text-gray-400/70" />
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-3 right-3 bg-green-600/90 rounded-full p-1.5 shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Boss Info */}
                <div className="p-4 md:p-5 space-y-3 bg-gradient-to-b from-gray-900/90 to-gray-950/90">
                  <h3 className="text-lg md:text-xl font-semibold text-purple-100 tracking-wide truncate">
                    {boss.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {boss.class.map((cls: any, i: any) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 bg-gray-800/70 px-2.5 py-1 rounded-full border border-purple-600/40 text-xs text-gray-100 shadow-sm"
                      >
                        {getClassIcon(cls)}
                        <span>{cls}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-200">
                    <div className="flex items-center gap-1.5 bg-gray-800/50 px-2.5 py-1.5 rounded-lg shadow-inner">
                      <span className="text-red-500 font-medium">HP:</span>
                      <span className="font-bold">{boss.health}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-800/50 px-2.5 py-1.5 rounded-lg shadow-inner">
                      <span className="text-orange-400 font-medium">ATK:</span>
                      <span className="font-bold">{boss.attack}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ClickSpark>
          );
        })}
      </div>
    </div>
  );
}
