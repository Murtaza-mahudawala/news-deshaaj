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