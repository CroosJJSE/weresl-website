'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjects } from '@/lib/firebase/firestore';
import { Project } from '@/types/project';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function FeaturedProject() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const projects = await getProjects({ status: 'ongoing' });
        if (projects.length > 0) {
          setProject(projects[0]);
        }
      } catch (error) {
        console.error('Error fetching featured project:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="h-64 bg-neutral-cream rounded-lg animate-pulse" />
        </div>
      </section>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Project</h2>
          <p className="text-lg text-foreground/70">Our current focus on creating sustainable impact</p>
        </div>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {project.images && project.images.length > 0 && (
              <div className="relative h-64 md:h-auto">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-light text-primary-foreground">
                  {project.status.toUpperCase()}
                </span>
                <span className="text-sm text-foreground/60">{project.location}</span>
              </div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="text-base">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70 mb-6 line-clamp-3">{project.longDescription}</p>
              <Button asChild>
                <Link href={`/projects/${project.id}`}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}

