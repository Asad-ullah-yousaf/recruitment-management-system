'use client';

import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated (except on auth pages)
    if (!isAuthenticated && typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (!path.startsWith('/auth') && path !== '/') {
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, router]);

  // Check if we're on an auth page or home page
  const isAuthPage = pathname?.startsWith('/auth') || pathname === '/';
  const showSidebar = isAuthenticated && !isAuthPage;

  return (
    <div className="min-h-screen bg-background flex">
      {showSidebar && <Sidebar />}
      <main className={cn("flex-1 w-full", showSidebar && "lg:ml-64")}>
        {isAuthPage ? (
          <div className="w-full">
            {children}
          </div>
        ) : (
          <div className="p-4 lg:p-6 xl:p-8">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}

