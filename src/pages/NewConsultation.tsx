"use client";

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Wand2, 
  Save, 
  FileDown, 
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess } from '@/utils/toast';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

const NewConsultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState(1); // 1: Recording, 2: Review/Edit
  const [transcription, setTranscription] = useState("");
  const [patientName, setPatientName] = useState("");
  const [aiRating, setAiRating] = useState<number | null>(null);
  
  // Mock transcription effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      const phrases = [
        "Bom dia, doutor. ",
        "Sinto uma dor de cabeça forte há 3 dias. ",
        "A dor é pulsante e piora com a luz. ",
        "Não tive febre, mas sinto um pouco de enjoo. ",
        "Já tomei paracetamol mas não resolveu muito. "
      ];
      let i = 0;
      interval = setInterval(() => {
        if (i < phrases.length) {
          setTranscription(prev => prev + phrases[i]);
          i++;
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStopRecording = () => {
    setIsRecording(false);
    setStep(2);
    showSuccess("Transcrição concluída com sucesso!");
  };

  const [anamnesis, setAnamnesis] = useState({
    queixa: "Cefaleia intensa há 3 dias.",
    hda: "Paciente relata dor de cabeça de caráter pulsátil, iniciada há 72 horas. Refere fotofobia e náuseas associadas. Nega episódios febris. Relata uso prévio de paracetamol sem melhora significativa do quadro.",
    antecedentes: "Hipertensão arterial sistêmica controlada.",
    habitos: "Sedentário, nega tabagismo.",
    medicacoes: "Losartana 50mg/dia.",
    hipoteses: "1. Enxaqueca sem aura. 2. Cefaleia tensional."
  });

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ChevronLeft />
          </Button>
          <h2 className="text-2xl font-bold text-[#2d3154]">Nova Consulta</h2>
        </header>

        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm overflow-hidden">
                <div className="bg-primary/10 p-4 flex items-center justify-between border-b border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", isRecording ? "bg-red-500 animate-pulse" : "bg-gray-300")} />
                    <span className="text-sm font-medium">{isRecording ? "Gravando..." : "Pronto para gravar"}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">00:45 / 15:00</span>
                </div>
                <CardContent className="p-8 min-h-[400px] flex flex-col">
                  <div className="flex-1 text-lg leading-relaxed text-gray-600 italic">
                    {transcription || "A transcrição aparecerá aqui em tempo real assim que você iniciar a gravação..."}
                  </div>
                  
                  <div className="flex justify-center pt-8">
                    {!isRecording ? (
                      <Button 
                        onClick={() => setIsRecording(true)}
                        className="btn-accent w-20 h-20 rounded-full shadow-xl shadow-orange-200 hover:scale-105 transition-transform"
                      >
                        <Mic size={32} />
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleStopRecording}
                        className="bg-red-500 hover:bg-red-600 text-white w-20 h-20 rounded-full shadow-xl shadow-red-200 hover:scale-105 transition-transform"
                      >
                        <Square size={32} />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Dados do Paciente</h3>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name" 
                      placeholder="Ex: Maria Oliveira" 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF (Opcional)</Label>
                    <Input id="cpf" placeholder="000.000.000-00" className="rounded-xl" />
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <AlertCircle className="text-blue-500 shrink-0" />
                <p className="text-sm text-blue-700">
                  Certifique-se de que o paciente deu consentimento para a gravação conforme as normas da LGPD.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#2d3154]">Anamnese Estruturada</h3>
                    <Button variant="outline" className="gap-2 rounded-xl border-primary text-primary-foreground">
                      <Wand2 size={16} />
                      Regerar com IA
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-accent font-bold uppercase text-xs tracking-wider">Queixa Principal</Label>
                      <Textarea 
                        value={anamnesis.queixa} 
                        onChange={(e) => setAnamnesis({...anamnesis, queixa: e.target.value})}
                        className="min-h-[60px] rounded-xl border-gray-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-accent font-bold uppercase text-xs tracking-wider">História da Doença Atual (HDA)</Label>
                      <Textarea 
                        value={anamnesis.hda} 
                        onChange={(e) => setAnamnesis({...anamnesis, hda: e.target.value})}
                        className="min-h-[120px] rounded-xl border-gray-200 focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-xs tracking-wider">Antecedentes</Label>
                        <Textarea 
                          value={anamnesis.antecedentes} 
                          onChange={(e) => setAnamnesis({...anamnesis, antecedentes: e.target.value})}
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-xs tracking-wider">Hábitos de Vida</Label>
                        <Textarea 
                          value={anamnesis.habitos} 
                          onChange={(e) => setAnamnesis({...anamnesis, habitos: e.target.value})}
                          className="min-h-[80px] rounded-xl border-gray-200 focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-accent font-bold uppercase text-xs tracking-wider">Medicações em Uso</Label>
                      <Textarea 
                        value={anamnesis.medicacoes} 
                        onChange={(e) => setAnamnesis({...anamnesis, medicacoes: e.target.value})}
                        className="min-h-[60px] rounded-xl border-gray-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-accent font-bold uppercase text-xs tracking-wider">Hipóteses Diagnósticas</Label>
                      <Textarea 
                        value={anamnesis.hipoteses} 
                        onChange={(e) => setAnamnesis({...anamnesis, hipoteses: e.target.value})}
                        className="min-h-[80px] rounded-xl border-gray-200 focus:border-primary"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-[#fb9262]/5 border border-[#fb9262]/20">
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={20} />
                    Resumo Clínico
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Paciente do sexo feminino, com histórico de HAS, apresenta quadro de cefaleia pulsátil há 3 dias, associada a fotofobia e náuseas. Sem melhora com analgésicos comuns. Hipótese principal de enxaqueca.
                  </p>
                  <div className="pt-4 space-y-3">
                    <Button className="w-full btn-accent gap-2 rounded-xl h-12">
                      <Save size={18} />
                      Finalizar e Salvar
                    </Button>
                    <Button variant="outline" className="w-full gap-2 rounded-xl h-12 border-gray-300">
                      <FileDown size={18} />
                      Exportar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider">Avaliar Precisão da IA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-muted-foreground">Seu feedback ajuda a melhorar a qualidade das anamneses geradas.</p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={cn("rounded-full w-12 h-12", aiRating === 1 && "bg-green-100 border-green-500 text-green-600")}
                      onClick={() => setAiRating(1)}
                    >
                      <ThumbsUp size={20} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={cn("rounded-full w-12 h-12", aiRating === 0 && "bg-red-100 border-red-500 text-red-600")}
                      onClick={() => setAiRating(0)}
                    >
                      <ThumbsDown size={20} />
                    </Button>
                  </div>
                  {aiRating !== null && (
                    <Textarea 
                      placeholder="O que poderia ser melhor? (Opcional)" 
                      className="text-xs rounded-xl min-h-[60px]"
                    />
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-sm font-semibold mb-4">Transcrição Original</h4>
                  <div className="text-xs text-muted-foreground max-h-[200px] overflow-y-auto p-3 bg-gray-50 rounded-lg">
                    {transcription}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewConsultation;