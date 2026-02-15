"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut, 
  Menu,
  Users,
  Wifi,
  WifiOff,
  Calendar as CalendarIcon,
  BarChart3,
  Search,
  Bell,
  Video,
  Calculator,
  User,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const patients = [
  { id: 1, name: "Maria Oliveira", cpf: "123.456.789-00" },
  { id: 2, name: "João Santos", cpf: "234.567.890-11" },
  { id: 3, name: "Ana Costa", cpf: "345.678.901-22" },
  { id: 4, name: "Pedro Rocha", cpf: "456.789.012-33" },
  { id: 5, name: "Carla Mendes", cpf: "567.890.123-44" },
];

const SidebarItem = ({ icon: Icon, label, href, active, onClick }: { icon: any, label: string, href: string, active: boolean, onClick?: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-primary text-primary-foreground shadow-sm" 
        : "text-muted-foreground hover:bg-white hover:text-foreground"
    )}
  >
    <Icon size={20} className={cn(active ? "text-primary-foreground" : "group-hover:text-accent")} />
    <span className="font-medium">{label}</span>
  </Link>
);

const SidebarContent = ({ pathname, onItemClick }: { pathname: string, onItemClick?: () => void }) => {
  const [isOnline] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10 px-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-accent rounded-lg text-white">
            <BrainCircuit size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-[#4a4a4a]">M-SCE</span>
        </Link>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
          isOnline ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        )}>
          {isOnline ? <Wifi size={10} /> : <WifiOff size={10} />}
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" active={pathname === '/'} onClick={onItemClick} />
        <SidebarItem icon={CalendarIcon} label="Agenda" href="/agenda" active={pathname === '/agenda'} onClick={onItemClick} />
        <SidebarItem icon={Video} label="Telemedicina" href="/telemedicina" active={pathname === '/telemedicina'} onClick={onItemClick} />
        <SidebarItem icon={PlusCircle} label="Nova Consulta" href="/nova-consulta" active={pathname === '/nova-consulta'} onClick={onItemClick} />
        <SidebarItem icon={Users} label="Pacientes" href="/pacientes" active={pathname === '/pacientes'} onClick={onItemClick} />
        <SidebarItem icon={History} label="Histórico" href="/historico" active={pathname === '/historico'} onClick={onItemClick} />
        <SidebarItem icon={Calculator} label="Calculadoras" href="/calculadoras" active={pathname === '/calculadoras'} onClick={onItemClick} />
        <SidebarItem icon={BarChart3} label="Relatórios" href="/relatorios" active={pathname === '/relatorios'} onClick={onItemClick} />
        <SidebarItem icon={Settings} label="Configurações" href="/configuracoes" active={pathname === '/configuracoes'} onClick={onItemClick} />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-200/50">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            DR
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Dr. Ricardo Silva</p>
            <p className="text-xs text-muted-foreground truncate">CRM: 123456-SP</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof patients>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.cpf.includes(searchQuery)
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPatient = (id: number) => {
    navigate(`/pacientes/${id}`);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="flex min-h-screen bg-[#e8e5e9]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-lg border-r border-white/20 p-6 flex flex-col hidden md:flex fixed h-full z-50">
        <SidebarContent pathname={location.pathname} />
      </aside>

      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-6">
                  <SidebarContent pathname={location.pathname} onItemClick={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="relative w-full hidden sm:block" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Busca global (Paciente, CPF, CID...)" 
                className="pl-10 h-10 bg-gray-100/50 border-none rounded-xl focus-visible:ring-primary w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
              />
              
              {showResults && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="p-2">
                    {searchResults.length > 0 ? (
                      searchResults.map((patient) => (
                        <button
                          key={patient.id}
                          onClick={() => handleSelectPatient(patient.id)}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary-foreground">
                              <User size={16} />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-bold text-[#2d3154]">{patient.name}</p>
                              <p className="text-[10px] text-muted-foreground">CPF: {patient.cpf}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">Nenhum paciente encontrado.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </Button>
            <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold text-[#2d3154]">Dr. Ricardo Silva</p>
                <p className="text-[10px] text-muted-foreground">Disponível</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                RS
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;