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
      <div className="relative h-48 w-full">
        <Image
          src={news.Image}
          alt={news.News_Title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
            {news.Categrory_Name}
          </span>
        </div>

        <h2
          className="text-xl font-bold text-gray-900 mb-2 leading-snug line-clamp-2 min-h-[56px]"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {news.News_Title}
        </h2>

        <p
          className="text-gray-700 text-sm mb-3 leading-6 line-clamp-3 min-h-[72px]"
          style={{ fontFamily: 'var(--font-open-sans)', lineHeight: '1.5' }}
        >
          {news.News_Content}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
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
