"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Plus, 
  Calendar, 
  FileText, 
  Settings,
  Calculator,
  Video
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Digite um comando ou busque um paciente..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem onSelect={() => runCommand(() => navigate('/nova-consulta'))}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Nova Consulta</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/pacientes'))}>
            <User className="mr-2 h-4 w-4" />
            <span>Buscar Pacientes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/agenda'))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Ver Agenda</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pacientes Recentes">
          <CommandItem onSelect={() => runCommand(() => navigate('/pacientes/1'))}>
            <User className="mr-2 h-4 w-4" />
            <span>Maria Oliveira</span>
            <CommandShortcut>CPF: 123...</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/pacientes/2'))}>
            <User className="mr-2 h-4 w-4" />
            <span>João Santos</span>
            <CommandShortcut>CPF: 234...</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ferramentas">
          <CommandItem onSelect={() => runCommand(() => navigate('/calculadoras'))}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculadoras Clínicas</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/telemedicina'))}>
            <Video className="mr-2 h-4 w-4" />
            <span>Telemedicina</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/configuracoes'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;