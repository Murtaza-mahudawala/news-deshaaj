"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

type Gallery = { galleryMaster_id: string | number; galleryMaster_Title: string; galleryDetailList: { fileName: string }[] };

export default function GalleryClient({ galleries }: { galleries: Gallery[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div>
      {galleries.length === 0 && <p className="text-gray-600">कृपया प्रतीक्षा करें… डेटा उपलब्ध नहीं है।</p>}

      <div className="space-y-8">
        {galleries.map((g) => (
          <div key={String(g.galleryMaster_id)}>
            <h3 className="text-lg font-medium mb-3">{sanitizeTitle(g.galleryMaster_Title)}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {g.galleryDetailList.map((img, idx) => (
                <Thumbnail
                  key={idx}
                  src={img.fileName}
                  alt={sanitizeTitle(g.galleryMaster_Title)}
                  onClick={() => setLightboxSrc(img.fileName)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {lightboxSrc && <Lightbox src={lightboxSrc} alt="गैलरी छवि" onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}

function Thumbnail({ src, alt, onClick }: { src: string; alt?: string; onClick: () => void }) {
  const placeholder = '/placeholder.svg';
  const [imgSrc, setImgSrc] = useState<string>(src || placeholder);

  return (
    <div className="w-full h-40 bg-gray-100 rounded overflow-hidden cursor-pointer" onClick={onClick}>
      <Image
        src={imgSrc}
        alt={alt || 'गैलरी'}
        width={800}
        height={600}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setImgSrc(placeholder)}
      />
    </div>
  );
}

function sanitizeTitle(title: string | undefined | null): string {
  const fallback = 'फोटो गैलरी';
  if (!title) return fallback;
  const t = String(title).trim();
  if (!t) return fallback;

  // If title contains obvious english words or mostly latin characters, replace with Hindi fallback.
  const englishKeywords = /lake|lakes|india|winter|stunning|top|best|travel|tourism/i;
  if (englishKeywords.test(t)) return fallback;

  const latinCount = (t.match(/[A-Za-z0-9]/g) || []).length;
  const total = t.replace(/\s+/g, '').length || 1;
  if (latinCount / total > 0.5) return fallback;

  return t;
}
