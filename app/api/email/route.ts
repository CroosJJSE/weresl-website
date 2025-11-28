import { NextRequest, NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/firebase/firestore';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const broadcastSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'Email content is required'),
  subscriberIds: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, html, subscriberIds } = broadcastSchema.parse(body);

    // Get subscribers
    const allSubscribers = await getSubscribers(true);
    const recipients = subscriberIds
      ? allSubscribers.filter(s => subscriberIds.includes(s.id))
      : allSubscribers;

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 400 }
      );
    }

    // Send emails
    const emails = recipients.map(s => s.email);
    const success = await sendEmail({
      to: emails,
      subject,
      html,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send some emails' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Email sent to ${recipients.length} subscribers` 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Email broadcast error:', error);
    return NextResponse.json(
      { error: 'Failed to send email broadcast' },
      { status: 500 }
    );
  }
}

