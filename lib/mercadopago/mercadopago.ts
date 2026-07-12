import { MercadoPagoConfig } from 'mercadopago';

export const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO!,
  options: { timeout: 5000 },
});
