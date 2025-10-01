import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import AdSection from '@/components/AdSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import FeaturedNewsGrid from '@/components/FeaturedNewsGrid';
import Footer from '@/components/Footer';
import { getAllNews, NewsItem } from '@/lib/data';

const categorySections = [
  { title: 'व्यापार समाचार', categoryName: 'व्यापार समाचार', link: '/category/business' },
  { title: 'राष्ट्रीय समाचार', categoryName: 'राष्ट्रीय समाचार', link: '/category/national' },
  { title: 'शेयर बाज़ार', categoryName: 'शेयर बाज़ार', link: '/category/stock' },
  { title: 'सामान्य समाचार', categoryName: 'सामान्य', link: '/category/general' },
  { title: 'देश समाचार', categoryName: 'देश', link: '/category/desh' },
];

export default function Home() {
  const news = getAllNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      {/* Featured grid moved directly under hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <FeaturedNewsGrid news={news.filter(n => n.Active_Flag === 'Y')} />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Ad */}
        <div className="mb-8">
          <AdSection />
        </div>
        <div className="mb-2 ml-4">
          <Breadcrumbs />
        </div>
        {categorySections.map((section, index) => (
          <div key={section.categoryName}>
            <CategorySection
              title={<span className="text-red-600">{section.title}</span>}
              categoryName={section.categoryName}
              news={news}
              viewAllLink={section.link}
            />
            {/* Middle Ad only once after the third section (index === 2) */}
            {index === 2 && <AdSection />}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
