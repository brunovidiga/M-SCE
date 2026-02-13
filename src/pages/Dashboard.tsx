"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Clock, 
  FileText, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: string }) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-[#2d3154]">{value}</h3>
          {trend && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> {trend} este mês
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/20 rounded-xl text-primary-foreground">
          <Icon size={24} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2d3154]">Olá, Dr. Ricardo</h2>
          <p className="text-muted-foreground">Bem-vindo ao seu Clinical Explorer hoje.</p>
        </div>
        <Link to="/nova-consulta">
          <Button className="btn-accent gap-2 h-12 px-6 rounded-xl shadow-lg shadow-orange-200">
            <Plus size={20} />
            Nova Consulta
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Consultas Hoje" value="12" icon={Users} trend="+15%" />
        <StatCard title="Tempo Médio" value="18 min" icon={Clock} />
        <StatCard title="Documentos Gerados" value="145" icon={FileText} trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Consultas Recentes</CardTitle>
            <Link to="/historico" className="text-sm text-accent font-medium hover:underline">Ver todas</Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Maria Oliveira", time: "Há 15 min", status: "Finalizado" },
              { name: "João Santos", time: "Há 1 hora", status: "Finalizado" },
              { name: "Ana Costa", time: "Há 3 horas", status: "Rascunho" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary-foreground border border-primary/20">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    item.status === "Finalizado" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  )}>
                    {item.status}
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-[#c3c7ec]/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dica de Eficiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-2xl border border-[#c3c7ec]/30">
              <p className="text-[#2d3154] leading-relaxed">
                "Você revisou 95% das anamneses geradas pela IA sem alterações significativas. Sua precisão está excelente!"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#fb9262]" style={{ width: '95%' }}></div>
                </div>
                <span className="text-sm font-bold text-[#fb9262]">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;