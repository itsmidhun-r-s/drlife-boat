import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names and de-duplicate conflicting Tailwind classes. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
