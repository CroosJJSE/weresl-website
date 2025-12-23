export type SocialMediaPlatform = 'instagram' | 'youtube';

export interface SocialMediaPost {
  id: string;
  platform: SocialMediaPlatform;
  externalId: string; // Original ID from the platform
  caption: string;
  mediaUrl: string; // Image or video thumbnail
  mediaType: 'image' | 'video' | 'carousel';
  videoUrl?: string; // For YouTube and video posts
  permalink: string; // Link to the original post
  timestamp: Date | string;
  likes?: number;
  comments?: number;
  views?: number; // For YouTube
  createdAt: Date | string; // When cached in our system
  updatedAt: Date | string;
}

export interface SocialMediaConfig {
  instagram?: {
    accessToken?: string;
    userId?: string;
    username?: string;
  };
  youtube?: {
    apiKey?: string;
    channelId?: string;
  };
}

