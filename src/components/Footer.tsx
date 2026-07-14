import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/sobre", label: "A Ritero" },
  { href: "/cafes", label: "Nossos Cafés" },
  { href: "/onde-comprar", label: "Onde Encontrar" },
  { href: "/contato", label: "Contato" },
];

const LEGAL_LINKS = [
  { href: "/termos-de-uso", label: "Termos" },
  { href: "/privacidade", label: "Privacidade" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-creme-light">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 md:px-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
            <Image 
              src="/logosimples.png" 
              alt="Ritero" 
              width={200} 
              height={62} 
              className="h-auto w-[160px] md:w-[180px]" 
            />
          </Link>
          <p className="mt-3 max-w-[300px] font-work text-[14px] leading-relaxed text-cafe/90">
            Cafés especiais de fazendas brasileiras.
          </p>
        </div>

        {/* Nav */}
        <div>
          <span className="font-mono text-[16px] font-bold tracking-[0.14em] uppercase text-terracota">
            Navegação
          </span>
          <ul className="mt-5 flex flex-col gap-[2px]">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-[6px] font-work text-[14px] font-medium text-cafe transition-colors duration-300 hover:text-terracota"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className="font-mono text-[16px] font-bold tracking-[0.14em] uppercase text-terracota">
            Fale conosco
          </span>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="https://wa.me/5519971020797"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] font-medium tracking-[0.02em] text-cafe transition-colors duration-300 hover:text-terracota"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/riterocafes/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] font-medium tracking-[0.02em] text-cafe transition-colors duration-300 hover:text-terracota"
            >
              Instagram
            </a>
            <a
              href="mailto:contato@ritero.com.br"
              className="font-mono text-[13px] font-medium tracking-[0.02em] text-cafe transition-colors duration-300 hover:text-terracota"
            >
              E-mail
            </a>
          </div>

          <div className="mt-8 flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-cafe/70 transition-colors duration-300 hover:text-terracota"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
