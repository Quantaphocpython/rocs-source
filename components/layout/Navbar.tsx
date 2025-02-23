'use client';


import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CustomConnectButton } from '../wallet/CustomConnectButton';

export function Navbar({ className }: { className?: string }) {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4',
                'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm',
                className
            )}
        >
            <div className="text-2xl font-bold text-yellow-400">
                TCG Battle
            </div>
            <CustomConnectButton />
        </motion.nav>
    );
}