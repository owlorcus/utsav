import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return d.toLocaleDateString('en-IN', options);
}

export function formatDateRange(startDate: Date | string, endDate?: Date | string): string {
  const start = new Date(startDate);
  
  if (!endDate) {
    return formatDate(start);
  }
  
  const end = new Date(endDate);
  
  const startOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  const endOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  
  if (start.getFullYear() === end.getFullYear() && 
      start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-IN', { day: 'numeric' })}-${end.toLocaleDateString('en-IN', endOptions)}`;
  } else if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-IN', startOptions)}-${end.toLocaleDateString('en-IN', endOptions)}`;
  } else {
    return `${start.toLocaleDateString('en-IN', { ...startOptions, year: 'numeric' })}-${end.toLocaleDateString('en-IN', endOptions)}`;
  }
}
