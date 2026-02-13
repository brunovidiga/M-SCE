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
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  VolumeX,
  Stethoscope,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { showSuccess } from '@/utils/toast';
import Layout from '@/components/Layout';
import ExportDialog from '@/components/ExportDialog';
import { cn } from '@/lib/utils';

const NewConsultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [step, setStep] = useState(1);
  const [transcription, setTranscription] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [noiseFilter, setNoiseFilter] = useState(true);
  
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

  const handleStartRecording = () => {
    if (!hasConsent) {
      alert("Por favor, confirme o consentimento do paciente antes de iniciar.");
      return;
    }
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setStep(2);
    showSuccess("Transcrição concluída com sucesso!");
  };

  const [anamnesis, setAnamnesis] = useState({
    queixa: "Cefaleia intensa há 3 dias.",
    hda: "Paciente relata dor de cabeça de caráter pulsátil, iniciada há 72 horas. Refere fotofobia e náuseas associadas. Nega episódios febris. Relata uso prévio de paracetamol sem melhora significativa do quadro.",
    antecedentes: "Hipertensão arterial sistemica controlada.",
    habitos: "Sedentário, nega tabagismo.",
    medicacoes: "Losartana 50mg/dia.",
    hipoteses: "1. Enxaqueca sem aura. 2. Cefaleia tensional."
  });

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ChevronLeft />
            </Button>
            <h2 className="text-2xl font-bold text-[#2d3154]">Nova Consulta</h2>
          </div>
          {step === 1 && (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">
              <VolumeX size={18} className={noiseFilter ? "text-accent" : "text-gray-300"} />
              <span className="text-xs font-medium text-muted-foreground">Filtro de Ruído IA</span>
              <Switch checked={noiseFilter} onCheckedChange={setNoiseFilter} />
            </div>
          )}
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
                    {transcription || "A transcrição aparecerá aqui em tempo real..."}
                  </div>
                  
                  <div className="flex justify-center pt-8">
                    {!isRecording ? (
                      <Button 
                        onClick={handleStartRecording}
                        disabled={!hasConsent}
                        className={cn(
                          "w-20 h-20 rounded-full shadow-xl transition-all",
                          hasConsent ? "btn-accent shadow-orange-200 hover:scale-105" : "bg-gray-200 cursor-not-allowed"
                        )}
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
                  <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10 mt-4">
                    <ShieldCheck className="text-accent shrink-0" size={20} />
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[#2d3154]">Consentimento LGPD</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">
                        O paciente autoriza a gravação e processamento dos dados clínicos por IA.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Switch checked={hasConsent} onCheckedChange={setHasConsent} />
                        <span className="text-[10px] font-bold uppercase">Confirmado</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                      <Textarea value={anamnesis.queixa} className="min-h-[60px] rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-accent font-bold uppercase text-xs tracking-wider">História da Doença Atual (HDA)</Label>
                      <Textarea value={anamnesis.hda} className="min-h-[120px] rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-xs tracking-wider">Antecedentes</Label>
                        <Textarea value={anamnesis.antecedentes} className="min-h-[80px] rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-xs tracking-wider">Hábitos de Vida</Label>
                        <Textarea value={anamnesis.habitos} className="min-h-[80px] rounded-xl" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suporte à Decisão Clínica (CDS) */}
              <Card className="border-none shadow-sm bg-blue-50/50 border border-blue-100">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Lightbulb size={24} />
                    <h3 className="text-lg font-bold">Suporte à Decisão Clínica (IA)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Exames Sugeridos</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Hemograma Completo
                        </li>
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Tomografia de Crânio (se sinais de alerta)
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Condutas Recomendadas</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Prescrever Triptanos para crise aguda
                        </li>
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Orientar diário de cefaleia
                        </li>
                      </ul>
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
                    Paciente do sexo feminino, com histórico de HAS, apresenta quadro de cefaleia pulsátil há 3 dias...
                  </p>
                  <div className="pt-4 space-y-3">
                    <Button className="w-full btn-accent gap-2 rounded-xl h-12">
                      <Save size={18} />
                      Finalizar e Salvar
                    </Button>
                    <ExportDialog>
                      <Button variant="outline" className="w-full gap-2 rounded-xl h-12 border-gray-300">
                        <FileDown size={18} />
                        Exportar Documento
                      </Button>
                    </ExportDialog>
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