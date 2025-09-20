import { Course } from '@/app/model/course';
import Link from 'next/link';

const CourseCard = ({ course }:{course:Course}) => {
  const { id, title, description, price, isPremium } = course;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>
          {isPremium && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Premium
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-blue-600">
            {!isPremium ? 'Free' : `$${price}`}
          </div>
          
          <Link 
            href={`/courses/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
