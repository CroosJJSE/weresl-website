# Admin Portal Setup Guide

## Overview

The admin portal is a separate React application that will be deployed to Firebase Hosting. It provides a user-friendly interface for managing all website content.

## Setup Instructions

### 1. Create React Admin Project

```bash
# In the root directory
npm create vite@latest weresl-admin -- --template react-ts
cd weresl-admin
npm install
```

### 2. Install Dependencies

```bash
npm install firebase react-router-dom @tanstack/react-query
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Firebase Configuration

Create `src/lib/firebase/config.ts` with the same Firebase config as the public site.

### 4. Project Structure

```
weresl-admin/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── PagesManager.tsx
│   │   ├── ProjectsManager.tsx
│   │   ├── TestimonialsManager.tsx
│   │   ├── TimelineManager.tsx
│   │   └── Settings.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── editors/
│   │   └── ui/
│   └── lib/
├── firebase.json
└── package.json
```

### 5. Firebase Hosting Configuration

Create `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 6. Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Features

- Google Sign-In authentication
- Page content management
- Project CRUD operations
- Testimonial management
- Timeline event management
- Google Sheets link management
- Subscriber management
- Email broadcasting
- Settings management

