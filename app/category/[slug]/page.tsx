import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import AdSection from '@/components/AdSection';
import newsData from '@/data/news.json';

interface NewsItem {
  Active_Flag: string;
  Categrory_Name: string;
  Image: string;
  Insert_Date: string;
  News_Content: string;
  News_Source: string;
  News_Title: string;
  News_Id: string;
  Slug: string;
}

const categoryMap: Record<string, { name: string; title: string }> = {
  ghar: { name: 'घर', title: 'घर समाचार' },
  cricket: { name: 'क्रिकेट', title: 'क्रिकेट समाचार' },
  desh: { name: 'देश', title: 'देश समाचार' },
  halat: { name: 'हालात', title: 'ताजा खबर' },
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
    return null;
  }

  const news = newsData as NewsItem[];
  const filteredNews = news.filter(
    (item) => item.Active_Flag === 'Y' && item.Categrory_Name === category.name
  );

  const newsChunks: NewsItem[][] = [];
  for (let i = 0; i < filteredNews.length; i += 8) {
    newsChunks.push(filteredNews.slice(i, i + 8));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
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
    </div>
  );
}
