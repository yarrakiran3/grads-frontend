
import CourseCard from '@/app/components/courses/CourseCard';
import { Course } from '@/app/model/course';
import { courseAPI } from '@/app/api/api';

export default async function Page ()  {

const courses:Course[] = (await courseAPI.getAllCourses()).data;

  if(!courses){
    throw new Error('Failed to Fetch courses ');
  }
  

  return (
    
    <div className="min-h-screen bg-gray-100 rounded-2xl">
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Courses</h1>
          <p className="text-gray-600">Discover our collection of courses</p>
        </div>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

 
