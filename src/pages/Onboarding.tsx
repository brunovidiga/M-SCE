"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Wand2, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Grave suas Consultas",
      description: "Capture cada detalhe da conversa com seu paciente de forma natural. Nossa tecnologia foca no que é clinicamente relevante.",
      icon: <Mic size={48} className="text-accent" />,
      color: "bg-orange-50"
    },
    {
      title: "Inteligência Clínica",
      description: "Nossa IA processa a conversa e gera automaticamente uma anamnese estruturada e um resumo clínico preciso em segundos.",
      icon: <Wand2 size={48} className="text-primary-foreground" />,
      color: "bg-primary/20"
    },
    {
      title: "Segurança e LGPD",
      description: "Seus dados e os de seus pacientes estão protegidos com criptografia de ponta a ponta, em total conformidade com a LGPD.",
      icon: <ShieldCheck size={48} className="text-green-500" />,
      color: "bg-green-50"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-12 text-center">
        <div className={`w-24 h-24 ${steps[step].color} rounded-3xl flex items-center justify-center mx-auto transition-all duration-500 transform scale-110`}>
          {steps[step].icon}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#2d3154] tracking-tight">
            {steps[step].title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {steps[step].description}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-accent" : "w-2 bg-gray-200"}`} 
            />
          ))}
        </div>

        <Button 
          onClick={handleNext}
          className="w-full btn-accent h-14 rounded-2xl text-lg font-semibold gap-2 shadow-xl shadow-orange-100"
        >
          {step === steps.length - 1 ? "Começar Agora" : "Próximo"}
          <ChevronRight size={20} />
        </Button>

        {step < steps.length - 1 && (
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pular introdução
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;