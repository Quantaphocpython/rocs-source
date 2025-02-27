'use client';

import { motion } from 'framer-motion';
import { Boss } from '@/types/game';
import { Heart, Sword, Shield, Flame, Droplet, Trees, Mountain, Cog } from 'lucide-react';

interface BossDetailsProps {
    boss: Boss;
}

export function BossDetails({ boss }: BossDetailsProps) {
    const getClassIcon = (className: string) => {
        switch (className) {
            case 'FIRE': return <Flame className="w-5 h-5 text-red-500" />;
            case 'WATER': return <Droplet className="w-5 h-5 text-blue-500" />;
            case 'WOOD': return <Trees className="w-5 h-5 text-green-500" />;
            case 'EARTH': return <Mountain className="w-5 h-5 text-yellow-500" />;
            case 'METAL': return <Cog className="w-5 h-5 text-gray-500" />;
            default: return null;
        }
    };

    const getClassColor = (className: string) => {
        switch (className) {
            case 'FIRE': return 'bg-red-500/10 border-red-500/20';
            case 'WATER': return 'bg-blue-500/10 border-blue-500/20';
            case 'WOOD': return 'bg-green-500/10 border-green-500/20';
            case 'EARTH': return 'bg-yellow-500/10 border-yellow-500/20';
            case 'METAL': return 'bg-gray-500/10 border-gray-500/20';
            default: return 'bg-purple-500/10 border-purple-500/20';
        }
    };

    return (
        <motion.div
            className="bg-gray-900/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Boss Image - Full Width */}
            <div className="relative w-full h-[400px] md:h-[500px]">
                <img
                    src={boss.image}
                    alt={boss.name}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                {/* Name and Class Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{boss.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                        {boss.class.map((cls, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-gray-800/70 px-3 py-1 rounded-full backdrop-blur-sm"
                            >
                                {getClassIcon(cls)}
                                <span className="text-sm font-medium text-white">{cls}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Boss Stats and Info */}
            <div className="p-6 md:p-8 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-red-500/20">
                        <Heart className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Health</p>
                            <p className="text-2xl md:text-3xl font-bold text-white">{boss.health}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-orange-500/20">
                        <Sword className="w-8 h-8 text-orange-500 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Attack</p>
                            <p className="text-2xl md:text-3xl font-bold text-white">{boss.attack}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/20">
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">{boss.description}</p>
                </div>

                {/* Element Analysis */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Shield className="w-6 h-6 text-yellow-500" />
                        Element Analysis
                    </h3>
                    {boss.class.map((cls, i) => (
                        <div
                            key={i}
                            className={`p-5 rounded-xl ${getClassColor(cls)}`}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                {getClassIcon(cls)}
                                <h4 className="text-lg font-medium text-white">{cls} Element</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400 mb-2">Strong Against:</p>
                                    <ul className="space-y-2">
                                        {getStrongAgainst(cls).map((element, j) => (
                                            <li key={j} className="flex items-center gap-2 text-gray-200">
                                                {getClassIcon(element)}
                                                <span>{element}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-2">Weak Against:</p>
                                    <ul className="space-y-2">
                                        {getWeakAgainst(cls).map((element, j) => (
                                            <li key={j} className="flex items-center gap-2 text-gray-200">
                                                {getClassIcon(element)}
                                                <span>{element}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Helper functions remain unchanged
function getStrongAgainst(element: string): string[] {
    switch (element) {
        case 'FIRE': return ['METAL', 'WOOD'];
        case 'WATER': return ['FIRE', 'EARTH'];
        case 'WOOD': return ['WATER', 'EARTH'];
        case 'EARTH': return ['METAL', 'FIRE'];
        case 'METAL': return ['WOOD', 'WATER'];
        default: return [];
    }
}

function getWeakAgainst(element: string): string[] {
    switch (element) {
        case 'FIRE': return ['WATER', 'EARTH'];
        case 'WATER': return ['WOOD', 'METAL'];
        case 'WOOD': return ['FIRE', 'METAL'];
        case 'EARTH': return ['WOOD', 'WATER'];
        case 'METAL': return ['FIRE', 'EARTH'];
        default: return [];
    }
}