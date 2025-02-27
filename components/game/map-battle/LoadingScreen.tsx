'use client';

import { motion } from 'framer-motion';

interface LoadingScreenProps {
    bossName: string;
}

export function LoadingScreen({ bossName }: LoadingScreenProps) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Preparing Battle
                </motion.h1>

                <motion.p
                    className="text-xl text-yellow-200/80 mb-8"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {bossName} awaits your challenge...
                </motion.p>

                <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="relative w-16 h-16">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-400/20 rounded-full"></div>
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full border-4 border-t-yellow-400 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}