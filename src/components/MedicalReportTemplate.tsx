"use client";

import React from 'react';
import { Calendar, User, FileText, Pill, Activity } from 'lucide-react';

interface MedicalReportTemplateProps {
  id: string;
  patient: any;
}

const MedicalReportTemplate = ({ id, patient }: MedicalReportTemplateProps) => {
  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <div 
      id={id} 
      className="bg-white p-12 w-[210mm] min-h-[297mm] text-[#2d3154] font-sans"
      style={{ display: 'none' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-[#fb9262] pb-8 mb-8">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="M-SCE Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#4a4a4a]">M-SCE</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Medical Smart Clinical Explorer</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">Dr. Ricardo Silva</p>
          <p className="text-sm text-muted-foreground">CRM: 123456-SP</p>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>
      </div>

      {/* Patient Info Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-[#fb9262]">
          <User size={20} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Identificação do Paciente</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Nome Completo</p>
            <p className="font-semibold text-lg">{patient.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">CPF</p>
            <p className="font-semibold">{patient.cpf}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Idade / Gênero</p>
            <p className="font-semibold">{patient.age || 'N/A'} • {patient.gender || 'N/A'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Tipo Sanguíneo</p>
            <p className="font-semibold">{patient.bloodType || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Clinical Summary / Anamnesis */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-[#fb9262]">
          <FileText size={20} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Relatório de Anamnese</h2>
        </div>
        <div className="space-y-4 border-l-4 border-gray-100 pl-6">
          <div>
            <h3 className="text-sm font-bold text-muted-foreground mb-1">Resumo da Evolução</h3>
            <p className="leading-relaxed text-gray-700">
              {patient.clinicalSummary || "Paciente apresenta quadro estável com boa adesão ao tratamento proposto."}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-blue-600 uppercase">P.A. Média</p>
              <p className="text-xl font-bold text-blue-800">122/80</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-orange-600 uppercase">Glicemia</p>
              <p className="text-xl font-bold text-orange-800">95 mg/dL</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-[10px] font-bold text-green-600 uppercase">Status</p>
              <p className="text-xl font-bold text-green-800">Estável</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-[#fb9262]">
          <Pill size={20} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Prescrição Vigente</h2>
        </div>
        <div className="space-y-3">
          {patient.medications && patient.medications.length > 0 ? patient.medications.map((med: string, i: number) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#fb9262]" />
                <span className="font-bold">{med}</span>
              </div>
              <span className="text-xs text-muted-foreground italic">Uso contínuo</span>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground italic">Nenhum medicamento registrado.</p>
          )}
        </div>
      </div>

      {/* Footer / Signature */}
      <div className="mt-auto pt-20 text-center">
        <div className="w-64 h-px bg-gray-300 mx-auto mb-2" />
        <p className="font-bold">Dr. Ricardo Silva</p>
        <p className="text-xs text-muted-foreground">Assinado digitalmente via M-SCE</p>
        <div className="mt-12 flex justify-between text-[10px] text-gray-400 uppercase tracking-widest">
          <span>Documento gerado em {today}</span>
          <span>Página 1 de 1</span>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportTemplate;