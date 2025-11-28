// Email service using SendGrid or Resend

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const fromEmail = options.from || process.env.FROM_EMAIL || 'noreply@weresl.org';
  const fromName = process.env.FROM_NAME || "WE'RE SL";

  // Try Resend first if available
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = await import('resend');
      const client = new resend.Resend(process.env.RESEND_API_KEY);
      
      const recipients = Array.isArray(options.to) ? options.to : [options.to];
      const results = await Promise.all(
        recipients.map(to =>
          client.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to,
            subject: options.subject,
            html: options.html,
          })
        )
      );
      return results.every(r => r.error === null);
    } catch (error) {
      console.error('Resend error:', error);
    }
  }

  // Fallback to SendGrid
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: options.to,
        from: {
          email: fromEmail,
          name: fromName,
        },
        subject: options.subject,
        html: options.html,
      };

      await sgMail.send(msg);
      return true;
    } catch (error) {
      console.error('SendGrid error:', error);
      return false;
    }
  }

  console.warn('No email service configured');
  return false;
}

export function getEmailTemplate(type: 'subscription' | 'unsubscribe' | 'donation' | 'contact'): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const templates = {
    subscription: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5016;">Thank you for subscribing!</h2>
        <p>You've successfully subscribed to WE'RE SL newsletter. You'll receive updates about our projects and impact stories.</p>
        <p>If you didn't subscribe, please ignore this email.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          <a href="${baseUrl}/unsubscribe?email={{email}}">Unsubscribe</a>
        </p>
      </div>
    `,
    unsubscribe: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5016;">You've been unsubscribed</h2>
        <p>You've successfully unsubscribed from WE'RE SL newsletter.</p>
        <p>We're sorry to see you go. You can resubscribe anytime on our website.</p>
      </div>
    `,
    donation: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5016;">Thank you for your donation!</h2>
        <p>Your generous contribution helps us continue our mission of empowering rural communities in Sri Lanka.</p>
        <p>Your donation receipt will be sent separately.</p>
        <p>Thank you for making a difference!</p>
      </div>
    `,
    contact: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D5016;">Thank you for contacting us</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Best regards,<br>WE'RE SL Team</p>
      </div>
    `,
  };

  return templates[type];
}

