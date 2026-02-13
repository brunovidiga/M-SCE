"use client";

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  BrainCircuit, 
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import Layout from '@/components/Layout';

const diagnosisData = [
  { name: 'Enxaqueca', value: 35 },
  { name: 'Hipertensão', value: 25 },
  { name: 'Diabetes T2', value: 20 },
  { name: 'Ansiedade', value: 15 },
  { name: 'Outros', value: 5 },
];

const COLORS = ['#c3c7ec', '#fb9262', '#94a3b8', '#2d3154', '#e8e5e9'];

const productivityData = [
  { month: 'Jan', consultas: 120, tempo: 22 },
  { month: 'Fev', consultas: 145, tempo: 20 },
  { month: 'Mar', consultas: 132, tempo: 19 },
  { month: 'Abr', consultas: 160, tempo: 18 },
  { month: 'Mai', consultas: 178, tempo: 17 },
];

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#2d3154]">Relatórios e Insights</h2>
            <p className="text-muted-foreground">Análise detalhada da sua performance e dados clínicos.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl gap-2 bg-white border-none shadow-sm">
              <Calendar size={18} />
              Últimos 30 dias
            </Button>
            <Button className="btn-accent gap-2 rounded-xl shadow-lg shadow-orange-200">
              <Download size={18} />
              Exportar PDF
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total de Consultas</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-[#2d3154]">178</h3>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1">
                  <ArrowUpRight size={14} /> +12%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Tempo Médio / Consulta</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-[#2d3154]">17 min</h3>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1">
                  <ArrowDownRight size={14} /> -15%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Precisão da IA</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-[#2d3154]">98.2%</h3>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1">
                  <ArrowUpRight size={14} /> +0.5%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Novos Pacientes</p>
              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-[#2d3154]">42</h3>
                <span className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1">
                  <ArrowUpRight size={14} /> +8%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Volume de Atendimento vs Eficiência</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="consultas" stroke="#fb9262" strokeWidth={3} dot={{ r: 6, fill: '#fb9262' }} />
                  <Line type="monotone" dataKey="tempo" stroke="#c3c7ec" strokeWidth={3} dot={{ r: 6, fill: '#c3c7ec' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Distribuição de Diagnósticos</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diagnosisData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {diagnosisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 pr-8">
                {diagnosisData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm bg-[#2d3154] text-white overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                <BrainCircuit size={14} className="text-accent" />
                Insight da IA
              </div>
              <h3 className="text-2xl font-bold">Otimização de Agenda Detectada</h3>
              <p className="text-gray-300 leading-relaxed">
                Notamos que suas consultas de "Retorno" estão levando em média 12 minutos, enquanto as de "Primeira Vez" levam 25 minutos. 
                Sugerimos ajustar os blocos da sua agenda para maximizar o fluxo de pacientes no período da manhã.
              </p>
              <Button className="btn-accent rounded-xl gap-2">
                Aplicar Sugestão
              </Button>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-accent/20 rounded-full blur-3xl absolute -top-10 -left-10" />
              <BrainCircuit size={120} className="text-white/10 relative z-10" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;