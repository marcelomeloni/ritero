"use client";

import Link from "next/link";


export default function Contato() {
  return (
    <div className="min-h-screen bg-creme pt-24">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-6 pt-10 md:px-10 md:pt-16">
        <h1 className="font-fraunces text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.01em] text-preto">
          Fale com a gente
        </h1>
        <p className="mt-5 max-w-[500px] font-work text-[15px] md:text-[16px] leading-relaxed text-cafe/80">
          Seja para tirar uma dúvida sobre nossos cafés, elogiar ou se tornar um revendedor parceiro, estamos sempre à disposição.
        </p>
      </div>

      {/* Contatos Grid */}
      <div className="mx-auto mt-16 max-w-[1200px] px-6 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* WhatsApp */}
          <a
            href="https://wa.me/5519971020797"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start rounded-[6px] border border-line/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-terracota/30 hover:bg-amarelo-claro hover:shadow-lg hover:shadow-amarelo-claro/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracota text-white transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <h3 className="mt-6 font-fraunces text-[20px] font-semibold text-preto">
              WhatsApp
            </h3>
            <p className="mt-2 font-work text-[14px] leading-relaxed text-cafe/70">
              Atendimento rápido para revendas e dúvidas gerais.
            </p>
            <span className="mt-6 font-mono text-[11px] font-medium tracking-[0.05em] text-terracota underline-offset-4 group-hover:underline">
              (19) 97102-0797
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/riterocafes/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start rounded-[6px] border border-line/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-terracota/30 hover:bg-amarelo-claro hover:shadow-lg hover:shadow-amarelo-claro/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracota text-white transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <h3 className="mt-6 font-fraunces text-[20px] font-semibold text-preto">
              Instagram
            </h3>
            <p className="mt-2 font-work text-[14px] leading-relaxed text-cafe/70">
              Acompanhe nosso dia a dia e novidades nas fazendas.
            </p>
            <span className="mt-6 font-mono text-[11px] font-medium tracking-[0.05em] text-terracota underline-offset-4 group-hover:underline">
              @riterocafes
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:contato@ritero.com.br"
            className="group flex flex-col items-start rounded-[6px] border border-line/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-terracota/30 hover:bg-amarelo-claro hover:shadow-lg hover:shadow-amarelo-claro/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracota text-white transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <h3 className="mt-6 font-fraunces text-[20px] font-semibold text-preto">
              E-mail
            </h3>
            <p className="mt-2 font-work text-[14px] leading-relaxed text-cafe/70">
              Para parcerias, propostas e assuntos mais formais.
            </p>
            <span className="mt-6 font-mono text-[11px] font-medium tracking-[0.05em] text-terracota underline-offset-4 group-hover:underline">
              contato@ritero.com.br
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}
