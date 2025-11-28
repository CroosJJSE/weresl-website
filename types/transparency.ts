export interface TransparencySheet {
  id: string;
  title: string;
  googleSheetId: string;
  sheetName?: string;
  category: 'financial' | 'impact' | 'donors' | 'other';
  order: number;
}

