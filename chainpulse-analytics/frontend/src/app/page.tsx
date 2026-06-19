"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  Globe2, 
  ShieldAlert, 
  TrendingUp, 
  Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI Demand Forecasting",
    description: "Leverage advanced machine learning (XGBoost & ARIMA) to accurately predict market demand across all product categories.",
    icon: TrendingUp,
  },
  {
    title: "Delivery Risk Intelligence",
    description: "Identify supply chain bottlenecks before they happen. Real-time delivery risk scoring for thousands of shipments.",
    icon: ShieldAlert,
  },
  {
    title: "Executive Command Center",
    description: "A comprehensive SaaS dashboard combining total sales, profit margins, and predictive inventory metrics.",
    icon: BarChart3,
  },
  {
    title: "Global Supply Chain Mapping",
    description: "Interactive heatmaps and dynamic charts showing regional performance and global logistics bottlenecks.",
    icon: Globe2,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 lg:px-24">
        <div className="flex items-center gap-2">
          <Activity className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">
            Chain<span className="text-primary">Pulse</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#demo" className="hover:text-white transition-colors">Live Demo</Link>
          <Link href="#models" className="hover:text-white transition-colors">AI Models</Link>
        </div>
        <div>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Launch Platform
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center pt-24 pb-32 px-6 text-center lg:pt-36">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
            Next-Gen Supply Chain Intelligence
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 max-w-5xl leading-tight"
        >
          Predict the Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-300%">
            Your Supply Chain.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed"
        >
          Forecast demand, optimize inventory, reduce delivery risks, and make data-driven decisions with our enterprise AI command center.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-gray-200 rounded-full group transition-all duration-300">
              Open Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/forecasting">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/20 hover:bg-white/10 bg-transparent transition-all">
              Try Forecasting Engine
            </Button>
          </Link>
        </motion.div>

        {/* Floating Dashboard Preview (Abstract) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 50 }}
          className="w-full max-w-6xl mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-3xl -z-10 rounded-[3rem]" />
          <div className="glass rounded-[2rem] p-4 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Mock Dashboard UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                { title: "Predicted Demand", val: "142,593", trend: "+12%" },
                { title: "Delivery Risk", val: "4.2%", trend: "-1.5%", desc: "Low Risk" },
                { title: "AI Optimization", val: "98.5%", trend: "Active", desc: "System Nominal" }
              ].map((kpi, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <p className="text-sm text-muted-foreground mb-2">{kpi.title}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-bold">{kpi.val}</h3>
                    <span className="text-accent text-sm font-medium">{kpi.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="h-64 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                <BrainCircuit className="w-16 h-16 text-primary/50 mb-4 animate-pulse" />
                <h4 className="text-xl font-bold text-white mb-2">Machine Learning Engine Active</h4>
                <p className="text-muted-foreground text-sm max-w-md">Processing millions of rows of supply chain data to generate real-time predictive insights.</p>
                
                {/* Simulated Chart Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end justify-between px-10 opacity-30">
                   {[40, 70, 45, 90, 65, 120, 85, 140, 110, 160].map((h, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}px` }}
                        transition={{ duration: 1.5, delay: i * 0.1 + 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        className="w-12 bg-gradient-to-t from-primary/50 to-accent rounded-t-lg"
                     />
                   ))}
                </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Intelligence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on state-of-the-art machine learning models to provide unparalleled visibility into your logistics network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/10 group hover:bg-white/5 transition-colors"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center border-t border-white/10 bg-[#020617]">
        <p className="text-muted-foreground">© 2026 ChainPulse Analytics. Capstone Project.</p>
      </footer>
    </div>
  );
}
