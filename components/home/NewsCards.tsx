'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjects } from '@/lib/firebase/firestore';
import { Project } from '@/types/project';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function NewsCards() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const allProjects = await getProjects();
        // Get 3 most recent projects
        setProjects(allProjects.slice(0, 3));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-neutral-cream">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-cream">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Latest Updates</h2>
          <p className="text-lg text-foreground/70">Stay informed about our ongoing work</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    {project.status}
                  </span>
                  <span className="text-xs text-foreground/60">
                    {formatDate(project.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/projects/${project.id}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

