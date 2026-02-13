"use client";

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare,
  ChevronUp,
  BookOpen,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const ClinicalCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Olá, Dr. Ricardo. Como posso ajudar com o caso atual?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput("");
    
    // Simulação de resposta da IA
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Baseado nas diretrizes da SBC (2024), para este nível de risco cardiovascular, a meta de LDL recomendada é < 50 mg/dL.' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full btn-accent shadow-2xl shadow-orange-200 hover:scale-110 transition-transform flex items-center justify-center p-0"
        >
          <BrainCircuit size={28} />
        </Button>
      ) : (
        <Card className="w-[350px] h-[500px] border-none shadow-2xl flex flex-col overflow-hidden rounded-3xl animate-in slide-in-from-bottom-10 duration-300">
          <CardHeader className="bg-[#2d3154] text-white p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent rounded-lg">
                <BrainCircuit size={18} />
              </div>
              <div>
                <CardTitle className="text-sm font-bold">Clinical Copilot</CardTitle>
                <p className="text-[10px] text-white/60">IA Contextual Ativa</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full h-8 w-8">
              <X size={18} />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === 'ai' 
                  ? "bg-white dark:bg-card shadow-sm text-[#2d3154] dark:text-white rounded-tl-none" 
                  : "bg-accent text-white ml-auto rounded-tr-none"
              )}>
                {msg.text}
              </div>
            ))}
          </CardContent>

          <div className="p-4 bg-white dark:bg-card border-t border-gray-100 dark:border-white/5">
            <div className="flex gap-2">
              <Input 
                placeholder="Pergunte sobre protocolos..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-xl bg-gray-50 dark:bg-white/5 border-none h-10 text-xs"
              />
              <Button onClick={handleSend} size="icon" className="btn-accent rounded-xl h-10 w-10 shrink-0">
                <Send size={16} />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="text-[10px] font-bold text-muted-foreground hover:text-accent flex items-center gap-1">
                <BookOpen size={12} /> Diretrizes
              </button>
              <button className="text-[10px] font-bold text-muted-foreground hover:text-accent flex items-center gap-1">
                <Stethoscope size={12} /> Protocolos
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClinicalCopilot;