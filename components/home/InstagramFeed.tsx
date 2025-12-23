'use client';

import { useState, useEffect, ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SocialMediaPost, SocialMediaPlatform } from '@/types/social-media';
import { Instagram, Youtube, ExternalLink, Heart, MessageCircle, Eye } from 'lucide-react';

const platforms: { id: SocialMediaPlatform; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
];

export function InstagramFeed() {
  const [activeTab, setActiveTab] = useState<SocialMediaPlatform>('instagram');
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const fetchPosts = async (platform: SocialMediaPlatform) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/social-media/posts?platform=${platform}&limit=20`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.posts || []);
      } else {
        setError(data.error || 'Failed to load posts');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-heading font-bold mb-8 text-center">
          Follow Our Work
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = activeTab === platform.id;
            return (
              <Button
                key={platform.id}
                variant={isActive ? 'default' : 'outline'}
                onClick={() => setActiveTab(platform.id)}
                className={`flex items-center gap-2 ${
                  isActive 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{platform.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-gray-600">
              Posts will appear here once social media accounts are connected. 
              See setup instructions in the documentation.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No posts available yet.</p>
            <p className="text-sm text-gray-500">
              Posts will be auto-populated once social media accounts are connected.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image/Video Thumbnail */}
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    {post.mediaUrl ? (
                      <Image
                        src={post.mediaUrl}
                        alt={post.caption.substring(0, 100) || 'Social media post'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    {post.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white/90 rounded-full p-3">
                          {post.platform === 'youtube' ? (
                            <Youtube className="h-6 w-6 text-red-600" />
                          ) : (
                            <div className="w-0 h-0 border-l-[12px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                          )}
                        </div>
                      </div>
                    )}
                    {post.mediaType === 'carousel' && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        Carousel
                      </div>
                    )}
                  </div>

                  {/* Post Info */}
                  <div className="p-4">
                    {post.caption && (
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {post.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(post.timestamp)}</span>
                      <div className="flex items-center gap-3">
                        {post.likes !== undefined && post.likes > 0 && (
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}
                          </span>
                        )}
                        {post.comments !== undefined && post.comments > 0 && (
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {post.comments > 1000 ? `${(post.comments / 1000).toFixed(1)}k` : post.comments}
                          </span>
                        )}
                        {post.views !== undefined && post.views > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-primary text-xs font-medium">
                      View on {platforms.find(p => p.id === post.platform)?.label}
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
