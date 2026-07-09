import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso do site e serviços da Ritero Cafés Especiais.",
};

export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-creme pt-24 pb-32">
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <h1 className="font-fraunces text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.01em] text-preto">
          Termos de Uso
        </h1>
        <p className="mt-4 font-work text-[15px] text-cafe/60">
          Última atualização: Julho de 2026
        </p>

        <div className="mt-12 space-y-10 font-work text-[16px] leading-[1.8] text-preto/80">
          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar o site da <strong>Ritero Cafés Especiais</strong>, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site ou nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              2. Compras e Pagamentos
            </h2>
            <p>
              Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito de descontinuar qualquer produto a qualquer momento. Os preços dos nossos produtos estão sujeitos a alterações sem aviso prévio. Os pagamentos são processados de forma segura e a confirmação do pedido está sujeita à aprovação do pagamento pelas instituições financeiras.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              3. Entregas e Frete
            </h2>
            <p>
              Os prazos de entrega informados no checkout são estimativas. A Ritero se compromete a despachar o café fresco no menor tempo possível, geralmente entre 1 a 3 dias úteis após a confirmação do pagamento. O código de rastreio será enviado por e-mail assim que o pedido for postado.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              4. Política de Devolução e Trocas
            </h2>
            <p>
              Por se tratar de um produto alimentício de consumo rápido (café em grãos ou moído), trocas e devoluções são aceitas apenas em casos de defeito na embalagem ou envio de produto incorreto. O prazo para reclamação é de até 7 dias corridos após o recebimento da mercadoria, conforme o Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              5. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones de botões, imagens e compilações de dados, é de propriedade da Ritero ou de seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-[22px] font-semibold text-preto mb-4">
              6. Contato
            </h2>
            <p>
              Para dúvidas ou solicitações relacionadas a estes Termos de Uso, entre em contato através do e-mail: <strong>suporte@ritero.com.br</strong> ou pelo nosso WhatsApp de atendimento.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
