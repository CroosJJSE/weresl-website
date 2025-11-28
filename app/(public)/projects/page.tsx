import { getProjects } from '@/lib/firebase/firestore';
import { ProjectGrid } from '@/components/projects/ProjectGrid';

export const metadata = {
  title: 'Projects - WE\'RE SL',
  description: 'Explore our ongoing and completed projects creating sustainable impact across Sri Lanka',
};

export default async function ProjectsPage() {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Creating Sustainable Impact Across Sri Lanka
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our projects focus on sustainable agriculture, women's empowerment, and rural economic development
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

