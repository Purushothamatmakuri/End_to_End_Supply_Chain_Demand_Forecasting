"use client";

import React from "react";
import { GlassCard } from "./GlassCard";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KpiWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number; // positive or negative percentage
  subtitle?: string;
  delay?: number;
}

export function KpiWidget({ title, value, icon: Icon, trend, subtitle, delay = 0 }: KpiWidgetProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend !== undefined && (
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : isNegative
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-3xl font-bold tracking-tight text-white flex items-baseline gap-2">
          {typeof value === "number" ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: delay + 0.2 }}
            >
              {value.toLocaleString()}
            </motion.span>
          ) : (
            value
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>
    </GlassCard>
  );
}
