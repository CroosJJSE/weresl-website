export interface TimelineEvent {
  id: string;
  year: number;
  month: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  projectId?: string;
  createdAt: Date | string;
}

