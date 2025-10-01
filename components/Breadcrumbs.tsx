"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllNews, NewsItem } from '@/lib/data';

// NewsItem type is now imported from @/lib/data

// Category mapping to match the category page slugs
const categoryMap: Record<string, { name: string; title: string }> = {
  ghar: { name: 'घर', title: 'घर समाचार' },
  cricket: { name: 'क्रिकेट', title: 'क्रिकेट समाचार' },
  desh: { name: 'देश', title: 'देश समाचार' },
  general: { name: 'सामान्य', title: 'सामान्य समाचार' },
  business: { name: 'व्यापार समाचार', title: 'व्यापार समाचार' },
  national: { name: 'राष्ट्रीय समाचार', title: 'राष्ट्रीय समाचार' },
  stock: { name: 'शेयर बाज़ार', title: 'शेयर बाज़ार समाचार' },
};

// Helper function to get category slug from category name
function getCategorySlug(categoryName: string): string {
  const entry = Object.entries(categoryMap).find(([_, value]) => value.name === categoryName);
  return entry ? entry[0] : '';
}

function getBreadcrumbs(path: string, news: NewsItem[]) {
  const parts = path.split('/').filter(Boolean);
  const crumbs = [];

  // Don't show breadcrumbs on home page
  if (path === '/') {
    return crumbs;
  }

  // Add Home breadcrumb for other pages
  crumbs.push({ label: 'होम', href: '/' });

  if (parts[0] === 'category' && parts[1]) {
    const categorySlug = parts[1];
    const categoryInfo = categoryMap[categorySlug];
    if (categoryInfo) {
      crumbs.push({ label: categoryInfo.name, href: `/category/${categorySlug}` });
    } else {
      crumbs.push({ label: decodeURIComponent(categorySlug), href: `/category/${categorySlug}` });
    }
  }
  
  // If article page under /news/[id]
  if (parts[0] === 'news' && parts[1]) {
    const article = news.find(n => n.News_Id === parts[1]);
    if (article) {
      const categorySlug = getCategorySlug(article.Categrory_Name);
      if (categorySlug) {
        crumbs.push({ label: article.Categrory_Name, href: `/category/${categorySlug}` });
      }
      crumbs.push({ label: article.News_Title, href: `/news/${parts[1]}` });
    }
  }
  return crumbs;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const news = getAllNews();
  const crumbs = getBreadcrumbs(pathname, news);

  return (
    <nav className="text-sm text-gray-600 my-2" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            <Link href={crumb.href} className="hover:underline text-blue-600">
              {crumb.label}
            </Link>
            {idx < crumbs.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
