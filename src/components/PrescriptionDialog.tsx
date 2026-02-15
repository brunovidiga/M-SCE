"use client";

import React, { useState } from 'react';
import { 
  Pill, 
  Download, 
  Printer, 
  Share2, 
  Plus,
  Trash2,
  Check,
  MessageCircle
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

interface PrescriptionDialogProps {
  children: React.ReactNode;
  patientName: string;
  patientPhone?: string;
  onSave?: (meds: { name: string; instructions: string }[]) => void;
}

const PrescriptionDialog = ({ children, patientName, patientPhone, onSave }: PrescriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [meds, setMeds] = useState([
    { id: 1, name: "", instructions: "" }
  ]);

  const handleAddMed = () => {
    setMeds([...meds, { id: Date.now(), name: "", instructions: "" }]);
  };

  const handleRemoveMed = (id: number) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const updateMed = (id: number, field: 'name' | 'instructions', value: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handlePrint = () => {
    showSuccess("Prescrição enviada para a impressora!");
  };

  const handleWhatsApp = () => {
    const text = `*Receita Médica - M-SCE*\n\n*Paciente:* ${patientName}\n*Data:* ${new Date().toLocaleDateString('pt-BR')}\n\n*Medicações:*\n${meds.map(m => `- ${m.name}: ${m.instructions}`).join('\n')}\n\n_Assinado digitalmente por Dr. Ricardo Silva_`;
    const encodedText = encodeURIComponent(text);
    const phone = patientPhone?.replace(/\D/g, '') || "";
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    showSuccess("WhatsApp aberto com a receita!");
  };

  const handleFinalize = () => {
    if (onSave) {
      onSave(meds.map(({ name, instructions }) => ({ name, instructions })));
    }
    showSuccess("Prescrição salva no prontuário!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3154] flex items-center gap-2">
            <Pill className="text-accent" />
            Nova Prescrição
          </DialogTitle>
          <DialogDescription>
            Preencha os medicamentos para {patientName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {meds.map((med, index) => (
            <div key={med.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 relative group">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Medicamento {index + 1}</Label>
                    <Input 
                      value={med.name} 
                      onChange={(e) => updateMed(med.id, 'name', e.target.value)}
                      placeholder="Nome do medicamento e dosagem"
                      className="bg-white border-none shadow-sm rounded-xl h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Posologia / Instruções</Label>
                    <Input 
                      value={med.instructions} 
                      onChange={(e) => updateMed(med.id, 'instructions', e.target.value)}
                      placeholder="Ex: Tomar 1x ao dia por 7 dias"
                      className="bg-white border-none shadow-sm rounded-xl h-10"
                    />
                  </div>
                </div>
                {meds.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full ml-2"
                    onClick={() => handleRemoveMed(med.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
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

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 flex-1">
            <Button variant="outline" className="flex-1 rounded-xl gap-2" onClick={handlePrint}>
              <Printer size={18} />
              Imprimir
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl gap-2 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={handleWhatsApp}>
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </div>
          <Button className="btn-accent rounded-xl gap-2 flex-1" onClick={handleFinalize}>
            <Check size={18} />
            Salvar Receita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;