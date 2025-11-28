import { getTransparencySheets } from '@/lib/firebase/firestore';
import { GoogleSheetEmbed } from '@/components/transparency/GoogleSheetEmbed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

export const metadata = {
  title: 'Transparency - WE\'RE SL',
  description: 'Our commitment to transparency and accountability in financial and impact reporting',
};

export default async function TransparencyPage() {
  let financialSheets = [];
  let impactSheets = [];
  let donorSheets = [];
  let otherSheets = [];

  try {
    const allSheets = await getTransparencySheets();
    financialSheets = allSheets.filter(s => s.category === 'financial');
    impactSheets = allSheets.filter(s => s.category === 'impact');
    donorSheets = allSheets.filter(s => s.category === 'donors');
    otherSheets = allSheets.filter(s => s.category === 'other');
  } catch (error) {
    console.error('Error fetching transparency sheets:', error);
  }

  return (
    <div className="py-16 bg-neutral-cream min-h-screen">
      <div className="container max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Commitment to Transparency
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We believe in complete accountability to our donors and communities
          </p>
        </div>

        {/* Financial Overview */}
        {financialSheets.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Financial Overview</h2>
            <div className="space-y-6">
              {financialSheets.map((sheet) => (
                <GoogleSheetEmbed key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </section>
        )}

        {/* Impact Metrics */}
        {impactSheets.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Impact Metrics</h2>
            <div className="space-y-6">
              {impactSheets.map((sheet) => (
                <GoogleSheetEmbed key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </section>
        )}

        {/* Donor Information */}
        {donorSheets.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Donor Contributions</h2>
            <div className="space-y-6">
              {donorSheets.map((sheet) => (
                <GoogleSheetEmbed key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </section>
        )}

        {/* Other Reports */}
        {otherSheets.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Additional Reports</h2>
            <div className="space-y-6">
              {otherSheets.map((sheet) => (
                <GoogleSheetEmbed key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </section>
        )}

        {/* Annual Reports */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6">Annual Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[2024, 2023, 2022, 2021, 2020].map((year) => (
              <Card key={year} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>{year} Annual Report</CardTitle>
                  </div>
                  <CardDescription>
                    Complete overview of our activities and impact for {year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#" download>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

