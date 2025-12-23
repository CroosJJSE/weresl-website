# Social Media Auto-Population Setup Guide

This guide will help you connect your social media accounts to automatically populate the "Follow Our Journey" section on your website.

## Overview

The system automatically fetches posts from:
- **Instagram** (default tab)
- **YouTube**
- **Facebook**
- **LinkedIn**

Posts are cached in Firebase Firestore and automatically synced via scheduled API calls.

## Prerequisites

1. Firebase project set up (already configured)
2. Access to your social media accounts
3. Ability to create API keys/tokens for each platform

## Setup Instructions

### 1. Instagram Setup

#### Option A: Instagram Graph API (Recommended for Business/Creator Accounts)

1. **Convert to Business/Creator Account** (if not already):
   - Go to Instagram app → Settings → Account → Switch to Professional Account
   - Choose "Business" or "Creator"

2. **Create Facebook App**:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Choose "Business" type
   - Fill in app details

3. **Add Instagram Basic Display Product**:
   - In your Facebook App dashboard, go to "Add Products"
   - Find "Instagram Basic Display" and click "Set Up"
   - Follow the setup wizard

4. **Get Access Token**:
   - Go to Tools → Graph API Explorer
   - Select your app
   - Generate a User Token with permissions: `instagram_basic`, `pages_show_list`, `instagram_content_publish`
   - Exchange for Long-Lived Token (valid 60 days) or use Page Access Token

5. **Get User ID**:
   - Use Graph API Explorer: `GET /me/accounts`
   - Find your Instagram Business Account ID
   - Or use: `GET /{page-id}?fields=instagram_business_account`

6. **Add to Environment Variables**:
   ```env
   INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
   INSTAGRAM_USER_ID=your_instagram_user_id_here
   ```

#### Option B: Instagram Basic Display API (For Personal Accounts)

1. **Create Facebook App** (same as above)
2. **Add Instagram Basic Display Product**
3. **Create Test Users** or submit for App Review
4. **Get Access Token** via OAuth flow
5. Add to environment variables (same as above)

**Note**: Instagram Basic Display API has limitations and may not support reels. Graph API is recommended.

### 2. YouTube Setup

1. **Get YouTube Channel ID**:
   - Go to [YouTube Studio](https://studio.youtube.com/)
   - Go to Settings → Channel → Advanced settings
   - Your Channel ID is listed there (format: `UCxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - Or visit your channel and check the URL: `youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Create YouTube API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "YouTube Data API v3"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Restrict the API key to "YouTube Data API v3" (optional but recommended)

3. **Add to Environment Variables**:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   YOUTUBE_CHANNEL_ID=your_channel_id_here
   ```

### 3. Facebook Setup

1. **Create Facebook App** (if not already done for Instagram):
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app or use existing

2. **Get Page Access Token**:
   - Go to Tools → Graph API Explorer
   - Select your app
   - Add permissions: `pages_read_engagement`, `pages_show_list`, `pages_read_user_content`
   - Generate token and exchange for Page Access Token

3. **Get Page ID**:
   - Visit your Facebook page
   - Check the URL or use Graph API: `GET /me/accounts`
   - Find your page ID

4. **Add to Environment Variables**:
   ```env
   FACEBOOK_ACCESS_TOKEN=your_page_access_token_here
   FACEBOOK_PAGE_ID=your_page_id_here
   ```

### 4. LinkedIn Setup

**Note**: LinkedIn API has strict requirements and may require partnership approval for some endpoints.

#### Option A: LinkedIn Marketing API (Recommended)

1. **Create LinkedIn App**:
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Request access to "Marketing Developer Platform" (may require approval)

2. **Get OAuth 2.0 Token**:
   - In your app, go to "Auth" tab
   - Request permissions: `r_organization_social`, `w_organization_social`
   - Complete OAuth flow to get access token

3. **Get Organization ID**:
   - Use LinkedIn API: `GET /v2/organizationalEntityAcls`
   - Find your organization ID

4. **Add to Environment Variables**:
   ```env
   LINKEDIN_ACCESS_TOKEN=your_access_token_here
   LINKEDIN_ORGANIZATION_ID=your_organization_id_here
   ```

#### Option B: LinkedIn RSS Feed (Alternative)

If API access is not available, you can use LinkedIn's RSS feed:
- Visit your LinkedIn company page
- Add `/feed` to the URL to get RSS feed
- Parse RSS feed (requires additional implementation)

## Environment Variables

Add all your credentials to `.env.local`:

```env
# Instagram
INSTAGRAM_ACCESS_TOKEN=your_token_here
INSTAGRAM_USER_ID=your_user_id_here

# YouTube
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here

# Facebook
FACEBOOK_ACCESS_TOKEN=your_token_here
FACEBOOK_PAGE_ID=your_page_id_here

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your_token_here
LINKEDIN_ORGANIZATION_ID=your_organization_id_here

# Site URL (for sync endpoint)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Auto-Population Setup

### Option 1: Vercel Cron Jobs (Recommended)

If deploying on Vercel, create `vercel.json` in your project root:

```json
{
  "crons": [
    {
      "path": "/api/social-media/sync",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This syncs every 6 hours. Adjust schedule as needed:
- `0 */6 * * *` - Every 6 hours
- `0 */3 * * *` - Every 3 hours
- `0 * * * *` - Every hour

### Option 2: External Cron Service

Use services like:
- [cron-job.org](https://cron-job.org/)
- [EasyCron](https://www.easycron.com/)
- [Uptime Robot](https://uptimerobot.com/)

Set up a cron job to call:
```
https://your-domain.com/api/social-media/sync
```

### Option 3: Manual Sync

You can manually trigger sync by visiting:
```
https://your-domain.com/api/social-media/sync
```

Or call individual platform endpoints:
- `/api/social-media/instagram`
- `/api/social-media/youtube`
- `/api/social-media/facebook`
- `/api/social-media/linkedin`

## Testing

1. **Test Individual Platforms**:
   ```bash
   # Test Instagram
   curl http://localhost:3000/api/social-media/instagram
   
   # Test YouTube
   curl http://localhost:3000/api/social-media/youtube
   
   # Test Facebook
   curl http://localhost:3000/api/social-media/facebook
   
   # Test LinkedIn
   curl http://localhost:3000/api/social-media/linkedin
   ```

2. **Test Sync Endpoint**:
   ```bash
   curl http://localhost:3000/api/social-media/sync
   ```

3. **Check Firestore**:
   - Go to Firebase Console → Firestore
   - Check `social_media_posts` collection
   - Verify posts are being stored

4. **View on Website**:
   - Visit your homepage
   - Scroll to "Follow Our Journey" section
   - Test tab switching
   - Verify posts display correctly

## Troubleshooting

### Instagram
- **Error: Invalid Token**: Token may have expired. Generate a new long-lived token.
- **Error: User not found**: Verify your `INSTAGRAM_USER_ID` is correct.
- **No posts showing**: Ensure your account has posts and they're public.

### YouTube
- **Error: API key not valid**: Check your API key in Google Cloud Console.
- **Error: Channel not found**: Verify your `YOUTUBE_CHANNEL_ID` is correct.
- **Quota exceeded**: YouTube API has daily quotas. Check usage in Google Cloud Console.

### Facebook
- **Error: Invalid access token**: Token may have expired. Generate a new Page Access Token.
- **Error: Insufficient permissions**: Ensure you've granted all required permissions.

### LinkedIn
- **Error: Unauthorized**: LinkedIn API requires specific permissions and may need approval.
- **Limited posts**: LinkedIn API has strict rate limits and may not return all posts.

## Token Refresh

Most tokens expire after a certain period:

- **Instagram**: Long-lived tokens expire after 60 days. Set up token refresh.
- **Facebook**: Page Access Tokens can be long-lived. Check expiration.
- **YouTube**: API keys don't expire but should be rotated periodically.
- **LinkedIn**: Access tokens expire. Implement refresh flow.

## Security Notes

1. **Never commit `.env.local`** to version control
2. **Use environment variables** in production (Vercel, etc.)
3. **Restrict API keys** to specific domains/IPs when possible
4. **Rotate tokens** periodically
5. **Monitor API usage** to detect abuse

## Support

For issues or questions:
1. Check API documentation for each platform
2. Review error messages in API responses
3. Check Firebase Console for Firestore errors
4. Review server logs in Vercel dashboard

## Next Steps

1. Set up all social media accounts
2. Add environment variables
3. Test each platform individually
4. Set up auto-sync (cron job)
5. Monitor for a few days to ensure everything works
6. Adjust sync frequency as needed

