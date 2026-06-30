import React from "react";
import { BookOpen, Calendar, Award } from "lucide-react";
import { Certificate } from "./CourseTypes";

interface CourseProgressSidebarProps {
  progressData: any;
  apiDuration: number;
  hasCertificate: boolean;
  certificateData: Certificate | null;
}

const CourseProgressSidebar: React.FC<CourseProgressSidebarProps> = ({
  progressData,
  apiDuration,
  hasCertificate,
  certificateData,
}) => {
  return (
    <div className="w-full xl:w-72 space-y-4">
      {/* Your Progress Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] border border-gray-50">
        <h3 className="font-bold text-gray-900 mb-6 text-base tracking-tight">Your Progress</h3>
        
        {/* Circular Chart */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <circle cx="64" cy="64" r="54" stroke="#F3F4F6" strokeWidth="10" fill="none" />
              <circle 
                cx="64" 
                cy="64" 
                r="54" 
                stroke="url(#progressGradient)" 
                strokeWidth="10" 
                fill="none" 
                strokeDasharray="339.29" 
                strokeDashoffset={339.29 - (339.29 * (progressData?.completion_ratio || 0)) / 100} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">
                {progressData ? `${Math.round(progressData.completion_ratio)}%` : "0%"}
              </span>
              <span className="text-xs text-gray-400 font-medium mt-1">Complete</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Modules Completed Card */}
          <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-gray-50">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="text-blue-500">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-semibold text-gray-700">Modules Completed</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg font-bold text-gray-900">{progressData?.completed_modules || 0}</span>
              <span className="text-gray-400 text-sm font-medium">/ {progressData?.total_modules || 0}</span>
            </div>
            <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00A3FF] transition-all duration-700"
                style={{ width: `${progressData?.total_modules > 0 ? (progressData.completed_modules / progressData.total_modules) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          {/* Course Deadline Card */}
          <div className="bg-[#F4F7FF] rounded-2xl p-5 border border-blue-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-gray-700">Course Deadline</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 tracking-tight">
              {apiDuration} Hours
            </p>
            <p className="text-gray-500 text-[11px] font-semibold">Stay on track to complete on time</p>
          </div>
        </div>
      </div>

      {/* Earn Your Certificate */}
      <div className="rounded-2xl p-5 bg-amber-50 shadow-[0px_7.94px_9.93px_-5.96px_#0000001A,0px_19.86px_24.82px_-4.96px_#0000001A]">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-amber-400">
            <Award className="w-7 h-7 text-white" />
          </div>
        </div>
        <h3 className="font-bold text-gray-900 text-center mb-2 text-base">{hasCertificate ? "Certificate Earned!" : "Earn Your Certificate"}</h3>
        <p className="text-gray-500 text-xs text-center mb-4 leading-relaxed">
          {hasCertificate
            ? `Congratulations! You have earned certificate ${certificateData?.certificate_no || ""} for ${certificateData?.course_name || "this course"}.`
            : "Complete this course to earn a verified certificate of completion and showcase your achievement"}
        </p>
        {hasCertificate && certificateData && (
          <div className="mb-4 text-center">
            <p className="text-xs text-amber-600 font-medium">Status: {certificateData.status}</p>
            <a 
              href={certificateData.download_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors"
            >
              Download Certificate
            </a>
          </div>
        )}
        {!hasCertificate && (
          <>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
              <div className="h-full bg-gray-800 rounded-full w-[60%]"></div>
            </div>
            <p className="text-gray-500 text-xs text-center font-medium">40% to go</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseProgressSidebar;
