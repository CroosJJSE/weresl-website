import { NextRequest, NextResponse } from 'next/server';
import { upsertSocialMediaPost } from '@/lib/firebase/firestore';
import { SocialMediaPost } from '@/types/social-media';

/**
 * Fetch YouTube videos using YouTube Data API v3
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: 'YouTube credentials not configured' },
        { status: 500 }
      );
    }

    // First, get the uploads playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();

    if (channelData.error || !channelData.items?.[0]) {
      return NextResponse.json(
        { error: 'Failed to fetch channel information' },
        { status: 500 }
      );
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Fetch videos from the uploads playlist
    const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    if (videosData.error) {
      console.error('YouTube API Error:', videosData.error);
      return NextResponse.json(
        { error: videosData.error.message || 'Failed to fetch YouTube videos' },
        { status: 500 }
      );
    }

    const posts: SocialMediaPost[] = [];

    for (const item of videosData.items || []) {
      const videoId = item.contentDetails.videoId;
      const snippet = item.snippet;

      // Get video statistics
      const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;
      const statsResponse = await fetch(statsUrl);
      const statsData = await statsResponse.json();
      const stats = statsData.items?.[0]?.statistics || {};

      const post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'> = {
        platform: 'youtube',
        externalId: videoId,
        caption: snippet.title || snippet.description || '',
        mediaUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        mediaType: 'video',
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        timestamp: new Date(snippet.publishedAt),
        likes: parseInt(stats.likeCount || '0'),
        comments: parseInt(stats.commentCount || '0'),
        views: parseInt(stats.viewCount || '0'),
      };

      await upsertSocialMediaPost(post);
      posts.push(post as SocialMediaPost);
    }

    return NextResponse.json({ 
      success: true, 
      count: posts.length,
      posts 
    });
  } catch (error: any) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch YouTube videos' },
      { status: 500 }
    );
  }
}

