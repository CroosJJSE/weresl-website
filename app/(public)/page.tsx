import { HeroSection } from '@/components/home/HeroSection';
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsShowcase />
      <section className="py-16 bg-white text-center">
        <div className="container">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-white"
          >
            <Link href="/about-us">Our Story</Link>
          </Button>
        </div>
      </section>
      <InstagramFeed />
      <section className="py-16 bg-primary text-white text-center">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <Button 
            asChild 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Link href="/get-involved">REACH US</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

