"use client";

import { motion } from "framer-motion";
import { Sword, Shield, Map, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    onNavigate: (id: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
    const navItems = [
        {
            name: "Home",
            id: "home",
            icon: <Sword className="h-4 w-4" />,
        },
        {
            name: "Features",
            id: "features",
            icon: <Shield className="h-4 w-4" />,
        },
        {
            name: "Gameplay",
            id: "gameplay",
            icon: <Map className="h-4 w-4" />,
        },
        {
            name: "Roadmap",
            id: "roadmap",
            icon: <Info className="h-4 w-4" />,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 inset-x-0 z-50 border-b border-yellow-900/20 bg-black/30 backdrop-blur-md"
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl font-bold text-yellow-400"
                        >
                            Realm-of-Cards
                        </motion.div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => onNavigate(item.id)}
                                className={cn(
                                    "flex items-center space-x-1 text-sm font-medium text-yellow-400/70 transition-colors hover:text-yellow-400",
                                    "px-3 py-2 rounded-full hover:bg-yellow-400/10"
                                )}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </motion.button>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-4"
                    >
                        <a
                            href="/deck"
                            className="hidden md:flex items-center space-x-1 rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-400/20"
                        >
                            <span>Start Playing</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}