"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice } = useCart();

  // Fecha no ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeCart]);

  return (
    <>
      {/* Overlay Escuro */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[101] flex h-[100dvh] w-full max-w-[420px] flex-col bg-creme shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        {/* Header do Cart */}
        <div className="flex items-center justify-between border-b border-line/60 px-6 py-5">
          <h2 className="font-fraunces text-[22px] font-semibold text-preto">
            Sua Sacola
          </h2>
          <button
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-cafe transition-colors hover:bg-line/40"
            aria-label="Fechar carrinho"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Itens do Cart */}
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scroll">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-70">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 text-terracota">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p className="font-work text-[16px] text-cafe">Sua sacola está vazia.</p>
              <button 
                onClick={closeCart}
                className="mt-6 font-mono text-[12px] font-bold tracking-[0.1em] text-terracota uppercase hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Imagem */}
                  <div 
                    className="relative flex h-24 w-20 shrink-0 items-center justify-center rounded-[8px] p-2"
                    style={{ backgroundColor: item.cor }}
                  >
                    <Image
                      src={item.imagem}
                      alt={item.notas}
                      fill
                      className="object-contain p-2 drop-shadow-md"
                    />
                  </div>

                  {/* Detalhes */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-cafe/70">
                          {item.nome}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-cafe/40 transition-colors hover:text-terracota"
                          aria-label="Remover item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      <h3 className="mt-1 font-fraunces text-[16px] font-bold leading-tight text-preto">
                        {item.notas}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-cafe/60 tracking-wider">
                          {item.peso_gramas}g • {item.moagem} • SCA {item.pontuacao}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[13px] font-semibold text-terracota">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                      </p>
                    </div>

                    {/* Controles */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex h-8 items-center rounded-full border border-line/60 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-cafe transition-colors hover:bg-black/5 rounded-l-full"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono text-[12px] font-bold text-cafe">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="flex h-8 w-8 items-center justify-center text-[16px] text-cafe transition-colors hover:bg-black/5 rounded-r-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer do Cart */}
        {items.length > 0 && (
          <div className="border-t border-line/60 bg-white p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-work text-[14px] text-cafe/80">Subtotal</span>
              <span className="font-fraunces text-[22px] font-bold text-preto">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
              </span>
            </div>
            <p className="mb-6 font-work text-[12px] text-cafe/60">
              Frete e descontos serão calculados no checkout.
            </p>
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center rounded-full bg-preto px-6 py-4 font-mono text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-transform hover:scale-[1.02] active:scale-95"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
