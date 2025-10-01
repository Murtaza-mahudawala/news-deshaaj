import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import newsData from '@/data/news.json';
import Image from 'next/image';

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

export function generateStaticParams() {
  const news = newsData as NewsItem[];
  return news.map((n) => ({ id: n.News_Id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = newsData as NewsItem[];
  const item = news.find((n) => n.News_Id === params.id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs />
          <p className="text-gray-600" style={{ fontFamily: 'var(--font-open-sans)' }}>
            खबर नहीं मिली।
          </p>
        </main>
      </div>
    );
  }

  const date = new Date(item.Insert_Date);
  const formatted = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-2">
          <Breadcrumbs />
        </div>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-3"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {item.News_Title}
        </h1>
        <div className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'var(--font-open-sans)' }}>
          प्रकाशित: {formatted}
        </div>

        <div className="relative w-full h-56 sm:h-72 md:h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
          <Image src={item.Image} alt={item.News_Title} fill className="object-cover" />
        </div>

        <article className="prose max-w-none">
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-800" style={{ fontFamily: 'var(--font-open-sans)' }}>
            {item.News_Content}
          </p>
        </article>
      </main>
    </div>
  );
}


