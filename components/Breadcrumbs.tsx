"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import newsData from '@/data/news.json';

// Helper to get category and article info from JSON
type NewsItem = {
  News_Id: string;
  Categrory_Name: string;
  News_Title: string;
  Slug: string;
};

function getBreadcrumbs(path: string, news: NewsItem[]) {
  const parts = path.split('/').filter(Boolean);
  const crumbs = [{ label: 'होम', href: '/' }];

  if (parts[0] === 'category' && parts[1]) {
    const category = news.find(n => n.Categrory_Name && n.Slug === parts[1]);
    if (category) {
      crumbs.push({ label: category.Categrory_Name, href: `/category/${category.Slug}` });
    } else {
      crumbs.push({ label: decodeURIComponent(parts[1]), href: `/category/${parts[1]}` });
    }
  }
  // If article page under /news/[id]
  if (parts[0] === 'news' && parts[1]) {
    const article = news.find(n => n.News_Id === parts[1]);
    if (article) {
      crumbs.push({ label: article.Categrory_Name, href: `/category/${article.Slug || ''}` });
      crumbs.push({ label: article.News_Title, href: `/news/${parts[1]}` });
    }
  }
  return crumbs;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  // @ts-ignore
  const news: NewsItem[] = newsData;
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
