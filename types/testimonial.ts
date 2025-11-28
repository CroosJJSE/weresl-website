export interface Testimonial {
  id: string;
  name: string;
  location: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  quote?: string;
  date: Date | string;
  projectId?: string;
  createdAt: Date | string;
}

