import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const { fetchContentData } = await import('@/lib/api');
    const { slugify } = await import('@/lib/utils');
    const { news } = await fetchContentData();
    const names = Array.from(new Set((news || []).map((n) => n.Categrory_Name).filter(Boolean)));
    const categories = names.map((name) => ({ id: slugify(name), label: name, value: name, href: `/category/${slugify(name)}` }));
    return NextResponse.json({ news, categories });
  } catch (err) {
    console.error('API route /api/content error', err);
    return NextResponse.json({ news: [], categories: [] });
  }
}
