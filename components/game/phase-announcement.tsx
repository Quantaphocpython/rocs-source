"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Sword, Heart, Zap } from "lucide-react";

interface PhaseAnnouncementProps {
  message: string | null;
  type: "phase" | "effect" | "damage" | "heal";
  onComplete?: () => void;
}

export function PhaseAnnouncement({ message, type, onComplete }: PhaseAnnouncementProps) {
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
      case "phase":
        return <Zap className="w-8 h-8" />;
      case "effect":
        return <Shield className="w-8 h-8" />;
      case "damage":
        return <Sword className="w-8 h-8" />;
      case "heal":
        return <Heart className="w-8 h-8" />;
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          <div
            className={cn(
              "px-12 py-6 rounded-lg font-bold text-center backdrop-blur-sm",
              "flex flex-col items-center gap-4",
              "shadow-[0_0_50px_rgba(0,0,0,0.3)]",
              type === "phase" && "bg-yellow-950/90 text-yellow-400 border-2 border-yellow-400",
              type === "effect" && "bg-blue-950/90 text-blue-400 border-2 border-blue-400",
              type === "damage" && "bg-red-950/90 text-red-400 border-2 border-red-400",
              type === "heal" && "bg-green-950/90 text-green-400 border-2 border-green-400"
            )}
          >
            {getIcon()}
            <div className="text-3xl">{message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}