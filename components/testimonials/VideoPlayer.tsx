'use client';

import { Testimonial } from '@/types/testimonial';
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export function VideoPlayer({ testimonial }: { testimonial: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYouTubeId(testimonial.youtubeUrl);

  if (!videoId) {
    return <div className="text-center text-foreground/60">Invalid YouTube URL</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const thumbnail = testimonial.thumbnailUrl || getYouTubeThumbnail(videoId);

  if (!playing) {
    return (
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden cursor-pointer group" onClick={() => setPlaying(true)}>
        <Image
          src={thumbnail}
          alt={testimonial.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
            <Play className="h-12 w-12 text-primary ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        title={testimonial.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

