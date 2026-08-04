"use client";

import { Package, CaretRight, Star, X } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { fetchMeusPedidos, Pedido } from "@/services/pedidoService";

interface OrdersTabProps {
  onOrderClick: (order: Pedido) => void;
}

export function OrdersTab({ onOrderClick }: OrdersTabProps) {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMeusPedidos();
        setOrders(data);
      } catch (err) {
        console.error("Erro ao carregar pedidos", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <>
      <div className="rounded-[12px] bg-white p-6 shadow-sm border border-line/60 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preto/5 text-preto">
            <Package size={22} weight="light" />
          </div>
          <h2 className="font-fraunces text-[22px] font-semibold text-preto">Histórico de Pedidos</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">Carregando pedidos...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 font-work text-cafe/70">
            Você ainda não tem nenhum pedido.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.slice((currentPage - 1) * 10, currentPage * 10).map((order) => (
              <div 
                key={order.id}
                onClick={() => onOrderClick(order)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[8px] border border-line/60 bg-[#FDFBF7]/50 p-5 cursor-pointer transition-all hover:border-terracota/50 hover:bg-terracota/5"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-terracota uppercase">
                    {order.id.slice(0, 8)}
                  </span>
                  <span className="font-work text-[14px] font-medium text-preto">
                    Realizado em {new Date(order.data_criacao).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="font-work text-[13px] text-cafe/70 mt-1">
                    {order.item_pedido?.length || 0} {(order.item_pedido?.length || 0) === 1 ? 'item' : 'itens'} • {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valor_total)}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-line/40">
                  
                  <span className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'entregue' 
                      ? 'bg-green-100 text-green-700' 
                      : order.status === 'pendente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>

                  {order.status === 'entregue' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(order);
                      }}
                      className="rounded-full bg-preto px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-terracota"
                    >
                      Avaliar
                    </button>
                  )}
                  
                  <div className="flex items-center gap-2 text-cafe/50 group-hover:text-terracota transition-colors ml-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest hidden sm:block">Detalhes</span>
                    <CaretRight size={16} weight="bold" />
                  </div>
                </div>
              </div>
            ))}

            {orders.length > 10 && (
              <div className="flex items-center justify-between border-t border-line/60 pt-6 mt-2">
                <span className="font-work text-[13px] text-cafe/60">
                  Mostrando <span className="font-semibold text-preto">{(currentPage - 1) * 10 + 1}</span> a <span className="font-semibold text-preto">{Math.min(currentPage * 10, orders.length)}</span> de <span className="font-semibold text-preto">{orders.length}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-9 w-9 rounded-[8px] border border-line/40 bg-white font-mono text-[13px] text-cafe/60 transition-all hover:border-preto/30 hover:text-preto disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.ceil(orders.length / 10) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(orders.length / 10);
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`flex items-center justify-center h-9 w-9 rounded-[8px] font-mono text-[13px] transition-all ${
                              currentPage === page
                                ? "bg-preto text-white font-bold shadow-sm"
                                : "border border-line/40 bg-white text-cafe/60 hover:border-preto/30 hover:text-preto"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-cafe/40 px-1">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(Math.ceil(orders.length / 10), currentPage + 1))}
                    disabled={currentPage === Math.ceil(orders.length / 10)}
                    className="flex items-center justify-center h-9 w-9 rounded-[8px] border border-line/40 bg-white font-mono text-[13px] text-cafe/60 transition-all hover:border-preto/30 hover:text-preto disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
