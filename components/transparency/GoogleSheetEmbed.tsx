'use client';

import { TransparencySheet } from '@/types/transparency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GoogleSheetEmbedProps {
  sheet: TransparencySheet;
}

export function GoogleSheetEmbed({ sheet }: GoogleSheetEmbedProps) {
  // Construct the embed URL
  const sheetId = sheet.googleSheetId;
  const sheetName = sheet.sheetName || 'Sheet1';
  const embedUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing&rm=minimal&widget=true&headers=false`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sheet.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto" style={{ minHeight: '400px' }}>
          <iframe
            src={embedUrl}
            width="100%"
            height="600"
            frameBorder="0"
            style={{ border: 'none' }}
            title={sheet.title}
          />
        </div>
        <div className="mt-4">
          <a
            href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Open in Google Sheets →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

