"use client";

import { useState, useCallback } from "react";
import { CreditCard, QrCode, Bank } from "@phosphor-icons/react/dist/ssr";
import { InteractiveCard } from "@/components/cards/InteractiveCard";

type PaymentMethod = "pix" | "credit" | "debit";

interface PaymentStepProps {
  addressId: string | null;
  shippingCost: number | null;
  shippingOption?: { name: string; prazo: number } | null;
}

export function PaymentStep({ addressId, shippingCost, shippingOption }: PaymentStepProps) {
  const [method, setMethod] = useState<PaymentMethod>("credit");

  return (
    <section className="mt-4 border-t border-line/60 pt-10 lg:mt-6 lg:pt-12">
      <div className="flex items-center gap-4 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota font-mono text-[13px] font-bold text-white">
          3
        </span>
        <h2 className="font-fraunces text-[24px] font-semibold text-preto">
          Pagamento
        </h2>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={() => setMethod("credit")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-[8px] border py-4 font-mono text-[12px] font-bold uppercase tracking-[0.05em] transition-all ${
            method === "credit"
              ? "border-preto bg-preto text-white"
              : "border-line/80 bg-white text-cafe/70 hover:border-terracota/50 hover:bg-terracota/5 hover:text-terracota"
          }`}
        >
          <CreditCard size={18} weight={method === "credit" ? "fill" : "regular"} />
          Crédito
        </button>
        <button
          onClick={() => setMethod("pix")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-[8px] border py-4 font-mono text-[12px] font-bold uppercase tracking-[0.05em] transition-all ${
            method === "pix"
              ? "border-preto bg-preto text-white"
              : "border-line/80 bg-white text-cafe/70 hover:border-terracota/50 hover:bg-terracota/5 hover:text-terracota"
          }`}
        >
          <QrCode size={18} weight={method === "pix" ? "fill" : "regular"} />
          PIX
        </button>
        <button
          onClick={() => setMethod("debit")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-[8px] border py-4 font-mono text-[12px] font-bold uppercase tracking-[0.05em] transition-all ${
            method === "debit"
              ? "border-preto bg-preto text-white"
              : "border-line/80 bg-white text-cafe/70 hover:border-terracota/50 hover:bg-terracota/5 hover:text-terracota"
          }`}
        >
          <Bank size={18} weight={method === "debit" ? "fill" : "regular"} />
          Débito
        </button>
      </div>

      {/* Roteamento Dinâmico dos Formulários */}
      <div className="rounded-[8px] border border-line/60 bg-white p-6 shadow-sm">
        {method === "pix" && <PixForm addressId={addressId} shippingCost={shippingCost} shippingOption={shippingOption} />}
        {method === "credit" && <CreditCardForm addressId={addressId} shippingCost={shippingCost} shippingOption={shippingOption} />}
        {method === "debit" && <DebitCardForm addressId={addressId} shippingCost={shippingCost} shippingOption={shippingOption} />}
      </div>
    </section>
  );
}

// ─── Submódulos de Pagamento ──────────────────────────────────────────────────

import { useCart } from "@/contexts/CartContext";
import { CAFES } from "@/data/cafes";

import { useEffect } from "react";

function PixForm({ addressId, shippingCost, shippingOption }: { addressId: string | null, shippingCost: number | null, shippingOption?: { name: string; prazo: number } | null }) {
  const { items, coupon, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<"idle" | "generating" | "qr" | "approving" | "done">("idle");
  const [pixData, setPixData] = useState<{ qr_code: string, qr_code_base64: string, id: string, valor_total?: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const checkStatus = async (orderId: string, token: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/pedidos/${orderId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const order = await res.json();
        if (order.status === "PREPARANDO" || order.status === "PAGO" || order.status === "ENVIADO") {
          setStep("done");
          clearCart();
          setTimeout(() => {
            window.location.href = `/sucesso?orderId=${orderId}`;
          }, 2000);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // Reseta o estado do PIX caso o usuário altere o frete, cupom ou itens do carrinho
    setStep("idle");
    setPixData(null);
  }, [totalPrice, coupon, shippingCost, shippingOption]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "qr" && pixData?.id) {
      const token = localStorage.getItem("ritero_client_token") || "";
      interval = setInterval(() => {
        checkStatus(pixData.id, token);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [step, pixData]);

  const handleGeneratePix = async () => {
    if (!addressId) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }
    if (shippingCost === null) {
      alert("Aguarde o cálculo do frete.");
      return;
    }

    setStep("generating");
    const token = localStorage.getItem("ritero_client_token");

    const payload = {
      itens: items.map(item => {
        const realCafe = CAFES.find(c => c.slug === item.slug);
        return {
          id: realCafe ? realCafe.id : item.id,
          peso_gramas: item.peso_gramas || (item.id.includes("-1kg") ? 1000 : 250),
          moagem: item.moagem || "Em grão",
          quantidade: item.quantidade,
          preco: item.preco
        };
      }),
      id_endereco_entrega: addressId,
      codigo_cupom: coupon?.codigo || null,
      metodo_pagamento: "pix",
      valor_frete: shippingCost,
      transportadora: shippingOption?.name,
      prazo_entrega: shippingOption?.prazo
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/pedidos/checkout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao gerar PIX");
      }

      const pedido = await res.json();

      if (pedido.pix_qr_code_base64) {
        setPixData({ 
          qr_code: pedido.pix_qr_code, 
          qr_code_base64: pedido.pix_qr_code_base64,
          id: pedido.id,
          valor_total: pedido.valor_total
        });
        setStep("qr");
      } else {
        throw new Error("Não foi possível gerar o código PIX.");
      }
    } catch (err: any) {
      alert(err.message);
      setStep("idle");
    }
  };

  if (step === "done") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#2E7D32]/10 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#2E7D32" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-fraunces text-[22px] font-bold text-preto">Pagamento Aprovado!</h3>
        <p className="mt-2 font-work text-[14px] text-cafe/70 max-w-[300px]">
          Seu café já está sendo preparado com carinho ☕
        </p>
        <p className="mt-1 font-mono text-[11px] text-cafe/40 uppercase tracking-wider">Redirecionando...</p>
      </div>
    );
  }

  if (step === "qr" && pixData) {
    const discount = coupon
      ? (coupon.tipo === "PERCENTUAL" ? totalPrice * (coupon.valor / 100) : coupon.valor)
      : 0;
    // Usa o valor retornado pelo backend (se disponível), senão faz o cálculo do frontend como fallback
    const finalTotal = pixData.valor_total !== undefined 
      ? pixData.valor_total 
      : (totalPrice - discount + (shippingCost || 0));

    return (
      <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
        <div className="mb-6 relative flex h-48 w-48 items-center justify-center rounded-[12px] bg-white border-2 border-preto/10 p-4 shadow-lg overflow-hidden">
          <img src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} alt="QR Code PIX" className="w-full h-full object-cover" />
        </div>

        <h3 className="font-work text-[16px] font-medium text-preto">
          PIX gerado com sucesso!
        </h3>
        <p className="mt-1 font-fraunces text-[24px] font-bold text-preto">
          R$ {finalTotal.toFixed(2).replace(".", ",")}
        </p>
        <p className="mt-3 text-[13px] text-cafe/60 max-w-[280px]">
          Abra o app do seu banco e escaneie o código acima, ou copie e cole o código abaixo.
        </p>

        <div className="mt-4 w-full max-w-[320px] rounded-[8px] bg-creme-light border border-line/60 p-3 flex flex-col gap-2 items-center">
          <p className="font-mono text-[10px] text-cafe/50 break-all leading-relaxed tracking-wide line-clamp-3">
            {pixData.qr_code}
          </p>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(pixData.qr_code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={`text-[11px] font-bold uppercase hover:underline transition-colors ${copied ? "text-green-600 font-semibold" : "text-terracota"}`}
          >
            {copied ? "Copiado! ✓" : "Copiar Código"}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[12px] text-cafe/40">
          <div className="h-2 w-2 rounded-full bg-terracota animate-pulse" />
          <span className="font-mono uppercase tracking-wider">Aguardando Pagamento...</span>
        </div>

        {/* BOTAO PARA TESTE LOCAL / DEV */}
        <button
          onClick={async () => {
            try {
              const token = localStorage.getItem("ritero_client_token");
              const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
              await fetch(`${API_URL}/public/pedidos/${pixData.id}/pagar`, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` }
              });
              // O checkStatus que roda a cada 5s vai pegar essa mudanca e redirecionar
              alert("Pagamento simulado com sucesso! Aguarde o redirecionamento.");
            } catch (e) {
              console.error(e);
            }
          }}
          className="mt-6 rounded-[6px] border border-terracota bg-terracota/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-terracota hover:bg-terracota hover:text-white transition-colors"
        >
          [DEV] Simular Pagamento PIX
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
      <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-[12px] bg-creme-light border-2 border-dashed border-terracota/30 text-terracota">
        <QrCode size={80} weight="light" />
      </div>
      <h3 className="font-work text-[16px] font-medium text-preto">
        Pague instantaneamente com PIX
      </h3>
      <p className="mt-2 text-[13px] text-cafe/60 max-w-[280px]">
        O pagamento será aprovado instantaneamente e seu café começará a ser preparado.
      </p>
      <button
        onClick={handleGeneratePix}
        disabled={step === "generating"}
        className="mt-6 rounded-full bg-terracota px-10 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-preto hover:scale-[1.02] active:scale-95 disabled:opacity-50"
      >
        {step === "generating" ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Gerando...
          </span>
        ) : (
          "Gerar QR Code PIX"
        )}
      </button>
    </div>
  );
}

import { initMercadoPago } from '@mercadopago/sdk-react';
import createCardToken from '@mercadopago/sdk-react/esm/coreMethods/cardToken/create';
import CardNumber from '@mercadopago/sdk-react/esm/secureFields/cardNumber';
import ExpirationDate from '@mercadopago/sdk-react/esm/secureFields/expirationDate';
import SecurityCode from '@mercadopago/sdk-react/esm/secureFields/securityCode';

// Inicializa a SDK
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'APP_USR-78dc2e75-6a92-41a8-9fdd-10b4d525b18c');

const mpStyle = {
  color: '#000000',
  fontSize: '15px',
  fontFamily: 'monospace',
  placeholderColor: '#9CA3AF',
  height: '100%'
};

function CreditCardForm({ addressId, shippingCost, shippingOption }: { addressId: string | null, shippingCost: number | null, shippingOption?: { name: string; prazo: number } | null }) {
  const { items, coupon, clearCart, totalPrice } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCardNumberFocus = useCallback(() => setFocusedField("cardNumber"), []);
  const handleCardNumberBlur = useCallback(() => setFocusedField(null), []);
  const handleCardNumberBinChange = useCallback((e: any) => setCardNumber(e.bin ? e.bin + "0000000000" : ""), []);

  const handleExpiryFocus = useCallback(() => setFocusedField("expiry"), []);
  const handleExpiryBlur = useCallback(() => setFocusedField(null), []);

  const handleCvvFocus = useCallback(() => setFocusedField("cvv"), []);
  const handleCvvBlur = useCallback(() => setFocusedField(null), []);

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const handleCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!addressId) { setErrorMessage("Selecione um endereço de entrega."); return; }
    if (shippingCost === null) { setErrorMessage("Aguarde o cálculo do frete."); return; }
    if (!cardName || cpf.length < 14 || !email) {
      setErrorMessage("Preencha todos os campos de texto corretamente.");
      return;
    }

    setIsProcessing(true);
    try {
      const pk = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'APP_USR-78dc2e75-6a92-41a8-9fdd-10b4d525b18c';
      
      // 1. Obter Payment Method ID usando a API do Mercado Pago (BIN look-up)
      const cleanNumber = cardNumber.replace(/\D/g, '');
      const bin = cleanNumber.substring(0, 6);
      if (bin.length < 6) {
        throw new Error("Por favor, digite o número do cartão completamente.");
      }
      
      const pmRes = await fetch(`https://api.mercadopago.com/v1/payment_methods/search?public_key=${pk}&bin=${bin}`);
      const pmData = await pmRes.json();
      
      // Filtra os resultados buscando especificamente o tipo "credit_card"
      const creditMethod = pmData.results?.find((m: any) => m.payment_type_id === 'credit_card');
      if (!creditMethod) {
        throw new Error("Cartão não suportado ou número inválido. Verifique se é um cartão de crédito válido.");
      }
      const payment_method_id = creditMethod.id;

      // 2. Gerar Token do Cartão via SDK Core Methods
      // O MP já sabe ler os valores de dentro dos SecureFields montados na tela
      const tokenData: any = await createCardToken({
        cardholderName: cardName,
        identificationType: 'CPF',
        identificationNumber: cpf.replace(/\D/g, '')
      });

      if (!tokenData || tokenData.error || tokenData.cause || !tokenData.id) {
        console.error("Token Error:", tokenData);
        throw new Error(`Erro do MP ao gerar token: ${tokenData?.message || tokenData?.error} - Detalhes: ${JSON.stringify(tokenData?.cause)}`);
      }
      const token = tokenData.id;

      // 3. Enviar para o nosso Backend
      const authToken = localStorage.getItem("ritero_client_token");
      const payload = {
        itens: items.map(item => {
          const realCafe = CAFES.find(c => c.slug === item.slug);
          return {
            id: realCafe ? realCafe.id : item.id,
            peso_gramas: item.peso_gramas || (item.id.includes("-1kg") ? 1000 : 250),
            moagem: item.moagem || "Em grão",
            quantidade: item.quantidade,
            preco: item.preco
          };
        }),
        id_endereco_entrega: addressId,
        codigo_cupom: coupon?.codigo || null,
        metodo_pagamento: "cartao_credito",
        valor_frete: shippingCost,
        transportadora: shippingOption?.name,
        prazo_entrega: shippingOption?.prazo,
        formData: {
          token,
          payment_method_id,
          installments: 1, // Por enquanto 1 parcela fixa (poderia adicionar um select)
          payer: {
            email,
            identification: { type: 'CPF', number: cpf.replace(/\D/g, '') }
          }
        }
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/pedidos/checkout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao processar checkout");
      }

      const orderData = await res.json();
      clearCart();
      window.location.href = `/sucesso?orderId=${orderData.id}`;

    } catch (err: any) {
      console.error("Erro no onSubmit do Checkout:", err);
      if (Array.isArray(err)) {
        // O Mercado Pago retorna um array de erros de validação dos Iframes
        const msgs = err.map(e => e.message || e.code).join(", ");
        setErrorMessage(`Verifique os dados do cartão: ${msgs}`);
      } else {
        setErrorMessage(err.message || String(err));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 animate-fade-in">
      {/* O componente mágico do cartão ✨ */}
      <InteractiveCard number={cardNumber} name={cardName} expiry={expiry} cvv={cvv} isFlipped={focusedField === "cvv"} />
      
      {errorMessage && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Pagamento não aprovado</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Número do Cartão de Crédito
          </label>
          <div className="relative">
            <div className="w-full rounded-[6px] border border-line/80 bg-white pl-4 pr-10 h-[46px] flex flex-col justify-center transition-all focus-within:border-terracota focus-within:ring-2 focus-within:ring-terracota/10">
              <CardNumber 
                placeholder="0000 0000 0000 0000" 
                style={mpStyle}
                onBinChange={handleCardNumberBinChange}
                onFocus={handleCardNumberFocus}
                onBlur={handleCardNumberBlur}
              />
            </div>
            <CreditCard size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe/40" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Nome Impresso no Cartão
          </label>
          <input
            type="text"
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onFocus={() => setFocusedField("cardName")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] uppercase outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Validade
          </label>
          <div className="w-full rounded-[6px] border border-line/80 bg-white px-4 h-[46px] flex flex-col justify-center transition-all focus-within:border-terracota focus-within:ring-2 focus-within:ring-terracota/10">
            <ExpirationDate 
              placeholder="MM/AA" 
              style={mpStyle}
              onFocus={handleExpiryFocus}
              onBlur={handleExpiryBlur}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            CVV
          </label>
          <div className="w-full rounded-[6px] border border-line/80 bg-white px-4 h-[46px] flex flex-col justify-center transition-all focus-within:border-terracota focus-within:ring-2 focus-within:ring-terracota/10">
            <SecurityCode 
              placeholder="123" 
              style={mpStyle}
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
            />
          </div>
        </div>

        {/* Campos extras obrigatórios do MP */}
        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            CPF do Titular
          </label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpf}
            onFocus={() => setFocusedField("cpf")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-mono text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Email de Cobrança
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div className="sm:col-span-2 mt-6">
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-full bg-preto px-8 py-4 font-mono text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-terracota hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Processando...
              </>
            ) : (
              "Pagar com Crédito"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function DebitCardForm({ addressId, shippingCost, shippingOption }: { addressId: string | null, shippingCost: number | null, shippingOption?: { name: string; prazo: number } | null }) {
  const { items, coupon, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    setExpiry(value);
  };

  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const handleCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!addressId) { setErrorMessage("Selecione um endereço de entrega."); return; }
    if (shippingCost === null) { setErrorMessage("Aguarde o cálculo do frete."); return; }
    if (cardNumber.length < 18 || expiry.length < 5 || cvv.length < 3 || cpf.length < 14 || !email) {
      setErrorMessage("Preencha todos os campos corretamente.");
      return;
    }

    setIsProcessing(true);
    try {
      const pk = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'TEST-7c38cec5-8bca-4a3b-8865-d89797fb950d';
      
      // 1. Obter Payment Method ID usando a API do Mercado Pago (BIN look-up)
      const cleanNumber = cardNumber.replace(/\D/g, '');
      const bin = cleanNumber.substring(0, 6);
      const pmRes = await fetch(`https://api.mercadopago.com/v1/payment_methods/search?public_key=${pk}&bin=${bin}`);
      const pmData = await pmRes.json();
      
      // Filtra os resultados buscando especificamente o tipo "debit_card"
      const debitMethod = pmData.results?.find((m: any) => m.payment_type_id === 'debit_card');
      if (!debitMethod) {
        throw new Error("Cartão não suportado para a função débito. Verifique se este é realmente um cartão de débito.");
      }
      const payment_method_id = debitMethod.id;

      // 2. Gerar Token do Cartão
      const tokenRes = await fetch(`https://api.mercadopago.com/v1/card_tokens?public_key=${pk}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          card_number: cleanNumber,
          cardholder: { name: cardName, identification: { type: 'CPF', number: cpf.replace(/\D/g, '') } },
          security_code: cvv,
          expiration_month: parseInt(expiry.split('/')[0]),
          expiration_year: parseInt("20" + expiry.split('/')[1])
        })
      });
      const tokenData = await tokenRes.json();
      if (tokenData.error || tokenData.cause) {
        console.error("Token Error:", tokenData);
        throw new Error(`Erro do MP ao gerar token: ${tokenData.message || tokenData.error} - Detalhes: ${JSON.stringify(tokenData.cause)}`);
      }
      const token = tokenData.id;

      // 3. Enviar para o nosso Backend
      const authToken = localStorage.getItem("ritero_client_token");
      const payload = {
        itens: items.map(item => {
          const realCafe = CAFES.find(c => c.slug === item.slug);
          return {
            id: realCafe ? realCafe.id : item.id,
            peso_gramas: item.peso_gramas || (item.id.includes("-1kg") ? 1000 : 250),
            moagem: item.moagem || "Em grão",
            quantidade: item.quantidade,
            preco: item.preco
          };
        }),
        id_endereco_entrega: addressId,
        codigo_cupom: coupon?.codigo || null,
        metodo_pagamento: "cartao_debito",
        valor_frete: shippingCost,
        transportadora: shippingOption?.name,
        prazo_entrega: shippingOption?.prazo,
        formData: {
          token,
          payment_method_id,
          installments: 1, // Débito sempre é 1 parcela
          payer: {
            email,
            identification: { type: 'CPF', number: cpf.replace(/\D/g, '') }
          }
        }
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/pedidos/checkout`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao processar checkout via débito.");
      }

      const orderData = await res.json();
      clearCart();
      window.location.href = `/sucesso?orderId=${orderData.id}`;

    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 animate-fade-in">
      <InteractiveCard number={cardNumber} name={cardName} expiry={expiry} cvv={cvv} isFlipped={focusedField === "cvv"} />
      
      {errorMessage && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Pagamento não aprovado</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Número do Cartão de Débito
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumber}
              onFocus={() => setFocusedField("cardNumber")}
              onBlur={() => setFocusedField(null)}
              className="w-full rounded-[6px] border border-line/80 bg-white pl-4 pr-10 py-3 font-mono text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
              required
            />
            <Bank size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe/40" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Nome Impresso no Cartão
          </label>
          <input
            type="text"
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onFocus={() => setFocusedField("cardName")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] uppercase outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Validade
          </label>
          <input
            type="text"
            placeholder="MM/AA"
            value={expiry}
            onChange={handleExpiry}
            onFocus={() => setFocusedField("expiry")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-mono text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            CVV
          </label>
          <input
            type="text"
            placeholder="123"
            value={cvv}
            onChange={handleCvv}
            onFocus={() => setFocusedField("cvv")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-mono text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            CPF do Titular
          </label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpf}
            onFocus={() => setFocusedField("cpf")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-mono text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Email de Cobrança
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            required
          />
        </div>

        <div className="sm:col-span-2 mt-6">
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full rounded-full bg-preto px-8 py-4 font-mono text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-all hover:bg-terracota hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Processando...
              </>
            ) : (
              "Pagar com Débito"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
