"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { addFavorito, removeFavorito, fetchFavoritos } from "@/services/favoritoService";
import { PRECOS_SCA, type Cafe, type PontuacaoSCA, type PesoOpcao } from "@/data/cafes";

interface PurchaseSectionProps {
  cafe: Cafe;
}

export function PurchaseSection({ cafe }: PurchaseSectionProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [pesoSelecionado, setPesoSelecionado] = useState<PesoOpcao>("250g");
  const [moagemSelecionada, setMoagemSelecionada] = useState<"Em grão" | "Moído">("Em grão");
  const [pontuacaoSelecionada, setPontuacaoSelecionada] = useState<PontuacaoSCA>("85");
  const [toastMessage, setToastMessage] = useState("");
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  
  const { addToCart, openCart } = useCart();
  const { user } = useAuth();

  const currentPrice = PRECOS_SCA[pesoSelecionado][pontuacaoSelecionada];

  const handleAddToCart = () => {
    addToCart({
      id: `${cafe.slug}-${pesoSelecionado}-${pontuacaoSelecionada}-${moagemSelecionada}`,
      slug: cafe.slug,
      nome: cafe.produtor,
      notas: cafe.notas,
      preco: currentPrice,
      quantidade,
      imagem: cafe.ilustracao || cafe.imagem || "",
      cor: cafe.cor,
      corTexto: cafe.corTexto,
      moagem: moagemSelecionada,
      peso_gramas: pesoSelecionado === "1kg" ? 1000 : 250,
      pontuacao: pontuacaoSelecionada,
    });
    openCart();
  };

  const handleDecrease = () => {
    if (quantidade > 1) setQuantidade(q => q - 1);
  };
  
  const handleIncrease = () => {
    setQuantidade(q => q + 1);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!user) return;
      try {
        const favoritos = await fetchFavoritos();
        if (favoritos.some((fav) => fav.cafe.id === cafe.id)) {
          setIsFavorited(true);
        }
      } catch (err) {
        // ignora
      }
    };
    checkIfFavorited();
  }, [user, cafe.id]);

  const handleFavoritar = async () => {
    if (!user) {
      showToast("Faça login para favoritar!");
      return;
    }
    
    try {
      setIsFavoriting(true);
      if (isFavorited) {
        await removeFavorito(cafe.id);
        setIsFavorited(false);
        showToast("Café removido dos favoritos!");
      } else {
        await addFavorito(cafe.id);
        setIsFavorited(true);
        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 500); // tempo da animação
        showToast("Café adicionado aos favoritos!");
      }
    } catch (err: any) {
      showToast("Erro ao atualizar favoritos. Tente novamente.");
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-start">
      
      {/* Preço Dinâmico e Selector de Peso */}
      <div className="mb-10 w-full">
        <div className="flex flex-col gap-1 mb-6">
          <span className="font-fraunces text-[32px] font-bold tracking-tight">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
          </span>
        </div>

        {/* Pontuação SCA Toggle */}
        <div className="mb-6">
          <label className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
            Classificação SCA
          </label>
          <div className="flex flex-wrap gap-3">
            {(["86.9", "85", "83"] as PontuacaoSCA[]).map((pont) => {
              const isSelected = pontuacaoSelecionada === pont;
              return (
                <button
                  key={pont}
                  onClick={() => setPontuacaoSelecionada(pont)}
                  className={`relative flex flex-col items-center justify-center rounded-[12px] min-w-[80px] py-3 border-2 transition-all duration-300 ${isSelected ? 'scale-[1.03] shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'}`}
                  style={{
                    backgroundColor: isSelected ? cafe.corTexto : 'transparent',
                    color: isSelected ? cafe.cor : cafe.corTexto,
                    borderColor: isSelected ? cafe.corTexto : `${cafe.corTexto}30`,
                  }}
                >
                  <span className="font-fraunces text-[18px] font-bold leading-none">{pont}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest mt-1 opacity-80">Pontos</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Peso Toggle */}
        <div className="mb-5">
          <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
            Peso
          </label>
          <div className="flex gap-3">
            {(["250g", "1kg"] as const).map((peso) => {
              const isSelected = pesoSelecionado === peso;
              return (
                <button
                  key={peso}
                  onClick={() => setPesoSelecionado(peso)}
                  className="relative flex items-center justify-center rounded-full px-6 py-[10px] font-mono text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? `${cafe.corTexto}15` : 'transparent',
                    color: cafe.corTexto,
                    border: `1.5px solid ${isSelected ? cafe.corTexto : `${cafe.corTexto}30`}`,
                  }}
                >
                  {peso}
                </button>
              );
            })}
          </div>
        </div>

        {/* Moagem Toggle */}
        <div className="mb-8">
          <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
            Preparo
          </label>
          <div className="flex gap-2">
            {(["Em grão", "Moído"] as const).map((moagem) => {
              const isSelected = moagemSelecionada === moagem;
              return (
                <button
                  key={moagem}
                  onClick={() => setMoagemSelecionada(moagem)}
                  className={`relative flex items-center justify-center px-4 py-2 font-mono text-[11px] font-medium tracking-[0.05em] uppercase transition-all duration-300 border-b-2 ${isSelected ? '' : 'opacity-60 hover:opacity-100'}`}
                  style={{
                    backgroundColor: isSelected ? `${cafe.corTexto}05` : 'transparent',
                    color: cafe.corTexto,
                    borderColor: isSelected ? cafe.corTexto : 'transparent',
                  }}
                >
                  {moagem}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Seletor de Quantidade */}
        <div 
          className="flex h-14 items-center rounded-full px-2 border"
          style={{ borderColor: `${cafe.corTexto}40`, color: cafe.corTexto }}
        >
          <button 
            onClick={handleDecrease}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[18px] transition-colors hover:bg-black/5 active:scale-95 disabled:opacity-50"
            disabled={quantidade <= 1}
            aria-label="Diminuir quantidade"
          >
            -
          </button>
          <span className="w-8 text-center font-mono text-[14px] font-bold">
            {quantidade}
          </span>
          <button 
            onClick={handleIncrease}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[18px] transition-colors hover:bg-black/5 active:scale-95"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        {/* Botão Adicionar à sacola */}
        <button
          onClick={handleAddToCart}
          className="flex h-14 items-center gap-3 rounded-full px-6 font-mono text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:px-8 sm:text-[13px]"
          style={{ backgroundColor: cafe.corTexto, color: cafe.cor, boxShadow: `0 10px 30px -10px ${cafe.corTexto}80` }}
        >
          <span>Adicionar à sacola</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </button>

        {/* Favoritar */}
        <button
          onClick={handleFavoritar}
          disabled={isFavoriting}
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 ${isFavorited ? "scale-105" : "hover:scale-[1.05]"} ${animateHeart ? "animate-pulse scale-110" : ""}`}
          style={{ 
            border: `1.5px solid ${isFavorited ? cafe.corTexto : `${cafe.corTexto}40`}`, 
            color: cafe.corTexto,
            backgroundColor: isFavorited ? `${cafe.corTexto}15` : "transparent"
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-500 ${animateHeart ? "scale-125" : ""} ${!isFavorited && "hover:fill-current opacity-70"}`}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-mono text-[12px] font-bold uppercase tracking-widest shadow-xl animate-fade-in z-50 flex items-center gap-2"
          style={{ backgroundColor: cafe.corTexto, color: cafe.cor }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
