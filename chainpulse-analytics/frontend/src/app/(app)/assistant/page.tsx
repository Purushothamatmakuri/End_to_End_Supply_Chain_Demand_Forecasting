"use client";

import React, { useState, useRef, useEffect } from "react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I am your ChainPulse AI Business Assistant. I can analyze supply chain data, forecast demand, and identify risks. How can I help you today?",
  },
];

const SUGGESTED_QUERIES = [
  "Which region has the highest demand?",
  "Why are delays increasing in Latin America?",
  "What products need more inventory next week?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponse = "Based on the latest data, I've analyzed your query. ";
      
      if (text.toLowerCase().includes("region") && text.toLowerCase().includes("demand")) {
        aiResponse = "Currently, **North America** has the highest forecasted demand for the upcoming month, followed closely by **Europe**. However, **Southeast Asia** is showing the fastest growth rate in orders (up 12% MoM).";
      } else if (text.toLowerCase().includes("delays") || text.toLowerCase().includes("latin america")) {
        aiResponse = "Delays in **Latin America** have increased by 3.2 days on average. This is primarily correlated with port congestion and recent weather advisories affecting ocean freight. I recommend shifting critical inventory to air freight for this region.";
      } else if (text.toLowerCase().includes("inventory") || text.toLowerCase().includes("products")) {
        aiResponse = "According to the forecasting model, **Smart Watches** in the Sporting Goods category will experience a 15% spike in demand by Week 4. Current inventory levels will stock out in 5 days if not replenished.";
      } else {
        aiResponse = "I've logged that query. Based on our forecasting models and risk intelligence pipeline, our supply chain is currently 94% optimized. Is there a specific product line or region you'd like me to drill down into?";
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          AI Business Assistant <MessageSquare className="w-6 h-6 text-primary" />
        </h1>
        <p className="text-muted-foreground">Ask questions in natural language to query your supply chain data.</p>
      </div>

      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative border border-white/10">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-accent/20 text-white border border-accent/20 rounded-tr-none" 
                    : "bg-white/5 text-white/90 border border-white/10 rounded-tl-none"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Suggested queries:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-full px-4 py-2 transition-colors"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your supply chain..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}
