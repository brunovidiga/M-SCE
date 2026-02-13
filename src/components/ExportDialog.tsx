"use client";

import React from 'react';
import { 
  FileText, 
  Code, 
  Link as LinkIcon, 
  Download,
  Check
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

const ExportDialog = ({ children }: { children: React.ReactNode }) => {
  const handleExport = (type: string) => {
    showSuccess(`Documento exportado como ${type} com sucesso!`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3154]">Exportar Consulta</DialogTitle>
          <DialogDescription>
            Escolha o formato ideal para integração com seu prontuário eletrônico.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            variant="outline" 
            className="h-20 justify-start gap-4 rounded-2xl border-gray-100 hover:border-primary hover:bg-primary/5"
            onClick={() => handleExport('PDF')}
          >
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <FileText size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold">Documento PDF</p>
              <p className="text-xs text-muted-foreground">Ideal para impressão ou anexo manual.</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 justify-start gap-4 rounded-2xl border-gray-100 hover:border-primary hover:bg-primary/5"
            onClick={() => handleExport('JSON')}
          >
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <Code size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold">Integração API (JSON)</p>
              <p className="text-xs text-muted-foreground">Para sistemas de prontuário compatíveis.</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-20 justify-start gap-4 rounded-2xl border-gray-100 hover:border-primary hover:bg-primary/5"
            onClick={() => handleExport('Link')}
          >
            <div className="p-3 bg-green-50 text-green-500 rounded-xl">
              <LinkIcon size={24} />
            </div>
            <div className="text-left">
              <p className="font-bold">Link de Acesso Seguro</p>
              <p className="text-xs text-muted-foreground">Compartilhamento temporário criptografado.</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;