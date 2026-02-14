"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Patient {
  id: number;
  name: string;
  cpf: string;
  birth?: string;
  gender?: string;
  phone: string;
  email?: string;
  lastVisit: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: number, data: Partial<Patient>) => void;
  deletePatient: (id: number) => void;
  getPatientById: (id: number) => Patient | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const initialPatients: Patient[] = [
  { id: 1, name: "Maria Oliveira", cpf: "123.456.789-00", lastVisit: "24/05/2024", phone: "(11) 98765-4321", gender: "Feminino", bloodType: "O+", allergies: ["Dipirona", "Penicilina"], medications: ["Losartana 50mg", "Metformina 850mg"] },
  { id: 2, name: "João Santos", cpf: "234.567.890-11", lastVisit: "24/05/2024", phone: "(11) 91234-5678", gender: "Masculino" },
  { id: 3, name: "Ana Costa", cpf: "345.678.901-22", lastVisit: "23/05/2024", phone: "(11) 97654-3210", gender: "Feminino" },
  { id: 4, name: "Pedro Rocha", cpf: "456.789.012-33", lastVisit: "22/05/2024", phone: "(11) 98888-7777", gender: "Masculino" },
  { id: 5, name: "Carla Mendes", cpf: "567.890.123-44", lastVisit: "21/05/2024", phone: "(11) 99999-0000", gender: "Feminino" },
];

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [patient, ...prev]);
  };

  const updatePatient = (id: number, data: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePatient = (id: number) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const getPatientById = (id: number) => {
    return patients.find(p => p.id === id);
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatientById }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error('usePatients must be used within a PatientProvider');
  return context;
};