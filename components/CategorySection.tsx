import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';
import { ReactNode } from 'react';

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

interface CategorySectionProps {
  title: ReactNode;
  categoryName: string;
  news: NewsItem[];
  viewAllLink: string;
}

export default function CategorySection({ title, categoryName, news, viewAllLink }: CategorySectionProps) {
  const filteredNews = news
    .filter(item => item.Active_Flag === 'Y' && item.Categrory_Name === categoryName)
    .slice(0, 4);

  if (filteredNews.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl md:text-3xl font-bold text-red-600"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {title}
        </h2>
        <Link
          href={viewAllLink}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          style={{ fontFamily: 'var(--font-open-sans)' }}
        >
          सभी देखें
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredNews.map((newsItem) => (
          <NewsCard key={newsItem.News_Id} news={newsItem} />
        ))}
      </div>
    </section>
  );
}
