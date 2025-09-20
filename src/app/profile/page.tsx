'use client';

import React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Edit3, 
  Settings,
  Shield,
  Bell,
  Activity
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/hooks/useAuth';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Picture */}
              <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-3xl">
                  {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
                </span>
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" className="flex items-center">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {user.firstname || 'Not provided'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {user.lastname || 'Not provided'}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {user.email}
                    </div>
                  </div>
                  {/* {user.id && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User ID
                      </label>
                      <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md font-mono">
                        {user.id}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Account Activity
                </h2>
              </div>
              <div className="px-6 py-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Login</p>
                      <p className="text-sm text-gray-500">Recently active</p>
                    </div>
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Status</p>
                      <p className="text-sm text-green-600">Active</p>
                    </div>
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profile Completion</p>
                      <p className="text-sm text-gray-500">Basic information provided</p>
                    </div>
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="px-6 py-6 space-y-3">
                <button className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Edit3 className="h-4 w-4 mr-3 text-blue-600" />
                  Update Profile
                </button>
                <button className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Shield className="h-4 w-4 mr-3 text-green-600" />
                  Change Password
                </button>
                <button className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Bell className="h-4 w-4 mr-3 text-purple-600" />
                  Notification Settings
                </button>
                <button className="w-full flex items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                  <Settings className="h-4 w-4 mr-3 text-gray-600" />
                  Account Settings
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Enrolled</span>
                  <span className="text-sm font-semibold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Events Attended</span>
                  <span className="text-sm font-semibold text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Posts Read</span>
                  <span className="text-sm font-semibold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Applications Sent</span>
                  <span className="text-sm font-semibold text-gray-900">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}