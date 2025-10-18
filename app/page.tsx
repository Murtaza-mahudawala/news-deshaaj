import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import AdSection from '@/components/AdSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import FeaturedNewsGrid from '@/components/FeaturedNewsGrid';
import Footer from '@/components/Footer';
import { NewsItem } from '@/lib/data';
import { fetchContentData } from '@/lib/api';

// We'll derive category sections from the API so the navbar and home sections stay in sync.
import { slugify } from '@/lib/utils';

export default async function Home() {
  const { news } = await fetchContentData();

  // server-side logging to validate feed structure during development
  try {
    const names = Array.from(new Set((news || []).map((n) => n.Categrory_Name).filter(Boolean)));
    console.info('Home server: detected categories ->', names.slice(0, 12));
    console.info('Home server: top news count ->', news.length);
  } catch (e) {
    // ignore logging failures
  }

  // sort news by Insert_Date descending so newest items appear first
  const sortedNews = [...news].sort((a, b) => {
    const da = new Date(a.Insert_Date).getTime();
    const db = new Date(b.Insert_Date).getTime();
    return db - da;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      {/* Featured grid moved directly under hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
  <FeaturedNewsGrid news={sortedNews.filter(n => n.Active_Flag === 'Y')} />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Ad */}
        <div className="mb-8">
          <AdSection />
        </div>
        <div className="mb-2 ml-4">
          <Breadcrumbs />
        </div>
        {/* Dynamically render up to the first 6 categories that appear in the feed. */}
        {(() => {
          const names = Array.from(new Set((sortedNews || []).map((n) => n.Categrory_Name).filter(Boolean)));
          // limit to first 6 categories to avoid a very long homepage
          const limited = names.slice(0, 6);
          return limited.map((name, index) => {
            const slug = slugify(name);
            return (
              <div key={slug}>
                <CategorySection
                  title={<span className="text-red-600">{name} समाचार</span>}
                  categoryName={name}
                  news={sortedNews}
                  viewAllLink={`/category/${slug}`}
                  maxItems={3}
                />
                {index === 2 && <AdSection />}
              </div>
            );
          });
        })()}
      </main>
      <Footer />
    </div>
  );
}
