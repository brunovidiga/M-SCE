import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PatientProvider } from "./context/PatientContext";
import Dashboard from "./pages/Dashboard";
import NewConsultation from "./pages/NewConsultation";
import History from "./pages/History";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Agenda from "./pages/Agenda";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";
import Telemedicine from "./pages/Telemedicine";
import Calculators from "./pages/Calculators";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import ClinicalCopilot from "./components/ClinicalCopilot";
import CommandMenu from "./components/CommandMenu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PatientProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/M-SCE">
          <CommandMenu />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/telemedicina" element={<Telemedicine />} />
            <Route path="/nova-consulta" element={<NewConsultation />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/pacientes/:id" element={<PatientDetail />} />
            <Route path="/historico" element={<History />} />
            <Route path="/calculadoras" element={<Calculators />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/planos" element={<Plans />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ClinicalCopilot />
        </BrowserRouter>
      </TooltipProvider>
    </PatientProvider>
  </QueryClientProvider>
);

export default App;
