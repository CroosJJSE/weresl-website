# WE'RE SL Website Migration Guide

## Overview

This guide documents the migration from WordPress (weresl.org) to Next.js + Firebase.

## Architecture

### Public Website (Next.js)
- **Location**: Root directory
- **Deployment**: Vercel
- **URL**: weresl.org (after migration)

### Admin Portal (React)
- **Location**: `weresl-admin/` directory (to be created)
- **Deployment**: Firebase Hosting
- **URL**: admin-weresl.web.app

## Firebase Collections Structure

### pages
```typescript
{
  id: string;
  slug: string; // 'home', 'about-us', 'ark', etc.
  title: string;
  sections: Array<{
    type: 'hero' | 'content' | 'gallery' | 'timeline' | 'testimonials';
    order: number;
    data: any; // Section-specific data
  }>;
  isPublished: boolean;
  updatedAt: timestamp;
  updatedBy: string; // User email
}
```

### projects
```typescript
{
  id: string;
  title: string;
  slug: string; // 'ark', 'eden', etc.
  description: string;
  longDescription: string;
  images: string[]; // Firebase Storage URLs
  date: timestamp;
  category: string;
  isUpcoming: boolean;
  isPublished: boolean;
  order: number;
}
```

### testimonials
```typescript
{
  id: string;
  name: string;
  youtubeUrl: string;
  thumbnail: string;
  description: string;
  date: timestamp;
  isPublished: boolean;
}
```

### timeline
```typescript
{
  id: string;
  year: number;
  events: Array<{
    month: string;
    title: string;
    description: string;
    images: string[];
    link?: string;
  }>;
}
```

### googleSheetLinks
```typescript
{
  id: string;
  title: string;
  url: string;
  description: string;
  order: number;
  isPublished: boolean;
}
```

### subscribers
```typescript
{
  email: string; // Document ID
  subscribedAt: timestamp;
  isActive: boolean;
}
```

### settings
```typescript
{
  id: 'general'; // Single document
  siteName: string;
  logo: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  paymentInfo: {
    gpayNumber?: string;
    gpayQR?: string;
    bankDetails?: {
      accountName: string;
      accountNumber: string;
      bank: string;
      branch: string;
    };
  };
}
```

## Migration Steps

### Phase 1: Content Extraction ✅
- [x] Analyze existing website
- [x] Document structure and content
- [x] Extract images and assets

### Phase 2: Setup
- [ ] Initialize Firebase project
- [ ] Set up Firestore collections
- [ ] Configure Firebase Storage
- [ ] Set up Firebase Authentication

### Phase 3: Public Website
- [x] Update Next.js structure
- [x] Match original design
- [ ] Create all page routes
- [ ] Implement Firebase data fetching
- [ ] Add Instagram feed integration

### Phase 4: Admin Portal
- [ ] Create React admin app
- [ ] Implement authentication
- [ ] Build CRUD interfaces
- [ ] Add image upload functionality
- [ ] Implement rich text editor

### Phase 5: Deployment
- [ ] Deploy public site to Vercel
- [ ] Deploy admin portal to Firebase
- [ ] Configure custom domains
- [ ] Set up SSL certificates

### Phase 6: Content Migration
- [ ] Import existing content to Firestore
- [ ] Upload images to Firebase Storage
- [ ] Test all functionality
- [ ] Go live

## Environment Variables

### Public Website (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Admin Portal (.env)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Notes

- Preserve original design exactly
- Ensure mobile responsiveness
- Maintain SEO optimization
- Keep all existing URLs working (redirects if needed)
- Test thoroughly before going live

