import { resend } from '@/lib/resend/resend';

const SELLER_EMAIL = process.env.SELLER_EMAIL!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;

// TODO: cambiar el from dependiendo del dominio que tengamos
// TODO: cambiar el correo de respuesta cuando estén listos

// TODO: Agregar descripción de la compra para dar a conocer lo que compro
export const sendEmailToSeller = async (
  buyerName: string,
  buyerAddress: string,
  buyerPhoneNumber: string,
) => {
  const { data, error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: SELLER_EMAIL,
    subject: 'Pedido realizado en la web',
    html: `
      <h1>Titulo del correo</h1>
      <ul>
        <li>${buyerName}</li>
        <li>${buyerAddress}</li>
        <li>${buyerPhoneNumber}</li>
      </ul>
    `,
  });

  if (error) {
    console.error('Error enviando correo al vendedor:', error);
    throw new Error('SELLER_EMAIL_SEND_FAILED');
  }

  return data;
};

// TODO: Agregar descripción de la compra para dar a conocer lo que compro
export const sendEmailToBuyer = async (email: string) => {
  const { data, error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: email,
    subject: 'Pedido realizado en la web',
    html: `
      <h1>Titulo del correo</h1>
      <span>Pedido confirmado</span>
    `,
  });

  if (error) {
    console.error('Error enviando correo al comprador:', error);
    throw new Error('BUYER_EMAIL_SEND_FAILED');
  }

  return data;
};
