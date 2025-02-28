'use client';

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const SectionHighlight = ({
    children,
    className,
    containerClassName,
    dotColor = "#ffffff", // Changed to white
    dotOpacity = "0.2", // Slightly reduced opacity for subtlety
    glowColor = "rgba(255, 255, 255, 0.15)" // Subtle white glow
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    dotColor?: string;
    dotOpacity?: string;
    glowColor?: string;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "relative h-full w-full flex items-center bg-black justify-center group overflow-hidden", // Changed bg-background to bg-black
                containerClassName
            )}
            onMouseMove={handleMouseMove}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: `radial-gradient(${dotColor} 0.5px, transparent 1px)`, // White dots
                    backgroundSize: "16px 16px",
                    maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black, transparent)",
                    opacity: dotOpacity,
                }}
            />
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowColor}, // Subtle white glow
              transparent 80%
            )
          `,
                }}
            />
            <div className={cn("relative z-20 w-full", className)}>{children}</div>
        </div>
    );
};