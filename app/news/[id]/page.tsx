import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { getNewsById, getAllNews, NewsItem } from '@/lib/data';
import Image from 'next/image';
import { clampHeadline, clampMetaDescription } from '@/lib/utils';

// NewsItem interface is now imported from @/lib/data

export function generateStaticParams() {
  const news = getAllNews();
  return news.map((n) => ({ id: n.News_Id }));
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = getNewsById(params.id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <Breadcrumbs />
          <p className="text-gray-600" style={{ fontFamily: 'var(--font-open-sans)' }}>
            खबर नहीं मिली।
          </p>
        </main>
      </div>
    );
  }

  const date = new Date(item.Insert_Date);
  const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="mb-2">
          <Breadcrumbs />
        </div>
        {/* Basic OG tags for social sharing */}
        <head>
          <title>{clampHeadline(item.News_Title)}</title>
          <meta name="description" content={clampMetaDescription(item.News_Content)} />
          <meta property="og:title" content={clampHeadline(item.News_Title)} />
          <meta property="og:description" content={clampMetaDescription(item.News_Content)} />
          <meta property="og:image" content={item.Image} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-3"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {item.News_Title}
        </h1>
        <div className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'var(--font-open-sans)' }}>
          प्रकाशित: {formattedDate}
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
      <Footer />
    </div>
  );
}


