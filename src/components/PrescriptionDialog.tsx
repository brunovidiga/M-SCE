"use client";

import React, { useState } from 'react';
import { 
  Pill, 
  Download, 
  Printer, 
  Share2, 
  Plus,
  Trash2,
  Check
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
import { showSuccess } from '@/utils/toast';

const PrescriptionDialog = ({ children }: { children: React.ReactNode }) => {
  const [meds, setMeds] = useState([
    { id: 1, name: "Sumatriptana 50mg", instructions: "Tomar 1 comprimido via oral ao início da crise de enxaqueca." },
    { id: 2, name: "Metoclopramida 10mg", instructions: "Tomar 1 comprimido via oral se houver náuseas ou vômitos." }
  ]);

  const handleAddMed = () => {
    setMeds([...meds, { id: Date.now(), name: "", instructions: "" }]);
  };

  const handleRemoveMed = (id: number) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const handlePrint = () => {
    showSuccess("Prescrição enviada para a impressora!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3154] flex items-center gap-2">
            <Pill className="text-accent" />
            Prescrição Médica
          </DialogTitle>
          <DialogDescription>
            Revise as medicações sugeridas pela IA com base na consulta atual.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto pr-2">
          {meds.map((med, index) => (
            <div key={med.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 relative group">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Medicamento {index + 1}</Label>
                    <Input 
                      defaultValue={med.name} 
                      placeholder="Nome do medicamento e dosagem"
                      className="bg-white border-none shadow-sm rounded-xl h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Posologia / Instruções</Label>
                    <Input 
                      defaultValue={med.instructions} 
                      placeholder="Ex: Tomar 1x ao dia por 7 dias"
                      className="bg-white border-none shadow-sm rounded-xl h-10"
                    />
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full ml-2"
                  onClick={() => handleRemoveMed(med.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full border-dashed border-2 rounded-2xl h-12 gap-2 text-muted-foreground hover:text-primary hover:border-primary"
            onClick={handleAddMed}
          >
            <Plus size={18} />
            Adicionar Medicamento
          </Button>
        </div>

        <DialogFooter className="flex sm:justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2" onClick={handlePrint}>
              <Printer size={18} />
              Imprimir
            </Button>
            <Button variant="outline" className="rounded-xl gap-2">
              <Share2 size={18} />
              Enviar via WhatsApp
            </Button>
          </div>
          <Button className="btn-accent rounded-xl gap-2">
            <Check size={18} />
            Finalizar Prescrição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;