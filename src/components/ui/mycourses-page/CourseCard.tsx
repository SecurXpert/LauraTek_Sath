import React, { useState } from "react";
import { VITE_API_URL } from '@/services/api/api';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Clock, Star } from "lucide-react";
import { decodeJWT } from "@/lib/jwtUtils";
import { Course, CourseProgress } from "./types";

interface CourseCardProps {
  course: Course;
  onViewCurriculum: (c: Course) => void;
  currentStreak?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewCurriculum,
  currentStreak = 0,
}) => {
  const navigate = useNavigate();

  // New states for progress
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "bg-green-500", badge: "bg-green-100 text-green-800" };
      case "inProgress":
        return { bg: "bg-blue-500", badge: "bg-blue-100 text-blue-800" };
      default:
        return { bg: "bg-gray-500", badge: "bg-gray-100 text-gray-800" };
    }
  };

  const statusColors = getStatusColor(course.status);

  const fetchModuleProgress = async (moduleId: number) => {
    setLoadingProgress(true);
    setSelectedModuleId(moduleId);
    setCourseProgress(null);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }
      const decoded = decodeJWT(token);
      const studentId = decoded?.student_id || Number(decoded?.sub) || 12;
      const res = await fetch(
        `${VITE_API_URL}/courses/students/${studentId}/courses/${course.id}/progress`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCourseProgress(data);
      } else {
        console.error("Progress fetch failed:", res.status, await res.text());
        setCourseProgress(null);
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
      setCourseProgress(null);
    } finally {
      setLoadingProgress(false);
    }
  };

  const clearProgress = () => {
    setSelectedModuleId(null);
    setCourseProgress(null);
  };

  const isFirst = course.title.includes("Advanced React") || course.id === 1;
  const isSecond = course.title.includes("Python") || course.id === 2;
  const isThird =
    course.title.includes("UI/UX") ||
    course.status === "completed" ||
    course.id === 3;

  const streakDays = currentStreak;

  const totalMods = isFirst ? 10 : isSecond ? 8 : isThird ? 12 : 10;
  const completedMods = isThird
    ? totalMods
    : isFirst
    ? 6
    : isSecond
    ? 3
    : Math.round((course.progress / 100) * totalMods);
  const lastAccessed = isFirst
    ? "2 days ago"
    : isSecond
    ? "1 day ago"
    : isThird
    ? "1 week ago"
    : "3 days ago";

  const weeksStr = `${course.duration || 0} hrs`;
  const ratingStr = course.rating.toFixed(1);

  // Unsplash fallbacks matching the exact reference image avatars
  const fallbackAvatar = isFirst
    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    : isSecond
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150";

  const authorImg = (() => {
    const rawImg = course.authorImage || "";
    if (
      rawImg &&
      (rawImg.includes("unsplash.com") ||
        rawImg.includes("dummy") ||
        rawImg.includes("placeholder"))
    ) {
      return "";
    }
    return rawImg;
  })();

  return (
    <>
      <motion.div
        className={`bg-[#FFFFFF] rounded-[19.75px] w-full max-w-[423.96px] h-full opacity-100 rotate-0 mx-auto overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-[0px_3.95px_5.92px_-3.95px_#0000001A,0px_9.87px_14.81px_-2.96px_#0000001A] ${
          isFirst ? "border-2 border-[#2B58FF]" : "border border-gray-100/80"
        }`}
      >
        <div className="relative h-[11rem] sm:h-[11.5rem] w-full group flex-shrink-0 bg-gray-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = isFirst
                ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                : isSecond
                ? "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600"
                : "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute top-3.5 left-3.5">
            <span
              className={`px-3.5 py-1 text-[11px] font-bold tracking-wide rounded-full shadow-sm text-white ${
                course.status === "completed"
                  ? "bg-[#00D26A]"
                  : course.status === "inProgress"
                  ? "bg-[#2B58FF]"
                  : "bg-gray-500"
              }`}
            >
              {course.status === "completed"
                ? "Completed"
                : course.status === "inProgress"
                ? "In Progress"
                : "Not Started"}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
          <h3 className="text-[20px] font-bold text-[#101828] leading-tight mb-2 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-[14px] text-gray-500 line-clamp-2 mb-6 leading-relaxed flex-grow">
            {course.description}
          </p>

          <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-gray-100/80">
            {authorImg && authorImg.trim() !== "" ? (
              <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100 flex-shrink-0 shadow-sm">
                <img
                  src={authorImg}
                  alt={course.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display =
                        "flex";
                    }
                  }}
                />
                <div className="hidden w-full h-full rounded-full bg-gray-50 items-center justify-center text-gray-400">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ) : isFirst || isSecond || isThird ? (
              <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100 flex-shrink-0 shadow-sm">
                <img
                  src={fallbackAvatar}
                  alt={course.author}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0 shadow-sm">
                <User className="w-5 h-5 text-gray-400" />
              </div>
            )}
            <div>
              <p className="text-[15px] font-bold text-gray-900 leading-none mb-1.5">
                {course.author}
              </p>
              <p className="text-[12px] text-gray-500 font-medium leading-none">
                Instructor
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] font-bold text-gray-900">
                  {course.progress}% Complete
                </span>
                <span className="text-[13px] font-medium text-gray-500">
                  {(course as any).completed_modules ?? completedMods}/
                  {(course as any).total_modules ?? totalMods} Modules
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-[8px] mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] h-full rounded-full relative"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 px-1 w-full">
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gray-500">
                <Clock size={16} className="text-gray-400" /> {weeksStr}
              </span>
              <span className="flex items-center gap-1.5 text-[13.5px] font-bold text-gray-900">
                <Star size={16} className="text-[#FFC200] fill-[#FFC200]" />{" "}
                {ratingStr}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full pt-2">
              <button
                className="flex-[1_1_100%] xl:flex-[2_1_0%] min-w-[120px] bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] hover:opacity-90 text-white text-[14px] sm:text-[14.5px] font-bold py-3 sm:py-3.5 px-4 rounded-[16px] transition-all flex items-center justify-center gap-2 shadow-md"
                onClick={() =>
                  navigate(`/course1/${course.id}`, {
                    state: { course, from: "mycourses" },
                  })
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Continue</span>
              </button>
              <button
                className="flex-[1_1_calc(50%-6px)] xl:flex-[1_1_0%] min-w-[100px] bg-[#F9FAFB] text-gray-600 text-[12.5px] sm:text-[13px] font-semibold py-3 sm:py-3.5 px-2 sm:px-3 rounded-[16px] border border-gray-200 hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm"
                onClick={() => onViewCurriculum(course)}
              >
                Curriculum
              </button>
              <button
                className="flex-[1_1_calc(50%-6px)] xl:flex-[1_1_0%] min-w-[100px] bg-[#F9FAFB] text-gray-600 text-[12.5px] sm:text-[13px] font-semibold py-3 sm:py-3.5 px-2 sm:px-3 rounded-[16px] border border-gray-200 hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm"
                onClick={() =>
                  navigate(`/materials/${course.id}`, {
                    state: { courseTitle: course.title },
                  })
                }
              >
                Materials
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
