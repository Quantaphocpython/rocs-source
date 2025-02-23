'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sword, Shield, Scroll } from 'lucide-react';
import { Button } from './ui/button';

export function GameLobby() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-900/20 to-black">
            {/* Hero Section */}
            <div className="relative h-screen">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612404730960-5c71577fca11?q=80&w=2070')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-sm" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-4">
                    <motion.h1
                        className="text-6xl md:text-7xl font-bold text-yellow-400 mb-8 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        TCG Battle Adventure
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-yellow-200 mb-12 text-center max-w-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Enter a world of strategy and magic. Build your deck, challenge powerful monsters, and become a legendary hero.
                    </motion.p>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Start Game Card */}
                        <div className="bg-black/40 backdrop-blur-sm border border-yellow-900/50 rounded-lg p-6 hover:bg-yellow-900/20 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                <Sword className="w-12 h-12 text-yellow-400 mb-4" />
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Quick Battle</h3>
                                <p className="text-yellow-200/80 mb-6">Jump straight into action with a pre-built deck</p>
                                <Button
                                    className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400"
                                    onClick={() => router.push('/battle')}
                                >
                                    Start Battle
                                </Button>
                            </div>
                        </div>

                        {/* Deck Builder Card */}
                        <div className="bg-black/40 backdrop-blur-sm border border-yellow-900/50 rounded-lg p-6 hover:bg-yellow-900/20 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                <Shield className="w-12 h-12 text-yellow-400 mb-4" />
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Deck Builder</h3>
                                <p className="text-yellow-200/80 mb-6">Create your own custom deck from available cards</p>
                                <Button
                                    className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400"
                                    onClick={() => router.push('/deck')}
                                >
                                    Build Deck
                                </Button>
                            </div>
                        </div>

                        {/* Tutorial Card */}
                        <div className="bg-black/40 backdrop-blur-sm border border-yellow-900/50 rounded-lg p-6 hover:bg-yellow-900/20 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                <Scroll className="w-12 h-12 text-yellow-400 mb-4" />
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">How to Play</h3>
                                <p className="text-yellow-200/80 mb-6">Learn the game mechanics and strategies</p>
                                <Button
                                    className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400"
                                    onClick={() => router.push('/tutorial')}
                                >
                                    View Tutorial
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}