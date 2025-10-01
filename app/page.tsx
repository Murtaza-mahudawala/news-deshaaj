import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
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

const categorySections = [
  { title: 'ताजा खबर', categoryName: 'हालात', link: '/category/halat' },
  { title: 'व्यापार समाचार', categoryName: 'व्यापार समाचार', link: '/category/business' },
  { title: 'राष्ट्रीय समाचार', categoryName: 'राष्ट्रीय समाचार', link: '/category/national' },
  { title: 'शेयर बाज़ार', categoryName: 'शेयर बाज़ार', link: '/category/stock' },
  { title: 'सामान्य समाचार', categoryName: 'सामान्य', link: '/category/general' },
  { title: 'क्रिकेट समाचार', categoryName: 'क्रिकेट', link: '/category/cricket' },
];

export default function Home() {
  const news = newsData as NewsItem[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categorySections.map((section, index) => (
          <div key={section.categoryName}>
            <CategorySection
              title={section.title}
              categoryName={section.categoryName}
              news={news}
              viewAllLink={section.link}
            />
            {index < categorySections.length - 1 && <AdSection />}
          </div>
        ))}
      </main>
    </div>
  );
}
