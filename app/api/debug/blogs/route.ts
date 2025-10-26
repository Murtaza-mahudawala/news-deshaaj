import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { fetchContentData } = await import('@/lib/api');
    const { slugify } = await import('@/lib/utils');
    const { blog } = await fetchContentData();

    // Return a small debug shape for inspection
    const debug = (blog || []).slice(0, 200).map((b: any) => ({
      News_Id: b.News_Id,
      Slug: b.Slug,
      Title: b.News_Title,
      HasHtml: Boolean(b.News_Html),
      SampleContent: (b.News_Content || '').slice(0, 200),
    }));

    return NextResponse.json({ count: debug.length, blogs: debug });
  } catch (err) {
    console.error('debug/blogs error', err);
    return NextResponse.json({ count: 0, blogs: [] });
  }
}
