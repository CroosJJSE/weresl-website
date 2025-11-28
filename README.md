# WE'RE SL Website

Modern website for WE'RE SL (Women's Empowerment & Rural Economic Sustainability Sri Lanka), migrated from WordPress to Next.js and Firebase.

## Project Structure

```
weresl-website/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utilities and Firebase config
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── weresl-admin/          # Admin portal (separate React app)
```

## Tech Stack

### Public Website
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Deployment**: Vercel

### Admin Portal
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google Sign-In)
- **Deployment**: Firebase Hosting

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Vercel account (for public site deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd weresl-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
# Fill in your Firebase credentials
```

4. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Firebase Authentication (Google provider)
5. Copy your Firebase config to `.env.local`

## Deployment

### Public Website (Vercel)

```bash
npm run build
vercel --prod
```

### Admin Portal (Firebase Hosting)

```bash
cd weresl-admin
npm run build
firebase deploy --only hosting
```

## Features

- ✅ Responsive design matching original WordPress site
- ✅ Project showcase (Ark, Eden, Embrace, Invicta, Keystone, Metamorphosis)
- ✅ Instagram feed integration
- ✅ Contact forms
- ✅ Newsletter subscription
- ✅ Admin portal for content management
- ✅ Firebase backend for scalability

## Content Management

Access the admin portal at `admin-weresl.web.app` (after deployment) to:
- Manage pages and content
- Add/edit projects
- Manage testimonials
- Update timeline events
- Manage subscribers
- Configure settings

## Documentation

- [Content Inventory](./CONTENT_INVENTORY.md) - Original website content structure
- [Migration Guide](./MIGRATION_GUIDE.md) - Detailed migration documentation
- [Admin Portal Setup](./ADMIN_PORTAL_SETUP.md) - Admin portal setup instructions

## Support

For issues or questions, contact: hello@weresl.org

## License

Copyright © 2024 WE'RE SL. All rights reserved.
