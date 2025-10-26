import { NewsItem } from './data';
import { slugify } from './utils';

export interface ApiNewsItem {
  // API sometimes uses `news_id` (observed) and older code used `news_Id`.
  // Accept both for compatibility and prefer `news_id` when mapping.
  news_id?: number | string;
  news_Id?: number | string;
  news_Title: string;
  slug?: string;
  // API provides a short HTML summary in `news_Summary` and full HTML in `news_Content`.
  news_Summary?: string;
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
  fileName: string; // may be embed URL or watch URL; we'll normalize
  videoEmbed?: string; // derived URLs we add during mapping
  videoWatch?: string; // derived URLs we add during mapping
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

export interface ApiBlogItem {
  blog_id: number | string;
  blog_Title: string;
  slug?: string;
  blog_Summary?: string;
  blog_Content: string;
  image?: string;
  insert_Date?: string;
  blog_Source?: string;
  category?: string;
}

export interface ContentData {
  news: ApiNewsItem[];
  videos: ApiVideoItem[];
  galleries: ApiGalleryItem[];
  blog: ApiBlogItem[];
}

// Helper: map API blog to existing NewsItem shape used by components
function mapBlog(apiItem: ApiBlogItem): NewsItem {
  const raw = apiItem.blog_Summary || apiItem.blog_Content || '';
  const cleanContent = String(raw).replace(/<[^>]*>/g, '').trim();

  return {
    Active_Flag: 'Y',
    Categrory_Name: normalizeCategory(apiItem.category || apiItem.blog_Source || ''),
    Image: apiItem.image || '',
    Insert_Date: apiItem.insert_Date || '',
    News_Content: cleanContent,
    // Keep original HTML for detail pages
    News_Html: apiItem.blog_Content || '',
    News_Source: apiItem.blog_Source || 'Blog',
    News_Title: apiItem.blog_Title || '',
    News_Id: String(apiItem.blog_id || ''),
    // Normalize slug so route matching is consistent
    Slug: slugify(apiItem.slug || apiItem.blog_Title || String(apiItem.blog_id || '')) || undefined,
  } as NewsItem;
}

// Helper: map API news to existing NewsItem shape used by components

function mapNews(apiItem: ApiNewsItem): NewsItem {
  // prefer API's `news_Summary` for a short snippet, fallback to full HTML content
  const raw = apiItem.news_Summary || apiItem.news_Content || '';
  const cleanContent = String(raw).replace(/<[^>]*>/g, '').trim();

  const categoryRaw = apiItem.categrory_Name || (apiItem as any).category || '';
  const id = apiItem.news_id || apiItem.news_Id || '';

  return {
    Active_Flag: 'Y',
    Categrory_Name: normalizeCategory(categoryRaw),
    Image: apiItem.image || '',
    Insert_Date: apiItem.insert_Date || '',
    News_Content: cleanContent,
    News_Html: apiItem.news_Content || '',
    News_Source: apiItem.news_Source || '',
    News_Title: apiItem.news_Title || '',
    News_Id: String(id),
    Slug: slugify(apiItem.slug || apiItem.news_Title || String(id || '')) || undefined,
  } as NewsItem;
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

function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      // sometimes path contains /embed/ID
      const parts = u.pathname.split('/');
      const embedIdx = parts.indexOf('embed');
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    }
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
  } catch (e) {
    // not a full url, maybe it's an id already
  }
  // if looks like an id
  if (/^[A-Za-z0-9_-]{6,}$/.test(url)) return url;
  return null;
}

function makeYoutubeWatchUrl(urlOrId: string): string {
  const id = extractYoutubeId(urlOrId);
  return id ? `https://www.youtube.com/watch?v=${id}` : urlOrId;
}

export async function fetchContentData(): Promise<{ news: NewsItem[]; videos: ApiVideoItem[]; galleries: ApiGalleryItem[]; blog: NewsItem[] }> {
  // Use environment variable if present; otherwise fall back to the provided TimesMed API endpoint
  const fallback = 'https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=26&language=Hindi';
  const base = process.env.NEXT_PUBLIC_API_URL || fallback;
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.info(`NEXT_PUBLIC_API_URL सेट नहीं है — डेवलपमेंट में डिफ़ॉल्ट API का उपयोग कर रहे हैं: ${fallback}`);
  }

  // Support short server-side caching / ISR via NEXT_PUBLIC_API_REVALIDATE (seconds)
  // Default to 60s to avoid dynamic rendering and speed up navbar/categories.
  const revalidateSec = Number(process.env.NEXT_PUBLIC_API_REVALIDATE || 60);
  const fetchOpts: RequestInit = ({ next: { revalidate: revalidateSec } } as any);

  // Simple in-memory cache & in-flight dedupe to avoid duplicate network requests during dev hot reloads
  const cacheKey = `${base}::${revalidateSec}`;
  // eslint-disable-next-line @typescript-eslint/ban-types
  const globalAny = global as any;
  if (!globalAny.__content_cache) globalAny.__content_cache = new Map<string, { ts: number; data: any }>();
  if (!globalAny.__content_inflight) globalAny.__content_inflight = new Map<string, Promise<any>>();

  // return cached if still valid (revalidateSec > 0)
  const cached = globalAny.__content_cache.get(cacheKey);
  if (cached && revalidateSec > 0 && Date.now() - cached.ts < revalidateSec * 1000) {
    return cached.data;
  }

  // if there's an in-flight fetch for the same key, wait for it
  if (globalAny.__content_inflight.has(cacheKey)) {
    return await globalAny.__content_inflight.get(cacheKey);
  }

  const inflight = (async () => {
    try {
      const res = await fetch(base, fetchOpts);
      if (!res.ok) {
        console.error('API से डेटा प्राप्त करने में त्रुटि:', res.statusText);
        return { news: [], videos: [], galleries: [], blog: [] };
      }

      const json = await res.json();
      const payload: any = json.data || json;

      const apiNews: ApiNewsItem[] = Array.isArray(payload.news) ? payload.news : [];
      const apiVideos: ApiVideoItem[] = Array.isArray(payload.videos) ? payload.videos : [];
      const apiGalleries: ApiGalleryItem[] = Array.isArray(payload.galleries) ? payload.galleries : [];
      // API may return `blog` or `blogs` key — accept both
      const apiBlog: ApiBlogItem[] = Array.isArray(payload.blogs)
        ? payload.blogs
        : Array.isArray(payload.blog)
        ? payload.blog
        : [];

      const news = apiNews.map(mapNews);
      const blog = apiBlog.map(mapBlog);
      const videos = apiVideos.map((v) => ({
        ...v,
        fileName: v.fileName || '',
        videoEmbed: normalizeYoutubeEmbed(v.fileName || ''),
        videoWatch: makeYoutubeWatchUrl(v.fileName || ''),
      }));

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

      const result = { news, videos, galleries, blog };

      // store in cache
      try {
        globalAny.__content_cache.set(cacheKey, { ts: Date.now(), data: result });
      } catch (e) {
        // ignore cache set errors
      }
      return result;
    } catch (err) {
      console.error('डेटा लोड करने में त्रुटि हुई।', err);
      return { news: [], videos: [], galleries: [], blog: [] };
    }
  })();

  globalAny.__content_inflight.set(cacheKey, inflight);
  try {
    const data = await inflight;
    return data;
  } finally {
    globalAny.__content_inflight.delete(cacheKey);
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
