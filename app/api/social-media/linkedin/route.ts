import { NextRequest, NextResponse } from 'next/server';
import { upsertSocialMediaPost } from '@/lib/firebase/firestore';
import { SocialMediaPost } from '@/types/social-media';

/**
 * Fetch LinkedIn posts using LinkedIn Marketing API
 * Note: LinkedIn API requires OAuth 2.0 and has strict requirements
 * Alternative: Use RSS feed or third-party service
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

    if (!accessToken || !organizationId) {
      return NextResponse.json(
        { error: 'LinkedIn credentials not configured' },
        { status: 500 }
      );
    }

    // Using LinkedIn Marketing API (Posts API)
    // Note: This requires specific permissions and may need adjustments
    const url = `https://api.linkedin.com/v2/shares?q=owners&owners=${organizationId}&count=20`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });

    const data = await response.json();

    if (data.serviceErrorCode || response.status !== 200) {
      console.error('LinkedIn API Error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to fetch LinkedIn posts' },
        { status: 500 }
      );
    }

    const posts: SocialMediaPost[] = [];

    // LinkedIn API structure may vary - adjust based on actual response
    for (const item of data.elements || []) {
      const post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'> = {
        platform: 'linkedin',
        externalId: item.id || item.activity,
        caption: item.text?.text || '',
        mediaUrl: item.content?.media?.id ? 
          `https://media.licdn.com/dms/image/${item.content.media.id}` : '',
        mediaType: item.content?.media ? 'image' : 'image',
        permalink: item.resharedShare?.permalink || 
          `https://www.linkedin.com/feed/update/${item.id}`,
        timestamp: new Date(item.created?.time || Date.now()),
        likes: item.numLikes || 0,
        comments: item.numComments || 0,
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
    console.error('Error fetching LinkedIn posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch LinkedIn posts' },
      { status: 500 }
    );
  }
}

