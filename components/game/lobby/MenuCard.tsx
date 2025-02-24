'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MenuCardProps {
    icon: typeof LucideIcon;
    title: string;
    description: string;
    onClick: () => void;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
};

export function MenuCard({ icon: Icon, title, description, onClick, index }: MenuCardProps) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative cursor-pointer"
            onClick={onClick}
        >
            {/* Card Background with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br  from-yellow-400/20 to-transparent rounded-lg p-[1px]">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg" />
            </div>

            {/* Card Content */}
            <div className="relative p-8 flex flex-col items-center text-center cursor-pointer">
                <div className="mb-6 transform transition-transform group-hover:scale-110">
                    <Icon className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">{title}</h3>
                <p className="text-yellow-200/80 mb-8 text-lg">{description}</p>
                <Button
                    className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 text-lg py-6 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    {title}
                </Button>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>
    );
}