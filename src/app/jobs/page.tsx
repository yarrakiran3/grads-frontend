'use client';

import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  TrendingUp, 
  Clock,
  Search,
  Filter,
  Star,
  Building,
  DollarSign,
  Users
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

export default function JobsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Briefcase className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tech Career Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your dream tech job awaits! We're building a comprehensive job portal 
            to connect talented developers with amazing opportunities.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 mb-12">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="h-4 w-4 mr-2" />
              Job Portal Coming Soon
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Building Your Gateway to Tech Careers
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're partnering with top companies to bring you the best job opportunities 
              in software development, data science, and emerging technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="inline-flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Get Job Alerts
              </Button>
              <Button variant="outline">
                Upload Your Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Job Categories Preview */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Categories We'll Feature
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Software Development */}
            <CategoryCard 
              icon={<Briefcase className="h-5 w-5 text-blue-600" />} 
              bg="bg-blue-100"
              title="Software Development"
              desc="Full-stack, Frontend, Backend"
              info="Coming soon: 500+ opportunities"
            />
            {/* Data Science */}
            <CategoryCard 
              icon={<TrendingUp className="h-5 w-5 text-purple-600" />} 
              bg="bg-purple-100"
              title="Data Science & AI"
              desc="ML Engineer, Data Analyst"
              info="Coming soon: 200+ opportunities"
            />
            {/* DevOps */}
            <CategoryCard 
              icon={<Building className="h-5 w-5 text-orange-600" />} 
              bg="bg-orange-100"
              title="DevOps & Cloud"
              desc="AWS, Azure, Kubernetes"
              info="Coming soon: 300+ opportunities"
            />
            {/* Product & Design */}
            <CategoryCard 
              icon={<Users className="h-5 w-5 text-red-600" />} 
              bg="bg-red-100"
              title="Product & Design"
              desc="UI/UX, Product Manager"
              info="Coming soon: 150+ opportunities"
            />
            {/* QA */}
            <CategoryCard 
              icon={<Star className="h-5 w-5 text-green-600" />} 
              bg="bg-green-100"
              title="Quality Assurance"
              desc="Manual, Automation Testing"
              info="Coming soon: 100+ opportunities"
            />
            {/* Cybersecurity */}
            <CategoryCard 
              icon={<DollarSign className="h-5 w-5 text-indigo-600" />} 
              bg="bg-indigo-100"
              title="Cybersecurity"
              desc="Security Analyst, Pentester"
              info="Coming soon: 80+ opportunities"
            />
          </div>
        </div>

        {/* Featured Jobs Preview */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Jobs (Preview)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <JobCard 
              role="Frontend Developer"
              company="Techify Solutions"
              location="Remote"
              type="Full-time"
              salary="$80k - $100k"
            />
            <JobCard 
              role="Data Scientist"
              company="AI Labs"
              location="Bangalore, India"
              type="Hybrid"
              salary="₹15L - ₹25L"
            />
          </div>
        </div>

        {/* Top Companies */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Top Companies We’re Partnering With
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Company A
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Company B
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Company C
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Be the First to Know
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Sign up now and get notified when we launch our job portal with real-time opportunities.
          </p>
          <Button className="inline-flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Notify Me
          </Button>
        </div>

      </div>
    </div>
  );
}

/* Small Reusable Components */

function CategoryCard({ icon, bg, title, desc, info }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500">{info}</div>
    </div>
  );
}

function JobCard({ role, company, location, type, salary }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{role}</h4>
      <p className="text-sm text-gray-600 mb-1">{company}</p>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="h-4 w-4 mr-1" /> {location}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{type}</span>
        <span>{salary}</span>
      </div>
    </div>
  );
}
