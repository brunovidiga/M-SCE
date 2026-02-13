"use client";

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Wand2, 
  Save, 
  FileDown, 
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  VolumeX,
  Lightbulb,
  Stethoscope,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from '@/utils/toast';
import Layout from '@/components/Layout';
import ExportDialog from '@/components/ExportDialog';
import PrescriptionDialog from '@/components/PrescriptionDialog';
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
    exameFisico: "Bom estado geral, acianótica, anictérica. PA: 120/80 mmHg. FC: 72 bpm. Ausculta cardíaca e pulmonar sem alterações. Sem sinais de irritação meníngea.",
    hipoteses: "1. Enxaqueca sem aura. 2. Cefaleia tensional."
  });

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="rounded-full">
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
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#2d3154]">Registro Clínico</h3>
                    <Button variant="outline" className="gap-2 rounded-xl border-primary text-primary-foreground">
                      <Wand2 size={16} />
                      Regerar com IA
                    </Button>
                  </div>

                  <Tabs defaultValue="anamnese" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
                      <TabsTrigger value="anamnese" className="rounded-lg">Anamnese</TabsTrigger>
                      <TabsTrigger value="exame" className="rounded-lg">Exame Físico</TabsTrigger>
                    </TabsList>
                    <TabsContent value="anamnese" className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-[10px] tracking-wider">Queixa Principal</Label>
                        <Textarea value={anamnesis.queixa} className="min-h-[60px] rounded-xl border-gray-100" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-[10px] tracking-wider">História da Doença Atual (HDA)</Label>
                        <Textarea value={anamnesis.hda} className="min-h-[150px] rounded-xl border-gray-100" />
                      </div>
                    </TabsContent>
                    <TabsContent value="exame" className="pt-4">
                      <div className="space-y-2">
                        <Label className="text-accent font-bold uppercase text-[10px] tracking-wider">Descrição do Exame Físico</Label>
                        <Textarea value={anamnesis.exameFisico} className="min-h-[250px] rounded-xl border-gray-100" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-blue-50/50 border border-blue-100">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Lightbulb size={24} />
                    <h3 className="text-lg font-bold">Suporte à Decisão Clínica</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Exames Sugeridos</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Hemograma Completo
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Condutas Recomendadas</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Prescrever Triptanos
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
                    Resumo e Ações
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Paciente com cefaleia pulsátil há 3 dias. Exame físico normal. Hipótese de Enxaqueca.
                  </p>
                  <div className="pt-4 space-y-3">
                    <PrescriptionDialog>
                      <Button className="w-full btn-accent gap-2 rounded-xl h-12 shadow-lg shadow-orange-100">
                        <Pill size={18} />
                        Gerar Prescrição
                      </Button>
                    </PrescriptionDialog>
                    <Button className="w-full btn-primary gap-2 rounded-xl h-12">
                      <Save size={18} />
                      Finalizar Consulta
                    </Button>
                    <ExportDialog>
                      <Button variant="outline" className="w-full gap-2 rounded-xl h-12 border-gray-200 bg-white">
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