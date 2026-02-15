"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronLeft, 
  BrainCircuit, 
  Users, 
  Stethoscope, 
  ShieldCheck,
  Zap,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Plans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Plano Profissional",
      price: "99,00",
      description: "Ideal para médicos autônomos que buscam produtividade.",
      icon: <Stethoscope className="text-accent" size={24} />,
      features: [
        "1 Médico Adicionado",
        "Transcrição de Consultas via IA",
        "Prontuário Eletrônico Ilimitado",
        "Exportação de Relatórios em PDF",
        "Suporte via E-mail",
        "Segurança LGPD"
      ],
      buttonText: "Assinar Agora",
      highlight: false
    },
    {
      name: "Plano Clínica",
      price: "200,00",
      description: "A solução completa para clínicas e centros médicos.",
      icon: <Building2 className="text-primary-foreground" size={24} />,
      features: [
        "Até 20 Médicos Adicionados",
        "Tudo do Plano Profissional",
        "Painel de Gestão Administrativa",
        "Relatórios de Desempenho da Clínica",
        "Suporte Prioritário 24/7",
        "Integração com Sistemas EHR"
      ],
      buttonText: "Escolher Plano Clínica",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#e8e5e9] p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="flex flex-col items-center text-center space-y-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="self-start rounded-full gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={20} />
            Voltar
          </Button>
          
          <div className="p-3 bg-accent rounded-2xl text-white shadow-lg shadow-orange-200 mb-2">
            <BrainCircuit size={40} />
          </div>
          <h1 className="text-4xl font-black text-[#2d3154] tracking-tighter">Escolha o Plano Ideal</h1>
          <p className="text-muted-foreground max-w-lg">
            Potencialize seu atendimento clínico com a inteligência artificial do M-SCE. Planos flexíveis para cada etapa da sua carreira.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <Card 
              key={i} 
              className={`border-none shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col transition-transform hover:scale-[1.02] duration-300 ${
                plan.highlight ? 'ring-4 ring-accent ring-offset-4' : ''
              }`}
            >
              <CardHeader className={`p-8 space-y-4 ${plan.highlight ? 'bg-primary/10' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${plan.highlight ? 'bg-primary text-white' : 'bg-accent/10'}`}>
                    {plan.icon}
                  </div>
                  {plan.highlight && (
                    <Badge className="bg-accent text-white border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Melhor Valor
                    </Badge>
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-[#2d3154]">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                <div className="pt-4">
                  <span className="text-4xl font-black text-[#2d3154]">R$ {plan.price}</span>
                  <span className="text-muted-foreground font-medium"> /mês</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 flex-1 bg-white">
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className={`p-1 rounded-full ${plan.highlight ? 'bg-primary/20 text-primary-foreground' : 'bg-accent/20 text-accent'}`}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-8 bg-gray-50">
                <Button 
                  className={`w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-all ${
                    plan.highlight 
                      ? 'btn-primary shadow-blue-100' 
                      : 'btn-accent shadow-orange-100'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6 pt-8">
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
            <div className="flex items-center gap-2 font-bold text-[#2d3154]">
              <ShieldCheck size={20} /> LGPD Compliant
            </div>
            <div className="flex items-center gap-2 font-bold text-[#2d3154]">
              <Zap size={20} /> Instant Setup
            </div>
            <div className="flex items-center gap-2 font-bold text-[#2d3154]">
              <Users size={20} /> 24/7 Support
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Precisa de um plano personalizado para hospitais? <a href="#" className="text-accent font-bold hover:underline">Fale com nossos especialistas</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Plans;