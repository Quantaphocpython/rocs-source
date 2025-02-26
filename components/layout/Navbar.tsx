'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CustomConnectButton } from '../wallet/CustomConnectButton';
import Link from 'next/link';
import { ConnectButton } from '@happy.tech/react';
import { register, connect } from '@happy.tech/core';

export function Navbar({ className }: { className?: string }) {
  const onRegister = () => {
    connect();
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 h-16',
        'bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-3xl',
        'border-b border-yellow-400/20 shadow-lg shadow-yellow-400/10',
        className
      )}
    >
      <Link
        className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
        href={'/'}
      >
        TCG Battle
      </Link>

      <ConnectButton />
      {/* <CustomConnectButton /> */}
    </motion.nav>
  );
}
