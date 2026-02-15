"use client";

import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Pill, 
  Activity,
  Plus,
  Download,
  TrendingUp,
  Clock,
  FileSearch,
  ImageIcon,
  UserPlus,
  Mic,
  FileDown,
  Upload,
  Eye,
  Edit2,
  Check,
  MessageCircle,
  Printer,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Layout from '@/components/Layout';
import ReferralDialog from '@/components/ReferralDialog';
import ConsultationRecording from '@/components/ConsultationRecording';
import MedicalReportTemplate from '@/components/MedicalReportTemplate';
import PrescriptionDialog from '@/components/PrescriptionDialog';
import { exportPatientToPDF } from '@/utils/exportUtils';
import { usePatients } from '@/context/PatientContext';
import { showSuccess, showError } from '@/utils/toast';

const vitalData = [
  { date: '01/01', pa: 130, glicemia: 110 },
  { date: '15/02', pa: 125, glicemia: 105 },
  { date: '12/03', pa: 140, glicemia: 115 },
  { date: '20/04', pa: 120, glicemia: 98 },
  { date: '24/05', pa: 122, glicemia: 95 },
];

interface Document {
  id: number;
  name: string;
  date: string;
  type: string;
  size: string;
  url?: string;
  fileType?: string;
}

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatientById, updatePatient, addPrescription, updatePrescription, deletePrescription } = usePatients();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  
  const patient = getPatientById(Number(id));

  const [isEditingAllergies, setIsEditingAllergies] = useState(false);
  const [isEditingMeds, setIsEditingMeds] = useState(false);
  const [tempAllergies, setTempAllergies] = useState("");
  const [tempMeds, setTempMeds] = useState("");

  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: 1, 
      name: "Hemograma Completo.pdf", 
      date: "20/05/2024", 
      type: "Laboratório", 
      size: "1.2 MB", 
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileType: "application/pdf"
    },
    { 
      id: 2, 
      name: "Raio-X Tórax.jpg", 
      date: "15/04/2024", 
      type: "Imagem", 
      size: "4.5 MB", 
      url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
      fileType: "image/jpeg"
    },
  ]);

  if (!patient) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-[#2d3154]">Paciente não encontrado</h2>
          <Button onClick={() => navigate('/pacientes')} className="mt-4">Voltar para lista</Button>
        </div>
      </Layout>
    );
  }

  const handleSaveAllergies = () => {
    const newList = tempAllergies.split(',').map(s => s.trim()).filter(s => s !== "");
    updatePatient(patient.id, { allergies: newList });
    setIsEditingAllergies(false);
    showSuccess("Alergias atualizadas!");
  };

  const handleSaveMeds = () => {
    const newList = tempMeds.split(',').map(s => s.trim()).filter(s => s !== "");
    updatePatient(patient.id, { medications: newList });
    setIsEditingMeds(false);
    showSuccess("Medicamentos atualizados!");
  };

  const handleSavePrescription = (meds: { name: string; instructions: string }[]) => {
    const newPrescription = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      medications: meds
    };
    addPrescription(patient.id, newPrescription);
  };

  const handleUpdatePrescription = (prescriptionId: number, meds: { name: string; instructions: string }[]) => {
    updatePrescription(patient.id, prescriptionId, meds);
  };

  const handleDeletePrescription = (prescriptionId: number) => {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
      deletePrescription(patient.id, prescriptionId);
      showSuccess("Receita excluída com sucesso.");
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportPatientToPDF('medical-report-template', `Relatorio_${patient.name.replace(' ', '_')}`);
      showSuccess("Relatório PDF gerado com sucesso!");
    } catch (error) {
      showError("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = (doc: Document) => {
    if (!doc.url) return;
    const link = document.createElement('a');
    link.href = doc.url;
    link.setAttribute('download', doc.name);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess(`Download iniciado: ${doc.name}`);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newDoc: Document = {
        id: Date.now(),
        name: file.name,
        date: new Date().toLocaleDateString('pt-BR'),
        type: file.type.includes('image') ? "Imagem" : "Documento",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: fileUrl,
        fileType: file.type
      };
      setDocuments([newDoc, ...documents]);
      showSuccess("Exame enviado com sucesso!");
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />

        <MedicalReportTemplate id="medical-report-template" patient={{...patient, medications: patient.medications || []}} />

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/pacientes')} className="rounded-full">
              <ChevronLeft />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-[#2d3154]">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">{patient.birth ? `${patient.birth} • ` : ''}{patient.gender || 'Gênero não informado'} • CPF: {patient.cpf}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ReferralDialog>
              <Button variant="outline" className="rounded-xl gap-2 bg-white border-none shadow-sm">
                <UserPlus size={18} />
                Encaminhar
              </Button>
            </ReferralDialog>
            <Button 
              variant="outline" 
              className="rounded-xl gap-2 bg-white border-none shadow-sm"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              <FileDown size={18} className={isExporting ? "animate-bounce" : ""} />
              {isExporting ? "Gerando..." : "Exportar PDF"}
            </Button>
            <Button className="btn-accent rounded-xl gap-2 shadow-lg shadow-orange-100" onClick={() => navigate('/nova-consulta')}>
              <Plus size={18} />
              Nova Consulta
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-red-50 border-l-4 border-l-red-500 relative group">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-red-700 uppercase tracking-wider">
                  <AlertTriangle size={14} />
                  ALERGIAS
                </CardTitle>
                {!isEditingAllergies ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setTempAllergies(patient.allergies?.join(', ') || "");
                      setIsEditingAllergies(true);
                    }}
                  >
                    <Edit2 size={12} />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full text-green-600"
                    onClick={handleSaveAllergies}
                  >
                    <Check size={12} />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditingAllergies ? (
                  <Textarea 
                    className="text-xs min-h-[60px] bg-white border-red-200"
                    value={tempAllergies}
                    onChange={(e) => setTempAllergies(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies?.length ? patient.allergies.map((allergy, i) => (
                      <Badge key={i} variant="destructive" className="rounded-lg text-[10px]">{allergy}</Badge>
                    )) : <span className="text-xs text-muted-foreground">Nenhuma alergia registrada</span>}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm relative group">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-[#2d3154] uppercase tracking-wider">
                  <Pill size={14} className="text-accent" />
                  MEDICAMENTOS ATIVOS
                </CardTitle>
                {!isEditingMeds ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setTempMeds(patient.medications?.join(', ') || "");
                      setIsEditingMeds(true);
                    }}
                  >
                    <Edit2 size={12} />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full text-green-600"
                    onClick={handleSaveMeds}
                  >
                    <Check size={12} />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-2">
                {isEditingMeds ? (
                  <Textarea 
                    className="text-xs min-h-[80px] bg-gray-50"
                    value={tempMeds}
                    onChange={(e) => setTempMeds(e.target.value)}
                    autoFocus
                  />
                ) : (
                  patient.medications?.length ? patient.medications.map((med, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {med}
                    </div>
                  )) : <span className="text-xs text-muted-foreground">Nenhum medicamento registrado</span>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-primary-foreground uppercase tracking-wider">
                  <Activity size={14} />
                  ÚLTIMOS VITAIS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">P.A.</span>
                  <span className="text-sm font-bold">122/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Glicemia</span>
                  <span className="text-sm font-bold">95 mg/dL</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="evolution" className="w-full">
              <TabsList className="grid w-full grid-cols-5 rounded-2xl bg-white/50 backdrop-blur-md p-1 shadow-sm">
                <TabsTrigger value="evolution" className="rounded-xl">Evolução</TabsTrigger>
                <TabsTrigger value="prescriptions" className="rounded-xl gap-2">
                  <Pill size={14} />
                  Receitas
                </TabsTrigger>
                <TabsTrigger value="recordings" className="rounded-xl gap-2">
                  <Mic size={14} />
                  Consultas
                </TabsTrigger>
                <TabsTrigger value="timeline" className="rounded-xl">Histórico</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-xl">Exames</TabsTrigger>
              </TabsList>

              <TabsContent value="evolution" className="space-y-6 pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <TrendingUp size={20} className="text-accent" />
                      Evolução Clínica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vitalData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="pa" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                        <Line type="monotone" dataKey="glicemia" stroke="#fb9262" strokeWidth={3} dot={{ r: 4, fill: '#fb9262' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions" className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#2d3154]">Histórico de Receitas</h3>
                  <PrescriptionDialog 
                    patientName={patient.name} 
                    patientPhone={patient.phone}
                    onSave={handleSavePrescription}
                  >
                    <Button className="btn-accent rounded-xl gap-2">
                      <Plus size={18} />
                      Nova Receita
                    </Button>
                  </PrescriptionDialog>
                </div>

                <div className="space-y-3">
                  {patient.prescriptions?.length ? patient.prescriptions.map((presc) => (
                    <Card key={presc.id} className="border-none shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Receita Médica - {presc.date}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {presc.medications.length} medicamento(s) prescrito(s)
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <PrescriptionDialog 
                            patientName={patient.name} 
                            patientPhone={patient.phone}
                            initialMeds={presc.medications}
                            onSave={(meds) => handleUpdatePrescription(presc.id, meds)}
                            title="Editar Receita"
                          >
                            <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground hover:bg-primary/10">
                              <Edit2 size={18} />
                            </Button>
                          </PrescriptionDialog>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full text-green-600 hover:bg-green-50"
                            onClick={() => {
                              const text = `*Receita Médica - M-SCE*\n\n*Paciente:* ${patient.name}\n*Data:* ${presc.date}\n\n*Medicações:*\n${presc.medications.map(m => `- ${m.name}: ${m.instructions}`).join('\n')}`;
                              window.open(`https://wa.me/${patient.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                          >
                            <MessageCircle size={18} />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full text-red-500 hover:bg-red-50"
                            onClick={() => handleDeletePrescription(presc.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <Pill size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-muted-foreground">Nenhuma receita emitida ainda.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recordings" className="pt-4">
                <ConsultationRecording />
              </TabsContent>

              <TabsContent value="timeline" className="pt-4">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Clock size={20} className="text-primary-foreground" />
                      Histórico de Consultas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    Nenhuma consulta anterior registrada para este paciente.
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <Card 
                      key={doc.id} 
                      className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {doc.type === "Imagem" ? <ImageIcon size={24} /> : <FileSearch size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[#2d3154] truncate">{doc.name}</p>
                          <p className="text-[10px] text-muted-foreground">{doc.date} • {doc.type} • {doc.size}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary-foreground" onClick={(e) => { e.stopPropagation(); setSelectedDoc(doc); }}>
                            <Eye size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary-foreground" onClick={(e) => { e.stopPropagation(); handleDownload(doc); }}>
                            <Download size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button 
                    variant="outline" 
                    className="h-auto py-8 border-dashed border-2 rounded-2xl flex-col gap-2 text-muted-foreground hover:text-primary hover:border-primary bg-white"
                    onClick={handleUploadClick}
                  >
                    <Upload size={24} />
                    <span className="text-xs font-bold">Upload de Novo Exame</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
          <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden rounded-3xl border-none">
            <DialogHeader className="p-6 bg-white border-b flex flex-row items-center justify-between space-y-0">
              <DialogTitle className="text-xl font-bold text-[#2d3154] flex items-center gap-2">
                {selectedDoc?.type === "Imagem" ? <ImageIcon className="text-accent" /> : <FileSearch className="text-accent" />}
                {selectedDoc?.name}
              </DialogTitle>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => selectedDoc && handleDownload(selectedDoc)}>
                <Download size={16} />
                Baixar
              </Button>
            </DialogHeader>
            <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 min-h-[60vh] overflow-auto">
              {selectedDoc?.url && (
                selectedDoc.fileType?.includes('pdf') ? (
                  <embed src={selectedDoc.url} type="application/pdf" className="w-full h-[75vh] rounded-lg shadow-lg bg-white" />
                ) : (
                  <img src={selectedDoc.url} alt={selectedDoc.name} className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
                )
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PatientDetail;