import React from "react";
import { User, Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Instructor } from "./CourseTypes";

interface CourseInstructorProps {
  instructor: Instructor | null;
}

const CourseInstructor: React.FC<CourseInstructorProps> = ({ instructor }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-[#A855F7] rounded-full flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Instructor</h2>
      </div>
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {instructor?.profile_picture && !instructor.profile_picture.includes("unsplash.com") && !instructor.profile_picture.includes("dummy") && !instructor.profile_picture.includes("placeholder") ? (
            <img 
              src={instructor.profile_picture} 
              alt={instructor.name} 
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-3 w-full">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <h3 className="font-bold text-gray-900">{instructor?.name || "Instructor"}</h3>
                <p className="text-gray-500 text-xs">{instructor?.bio || ""}</p>
              </div>
              <button 
                onClick={() => navigate("/chatsystem", { state: { selectedInstructorName: instructor?.name } })}
                className="mt-3 sm:mt-0 bg-gradient-to-r from-[#3B66F5] to-[#9D33FA] text-white text-[16px] font-medium w-[184.31px] h-[47.66px] rounded-[13.9px] flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Message Instructor
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              {instructor?.course_titles?.map((title, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] rounded-full">{title}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{instructor?.rating?.toFixed(1) || "0.0"}</span>
                <span className="text-xs text-gray-500">Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-gray-500">{instructor?.course_count || 0} courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
