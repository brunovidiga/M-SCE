"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, BrainCircuit, ShieldCheck, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showSuccess } from '@/utils/toast';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de cadastro
    setTimeout(() => {
      showSuccess("Conta criada com sucesso! Bem-vindo ao M-SCE.");
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#e8e5e9] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="p-3 bg-accent rounded-2xl text-white shadow-lg shadow-orange-200">
              <BrainCircuit size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-[#4a4a4a] tracking-tighter">M-SCE</h1>
          <p className="text-muted-foreground">Crie sua conta profissional</p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">Cadastrar-se</CardTitle>
            <CardDescription>Preencha seus dados para começar a usar a plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="name" placeholder="Dr. Nome Sobrenome" className="pl-10 h-12 rounded-xl border-gray-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crm">CRM / Registro Profissional</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="crm" placeholder="123456-SP" className="pl-10 h-12 rounded-xl border-gray-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail Profissional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="email" type="email" placeholder="medico@exemplo.com" className="pl-10 h-12 rounded-xl border-gray-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl border-gray-200" required />
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={16} />
                <p className="text-[10px] text-blue-700 leading-tight">
                  Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade em conformidade com a LGPD.
                </p>
              </div>

              <Button type="submit" className="w-full btn-accent h-12 rounded-xl text-lg font-semibold gap-2 mt-2" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar Conta"}
                <ArrowRight size={20} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta? <Link to="/login" className="text-accent font-semibold hover:underline">Fazer Login</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;