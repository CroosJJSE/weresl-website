/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'i.ytimg.com',
      'img.youtube.com'
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
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig

