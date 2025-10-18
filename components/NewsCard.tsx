'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NewsCardProps {
  news: {
    News_Id: string;
    Image: string;
    News_Title: string;
    News_Content: string;
    Categrory_Name: string;
    News_Source: string;
    Insert_Date: string;
  };
  /** If true, card will stretch to fill its container height. Set false for featured/inline variants. */
  fullHeight?: boolean;
  /** Render a compact variant (smaller image + tighter spacing) */
  compact?: boolean;
}

export default function NewsCard({ news, fullHeight = true, compact = false }: NewsCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date(news.Insert_Date);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }, [news.Insert_Date]);

  return (
    <Link href={`/news/${news.News_Id}`} className={`block ${fullHeight ? 'h-full' : ''}`}>
      <article className={`${fullHeight ? 'h-full' : ''} bg-white rounded-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100`}>
        {/* Image */}
  <div className={compact ? 'relative w-full h-28 sm:h-32 md:h-28 lg:h-32 bg-gray-100' : 'relative w-full h-48 sm:h-56 md:h-44 lg:h-48 bg-gray-100'}>
          {news.Image ? (
            <Image
              src={news.Image}
              alt={news.News_Title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">छवि उपलब्ध नहीं</div>
          )}
          {/* category badge top-left */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold text-white bg-red-600/95 backdrop-blur-sm rounded-full shadow-sm">
              {news.Categrory_Name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={compact ? 'p-3 flex-1 flex flex-col gap-1' : 'p-4 flex-1 flex flex-col gap-2'}>
          <h2 className={compact ? 'text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-2' : 'text-base md:text-lg font-semibold text-gray-900 leading-tight line-clamp-2'} style={{ fontFamily: 'var(--font-roboto-slab)' }}>
            {news.News_Title}
          </h2>

          <p className={compact ? 'text-xs text-gray-700 leading-relaxed line-clamp-2' : 'text-sm text-gray-700 leading-relaxed line-clamp-3'} style={{ fontFamily: 'var(--font-open-sans)' }}>
            {news.News_Content}
          </p>

          <div className={compact ? 'mt-auto flex items-center justify-between text-xs text-gray-500 pt-2' : 'mt-auto flex items-center justify-between text-xs text-gray-500 pt-3'}>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-open-sans)' }}>{news.News_Source}</span>
            </div>
            <div className="text-right text-xs text-gray-500" style={{ fontFamily: 'var(--font-open-sans)' }} suppressHydrationWarning>
              {formattedDate}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
