import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Content length helpers for SEO
export function clampHeadline(headline: string, max = 70): string {
  if (!headline) return '';
  return headline.length > max ? headline.slice(0, max - 1) + '…' : headline;
}

export function clampMetaDescription(desc: string, max = 160): string {
  if (!desc) return '';
  return desc.length > max ? desc.slice(0, max - 1) + '…' : desc;
}

export function clampLead(lead: string, max = 500): string {
  if (!lead) return '';
  return lead.length > max ? lead.slice(0, max - 1) + '…' : lead;
}

// Unicode-friendly slugifier that preserves non-Latin characters (e.g., Hindi) and
// replaces whitespace and punctuation with hyphens. Does NOT percent-encode so
// slugs are readable and match URL-decoded route params.
export function slugify(name: string): string {
  if (!name) return '';
  // Make a slug that preserves Devanagari (Hindi) characters while
  // avoiding Unicode property escapes which some TS setups may not
  // support. We explicitly allow the Devanagari block (U+0900-U+097F)
  // and basic Latin word characters.
  const s = String(name).trim().toLowerCase().normalize('NFKC');
  let cleaned = s
    .replace(/\s+/g, '-') // collapse whitespace to hyphen
    // keep ascii word chars, Devanagari range, and hyphens; replace others
    .replace(/[^\w\u0900-\u097F-]+/g, '-')
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-|-$/g, ''); // trim leading/trailing hyphens
  return cleaned;
}