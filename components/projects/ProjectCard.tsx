import { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowRight, MapPin } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    ongoing: 'bg-primary-light text-primary-foreground',
    upcoming: 'bg-accent text-accent-foreground',
    completed: 'bg-secondary text-secondary-foreground',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {project.images && project.images.length > 0 && (
        <div className="relative h-48 w-full">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}>
            {project.status.toUpperCase()}
          </span>
          {project.category && (
            <span className="text-xs text-foreground/60">{project.category}</span>
          )}
        </div>
        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
        <div className="flex items-center text-sm text-foreground/60 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {project.location}
        </div>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/60">
            {formatDate(project.startDate)}
          </span>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/projects/${project.id}`}>
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

