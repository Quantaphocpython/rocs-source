'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight, Star } from 'lucide-react';
import { Boss } from '@/types/game';
import { ClickSpark } from '@/components/ui/click-spark';

interface VictoryScreenProps {
    boss: Boss;
    onContinue: () => void;
}

export function VictoryScreen({ boss, onContinue }: VictoryScreenProps) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
                {/* Victory Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 to-black"></div>

                {/* Animated Stars */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -20,
                            opacity: 0
                        }}
                        animate={{
                            y: window.innerHeight + 20,
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative z-10 max-w-2xl w-full bg-black/80 backdrop-blur-sm border border-yellow-900/50 rounded-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Trophy className="w-20 h-20 text-yellow-400" />
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    boxShadow: ['0 0 20px rgba(234, 179, 8, 0.5)', '0 0 40px rgba(234, 179, 8, 0.8)', '0 0 20px rgba(234, 179, 8, 0.5)']
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-yellow-400 mb-2">Victory!</h1>
                    <p className="text-xl text-yellow-200 mb-6">You have defeated {boss.name}!</p>
                </motion.div>

                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex justify-center mb-4">
                        <img
                            src={boss.image}
                            alt={boss.name}
                            className="w-32 h-32 object-cover rounded-lg border-2 border-yellow-400/50"
                        />
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3].map((star) => (
                            <motion.div
                                key={star}
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.6 + star * 0.2, type: "spring" }}
                            >
                                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-black/40 border border-yellow-900/30 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-medium text-yellow-400 mb-2">Battle Results</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-yellow-200/80">Boss Defeated</p>
                                <p className="text-lg font-bold text-yellow-400">{boss.name}</p>
                            </div>
                            <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-yellow-200/80">Reward</p>
                                <p className="text-lg font-bold text-yellow-400">Next Stage Unlocked</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <ClickSpark
                        sparkColor="rgba(234, 179, 8, 0.8)"
                        sparkSize={8}
                        sparkRadius={20}
                        sparkCount={12}
                        duration={600}
                    >
                        <Button
                            className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 px-8 py-6 text-lg"
                            onClick={onContinue}
                        >
                            Continue to Map
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </ClickSpark>
                </motion.div>
            </motion.div>
        </div>
    );
}