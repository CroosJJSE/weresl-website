'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you for subscribing!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <Card className="bg-primary-light border-primary-light">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-heading">
              Stay Updated with Our Latest Projects
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Subscribe to our newsletter to receive updates about our impact stories and upcoming initiatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white text-foreground"
                />
              </div>
              <Button type="submit" disabled={loading} className="bg-secondary hover:bg-secondary/90">
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {message && (
              <p className={`text-center mt-4 text-sm ${
                message.type === 'success' ? 'text-green-200' : 'text-red-200'
              }`}>
                {message.text}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

