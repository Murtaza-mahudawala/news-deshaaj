import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  News_Id: string;
  News_Title: string;
  News_Content: string;
  Image: string;
  Categrory_Name: string;
  Insert_Date: string;
};

interface FeaturedNewsGridProps {
  news: NewsItem[];
}

export default function FeaturedNewsGrid({ news }: FeaturedNewsGridProps) {
  const items = news.slice(0, 7);
  if (items.length === 0) return null;

  const primary = items[0];
  const rest = items.slice(1);

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary large card */}
        <Link href={`/news/${primary.News_Id}`} className="relative group block md:col-span-1 md:row-span-2">
          <div className="relative h-64 md:h-full w-full overflow-hidden rounded-lg">
            <Image src={primary.Image} alt={primary.News_Title} fill className="object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-4">
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">{primary.Categrory_Name}</span>
              <h3 className="mt-2 text-white text-xl md:text-2xl font-extrabold leading-snug" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
                {primary.News_Title}
              </h3>
            </div>
          </div>
        </Link>

        {/* Right side grid (2 cols x 3 rows on md+) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[180px] gap-4">
          {rest.map((item) => (
            <Link key={item.News_Id} href={`/news/${item.News_Id}`} className="relative group block">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image src={item.Image} alt={item.News_Title} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-3">
                  <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wide">{item.Categrory_Name}</span>
                  <h4 className="mt-1 text-white text-sm font-bold leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-roboto-slab)' }}>
                    {item.News_Title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}



