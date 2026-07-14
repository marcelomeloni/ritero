"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { OrderSummary } from "./components/OrderSummary";
import { ContactStep } from "./components/ContactStep";
import { ShippingStep } from "./components/ShippingStep";
import { PaymentStep } from "./components/PaymentStep";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, removeCoupon } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingOption, setShippingOption] = useState<{ name: string; prazo: number } | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/checkout");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Limpa o cupom sempre que a página de checkout é carregada
    removeCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-terracota" />
      </div>
    );
  }

  if (!user) return null; // Evita piscar tela antes de redirecionar

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="font-fraunces text-[32px] font-bold text-preto">Sua sacola está vazia</h2>
        <p className="mt-2 font-work text-[16px] text-cafe/80">Adicione alguns cafés para prosseguir.</p>
        <Link 
          href="/cafes" 
          className="mt-8 rounded-full bg-preto px-8 py-4 font-mono text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-transform hover:scale-[1.02]"
        >
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-10 md:py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
        
        {/* Coluna Esquerda: Formulários de Preenchimento */}
        <div className="flex flex-col gap-10 lg:gap-12 pb-24 lg:pb-0">
          <ContactStep />
          <ShippingStep setShippingCost={setShippingCost} setAddressId={setAddressId} setShippingOption={setShippingOption} />
          <PaymentStep addressId={addressId} shippingCost={shippingCost} shippingOption={shippingOption} />
        </div>

        {/* Coluna Direita: Resumo do Pedido (Sticky) */}
        <div className="relative order-first lg:order-last mb-8 lg:mb-0">
          <div className="sticky top-8">
            <OrderSummary shippingCost={shippingCost} shippingOption={shippingOption} />
          </div>
        </div>

      </div>
    </div>
  );
}
