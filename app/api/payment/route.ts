import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { sendEmail, getEmailTemplate } from '@/lib/email';
import { z } from 'zod';

const paymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('LKR'),
  donorEmail: z.string().email().optional(),
  donorName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, donorEmail, donorName } = paymentSchema.parse(body);

    // Store donation record
    await addDoc(collection(db, 'donations'), {
      amount,
      currency,
      donorEmail: donorEmail || null,
      donorName: donorName || 'Anonymous',
      createdAt: Timestamp.fromDate(new Date()),
      status: 'completed',
    });

    // Send confirmation email if email provided
    if (donorEmail) {
      const emailTemplate = getEmailTemplate('donation');
      await sendEmail({
        to: donorEmail,
        subject: 'Thank you for your donation to WE\'RE SL',
        html: emailTemplate,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Donation recorded successfully' 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process donation. Please try again.' },
      { status: 500 }
    );
  }
}

