"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  Activity, 
  Heart, 
  Droplets,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';

const Calculators = () => {
  const [bmi, setBmi] = useState({ weight: "", height: "", result: null as number | null });
  const [clr, setClr] = useState({ age: "", weight: "", creat: "", gender: "m", result: null as number | null });

  const calcBMI = () => {
    const w = parseFloat(bmi.weight);
    const h = parseFloat(bmi.height) / 100;
    if (w && h) setBmi({ ...bmi, result: parseFloat((w / (h * h)).toFixed(1)) });
  };

  const calcClr = () => {
    const a = parseFloat(clr.age);
    const w = parseFloat(clr.weight);
    const c = parseFloat(clr.creat);
    if (a && w && c) {
      let res = ((140 - a) * w) / (72 * c);
      if (clr.gender === "f") res *= 0.85;
      setClr({ ...clr, result: parseFloat(res.toFixed(1)) });
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h2 className="text-3xl font-bold text-[#2d3154] dark:text-white">Calculadoras Clínicas</h2>
          <p className="text-muted-foreground">Ferramentas de suporte à decisão rápida e precisa.</p>
        </header>

        <Tabs defaultValue="imc" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[600px] rounded-2xl bg-white/50 dark:bg-card/50 p-1 shadow-sm">
            <TabsTrigger value="imc" className="rounded-xl gap-2">
              <Activity size={16} />
              IMC
            </TabsTrigger>
            <TabsTrigger value="clr" className="rounded-xl gap-2">
              <Droplets size={16} />
              Clearance
            </TabsTrigger>
            <TabsTrigger value="cv" className="rounded-xl gap-2">
              <Heart size={16} />
              Risco CV
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TabsContent value="imc" className="m-0">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Índice de Massa Corporal (IMC)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input 
                          type="number" 
                          placeholder="Ex: 70" 
                          value={bmi.weight}
                          onChange={(e) => setBmi({...bmi, weight: e.target.value})}
                          className="rounded-xl h-12" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Altura (cm)</Label>
                        <Input 
                          type="number" 
                          placeholder="Ex: 175" 
                          value={bmi.height}
                          onChange={(e) => setBmi({...bmi, height: e.target.value})}
                          className="rounded-xl h-12" 
                        />
                      </div>
                    </div>
                    <Button onClick={calcBMI} className="btn-accent w-full md:w-auto px-8 rounded-xl h-12">Calcular IMC</Button>
                    
                    {bmi.result && (
                      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 animate-in fade-in slide-in-from-bottom-4">
                        <p className="text-sm text-muted-foreground">Resultado</p>
                        <h3 className="text-4xl font-bold text-primary-foreground">{bmi.result} kg/m²</h3>
                        <p className="text-sm font-medium mt-2 text-primary-foreground">
                          Classificação: {bmi.result < 18.5 ? "Abaixo do peso" : bmi.result < 25 ? "Peso normal" : bmi.result < 30 ? "Sobrepeso" : "Obesidade"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clr" className="m-0">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Clearance de Creatinina (Cockcroft-Gault)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Idade (anos)</Label>
                        <Input type="number" value={clr.age} onChange={(e) => setClr({...clr, age: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Peso (kg)</Label>
                        <Input type="number" value={clr.weight} onChange={(e) => setClr({...clr, weight: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Creatinina Sérica (mg/dL)</Label>
                        <Input type="number" value={clr.creat} onChange={(e) => setClr({...clr, creat: e.target.value})} className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Gênero</Label>
                        <div className="flex gap-2">
                          <Button 
                            variant={clr.gender === 'm' ? 'default' : 'outline'} 
                            className="flex-1 rounded-xl"
                            onClick={() => setClr({...clr, gender: 'm'})}
                          >Masculino</Button>
                          <Button 
                            variant={clr.gender === 'f' ? 'default' : 'outline'} 
                            className="flex-1 rounded-xl"
                            onClick={() => setClr({...clr, gender: 'f'})}
                          >Feminino</Button>
                        </div>
                      </div>
                    </div>
                    <Button onClick={calcClr} className="btn-accent w-full md:w-auto px-8 rounded-xl h-12">Calcular Clearance</Button>
                    
                    {clr.result && (
                      <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                        <p className="text-sm text-muted-foreground">Resultado Estimado</p>
                        <h3 className="text-4xl font-bold text-primary-foreground">{clr.result} mL/min</h3>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cv" className="m-0">
                <Card className="border-none shadow-sm bg-gray-50 dark:bg-white/5 border-dashed border-2">
                  <CardContent className="p-12 text-center space-y-4">
                    <Heart size={48} className="mx-auto text-muted-foreground opacity-20" />
                    <h3 className="text-lg font-bold text-muted-foreground">Escore de Framingham</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Esta calculadora requer dados de perfil lipídico completo. Em breve disponível.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-accent/5 border border-accent/10">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Info size={16} className="text-accent" />
                    Dica Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    O Clearance de Creatinina é fundamental para o ajuste de dose de diversos medicamentos, especialmente antibióticos e anticoagulantes em pacientes idosos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Recentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "IMC - Maria O.", val: "24.2" },
                    { label: "Clr - João S.", val: "85 mL/min" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                      <span className="text-xs font-medium">{item.label}</span>
                      <span className="text-xs font-bold text-accent">{item.val}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Calculators;