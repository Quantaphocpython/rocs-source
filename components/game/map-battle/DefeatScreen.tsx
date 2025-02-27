'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skull, RefreshCw, ArrowLeft } from 'lucide-react';
import { Boss, Monster } from '@/types/game';
import { ClickSpark } from '@/components/ui/click-spark';

interface DefeatScreenProps {
  boss: Monster;
  onRetry: () => void;
  onReturnToMap: () => void;
}

export function DefeatScreen({
  boss,
  onRetry,
  onReturnToMap,
}: DefeatScreenProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {/* Defeat Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black"></div>

        {/* Animated Smoke */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(120,20,20,0.3) 0%, rgba(0,0,0,0) 70%)',
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              opacity: 0,
              scale: 1,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.5, 0],
              scale: [1, 3, 5],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full bg-black/80 backdrop-blur-sm border border-red-900/50 rounded-xl p-8 text-center"
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
              <Skull className="w-20 h-20 text-red-400" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                    '0 0 40px rgba(220, 38, 38, 0.8)',
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-red-400 mb-2">Defeat</h1>
          <p className="text-xl text-red-200 mb-6">
            {boss.name} has bested you!
          </p>
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
              className="w-32 h-32 object-cover rounded-lg border-2 border-red-400/50"
            />
          </div>

          <div className="bg-black/40 border border-red-900/30 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-red-400 mb-2">
              Battle Results
            </h3>
            <p className="text-red-200/80 mb-4">
              Don't give up! Adjust your strategy and try again. Consider using
              cards that counter {boss.name}'s elements.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-red-200/80">Boss</p>
                <p className="text-lg font-bold text-red-400">{boss.name}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-red-200/80">Elements</p>
                <p className="text-lg font-bold text-red-400">
                  {boss.class.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ClickSpark
            sparkColor="rgba(220, 38, 38, 0.8)"
            sparkSize={6}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Button
              variant="outline"
              className="border-red-900/50 text-red-400 hover:bg-red-900/20 px-6 py-5"
              onClick={onReturnToMap}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Map
            </Button>
          </ClickSpark>

          <ClickSpark
            sparkColor="rgba(234, 179, 8, 0.8)"
            sparkSize={8}
            sparkRadius={20}
            sparkCount={12}
            duration={600}
          >
            <Button
              className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 px-8 py-6 text-lg"
              onClick={onRetry}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </ClickSpark>
        </motion.div>
      </motion.div>
    </div>
  );
}
