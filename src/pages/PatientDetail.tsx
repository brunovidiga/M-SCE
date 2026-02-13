"use client";

import React from 'react';
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
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
              <h2 className="text-2xl font-bold text-[#2d3154]">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.age} • {patient.gender} • CPF: {patient.cpf}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2 bg-white border-none shadow-sm">
              <Download size={18} />
              Exportar Prontuário
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
            <Card className="border-none shadow-sm bg-red-50 border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-red-700 uppercase tracking-wider">
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
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-[#2d3154] uppercase tracking-wider">
                  <Pill size={14} className="text-accent" />
                  MEDICAMENTOS ATIVOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {patient.medications.map((med, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl text-xs font-medium">
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

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Gráfico de Evolução */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp size={20} className="text-accent" />
                  Evolução Clínica
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">P.A. Sistólica</Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-100">Glicemia</Badge>
                </div>
              </CardHeader>
              <CardContent className="h-[250px]">
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

            {/* Timeline de Consultas */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Clock size={20} className="text-primary-foreground" />
                  Linha do Tempo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative before:absolute before:left-[31px] before:top-8 before:bottom-8 before:w-0.5 before:bg-gray-100">
                {patient.history.map((item, index) => (
                  <div key={item.id} className="relative pl-12 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center z-10 group-hover:border-primary transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all hover:shadow-sm cursor-pointer bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-[#2d3154]">{item.type}</p>
                          <p className="text-xs text-muted-foreground">{item.date} • {item.doctor}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl mt-2 italic">
                        "{item.summary}"
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetail;