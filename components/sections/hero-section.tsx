'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { ElementMorphingText } from '@/components/ui/element-morphing-text';

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left relative z-10 pl-0 lg:pl-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-2xl md:text-3xl font-light text-yellow-400">
              Build & Battle
            </h2>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <ElementMorphingText className="!text-left !mx-0 !max-w-none" />
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                Card Adventure
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mt-8 mb-8 text-white/80 max-w-xl"
          >
            A cutting-edge turn-based card game that fuses strategic depth with
            immersive gameplay. Assemble your deck from diverse elemental cards
            and face off against fearsome monsters across dynamic stages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 justify-start p-4"
          >
            {/* Button 1: Build Your Deck */}
            <Button
              size="lg"
              className="relative group overflow-hidden rounded-full text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-violet-600 shadow-lg hover:shadow-2xl hover:from-yellow-500 hover:to-violet-500 transition-all duration-300 ease-in-out"
              onClick={() => (window.location.href = '/deck')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-violet-500/40 to-yellow-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.5),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="relative flex items-center px-6 py-3">
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                <span>Build Your Deck</span>
              </div>
            </Button>

            {/* Button 2: Start Adventure */}
            <Button
              size="lg"
              variant="outline"
              className="relative group overflow-hidden rounded-full text-lg font-semibold text-white border-2 border-white/80 bg-transparent hover:bg-white/10 hover:text-purple-100 hover:border-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => (window.location.href = '/map')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="relative flex items-center px-6 py-3">
                <Shield className="mr-2 h-5 w-5 animate-pulse" />
                <span>Start Adventure</span>
              </div>
            </Button>
          </motion.div>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            {[
              { label: 'Cards Available', value: '40+' },
              { label: 'Unique Elements', value: '5' },
              { label: 'Boss Monsters', value: '6+' },
            ].map((stat, index) => (
              <div key={index} className="text-left relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -m-2" />
                <div className="relative">
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - 3D Card Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative aspect-square w-full max-w-2xl mx-auto"
        >
          {/* Animated Card Container */}
          <div className="relative w-full h-full">
            {/* Glowing Background Effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-violet-500 opacity-20 blur-3xl rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.2),transparent_70%)]" />
            </div>

            {/* Card Stack */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Card Images */}
                <motion.div
                  animate={{
                    rotateY: [0, 10, 0, -10, 0],
                    rotateX: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src="https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png"
                    alt="Fire Card"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-contain transform rotate-[-5deg] shadow-lg rounded-xl"
                  />
                  <img
                    src="https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/vgsemseiixtxtyjjfo1v.png"
                    alt="Water Card"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-contain transform rotate-[5deg] translate-x-[20px] translate-y-[-10px] shadow-lg rounded-xl"
                  />
                  <img
                    src="https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/lm03b601m6xeobc7wczu.png"
                    alt="Wood Card"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-contain transform rotate-[15deg] translate-x-[40px] translate-y-[10px] shadow-lg rounded-xl"
                  />
                </motion.div>

                {/* Floating Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background:
                        i % 3 === 0
                          ? 'rgb(234, 179, 8)'
                          : i % 3 === 1
                          ? 'rgb(139, 92, 246)'
                          : 'rgb(234, 88, 12)',
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                      y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(139,92,246,0.05)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.05)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>
    </section>
  );
}
