"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "./CartDrawer";

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavigation = pathname === "/login" || pathname === "/checkout";

  return (
    <CartProvider>
      {!hideNavigation && <Navbar />}
      <CartDrawer />
      <main>{children}</main>
      {!hideNavigation && <Footer />}
    </CartProvider>
  );
}
