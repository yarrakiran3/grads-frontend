'use client';

import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

export default function BlogsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tech Insights & Learning Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive blog section is coming soon! Get ready for expert articles, 
            tutorials, and industry insights to accelerate your tech journey.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 mb-12">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="h-4 w-4 mr-2" />
              Coming Soon
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              We're Crafting Amazing Content for You
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is working hard to bring you high-quality articles, tutorials, 
              and industry insights. Stay tuned for updates!
            </p>
            <Button className="inline-flex items-center">
              Get Notified When We Launch
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* What to Expect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Industry Trends</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Stay ahead with the latest technology trends, market insights, and career guidance 
              from industry experts and thought leaders.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Tutorials</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Step-by-step guides, coding tutorials, and practical projects to help you 
              master new technologies and programming concepts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Success Stories</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Inspiring stories from our community members, career transformation journeys, 
              and tips from successful professionals in tech.
            </p>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-8 py-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Be the First to Know
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to get notified when we publish new articles and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
