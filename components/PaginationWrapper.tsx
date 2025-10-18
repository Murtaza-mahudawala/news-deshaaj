"use client";
import React from 'react';
import Pagination from './Pagination';

export default function PaginationWrapper({ page, totalPages, slug }: { page: number; totalPages: number; slug: string }) {
  const basePath = `/category/${slug}`;
  return <Pagination basePath={basePath} page={page} totalPages={totalPages} />;
}
