import type { Metadata } from "next";
import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-var",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ritero",
    default: "Ritero — Cafés Especiais do Brasil",
  },
  description:
    "Do grão à xícara, sem pressa. Cafés especiais de fazendas brasileiras com torra artesanal e rastreabilidade de origem.",
  openGraph: {
    title: "Ritero — Cafés Especiais do Brasil",
    description: "Cafés especiais com torra artesanal e rastreabilidade de origem.",
    url: "https://ritero.com.br",
    siteName: "Ritero",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritero — Cafés Especiais do Brasil",
    description: "Cafés especiais de fazendas brasileiras com torra artesanal e rastreabilidade de origem.",
  }
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ritero Cafés Especiais",
  "url": "https://ritero.com.br",
  "logo": "https://ccyqvsfnygvrmpffldvo.supabase.co/storage/v1/object/sign/cafes/headeremail.png",
  "description": "Torrefação e loja de cafés especiais de fazendas brasileiras.",
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ritero",
  "url": "https://ritero.com.br",
};

import { NavigationWrapper } from "@/components/NavigationWrapper";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
      </head>
      <body>
        <AuthProvider>
          <UserProvider>
            <NavigationWrapper>{children}</NavigationWrapper>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
