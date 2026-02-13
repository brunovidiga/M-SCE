"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  MoreVertical,
  Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const consultations = [
    { id: 1, patient: "Maria Oliveira", date: "24/05/2024", type: "Clínica Geral", status: "Finalizado" },
    { id: 2, patient: "João Santos", date: "24/05/2024", type: "Retorno", status: "Finalizado" },
    { id: 3, patient: "Ana Costa", date: "23/05/2024", type: "Clínica Geral", status: "Rascunho" },
    { id: 4, patient: "Pedro Rocha", date: "22/05/2024", type: "Check-up", status: "Finalizado" },
    { id: 5, patient: "Carla Mendes", date: "21/05/2024", type: "Clínica Geral", status: "Finalizado" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#2d3154]">Histórico</h2>
            <p className="text-muted-foreground">Gerencie e exporte suas consultas anteriores.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Buscar paciente ou CPF..." 
                className="pl-10 rounded-xl border-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-xl gap-2 border-none shadow-sm bg-white">
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </header>

        <div className="space-y-4">
          {consultations.map((item) => (
            <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-foreground">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#2d3154]">{item.patient}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} /> {item.date}
                        </span>
                        <span className="text-sm text-muted-foreground">• {item.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                      item.status === "Finalizado" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {item.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary-foreground">
                        <Download size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default History;