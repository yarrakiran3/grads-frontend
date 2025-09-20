'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Clock, BookOpen, Star, Lock, Unlock } from 'lucide-react';
import { courseAPI } from '@/app/api/api';
import { Course, Video, ApiResponse } from '@/app/model/course';

interface ErrorState {
  hasError: boolean;
  message: string;
  type: 'not_found' | 'invalid_id' | 'api_error' | 'unauthorized';
}

const CourseDetails = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: '',
    type: 'not_found'
  });
  
  const router = useRouter();
  const params = useParams();
  
  // Safely extract courseId with proper type checking
  const getCourseId = (): number | null => {
    const id = params.id;
    
    // Handle case when id is not present
    if (!id) {
      return null;
    }
    
    // Handle case when id is an array (shouldn't happen with [id] route, but safety first)
    if (Array.isArray(id)) {
      return null;
    }
    
    // Convert string to number and validate
    const numericId = parseInt(id, 10);
    
    // Check if it's a valid number
    if (isNaN(numericId) || numericId <= 0) {
      return null;
    }
    
    return numericId;
  };

  useEffect(() => {
    const courseId = getCourseId();
    
    if (courseId === null) {
      setError({
        hasError: true,
        message: 'Invalid course ID provided',
        type: 'invalid_id'
      });
      setLoading(false);
      return;
    }
    
    fetchCourseDetails(courseId);
  }, [params.id]);

  const fetchCourseDetails = async (courseId: number) => {
    try {
      const response: ApiResponse<Course> = await courseAPI.getCourseById(courseId);
      
      if (response.success ===true && response.data) {
        console.log("Fetched course details:", response.data);
        setCourse(response.data);
        setVideos(response.data.videos ? response.data.videos.sort((a, b) => a.orderIndex - b.orderIndex) : []);
        
        setError({ hasError: false, message: '', type: 'not_found' });
      } else {
        // Handle API returning success but no data
        setError({
          hasError: true,
          message: response.message || 'Course not found',
          type: 'not_found'
        });
      }
    } catch (error: any) {
      console.error('Error fetching course details:', error);
      
      // Handle different types of API errors
      if (error.response?.status === 404) {
        setError({
          hasError: true,
          message: 'Course not found or you don\'t have access to this course',
          type: 'not_found'
        });
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        setError({
          hasError: true,
          message: 'You don\'t have permission to access this course',
          type: 'unauthorized'
        });
      } else {
        setError({
          hasError: true,
          message: error.message || 'Failed to load course details',
          type: 'api_error'
        });
      }
    } finally{
        setLoading(false);
    }
  };

//   const fetchCourseVideos = async (courseId: number) => {
//     try {
//       const response: ApiResponse<Video[]> = await courseAPI.getCourseVideos(courseId);
//       console.log("Fetched videos:", response);
//       if (response.status === true && response.data) {
//         // Sort videos by order_index
//         const sortedVideos = response.data.sort((a, b) => a.orderIndex - b.orderIndex);
//         setVideos(sortedVideos);
//       } else {
//         setVideos([]);
//       }
//     } catch (error: any) {
//       console.error('Error fetching course videos:', error);
//       setVideos([]); // Set empty array on error, videos are not critical for the page
//     } finally {
//       
//     }
//   };

  const handleWatchVideo = (videoId: number, videoUrl: string) => {
  const courseId = getCourseId();
  if (courseId && course) {
    // Pass all necessary data to the video player
    const params = new URLSearchParams({
      courseId: courseId.toString(),
      courseTitle: course.title,
      videoId: videoId.toString(),
      videos: encodeURIComponent(JSON.stringify(videos)) // Pass all videos data
    });
    
    router.push(`/videoplayer?${params.toString()}`);
  }
};

  const handleBack = () => {
    router.push('/home/mycourses');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error.hasError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Courses
          </button>

          {/* Error Display */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              {error.type === 'not_found' && (
                <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
              )}
              {error.type === 'invalid_id' && (
                <BookOpen className="mx-auto h-16 w-16 text-red-400" />
              )}
              {error.type === 'unauthorized' && (
                <Lock className="mx-auto h-16 w-16 text-yellow-400" />
              )}
              {error.type === 'api_error' && (
                <BookOpen className="mx-auto h-16 w-16 text-red-400" />
              )}
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {error.type === 'not_found' && 'Course Not Found'}
              {error.type === 'invalid_id' && 'Invalid Course ID'}
              {error.type === 'unauthorized' && 'Access Denied'}
              {error.type === 'api_error' && 'Something Went Wrong'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {error.message}
            </p>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleBack}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to My Courses
              </button>
              
              {error.type === 'api_error' && (
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course not loaded (shouldn't happen, but safety check)
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we load the course details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Courses
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{videos.length} videos</span>
                </div>
                <div className="flex items-center">
                  {course.isPremium ? (
                    <>
                      <Lock className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>Premium Course</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 mr-1 text-green-500" />
                      <span>Free Course</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {course.isPremium && course.price && (
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                <div className="text-sm text-gray-600">Premium Content</div>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
            <p className="text-gray-600 text-sm mt-1">{videos.length} videos in this course</p>
          </div>

          {videos.length === 0 ? (
            <div className="p-6 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos available</h3>
              <p className="text-gray-500">This course doesn't have any videos yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {videos.map((video, index) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  index={index + 1}
                  onWatch={() => handleWatchVideo(video.id, video.s3ObjectKey || '')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface VideoItemProps {
  video: Video;
  index: number;
  onWatch: () => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, index, onWatch }) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4">
            {index}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{video.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Video {index}</span>
             
            </div>
          </div>
        </div>
        
        <button
          onClick={onWatch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Play className="h-4 w-4 mr-2" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;