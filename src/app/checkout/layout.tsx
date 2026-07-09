import Image from "next/image";
import Link from "next/link";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-creme selection:bg-terracota selection:text-white">
      {/* Header Seguro e Minimalista */}
      <header className="border-b border-line bg-creme-light/95">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image 
              src="/riteroca.png" 
              alt="Ritero" 
              width={120} 
              height={40} 
              className="h-auto w-[100px] md:w-[120px]" 
              priority
            />
          </Link>
          <div className="flex items-center gap-2 text-cafe/70">
            <Lock size={18} weight="bold" />
            <span className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase">
              Pagamento Seguro
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main>{children}</main>
    </div>
  );
}
