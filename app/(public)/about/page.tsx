import { getTeamMembers } from '@/lib/firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - WE\'RE SL',
  description: 'Learn about WE\'RE SL\'s mission, vision, and team working to empower rural communities in Sri Lanka',
};

export default async function AboutPage() {
  let teamMembers = [];
  try {
    teamMembers = await getTeamMembers();
  } catch (error) {
    console.error('Error fetching team members:', error);
  }

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About WE'RE SL</h1>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
          <div className="prose max-w-none text-foreground/80">
            <p className="text-lg mb-4">
              WE'RE SL was founded to address the critical challenges facing rural communities in Sri Lanka, 
              particularly focusing on sustainable agriculture and women's economic empowerment. Through 
              community-driven initiatives, we work to revitalize agricultural lands, provide training and 
              resources, and create lasting economic opportunities.
            </p>
            <p className="text-lg">
              Our approach is rooted in collaboration, sustainability, and respect for local knowledge and 
              cultural heritage. We believe that lasting change comes from empowering communities to lead 
              their own development.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xl text-foreground/80">
                To empower rural communities in Sri Lanka through sustainable agricultural practices, 
                economic development programs, and women's leadership initiatives that create lasting 
                positive change.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold mb-6">Our Vision</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xl text-foreground/80">
                A thriving rural Sri Lanka where every community has access to sustainable livelihoods, 
                quality education, and economic opportunities, while preserving environmental integrity 
                and cultural heritage.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Community-Centered Approach',
              'Environmental Sustainability',
              'Women\'s Empowerment',
              'Transparency & Accountability',
              'Cultural Respect',
              'Collaborative Partnership',
            ].map((value) => (
              <Card key={value}>
                <CardContent className="pt-6">
                  <p className="font-semibold text-primary">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {teamMembers.length > 0 && (
          <section>
            <h2 className="text-3xl font-heading font-bold mb-6">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  {member.imageUrl && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="font-semibold text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

