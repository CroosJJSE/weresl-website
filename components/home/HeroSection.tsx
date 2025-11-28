'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80"
          alt="Tea plantations in Sri Lanka"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 text-teal-400">
          We Are Sri Lanka
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto">
          Forerunners of Restoration & Revival in Sri Lanka
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
        >
          <Link href="#our-initiatives">
            What We Do
          </Link>
        </Button>
      </div>
    </section>
  );
}

