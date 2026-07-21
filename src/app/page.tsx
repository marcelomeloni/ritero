import Link from "next/link";
import Image from "next/image";
import { CAFES } from "@/data/cafes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RITERO — Cafés Especiais do Brasil",
  description:
    "Descubra cafés especiais de fazendas brasileiras. Torra artesanal, rastreabilidade de origem e pontuação alta. Compre online com envio rápido.",
  keywords: ["cafés especiais", "café em grãos", "torra artesanal", "café brasileiro", "ritero"],
};

export default function Home() {
  return (
    <main>
      {/* ══════════════════════════════════
          HERO
          ══════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden border-b border-line bg-creme pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 15%, rgba(227,175,192,0.18), transparent 50%), radial-gradient(ellipse at 10% 85%, rgba(110,127,82,0.08), transparent 45%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-[1200px] flex-col justify-center px-6 md:px-10">
          <h1 className="sr-only">Ritero - Cafés Especiais do Brasil</h1>
          
          <div className="max-w-[900px]">
            <Image 
              src="/logosimples.png" 
              alt="Logo da Ritero - Cafés Especiais" 
              width={800} 
              height={250} 
              className="h-auto w-full max-w-[400px] md:max-w-[600px]" 
              priority
            />
          </div>

          <p className="mt-6 font-fraunces text-[clamp(17px,2.2vw,24px)] font-normal italic text-cafe">
            Cafés especiais do Brasil.
          </p>

          <p className="mt-16 max-w-[460px] font-work text-[16px] leading-[1.8] text-preto/70">
            Buscamos os melhores lotes do país, com origem única e sabores marcantes. Nosso foco é levar a você um café puro e fresco, cheio de notas ricas e boas histórias em cada xícara.
          </p>

          <Link
            href="/cafes"
            className="link-elegant mt-12 inline-block self-start"
          >
            Conhecer nossos cafés especiais
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════
          CAFÉS — vitrine
          ══════════════════════════════════ */}
      <section className="border-b border-line bg-creme-light">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-fraunces text-[clamp(26px,3.6vw,42px)] font-semibold tracking-[-0.01em] text-preto">
              Nossos cafés
            </h2>
            <Link href="/cafes" className="link-elegant self-start md:self-auto">
              Ver todos
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CAFES.map((cafe) => (
              <Link
                key={cafe.slug}
                href={`/cafes/${cafe.slug}`}
                className="group overflow-hidden rounded-[3px] border border-line transition-transform duration-500 hover:scale-[1.02]"
              >

                {/* Etiqueta colorida */}
                <div
                  className="flex flex-1 flex-col p-5"
                  style={{ background: cafe.cor, color: cafe.corTexto }}
                >
                  <h3
                    className="font-fraunces text-[17px] font-semibold uppercase leading-[1.2]"
                    style={{ color: cafe.corTexto }}
                  >
                    {cafe.notas}
                  </h3>

                  <div className="mt-4 flex flex-col gap-[4px]">
                    {[
                      { label: "Variedade", value: cafe.variedade },
                      { label: "Processo", value: cafe.processo },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between border-b border-dashed pb-[4px]"
                        style={{ borderColor: `${cafe.corTexto}20` }}
                      >
                        <span
                          className="font-mono text-[9px] tracking-[0.1em] uppercase"
                          style={{ color: `${cafe.corTexto}60` }}
                        >
                          {row.label}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.06em] uppercase"
                          style={{ color: `${cafe.corTexto}bb` }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ONDE ENCONTRAR — CTA
          ══════════════════════════════════ */}
      <section className="bg-preto">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
          <div className="max-w-[560px]">
            <h2 className="font-fraunces text-[clamp(26px,3.6vw,40px)] font-semibold leading-[1.18] text-creme">
              Quer experimentar?
            </h2>
            <p className="mt-6 font-work text-[15px] leading-[1.75] text-creme/45">
              A Ritero está em cafeterias, empórios e pontos selecionados.
              Se preferir, você também pode comprar direto com a gente.
            </p>
            <Link
              href="/onde-comprar"
              className="link-elegant mt-10 inline-block !border-creme/20 !text-creme/70 hover:!border-terracota hover:!text-terracota"
            >
              Ver pontos de venda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
