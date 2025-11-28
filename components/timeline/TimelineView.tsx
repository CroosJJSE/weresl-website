'use client';

import { useEffect, useState } from 'react';
import { getTimelineEvents } from '@/lib/firebase/firestore';
import { TimelineEvent } from '@/types/timeline';
import { TimelineEventCard } from './TimelineEventCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function TimelineView() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getTimelineEvents(selectedYear || undefined);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching timeline events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [selectedYear]);

  // Get unique years from events
  const years = Array.from(new Set(events.map(e => e.year))).sort((a, b) => b - a);
  const allYears = Array.from({ length: 2025 - 2020 + 1 }, (_, i) => 2020 + i).reverse();

  if (loading) {
    return <div className="text-center py-12">Loading timeline...</div>;
  }

  return (
    <div>
      {/* Year Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedYear === null ? 'default' : 'outline'}
          onClick={() => setSelectedYear(null)}
          size="sm"
        >
          All Years
        </Button>
        {allYears.map((year) => (
          <Button
            key={year}
            variant={selectedYear === year ? 'default' : 'outline'}
            onClick={() => setSelectedYear(year)}
            size="sm"
          >
            {year}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block overflow-x-auto pb-8">
          <div className="flex space-x-8 min-w-max px-8">
            {allYears.map((year, yearIndex) => {
              const yearEvents = events.filter(e => e.year === year);
              if (selectedYear !== null && selectedYear !== year) return null;
              
              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: yearIndex * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="sticky top-0 bg-neutral-cream pb-4 z-10">
                    <h3 className="text-3xl font-heading font-bold text-primary mb-4">{year}</h3>
                    <div className="h-1 bg-primary rounded-full" />
                  </div>
                  <div className="mt-4 space-y-4">
                    {yearEvents.length === 0 ? (
                      <p className="text-sm text-foreground/60">No events recorded</p>
                    ) : (
                      yearEvents.map((event) => (
                        <TimelineEventCard key={event.id} event={event} />
                      ))
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          {allYears.map((year) => {
            const yearEvents = events.filter(e => e.year === year);
            if (selectedYear !== null && selectedYear !== year) return null;
            
            return (
              <div key={year} className="mb-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-heading font-bold text-primary mr-4">{year}</h3>
                  <div className="flex-1 h-1 bg-primary rounded-full" />
                </div>
                <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                  {yearEvents.length === 0 ? (
                    <p className="text-sm text-foreground/60">No events recorded</p>
                  ) : (
                    yearEvents.map((event) => (
                      <TimelineEventCard key={event.id} event={event} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

