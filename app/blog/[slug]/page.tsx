import { fetchContentData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/utils';

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = params;
  const { blog } = await fetchContentData();

  // Normalize the incoming route param too (Unicode normalization differences can break equality)
  const sRaw = String(slug || '');
  // Some browsers/links percent-encode non-ASCII in the path. Decode safely before comparing.
  let sDecoded = sRaw;
  try {
    sDecoded = decodeURIComponent(sRaw);
  } catch {}
  const sNorm = slugify(sDecoded);

  // Build tolerant matching: exact slug/id OR normalized comparisons
  const index = blog.findIndex((b) => {
    const bSlug = String(b.Slug || '');
    const bSlugNorm = slugify(bSlug);
    const titleNorm = slugify(String(b.News_Title || ''));
    return (
      bSlug === sRaw ||
      bSlug === sDecoded ||
      String(b.News_Id) === sRaw ||
      String(b.News_Id) === sDecoded ||
      bSlugNorm === sNorm ||
      titleNorm === sNorm
    );
  });
  const item = index >= 0 ? blog[index] : null;

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">पोस्ट नहीं मिली</h1>
          <p>क्षमा करें, यह ब्लॉग पोस्ट उपलब्ध नहीं है।</p>
          <div className="mt-6">
            <Link href="/blog" className="text-blue-600 underline">सब ब्लॉग देखें</Link>
          </div>

          <div className="mt-8 bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">Debug: available blog slugs (first 20)</h3>
            <p className="text-xs text-gray-600 mb-2">param: <code>{sRaw}</code> | decoded: <code>{sDecoded}</code> | normalized: <code>{sNorm}</code></p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {blog.slice(0, 20).map((b: any) => (
                <li key={b.News_Id}>
                  <strong>id:</strong> {String(b.News_Id)} &nbsp; <strong>slug:</strong> {String(b.Slug)} &nbsp; <strong>slugNorm:</strong> {slugify(String(b.Slug || ''))} &nbsp; <strong>title:</strong> {String(b.News_Title).slice(0, 60)}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">If your clicked slug isn't listed here, copy the URL and share it so I can trace the mismatch.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const prev = index > 0 ? blog[index - 1] : null;
  const next = index < blog.length - 1 ? blog[index + 1] : null;

  // Remove duplicate heading at the top of HTML if it repeats the title
  function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function normalizeQuote(s: string) {
    return s.replace(/["“”‘’]/g, '').trim();
  }
  function removeDuplicateTitle(html: string, title: string) {
    if (!html || !title) return html;
    const t = title.trim();
    const tNorm = normalizeQuote(t);
    let out = html;
    const patterns = [
      new RegExp(`^\n*\s*<h1[^>]*>\s*${escapeRegExp(t)}\s*<\/h1>\s*`, 'i'),
      new RegExp(`^\n*\s*<h2[^>]*>\s*${escapeRegExp(t)}\s*<\/h2>\s*`, 'i'),
      new RegExp(`^\n*\s*<p[^>]*>\s*${escapeRegExp(t)}\s*<\/p>\s*`, 'i'),
      new RegExp(`^\n*\s*<h1[^>]*>\s*${escapeRegExp(tNorm)}\s*<\/h1>\s*`, 'i'),
      new RegExp(`^\n*\s*<h2[^>]*>\s*${escapeRegExp(tNorm)}\s*<\/h2>\s*`, 'i'),
      new RegExp(`^\n*\s*<p[^>]*>\s*${escapeRegExp(tNorm)}\s*<\/p>\s*`, 'i'),
    ];
    for (const re of patterns) {
      if (re.test(out)) {
        out = out.replace(re, '');
        break;
      }
    }
    return out;
  }

  const rawHtml = item.News_Html || item.News_Content || '';
  const cleanedHtml = removeDuplicateTitle(rawHtml, item.News_Title || '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-6">
          <Link href="/blog" className="text-sm text-gray-600 underline">← सभी ब्लॉग</Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-roboto-slab)' }}>{item.News_Title}</h1>

        {item.Image ? (
          <div className="relative w-full mb-6" style={{ paddingTop: '56.25%' }}>
            <Image
              src={item.Image}
              alt={item.News_Title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 960px"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        ) : null}

  <div className="prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: cleanedHtml }} />

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            {prev ? (
              <Link href={`/blog/${prev.Slug || prev.News_Id}`} className="inline-block px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">← पिछला</Link>
            ) : (
              <span className="inline-block px-4 py-2 text-gray-400">← पिछला</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/blog" className="px-4 py-2 bg-white border rounded-md">सूची</Link>
            {next ? (
              <Link href={`/blog/${next.Slug || next.News_Id}`} className="inline-block px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">अगला →</Link>
            ) : (
              <span className="inline-block px-4 py-2 text-gray-400">अगला →</span>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
