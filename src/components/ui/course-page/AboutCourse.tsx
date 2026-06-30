import React from "react";
import { Target, CheckCircle2 } from "lucide-react";
import { Course, Instructor } from "./CourseTypes";

interface AboutCourseProps {
  course: Course | null;
  instructor: Instructor | null;
}

const AboutCourse: React.FC<AboutCourseProps> = ({ course, instructor }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">About This Course</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] mb-6">
        <h3 className="font-bold text-gray-900 text-lg mb-2">
          {course?.course_title || "Course Title"}
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          {course?.description || "Course description"}
        </p>

        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-3.5 h-3.5 text-blue-600" />
          </div>
          What You'll Learn
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {instructor?.course_titles?.map((title, index) => (
            <div key={index} className="flex items-center gap-2 bg-emerald-50/50 rounded-xl px-4 py-3 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{title}</span>
            </div>
          ))}
          {(!instructor?.course_titles || instructor.course_titles.length === 0) && (
            <>
              <div className="flex items-center gap-2 bg-emerald-50/50 rounded-xl px-4 py-3 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">React Hooks</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50/50 rounded-xl px-4 py-3 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50/50 rounded-xl px-4 py-3 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Performance Optimization</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50/50 rounded-xl px-4 py-3 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">State Management</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutCourse;
