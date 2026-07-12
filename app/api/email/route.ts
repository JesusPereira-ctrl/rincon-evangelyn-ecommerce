import SellerEmail from '@/emails/SellerEmail';
import { resend } from '@/lib/resend/resend';
import { NextResponse } from 'next/server';

export async function POST() {
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jesuspereirap100@gmail.com',
    subject: 'Test email',
    react: SellerEmail(),
  });

  return NextResponse.json('sending email');
}
