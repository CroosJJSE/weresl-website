import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, getEmailTemplate } from '@/lib/email';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = contactSchema.parse(body);

    // Send email to organization
    const adminEmail = process.env.ADMIN_EMAIL || 'info@weresl.org';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5016;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
    });

    // Send confirmation to user
    const confirmationTemplate = getEmailTemplate('contact');
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting WE\'RE SL',
      html: confirmationTemplate,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

