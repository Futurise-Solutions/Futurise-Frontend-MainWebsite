'use client';
import { usePathname } from 'next/navigation';

/**
 * usePathname() with the home route normalised.
 * When Vercel regenerates the cached home page (ISR), Next renders it as "/index", while
 * the browser hydrates at "/". Anything keyed on the path (active nav link, home-only
 * header styling) then differs between server and client and React throws #418.
 */
export default function useSitePathname() {
  const pathname = usePathname() || '/';
  return pathname === '/index' ? '/' : pathname;
}
