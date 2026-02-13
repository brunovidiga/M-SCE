"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Pill, 
  Activity,
  Plus,
  Download,
  MoreHorizontal,
  TrendingUp,
  Clock,
  FileSearch,
  Image as ImageIcon,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Layout from '@/components/Layout';
import ReferralDialog from '@/components/ReferralDialog';

const vitalData = [
  { date: '01/01', pa: 130, glicemia: 110 },
  { date: '15/02', pa: 125, glicemia: 105 },
  { date: '12/03', pa: 140, glicemia: 115 },
  { date: '20/04', pa: 120, glicemia: 98 },
  { date: '24/05', pa: 122, glicemia: 95 },
];

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = {
    name: "Maria Oliveira",
    age: "45 anos",
    gender: "Feminino",
    cpf: "123.456.789-00",
    bloodType: "O+",
    allergies: ["Dipirona", "Penicilina"],
    medications: ["Losartana 50mg", "Metformina 850mg"],
    history: [
      { id: 1, date: "24/05/2024", type: "Consulta de Rotina", summary: "Paciente estável, pressão controlada.", doctor: "Dr. Ricardo Silva" },
      { id: 2, date: "12/02/2024", type: "Retorno", summary: "Ajuste de dosagem de Losartana.", doctor: "Dr. Ricardo Silva" },
      { id: 3, date: "15/11/2023", type: "Emergência", summary: "Crise hipertensiva leve.", doctor: "Dra. Ana Paula" },
    ],
    documents: [
      { id: 1, name: "Hemograma Completo.pdf", date: "20/05/2024", type: "Laboratório", size: "1.2 MB" },
      { id: 2, name: "Raio-X Tórax.jpg", date: "15/04/2024", type: "Imagem", size: "4.5 MB" },
      { id: 3, name: "Eletrocardiograma.pdf", date: "10/03/2024", type: "Cardiologia", size: "850 KB" },
    ]
  };

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/pacientes')} className="rounded-full">
              <ChevronLeft />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-[#2d3154] dark:text-white">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.age} • {patient.gender} • CPF: {patient.cpf}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ReferralDialog>
              <Button variant="outline" className="rounded-xl gap-2 bg-white dark:bg-card border-none shadow-sm">
                <UserPlus size={18} />
                Encaminhar
              </Button>
            </ReferralDialog>
            <Button variant="outline" className="rounded-xl gap-2 bg-white dark:bg-card border-none shadow-sm">
              <Download size={18} />
              Exportar
            </Button>
            <Button className="btn-accent rounded-xl gap-2 shadow-lg shadow-orange-100" onClick={() => navigate('/nova-consulta')}>
              <Plus size={18} />
              Nova Consulta
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Informações Rápidas */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-red-50 dark:bg-red-500/10 border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-red-700 dark:text-red-400 uppercase tracking-wider">
                  <AlertTriangle size={14} />
                  ALERGIAS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="destructive" className="rounded-lg text-[10px]">{allergy}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-[#2d3154] dark:text-white uppercase tracking-wider">
                  <Pill size={14} className="text-accent" />
                  MEDICAMENTOS ATIVOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {patient.medications.map((med, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-white/5 rounded-xl text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {med}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-primary-foreground uppercase tracking-wider">
                  <Activity size={14} />
                  ÚLTIMOS VITAIS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">P.A.</span>
                  <span className="text-sm font-bold">122/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Glicemia</span>
                  <span className="text-sm font-bold">95 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Peso</span>
                  <span className="text-sm font-bold">68 kg</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal com Abas */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="evolution" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-white/50 dark:bg-card/50 backdrop-blur-md p-1 shadow-sm">
                <TabsTrigger value="evolution" className="rounded-xl">Evolução</TabsTrigger>
                <TabsTrigger value="timeline" className="rounded-xl">Linha do Tempo</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-xl">Exames e Arquivos</TabsTrigger>
              </TabsList>

              <TabsContent value="evolution" className="space-y-6 pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp size={20} className="text-accent" />
                      Evolução Clínica
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20">P.A. Sistólica</Badge>
                      <Badge variant="outline" className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-500/20">Glicemia</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vitalData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="pa" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                        <Line type="monotone" dataKey="glicemia" stroke="#fb9262" strokeWidth={3} dot={{ r: 4, fill: '#fb9262' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Clock size={20} className="text-primary-foreground" />
                      Histórico de Consultas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 relative before:absolute before:left-[31px] before:top-8 before:bottom-8 before:w-0.5 before:bg-gray-100 dark:before:bg-white/5">
                    {patient.history.map((item) => (
                      <div key={item.id} className="relative pl-12 group">
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white dark:bg-card border-2 border-primary/20 flex items-center justify-center z-10 group-hover:border-primary transition-colors">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all hover:shadow-sm cursor-pointer bg-white dark:bg-card">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-[#2d3154] dark:text-white">{item.type}</p>
                              <p className="text-xs text-muted-foreground">{item.date} • {item.doctor}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3 rounded-xl mt-2 italic">
                            "{item.summary}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.documents.map((doc) => (
                    <Card key={doc.id} className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {doc.type === "Imagem" ? <ImageIcon size={24} /> : <FileSearch size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[#2d3154] dark:text-white truncate">{doc.name}</p>
                          <p className="text-[10px] text-muted-foreground">{doc.date} • {doc.type} • {doc.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Download size={18} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="h-auto py-8 border-dashed border-2 rounded-2xl flex-col gap-2 text-muted-foreground hover:text-primary hover:border-primary">
                    <Plus size={24} />
                    <span className="text-xs font-bold">Upload de Novo Exame</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetail;