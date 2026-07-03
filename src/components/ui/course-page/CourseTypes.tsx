export interface Course {
  course_id: number;
  course_title: string;
  progress: number;
  completed: boolean;
  description: string;
  course_image: string;
  duration: number;
}

export interface Instructor {
  id: number;
  name: string;
  bio: string;
  rating: number;
  profile_picture: string;
  course_titles: string[];
  course_count: number;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timer?: number;
}

export interface Material {
  id: number;
  course_id: number;
  module_id: number;
  title: string;
  file_type: string;
  file_url: string;
}

export interface LiveClass {
  id: number;
  course_id: number;
  title: string;
  scheduled_at: string;
  join_link: string;
  recorded_link: string;
}

export interface CurriculumItem {
  id: number;
  course_id: number;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
}

export interface Certificate {
  certificate_no: string;
  course_name: string;
  issued_at: string;
  status: string;
  download_url: string;
}

export interface CertificateResponse {
  student_id: number;
  certificates: Certificate[];
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: string;
  completed: boolean;
}
