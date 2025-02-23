'use client';

import { motion } from 'framer-motion';

export function BackgroundEffects() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Orbs */}
            <div className="relative w-full h-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-400 rounded-full blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-400 rounded-full blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[120px]"
                />
            </div>

            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"
                style={{
                    background: `
            radial-gradient(circle at center, 
              rgba(0,0,0,0) 0%, 
              rgba(0,0,0,0.8) 100%
            ),
            linear-gradient(to bottom,
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.6) 50%,
              rgba(0,0,0,0.8) 100%
            )
          `
                }}
            />

            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    transform: 'scale(1.5)',
                }}
            />
        </div>
    );
}