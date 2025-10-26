import { fetchContentData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default async function YoutubeVideosPage() {
  const { videos } = await fetchContentData();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-6" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
          यूट्यूब वीडियो
        </h1>

        {videos.length === 0 ? (
          <p className="text-gray-600">कृपया प्रतीक्षा करें... वीडियो उपलब्ध नहीं हैं।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => {
              const href = (v as any).videoWatch || (v as any).fileName || '#';
              // compute a reliable video id for youtube thumbnails
              const computeId = (): string | null => {
                const embed = (v as any).videoEmbed || '';
                const watch = (v as any).videoWatch || (v as any).fileName || '';
                try {
                  if (embed) {
                    const parts = String(embed).split('/');
                    const last = parts.pop() || '';
                    if (/^[A-Za-z0-9_-]{6,}$/.test(last)) return last;
                  }
                  const u = new URL(String(watch));
                  if (u.hostname.includes('youtube.com')) {
                    const vparam = u.searchParams.get('v');
                    if (vparam) return vparam;
                    const parts = u.pathname.split('/');
                    const last = parts.pop() || '';
                    if (/^[A-Za-z0-9_-]{6,}$/.test(last)) return last;
                  }
                  if (u.hostname === 'youtu.be') return u.pathname.slice(1);
                } catch (e) {
                  // maybe it's an id
                }
                if (/^[A-Za-z0-9_-]{6,}$/.test(String(watch))) return String(watch);
                return null;
              };
              const vidId = computeId();
              return (
                <article key={String((v as any).videoDetail_id || (v as any).videoId)} className="bg-white rounded-lg shadow overflow-hidden">
                  <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="w-full">
                      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        { (v as any).image ? (
                          <Image src={(v as any).image} alt={(v as any).videoTitle || 'वीडियो'} fill sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover" />
                        ) : vidId ? (
                          <Image src={`https://img.youtube.com/vi/${vidId}/hqdefault.jpg`} alt={(v as any).videoTitle || 'वीडियो'} fill sizes="100vw" className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">वीडियो थंबनेल उपलब्ध नहीं</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-black/40 rounded-full p-3 text-white">▶</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800">{(v as any).videoTitle}</h3>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
