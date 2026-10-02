import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// صور Unsplash هنا مجرد placeholder مؤقت، مش صور الوحدة الحقيقية
export function isPlaceholderImage(url?: string | null) {
  return !url || url.includes('images.unsplash.com');
}
