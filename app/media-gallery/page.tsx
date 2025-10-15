import { fetchContentData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

// Load client gallery (lightbox + interactive thumbnails) only on client
const GalleryClient = dynamic(() => import('@/components/GalleryClient'), { ssr: false });

export default async function MediaGalleryPage() {
  const { videos, galleries } = await fetchContentData();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-6" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
          मीडिया गैलरी
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🎥 वीडियो</h2>
          {videos.length === 0 && <p className="text-gray-600">कृपया प्रतीक्षा करें... डेटा उपलब्ध नहीं है।</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={String(v.videoDetail_id)} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={v.fileName}
                    title={v.videoTitle}
                    className="w-full h-56 sm:h-48"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800">{v.videoTitle}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <GalleryClient galleries={galleries} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
