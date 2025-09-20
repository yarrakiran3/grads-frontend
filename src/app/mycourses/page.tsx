'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Play, Star, Lock, Unlock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { courseAPI } from '@/app/api/api';
import { Enrollment } from '@/app/model/course';

const MyCourses = () => {
  const [courses, setCourses] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const enrollments = await courseAPI.getUserEnrollments();
      
      // If enrollments contain course data directly, use it
      // Otherwise, fetch course details for each enrollment
      let coursesData:Enrollment[] = [];
      
      if (enrollments && enrollments.data.length > 0) {
        // Assuming enrollments contain course information
        // If not, you might need to fetch course details separately
        coursesData = enrollments.data;
        
        // Sort: Premium courses first, then free courses
        const sortedCourses = coursesData.sort((a, b) => {
          if (a.isPremium && !b.isPremium) return -1;
          if (!a.isPremium && b.isPremium) return 1;
          return 0;
        });
        setCourses(sortedCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId:number) => {
    router.push(`/mycourses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
            <p className="text-gray-500 mb-6">Start learning by enrolling in your first course</p>
            <button 
              onClick={() => router.push('/courses')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            {/* Premium Courses Section */}
            {courses.filter(course => course.isPremium).length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Premium Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.filter(course => course.isPremium).map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      onClick={() => handleCourseClick(course.courseId)}
                      isPremium={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Free Courses Section */}
            {courses.filter(course => !course.isPremium).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Unlock className="h-5 w-5 text-green-500 mr-2" />
                  Free Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.filter(course => !course.isPremium).map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      onClick={() => handleCourseClick(course.id)}
                      isPremium={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course, onClick, isPremium }:{course:Enrollment,onClick:any,isPremium:boolean}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {course.courseTitle}
          </h3>
          {isPremium ? (
            <Lock className="h-4 w-4 text-yellow-500" />
          ) : (
            <Unlock className="h-4 w-4 text-green-500" />
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.courseDescription}
        </p>

        <div className="flex items-center justify-between">
          {/* <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.video_count || 0} videos</span>
          </div> */}
          
          <div className="flex items-center text-blue-600 group-hover:text-blue-800">
            <Play className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Continue</span>
          </div>
        </div>

        {isPremium && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Premium Content</span>
              <span className="text-sm font-bold text-gray-900">
                ${course.coursePrice}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;