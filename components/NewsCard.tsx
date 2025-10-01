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
}

export default function NewsCard({ news }: NewsCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date(news.Insert_Date);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }, [news.Insert_Date]);

  return (
    <Link href={`/news/${news.News_Id}`} className="block h-full">
      <article className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        {/* Fixed height image section */}
        <div className="relative h-48 w-full">
          <Image
            src={news.Image}
            alt={news.News_Title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Fixed content section */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
              {news.Categrory_Name}
            </span>
          </div>

          {/* Fixed height title */}
          <h2
            className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[48px]"
            style={{ fontFamily: 'var(--font-roboto-slab)' }}
          >
            {news.News_Title}
          </h2>

          {/* Fixed height content */}
          <p
            className="text-gray-700 text-sm mb-4 leading-6 line-clamp-3 min-h-[66px]"
            style={{ fontFamily: 'var(--font-open-sans)' }}
          >
            {news.News_Content}
          </p>

          {/* Fixed footer */}
          <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span style={{ fontFamily: 'var(--font-open-sans)' }}>
              {news.News_Source}
            </span>
            <span style={{ fontFamily: 'var(--font-open-sans)' }} suppressHydrationWarning>
              {formattedDate}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
