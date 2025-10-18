"use client";
import React from 'react';
import Link from 'next/link';

type Props = {
  basePath: string;
  page: number;
  totalPages: number;
};

export default function Pagination({ basePath, page, totalPages }: Props) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  if (totalPages <= 1) return null;

  const pages = [] as number[];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Pagination">
      {prev ? (
        <Link href={`${basePath}?page=${prev}`} className="px-3 py-1 rounded bg-gray-100 text-sm">पिछला</Link>
      ) : (
        <span className="px-3 py-1 rounded bg-gray-50 text-sm text-gray-400">पिछला</span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`px-3 py-1 rounded text-sm ${p === page ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {p}
        </Link>
      ))}

      {next ? (
        <Link href={`${basePath}?page=${next}`} className="px-3 py-1 rounded bg-gray-100 text-sm">अगला</Link>
      ) : (
        <span className="px-3 py-1 rounded bg-gray-50 text-sm text-gray-400">अगला</span>
      )}
    </nav>
  );
}
