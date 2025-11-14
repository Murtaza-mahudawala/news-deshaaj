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

export const revalidate = 60;

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

  // Get featured news (first 7 items)
  const featuredNews = sortedNews.filter(n => n.Active_Flag === 'Y').slice(0, 7);
  // Get remaining news for category sections (excluding featured news)
  const remainingNews = sortedNews.filter(n => 
    n.Active_Flag === 'Y' && 
    !featuredNews.some(f => String(f.News_Id).trim() === String(n.News_Id).trim())
  );

  // Generate categories for navbar
  const categoryCounts: Record<string, number> = {};
  sortedNews.forEach((n) => {
    if (n.Active_Flag === 'Y' && n.Categrory_Name) {
      categoryCounts[n.Categrory_Name] = (categoryCounts[n.Categrory_Name] || 0) + 1;
    }
  });

  const navbarCategories = [
    { id: 'home', label: 'सभी', value: '', href: '/' },
    ...Object.keys(categoryCounts)
      .filter(name => categoryCounts[name] > 0)
      .map(name => ({
        id: slugify(name),
        label: name,
        value: name,
        href: `/category/${slugify(name)}`,
        count: categoryCounts[name]
      }))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar initialCategories={navbarCategories} />
      <Hero />
      {/* Featured grid moved directly under hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* pass a larger active list so FeaturedNewsGrid can pick one per category */}
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
          const names = Array.from(new Set((remainingNews || []).map((n) => n.Categrory_Name).filter(Boolean)));
          // limit to first 6 categories to avoid a very long homepage
          const limited = names.slice(0, 6);
          return limited.map((name, index) => {
            const slug = slugify(name);
            return (
              <div key={slug}>
                <CategorySection
                  title={<span className="text-red-600">{name} समाचार</span>}
                  categoryName={name}
                  news={remainingNews}
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
