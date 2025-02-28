'use client';

import { motion } from 'framer-motion';
import { FlameIcon as Fire, Zap, Skull, LayersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const stats = [
    {
      value: '40+',
      label: 'Unique Cards',
      icon: <LayersIcon className="w-6 h-6" />,
      description: 'Discover a diverse collection of cards',
    },
    {
      value: '5',
      label: 'Elemental Types',
      icon: <Zap className="w-6 h-6" />,
      description: 'Master different elemental powers',
    },
    {
      value: '6+',
      label: 'Boss Monsters',
      icon: <Skull className="w-6 h-6" />,
      description: 'Challenge powerful adversaries',
    },
    {
      value: '13',
      label: 'Cards Per Deck',
      icon: <Fire className="w-6 h-6" />,
      description: 'Build your strategic deck',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="stats"
      className="py-24 md:py-32 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwLjA1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PC9zdmc+')]"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            backgroundSize: '600px 600px',
            opacity: 0.2,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent"
          >
            Game Statistics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Explore the depth and diversity of our game with these impressive
            numbers that showcase the rich gameplay experience awaiting you.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative group perspective"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 rounded-2xl blur-xl group-hover:blur-lg transform group-hover:scale-105 transition-all duration-500 opacity-70"></div>
              <motion.div
                className="relative h-full flex flex-col p-8 rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm border border-yellow-500/20 shadow-lg group-hover:shadow-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300"
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 w-fit mx-auto">
                  <div className="text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                    {stat.icon}
                  </div>
                </div>

                <h3 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-200 transition-all duration-300">
                  {stat.value}
                </h3>

                <p className="text-yellow-200 font-medium text-lg mb-2 group-hover:text-yellow-100 transition-colors duration-300">
                  {stat.label}
                </p>

                <p className="text-gray-400 text-sm mt-auto group-hover:text-gray-300 transition-colors duration-300">
                  {stat.description}
                </p>

                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-0.5 bg-gradient-to-r from-yellow-500/30 via-yellow-400/40 to-yellow-500/30 mt-4 rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
