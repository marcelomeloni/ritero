import Link from "next/link";
import Image from "next/image";
import { Leaf, Coffee, MapPinLine, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossa história",
  description: "Conheça a história da Ritero. Do grão à xícara, sem pressa. Valorizamos o produtor local e a torra perfeita para o seu café de todo dia.",
};

export default function Sobre() {
  return (
    <div className="min-h-screen bg-creme pt-[73px]">
      
      {/* ─── HERO SECTION ─── */}
      <section className="px-4 pt-4 md:px-8 md:pt-6">
        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden rounded-[16px] md:min-h-[75vh]">
          {/* Fundo fotográfico limpo */}
          <div className="absolute inset-0 z-0 bg-cafe">
            <Image 
              src="/fazenda.png"
              alt="Fazenda de café ao amanhecer"
              fill
              className="object-cover scale-105 transition-transform duration-1000"
              priority
            />
            {/* Scrim (Overlay) Escuro para contraste impecável com o texto */}
            <div className="absolute inset-0 bg-[#140F0A]/55"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1000px] text-center px-6 py-20 mt-8 md:mt-0">
            <h1 className="font-fraunces text-[clamp(36px,8vw,90px)] font-bold leading-[1.05] tracking-tight text-white drop-shadow-md md:mt-6">
              A Ritero nasceu <br className="hidden md:block" />
              <span className="text-creme-light italic">de um sonho.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ─── CORPO DA HISTÓRIA (Editorial Grid) ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          
          <div className="flex flex-col gap-8 font-work text-[16px] leading-[1.8] text-preto/80 md:text-[18px]">
            <p className="font-fraunces text-[24px] font-medium leading-[1.4] text-cafe md:text-[32px]">
              Uma empresa familiar, criada por Rafael e Raquel.
            </p>
            <p>
              O Rafael é engenheiro agrônomo, com 20 anos de experiência em pesquisa e desenvolvimento. Ao longo de sua carreira, trabalhou diretamente com cafés, incluindo uma das maiores fazendas produtoras do Sul de Minas Gerais.
            </p>
            <p>
              Sempre sonhou em construir um negócio que unisse seu conhecimento técnico e sua paixão profunda pela terra. Quando esse sonho começou a ganhar forma, nasceu a <strong>Ritero</strong>.
            </p>
            <p>
              Raquel assumiu o marketing e o relacionamento comercial da marca, levando a história e os cafés para cada cliente e parceiro.
            </p>
          </div>

          <div className="relative h-[450px] w-full overflow-hidden rounded-[4px] md:h-[600px]">
            <Image 
              src="/graos.png"
              alt="Grãos de café nas mãos"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Elemento decorativo */}
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full border border-terracota/30 bg-transparent"></div>
          </div>

        </div>

        <div className="mt-20 flex flex-col items-center text-center lg:mt-32">
          <Coffee size={40} weight="thin" className="text-terracota mb-6" />
          <h3 className="max-w-[800px] font-fraunces text-[clamp(24px,4vw,36px)] font-semibold italic leading-[1.3] text-cafe">
            "Ao longo desta jornada percebemos que a maioria das pessoas que gostam do 'cafezinho' não conhecem o verdadeiro café."
          </h3>
          <p className="mt-8 max-w-[700px] font-work text-[18px] leading-[1.8] text-preto/70">
            A Ritero ainda não produz seus próprios cafés. O trabalho atual é a seleção cuidadosa, escolhendo minuciosamente cada lote de acordo com o portfólio desenhado pela marca. Por isso, escolhemos parceiros sólidos, produtores comprometidos com a excelência e grãos selecionados rigorosamente pela sua qualidade e origem.
          </p>
        </div>
      </section>

      {/* ─── RITERO: RITUAL, TERRA E TERROIR ─── */}
      <section className="relative overflow-hidden bg-cafe px-6 py-24 text-creme-light md:px-10 md:py-32">
        {/* Marca d'água de fundo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="font-fraunces text-[clamp(100px,20vw,250px)] font-bold tracking-tighter">TERROIR</span>
        </div>
        
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <h2 className="font-fraunces text-[36px] font-bold tracking-tight md:text-[52px]">
            Ritero: Ritual, Terra e Terroir
          </h2>
          <p className="mt-8 font-work text-[18px] leading-[1.8] text-creme-light/80 md:text-[22px]">
            Cada café é um convite para desacelerar, apreciar e transformar o simples hábito de tomar café em um verdadeiro <strong className="text-amarelo-claro">ritual</strong>. Nossos cafés são produzidos em regiões reconhecidas pela excelência da cafeicultura brasileira, onde <strong className="text-amarelo-claro">solo, clima e altitude</strong> dão origem a características únicas que refletem a essência de cada <strong className="text-amarelo-claro">terroir</strong>.
          </p>
        </div>
      </section>

      {/* ─── O QUE É CAFÉ ESPECIAL E NOTAS SENSORIAIS ─── */}
      <section className="bg-creme-light relative mx-auto px-6 py-20 md:px-10 md:py-32 border-b border-line/40">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          
          <div className="flex flex-col rounded-[8px] bg-white p-10 shadow-[0_4px_40px_rgba(35,19,2,0.04)] transition-transform hover:-translate-y-1">
            <SealCheck size={48} weight="light" className="text-terracota mb-6" />
            <span className="font-mono text-[12px] font-bold tracking-[0.15em] uppercase text-cafe/50">
              Padrão Internacional
            </span>
            <h3 className="mt-2 font-fraunces text-[28px] font-bold leading-[1.2] text-preto md:text-[32px]">
              O que é um café especial?
            </h3>
            <p className="mt-5 font-work text-[16px] leading-[1.8] text-cafe/80 md:text-[18px]">
              Cafés especiais são aqueles que alcançam, no mínimo, <strong className="text-terracota">80 pontos</strong> em avaliações realizadas por provadores certificados seguindo padrões internacionais de qualidade. Essa avaliação considera atributos como <em>aroma, sabor, doçura, acidez, corpo, equilíbrio e finalização</em>.
            </p>
          </div>

          <div className="flex flex-col rounded-[8px] bg-white p-10 shadow-[0_4px_40px_rgba(35,19,2,0.04)] transition-transform hover:-translate-y-1">
            <Leaf size={48} weight="light" className="text-ouro mb-6" />
            <span className="font-mono text-[12px] font-bold tracking-[0.15em] uppercase text-cafe/50">
              100% Natural
            </span>
            <h3 className="mt-2 font-fraunces text-[28px] font-bold leading-[1.2] text-preto md:text-[32px]">
              O que são notas sensoriais?
            </h3>
            <p className="mt-5 font-work text-[16px] leading-[1.8] text-cafe/80 md:text-[18px]">
              Os cafés da Ritero <strong>não recebem aromatizantes</strong>, essências ou qualquer ingrediente adicional. Essas características são naturais e refletem a combinação da <strong>variedade, do terroir, do processo pós-colheita e da torra</strong>. Cada café possui uma identidade única e aromas distintos.
            </p>
          </div>

        </div>
      </section>

      {/* ─── TUDO COMEÇA ONDE O CAFÉ NASCE ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-32">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <MapPinLine size={40} className="text-terracota mb-4" />
          <h2 className="font-fraunces text-[36px] font-bold leading-[1.1] text-preto md:text-[52px]">
            Tudo Começa Onde o Café Nasce
          </h2>
          <p className="mt-6 max-w-[700px] font-work text-[18px] leading-[1.8] text-cafe/70">
            Selecionamos lotes que se destacam pela qualidade, origem e perfil sensorial, valorizando o trabalho dos produtores e a identidade de cada café.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          
          {/* Região 1 */}
          <div className="group relative overflow-hidden rounded-[8px] bg-preto text-creme-light">
            <div className="absolute inset-0 bg-terracota/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative z-10 flex h-full flex-col p-10 md:p-12">
              <h4 className="font-fraunces text-[28px] font-bold text-amarelo-claro md:text-[32px]">
                Região da Canastra (MG)
              </h4>
              <p className="mt-4 font-work text-[16px] leading-[1.8] text-creme-light/80 md:text-[18px]">
                Uma das mais tradicionais regiões cafeeiras de Minas Gerais, conhecida pelas condições ideais para a produção de cafés especiais.
              </p>
            </div>
          </div>

          {/* Região 2 */}
          <div className="group relative overflow-hidden rounded-[8px] bg-preto text-creme-light">
            <div className="absolute inset-0 bg-ouro/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative z-10 flex h-full flex-col p-10 md:p-12">
              <h4 className="font-fraunces text-[28px] font-bold text-amarelo-vivo md:text-[32px]">
                Região Vulcânica (SP)
              </h4>
              <p className="mt-4 font-work text-[16px] leading-[1.8] text-creme-light/80 md:text-[18px]">
                O Vale da Grama possui solos de origem vulcânica que proporcionam cafés complexos, com características sensoriais marcantes e acidez vibrante.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CALL TO ACTION FINAL ─── */}
      <section className="bg-amarelo-claro px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-[800px]">
          <h2 className="font-fraunces text-[32px] font-bold text-preto md:text-[44px]">
            Qualidade, Origem e Experiência em cada xícara.
          </h2>
          <p className="mt-6 font-work text-[18px] text-cafe/80 md:text-[22px]">
            O café nasce da terra, passa pelas mãos de quem cultiva com cuidado e chega à sua xícara carregando histórias e momentos especiais.
          </p>
          
          <div className="mt-12 flex justify-center">
            <Link
              href="/produtos"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-preto px-8 py-5 text-center font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-creme transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-preto/20 md:w-auto md:px-14"
            >
              Conheça nossos cafés
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
