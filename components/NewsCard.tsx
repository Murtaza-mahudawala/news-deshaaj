import Image from 'next/image';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={news.Image}
          alt={news.News_Title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            {news.Categrory_Name}
          </span>
        </div>

        <h2
          className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2"
          style={{ fontFamily: 'var(--font-roboto-slab)' }}
        >
          {news.News_Title}
        </h2>

        <p
          className="text-gray-700 text-sm mb-3 line-clamp-3"
          style={{ fontFamily: 'var(--font-open-sans)', lineHeight: '1.5' }}
        >
          {news.News_Content}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span style={{ fontFamily: 'var(--font-open-sans)' }}>
            {news.News_Source}
          </span>
          <span style={{ fontFamily: 'var(--font-open-sans)' }}>
            {formatDate(news.Insert_Date)}
          </span>
        </div>
      </div>
    </article>
  );
}
