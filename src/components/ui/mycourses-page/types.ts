export interface Course {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  status: "completed" | "inProgress" | "notStarted";
  weeksToComplete: number;
  duration: number;
  views: number;
  rating: number;
  progress: number;
  instructorId?: number;
  authorImage?: string;
}

export interface Instructor {
  id: number;
  name: string;
  bio: string;
  profile_picture: string;
  rating: number;
  course_titles?: string[];
  course_count?: number;
}

export interface CurriculumItem {
  id: number;
  course_id: number;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
}

export interface ModuleProgress {
  module_id: number;
  status: "not_started" | "in_progress" | "completed";
  completed_at: string | null;
}

export interface CourseProgress {
  student_id: number;
  course_id: number;
  completion_ratio: number;
  completed_modules: number;
  total_modules: number;
  modules: ModuleProgress[];
}
