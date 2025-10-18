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
  const pathname = usePathname() || '/';
  const [newsMap, setNewsMap] = useState<Record<string, { title: string; category: string }>>({});
  const [categories, setCategories] = useState<Array<{ id: string; label: string; value: string; href: string }>>([]);

  // Fetch canonical categories + minimal news metadata from our own API route
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/content');
        if (!res.ok) return;
        const json = await res.json();
        const payload = json.data || json;
        const apiNews = Array.isArray(payload.news) ? payload.news : Array.isArray(json.news) ? json.news : [];
        const apiCats = Array.isArray(payload.categories) ? payload.categories : Array.isArray(json.categories) ? json.categories : [];

        const nmap: Record<string, { title: string; category: string }> = {};
        apiNews.forEach((n: any) => {
          const id = String(n.News_Id || n.news_Id || n.newsId || n.id || '');
          if (!id) return;
          nmap[id] = {
            title: n.News_Title || n.news_Title || n.title || '',
            category: n.Categrory_Name || n.categrory_Name || n.category || '',
          };
        });

        if (mounted) {
          setNewsMap(nmap);
          setCategories(
            apiCats.map((c: any) => ({ id: String(c.id || c.value || ''), label: String(c.label || c.value || ''), value: String(c.value || ''), href: String(c.href || '') }))
          );
        }
      } catch (e) {
        // ignore silently; fallbacks below will still work
      }
    })();
    return () => { mounted = false; };
  }, []);

  const parts = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [];
  if (pathname !== '/') crumbs.push({ label: 'होम', href: '/' });

  // Category page: /category/:slug
  if (parts[0] === 'category' && parts[1]) {
    const categorySlug = parts[1];
    const found = categories.find((c) => c.id === categorySlug || c.href.endsWith(`/${categorySlug}`) || encodeURIComponent(c.label) === categorySlug || c.value === categorySlug);
    if (found) crumbs.push({ label: found.label || decodeURIComponent(categorySlug), href: `/category/${categorySlug}` });
    else crumbs.push({ label: decodeURIComponent(categorySlug), href: `/category/${categorySlug}` });
  }

  // News detail page: /news/:id
  if (parts[0] === 'news' && parts[1]) {
    const id = parts[1];
    const meta = newsMap[id];
    if (meta && meta.category) {
      // try to resolve category via fetched categories
      const cat = categories.find((c) => c.value === meta.category || c.label === meta.category || c.id === getCategorySlug(meta.category));
      if (cat) crumbs.push({ label: cat.label || meta.category, href: cat.href || `/category/${cat.id}` });
      else {
        const slug = getCategorySlug(meta.category);
        if (slug) crumbs.push({ label: meta.category, href: `/category/${slug}` });
        else crumbs.push({ label: meta.category, href: `/category/${encodeURIComponent(meta.category)}` });
      }
    }
    crumbs.push({ label: meta?.title || `प्रस्तुति`, href: `/news/${id}` });
  }

  return (
    <nav className="bg-white/50 backdrop-blur-sm rounded-md px-3 py-2 text-sm text-gray-600 my-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={`${crumb.href}-${idx}`} className="flex items-center">
              {isLast ? (
                <span className="text-gray-900 font-medium truncate max-w-[36ch]">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-blue-600 hover:text-red-600 hover:underline truncate max-w-[28ch]">
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <svg className="w-3 h-3 text-gray-400 mx-2" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
