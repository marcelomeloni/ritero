import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CAFES } from "@/data/cafes";
import { PurchaseSection } from "./PurchaseSection";
import { Metadata } from "next";

export function generateStaticParams() {
  return CAFES.map((cafe) => ({
    slug: cafe.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cafe = CAFES.find((c) => c.slug === slug);

  if (!cafe) {
    return {
      title: "Café não encontrado",
    };
  }

  const cafeName = cafe.notas.split(",")[0].trim() || cafe.notas;
  const title = `${cafeName} — Café Especial | Ritero`;
  const description = `Compre o café especial de ${cafeName}, cultivado na região de ${cafe.regiao} (${cafe.processo}). Notas sensoriais de ${cafe.notas}. Variedade ${cafe.variedade}, torra média artesanal.`;
  const imageUrl = `https://ritero.com.br${cafe.ogImage || cafe.imagem || "/riteroca.png"}`;

  return {
    title,
    description,
    keywords: [
      "café especial",
      cafeName.toLowerCase(),
      cafe.variedade.toLowerCase(),
      cafe.processo.toLowerCase(),
      cafe.regiao.toLowerCase(),
      "café em grãos",
      "torra artesanal",
      "café brasileiro",
      "ritero",
      "comprar café especial",
    ],
    openGraph: {
      title,
      description,
      url: `https://ritero.com.br/cafes/${slug}`,
      siteName: "Ritero",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${cafeName} — Café Especial Ritero`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://ritero.com.br/cafes/${slug}`,
    },
  };
}

export default async function ProdutoCafe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cafe = CAFES.find((c) => c.slug === slug);

  if (!cafe) {
    notFound();
  }

  // Busca avaliações no backend
  let avaliacoes = [];
  let media = 0;
  let totalAvaliacoes = 0;

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${API_URL}/public/avaliacoes/${cafe.id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      avaliacoes = data.avaliacoes || [];
      media = data.estatisticas?.media || 0;
      totalAvaliacoes = data.estatisticas?.total || 0;
    }
  } catch (err) {
    console.error("Erro ao buscar avaliações:", err);
  }

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${cafe.notas.split(",")[0].trim() || cafe.notas} — Café Especial`,
    "image": `https://ritero.com.br${cafe.imagem || "/riteroca.png"}`,
    "description": `Café especial de ${cafe.variedade}, processamento ${cafe.processo}. Cultivado na região de ${cafe.regiao}. Notas sensoriais: ${cafe.notas}.`,
    "brand": {
      "@type": "Brand",
      "name": "Ritero"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      "lowPrice": cafe.opcoes?.[0]?.preco || 0,
      "highPrice": cafe.opcoes ? cafe.opcoes[cafe.opcoes.length - 1]?.preco : 0,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Ritero Cafés Especiais"
      }
    },
    ...(totalAvaliacoes > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": media.toFixed(1),
        "reviewCount": totalAvaliacoes
      }
    } : {})
  };

  return (
    <div className="min-h-screen bg-creme pt-[73px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />
      {/* ─── HERO DYNAMIC THEME ─── */}
      <div 
        className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 md:px-10"
        style={{ backgroundColor: cafe.cor, color: cafe.corTexto }}
      >
        <div className="w-full max-w-[1000px]">
          <Link
            href="/cafes"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[16px] font-bold tracking-[0.1em] uppercase opacity-60 transition-opacity hover:opacity-100 sm:text-[18px]"
          >
            <span>←</span> Todos os cafés
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
            {/* Texto Principal */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[14px] font-bold tracking-[0.15em] uppercase opacity-70">
                  {cafe.regiao}
                </span>

                {cafe.pontuacao && (
                  <span className="font-mono text-[12px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-current opacity-90">
                    SCA {cafe.pontuacao}
                  </span>
                )}
                
                {/* Avaliação Estrelas (se houver) */}
                {totalAvaliacoes > 0 && (
                  <div className="flex items-center gap-[6px] rounded-full px-[10px] py-[4px]" style={{ backgroundColor: `${cafe.corTexto}15` }}>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= Math.round(media) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="opacity-90">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] font-bold tracking-[0.05em] opacity-80">{Number(media).toFixed(1)}/5</span>
                  </div>
                )}
              </div>
              
              <h1 className="mt-6 font-fraunces text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.02em]">
                {cafe.notas}
              </h1>
              
              {/* 
              <p className="mt-8 max-w-[400px] font-work text-[16px] leading-relaxed opacity-80">
                Um café autêntico cultivado na região de {cafe.regiao}. Perfil de torra {cafe.torra.toLowerCase()}, processamento {cafe.processo.toLowerCase()} e variedade {cafe.variedade}.
              </p>
              */}

              <PurchaseSection cafe={cafe} />
            </div>

            <div className="mt-12 flex items-center justify-center lg:mt-0 lg:justify-end">
              <div className="relative flex h-[450px] w-[280px] sm:w-[320px] items-center justify-center transition-transform hover:scale-[1.02]">
                <Image
                  src={cafe.ilustracao || cafe.imagem || ""}
                  alt={`Embalagem do Café ${cafe.notas}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TECHNICAL DETAILS ─── */}
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-5">
          <div className="flex flex-col border-l-2 border-terracota/30 pl-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-cafe/50">
              Variedade
            </span>
            <span className="mt-2 font-fraunces text-[18px] font-medium text-preto">
              {cafe.variedade}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-terracota/30 pl-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-cafe/50">
              Processamento
            </span>
            <span className="mt-2 font-fraunces text-[18px] font-medium text-preto">
              {cafe.processo}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-terracota/30 pl-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-cafe/50">
              Região
            </span>
            <span className="mt-2 font-fraunces text-[18px] font-medium text-preto">
              {cafe.regiao}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-terracota/30 pl-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-cafe/50">
              Torra
            </span>
            <span className="mt-2 font-fraunces text-[18px] font-medium text-preto">
              {cafe.torra}
            </span>
          </div>

          {cafe.pontuacao && (
            <div className="flex flex-col border-l-2 border-terracota/30 pl-4">
              <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-cafe/50">
                Classificação SCA
              </span>
              <span className="mt-2 font-fraunces text-[18px] font-medium text-preto">
                {cafe.pontuacao} pts
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── AVALIAÇÕES (REVIEWS) ─── */}
      <div className="border-t border-line/40 bg-white">
        <div className="mx-auto max-w-[1000px] px-6 py-24 md:px-10">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <h2 className="font-fraunces text-[clamp(28px,4vw,36px)] font-semibold tracking-[-0.01em] text-preto">
                O que dizem os clientes
              </h2>
              {totalAvaliacoes > 0 ? (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex text-terracota">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= Math.round(media) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <span className="font-mono text-[12px] font-medium tracking-[0.05em] text-cafe/60">
                    Baseado em {totalAvaliacoes} avaliaç{totalAvaliacoes === 1 ? 'ão' : 'ões'}
                  </span>
                </div>
              ) : (
                <p className="mt-3 font-work text-[14px] text-cafe/60">Ainda não há avaliações para este café. Seja o primeiro a avaliar!</p>
              )}
            </div>
          </div>

          {avaliacoes.length > 0 && (
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {avaliacoes.map((av: any) => (
                <div key={av.id} className="min-w-[320px] max-w-[400px] shrink-0 snap-start rounded-[8px] bg-creme-light p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-preto">
                      {av.cliente?.pessoa?.nome || "Cliente"}
                    </span>
                    <span className="font-mono text-[10px] text-cafe/40">
                      {new Date(av.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="mt-3 flex text-terracota/80">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= av.nota ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 font-work text-[14px] leading-relaxed text-cafe/80">
                    {av.comentario}
                  </p>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
