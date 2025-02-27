'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Boss } from '@/types/game';
import { cn } from '@/lib/utils';
import { ClickSpark } from '@/components/ui/click-spark';
import { Flame, Droplet, Trees, Mountain, Cog, Lock, CheckCircle } from 'lucide-react';

interface MapBossSelectionProps {
    bosses: Boss[];
    selectedBoss: Boss;
    onSelectBoss: (boss: Boss) => void;
}

export function MapBossSelection({
    bosses,
    selectedBoss,
    onSelectBoss
}: MapBossSelectionProps) {
    const [completedBosses] = useState<number[]>([]);

    const getClassIcon = (className: string) => {
        switch (className) {
            case 'FIRE': return <Flame className="w-4 h-4 text-red-600" />;
            case 'WATER': return <Droplet className="w-4 h-4 text-cyan-400" />;
            case 'WOOD': return <Trees className="w-4 h-4 text-emerald-500" />;
            case 'EARTH': return <Mountain className="w-4 h-4 text-amber-500" />;
            case 'METAL': return <Cog className="w-4 h-4 text-gray-400" />;
            default: return null;
        }
    };

    const isBossLocked = (bossId: number, index: number) => {
        if (index === 0) return false;
        return !completedBosses.includes(bosses[index - 1].id);
    };

    return (
        <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(147,51,234,0.2)] backdrop-blur-md max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center drop-shadow-[0_2px_4px_rgba(147,51,234,0.5)]">Select Your Challenge</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bosses.map((boss, index) => {
                    const isLocked = isBossLocked(boss.id, index);
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
                                className={cn(
                                    "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                                    "bg-gray-900/60 border",
                                    isLocked ? "border-gray-800/50 opacity-70" : "border-purple-600/50 hover:border-purple-400",
                                    isSelected && !isLocked && "ring-2 ring-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]",
                                    isCompleted && "border-green-600/50"
                                )}
                                onClick={() => !isLocked && onSelectBoss(boss)}
                                whileHover={!isLocked ? { scale: 1.03 } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Boss Image - Full Width */}
                                <div className="relative w-full h-[200px] md:h-[250px]">
                                    <img
                                        src={boss.image}
                                        alt={boss.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />

                                    {/* Status Indicators */}
                                    {isLocked && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-950/80">
                                            <Lock className="w-12 h-12 text-gray-500" />
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="absolute top-3 right-3 bg-green-600/90 rounded-full p-1.5">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Boss Info */}
                                <div className="p-4 md:p-5">
                                    <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-2">{boss.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        {boss.class.map((cls, i) => (
                                            <div key={i} className="flex items-center gap-1 bg-gray-900/70 px-2 py-1 rounded-full border border-purple-600/30">
                                                {getClassIcon(cls)}
                                                <span className="text-xs text-gray-200">{cls}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-600">HP:</span>
                                            <span className="font-bold">{boss.health}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-orange-500">ATK:</span>
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