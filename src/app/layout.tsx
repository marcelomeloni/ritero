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
  keywords: [
    "café especial",
    "cafés especiais",
    "café em grãos",
    "torra artesanal",
    "café brasileiro",
    "ritero",
    "ritero cafés",
    "café de origem única",
    "café SCA",
    "café premium",
    "comprar café especial",
    "café especial online",
    "café fazenda",
    "café artesanal brasil",
  ],
  openGraph: {
    title: "Ritero — Cafés Especiais do Brasil",
    description: "Cafés especiais com torra artesanal e rastreabilidade de origem.",
    url: "https://ritero.com.br",
    siteName: "Ritero",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://ritero.com.br/home.png",
        width: 1200,
        height: 630,
        alt: "Ritero — Cafés Especiais do Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritero — Cafés Especiais do Brasil",
    description: "Cafés especiais de fazendas brasileiras com torra artesanal e rastreabilidade de origem.",
    images: ["https://ritero.com.br/home.png"],
  },
  metadataBase: new URL("https://ritero.com.br"),
  alternates: {
    canonical: "https://ritero.com.br",
  },
};

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
  "name": "Ritero Cafés Especiais",
  "url": "https://ritero.com.br",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ritero.com.br/riteroca.png",
    "width": 512,
    "height": 512,
  },
  "image": "https://ritero.com.br/home.png",
  "description": "Torrefação e loja de cafés especiais de fazendas brasileiras. Selecionamos lotes com alta pontuação SCA, rastreabilidade de origem e torra artesanal.",
  "priceRange": "$$",
  "servesCuisine": "Café Especial",
  "areaServed": {
    "@type": "Country",
    "name": "Brasil",
  },
  "sameAs": [
    "https://www.instagram.com/riterocafes",
    "https://wa.me/5519996070041",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Portuguese",
    "url": "https://ritero.com.br",
  },
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ritero Cafés Especiais",
  "url": "https://ritero.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ritero.com.br/cafes?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
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
