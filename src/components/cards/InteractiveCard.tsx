"use client";

import { useMemo } from "react";
import nubankData from "@/bins/nubank_bins.json";
import bbData from "@/bins/bb_mastercard_bins.json";
import bradescoData from "@/bins/bradesco_bins.json";
import itauMasterData from "@/bins/itau_mastercard_bins.json";
import itauVisaMasterData from "@/bins/itau_visa_mastercard_bins.json";
import santanderData from "@/bins/santander_bins.json";

import { NubankCard } from "./NubankCard";
import { BancoDoBrasilCard } from "./BancoDoBrasilCard";
import { ItauCard } from "./ItauCard";
import { SantanderCard } from "./SantanderCard";
import { BradescoCard } from "./BradescoCard";
import { GenericCard } from "./GenericCard";
import { CardProps } from "./types";

// Achata todos os JSONs num array único
const ALL_BINS = [
  ...nubankData.bins.map((b) => ({ bin: b.bin, theme: "nubank", issuer: nubankData.issuer })),
  ...bbData.bins.map((b) => ({ bin: b.bin, theme: "bb", issuer: bbData.issuer })),
  ...bradescoData.bins.map((b) => ({ bin: b.bin, theme: "bradesco", issuer: bradescoData.issuer })),
  ...itauMasterData.bins.map((b) => ({ bin: b.bin, theme: "itau", issuer: itauMasterData.issuer })),
  ...itauVisaMasterData.bins.map((b) => ({ bin: b.bin, theme: "itau", issuer: itauVisaMasterData.issuer })),
  ...santanderData.bins.map((b) => ({ bin: b.bin, theme: "santander", issuer: santanderData.issuer })),
];

function detectIssuer(cardNumber: string) {
  const digits = cardNumber.replace(/\D/g, "");

  const match = ALL_BINS
    .filter((entry) => digits.startsWith(entry.bin))
    .sort((a, b) => b.bin.length - a.bin.length)[0]; // mais longo primeiro

  return match ?? { theme: "default", issuer: null };
}

const CARD_COMPONENTS: Record<string, React.FC<CardProps>> = {
  nubank: NubankCard,
  bb: BancoDoBrasilCard,
  itau: ItauCard,
  santander: SantanderCard,
  bradesco: BradescoCard,
  default: GenericCard,
};

export function InteractiveCard(props: CardProps) {
  const { number: cardNumber } = props;

  const { theme } = useMemo(() => detectIssuer(cardNumber || ""), [cardNumber]);

  const CardComponent = CARD_COMPONENTS[theme] ?? CARD_COMPONENTS.default;

  return <CardComponent {...props} />;
}
