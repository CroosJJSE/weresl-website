import { TimelineView } from '@/components/timeline/TimelineView';

export const metadata = {
  title: 'Impact Timeline - WE\'RE SL',
  description: 'Explore our journey of impact year by year, from 2020 to present',
};

export default function TimelinePage() {
  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Journey of Impact
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our activities and achievements year by year
          </p>
        </div>
        <TimelineView />
      </div>
    </div>
  );
}

