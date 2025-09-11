import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Course, Enrollment, CourseContextType, ApiError } from '../../app/model/course';
import { courseAPI } from '../api/api';

export  const CourseContext = createContext<CourseContextType | null>(null);

// Action types for reducer
type CourseAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'SET_CURRENT_COURSE'; payload: Course }
  | { type: 'SET_ENROLLMENTS'; payload: Enrollment[] }
  | { type: 'ADD_ENROLLMENT'; payload: Enrollment }
  | { type: 'CLEAR_ERROR' };

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

const courseReducer = (state: CourseState, action: CourseAction): CourseState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_COURSES':
      return { ...state, courses: action.payload, loading: false, error: null };
    case 'SET_CURRENT_COURSE':
      return { ...state, currentCourse: action.payload, loading: false, error: null };
    case 'SET_ENROLLMENTS':
      return { ...state, enrollments: action.payload };
    case 'ADD_ENROLLMENT':
      return { 
        ...state, 
        enrollments: [...state.enrollments, action.payload] 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  enrollments: [],
  loading: false,
  error: null,
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  // Fetch all courses
  const fetchCourses = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const courses = await courseAPI.getAllCourses();
      dispatch({ type: 'SET_COURSES', payload: courses });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch courses';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  // Fetch course by ID
  const fetchCourseById = async (id:  number): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const course = await courseAPI.getCourseById(id);
      const videos = await courseAPI.getCourseVideos(id);
      dispatch({ type: 'SET_CURRENT_COURSE', payload: { ...course, videos } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch course';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  // Enroll in course
  const enrollInCourse = async (courseId: number): Promise<boolean> => {
    try {
      const enrollment = await courseAPI.enrollInCourse(courseId);
      dispatch({ type: 'ADD_ENROLLMENT', payload: enrollment });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enroll in course';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return false;
    }
  };

  // Fetch user enrollments
  const fetchEnrollments = async (): Promise<void> => {
    try {
      const enrollments = await courseAPI.getUserEnrollments();
      dispatch({ type: 'SET_ENROLLMENTS', payload: enrollments });
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    }
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: CourseContextType = {
    ...state,
    fetchCourses,
    fetchCourseById,
    enrollInCourse,
    fetchEnrollments,
    clearError,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  ) as React.ReactElement;
};

export const useCourses = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  return context;
};
