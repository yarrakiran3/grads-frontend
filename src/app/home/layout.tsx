// src/components/Layout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  Briefcase, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';

import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading, isHydrated } = useAuth();
  const router = useRouter();

  // Show loading spinner during hydration
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Navigation items
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Blogs', href: '/blogs', icon: FileText },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
  ];

  const userMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu Toggle */}
            <div className="flex items-center">
              {showSidebar && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              )}
              
              <Link href="/" className="flex items-center ml-2 lg:ml-0">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">EduTech</span>
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, events, jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Auth status */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
                    <Bell className="h-5 w-5" />
                  </button>

                  {/* User Menu */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {user?.firstname?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {user?.firstname || 'User'}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        {user?.email}
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && isAuthenticated && (
          <>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              lg:block
            `}>
              <div className="flex flex-col h-full pt-16 lg:pt-0">
                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* User info at bottom */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {user?.firstname?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstname} {user?.lastname}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main content */}
        <main className={`
          flex-1 min-h-screen 
          ${showSidebar && isAuthenticated ? 'lg:ml-0' : ''}
        `}>
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">EduTech</span>
              </Link>
              <p className="text-gray-600 text-sm max-w-md">
                Empowering learners worldwide with quality education and professional development opportunities.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2024 EduTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;