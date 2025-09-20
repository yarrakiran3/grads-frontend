'use client';

import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Mic,
  Video,
  Award,
  Bell
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

export default function EventsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tech Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect, learn, and grow with our upcoming events! We're preparing an exciting 
            lineup of workshops, webinars, and networking opportunities.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 mb-12">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="h-4 w-4 mr-2" />
              Events Loading Soon
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Exciting Events Are On The Way!
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're curating amazing workshops, tech talks, and networking events with 
              industry leaders. Be ready to level up your skills!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="inline-flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notify Me About Events
              </Button>
              <Button variant="outline">
                Suggest an Event Topic
              </Button>
            </div>
          </div>
        </div>

        {/* Event Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tech Talks</h3>
            <p className="text-sm text-gray-600">
              Expert sessions on cutting-edge technologies and industry trends
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
            <p className="text-sm text-gray-600">
              Hands-on coding sessions and practical skill-building activities
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Networking</h3>
            <p className="text-sm text-gray-600">
              Connect with peers, mentors, and industry professionals
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitions</h3>
            <p className="text-sm text-gray-600">
              Coding challenges, hackathons, and skill-based contests
            </p>
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-8 py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              What's Coming in Our Events Platform
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Live Interactive Sessions</h4>
                    <p className="text-sm text-gray-600">Real-time Q&A and hands-on activities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Recording Access</h4>
                    <p className="text-sm text-gray-600">Watch sessions anytime after the event</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Certificates</h4>
                    <p className="text-sm text-gray-600">Get certified for event participation</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Calendar Integration</h4>
                    <p className="text-sm text-gray-600">Sync events with your personal calendar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Community Discussion</h4>
                    <p className="text-sm text-gray-600">Connect with other attendees</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Resource Downloads</h4>
                    <p className="text-sm text-gray-600">Access slides and materials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
