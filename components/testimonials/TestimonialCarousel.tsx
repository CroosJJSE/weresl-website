'use client';

import { useEffect, useState } from 'react';
import { getTestimonials } from '@/lib/firebase/firestore';
import { Testimonial } from '@/types/testimonial';
import { VideoPlayer } from './VideoPlayer';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Voices from Our Communities</h2>
          <p className="text-lg text-foreground/70">Hear directly from those whose lives have been transformed</p>
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="relative">
              <VideoPlayer testimonial={current} />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-heading font-semibold mb-2">{current.name}</h3>
                <p className="text-foreground/60 mb-4">{current.location}</p>
                {current.quote && (
                  <blockquote className="text-lg italic text-foreground/80">
                    "{current.quote}"
                  </blockquote>
                )}
              </div>
              {testimonials.length > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <Button variant="ghost" size="icon" onClick={prev}>
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-foreground/20'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" onClick={next}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

