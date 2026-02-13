"use client";

import React from 'react';
import { 
  UserPlus, 
  User, 
  Calendar, 
  Fingerprint, 
  Phone, 
  Mail,
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';

const NewPatientDialog = ({ children }: { children: React.ReactNode }) => {
  const handleSave = () => {
    showSuccess("Paciente cadastrado com sucesso!");
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
            Novo Paciente
          </DialogTitle>
          <DialogDescription>
            Preencha os dados básicos para iniciar o prontuário digital.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="name" placeholder="Ex: Maria Silva" className="pl-10 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="cpf" placeholder="000.000.000-00" className="pl-10 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth">Data de Nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="birth" type="date" className="pl-10 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gênero</Label>
              <Select>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="phone" placeholder="(00) 00000-0000" className="pl-10 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="email" placeholder="paciente@email.com" className="pl-10 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-xl">Cancelar</Button>
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