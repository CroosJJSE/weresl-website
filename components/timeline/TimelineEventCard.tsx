import { TimelineEvent } from '@/types/timeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Card className="hover:shadow-md transition-shadow">
      {event.images && event.images.length > 0 && (
        <div className="relative h-48 w-full">
          <Image
            src={event.images[0]}
            alt={event.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center text-sm text-foreground/60 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          {monthNames[event.month - 1]} {event.year}
          {event.category && (
            <>
              <span className="mx-2">•</span>
              <span>{event.category}</span>
            </>
          )}
        </div>
        <CardTitle className="text-lg">{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {event.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

