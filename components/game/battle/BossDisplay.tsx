'use client';

import { motion } from 'framer-motion';
import { Heart, Sword, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BossDisplayProps {
    health: number;
    maxHealth: number;
    attack: number;
    image: string;
    name: string;
    isAttacking: boolean;
    isHit: boolean;
}

export function BossDisplay({
    health,
    maxHealth,
    attack,
    image,
    name,
    isAttacking,
    isHit
}: BossDisplayProps) {
    const healthPercentage = (health / maxHealth) * 100;
    const healthColor = healthPercentage > 50 ? 'from-violet-600 to-violet-400' :
        healthPercentage > 25 ? 'from-orange-600 to-orange-400' :
            'from-red-600 to-red-400';

    return (
        <div className="w-[220px]">
            {/* Boss Image Container */}
            <motion.div
                className={cn(
                    "relative h-[300px] rounded-lg overflow-hidden",
                    "shadow-[0_0_30px_rgba(139,92,246,0.2)]",
                    "group transition-transform duration-300",
                    isAttacking && "boss-attacking",
                    isHit && "boss-hit"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-violet-900/40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,rgba(15,3,30,0.4)_100%)]" />

                {/* Boss Image */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                />

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-t from-violet-900/40 via-transparent to-transparent" />

                {/* Boss Name */}
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-center gap-1">
                        <Skull className="w-4 h-4 text-violet-400" />
                        <h2 className="text-lg font-bold text-violet-400">{name}</h2>
                        <Skull className="w-4 h-4 text-violet-400" />
                    </div>
                </div>
            </motion.div>

            {/* Boss Stats */}
            <div className="mt-3 p-3 rounded-lg bg-black/60 backdrop-blur-sm border border-violet-900/30">
                {/* Health Bar */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-violet-400/80">HP</span>
                        <span className="text-violet-400">{health}/{maxHealth}</span>
                    </div>
                    <div className="relative h-2 bg-violet-900/30 rounded-full overflow-hidden">
                        <motion.div
                            className={cn(
                                "absolute inset-y-0 left-0 bg-gradient-to-r",
                                healthColor
                            )}
                            initial={{ width: '100%' }}
                            animate={{ width: `${healthPercentage}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Attack Stat */}
                <div className="mt-2 flex items-center gap-2 p-2 rounded bg-violet-900/20 border border-violet-900/30">
                    <Sword className="w-4 h-4 text-orange-400" />
                    <div>
                        <div className="text-xs text-violet-400/80">Attack Power</div>
                        <div className="text-base font-bold text-orange-400">{attack}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}