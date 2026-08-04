import { Metadata } from "next";
import OndeComprarClient from "./OndeComprarClient";

export const metadata: Metadata = {
  title: "Onde Encontrar",
  description: "Confeitarias, empórios e pontos selecionados que vendem os cafés especiais da Ritero.",
  alternates: {
    canonical: "/onde-comprar",
  },
};

export default function OndeComprar() {
  return <OndeComprarClient />;
}
