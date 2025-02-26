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
    const healthColor = healthPercentage > 50 ? 'from-violet-700 to-violet-500' :
        healthPercentage > 25 ? 'from-orange-700 to-orange-500' :
            'from-red-700 to-red-500';

    return (
        <div className="w-[260px] relative">
            {/* Shadow Container */}
            <div className="absolute inset-0 -m-4 bg-gradient-to-br from-violet-950/20 via-black/40 to-violet-950/20 blur-xl" />

            {/* Boss Image Container */}
            <motion.div
                className={cn(
                    "relative h-[320px] rounded-xl overflow-hidden",
                    "shadow-[0_0_40px_rgba(139,92,246,0.3),inset_0_0_20px_rgba(139,92,246,0.1)]",
                    "border border-violet-900/40",
                    "group transition-transform duration-300",
                    isAttacking && "boss-attacking",
                    isHit && "boss-hit"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-black/50 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0.7)_100%)]" />

                {/* Boss Image */}
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Enhanced Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2)_0%,transparent_70%)]" />

                {/* Boss Name */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center justify-center gap-2">
                        <Skull className="w-4 h-4 text-violet-400" />
                        <h2 className="text-lg font-bold text-violet-300 tracking-wide">{name}</h2>
                        <Skull className="w-4 h-4 text-violet-400" />
                    </div>
                </div>
            </motion.div>

            {/* Boss Stats */}
            <div className="mt-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-violet-900/40
                shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                {/* Health Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-violet-300/80">HP</span>
                        <span className="text-violet-300">{health}/{maxHealth}</span>
                    </div>
                    <div className="relative h-1.5 bg-black/40 rounded-full overflow-hidden border border-violet-900/30">
                        <motion.div
                            className={cn(
                                "absolute inset-y-0 left-0 bg-gradient-to-r shadow-[0_0_10px_rgba(139,92,246,0.3)]",
                                healthColor
                            )}
                            initial={{ width: '100%' }}
                            animate={{ width: `${healthPercentage}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Attack Stat */}
                <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-violet-950/20 border border-violet-900/40">
                    <Sword className="w-4 h-4 text-orange-400" />
                    <div>
                        <div className="text-xs text-violet-300/80">Attack</div>
                        <div className="text-base font-bold text-orange-400">{attack}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}