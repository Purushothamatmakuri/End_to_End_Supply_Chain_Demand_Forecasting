"use client";

import React from "react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { AnimatedChart, CustomChartTooltip } from "@/components/ui-custom/AnimatedChart";
import { PieChart as PieChartIcon, Activity, BookOpen, TrendingUp } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { motion } from "framer-motion";

const shippingPerformance = [
  { name: "Standard Class", onTime: 85, late: 15 },
  { name: "First Class", onTime: 92, late: 8 },
  { name: "Second Class", onTime: 88, late: 12 },
  { name: "Same Day", onTime: 95, late: 5 },
];

const customerSegments = [
  { name: "Consumer", value: 52 },
  { name: "Corporate", value: 30 },
  { name: "Home Office", value: 18 },
];
const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];

const seasonalTrends = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 4500 },
  { month: "Apr", sales: 5000 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 6000 },
  { month: "Jul", sales: 7500 },
  { month: "Aug", sales: 7200 },
  { month: "Sep", sales: 6800 },
  { month: "Oct", sales: 8500 },
  { month: "Nov", sales: 11000 },
  { month: "Dec", sales: 13500 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            Analytics & Insights <PieChartIcon className="w-6 h-6 text-accent" />
          </h1>
          <p className="text-muted-foreground">Deep dive into historical data and EDA insights.</p>
        </div>
      </div>

      {/* Insight Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: "Highest Demand Correlation", desc: "Product Discount has a strong positive correlation (0.75) with Order Quantity.", icon: Activity },
          { title: "Seasonal Peak Identified", desc: "Q4 (Oct-Dec) accounts for 42% of annual revenue across all regions.", icon: TrendingUp },
          { title: "Shipping Efficiency", desc: "'Same Day' shipping mode has the lowest late delivery risk (5%).", icon: BookOpen },
        ].map((insight, i) => (
          <GlassCard key={i} delay={0.1 + i * 0.1} className="bg-primary/5 border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <insight.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
            <p className="text-sm text-muted-foreground">{insight.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Shipping Performance */}
        <AnimatedChart 
          title="Shipping Mode Performance" 
          subtitle="On-time vs Late delivery percentage by mode"
          delay={0.4}
        >
          <BarChart data={shippingPerformance} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomChartTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="onTime" name="On Time (%)" stackId="a" fill="var(--chart-2)" radius={[0, 0, 4, 4]} barSize={40} />
            <Bar dataKey="late" name="Late (%)" stackId="a" fill="var(--destructive)" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </AnimatedChart>

        {/* Customer Segments */}
        <AnimatedChart 
          title="Revenue by Customer Segment" 
          subtitle="Distribution of sales across customer types"
          delay={0.5}
        >
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={customerSegments}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {customerSegments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </AnimatedChart>

        {/* Seasonal Trends */}
        <div className="lg:col-span-2 h-[400px]">
          <AnimatedChart 
            title="Annual Seasonal Sales Trends" 
            subtitle="Aggregated monthly sales volume identifying peak seasons"
            delay={0.6}
          >
            <LineChart data={seasonalTrends} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip content={<CustomChartTooltip />} />
              <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="var(--chart-3)" strokeWidth={4} dot={{ r: 4, fill: 'var(--background)', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
          </AnimatedChart>
        </div>

      </div>
    </div>
  );
}
