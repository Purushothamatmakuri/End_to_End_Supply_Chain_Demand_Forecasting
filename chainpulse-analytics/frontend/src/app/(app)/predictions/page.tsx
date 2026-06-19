"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { AnimatedChart, CustomChartTooltip } from "@/components/ui-custom/AnimatedChart";
import { BrainCircuit, Loader2, Gauge, AlertOctagon, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { api, PredictionRequest } from "@/services/api";
import { toast } from "sonner";

const featureImportance = [
  { name: "Discount", importance: 0.85 },
  { name: "Quantity", importance: 0.65 },
  { name: "Shipping Mode", importance: 0.45 },
  { name: "Region", importance: 0.35 },
  { name: "Category", importance: 0.25 },
];

interface PredictionResponse {
  status: string;
  predicted_sales: number;
  predicted_profit: number;
  delivery_risk_score: number;
  risk_severity: string;
  insight: string;
}

export default function PredictionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PredictionResponse | null>(null);

  // Form states mapping directly to backend prediction fields
  const [benefitPerOrder, setBenefitPerOrder] = useState<number>(120);
  const [productPrice, setProductPrice] = useState<number>(250);
  const [quantity, setQuantity] = useState<number>(12);
  const [deliveryDelay, setDeliveryDelay] = useState<number>(3);
  const [profitMargin, setProfitMargin] = useState<number>(18);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setData(null);
    
    try {
      const payload: PredictionRequest = {
        benefit_per_order: benefitPerOrder,
        product_price: productPrice,
        order_item_quantity: quantity,
        delivery_delay: deliveryDelay,
        profit_margin: profitMargin
      };

      const res = await api.getPrediction(payload);
      if (res.status === 'success') {
        setData(res);
        toast.success("AI Inference completed successfully.");
      } else {
        toast.error("Prediction engine returned an error.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to communicate with inference engine.");
    } finally {
      setIsLoading(false);
    }
  };

  const riskColor = data 
    ? data.delivery_risk_score >= 70 ? "from-orange-500 to-destructive" 
      : data.delivery_risk_score >= 40 ? "from-yellow-400 to-orange-500"
      : "from-emerald-400 to-teal-500"
    : "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          ML Prediction Engine <BrainCircuit className="w-6 h-6 text-primary" />
        </h1>
        <p className="text-muted-foreground">Estimate sales, profit, and delivery risk for hypothetical orders in real-time.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Prediction Form */}
        <div className="xl:col-span-1">
          <GlassCard delay={0.1}>
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4">Inference Parameters</h3>
            <form onSubmit={handlePredict} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/80">Product Price ($)</label>
                <input 
                  type="number" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60" 
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">Quantity</label>
                  <input 
                    type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">Delivery Delay (Days)</label>
                  <input 
                    type="number" value={deliveryDelay} onChange={(e) => setDeliveryDelay(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60" 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">Benefit Per Order ($)</label>
                  <input 
                    type="number" value={benefitPerOrder} onChange={(e) => setBenefitPerOrder(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">Profit Margin (%)</label>
                  <input 
                    type="number" value={profitMargin} onChange={(e) => setProfitMargin(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all hover:bg-black/60" 
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
                {isLoading ? "Running Inference..." : "Predict Outcome"}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Results */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {data ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
            >
              {/* Metric Cards */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="p-5 flex flex-col gap-2 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2 text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Predicted Sales</span>
                    </div>
                    <span className="text-3xl font-bold text-white">${data.predicted_sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </GlassCard>
                  
                  <GlassCard className="p-5 flex flex-col gap-2 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2 text-accent">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Predicted Profit</span>
                    </div>
                    <span className="text-3xl font-bold text-white">${data.predicted_profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="text-xs text-muted-foreground mt-1">Based on inputs</span>
                  </GlassCard>
                </div>

                <GlassCard className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <AlertOctagon className="w-32 h-32" />
                  </div>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className={`w-5 h-5 ${data.delivery_risk_score >= 70 ? 'text-destructive' : data.delivery_risk_score >= 40 ? 'text-orange-400' : 'text-emerald-400'}`} />
                      <span className="font-semibold text-white">Delivery Risk</span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-md ${
                      data.delivery_risk_score >= 70 ? 'bg-destructive/20 text-destructive' : 
                      data.delivery_risk_score >= 40 ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {data.risk_severity}
                    </span>
                  </div>
                  
                  <div className="w-full bg-black/40 h-4 rounded-full overflow-hidden mb-3 border border-white/5 relative z-10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.delivery_risk_score}%` }}
                      transition={{ duration: 1, delay: 0.2, type: "spring" }}
                      className={`h-full bg-gradient-to-r ${riskColor}`} 
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-6 relative z-10">
                    <span>Safe (0)</span>
                    <span className="font-medium text-white/70">Score: {data.delivery_risk_score}/100</span>
                    <span>Critical (100)</span>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 relative z-10">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-white block mb-1">AI Insight:</strong> {data.insight}
                    </p>
                  </div>
                </GlassCard>
              </div>

              {/* Feature Importance */}
              <AnimatedChart title="Feature Importance" subtitle="Factors driving the ML prediction model">
                <BarChart data={featureImportance} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <Tooltip content={<CustomChartTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                  <Bar dataKey="importance" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--chart-${(index % 5) + 1})`} />
                    ))}
                  </Bar>
                </BarChart>
              </AnimatedChart>
            </motion.div>
          ) : (
            <GlassCard delay={0.2} className="flex-1 flex flex-col items-center justify-center text-center opacity-50 min-h-[400px]">
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                  <BrainCircuit className="w-20 h-20 text-primary mb-4" />
                </motion.div>
              ) : (
                <BrainCircuit className="w-20 h-20 text-muted-foreground mb-4" />
              )}
              <h3 className="text-xl font-semibold text-white mb-2">
                {isLoading ? "Running Real-Time Inference" : "Ready for Prediction"}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {isLoading 
                  ? "Evaluating profitability and generating logistical risk profiles..."
                  : "Enter the order details and our ML models will instantly evaluate the profitability and logistical risks."}
              </p>
            </GlassCard>
          )}

        </div>
      </div>
    </div>
  );
}
