import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import AdSection from '@/components/AdSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { getNewsByCategory, getNewsChunks, NewsItem } from '@/lib/data';

// NewsItem interface is now imported from @/lib/data

const categoryMap: Record<string, { name: string; title: string }> = {
  ghar: { name: 'घर', title: 'घर समाचार' },
  cricket: { name: 'क्रिकेट', title: 'क्रिकेट समाचार' },
  desh: { name: 'देश', title: 'देश समाचार' },
  general: { name: 'सामान्य', title: 'सामान्य समाचार' },
  business: { name: 'व्यापार समाचार', title: 'व्यापार समाचार' },
  national: { name: 'राष्ट्रीय समाचार', title: 'राष्ट्रीय समाचार' },
  stock: { name: 'शेयर बाज़ार', title: 'शेयर बाज़ार समाचार' },
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryMap[params.slug];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 text-lg mb-8">श्रेणी नहीं मिली</p>
            <Link 
              href="/" 
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              होम पेज पर वापस जाएं
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredNews = getNewsByCategory(category.name)
    .sort((a, b) => new Date(b.Insert_Date).getTime() - new Date(a.Insert_Date).getTime());

  const newsChunks = getNewsChunks(filteredNews, 8);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-1">
          <Breadcrumbs />
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-red-600 mb-8"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {category.title}
        </h1>

        {newsChunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {chunk.map((newsItem) => (
                <NewsCard key={newsItem.News_Id} news={newsItem} />
              ))}
            </div>
            {chunkIndex < newsChunks.length - 1 && <AdSection />}
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-open-sans)' }}>
              इस श्रेणी में कोई समाचार उपलब्ध नहीं है।
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
