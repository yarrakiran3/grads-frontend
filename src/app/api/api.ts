import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from '../model/authmodel';
import { tokenStorageUtils } from "@/app/utils/tokenstorage";
import { Course, Enrollment, Video, VideoProgress } from '../model/course';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorageUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', response);
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status || 500,
    };

    // console.error('API Error:', apiError, error);

    console.log(error)
    // Handle specific error cases
     if (error.response?.status === 400 || error.response?.status === 401) {
      
      apiError.message = 'Session expired. Please login again.'; 
      // Redirect to login if we're in browser
      if (typeof window !== 'undefined') {
        tokenStorageUtils.clearAll();
        // Only redirect if NOT already on /auth/login
        if (window.location.pathname !== '/auth/login') {
          
          window.location.href = '/auth/login';
        }
      } 
      console.log("error in apiClient interceptor",error);
    }
     else if (error.response?.status === 403) {
      apiError.message = 'Access denied. Insufficient permissions.';
    } else if (error.response?.status === 404) {
      apiError.message = 'Resource not found.';
    } else if (error.response?.status === 422) {
      apiError.message = 'Validation failed. Please check your input.';
    }
      // } else if (error.response?.status >= 500) {
    //   apiError.message = 'Server error. Please try again later.';
    // } else if (error.response?.data?.message) {
    //   apiError.message = error.response.data.message;
    // }

    return Promise.reject({
      ...apiError,
      original:error
    });
  }
);


// Generic API utilities
export const apiUtils = {
  // Generic GET request
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  },

  // Generic POST request
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await apiClient.post<T>(endpoint, data);
    console.log("Response from POST request:", response.data);
    return response.data;
  },

  // Generic PUT request
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await apiClient.put<T>(endpoint, data);
    return response.data;
  },

  // Generic DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await apiClient.delete<T>(endpoint);
    return response.data;
  },
};

// Export the configured axios instance for direct use if needed
export { apiClient };

// Course API functions
export const courseAPI = {
  // Fetch all courses
  getAllCourses: ():Promise<Course[]> => apiUtils.get('/courses'),
  
  // Fetch course by ID
  getCourseById: (id:number):Promise<Course> => apiUtils.get(`/courses/${id}`),
  
  // Fetch course videos
  getCourseVideos: (courseId:number):Promise<Video[]> => apiUtils.get(`/courses/${courseId}/videos`),
  
  // Enroll in course
  enrollInCourse: (courseId:number):Promise<Enrollment> => 
    apiUtils.post(`/courses/${courseId}/enroll`,courseId),
  
  // Check if user is enrolled
  checkEnrollment: (courseId:number): Promise<{ enrolled: boolean }> => apiUtils.get(`/courses/${courseId}/enrollment`),
  
  // Get user enrollments
  getUserEnrollments: (): Promise<Enrollment[]>  => apiUtils.get('/enrollments'),
  
  // Update video progress
  updateProgress: (courseId:number, videoId:number, progress:any):Promise<VideoProgress> =>
    apiUtils.post(`/courses/${courseId}/videos/${videoId}/progress`, { progress }),
};

// User API functions
export const userAPI = {
  getCurrentUser: () => apiUtils.get('/users/me'),
};


// Export default
export default {
  
  utils: apiUtils,
  client: apiClient,
};


