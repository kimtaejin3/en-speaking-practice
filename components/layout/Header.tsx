'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  title?: string;
  backHref?: string;
}

export default function Header({ title, backHref }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const resolvedBackHref = backHref ?? (
    pathname.includes('/line-guessing') || pathname.includes('/full-conversation') || pathname.includes('/read-along')
      ? pathname.split('/').slice(0, 3).join('/')
      : pathname.startsWith('/day/')
        ? '/days'
        : '/'
  );

  return (
    <header className="sticky top-0 z-10 bg-surface border-b-2 border-border">
      <div className="flex items-center h-14 px-4">
        {isHome ? (
          <Link href="/" className="flex items-center gap-2 text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
            </svg>
          </Link>
        ) : (
          <>
            <Link
              href={resolvedBackHref}
              className="mr-3 w-10 h-10 flex items-center justify-center rounded-xl text-text-secondary hover:bg-bg transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <h1 className="text-lg font-bold truncate text-text">
              {title}
            </h1>
          </>
        )}
      </div>
    </header>
  );
}
