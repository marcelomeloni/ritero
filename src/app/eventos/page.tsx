import { Metadata } from "next";
import EventosClient from "./EventosClient";

export const metadata: Metadata = {
  title: "Ativação de Marca e Eventos | Ritero",
  description:
    "Leve a experiência da Ritero para o seu evento. Carrinho de café especial, baristas profissionais e cafés especiais para ações corporativas, eventos wellness, cursos e feiras.",
  keywords: [
    "carrinho de café",
    "barista para eventos",
    "café especial para eventos",
    "ativação de marca com café",
    "coffee break corporativo",
    "café para cursos e workshops",
    "carrinho de café gourmet",
  ],
  alternates: {
    canonical: "https://ritero.com.br/eventos",
  },
  openGraph: {
    title: "Ativação de Marca e Eventos | Ritero",
    description: "Leve a experiência da Ritero para o seu evento. Carrinho de café especial, baristas profissionais e cafés especiais.",
    url: "https://ritero.com.br/eventos",
    siteName: "Ritero",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://ritero.com.br/home.png", width: 1200, height: 630, alt: "Ritero Eventos" }],
  },
};

export default function EventosPage() {
  return <EventosClient />;
}
