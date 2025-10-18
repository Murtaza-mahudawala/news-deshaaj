import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import AdSection from '@/components/AdSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { NewsItem } from '@/lib/data';
import { fetchContentData } from '@/lib/api';
// server-side pagination links will be rendered below (no client wrapper)

// NewsItem interface is now imported from @/lib/data

const categoryMap: Record<string, { name: string; title: string }> = {
  ghar: { name: 'घर', title: 'घर समाचार' },
  cricket: { name: 'क्रिकेट', title: 'क्रिकेट समाचार' },
  desh: { name: 'देश', title: 'देश समाचार' },
  general: { name: 'सामान्य', title: 'सामान्य समाचार' },
  business: { name: 'व्यापार समाचार', title: 'व्यापार समाचार' },
  national: { name: 'राष्ट्रीय समाचार', title: 'राष्ट्रीय समाचार' },
  stock: { name: 'शेयर बाज़ार', title: 'शेयर बाज़ार समाचार' },
  it: { name: 'तकनीक', title: 'तकनीक समाचार' },
  technology: { name: 'तकनीक', title: 'तकनीक समाचार' },
  utility: { name: 'सामान्य', title: 'सामान्य समाचार' },
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
  }));
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }; searchParams: { page?: string } }) {
  // Try to resolve the requested slug to a category name.
  // First check static mapping, then try matching against category names returned by the API.
  const { news } = await fetchContentData();

  const { slugify } = await import('@/lib/utils');

  let categoryName: string | undefined = undefined;
  if (categoryMap[params.slug]) {
    categoryName = categoryMap[params.slug].name;
  } else {
    // derive unique category names from news and try to match slug
    const names = Array.from(new Set((news || []).map((n) => n.Categrory_Name).filter(Boolean)));
  const match = names.find((n) => slugify(n) === params.slug || encodeURIComponent(n) === params.slug || n === params.slug);
    if (match) categoryName = match;
  }

  if (!categoryName) {
    console.info('Category page: params.slug=', params.slug);
    console.info('Category page: available names=', (news || []).map((n) => n.Categrory_Name));

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

  const filteredNews = news
    .filter((n) => n.Categrory_Name === categoryName)
    .sort((a, b) => new Date(b.Insert_Date).getTime() - new Date(a.Insert_Date).getTime());

  // Pagination: show up to 15 items per page
  const perPage = 15;
  const page = Math.max(1, Number(searchParams?.page || 1));
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / perPage));
  const start = (page - 1) * perPage;
  const pagedNews = filteredNews.slice(start, start + perPage);

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
          {categoryMap[params.slug]?.title || `${categoryName} समाचार`}
        </h1>

        <div>
          {/* Featured first item larger, rest in a grid */}
          {pagedNews.length > 0 && (
            // prevent grid children from stretching to the height of the tallest column
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
              <div className="lg:col-span-7">
                <NewsCard news={pagedNews[0]} key={pagedNews[0].News_Id} fullHeight={false} />
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {pagedNews.slice(1, 5).map((n) => (
                  <div key={n.News_Id} className="">
                    <NewsCard news={n} compact fullHeight={false} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remaining list */}
          {pagedNews.length > 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pagedNews.slice(5).map((newsItem) => (
                <NewsCard key={newsItem.News_Id} news={newsItem} />
              ))}
            </div>
          )}

          <AdSection />
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-6">
          {page > 1 ? (
            <Link href={`/category/${params.slug}?page=${page - 1}`} className="px-3 py-1 rounded bg-gray-100 text-sm mr-2">पिछला</Link>
          ) : (
            <span className="px-3 py-1 rounded bg-gray-50 text-sm text-gray-400 mr-2">पिछला</span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/category/${params.slug}?page=${p}`}
              className={`px-3 py-1 rounded text-sm ${p === page ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'} mx-1`}
            >
              {p}
            </Link>
          ))}

          {page < totalPages ? (
            <Link href={`/category/${params.slug}?page=${page + 1}`} className="px-3 py-1 rounded bg-gray-100 text-sm ml-2">अगला</Link>
          ) : (
            <span className="px-3 py-1 rounded bg-gray-50 text-sm text-gray-400 ml-2">अगला</span>
          )}
        </div>

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
