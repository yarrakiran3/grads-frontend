
import { Course } from '@/app/model/course';

const CourseDetail = ({ course }:{course:Course}) => {
  

  const handleEnrollment = async () => {
    // setIsEnrolling(true);
    // const success = await enrollInCourse(course.id);
    // if (success) {
    //   setIsEnrolled(true);
    // }
    // setIsEnrolling(false);
  };

  // const canAccess = !course.isPremium || isEnrolled;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-blue-100 text-lg">{course.description}</p>
            </div>
            <div className="text-right">
              {course.isPremium && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">
                  Premium
                </span>
              )}
              <div className="text-2xl font-bold">
                {!course.isPremium ? 'Free' : `$${course.price}`}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-8">
          {/* Enrollment Section */}
          {/* {!isEnrolled && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">
                {course.isPremium ? 'Premium Course' : 'Free Course'}
              </h3>
              <p className="text-gray-600 mb-4">
                {course.isPremium 
                  ? 'This is a premium course. Purchase to get access to all videos and materials.'
                  : 'This is a free course. Enroll to start learning immediately.'
                }
              </p>
              <button
                onClick={handleEnrollment}
                disabled={isEnrolling}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            </div>
          )} */}

          {/* Video List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Course Videos</h3>
            {course.videos && course.videos.length > 0 ? (
              <div className="space-y-3">
                {course.videos.map((video, index) => (
                  <div 
                    key={video.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-lg">{video.title}</h4>
                        <span className="text-gray-500 text-sm">
                          Video {index + 1}
                        </span>
                      </div>
                      
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No videos available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
