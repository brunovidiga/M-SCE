"use client";

import React, { useState } from 'react';
import { 
  Send, 
  UserPlus, 
  FileText, 
  Search, 
  Check,
  Wand2,
  Copy
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess } from '@/utils/toast';

const specialists = [
  { id: 1, name: "Dra. Ana Paula", specialty: "Neurologia", hospital: "Hospital Central" },
  { id: 2, name: "Dr. Marcos Viana", specialty: "Cardiologia", hospital: "Clínica Vida" },
  { id: 3, name: "Dra. Juliana Costa", specialty: "Psiquiatria", hospital: "Instituto Mente" },
];

const ReferralDialog = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [referralText, setReferralText] = useState("");

  const generateReferral = () => {
    setReferralText(
      `Prezado(a) colega,\n\nEncaminho a paciente Maria Oliveira para avaliação especializada em ${selectedDoc?.specialty}. \n\nQuadro atual: Cefaleia pulsátil crônica com piora recente. \nHipótese: Enxaqueca refratária.\n\nAtenciosamente,\nDr. Ricardo Silva`
    );
    setStep(2);
  };

  const handleSend = () => {
    showSuccess(`Encaminhamento enviado para ${selectedDoc.name} com sucesso!`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3154] flex items-center gap-2">
            <UserPlus className="text-accent" />
            Encaminhamento Inteligente
          </DialogTitle>
          <DialogDescription>
            Selecione um especialista e gere uma carta de encaminhamento via IA.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Buscar especialista ou hospital..." className="pl-10 rounded-xl" />
            </div>
            <div className="space-y-2">
              {specialists.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                    selectedDoc?.id === doc.id ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-100 hover:border-primary/30"
                  )}
                >
                  <div>
                    <p className="font-bold text-sm text-[#2d3154]">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialty} • {doc.hospital}</p>
                  </div>
                  {selectedDoc?.id === doc.id && <Check size={18} className="text-primary" />}
                </div>
              ))}
            </div>
            <Button 
              className="w-full btn-accent rounded-xl h-12 gap-2" 
              disabled={!selectedDoc}
              onClick={generateReferral}
            >
              <Wand2 size={18} />
              Gerar Carta com IA
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-accent tracking-widest">Carta de Encaminhamento</Label>
              <Textarea 
                value={referralText} 
                onChange={(e) => setReferralText(e.target.value)}
                className="min-h-[200px] rounded-2xl border-gray-100 bg-gray-50/50 text-sm leading-relaxed"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl gap-2" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl gap-2">
                <Copy size={16} />
                Copiar
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 2 && (
            <Button className="w-full btn-primary rounded-xl h-12 gap-2" onClick={handleSend}>
              <Send size={18} />
              Enviar via Plataforma
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;