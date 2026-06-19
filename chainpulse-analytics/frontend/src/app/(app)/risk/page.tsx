"use client";

import React from "react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { ShieldAlert, Map, AlertOctagon, TrendingDown, ArrowRight } from "lucide-react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

// Mock data representing regional delivery risk vs volume
const riskData = [
  { region: "South Asia", volume: 1500, riskScore: 85, severity: "High" },
  { region: "Southeast Asia", volume: 2200, riskScore: 65, severity: "Medium" },
  { region: "Oceania", volume: 800, riskScore: 40, severity: "Low" },
  { region: "North America", volume: 3000, riskScore: 75, severity: "High" },
  { region: "Europe", volume: 2800, riskScore: 50, severity: "Medium" },
  { region: "Latin America", volume: 1200, riskScore: 90, severity: "Critical" },
];

const getRiskColor = (score: number) => {
  if (score > 80) return "var(--destructive)";
  if (score > 60) return "var(--chart-4)"; // Orange/Warning
  return "var(--chart-2)"; // Teal/Safe
};

export default function RiskIntelligencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            Risk Intelligence <ShieldAlert className="w-6 h-6 text-destructive" />
          </h1>
          <p className="text-muted-foreground">Proactively monitor and mitigate supply chain vulnerabilities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard delay={0.1} className="border-t-4 border-t-destructive flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertOctagon className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-white">Critical Delivery Risks</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-1">12<span className="text-xl text-muted-foreground font-normal"> orders</span></p>
            <p className="text-sm text-destructive font-medium">Require immediate rerouting</p>
          </div>
          <button className="mt-4 text-xs font-semibold text-white/70 hover:text-white flex items-center gap-1 transition-colors">
            View Details <ArrowRight className="w-3 h-3" />
          </button>
        </GlassCard>

        <GlassCard delay={0.2} className="border-t-4 border-t-chart-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-chart-4" />
              <h3 className="font-semibold text-white">Inventory Shortages</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-1">3<span className="text-xl text-muted-foreground font-normal"> products</span></p>
            <p className="text-sm text-chart-4 font-medium">Stockout expected in &lt; 5 days</p>
          </div>
          <button className="mt-4 text-xs font-semibold text-white/70 hover:text-white flex items-center gap-1 transition-colors">
            View Details <ArrowRight className="w-3 h-3" />
          </button>
        </GlassCard>

        <GlassCard delay={0.3} className="border-t-4 border-t-chart-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-5 h-5 text-chart-2" />
              <h3 className="font-semibold text-white">Network Status</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-1">94<span className="text-xl text-muted-foreground font-normal">%</span></p>
            <p className="text-sm text-chart-2 font-medium">Routes operating normally</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.4} className="h-[450px] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2">Regional Risk Heatmap</h3>
          <p className="text-sm text-muted-foreground mb-6">Delivery volume vs. Late Delivery Risk Score.</p>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  type="number" 
                  dataKey="volume" 
                  name="Volume" 
                  stroke="rgba(255,255,255,0.5)" 
                  label={{ value: 'Order Volume', position: 'bottom', fill: 'rgba(255,255,255,0.5)' }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="riskScore" 
                  name="Risk Score" 
                  stroke="rgba(255,255,255,0.5)" 
                  label={{ value: 'Risk Score (0-100)', angle: -90, position: 'left', fill: 'rgba(255,255,255,0.5)' }} 
                />
                <ZAxis type="category" dataKey="region" name="Region" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
                          <p className="font-bold text-white mb-1">{data.region}</p>
                          <p className="text-sm text-muted-foreground">Volume: <span className="text-white">{data.volume}</span></p>
                          <p className="text-sm text-muted-foreground">Risk: <span style={{ color: getRiskColor(data.riskScore) }}>{data.riskScore}</span> ({data.severity})</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={riskData} fill="#8884d8">
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskScore)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.5} className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Active Alerts</h3>
          
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {[
              { title: "Port Congestion in Latin America", desc: "Average delay increased by 3.2 days. 120 orders affected.", type: "critical", time: "2 hours ago" },
              { title: "Supplier Delay: Smart Watches", desc: "Shipment from primary supplier delayed. Potential stockout next week.", type: "warning", time: "5 hours ago" },
              { title: "Weather Advisory: North Atlantic", desc: "Storm warning may affect ocean freight times for Europe bound shipments.", type: "warning", time: "1 day ago" },
              { title: "Customs Clearance Issue", desc: "South Asia regional hub experiencing processing delays.", type: "critical", time: "1 day ago" },
              { title: "Route Optimization Completed", desc: "AI successfully rerouted 45 shipments to avoid delays.", type: "success", time: "2 days ago" },
            ].map((alert, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                key={i} 
                className="p-4 rounded-xl bg-black/20 border border-white/5 flex gap-4 items-start hover:bg-white/5 transition-colors"
              >
                <div className={`p-2 rounded-lg mt-1 ${
                  alert.type === 'critical' ? 'bg-destructive/20 text-destructive' :
                  alert.type === 'warning' ? 'bg-chart-4/20 text-chart-4' :
                  'bg-chart-2/20 text-chart-2'
                }`}>
                  {alert.type === 'critical' ? <AlertOctagon className="w-4 h-4" /> :
                   alert.type === 'warning' ? <ShieldAlert className="w-4 h-4" /> :
                   <Map className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
