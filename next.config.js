/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'i.ytimg.com',
      'img.youtube.com',
      'scontent.cdninstagram.com',
      'scontent-*.cdninstagram.com',
      'graph.instagram.com',
      'fbcdn.net',
      'scontent-*.fbcdn.net',
      'media.licdn.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'graph.instagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig

