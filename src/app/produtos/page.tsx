import Link from "next/link";
import Image from "next/image";
import { CAFES } from "@/data/cafes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossos cafés",
  description:
    "Explore nossa seleção de cafés especiais brasileiros. Perfil sensorial único, notas frutadas, doces e achocolatadas. Escolha sua moagem ideal.",
};

export default function Produtos() {
  return (
    <div className="min-h-screen bg-creme pt-24">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-6 pb-6 pt-10 md:px-10 md:pt-16">
        <h1 className="font-fraunces text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.01em] text-preto">
          Nossos cafés
        </h1>
        <p className="mt-4 max-w-[520px] font-work text-[15px] leading-[1.7] text-preto/50">
          Cada lote vem de um produtor específico, com rastreabilidade
          completa da origem.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-8 md:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAFES.map((cafe) => (
            <Link
              key={cafe.slug}
              href={`/produtos/${cafe.slug}`}
              className="group flex flex-col overflow-hidden rounded-[3px] border border-line transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Foto do pacote */}
              <div className="relative flex h-[340px] w-full items-center justify-center bg-creme overflow-hidden p-6 sm:h-[380px]">
                {cafe.imagem ? (
                  <Image
                    src={cafe.imagem}
                    alt={`Café ${cafe.notas}`}
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-fraunces text-[28px] font-bold text-preto/[0.05]">
                    RITERO
                  </span>
                )}
              </div>

              {/* Info colorida — etiqueta */}
              <div
                className="flex flex-col p-6"
                style={{ background: cafe.cor, color: cafe.corTexto }}
              >
                <h2
                  className="font-fraunces text-[20px] font-semibold uppercase leading-[1.2]"
                  style={{ color: cafe.corTexto }}
                >
                  {cafe.notas}
                </h2>

                <div className="mt-5 flex flex-col gap-[5px]">
                  {[
                    { label: "Variedade", value: cafe.variedade },
                    { label: "Processo", value: cafe.processo },
                    { label: "Região", value: cafe.regiao },
                    { label: "Torra", value: cafe.torra },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between border-b border-dashed pb-[5px]"
                      style={{ borderColor: `${cafe.corTexto}20` }}
                    >
                      <span
                        className="font-mono text-[9px] tracking-[0.1em] uppercase"
                        style={{ color: `${cafe.corTexto}70` }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-[0.06em] uppercase"
                        style={{ color: `${cafe.corTexto}cc` }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <span
                    className="font-mono text-[10px] tracking-[0.1em] uppercase transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: `${cafe.corTexto}50` }}
                  >
                    Ver detalhes →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
