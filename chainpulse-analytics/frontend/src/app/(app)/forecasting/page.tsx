"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { AnimatedChart, CustomChartTooltip } from "@/components/ui-custom/AnimatedChart";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { BrainCircuit, Loader2, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { api, ForecastRequest } from "@/services/api";
import { toast } from "sonner";

interface ForecastData {
  name: string;
  demand: number;
  confidenceMin: number;
  confidenceMax: number;
}

interface ForecastResponse {
  status: string;
  forecast: ForecastData[];
  insights: {
    peak_demand: number;
    peak_week: string;
    confidence: number;
    recommendation: string;
  };
}

export default function ForecastingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ForecastResponse | null>(null);

  // Form State
  const [category, setCategory] = useState("Sporting Goods");
  const [market, setMarket] = useState("North America");
  const [region, setRegion] = useState("North America");
  const [shippingMode, setShippingMode] = useState("Standard Class");

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setData(null);
    
    try {
      const requestPayload: ForecastRequest = {
        category,
        market,
        region,
        shipping_mode: shippingMode
      };
      
      const res = await api.getForecast(requestPayload);
      if (res.status === 'success') {
        setData(res);
        toast.success("AI Forecast generated successfully.");
      } else {
        toast.error("Failed to generate forecast.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An unexpected API error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            Demand Forecasting <Sparkles className="w-6 h-6 text-accent" />
          </h1>
          <p className="text-muted-foreground">Predict future product demand using our advanced XGBoost/ARIMA pipeline.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Form */}
        <div className="lg:col-span-4">
          <GlassCard delay={0.1} className="h-full">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Prediction Parameters</h3>
            </div>
            
            <form onSubmit={handlePredict} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Product Category</label>
                <select 
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60"
                >
                  <option>Sporting Goods</option>
                  <option>Electronics</option>
                  <option>Apparel</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Target Market</label>
                <select 
                  value={market} onChange={(e) => setMarket(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60"
                >
                  <option>Pacific Asia</option>
                  <option>North America</option>
                  <option>Europe</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Region</label>
                <select 
                  value={region} onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60"
                >
                  <option>Southeast Asia</option>
                  <option>South Asia</option>
                  <option>Oceania</option>
                  <option>North America</option>
                  <option>Europe</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Shipping Mode</label>
                <select 
                  value={shippingMode} onChange={(e) => setShippingMode(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60"
                >
                  <option>Standard Class</option>
                  <option>First Class</option>
                  <option>Same Day</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Data...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Generate Forecast
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Results / Graph area */}
        <div className="lg:col-span-8">
          <GlassCard delay={0.2} className="h-full flex flex-col min-h-[500px]">
            {!data && !isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <TrendingUp className="w-20 h-20 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Awaiting Parameters</h3>
                <p className="text-muted-foreground max-w-sm">
                  Select your parameters on the left and run the prediction engine to generate AI-driven demand forecasts.
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                   <BrainCircuit className="w-20 h-20 text-primary mb-6" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">AI Engine Active</h3>
                <p className="text-primary text-sm animate-pulse">Running XGBoost estimators...</p>
              </div>
            ) : data ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col h-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-lg">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Peak Demand</p>
                    <p className="text-3xl font-bold text-white">{data.insights.peak_demand.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400 mt-1">{data.insights.peak_week}</p>
                  </div>
                  <div className="bg-black/40 p-5 rounded-xl border border-white/10 hover:border-white/20 transition-colors shadow-lg">
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-accent" /> Forecast Confidence</p>
                    <p className="text-3xl font-bold text-white">{data.insights.confidence}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on R-squared</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-5 rounded-xl border border-primary/30 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                    <p className="text-sm text-primary-foreground/80 mb-2 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Recommendation</p>
                    <p className="text-sm font-medium text-white leading-relaxed">{data.insights.recommendation}</p>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[350px]">
                  <AnimatedChart title="Projected Demand Trend" subtitle="6-week forecast with confidence intervals">
                    <AreaChart data={data.forecast} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomChartTooltip />} />
                      
                      {/* Confidence Interval (Max) */}
                      <Area type="monotone" dataKey="confidenceMax" stroke="none" fill="rgba(255,255,255,0.03)" />
                      {/* Base Demand Line */}
                      <Area type="monotone" dataKey="demand" stroke="var(--chart-1)" strokeWidth={3} fill="url(#colorDemand)" activeDot={{ r: 8 }} />
                      {/* Confidence Interval (Min) covers bottom part to create a band effect */}
                      <Area type="monotone" dataKey="confidenceMin" stroke="none" fill="var(--background)" />
                    </AreaChart>
                  </AnimatedChart>
                </div>
              </motion.div>
            ) : null}
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
