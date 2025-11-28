# Local Development Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Firebase credentials (optional for basic testing)
# For now, you can leave them empty to test the UI without Firebase
```

### 3. Run Development Server

```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

## Firebase Setup (Optional for Local Testing)

If you want to test Firebase features locally:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable:
   - **Firestore Database** (start in test mode for development)
   - **Firebase Storage**
   - **Firebase Authentication** (enable Google provider)
4. Copy your Firebase config from Project Settings
5. Paste into `.env.local`

## Troubleshooting

### Port Already in Use

If port 3000 is busy:
```bash
# Use a different port
npm run dev -- -p 3001
```

### Missing Dependencies

If you see import errors:
```bash
npm install
```

### TypeScript Errors

If you see TypeScript errors:
```bash
# Check if types are installed
npm install --save-dev @types/node @types/react @types/react-dom
```

### Firebase Connection Issues

- Make sure `.env.local` has correct Firebase credentials
- Check Firebase console for any service restrictions
- For local testing, you can comment out Firebase calls temporarily

## Development Tips

1. **Hot Reload**: Changes automatically refresh in browser
2. **TypeScript**: Check terminal for type errors
3. **Console**: Check browser console for runtime errors
4. **Network Tab**: Check for failed API calls

## Next Steps

Once running locally:
- Test all pages and navigation
- Verify responsive design (mobile/tablet/desktop)
- Test forms and interactions
- Check browser console for errors

