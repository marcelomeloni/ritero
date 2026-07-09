"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const shortId = orderId ? orderId.substring(0, 8) : null;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("ritero_client_token");
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${API_URL}/public/pedidos/${orderId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (err) {
        console.error("Erro ao buscar pedido:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-[#FDFBF7] py-12">
      <div className="w-full max-w-3xl bg-white rounded-[2px] p-8 md:p-16 text-center relative border border-line/50 shadow-sm animate-fade-in">
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-mono text-[12px] font-bold tracking-[0.2em] text-terracota uppercase mb-4">
            Agradecemos a preferência
          </span>
          
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-preto mb-6 leading-snug">
            Seu café está <span className="italic">garantido.</span>
          </h1>

          <div className="w-12 h-[2px] bg-terracota my-6"></div>

          <p className="font-work text-cafe/80 text-lg mb-8 max-w-md mx-auto">
            Recebemos o seu pedido. Em instantes você receberá um e-mail de confirmação com todos os detalhes da sua compra.
          </p>

          {shortId && (
            <div className="bg-[#F9FAFB] border border-line rounded-[8px] px-8 py-5 mb-10 flex flex-col items-center gap-2 shadow-sm w-full max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-terracota mb-1">
                <CheckCircle size={18} strokeWidth={2.5} />
                <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-cafe/70">
                  Número do Pedido
                </span>
              </div>
              <span className="font-mono text-2xl font-black text-preto">
                #{shortId}
              </span>
            </div>
          )}

          {/* Resumo do Pedido Opcional */}
          {order && order.item_pedido && order.item_pedido.length > 0 && (
            <div className="w-full text-left border-t border-line/50 pt-8 mb-10 animate-fade-in">
              <h3 className="font-fraunces text-xl text-preto mb-6 text-center">Resumo da Compra</h3>
              <div className="flex flex-col gap-4">
                {order.item_pedido.map((item: any) => {
                  const cafe = item.variante_cafe?.cafe;
                  const thumb = cafe?.imagem_url || "/rapadura.png";
                  return (
                    <div key={item.id} className="flex items-center justify-between border-b border-line/30 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <Image src={thumb} alt={cafe?.nome || "Café"} width={64} height={64} className="object-cover" />
                        </div>
                        <div>
                          <p className="font-work font-semibold text-preto">{cafe?.nome || "Café Especial"}</p>
                          <p className="font-work text-sm text-cafe/60">Qtd: {item.quantidade}</p>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-preto">
                        R$ {item.preco_unitario.toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
            <Link 
              href="/minha-conta"
              className="flex h-14 items-center justify-center rounded-[2px] bg-preto px-8 font-mono text-[12px] font-bold tracking-[0.1em] text-white uppercase hover:bg-terracota transition-colors w-full sm:w-auto"
            >
              Acompanhar Pedido
            </Link>
            
            <Link 
              href="/"
              className="flex h-14 items-center justify-center rounded-[2px] border border-preto/20 bg-transparent px-8 font-mono text-[12px] font-bold tracking-[0.1em] text-preto uppercase hover:border-preto transition-colors w-full sm:w-auto"
            >
              Voltar à Loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center"><span className="font-mono text-sm tracking-widest uppercase text-terracota">Carregando...</span></div>}>
      <SuccessContent />
    </Suspense>
  );
}
