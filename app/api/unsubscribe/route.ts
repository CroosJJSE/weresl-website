import { NextRequest, NextResponse } from 'next/server';
import { unsubscribe } from '@/lib/firebase/firestore';
import { sendEmail, getEmailTemplate } from '@/lib/email';
import { z } from 'zod';

const unsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = unsubscribeSchema.parse(body);

    await unsubscribe(email);

    const emailTemplate = getEmailTemplate('unsubscribe');
    await sendEmail({
      to: email,
      subject: 'Unsubscribed from WE\'RE SL Newsletter',
      html: emailTemplate,
    });

    return NextResponse.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}

