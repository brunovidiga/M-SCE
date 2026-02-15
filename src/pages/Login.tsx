"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Login = () => {
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
          <p className="text-muted-foreground">Medical Smart Clinical Explorer</p>
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8 px-8">
            <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o painel.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail ou CRM</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="email" placeholder="medico@exemplo.com" className="pl-10 h-12 rounded-xl border-gray-200" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" size="sm" className="text-xs text-accent hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input id="password" type="password" className="pl-10 h-12 rounded-xl border-gray-200" />
                </div>
              </div>
            </div>

            <Link to="/">
              <Button className="w-full btn-accent h-12 rounded-xl text-lg font-semibold gap-2 mt-4">
                Entrar
                <ArrowRight size={20} />
              </Button>
            </Link>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Ou continue com</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200 gap-3">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta? <Link to="/register" className="text-accent font-semibold hover:underline">Cadastre-se agora</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;