"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Phone, 
  Mail,
  Calendar,
  ArrowRight,
  Filter,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Layout from '@/components/Layout';
import NewPatientDialog from '@/components/NewPatientDialog';
import { showSuccess } from '@/utils/toast';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientToDelete, setPatientToDelete] = useState<any>(null);
  const navigate = useNavigate();

  const [patients, setPatients] = useState([
    { id: 1, name: "Maria Oliveira", cpf: "123.456.789-00", lastVisit: "24/05/2024", phone: "(11) 98765-4321" },
    { id: 2, name: "João Santos", cpf: "234.567.890-11", lastVisit: "24/05/2024", phone: "(11) 91234-5678" },
    { id: 3, name: "Ana Costa", cpf: "345.678.901-22", lastVisit: "23/05/2024", phone: "(11) 97654-3210" },
    { id: 4, name: "Pedro Rocha", cpf: "456.789.012-33", lastVisit: "22/05/2024", phone: "(11) 98888-7777" },
    { id: 5, name: "Carla Mendes", cpf: "567.890.123-44", lastVisit: "21/05/2024", phone: "(11) 99999-0000" },
  ]);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.cpf.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: any) => {
    setPatients([newPatient, ...patients]);
  };

  const handleDeleteConfirm = () => {
    if (patientToDelete) {
      setPatients(patients.filter(p => p.id !== patientToDelete.id));
      showSuccess(`Paciente ${patientToDelete.name} excluído com sucesso.`);
      setPatientToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#2d3154]">Pacientes</h2>
            <p className="text-muted-foreground">Gerencie o cadastro e histórico de seus pacientes.</p>
          </div>
          <NewPatientDialog onSave={handleAddPatient}>
            <Button className="btn-accent gap-2 rounded-xl h-12 shadow-lg shadow-orange-100">
              <UserPlus size={20} />
              Novo Paciente
            </Button>
          </NewPatientDialog>
        </header>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Buscar por nome ou CPF..." 
              className="pl-12 h-14 rounded-2xl border-none shadow-sm bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-2xl bg-white border-none shadow-sm gap-2">
            <Filter size={20} />
            Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {patient.name[0]}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem onClick={() => navigate(`/pacientes/${patient.id}`)}>Ver Prontuário</DropdownMenuItem>
                        <DropdownMenuItem>Editar Cadastro</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500 focus:bg-red-50"
                          onClick={() => setPatientToDelete(patient)}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg text-[#2d3154]">{patient.name}</h4>
                    <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
                  </div>

                  <div className="pt-4 space-y-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-accent" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-accent" />
                      Última consulta: {patient.lastVisit}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-50">
                  <Button 
                    variant="ghost" 
                    className="flex-1 rounded-none h-12 text-accent font-semibold hover:bg-accent/5 border-r border-gray-50"
                    onClick={() => navigate('/nova-consulta')}
                  >
                    Nova Consulta
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1 rounded-none h-12 text-primary-foreground font-semibold hover:bg-primary/5"
                    onClick={() => navigate(`/pacientes/${patient.id}`)}
                  >
                    Prontuário
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={!!patientToDelete} onOpenChange={(open) => !open && setPatientToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-[#2d3154]">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o paciente <strong>{patientToDelete?.name}</strong>? Esta ação não pode ser desfeita e todos os dados do prontuário serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
              onClick={handleDeleteConfirm}
            >
              Confirmar Exclusão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Patients;