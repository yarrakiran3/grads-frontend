'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './SideBar';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading, isHydrated } = useAuth();
  
  // Pages where header and footer should not be shown
  const authPages = ['/auth/login', '/auth/register'];
  const isAuthPage = authPages.includes(pathname);

  // Show loading spinner during hydration
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // For auth pages, just return children without header/footer
  if (isAuthPage) {
    return <>{children}</>;
  }

  // For all other pages, show header/footer and conditional sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar - Only show when authenticated */}
        {isAuthenticated && <Sidebar />}
        
        {/* Main content */}
        <main className={`flex-1 ${isAuthenticated ? 'lg:ml-0' : ''}`}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}