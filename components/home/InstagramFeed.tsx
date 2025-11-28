'use client';

// This component will embed the Instagram feed
// Using Curator.io or Instagram Basic Display API
export function InstagramFeed() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-heading font-bold mb-8 text-center">
          Follow Our Journey
        </h2>
        <div className="max-w-4xl mx-auto">
          {/* Instagram Feed Embed */}
          <div 
            className="curator-feed" 
            data-feed-id="your-feed-id"
            style={{ minHeight: '600px' }}
          >
            <script src="https://cdn.curator.io/published/your-feed-id.js"></script>
          </div>
          {/* Alternative: You can use Instagram Basic Display API or a service like Curator.io */}
          <p className="text-center text-gray-600 mt-4">
            <a 
              href="https://www.instagram.com/were_srilankan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Follow us on Instagram @were_srilankan
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

