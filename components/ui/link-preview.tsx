"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LinkPreview = ({
    children,
    url,
    className,
    cardData,
}: {
    children: React.ReactNode;
    url?: string;
    className?: string;
    cardData?: {
        name: string;
        element: string;
        attack: number;
        health: number;
        cost: number;
        effect: string;
        image: string;
    };
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={cn("underline decoration-dotted underline-offset-4", className)}>
                {children}
            </span>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50"
                >
                    {cardData ? (
                        <div className="w-64 bg-black/90 backdrop-blur-sm border border-yellow-900/50 rounded-lg shadow-xl overflow-hidden">
                            <div className="p-3 border-b border-yellow-900/30">
                                <h3 className="text-lg font-bold text-yellow-400">{cardData.name}</h3>
                                <p className="text-xs text-yellow-400/70">{cardData.element} Element</p>
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between mb-2">
                                    <div className="text-center">
                                        <p className="text-xs text-red-400/80">Attack</p>
                                        <p className="text-sm font-bold text-red-400">{cardData.attack}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-green-400/80">Health</p>
                                        <p className="text-sm font-bold text-green-400">{cardData.health}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-yellow-400/80">Cost</p>
                                        <p className="text-sm font-bold text-yellow-400">{cardData.cost}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    <span className="text-yellow-400 font-medium">Effect: </span>
                                    {cardData.effect}
                                </div>
                            </div>
                            <div className="h-32 overflow-hidden">
                                <img
                                    src={cardData.image}
                                    alt={cardData.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-64 bg-black/90 backdrop-blur-sm border border-yellow-900/50 rounded-lg shadow-xl p-3">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-yellow-400/20 rounded-md flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-yellow-400"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-yellow-400 truncate">
                                        {url || "Link Preview"}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Click to learn more
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};