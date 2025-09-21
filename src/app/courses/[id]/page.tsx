import { courseAPI } from '@/app/api/api';
import CourseDetail from '@/app/components/courses/CourseDetails';
import { Course } from '@/app/model/course';

export async function generateStaticParams() {
  const courses = await courseAPI.getAllCourses();
  return courses.data.map((c: Course) => ({ id: c.id.toString() }));
}

// Fix: Update the interface to make params a Promise
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Fix: Await the params since it's now a Promise
  const { id } = await params;
  const response = await courseAPI.getCourseById(Number(id));

  if (!response?.data) {
    return <div>Course not found</div>;
  }

  const course = response.data;

  return (
    <div className="min-h-screen bg-gray-100">
      <CourseDetail course={course} />
    </div>
  );
}