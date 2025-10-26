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
        <section>
          <GalleryClient galleries={galleries} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
