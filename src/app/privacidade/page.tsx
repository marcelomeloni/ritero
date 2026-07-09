import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Entenda como a Ritero Cafés Especiais protege e trata os seus dados pessoais.",
};

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-creme pt-24 pb-32">
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <h1 className="font-fraunces text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.01em] text-preto">
          Política de Privacidade
        </h1>
        <p className="mt-4 font-work text-[15px] text-cafe/60">
          Última atualização: Julho de 2026
        </p>

        <div className="mt-12 space-y-10 font-work text-[16px] leading-[1.8] text-preto/80">
          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              1. Nosso Compromisso com a Privacidade
            </h2>
            <p>
              A <strong>Ritero Cafés Especiais</strong> leva a sua privacidade a sério. Esta política descreve como coletamos, usamos, protegemos e compartilhamos os seus dados pessoais quando você visita nossa loja online ou realiza uma compra, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              2. Dados Coletados
            </h2>
            <p>
              Coletamos informações necessárias para processar seus pedidos e oferecer a melhor experiência possível. Isso inclui:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li><strong>Dados de identificação:</strong> Nome completo, CPF, e-mail e telefone.</li>
              <li><strong>Dados de entrega:</strong> Endereço completo para o envio dos seus cafés.</li>
              <li><strong>Dados de pagamento:</strong> Processados de forma segura pelos nossos gateways parceiros. Nós não armazenamos os dados do seu cartão de crédito.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              3. Como Usamos Seus Dados
            </h2>
            <p>
              Utilizamos suas informações exclusivamente para:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Processar, faturar e despachar seus pedidos.</li>
              <li>Enviar atualizações de rastreio e confirmação de entrega via e-mail.</li>
              <li>Atender a solicitações de suporte e devolução.</li>
              <li>Ocasionalmente, enviar ofertas exclusivas de novos lotes de café (apenas se você optar por receber nossas comunicações).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              4. Compartilhamento de Informações
            </h2>
            <p>
              Seus dados pessoais jamais serão vendidos. Eles são compartilhados apenas com parceiros estritamente necessários para a operação, como empresas de logística (Correios/Transportadoras) e provedores de pagamento homologados, que também cumprem rigorosas políticas de segurança.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              5. Segurança dos Seus Dados
            </h2>
            <p>
              Nosso sistema utiliza criptografia ponta a ponta e protocolos de segurança (SSL) para garantir que todas as transações e informações de login trafeguem de forma segura e protegida contra acessos não autorizados.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              6. Seus Direitos (LGPD)
            </h2>
            <p>
              Você tem o direito de solicitar a qualquer momento o acesso, correção ou exclusão dos seus dados pessoais armazenados em nosso banco de dados. Para exercer qualquer um desses direitos, basta nos enviar um e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              7. Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre nossa Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato através de: <strong>suporte@ritero.com.br</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
