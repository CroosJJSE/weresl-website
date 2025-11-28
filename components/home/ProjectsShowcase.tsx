'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  {
    slug: '/eden',
    title: 'Eden',
    description: 'Agriculture & Revival of Land',
    image: 'https://weresl.org/wp-content/uploads/2024/11/eden.png',
  },
  {
    slug: '/metamorphosis',
    title: 'metamorpho i',
    description: 'Entrepreneurship & Rehabilitation',
    image: 'https://weresl.org/wp-content/uploads/2024/11/metamorphosis.png',
  },
  {
    slug: '/keystone',
    title: 'key tone',
    description: 'Construction & Restoration',
    image: 'https://weresl.org/wp-content/uploads/2024/11/keystone.png',
  },
  {
    slug: '/ark',
    title: 'ARK',
    description: 'Animal Husbandry',
    image: 'https://weresl.org/wp-content/uploads/2024/11/ark.png',
  },
  {
    slug: '/embrace',
    title: 'EMBRACE',
    description: 'Children & Education',
    image: 'https://weresl.org/wp-content/uploads/2024/11/embrace.png',
  },
  {
    slug: '/invicta',
    title: 'INVICTA',
    description: 'Disaster Relief & Outreach',
    image: 'https://weresl.org/wp-content/uploads/2024/11/invicta.png',
  },
];

export function ProjectsShowcase() {
  return (
    <section id="our-initiatives" className="py-16 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.slug} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={project.slug}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

