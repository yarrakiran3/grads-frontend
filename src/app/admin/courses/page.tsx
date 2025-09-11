// pages/admin/courses/create.tsx or app/admin/courses/create/page.tsx (depending on your Next.js version)

'use client'; // If using App Router

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // or 'next/navigation' for App Router
import { toast } from 'react-hot-toast'; // You'll need to install react-hot-toast
import { setCourse } from '../lib/api';
import { CourseFormData, CourseFormDataError } from '../lib/model';


interface User {
  id: string;
  role: string;
  // Add other user properties as needed
}

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    price: 0,
    isPremium: false
  });

  const [errors, setErrors] = useState<Partial<CourseFormDataError>>({});

  // Check if user has ROLE_ADMIN access
//   useEffect(() => {
//     const checkAdminAccess = async () => {
//       try {
//         const token = localStorage.getItem('authToken'); // Adjust based on your auth implementation
        
//         if (!token) {
//           router.push('/login');
//           return;
//         }

//         const response = await fetch('/api/auth/me', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.ok) {
//           const user: User = await response.json();
//           if (user.role === 'ROLE_ADMIN') {
//             setIsAuthorized(true);
//           } else {
//             toast.error('Access denied. Admin privileges required.');
//             router.push('/dashboard');
//           }
//         } else {
//           router.push('/login');
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         router.push('/login');
//       } finally {
//         setIsCheckingAuth(false);
//       }
//     };

//     // checkAdminAccess();
//   }, [router]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CourseFormDataError> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price && formData.price == 0) {
      newErrors.price = 'Price is required';
    } else {
      if (isNaN(formData.price) || formData.price < 0) {
        newErrors.price = 'Price must be a valid positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CourseFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

        console.log('Form data before validation:', formData);

    try {
      
        console.log('Submitting course data:');
      const response = await setCourse(formData);

      const result = response.data;

      console.log("Course created successfully:", result);
      if (result) {
        toast.success('Course created successfully!');
       
        setTimeout(()=>{}, 10000);
        router.push(`/admin/courses/${result.id}`);
      } 
    } catch (error:any) {
      console.error('Error creating course:', error);
      toast.error(error.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
    
  };

  

//   if (isCheckingAuth) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthorized) {
//     return null; // This will be handled by the redirect in useEffect
//   }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the details below to create a new course
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter course title"
                maxLength={255}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter course description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Price Field */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-7 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Premium Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPremium"
                name="isPremium"
                checked={formData.isPremium}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-700">
                Premium Course
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating...
                  </div>
                ) : (
                  'Create Course'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
