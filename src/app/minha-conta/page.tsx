"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { OrdersTab } from "./components/OrdersTab";
import { FavoritesTab } from "./components/FavoritesTab";
import { ProfileTab } from "./components/ProfileTab";
import { AddressesTab } from "./components/AddressesTab";
import { OrderDetails } from "./components/OrderDetails";

export type TabType = "pedidos" | "favoritos" | "perfil" | "enderecos" | "pedido-detalhe";

export default function MinhaContaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pedidos");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">Carregando...</div>;
  }

  const navigateToOrder = (order: any) => {
    setSelectedOrder(order);
    setActiveTab("pedido-detalhe");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "pedidos":
        return <OrdersTab onOrderClick={navigateToOrder} />;
      case "pedido-detalhe":
        return <OrderDetails order={selectedOrder} onBack={() => setActiveTab("pedidos")} />;
      case "favoritos":
        return <FavoritesTab />;
      case "perfil":
        return <ProfileTab />;
      case "enderecos":
        return <AddressesTab />;
      default:
        return <OrdersTab onOrderClick={navigateToOrder} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header da Página */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-fraunces text-[32px] md:text-[40px] font-semibold text-preto">
            Minha Conta
          </h1>
          <p className="mt-2 font-work text-[15px] text-cafe/70">
            Bem-vindo de volta, {(user.nome || "Cliente").split(" ")[0]}.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <Sidebar activeTab={activeTab === "pedido-detalhe" ? "pedidos" : activeTab} onChangeTab={setActiveTab} />
          </div>

          {/* Área de Conteúdo (Painéis) */}
          <div className="flex-1 min-w-0">
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
