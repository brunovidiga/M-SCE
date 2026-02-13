"use client";

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut, 
  Stethoscope,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

const SidebarContent = ({ pathname, onItemClick }: { pathname: string, onItemClick?: () => void }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center gap-3 mb-10 px-2">
      <div className="bg-[#fb9262] p-2 rounded-lg shadow-lg shadow-orange-200">
        <Stethoscope className="text-white" size={24} />
      </div>
      <h1 className="font-bold text-xl tracking-tight text-[#2d3154]">M-SCE</h1>
    </div>

    <nav className="flex-1 space-y-2">
      <SidebarItem 
        icon={LayoutDashboard} 
        label="Dashboard" 
        href="/" 
        active={pathname === '/'} 
        onClick={onItemClick}
      />
      <SidebarItem 
        icon={PlusCircle} 
        label="Nova Consulta" 
        href="/nova-consulta" 
        active={pathname === '/nova-consulta'} 
        onClick={onItemClick}
      />
      <SidebarItem 
        icon={History} 
        label="Histórico" 
        href="/historico" 
        active={pathname === '/historico'} 
        onClick={onItemClick}
      />
      <SidebarItem 
        icon={Settings} 
        label="Configurações" 
        href="/configuracoes" 
        active={pathname === '/configuracoes'} 
        onClick={onItemClick}
      />
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#e8e5e9]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-lg border-r border-white/20 p-6 flex flex-col hidden md:flex">
        <SidebarContent pathname={location.pathname} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#fb9262] p-1.5 rounded-lg">
            <Stethoscope className="text-white" size={18} />
          </div>
          <span className="font-bold text-lg text-[#2d3154]">M-SCE</span>
        </div>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;