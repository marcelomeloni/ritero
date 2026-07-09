"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { useState } from "react";

interface OrderSummaryProps {
  shippingCost: number | null;
}

export function OrderSummary({ shippingCost }: OrderSummaryProps) {
  const { items, totalPrice, updateQuantity, coupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const discount = coupon 
    ? ((coupon.tipo === "PERCENTUAL" || (coupon.tipo as string) === "porcentagem") ? totalPrice * (coupon.valor / 100) : coupon.valor)
    : 0;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    setIsApplying(true);
    setCouponError("");
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/cupons/validar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: couponCode.trim() })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        applyCoupon(data.cupom);
        setCouponCode("");
      } else {
        setCouponError(data.error || "Cupom inválido.");
        removeCoupon();
      }
    } catch (err) {
      setCouponError("Erro ao validar cupom.");
    } finally {
      setIsApplying(false);
    }
  };

  const finalTotal = totalPrice + (shippingCost || 0) - discount;

  return (
    <div className="rounded-[12px] bg-creme-light p-6 shadow-sm border border-line/60 lg:p-8">
      <h2 className="font-fraunces text-[20px] font-semibold text-preto">Resumo do Pedido</h2>

      {/* Lista de Itens */}
      <div className="mt-6 flex max-h-[300px] flex-col gap-5 overflow-y-auto overflow-x-hidden custom-scroll pr-2 pt-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div 
              className="relative flex h-[76px] w-[60px] shrink-0 items-center justify-center rounded-[8px] border border-line/40 mt-0.5"
              style={{ backgroundColor: item.cor }}
            >
              <Image src={item.imagem} alt={item.notas} fill className="object-contain p-2.5 drop-shadow-sm" />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-preto px-1.5 font-mono text-[9px] font-bold text-white ring-2 ring-creme-light">
                {item.quantidade}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-cafe/60">
                {item.nome}
              </span>
              <span className="mt-1 font-fraunces text-[14px] font-bold leading-tight text-preto line-clamp-2 pr-2">
                {item.notas}
              </span>
            </div>
            
            <div className="flex flex-col items-end gap-2 mt-1 shrink-0">
              <span className="font-mono text-[13px] font-bold text-terracota">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco * item.quantidade)}
              </span>
              
              <div className="flex items-center justify-between w-[64px] rounded-full border border-line/60 bg-white px-2 py-0.5 mt-1">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantidade - 1)} 
                  className="flex h-5 w-5 items-center justify-center text-cafe/60 hover:text-terracota font-mono text-[14px] transition-colors"
                >
                  -
                </button>
                <span className="font-mono text-[10px] font-bold text-preto pointer-events-none">
                  {item.quantidade}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantidade + 1)} 
                  className="flex h-5 w-5 items-center justify-center text-cafe/60 hover:text-terracota font-mono text-[14px] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Cupom */}
      <div className="mt-8 border-t border-line/60 pt-6">
        <form onSubmit={handleApplyCoupon} className="flex gap-2 relative w-full">
          <input
            type="text"
            placeholder="CÓDIGO DE DESCONTO"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            disabled={isApplying || !!coupon}
            className="flex-1 min-w-0 w-full rounded-[6px] border border-line/80 bg-white px-3 sm:px-4 py-3 font-mono text-[12px] sm:text-[13px] font-bold tracking-[0.1em] uppercase outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10 disabled:opacity-50"
          />
          {!coupon ? (
            <button 
              type="submit"
              disabled={isApplying || !couponCode.trim()}
              className="shrink-0 rounded-[6px] bg-terracota/10 px-4 sm:px-6 font-mono text-[12px] font-bold tracking-[0.05em] uppercase text-terracota transition-all hover:bg-terracota hover:text-white active:scale-95 disabled:opacity-50"
            >
              {isApplying ? "..." : "Aplicar"}
            </button>
          ) : (
            <button 
              type="button"
              onClick={removeCoupon}
              className="shrink-0 rounded-[6px] bg-preto px-4 sm:px-6 font-mono text-[12px] font-bold tracking-[0.05em] uppercase text-white transition-all hover:bg-preto/80 active:scale-95"
            >
              Remover
            </button>
          )}
        </form>
        {coupon && (
          <p className="mt-2 font-mono text-[11px] font-bold tracking-wider text-[#2E7D32] uppercase">
            Cupom {coupon.codigo} aplicado! (-{(coupon.tipo === "PERCENTUAL" || (coupon.tipo as string) === "porcentagem") ? `${coupon.valor}%` : `R$ ${coupon.valor}`})
          </p>
        )}
        {couponError && <p className="mt-2 font-mono text-[11px] font-bold tracking-wider text-[#D32F2F] uppercase">{couponError}</p>}
      </div>

      {/* Totais */}
      <div className="mt-6 flex flex-col gap-3 border-t border-line/60 pt-6 font-work text-[14px] text-cafe/80">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-preto">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
          </span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span className="font-medium">
              -{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Frete</span>
          <span className="font-medium text-preto">
            {shippingCost !== null 
              ? (shippingCost > 0 
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost) 
                  : "Grátis")
              : "A calcular"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-line/60 pt-6">
        <span className="font-work text-[16px] text-preto font-medium">Total</span>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-cafe/50 mb-1">BRL</span>
          <span className="font-fraunces text-[28px] font-bold text-preto leading-none">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalTotal > 0 ? finalTotal : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
