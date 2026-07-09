"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User, ShoppingBag, SignOut } from "@phosphor-icons/react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/produtos", label: "Nossos Cafés" },
  { href: "/sobre", label: "A Ritero" },
  { href: "/onde-comprar", label: "Onde Encontrar" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { totalItems, openCart } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
          setOpen(false); // Fecha o menu mobile se estiver aberto
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-line bg-creme-light/95 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="transition-transform duration-300 hover:scale-105">
          <Image 
            src="/riteroca.png" 
            alt="Ritero" 
            width={140} 
            height={46} 
            className="h-auto w-[120px] md:w-[140px]" 
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-work text-[14px] font-medium tracking-[0.02em] text-cafe/80 transition-all duration-300 hover:text-terracota after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-terracota after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Divisória e Ícones Desktop */}
          <div className="ml-2 h-4 w-[1px] bg-line"></div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/minha-conta"
                  className="group flex items-center justify-center px-4 h-10 rounded-full border border-line/60 text-cafe/90 transition-all duration-300 hover:border-terracota hover:bg-terracota/5 hover:text-terracota"
                  aria-label="Minha Conta"
                >
                  <span className="font-work text-[13px] font-medium mr-2">Olá, {(user.nome || "Cliente").split(" ")[0]}</span>
                  <User size={18} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
                </Link>
                <button
                  onClick={logout}
                  className="group flex items-center justify-center h-10 w-10 rounded-full text-cafe/50 transition-all duration-300 hover:text-terracota hover:bg-terracota/5"
                  title="Sair"
                >
                  <SignOut size={18} weight="bold" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="group flex items-center justify-center h-10 w-10 rounded-full border border-line/60 text-cafe/90 transition-all duration-300 hover:border-terracota hover:bg-terracota/5 hover:text-terracota"
                aria-label="Entrar"
              >
                <User size={18} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
              </Link>
            )}

            <button
              onClick={openCart}
              className="group relative flex items-center justify-center h-10 w-10 rounded-full border border-line/60 text-cafe/90 transition-all duration-300 hover:border-terracota hover:bg-terracota/5 hover:text-terracota"
              aria-label="Ver sacola"
            >
              <ShoppingBag size={18} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracota px-1 font-mono text-[10px] font-bold text-white shadow-sm ring-2 ring-creme-light">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={openCart}
            className="relative flex items-center justify-center text-cafe/90 transition-colors hover:text-terracota"
            aria-label="Ver sacola"
          >
            <ShoppingBag size={22} weight="bold" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-terracota px-1 font-mono text-[9px] font-bold text-white ring-2 ring-creme-light">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <Link href="/minha-conta" className="text-terracota transition-colors flex items-center gap-1">
              <User size={22} weight="fill" />
            </Link>
          ) : (
            <Link href="/login" className="text-cafe/90 transition-colors hover:text-terracota">
              <User size={22} weight="bold" />
            </Link>
          )}
          
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-[5px]"
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] w-5 bg-preto transition-all duration-300 ${open ? "translate-y-[3.25px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-preto transition-all duration-300 ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-creme-light/95 backdrop-blur-md transition-all duration-500 ease-in-out md:hidden ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 font-work text-[15px] font-medium text-cafe/90 transition-colors duration-300 hover:text-terracota"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
