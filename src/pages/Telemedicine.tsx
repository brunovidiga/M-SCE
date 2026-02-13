"use client";

import React, { useState } from 'react';
import { 
  Mic, 
  Video, 
  VideoOff, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  LayoutPanelLeft,
  Wand2,
  FileText,
  Settings,
  Maximize2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

const Telemedicine = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState("transcription");

  return (
    <Layout>
      <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">
        {/* Área do Vídeo */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative flex-1 bg-[#2d3154] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Vídeo do Paciente (Simulado) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                  <User size={48} className="text-white/50" />
                </div>
                <p className="text-white font-medium">Maria Oliveira (Paciente)</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Conexão Estável</Badge>
              </div>
            </div>

            {/* Vídeo do Médico (PiP) */}
            <div className="absolute bottom-6 right-6 w-48 h-32 bg-gray-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl">
              {!isVideoOff ? (
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Você</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <VideoOff size={24} className="text-white/20" />
                </div>
              )}
            </div>

            {/* Controles de Chamada */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("rounded-full h-12 w-12", isMuted ? "bg-red-500 text-white hover:bg-red-600" : "text-white hover:bg-white/20")}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("rounded-full h-12 w-12", isVideoOff ? "bg-red-500 text-white hover:bg-red-600" : "text-white hover:bg-white/20")}
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
              </Button>
              <div className="w-px h-8 bg-white/20 mx-2" />
              <Button variant="destructive" size="icon" className="rounded-full h-14 w-14 shadow-lg shadow-red-500/40">
                <PhoneOff size={24} />
              </Button>
              <div className="w-px h-8 bg-white/20 mx-2" />
              <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                <MessageSquare size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-white hover:bg-white/20">
                <Maximize2 size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <LayoutPanelLeft size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2d3154]">Consulta de Retorno</p>
                <p className="text-xs text-muted-foreground">Iniciada há 12:45</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl gap-2 border-gray-200 bg-white">
              <Settings size={16} />
              Configurações
            </Button>
          </div>
        </div>

        {/* Painel Clínico Lateral */}
        <Card className="w-full lg:w-[400px] border-none shadow-sm flex flex-col overflow-hidden rounded-3xl">
          <Tabs defaultValue="transcription" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
                <TabsTrigger value="transcription" className="rounded-lg gap-2">
                  <Mic size={14} />
                  Transcrição
                </TabsTrigger>
                <TabsTrigger value="notes" className="rounded-lg gap-2">
                  <FileText size={14} />
                  Notas IA
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="transcription" className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">M</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "Bom dia, Maria. Como você tem se sentido com a nova medicação?"
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">P</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "Doutor, as dores de cabeça diminuíram bastante, mas ainda sinto um pouco de tontura pela manhã."
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">M</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "Entendo. Vamos ajustar o horário da tomada para a noite e ver se melhora."
                  </p>
                </div>
                <div className="animate-pulse flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 shrink-0" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-accent tracking-widest">Resumo Automático</Label>
                <Textarea 
                  placeholder="A IA está processando o resumo..." 
                  className="min-h-[200px] rounded-2xl border-gray-100 bg-gray-50/50 text-sm"
                  defaultValue="Paciente relata melhora das cefaleias após início do tratamento. Queixa-se de tontura matinal leve. Conduta: Ajustar horário da medicação para o período noturno."
                />
              </div>
              <Button className="w-full btn-accent gap-2 rounded-xl h-12">
                <Wand2 size={18} />
                Gerar Registro Clínico
              </Button>
            </TabsContent>
          </Tabs>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <Button className="w-full btn-primary rounded-xl h-12 gap-2">
              Finalizar e Salvar
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Telemedicine;