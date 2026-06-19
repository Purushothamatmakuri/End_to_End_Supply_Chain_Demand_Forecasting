"use client";

import React, { useEffect, useState } from "react";
import { KpiWidget } from "@/components/ui-custom/KpiWidget";
import { AnimatedChart, CustomChartTooltip } from "@/components/ui-custom/AnimatedChart";
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle, 
  PackageCheck,
  Globe2,
  RefreshCw
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import { GlassCard } from "@/components/ui-custom/GlassCard";

interface DashboardData {
  kpis: {
    total_sales: string;
    total_sales_trend: number;
    total_orders: string;
    total_orders_trend: number;
    forecasted_demand: string;
    forecasted_demand_trend: number;
    delivery_risk_score: string;
    delivery_risk_trend: number;
    delivery_risk_subtitle: string;
  };
  sales_data: Array<{ name: string; sales: number; profit: number }>;
  region_data: Array<{ name: string; value: number }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Note: In production this would point to the absolute URL or use a proxy
        const res = await fetch("http://localhost:8000/api/dashboard/summary");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <RefreshCw className="h-10 w-10 animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse">Initializing Data Simulation...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-red-500">
        <GlassCard className="p-8 text-center border-red-500/20 bg-red-500/5">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="text-sm opacity-80">{error || "Failed to load simulation data"}</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">
            Executive Command Center
          </h1>
          <p className="text-muted-foreground/80 text-lg">
            Real-time supply chain operational intelligence & AI risk assessment.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live Metrics</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiWidget 
          title="Total Revenue (YTD)" 
          value={data.kpis.total_sales} 
          icon={DollarSign} 
          trend={data.kpis.total_sales_trend} 
          delay={0.1} 
        />
        <KpiWidget 
          title="Orders Processed" 
          value={data.kpis.total_orders} 
          icon={ShoppingCart} 
          trend={data.kpis.total_orders_trend} 
          delay={0.2} 
        />
        <KpiWidget 
          title="Forecasted Demand" 
          value={data.kpis.forecasted_demand} 
          icon={TrendingUp} 
          trend={data.kpis.forecasted_demand_trend} 
          delay={0.3} 
        />
        <KpiWidget 
          title="Logistics Risk Index" 
          value={data.kpis.delivery_risk_score} 
          icon={AlertTriangle} 
          trend={data.kpis.delivery_risk_trend} 
          subtitle={data.kpis.delivery_risk_subtitle}
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 h-[450px]">
          <AnimatedChart 
            title="Revenue & Profit Correlation" 
            subtitle="AI-smoothed historical sales and profit margins"
            delay={0.5}
          >
            <AreaChart data={data.sales_data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip content={<CustomChartTooltip />} />
              <Area type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              <Area type="monotone" dataKey="profit" stroke="var(--chart-2)" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </AnimatedChart>
        </div>

        {/* Secondary Charts / Widgets */}
        <div className="flex flex-col gap-6">
          <GlassCard delay={0.6} className="flex-1 flex flex-col p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white tracking-tight">Regional Density</h3>
            </div>
            <div className="flex-1 w-full" style={{ minHeight: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.region_data} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomChartTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
                  <Bar dataKey="value" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard delay={0.7} className="flex-none flex flex-col justify-center items-center text-center p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
              <PackageCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Optimization Active</h3>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              AI models predict 94% of SKUs are optimally stocked for the current market conditions.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
