"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "./GlassCard";
import { ResponsiveContainer, TooltipProps } from "recharts";
import { Loader2 } from "lucide-react";

interface AnimatedChartProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number;
  delay?: number;
}

export function AnimatedChart({
  title,
  subtitle,
  children,
  height = 300,
  delay = 0,
}: AnimatedChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <GlassCard delay={delay} className="flex flex-col h-full w-full relative">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex-1 w-full relative" style={{ minHeight: height }}>
        {!isMounted ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin opacity-50" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={height}>
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </GlassCard>
  );
}

// Custom tooltip for charts to match our premium dark theme
export const CustomChartTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl z-50">
        <p className="text-white font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="text-white font-medium">
                {typeof entry.value === 'number' && entry.name?.toString().toLowerCase().includes('sales') 
                  ? `$${entry.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
