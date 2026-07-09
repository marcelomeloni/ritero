import { CaretLeft, MapPin, Truck, Receipt, Star } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import Image from "next/image";

import { Pedido } from "@/services/pedidoService";
import { api } from "@/services/api";

interface OrderDetailsProps {
  order: Pedido | null;
  onBack: () => void;
}

export function OrderDetails({ order, onBack }: OrderDetailsProps) {
  const [reviewingItem, setReviewingItem] = useState<{id_cafe: string, nome: string} | null>(null);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewedItems, setReviewedItems] = useState<string[]>([]);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  if (!order) return null;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const subtotal = order.valor_pedidos;

  const handleSubmitReview = async () => {
    if (!reviewingItem) return;
    setIsSubmitting(true);
    try {
      await api("/public/avaliacoes", {
        method: "POST",
        body: JSON.stringify({
          id_cafe: reviewingItem.id_cafe,
          nota,
          comentario
        })
      });
      setReviewedItems(prev => [...prev, reviewingItem.id_cafe]);
      setReviewingItem(null);
      setNota(5);
      setComentario("");
      showToast("Avaliação enviada com sucesso! Muito obrigado pelo feedback. ☕", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao enviar avaliação.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[12px] bg-white p-6 shadow-sm border border-line/60 lg:p-8 animate-fade-in relative overflow-hidden">
      
      {/* Toast Notification */}
      <div 
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out flex items-center gap-3 px-6 py-3 rounded-full shadow-lg border ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
        } ${toast?.type === 'success' ? "bg-[#FDFBF7] border-[#2E7D32]/20 text-[#2E7D32]" : "bg-[#FDFBF7] border-red-500/20 text-red-600"}`}
      >
        <span className="font-mono text-[12px] font-bold uppercase tracking-wider">
          {toast?.message}
        </span>
      </div>
      {/* Modal de Avaliação */}
      {reviewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-preto/40 p-4 animate-fade-in backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[12px] bg-white p-6 shadow-xl relative animate-scale-in">
            <h3 className="font-fraunces text-[22px] font-semibold text-preto mb-1">
              Avaliar Produto
            </h3>
            <p className="font-work text-[14px] text-cafe/70 mb-6">
              Como foi sua experiência com o {reviewingItem.nome}?
            </p>

            <div className="flex gap-2 justify-center mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setNota(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    size={36} 
                    weight={star <= nota ? "fill" : "regular"} 
                    className={star <= nota ? "text-terracota" : "text-cafe/30"} 
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Conte-nos o que achou do sabor, aroma..."
              className="w-full h-24 p-3 rounded-[8px] border border-line/60 bg-creme-light/30 font-work text-[14px] text-preto outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/10 resize-none mb-6"
            />

            <div className="flex gap-3">
              <button 
                onClick={() => setReviewingItem(null)}
                className="flex-1 py-3 rounded-full border border-line/80 font-mono text-[12px] font-bold uppercase tracking-widest text-cafe/70 hover:bg-line/20 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-full bg-preto font-mono text-[12px] font-bold uppercase tracking-widest text-white hover:bg-terracota transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-cafe/60 hover:text-preto font-mono text-[11px] font-bold uppercase tracking-widest transition-colors mb-8"
      >
        <CaretLeft size={16} weight="bold" />
        Voltar para Pedidos
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-line/60">
        <div>
          <span className="font-mono text-[11px] font-bold tracking-widest text-terracota uppercase block mb-1">
            Pedido {order.id.split("-")[0]}
          </span>
          <h2 className="font-fraunces text-[28px] font-semibold text-preto">
            Detalhes da Compra
          </h2>
          <span className="font-work text-[14px] text-cafe/70 block mt-1">
            Realizado em {new Date(order.data_criacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] border border-line/80 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-preto transition-colors hover:bg-preto hover:text-white">
          <Receipt size={16} />
          Baixar Nota Fiscal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Status de Entrega */}
        <div className="rounded-[8px] bg-[#FDFBF7] border border-line/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-preto text-white">
              <Truck size={16} weight="fill" />
            </div>
            <h3 className="font-fraunces text-[18px] font-semibold text-preto">Entrega</h3>
          </div>
          
          <div className="flex flex-col gap-1 mb-6">
            <span className="font-work text-[13px] text-cafe/70">Código de Rastreio</span>
            <span className="font-mono text-[14px] font-bold text-preto">
              {order.codigo_rastreio || "Aguardando envio..."}
            </span>
          </div>

          <div className="relative pt-2 mt-4 px-2">
            {/* Linha de fundo */}
            <div className="absolute top-[22px] left-6 right-6 h-1 bg-line/50 rounded-full" />
            
            {/* Linha de progresso */}
            <div 
              className="absolute top-[22px] left-6 h-1 bg-terracota rounded-full transition-all duration-700 ease-in-out" 
              style={{ 
                width: 
                  order.status?.toLowerCase() === 'entregue' ? 'calc(100% - 48px)' : 
                  order.status?.toLowerCase() === 'enviado' ? 'calc(50% - 24px)' : 
                  order.status?.toLowerCase() === 'preparando' ? '0%' : '0%'
              }}
            />
            
            <div className="flex justify-between relative z-10">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-[4px] transition-colors duration-500 border-[#FDFBF7] ${order.status?.toLowerCase() !== 'pendente' ? 'bg-terracota scale-110' : 'bg-line/80'}`} />
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${order.status?.toLowerCase() !== 'pendente' ? 'text-terracota' : 'text-cafe/50'}`}>Preparando</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-[4px] transition-colors duration-500 border-[#FDFBF7] ${order.status?.toLowerCase() === 'enviado' || order.status?.toLowerCase() === 'entregue' ? 'bg-terracota scale-110' : 'bg-line/80'}`} />
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${order.status?.toLowerCase() === 'enviado' || order.status?.toLowerCase() === 'entregue' ? 'text-terracota' : 'text-cafe/50'}`}>Enviado</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-[4px] transition-colors duration-500 border-[#FDFBF7] ${order.status?.toLowerCase() === 'entregue' ? 'bg-terracota scale-110' : 'bg-line/80'}`} />
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors ${order.status?.toLowerCase() === 'entregue' ? 'text-terracota' : 'text-cafe/50'}`}>Entregue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="rounded-[8px] bg-[#FDFBF7] border border-line/40 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-preto/5 text-preto">
              <MapPin size={16} weight="fill" />
            </div>
            <h3 className="font-fraunces text-[18px] font-semibold text-preto">Endereço</h3>
          </div>
          <div className="flex flex-col gap-1 font-work text-[14px] text-cafe/80 leading-relaxed">
            <span className="font-medium text-preto">Casa</span>
            <span>{order.endereco?.rua}, {order.endereco?.numero} {order.endereco?.complemento && `- ${order.endereco.complemento}`}</span>
            <span>{order.endereco?.bairro}, {order.endereco?.cidade} - {order.endereco?.estado}</span>
            <span>CEP: {order.endereco?.cep}</span>
          </div>
        </div>
      </div>

      {/* Itens */}
      <h3 className="font-fraunces text-[20px] font-semibold text-preto mb-6">Itens do Pedido</h3>
      <div className="flex flex-col gap-4 border-b border-line/60 pb-6 mb-6">
        {order.item_pedido?.map((item) => {
          const cafeId = item.variante_cafe?.cafe?.id;
          const isDelivered = order.status?.toLowerCase() === 'entregue';
          const isReviewed = reviewedItems.includes(cafeId);

          return (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="relative flex h-[76px] w-[60px] shrink-0 items-center justify-center rounded-[8px] border border-line/40"
                style={{ backgroundColor: item.variante_cafe?.cafe?.cor || "#FDFBF7" }}
              >
                {item.variante_cafe?.cafe?.imagem_url && (
                  <Image src={item.variante_cafe.cafe.imagem_url} alt={item.variante_cafe.cafe.nome} fill className="object-contain p-2.5 drop-shadow-sm" />
                )}
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-preto px-1.5 font-mono text-[9px] font-bold text-white ring-2 ring-white">
                  {item.quantidade}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-cafe/60">
                  {item.variante_cafe?.cafe?.nome}
                </span>
                <span className="mt-1 font-fraunces text-[14px] font-bold text-preto">
                  {item.variante_cafe?.peso_gramas === 1000 ? "1kg" : "250g"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              <span className="font-mono text-[14px] font-bold text-terracota">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco_unitario * item.quantidade)}
              </span>

              {isDelivered && cafeId && (
                <button 
                  onClick={() => setReviewingItem({ id_cafe: cafeId, nome: item.variante_cafe?.cafe?.nome || "" })}
                  disabled={isReviewed}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                    isReviewed 
                      ? "bg-green-100 text-green-700 opacity-80 cursor-not-allowed" 
                      : "bg-terracota/10 text-terracota hover:bg-terracota hover:text-white"
                  }`}
                >
                  <Star size={14} weight={isReviewed ? "fill" : "bold"} />
                  {isReviewed ? "Avaliado" : "Avaliar"}
                </button>
              )}
            </div>
          </div>
        )})}
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="font-work text-[13px] text-cafe/70">Subtotal: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</span>
          <span className="font-work text-[13px] text-cafe/70">Frete: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valor_frete)}</span>
          {order.valor_desconto > 0 && <span className="font-work text-[13px] text-green-600">Desconto: -{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valor_desconto)}</span>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-work text-[13px] text-cafe/70">Total Pago</span>
          <span className="font-fraunces text-[24px] font-bold text-preto leading-none">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valor_total)}
          </span>
        </div>
      </div>

    </div>
  );
}
