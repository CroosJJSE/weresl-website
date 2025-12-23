import { NextRequest, NextResponse } from 'next/server';

/**
 * Sync all social media platforms
 * This endpoint can be called by a cron job (Vercel Cron) to auto-populate content
 */
export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
      request.headers.get('origin') || 
      'http://localhost:3000';

    const results: Record<string, { success: boolean; count?: number; error?: string }> = {};

    // Sync Instagram
    try {
      const instagramResponse = await fetch(`${baseUrl}/api/social-media/instagram`);
      const instagramData = await instagramResponse.json();
      results.instagram = {
        success: instagramResponse.ok,
        count: instagramData.count,
        error: instagramData.error,
      };
    } catch (error: any) {
      results.instagram = { success: false, error: error.message };
    }

    // Sync YouTube
    try {
      const youtubeResponse = await fetch(`${baseUrl}/api/social-media/youtube`);
      const youtubeData = await youtubeResponse.json();
      results.youtube = {
        success: youtubeResponse.ok,
        count: youtubeData.count,
        error: youtubeData.error,
      };
    } catch (error: any) {
      results.youtube = { success: false, error: error.message };
    }


    const totalSuccess = Object.values(results).filter(r => r.success).length;
    const totalCount = Object.values(results).reduce((sum, r) => sum + (r.count || 0), 0);

    return NextResponse.json({
      success: true,
      message: `Synced ${totalSuccess} of ${Object.keys(results).length} platforms`,
      totalPosts: totalCount,
      results,
    });
  } catch (error: any) {
    console.error('Error syncing social media:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync social media' },
      { status: 500 }
    );
  }
}

