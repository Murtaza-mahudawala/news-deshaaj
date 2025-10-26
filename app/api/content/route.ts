import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const { fetchContentData } = await import('@/lib/api');
    const { slugify } = await import('@/lib/utils');
    const { news } = await fetchContentData();

    // Build category objects with a count of how many news items belong to each category.
    const counts: Record<string, number> = {};
    (news || []).forEach((n: any) => {
      const key = String(n.Categrory_Name || '').trim();
      if (!key) return;
      counts[key] = (counts[key] || 0) + 1;
    });

    const names = Object.keys(counts);
    const categories = names.map((name) => ({ id: slugify(name), label: name, value: name, href: `/category/${slugify(name)}`, count: counts[name] || 0 }));

    // Only return categories that have at least one news item to avoid empty categories in the navbar.
    const filtered = categories.filter((c) => (c.count || 0) > 0);

    return NextResponse.json({ news, categories: filtered });
  } catch (err) {
    console.error('API route /api/content error', err);
    return NextResponse.json({ news: [], categories: [] });
  }
}
