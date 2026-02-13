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
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data para o paciente
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
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/pacientes')}>
              <ChevronLeft />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-[#2d3154]">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.age} • {patient.gender} • CPF: {patient.cpf}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2">
              <Download size={18} />
              Exportar Prontuário
            </Button>
            <Button className="btn-accent rounded-xl gap-2" onClick={() => navigate('/nova-consulta')}>
              <Plus size={18} />
              Nova Consulta
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da Esquerda: Alertas e Medicamentos */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-red-50 border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-700">
                  <AlertTriangle size={16} />
                  ALERGIAS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="destructive" className="rounded-lg">{allergy}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#2d3154]">
                  <Pill size={16} className="text-accent" />
                  MEDICAMENTOS CONTÍNUOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.medications.map((med, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-sm font-medium">{med}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#2d3154]">
                  <Activity size={16} className="text-primary-foreground" />
                  DADOS VITAIS RECENTES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pressão Arterial</span>
                  <span className="font-bold">120/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Glicemia</span>
                  <span className="font-bold">95 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Peso</span>
                  <span className="font-bold">68 kg</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita: Histórico de Consultas */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Histórico de Consultas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patient.history.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary-foreground">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-[#2d3154]">{item.type}</p>
                          <p className="text-xs text-muted-foreground">{item.date} • {item.doctor}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal size={18} />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded-xl mt-2">
                      {item.summary}
                    </p>
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