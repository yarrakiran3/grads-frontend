export interface CourseFormData {
    title: string;
    description: string;
    price: number;
    isPremium: boolean;
}

export interface CourseFormDataError {
    title: string;
    description: string;
    price: string;
    isPremium: boolean;
}

export interface VideoDTO {
    id:number;
    courseId:number;
    title:string;
    s3ObjectKey:string;
    orderIndex:number;
    fileSizeBytes:number;

}
export interface CourseCreationResponse {

    message:string;
    sucess: boolean;
    data: VideoDTO
}