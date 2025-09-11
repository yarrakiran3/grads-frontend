"use client";
// src/pages/test-components.tsx (or src/app/test-components/page.tsx for App Router)
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { LoadingSpinner, PageLoader, InlineLoader } from '@/app/components/ui/LoadingSpinner';
import { Alert } from '@/app/components/ui/Alert';

const TestComponentsPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  const handleTestSubmit = () => {
    if (!inputValue) {
      setInputError('This field is required');
      return;
    }
    setInputError('');
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputError) setInputError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showPageLoader && <PageLoader text="Loading page..." />}
      
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">UI Components Test Page</h1>
          
          {/* Button Tests */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Button Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Variants</h3>
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Sizes</h3>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">⚙️</Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">States</h3>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button onClick={() => setLoading(!loading)}>
                  Toggle Loading Test
                </Button>
              </div>
            </div>
          </section>

          {/* Input Tests */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Input Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Basic Input"
                  placeholder="Enter some text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                
                <Input
                  label="Input with Error"
                  placeholder="Test validation"
                  error={inputError}
                  value={inputValue}
                  onChange={handleInputChange}
                />
                
                <Input
                  label="Input with Helper Text"
                  placeholder="Helper text example"
                  helperText="This is some helpful information"
                />
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Email Input"
                  type="email"
                  placeholder="email@example.com"
                  startIcon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />
                
                <Input
                  label="Password Input"
                  type="password"
                  placeholder="Enter password"
                  endIcon={
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
                
                <Input
                  label="Disabled Input"
                  placeholder="This is disabled"
                  disabled
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Button onClick={handleTestSubmit} loading={loading}>
                Test Form Submission
              </Button>
            </div>
          </section>

          {/* Loading Spinner Tests */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Loading Spinners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-medium text-gray-700 mb-2">Small</h3>
                <LoadingSpinner size="sm" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-700 mb-2">Medium</h3>
                <LoadingSpinner size="md" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-700 mb-2">Large</h3>
                <LoadingSpinner size="lg" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-700 mb-2">Extra Large</h3>
                <LoadingSpinner size="xl" />
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">With Text</h3>
                <LoadingSpinner size="md" text="Loading data..." />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Inline Loader</h3>
                <InlineLoader text="Processing..." />
              </div>
              
              <Button onClick={() => setShowPageLoader(true)}>
                Test Page Loader (Click to show for 3 seconds)
              </Button>
            </div>
          </section>

          {/* Alert Tests */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Alert Components</h2>
            <div className="space-y-4">
              <Alert variant="success" title="Success" dismissible>
                This is a success alert with a title and dismiss button.
              </Alert>
              
              <Alert variant="destructive" title="Error">
                This is an error alert. Something went wrong!
              </Alert>
              
              <Alert variant="warning" title="Warning" dismissible>
                This is a warning alert. Please pay attention.
              </Alert>
              
              <Alert variant="info" title="Information">
                This is an info alert with some helpful information.
              </Alert>
              
              <Alert variant="default">
                This is a default alert without a title.
              </Alert>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TestComponentsPage;