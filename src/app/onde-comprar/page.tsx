"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { fetchPontosDeVenda } from "@/services/pontoDeVendaService";


const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-creme">
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-cafe/20">
        Carregando mapa…
      </span>
    </div>
  ),
});

export default function OndeComprar() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pontos, setPontos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPontos = async () => {
      try {
        const data = await fetchPontosDeVenda();
        const formatted = data.map((p) => ({
          id: p.id,
          nome: p.nome,
          tipo: "Ponto de venda",
          endereco: `${p.rua}, ${p.numero}${p.bairro ? ` — ${p.bairro}` : ""}`,
          cidade: `${p.cidade}, ${p.estado}`,
          cep: p.cep,
          lat: p.lat,
          lng: p.long, // db uses long, frontend uses lng
        }));
        setPontos(formatted);
      } catch (err) {
        console.error("Erro ao carregar pontos", err);
      } finally {
        setLoading(false);
      }
    };
    loadPontos();
  }, []);

  return (
    <div className="min-h-screen bg-creme pt-24">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-4 pt-8 md:px-10 md:pt-16">
        <h1 className="font-fraunces text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.01em] text-preto">
          Onde encontrar
        </h1>
        <p className="mt-5 max-w-[500px] font-work text-[15px] md:text-[16px] leading-relaxed text-cafe/80">
          Confeitarias, empórios e pontos selecionados que vendem nossos
          cafés.{" "}
          <Link
            href="/contato"
            className="font-medium text-terracota underline decoration-terracota/40 underline-offset-4 transition-colors hover:text-cafe hover:decoration-cafe/40"
          >
            Quer revender?
          </Link>
        </p>
      </div>

      {/* Map + List */}
      <div className="mx-auto mt-8 max-w-[1200px] px-4 pb-24 md:px-10 md:mt-12">
        <div className="overflow-hidden rounded-[6px] border border-line/80">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px]">
            {/* Mapa */}
            <div className="relative z-0 h-[280px] shrink-0 sm:h-[350px] lg:h-auto lg:min-h-[620px]">
              {loading ? (
                <div className="flex h-full items-center justify-center bg-creme">Carregando...</div>
              ) : (
                <MapView
                  pontos={pontos}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>

            {/* Divisória + Lista */}
            <div className="flex flex-col border-t border-line/60 bg-white lg:border-l lg:border-t-0">
              {/* Header */}
              <div className="flex items-center px-6 py-5 border-b border-line/60">
                <span className="font-fraunces text-[16px] font-semibold text-preto">
                  Pontos de venda
                </span>
              </div>

              {/* Lista com scroll customizado */}
              <div className="custom-scroll flex-1 overflow-y-auto max-h-[350px] sm:max-h-[450px] lg:max-h-[555px]">
                {pontos.map((ponto) => {
                  const isActive = selected === ponto.id;

                  return (
                    <button
                      key={ponto.id}
                      onClick={() => setSelected(ponto.id)}
                      className={`group relative w-full border-b border-line/60 px-6 py-6 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-creme"
                          : "hover:bg-amarelo-claro/30"
                      }`}
                    >
                      {/* Indicador lateral */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300 ${
                          isActive
                            ? "bg-terracota"
                            : "bg-transparent group-hover:bg-ouro/30"
                        }`}
                      />

                      <div className="flex flex-col">
                        <h3 className={`font-fraunces text-[17px] font-bold transition-colors ${isActive ? "text-terracota" : "text-preto group-hover:text-terracota"}`}>
                          {ponto.nome}
                        </h3>
                        <p className="mt-1.5 font-work text-[14px] leading-relaxed text-cafe/80">
                          {ponto.endereco}
                        </p>
                      </div>

                      <span className="mt-3 block font-mono text-[11px] font-medium tracking-[0.05em] text-cafe/50">
                        {ponto.cidade} · {ponto.cep}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
