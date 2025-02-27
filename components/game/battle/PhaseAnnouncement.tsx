'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, Sword, Heart, Zap } from 'lucide-react';

interface PhaseAnnouncementProps {
  message: string | null;
  type: 'phase' | 'effect' | 'damage' | 'heal';
  onComplete?: () => void;
}

export function PhaseAnnouncement({
  message,
  type,
  onComplete,
}: PhaseAnnouncementProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onComplete]);

  const getIcon = () => {
    switch (type) {
      case 'phase':
        return <Zap className="w-4 h-4" />;
      case 'effect':
        return <Shield className="w-4 h-4" />;
      case 'damage':
        return <Sword className="w-4 h-4" />;
      case 'heal':
        return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'phase':
        return 'bg-violet-500/20 text-violet-200 border-violet-400/30 shadow-violet-500/20';
      case 'effect':
        return 'bg-blue-500/20 text-blue-200 border-blue-400/30 shadow-blue-500/20';
      case 'damage':
        return 'bg-red-500/20 text-red-200 border-red-400/30 shadow-red-500/20';
      case 'heal':
        return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30 shadow-emerald-500/20';
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <motion.div
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm',
              'border shadow-lg',
              getTypeStyles()
            )}
            initial={{ scale: 0.9 }}
            animate={{
              scale: [0.9, 1.1, 1],
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              initial={{ rotate: -30, scale: 0.8 }}
              animate={{
                rotate: [0, 15, 0],
                scale: [0.8, 1.2, 1],
                transition: { duration: 0.5 },
              }}
            >
              {getIcon()}
            </motion.div>
            <span className="text-sm font-medium">{message}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
