"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { BookOpen, Gamepad2, Shield, Map } from "lucide-react";

interface FloatingNavProps {
    onNavigate?: (id: string) => void;
    className?: string;
}

export function FloatingNav({ onNavigate, className }: FloatingNavProps) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: <Gamepad2 className="w-4 h-4" />,
            onClick: () => onNavigate && onNavigate("home"),
        },
        {
            name: "Deck Builder",
            href: "/deck",
            icon: <Shield className="w-4 h-4" />,
        },
        {
            name: "Map",
            href: "/map",
            icon: <Map className="w-4 h-4" />,
        },
        {
            name: "Wiki",
            href: "/wiki",
            icon: <BookOpen className="w-4 h-4" />,
        },
    ];

    const isHomePage = pathname === "/";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "fixed top-4 inset-x-0 mx-auto z-50", // Changed to inset-x-0 and mx-auto
                "bg-black/80 backdrop-blur-md rounded-full px-4 py-2",
                "border border-white/10 shadow-lg",
                "w-fit max-w-3xl", // Added width constraint for better control
                className
            )}
        >
            <div className="flex items-center justify-center space-x-1">
                <Link href="/" className="text-sm font-bold text-yellow-400 mr-4">
                    ROCs
                </Link>

                {navItems.map((item) => {
                    const isActive = isHomePage
                        ? false
                        : pathname === item.href;

                    return item.href === "/" && isHomePage ? (
                        <button
                            key={item.name}
                            onClick={() => item.onClick && item.onClick()}
                            className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                "text-white/70 hover:text-yellow-400 hover:bg-white/5",
                                "flex items-center gap-1.5"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ) : (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                "flex items-center gap-1.5",
                                isActive
                                    ? "text-yellow-400 bg-yellow-900/20"
                                    : "text-white/70 hover:text-yellow-400 hover:bg-white/5"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
}