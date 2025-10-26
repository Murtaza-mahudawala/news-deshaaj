import { fetchContentData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  const { blog } = await fetchContentData();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-6" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
          ब्लॉग
        </h1>

        {blog.length === 0 ? (
          <p className="text-gray-600">कृपया प्रतीक्षा करें... सामग्री उपलब्ध नहीं है।</p>
        ) : (
          // fewer columns so cards are larger; use non-compact cards for better visuals
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {blog.map((b) => (
              <div key={b.News_Id}>
                <BlogCard news={b} compact={false} fullHeight={false} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
