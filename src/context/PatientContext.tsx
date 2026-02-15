"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Prescription {
  id: number;
  date: string;
  medications: { name: string; instructions: string }[];
}

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
  prescriptions?: Prescription[];
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: number, data: Partial<Patient>) => void;
  deletePatient: (id: number) => void;
  getPatientById: (id: number) => Patient | undefined;
  addPrescription: (patientId: number, prescription: Prescription) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const initialPatients: Patient[] = [
  { 
    id: 1, 
    name: "Maria Oliveira", 
    cpf: "123.456.789-00", 
    lastVisit: "24/05/2024", 
    phone: "5511987654321", 
    gender: "Feminino", 
    bloodType: "O+", 
    allergies: ["Dipirona", "Penicilina"], 
    medications: ["Losartana 50mg", "Metformina 850mg"],
    prescriptions: [
      {
        id: 101,
        date: "24/05/2024",
        medications: [
          { name: "Sumatriptana 50mg", instructions: "Tomar 1 comprimido se houver crise." }
        ]
      }
    ]
  },
  { id: 2, name: "João Santos", cpf: "234.567.890-11", lastVisit: "24/05/2024", phone: "5511912345678", gender: "Masculino" },
];

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('msce_patients');
      return saved ? JSON.parse(saved) : initialPatients;
    }
    return initialPatients;
  });

  // Sincroniza com localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem('msce_patients', JSON.stringify(patients));
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

  const addPrescription = (patientId: number, prescription: Prescription) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          prescriptions: [prescription, ...(p.prescriptions || [])]
        };
      }
      return p;
    }));
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatientById, addPrescription }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error('usePatients must be used within a PatientProvider');
  return context;
};