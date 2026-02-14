"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  User, 
  Calendar, 
  Fingerprint, 
  Phone, 
  Mail,
  Check,
  AlertTriangle,
  Pill
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';

interface NewPatientDialogProps {
  children: React.ReactNode;
  onSave: (patient: any) => void;
}

const NewPatientDialog = ({ children, onSave }: NewPatientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birth: '',
    gender: '',
    phone: '',
    email: '',
    allergies: '',
    medications: ''
  });

  const handleSave = () => {
    if (!formData.name || !formData.cpf) {
      return;
    }

    const newPatient = {
      id: Date.now(),
      name: formData.name,
      cpf: formData.cpf,
      birth: formData.birth,
      gender: formData.gender === 'f' ? 'Feminino' : formData.gender === 'm' ? 'Masculino' : 'Outro',
      lastVisit: new Date().toLocaleDateString('pt-BR'),
      phone: formData.phone || "Não informado",
      email: formData.email,
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(s => s !== ""),
      medications: formData.medications.split(',').map(s => s.trim()).filter(s => s !== "")
    };

    onSave(newPatient);
    showSuccess("Paciente cadastrado com sucesso!");
    setFormData({ name: '', cpf: '', birth: '', gender: '', phone: '', email: '', allergies: '', medications: '' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3154] flex items-center gap-2">
            <UserPlus className="text-accent" />
            Novo Paciente
          </DialogTitle>
          <DialogDescription>
            Preencha os dados básicos e clínicos para iniciar o prontuário.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  id="name" 
                  placeholder="Ex: Maria Silva" 
                  className="pl-10 rounded-xl" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  id="cpf" 
                  placeholder="000.000.000-00" 
                  className="pl-10 rounded-xl" 
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth">Data de Nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  id="birth" 
                  type="date" 
                  className="pl-10 rounded-xl" 
                  value={formData.birth}
                  onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gênero</Label>
              <Select onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="f">Feminino</SelectItem>
                  <SelectItem value="m">Masculino</SelectItem>
                  <SelectItem value="o">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies" className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" />
              Alergias (separadas por vírgula)
            </Label>
            <Textarea 
              id="allergies" 
              placeholder="Ex: Dipirona, Penicilina, Frutos do mar" 
              className="rounded-xl min-h-[80px]"
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications" className="flex items-center gap-2">
              <Pill size={14} className="text-accent" />
              Medicamentos Ativos (separados por vírgula)
            </Label>
            <Textarea 
              id="medications" 
              placeholder="Ex: Losartana 50mg, Metformina 850mg" 
              className="rounded-xl min-h-[80px]"
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button className="btn-accent rounded-xl gap-2" onClick={handleSave}>
            <Check size={18} />
            Salvar Cadastro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPatientDialog;