'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  Briefcase
} from 'lucide-react';

import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/hooks/useAuth';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Home Page Content */}
      {isAuthenticated ? (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome back, {user?.firstname}!
          </h1>
          
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Active Courses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Blog Posts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Job Openings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Your recent activity will appear here...</p>
            </div>
          </div>
        </div>
      ) : (
        // Landing page for non-authenticated users
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">EduTech</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empowering learners worldwide with quality education and professional development opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Courses</h3>
              <p className="text-gray-600">Access to high-quality educational content from industry experts.</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Events</h3>
              <p className="text-gray-600">Participate in live webinars, workshops, and networking events.</p>
            </div>
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Opportunities</h3>
              <p className="text-gray-600">Discover job opportunities and advance your career.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}