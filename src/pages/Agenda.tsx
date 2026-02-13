"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  PlayCircle,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

const Agenda = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    { id: 1, time: "08:00", patient: "Maria Oliveira", type: "Consulta Geral", status: "Concluído" },
    { id: 2, time: "09:30", patient: "João Santos", type: "Retorno", status: "Em andamento" },
    { id: 3, time: "10:15", patient: "Ana Costa", type: "Check-up", status: "Aguardando" },
    { id: 4, time: "11:00", patient: "Pedro Rocha", type: "Consulta Geral", status: "Aguardando" },
    { id: 5, time: "14:00", patient: "Carla Mendes", type: "Retorno", status: "Aguardando" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#2d3154]">Agenda</h2>
            <p className="text-muted-foreground">Gerencie seus atendimentos e horários.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ChevronLeft size={20} />
            </Button>
            <div className="px-4 font-bold text-[#2d3154]">
              Hoje, 24 de Maio
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ChevronRight size={20} />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-4">
            {appointments.map((apt) => (
              <Card key={apt.id} className={cn(
                "border-none shadow-sm transition-all hover:shadow-md",
                apt.status === "Em andamento" ? "ring-2 ring-accent ring-offset-2" : ""
              )}>
                <CardContent className="p-0">
                  <div className="flex items-center p-6 gap-6">
                    <div className="flex flex-col items-center justify-center min-w-[80px] border-r border-gray-100 pr-6">
                      <span className="text-xl font-bold text-[#2d3154]">{apt.time}</span>
                      <span className="text-xs text-muted-foreground uppercase font-bold">AM</span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg text-[#2d3154]">{apt.patient}</h4>
                          <Badge variant="outline" className="rounded-lg text-[10px] uppercase tracking-wider">
                            {apt.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><User size={14} /> Particular</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> 30 min</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                          apt.status === "Concluído" ? "bg-green-100 text-green-700" : 
                          apt.status === "Em andamento" ? "bg-accent/20 text-accent" : "bg-gray-100 text-gray-500"
                        )}>
                          {apt.status}
                        </span>
                        
                        {apt.status === "Aguardando" && (
                          <Button 
                            onClick={() => navigate('/nova-consulta')}
                            className="btn-accent gap-2 rounded-xl h-10"
                          >
                            <PlayCircle size={18} />
                            Iniciar
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-[#2d3154] flex items-center gap-2">
                  <CalendarIcon size={18} className="text-primary-foreground" />
                  Resumo do Dia
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total de Consultas</span>
                    <span className="font-bold">18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Concluídas</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Canceladas</span>
                    <span className="font-bold text-red-500">2</span>
                  </div>
                </div>
                <Button className="w-full btn-primary rounded-xl gap-2 mt-2">
                  <Plus size={18} />
                  Novo Horário
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#2d3154] mb-4">Próximo Paciente</h3>
                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary-foreground border border-primary/20">
                      A
                    </div>
                    <div>
                      <p className="font-bold text-sm">Ana Costa</p>
                      <p className="text-xs text-muted-foreground">Check-up Anual</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Última consulta há 6 meses. Histórico de hipertensão leve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;