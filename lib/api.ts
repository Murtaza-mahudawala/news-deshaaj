export interface ApiNewsItem {
  news_Id: number | string;
  news_Title: string;
  slug?: string;
  news_Content: string;
  image?: string;
  insert_Date?: string;
  news_Source?: string;
  categrory_Name?: string;
}

export interface ApiVideoItem {
  videoDetail_id: number | string;
  videoTitle: string;
  image?: string;
  fileName: string; // may be embed URL or watch URL; we'll normalize to embed URL
  insert_Date?: string;
}

export interface ApiGalleryDetail {
  fileName: string;
}

export interface ApiGalleryItem {
  galleryMaster_id: number | string;
  galleryMaster_Title: string;
  galleryDetailList: ApiGalleryDetail[];
}

export interface ContentData {
  news: ApiNewsItem[];
  videos: ApiVideoItem[];
  galleries: ApiGalleryItem[];
}

// Helper: map API news to existing NewsItem shape used by components
import { NewsItem } from './data';

function mapNews(apiItem: ApiNewsItem): NewsItem {
  return {
    Active_Flag: 'Y',
    Categrory_Name: normalizeCategory((apiItem as any).categrory_Name || (apiItem as any).category_Name || (apiItem as any).categroryName || ''),
    Image: (apiItem as any).image || (apiItem as any).Image || '',
    Insert_Date: (apiItem as any).insert_Date || (apiItem as any).insertDate || '',
  News_Content: (apiItem as any).news_Content || (apiItem as any).newsContent || '',
  News_Source: (apiItem as any).news_Source || (apiItem as any).newsSource || '',
  News_Title: (apiItem as any).news_Title || (apiItem as any).newsTitle || '',
  News_Id: String((apiItem as any).news_Id || (apiItem as any).newsId || ''),
    Slug: apiItem.slug || (apiItem as any).Slug || undefined,
  };
}

// Map common incoming category strings to the Hindi category names used in components
const CATEGORY_MAP: Record<string, string> = {
  'cricket': 'क्रिकेट',
  'cricket news': 'क्रिकेट',
  'cricket_news': 'क्रिकेट',
  'general': 'सामान्य',
  'utility': 'सामान्य',
  'business': 'व्यापार समाचार',
  'business news': 'व्यापार समाचार',
  'it news': 'तकनीक',
  'it': 'तकनीक',
  'technology': 'तकनीक',
  'tech': 'तकनीक',
  'stock market': 'शेयर बाज़ार',
  'stock': 'शेयर बाज़ार',
  'national': 'राष्ट्रीय समाचार',
  'national news': 'राष्ट्रीय समाचार',
  'news': 'सामान्य',
  'home': 'घर',
  'ghar': 'घर',
  'देश': 'देश',
  'desh': 'देश',
};

function normalizeCategory(raw: string): string {
  if (!raw) return '';
  const key = String(raw).trim().toLowerCase();
  return CATEGORY_MAP[key] || raw;
}

function normalizeYoutubeEmbed(url: string): string {
  if (!url) return '';
  try {
    // If already an embed URL, return as-is
    if (url.includes('/embed/')) return url;
    // Typical watch URL formats
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    // not a full URL — maybe already an ID
  }
  // If it's just an ID, create an embed URL
  if (/^[A-Za-z0-9_-]{6,}$/.test(url)) {
    return `https://www.youtube.com/embed/${url}`;
  }
  return url;
}

export async function fetchContentData(): Promise<{ news: NewsItem[]; videos: ApiVideoItem[]; galleries: ApiGalleryItem[] }> {
  // Use environment variable if present; otherwise fall back to the provided TimesMed API endpoint
  const fallback = 'https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=26&language=Hindi';
  const base = process.env.NEXT_PUBLIC_API_URL || fallback;
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.info(`NEXT_PUBLIC_API_URL सेट नहीं है — डेवलपमेंट में डिफ़ॉल्ट API का उपयोग कर रहे हैं: ${fallback}`);
  }

  try {
  // Support short server-side caching / ISR via NEXT_PUBLIC_API_REVALIDATE (seconds)
  const revalidateSec = Number(process.env.NEXT_PUBLIC_API_REVALIDATE || 0);
  const fetchOpts: RequestInit = revalidateSec > 0 ? { next: { revalidate: revalidateSec } as any } : { cache: 'no-store' };
  const res = await fetch(base, fetchOpts);
    if (!res.ok) {
      console.error('API से डेटा प्राप्त करने में त्रुटि:', res.statusText);
      return { news: [], videos: [], galleries: [] };
    }

    const json = await res.json();
    const payload: any = json.data || json;

    const apiNews: ApiNewsItem[] = Array.isArray(payload.news) ? payload.news : [];
  const apiVideos: ApiVideoItem[] = Array.isArray(payload.videos) ? payload.videos : [];
  const apiGalleries: ApiGalleryItem[] = Array.isArray(payload.galleries) ? payload.galleries : [];

  const news = apiNews.map(mapNews);
    // normalize video fileName to embed URL where possible
    const videos = apiVideos.map((v) => ({ ...v, fileName: normalizeYoutubeEmbed(v.fileName || '') }));

    // normalize galleries: support alternate property names like gallery_DetailList
    const galleries = apiGalleries.map((g) => {
      const detailList: ApiGalleryDetail[] = Array.isArray((g as any).galleryDetailList)
        ? (g as any).galleryDetailList
        : Array.isArray((g as any).gallery_DetailList)
        ? (g as any).gallery_DetailList
        : Array.isArray((g as any).galleryDetail)
        ? (g as any).galleryDetail
        : [];

      const normalizedDetails = detailList.map((d: any) => ({ fileName: d.fileName || d.FileName || d.file_name || '' }));

      const rawTitle = (g as any).galleryMaster_Title || (g as any).galleryMasterTitle || (g as any).galleryMaster || '';
      return {
        galleryMaster_id: (g as any).galleryMaster_id || (g as any).galleryMasterId || '',
        galleryMaster_Title: sanitizeTitle(rawTitle),
        galleryDetailList: normalizedDetails,
      } as ApiGalleryItem;
    });

    return { news, videos, galleries };
  } catch (err) {
    console.error('डेटा लोड करने में त्रुटि हुई।', err);
    return { news: [], videos: [], galleries: [] };
  }
}

function sanitizeTitle(title: string | undefined | null): string {
  const fallback = 'फोटो गैलरी';
  if (!title) return fallback;
  const t = String(title).trim();
  if (!t) return fallback;

  const englishKeywords = /lake|lakes|india|winter|stunning|top|best|travel|tourism/i;
  if (englishKeywords.test(t)) return fallback;

  const latinCount = (t.match(/[A-Za-z0-9]/g) || []).length;
  const total = t.replace(/\s+/g, '').length || 1;
  if (latinCount / total > 0.5) return fallback;

  return t;
}
