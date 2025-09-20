
// Course types
export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  isPremium: boolean;
  createdAt: string;
  videos?: Video[];
}

// Video types
export interface Video {
  id: number;
  courseId: number;
  title: string;
  s3ObjectKey: string;
  orderIndex: number;
}

// Enrollment types
export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  isPremium:boolean;
  courseTitle:string;
  courseDescription:string;
  coursePrice:number;
}
// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Progress tracking
export interface VideoProgress {
  videoId: number;
  courseId: number;
  progress: number;
  lastWatched: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Context types
export interface CourseContextType {
  courses: Course[];
  currentCourse: Course | null;
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: number ) => Promise<void>;
  enrollInCourse: (courseId: number) => Promise<boolean>;
  fetchEnrollments: () => Promise<void>;
  clearError: () => void;
}

// Component Props types
export interface CourseCardProps {
  course: Course;
}

export interface VideoPlayerProps {
  video: Video;
  courseId: string | number;
  onProgress?: (progress: number) => void;
}

export interface CourseDetailProps {
  course: Course;
}

export interface NavigationProps {
  className?: string;
}