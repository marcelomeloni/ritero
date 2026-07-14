"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Coffee, Star, Users, Loader2, CheckCircle2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório."),
  empresa: z.string().optional(),
  email: z.string().email("E-mail inválido."),
  telefone: z.string().min(10, "Telefone inválido."),
  tipoEvento: z.string().min(2, "Por favor, informe o tipo de evento."),
  dataEstimada: z.string().optional(),
  convidados: z.string().optional(),
  mensagem: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EventosClient() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // Simulação de envio para a futura integração com RESEND
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Dados do formulário:", data);
    setIsSuccess(true);
    reset();
    
    // Limpa a mensagem de sucesso depois de um tempo
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-[#FFFBCC]">
      {/* ─── HERO SECTION ─── */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-24 md:px-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000"
            alt="Barista extraindo café especial"
            fill
            className="object-cover object-center opacity-[0.25] mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-creme via-creme/50 to-creme/10" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
          <h1 className="font-sans text-[clamp(40px,6vw,72px)] font-black uppercase leading-[1.05] tracking-tight text-[#000000]">
            A Experiência Ritero <br className="hidden md:block" /> no seu Evento.
          </h1>
          <p className="mt-8 max-w-[600px] font-work text-[16px] md:text-[18px] leading-[1.7] text-cafe/80">
            Mais do que servir café, nós criamos momentos de pausa, apreciação e conexões reais. Leve cafés especiais de alta pontuação para surpreender seus convidados.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center">
            <a
              href="https://wa.me/5519971020797?text=Olá! Gostaria de saber mais sobre como ter a Ritero no meu evento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-[6px] bg-[#231302] px-10 py-5 font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-[#FFFBCC] transition-all hover:bg-[#25D366] hover:text-white hover:scale-105 active:scale-95 shadow-lg"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── DIFERENCIAIS ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 max-w-[800px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDB45] text-[#231302]">
              <Star size={24} />
            </div>
            <h3 className="mt-6 font-sans text-[22px] font-black uppercase tracking-tight text-[#000000]">Cafés Premiados</h3>
            <p className="mt-3 font-work text-[15px] leading-relaxed text-[#231302]/80 max-w-[300px]">
              Trabalhamos exclusivamente com grãos acima de 83 pontos (SCA), torra fresca artesanal e máxima qualidade.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFDB45] text-[#231302]">
              <Coffee size={24} />
            </div>
            <h3 className="mt-6 font-sans text-[22px] font-black uppercase tracking-tight text-[#000000]">Estrutura Completa</h3>
            <p className="mt-3 font-work text-[15px] leading-relaxed text-[#231302]/80 max-w-[300px]">
              Levamos o aroma, o encanto e a experiência mágica de uma verdadeira cafeteria de especialidade até você.
            </p>
          </div>
        </div>
      </section>

      {/* ─── TIPOS DE EVENTOS ─── */}
      <section className="bg-[#231302] border-y border-[#231302]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-24 text-center md:px-10">
          <h2 className="font-sans text-[clamp(28px,4vw,40px)] font-black uppercase text-[#FFDB45]">
            Para quem é?
          </h2>
          <p className="mt-4 max-w-[600px] font-work text-[16px] leading-[1.7] text-[#FFFBCC]/80">
            Adaptamos nossa estrutura para diferentes necessidades e tamanhos de público.
          </p>

          <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Eventos Corporativos",
                desc: "Congressos, feiras, workshops e confraternizações de empresa. O café perfeito para manter o networking aquecido."
              },
              {
                title: "Lançamentos & Ativações",
                desc: "Lojas, inaugurações e ações de marketing. O aroma do café especial atrai clientes e gera uma experiência de marca memorável."
              },
              {
                title: "Cursos & Workshops",
                desc: "Ofereça mais foco e hospitalidade aos alunos e participantes. Um café recém-torrado servido na hora faz toda a diferença nos intervalos."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col rounded-[6px] border border-[#FFFBCC]/10 bg-[#231302] p-8 text-left transition-colors hover:border-[#FFDB45]/40">
                <h3 className="font-sans text-[20px] font-black uppercase tracking-tight text-[#FFFBCC]">{item.title}</h3>
                <p className="mt-3 font-work text-[14px] leading-relaxed text-[#FFFBCC]/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMULÁRIO DE CONTATO (CTA) ─── */}
      <section id="orcamento" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-[45%]">
            <h2 className="font-sans text-[clamp(32px,5vw,48px)] font-black uppercase leading-[1.1] text-[#000000]">
              Vamos tomar um café no seu evento?
            </h2>
            <p className="mt-6 font-work text-[16px] leading-[1.7] text-cafe/70">
              Preencha o formulário ao lado com os detalhes preliminares do seu evento.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 border-l-2 border-terracota/30 pl-6">
              <p className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-cafe/50">
                Contato Direto
              </p>
              <a href="mailto:contato@ritero.com.br" className="font-work text-[18px] font-medium text-preto hover:text-terracota">
                contato@ritero.com.br
              </a>
              <a href="https://wa.me/5519971020797" className="font-work text-[18px] font-medium text-preto hover:text-terracota">
                (19) 97102-0797
              </a>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#231302]/10 bg-white p-6 shadow-[0_8px_30px_rgb(35,19,2,0.12)] sm:p-10 lg:w-[50%]">
            {isSuccess ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 size={48} className="text-[#34A853] mb-6" />
                <h3 className="font-fraunces text-[24px] font-bold text-preto">Mensagem Recebida!</h3>
                <p className="mt-3 font-work text-[15px] text-cafe/70 max-w-[300px]">
                  Obrigado pelo interesse. Nossa equipe comercial entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      Seu Nome
                    </label>
                    <input
                      {...register("nome")}
                      type="text"
                      id="nome"
                      placeholder="Como podemos te chamar?"
                      className={cn(
                        "w-full rounded-[6px] border bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                        errors.nome ? "border-terracota focus-visible:ring-terracota/80" : "border-[#231302]/40 focus:border-terracota/60"
                      )}
                    />
                    {errors.nome && <p className="mt-2 font-work text-[13px] text-terracota">{errors.nome.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="empresa" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      Nome da Empresa
                    </label>
                    <input
                      {...register("empresa")}
                      type="text"
                      id="empresa"
                      placeholder="Empresa (Opcional)"
                      className={cn(
                        "w-full rounded-[6px] border bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                        "border-[#231302]/40 focus:border-terracota/60"
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      E-mail
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      placeholder="seu@email.com"
                      className={cn(
                        "w-full rounded-[6px] border bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                        errors.email ? "border-terracota focus-visible:ring-terracota/80" : "border-[#231302]/40 focus:border-terracota/60"
                      )}
                    />
                    {errors.email && <p className="mt-2 font-work text-[13px] text-terracota">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="telefone" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      Telefone / WhatsApp
                    </label>
                    <input
                      {...register("telefone")}
                      type="tel"
                      id="telefone"
                      placeholder="(11) 99999-9999"
                      className={cn(
                        "w-full rounded-[6px] border bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                        errors.telefone ? "border-terracota focus-visible:ring-terracota/80" : "border-[#231302]/40 focus:border-terracota/60"
                      )}
                    />
                    {errors.telefone && <p className="mt-2 font-work text-[13px] text-terracota">{errors.telefone.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="tipoEvento" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                    Tipo de Evento
                  </label>
                  <select
                    {...register("tipoEvento")}
                    id="tipoEvento"
                    className={cn(
                      "w-full rounded-[6px] border bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                      errors.tipoEvento ? "border-terracota focus-visible:ring-terracota/80" : "border-[#231302]/40 focus:border-terracota/60"
                    )}
                  >
                    <option value="">Selecione uma opção...</option>
                    <option value="Corporativo">Evento Corporativo</option>
                    <option value="Lancamento">Lançamento / Ativação de Loja</option>
                    <option value="Cursos">Cursos & Workshops</option>
                    <option value="Outros">Outro</option>
                  </select>
                  {errors.tipoEvento && <p className="mt-2 font-work text-[13px] text-terracota">{errors.tipoEvento.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dataEstimada" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      Data (Estimada)
                    </label>
                    <input
                      {...register("dataEstimada")}
                      type="date"
                      id="dataEstimada"
                      className="w-full rounded-[6px] border border-[#231302]/40 bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all focus-visible:bg-white focus-visible:border-terracota/60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota"
                    />
                  </div>
                  <div>
                    <label htmlFor="convidados" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                      Nº Convidados
                    </label>
                    <input
                      {...register("convidados")}
                      type="number"
                      id="convidados"
                      placeholder="Ex: 100"
                      className="w-full rounded-[6px] border border-[#231302]/40 bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:border-terracota/60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mensagem" className="mb-2 block font-sans text-[14px] font-bold text-[#231302]">
                    Detalhes Adicionais (Opcional)
                  </label>
                  <textarea
                    {...register("mensagem")}
                    id="mensagem"
                    rows={4}
                    placeholder="Conte um pouco mais sobre o formato do evento e o que você imagina..."
                    className="w-full resize-none rounded-[6px] border border-[#231302]/40 bg-creme-light px-4 py-4 font-work text-[15px] text-[#231302] outline-none transition-all placeholder:text-[#231302]/50 focus-visible:bg-white focus-visible:border-terracota/60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#E52933] py-4 font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-[#FFFBCC] transition-all hover:bg-[#E52933]/90 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    "Solicitar Proposta"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
