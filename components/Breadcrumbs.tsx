"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Category mapping to match the category page slugs
const categoryMap: Record<string, { name: string; title: string }> = {
  ghar: { name: 'घर', title: 'घर समाचार' },
  cricket: { name: 'क्रिकेट', title: 'क्रिकेट समाचार' },
  desh: { name: 'देश', title: 'देश समाचार' },
  general: { name: 'सामान्य', title: 'सामान्य समाचार' },
  business: { name: 'व्यापार समाचार', title: 'व्यापार समाचार' },
  national: { name: 'राष्ट्रीय समाचार', title: 'राष्ट्रीय समाचार' },
  stock: { name: 'शेयर बाज़ार', title: 'शेयर बाज़ार समाचार' },
  it: { name: 'तकनीक', title: 'तकनीक समाचार' },
};

// Helper function to get category slug from category name
function getCategorySlug(categoryName: string): string {
  const entry = Object.entries(categoryMap).find(([_, value]) => value.name === categoryName);
  return entry ? entry[0] : '';
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [newsMap, setNewsMap] = useState<Record<string, { title: string; category: string }>>({});

  // Fetch minimal news metadata client-side so breadcrumbs can show article titles
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL || 'https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=26&language=Hindi';
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) return;
        const json = await res.json();
        const payload = json.data || json;
        const newsArr = Array.isArray(payload.news) ? payload.news : [];
        const map: Record<string, { title: string; category: string }> = {};
        newsArr.forEach((n: any) => {
          const id = String(n.news_Id || n.News_Id || n.newsId || n.News_Id || n.newsId);
          map[id] = {
            title: n.news_Title || n.News_Title || n.title || '',
            category: n.categrory_Name || n.Categrory_Name || n.category || '',
          };
        });
        if (mounted) setNewsMap(map);
      } catch (e) {
        // ignore silently; breadcrumbs will fallback to slugs
      }
    })();
    return () => { mounted = false; };
  }, []);

  const parts = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [];
  if (pathname !== '/') {
    crumbs.push({ label: 'होम', href: '/' });
  }

  if (parts[0] === 'category' && parts[1]) {
    const categorySlug = parts[1];
    const categoryInfo = categoryMap[categorySlug];
    if (categoryInfo) {
      crumbs.push({ label: categoryInfo.name, href: `/category/${categorySlug}` });
    } else {
      crumbs.push({ label: decodeURIComponent(categorySlug), href: `/category/${categorySlug}` });
    }
  }

  if (parts[0] === 'news' && parts[1]) {
    const id = parts[1];
    const meta = newsMap[id];
    if (meta && meta.category) {
      const categorySlug = getCategorySlug(meta.category);
      if (categorySlug) crumbs.push({ label: meta.category, href: `/category/${categorySlug}` });
    }
    crumbs.push({ label: meta?.title || `प्रस्तुति`, href: `/news/${id}` });
  }

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
