"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  BrainCircuit,
  AlertTriangle,
  PieChart,
  MessageSquare,
  Menu,
  X,
  Package,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Demand Forecast", href: "/forecasting", icon: TrendingUp },
  { name: "ML Engine", href: "/predictions", icon: BrainCircuit },
  { name: "Risk Intelligence", href: "/risk", icon: AlertTriangle },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "AI Assistant", href: "/assistant", icon: MessageSquare },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/10 lg:relative lg:translate-x-0 transition-transform duration-300 flex flex-col`}
        style={{ transform: isSidebarOpen ? "translateX(0)" : "" }}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Chain<span className="text-primary">Pulse</span>
            </span>
          </Link>
          <button
            className="lg:hidden text-muted-foreground hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 glass border-b border-white/10 z-30">
          <button
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Administrator</p>
              <p className="text-xs text-muted-foreground">Logistics Team</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
