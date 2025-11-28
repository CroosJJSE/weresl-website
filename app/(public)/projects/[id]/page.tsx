import { getProject, getProjects } from '@/lib/firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate, formatCurrency } from '@/lib/utils';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  const statusColors = {
    ongoing: 'bg-primary-light text-primary-foreground',
    upcoming: 'bg-accent text-accent-foreground',
    completed: 'bg-secondary text-secondary-foreground',
  };

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${statusColors[project.status]} mb-4`}>
            {project.status.toUpperCase()}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-foreground/70">{project.description}</p>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <div className="relative h-96 w-full">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {project.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative h-24 rounded overflow-hidden">
                    <Image src={img} alt={`${project.title} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{project.location}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/60 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Start Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{formatDate(project.startDate)}</p>
            </CardContent>
          </Card>
          {project.budget && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/60">Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{formatCurrency(project.budget)}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
          </CardContent>
        </Card>

        {project.impactMetrics && Object.keys(project.impactMetrics).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Impact Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {project.impactMetrics.beneficiaries && (
                  <div>
                    <p className="text-sm text-foreground/60">Beneficiaries</p>
                    <p className="text-2xl font-bold text-primary">{project.impactMetrics.beneficiaries.toLocaleString()}</p>
                  </div>
                )}
                {project.impactMetrics.areasCovered && (
                  <div>
                    <p className="text-sm text-foreground/60">Areas Covered</p>
                    <p className="text-2xl font-bold text-primary">{project.impactMetrics.areasCovered}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

