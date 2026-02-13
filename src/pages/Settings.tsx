"use client";

import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Smartphone,
  Globe,
  CreditCard,
  Key,
  Cloud
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <header>
          <h2 className="text-3xl font-bold text-[#2d3154]">Configurações</h2>
          <p className="text-muted-foreground">Gerencie sua conta e preferências do Clinical Explorer.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User size={20} className="text-accent" />
                  Perfil Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input defaultValue="Dr. Ricardo Silva" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>CRM / Registro</Label>
                    <Input defaultValue="123456-SP" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Especialidade Principal</Label>
                  <Input defaultValue="Clínica Geral" className="rounded-xl" />
                </div>
                <Button className="btn-primary rounded-xl">Salvar Alterações</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database size={20} className="text-accent" />
                  Preferências de IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Transcrição em Tempo Real</Label>
                    <p className="text-sm text-muted-foreground">Exibir texto enquanto a consulta é gravada.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-resumo</Label>
                    <p className="text-sm text-muted-foreground">Gerar resumo clínico automaticamente após salvar.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Filtro de Ruído</Label>
                    <p className="text-sm text-muted-foreground">Remover conversas não clínicas automaticamente.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cloud size={20} className="text-accent" />
                  Integrações EHR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">Conecte o M-SCE ao seu sistema de prontuário eletrônico.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
                    <span className="font-medium">Tasy / Philips</span>
                    <Button variant="outline" size="sm" className="rounded-lg">Conectar</Button>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
                    <span className="font-medium">MV Soul</span>
                    <Button variant="outline" size="sm" className="rounded-lg">Conectar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary-foreground">Assinatura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-primary/20">
                  <p className="text-xs text-muted-foreground">Plano Atual</p>
                  <p className="text-lg font-bold text-[#2d3154]">Premium Professional</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Ativo até 12/2024</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl border-primary text-primary-foreground">Gerenciar Plano</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider">Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-sm">
                  <Key size={16} /> Alterar Senha
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-sm">
                  <Smartphone size={16} /> Autenticação 2FA
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-sm text-red-500 hover:text-red-600 hover:bg-red-50">
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;