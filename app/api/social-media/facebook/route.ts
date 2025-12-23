import { NextRequest, NextResponse } from 'next/server';
import { upsertSocialMediaPost } from '@/lib/firebase/firestore';
import { SocialMediaPost } from '@/types/social-media';

/**
 * Fetch Facebook page posts using Facebook Graph API
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;

    if (!accessToken || !pageId) {
      return NextResponse.json(
        { error: 'Facebook credentials not configured' },
        { status: 500 }
      );
    }

    // Fetch posts from the Facebook page
    const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,permalink_url,attachments{media,subattachments},reactions.summary(true),comments.summary(true)&access_token=${accessToken}&limit=20`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Facebook API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Failed to fetch Facebook posts' },
        { status: 500 }
      );
    }

    const posts: SocialMediaPost[] = [];

    for (const item of data.data || []) {
      // Extract media URL from attachments
      let mediaUrl = '';
      let mediaType: 'image' | 'video' | 'carousel' = 'image';

      if (item.attachments?.data?.[0]) {
        const attachment = item.attachments.data[0];
        if (attachment.subattachments) {
          // Carousel post
          mediaType = 'carousel';
          mediaUrl = attachment.subattachments.data[0]?.media?.image?.src || '';
        } else if (attachment.media) {
          mediaUrl = attachment.media.image?.src || attachment.media.source || '';
          if (attachment.media.type === 'video') {
            mediaType = 'video';
          }
        }
      }

      const post: Omit<SocialMediaPost, 'id' | 'createdAt' | 'updatedAt'> = {
        platform: 'facebook',
        externalId: item.id,
        caption: item.message || '',
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        permalink: item.permalink_url || `https://www.facebook.com/${pageId}/posts/${item.id.split('_')[1]}`,
        timestamp: new Date(item.created_time),
        likes: item.reactions?.summary?.total_count || 0,
        comments: item.comments?.summary?.total_count || 0,
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
    console.error('Error fetching Facebook posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Facebook posts' },
      { status: 500 }
    );
  }
}

