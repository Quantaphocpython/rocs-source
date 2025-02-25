'use client';

import { motion } from 'framer-motion';
import { Heart, Sword } from 'lucide-react';
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

    return (
        <div className="boss-container">
            {/* Boss Image */}
            <motion.div
                className={cn(
                    "boss-image",
                    isAttacking && "boss-attacking",
                    isHit && "boss-hit"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Boss Stats */}
            <div className="boss-stats">
                <h2 className="boss-name">{name}</h2>

                <div className="space-y-3">
                    {/* Health Bar */}
                    <div className="relative h-4 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-400"
                            initial={{ width: '100%' }}
                            animate={{ width: `${healthPercentage}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Health */}
                        <div className="boss-stat text-red-400">
                            <Heart className="boss-stat-icon" />
                            <span className="boss-stat-value">{health}/{maxHealth}</span>
                        </div>

                        {/* Attack */}
                        <div className="boss-stat text-orange-400">
                            <Sword className="boss-stat-icon" />
                            <span className="boss-stat-value">{attack}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}