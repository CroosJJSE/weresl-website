import { NextRequest, NextResponse } from 'next/server';
import { createSubscriber } from '@/lib/firebase/firestore';
import { sendEmail, getEmailTemplate } from '@/lib/email';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Create subscriber in Firestore
    await createSubscriber(email);

    // Send confirmation email
    const emailTemplate = getEmailTemplate('subscription').replace('{{email}}', email);
    await sendEmail({
      to: email,
      subject: 'Welcome to WE\'RE SL Newsletter',
      html: emailTemplate,
    });

    return NextResponse.json({ success: true, message: 'Successfully subscribed' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

