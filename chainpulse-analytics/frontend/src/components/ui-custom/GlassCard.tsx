"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, gradient = false, delay = 0, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay, duration: 0.5 } }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-2xl glass p-6",
        gradient && "bg-gradient-to-br from-card/80 to-card/30",
        className
      )}
      {...props}
    >
      {/* Subtle top highlight for 3D effect */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
