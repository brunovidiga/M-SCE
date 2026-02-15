"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
        </div>

        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
          {!isSubmitted ? (
            <>
              <CardHeader className="space-y-1 pt-8 px-8">
                <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
                <CardDescription>Informe seu e-mail para receber as instruções de redefinição.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail cadastrado</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input id="email" type="email" placeholder="medico@exemplo.com" className="pl-10 h-12 rounded-xl border-gray-200" required />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-accent h-12 rounded-xl text-lg font-semibold">
                    Enviar Instruções
                  </Button>

                  <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ArrowLeft size={16} />
                    Voltar para o Login
                  </Link>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 size={48} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#2d3154]">E-mail Enviado!</h2>
                <p className="text-muted-foreground">
                  Se o e-mail informado estiver cadastrado, você receberá um link para criar uma nova senha em instantes.
                </p>
              </div>
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200">
                  Voltar para o Login
                </Button>
              </Link>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;