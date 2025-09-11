import { apiUtils } from "@/app/api/api";
import { CourseCreationResponse, CourseFormData } from "./model";



export const setCourse = async (courseData: CourseFormData) :Promise<CourseCreationResponse>=> {
  try {
    const response = await apiUtils.post<CourseCreationResponse>('/course/create', courseData);
    return response;
  } catch (error) {
    console.error("Error setting course:", error);
    throw error;
  }
}
