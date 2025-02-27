'use client';

import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

const glowVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center px-4">
      {/* Animated Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-yellow-400/5 blur-3xl pointer-events-none"
      />

      {/* Title Section */}
      <motion.div
        className="relative flex items-center gap-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Gamepad2 className="w-16 h-16 text-yellow-400" />
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            TCG Battle
          </h1>
          <p className="text-2xl text-yellow-400/80 mt-2">Adventure</p>
        </div>
        <Gamepad2 className="w-16 h-16 text-yellow-400" />
      </motion.div>

      {/* Description */}
      <motion.p
        className="relative text-xl md:text-2xl text-yellow-200 mb-16 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Enter a world of strategy and magic. Build your deck, challenge powerful
        monsters, and become a legendary hero.
      </motion.p>
    </div>
  );
}
