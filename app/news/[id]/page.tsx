import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { NewsItem } from '@/lib/data';
import { fetchContentData } from '@/lib/api';
import Image from 'next/image';
import { clampHeadline, clampMetaDescription } from '@/lib/utils';

// NewsItem interface is now imported from @/lib/data

export async function generateStaticParams() {
  const { news } = await fetchContentData();
  return news.map((n) => ({ id: n.News_Id }));
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const { news } = await fetchContentData();
  const item = news.find((n) => n.News_Id === params.id);

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

  // find related articles from same category
  const related = news.filter((n) => n.Categrory_Name === item.Categrory_Name && n.News_Id !== item.News_Id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="mb-2">
          <Breadcrumbs />
        </div>

        <head>
          <title>{clampHeadline(item.News_Title)}</title>
          <meta name="description" content={clampMetaDescription(item.News_Content)} />
          <meta property="og:title" content={clampHeadline(item.News_Title)} />
          <meta property="og:description" content={clampMetaDescription(item.News_Content)} />
          <meta property="og:image" content={item.Image} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-2" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
            {item.News_Title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs rounded">{item.Categrory_Name}</span>
              <span style={{ fontFamily: 'var(--font-open-sans)' }}>प्रकाशित: {formattedDate}</span>
            </div>
            <div className="text-xs text-gray-500 ml-auto" style={{ fontFamily: 'var(--font-open-sans)' }}>{item.News_Source}</div>
          </div>
        </header>

        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
          {item.Image ? <Image src={item.Image} alt={item.News_Title} fill className="object-cover" /> : <div className="w-full h-full bg-gray-200" />}
        </div>

        <article className="prose max-w-none mb-8">
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-800" style={{ fontFamily: 'var(--font-open-sans)' }}>
            {item.News_Content}
          </p>
        </article>

        {related.length > 0 && (
          <section className="mt-12">
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-roboto-slab)' }}>इसी श्रेणी की अन्य खबरें</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.News_Id} href={`/news/${r.News_Id}`} className="block p-3 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-14 relative flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image src={r.Image} alt={r.News_Title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2" style={{ fontFamily: 'var(--font-roboto-slab)' }}>{r.News_Title}</div>
                      <div className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-open-sans)' }}>{r.News_Source}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}


