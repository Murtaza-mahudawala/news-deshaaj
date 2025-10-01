// Data utility functions for news data
// Note: In production, this would typically fetch from an API or database
// For now, we'll use a static import from the data directory in the project root
import newsData from '../data/news.json';

export interface NewsItem {
  Active_Flag: string;
  Categrory_Name: string;
  Image: string;
  Insert_Date: string;
  News_Content: string;
  News_Source: string;
  News_Title: string;
  News_Id: string;
  Slug: string;
}

// Get all news data
export function getAllNews(): NewsItem[] {
  return newsData as NewsItem[];
}

// Get news by category
export function getNewsByCategory(categoryName: string): NewsItem[] {
  const allNews = getAllNews();
  return allNews.filter(item => 
    item.Active_Flag === 'Y' && 
    item.Categrory_Name === categoryName
  );
}

// Get news by ID
export function getNewsById(id: string): NewsItem | undefined {
  const allNews = getAllNews();
  return allNews.find(item => item.News_Id === id);
}

// Get active news only
export function getActiveNews(): NewsItem[] {
  const allNews = getAllNews();
  return allNews.filter(item => item.Active_Flag === 'Y');
}

// Get featured news (first 7 active news items)
export function getFeaturedNews(): NewsItem[] {
  const activeNews = getActiveNews();
  return activeNews.slice(0, 7);
}

// Get news chunks for pagination
export function getNewsChunks(news: NewsItem[], chunkSize: number = 8): NewsItem[][] {
  const chunks: NewsItem[][] = [];
  for (let i = 0; i < news.length; i += chunkSize) {
    chunks.push(news.slice(i, i + chunkSize));
  }
  return chunks;
}
