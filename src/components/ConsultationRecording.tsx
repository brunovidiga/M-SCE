"use client";

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Clock, 
  BrainCircuit, 
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ConsultationRecordingProps {
  summary?: string;
  onSaveSummary?: (newSummary: string) => void;
}

const ConsultationRecording = ({ summary, onSaveSummary }: ConsultationRecordingProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary || "");

  useEffect(() => {
    setEditedSummary(summary || "");
  }, [summary]);

  const handleSave = () => {
    if (onSaveSummary) {
      onSaveSummary(editedSummary);
    }
    setIsEditing(false);
  };

  const transcription = [
    { time: "00:12", speaker: "Dr. Ricardo", text: "Bom dia, Maria. Como você tem passado desde a nossa última consulta?", type: "neutral" },
    { time: "00:18", speaker: "Maria Oliveira", text: "Doutor, as dores de cabeça voltaram com muita força essa semana. Sinto uma pressão atrás dos olhos.", type: "symptom" },
    { time: "00:32", speaker: "Dr. Ricardo", text: "Entendo. Você chegou a tomar a Sumatriptana que prescrevemos?", type: "medication" },
    { time: "00:45", speaker: "Maria Oliveira", text: "Tomei, mas parece que o efeito demora muito a passar. E sinto um pouco de enjoo também.", type: "symptom" },
    { time: "01:05", speaker: "Dr. Ricardo", text: "Certo. Vamos tentar ajustar a dosagem e adicionar um antiemético para o enjoo.", type: "plan" },
  ];

  return (
    <div className="space-y-6">
      {/* Player de Áudio Simulado */}
      <div className="bg-[#2d3154] rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-xl">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Gravação da Consulta</p>
              <p className="text-sm font-medium">24 de Maio, 2024 • 14:30</p>
            </div>
          </div>
          <Badge variant="outline" className="border-white/20 text-white">IA Processada</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white text-[#2d3154] hover:bg-white/90 p-0"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </Button>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-mono opacity-60">
                <span>01:12</span>
                <span>03:45</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-white/10" />
            </div>
            <Volume2 size={20} className="opacity-60" />
          </div>
        </div>
      </div>

      {/* Transcrição Inteligente */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#2d3154] dark:text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-accent" />
            Transcrição com Insights
          </h4>
          <div className="flex gap-2">
            <Badge className="bg-red-100 text-red-700 border-none text-[10px]">Sintomas</Badge>
            <Badge className="bg-blue-100 text-blue-700 border-none text-[10px]">Medicamentos</Badge>
          </div>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {transcription.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "p-4 rounded-2xl border transition-all",
                item.type === 'symptom' ? "bg-red-50/50 border-red-100" : 
                item.type === 'medication' ? "bg-blue-50/50 border-blue-100" : 
                item.type === 'plan' ? "bg-green-50/50 border-green-100" : "bg-white dark:bg-card border-gray-100 dark:border-white/5"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-muted-foreground">{item.time} • {item.speaker}</span>
                {item.type === 'symptom' && <AlertCircle size={14} className="text-red-500" />}
                {item.type === 'plan' && <CheckCircle2 size={14} className="text-green-500" />}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo Executivo da IA */}
      <Card className="border-none shadow-sm bg-accent/5 border border-accent/10 group relative">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent">
              <BrainCircuit size={20} />
              <h5 className="font-bold text-sm">Resumo Clínico IA</h5>
            </div>
            {!isEditing ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={14} />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-green-600"
                  onClick={handleSave}
                >
                  <Check size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-red-500"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedSummary(summary || "");
                  }}
                >
                  <X size={14} />
                </Button>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <Textarea 
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[100px] text-xs bg-white border-accent/20 rounded-xl focus-visible:ring-accent"
              autoFocus
            />
          ) : (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {summary || "Nenhum resumo gerado para esta consulta."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationRecording;