"use client";

import { TabType } from "../page";
import { Package, Heart, UserCircle, MapPin, SignOut } from "@phosphor-icons/react/dist/ssr";

interface SidebarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

import { useAuth } from "@/contexts/AuthContext";

export function Sidebar({ activeTab, onChangeTab }: SidebarProps) {
  const { logout } = useAuth();
  
  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "pedidos", label: "Meus Pedidos", icon: <Package size={20} /> },
    { id: "favoritos", label: "Favoritos", icon: <Heart size={20} /> },
    { id: "perfil", label: "Meu Perfil", icon: <UserCircle size={20} /> },
    { id: "enderecos", label: "Endereços", icon: <MapPin size={20} /> },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden custom-scroll pb-4 md:pb-0">
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`
              flex items-center gap-3 whitespace-nowrap rounded-[8px] px-4 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.05em] transition-all shrink-0 md:shrink
              ${isActive 
                ? "bg-preto text-white shadow-sm" 
                : "bg-transparent text-cafe/70 border border-transparent hover:bg-black/5 hover:text-preto md:hover:translate-x-1"
              }
            `}
          >
            <span className={isActive ? "text-terracota" : "text-cafe/50"}>
              {item.icon}
            </span>
            {item.label}
          </button>
        );
      })}

      <div className="hidden md:block h-[1px] w-full bg-line/60 my-4" />

      <button
        onClick={logout}
        className="flex items-center gap-3 whitespace-nowrap rounded-[8px] px-4 py-3.5 font-mono text-[13px] font-bold uppercase tracking-[0.05em] transition-all shrink-0 md:shrink bg-transparent text-red-600/80 border border-transparent hover:bg-red-50 hover:text-red-600 md:hover:translate-x-1 mt-auto"
      >
        <span className="text-red-500/80">
          <SignOut size={20} />
        </span>
        Sair da Conta
      </button>
    </nav>
  );
}
