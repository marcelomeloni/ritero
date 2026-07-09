import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onde encontrar",
  description:
    "Veja a lista de cafeterias, empórios e pontos de venda parceiros onde você pode provar e comprar os cafés especiais da Ritero perto de você.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
