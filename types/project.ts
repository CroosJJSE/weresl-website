export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
  startDate: Date | string;
  endDate?: Date | string;
  location: string;
  images: string[];
  budget?: number;
  impactMetrics: {
    beneficiaries?: number;
    areasCovered?: string;
    [key: string]: any;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type ProjectStatus = 'upcoming' | 'ongoing' | 'completed';

