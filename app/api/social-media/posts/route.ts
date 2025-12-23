import { NextRequest, NextResponse } from 'next/server';
import { getSocialMediaPosts } from '@/lib/firebase/firestore';
import { SocialMediaPlatform } from '@/types/social-media';

/**
 * Get cached social media posts from Firestore
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get('platform') as SocialMediaPlatform | null;
    const limit = parseInt(searchParams.get('limit') || '20');

    const posts = await getSocialMediaPosts(platform || undefined, limit);

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error: any) {
    console.error('Error fetching social media posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

