'use client';

import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const filters = [
    { value: 'all' as const, label: 'All Projects' },
    { value: 'ongoing' as const, label: 'Ongoing' },
    { value: 'upcoming' as const, label: 'Upcoming' },
    { value: 'completed' as const, label: 'Completed' },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            onClick={() => setFilter(f.value)}
            size="sm"
          >
            {f.label}
          </Button>
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 text-foreground/60">
          No projects found in this category.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

