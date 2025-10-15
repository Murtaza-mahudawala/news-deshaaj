// Data utility functions
// NOTE: Local static JSON has been disabled. Use the API client `fetchContentData` from `lib/api.ts` in server components/pages.
// To minimize changes to existing components that import these helpers, we provide lightweight synchronous stubs
// that return empty arrays. Server pages should call the API client and map results into the shape expected by components.

export interface NewsItem {
  Active_Flag: string;
  Categrory_Name: string;
  Image: string;
  Insert_Date: string;
  News_Content: string;
  News_Source: string;
  News_Title: string;
  News_Id: string;
  Slug?: string;
}

// Synchronous stubs (return no data). These exist only to avoid breaking client-side imports.
export function getAllNews(): NewsItem[] {
  return [];
}

export function getNewsByCategory(categoryName: string): NewsItem[] {
  return [];
}

export function getNewsById(id: string): NewsItem | undefined {
  return undefined;
}

export function getActiveNews(): NewsItem[] {
  return [];
}

export function getFeaturedNews(): NewsItem[] {
  return [];
}

export function getNewsChunks(news: NewsItem[], chunkSize: number = 8): NewsItem[][] {
  const chunks: NewsItem[][] = [];
  for (let i = 0; i < news.length; i += chunkSize) {
    chunks.push(news.slice(i, i + chunkSize));
  }
  return chunks;
}
