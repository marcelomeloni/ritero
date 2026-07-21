import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o cliente da Resend (certifique-se de configurar a variável de ambiente RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, empresa, email, telefone, tipoEvento, dataEstimada, convidados, mensagem } = body;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nova Solicitação de Orçamento - Ritero</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FFFBCC; padding: 20px; color: #231302;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 30px rgba(35,19,2,0.12);">
          <div style="background-color: #231302; padding: 30px; text-align: center; border-bottom: 4px solid #E52933;">
            <h1 style="color: #FFDB45; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Novo Pedido de Orçamento</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #231302; opacity: 0.9;">Você recebeu uma nova solicitação de orçamento de eventos através do site da Ritero.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 25px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; width: 40%;"><strong style="color: #231302;">Nome:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">Empresa:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${empresa || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">E-mail:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><a href="mailto:${email}" style="color: #E52933; text-decoration: none; font-weight: bold;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">Telefone:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${telefone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">Tipo de Evento:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${tipoEvento}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">Data Estimada:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${dataEstimada || 'Não informada'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC;"><strong style="color: #231302;">Nº de Convidados:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #FFFBCC; color: #231302; opacity: 0.8;">${convidados || 'Não informado'}</td>
              </tr>
            </table>

            <div style="margin-top: 30px;">
              <h3 style="color: #231302; font-size: 16px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensagem / Detalhes Adicionais:</h3>
              <div style="background-color: #FFFBCC; padding: 20px; border-left: 4px solid #E52933; border-radius: 4px;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #231302; opacity: 0.9;">${mensagem || 'Nenhuma mensagem adicional fornecida.'}</p>
              </div>
            </div>
          </div>
          <div style="background-color: #231302; padding: 20px; text-align: center; font-size: 12px; color: #FFFBCC; opacity: 0.7;">
            Esta mensagem foi gerada automaticamente pelo formulário de Eventos do site da Ritero.
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'Ritero Eventos <onboarding@resend.dev>', // Em produção, altere para um domínio verificado, ex: eventos@ritero.com.br
      to: ['eventos@ritero.com.br'],
      subject: \`Novo Orçamento de Evento: \${nome}\`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao enviar e-mail via Resend:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
