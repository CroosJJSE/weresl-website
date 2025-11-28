'use client';

import { useEffect, useState } from 'react';
import { getTestimonials } from '@/lib/firebase/firestore';
import { Testimonial } from '@/types/testimonial';
import { VideoPlayer } from '@/components/testimonials/VideoPlayer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/utils';
import Image from 'next/image';
import { Play, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
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

  if (loading) {
    return (
      <div className="py-16 bg-neutral-cream min-h-screen">
        <div className="container">
          <div className="text-center">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Voices from Our Communities
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear directly from those whose lives have been transformed
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12 text-foreground/60">
            No testimonials available yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => {
              const videoId = extractYouTubeId(testimonial.youtubeUrl);
              const thumbnail = testimonial.thumbnailUrl || (videoId ? getYouTubeThumbnail(videoId) : '');

              return (
                <Card
                  key={testimonial.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  {thumbnail && (
                    <div className="relative aspect-video bg-black group">
                      <Image
                        src={thumbnail}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {testimonial.location}
                    </CardDescription>
                  </CardHeader>
                  {testimonial.quote && (
                    <CardContent>
                      <p className="text-sm italic text-foreground/70 line-clamp-2">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Video Modal */}
        {selectedTestimonial && (
          <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedTestimonial.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <VideoPlayer testimonial={selectedTestimonial} />
                {selectedTestimonial.quote && (
                  <blockquote className="mt-4 text-lg italic text-foreground/80">
                    "{selectedTestimonial.quote}"
                  </blockquote>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

