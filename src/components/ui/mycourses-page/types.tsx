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

export const extractTags = (titles: string[]) => {
  if (!titles || titles.length === 0) return ["React", "TypeScript", "UI/UX"];

  const cleanTitles = titles.map((t) => t.trim()).filter(Boolean);
  const allShort = cleanTitles.every((t) => t.length <= 15);
  if (allShort && cleanTitles.length > 0) {
    return cleanTitles.slice(0, 3);
  }

  const combined = cleanTitles.join(" ").toLowerCase();
  const found: string[] = [];
  if (combined.includes("react")) found.push("React");
  if (combined.includes("typescript") || combined.includes("ts"))
    found.push("TypeScript");
  if (
    combined.includes("ui") ||
    combined.includes("ux") ||
    combined.includes("design")
  )
    found.push("UI/UX");
  if (
    combined.includes("javascript") ||
    (combined.includes("js") && !found.includes("JavaScript"))
  )
    found.push("JavaScript");
  if (combined.includes("python")) found.push("Python");
  if (combined.includes("selenium")) found.push("Selenium");
  if (combined.includes("mobile")) found.push("Mobile Testing");
  if (combined.includes("node")) found.push("Node.js");
  if (combined.includes("web")) found.push("Web Dev");
  if (combined.includes("ai") || combined.includes("ml")) found.push("AI/ML");

  if (found.length < 3) {
    cleanTitles.forEach((t) => {
      const words = t.split(" ");
      const candidate = words.slice(0, 2).join(" ");
      if (candidate && candidate.length <= 15 && !found.includes(candidate)) {
        found.push(candidate);
      } else if (
        words[0] &&
        words[0].length > 2 &&
        !found.includes(words[0])
      ) {
        found.push(words[0]);
      }
    });
  }

  if (!found.includes("React") && found.length < 3) found.push("React");
  if (!found.includes("TypeScript") && found.length < 3)
    found.push("TypeScript");
  if (!found.includes("UI/UX") && found.length < 3) found.push("UI/UX");

  return found.slice(0, 3);
};

export * from './InstructorCard';
export * from './CourseCard';
