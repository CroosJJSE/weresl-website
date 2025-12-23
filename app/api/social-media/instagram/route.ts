import { NextRequest, NextResponse } from 'next/server';
import { upsertSocialMediaPost } from '@/lib/firebase/firestore';
import { SocialMediaPost } from '@/types/social-media';

/**
 * Fetch Instagram posts using Instagram Basic Display API or Graph API
 * For Business/Creator accounts, use Instagram Graph API
 * For Personal accounts, use Instagram Basic Display API
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json(
        { error: 'Instagram credentials not configured' },
        { status: 500 }
      );
    }

    // Using Instagram Graph API (for Business/Creator accounts)
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}&limit=20`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Failed to fetch Instagram posts' },
        { status: 500 }
      );
    }

    const posts: SocialMediaPost[] = [];

    for (const item of data.data || []) {
      // Filter for reels (videos) and regular posts
      const mediaUrl = item.media_type === 'VIDEO' 
        ? (item.thumbnail_url || item.media_url)
        : item.media_url;

      const post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'> = {
        platform: 'instagram',
        externalId: item.id,
        caption: item.caption || '',
        mediaUrl: mediaUrl,
        mediaType: item.media_type === 'VIDEO' ? 'video' : item.media_type === 'CAROUSEL_ALBUM' ? 'carousel' : 'image',
        permalink: item.permalink,
        timestamp: new Date(item.timestamp),
        likes: item.like_count || 0,
        comments: item.comments_count || 0,
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
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

