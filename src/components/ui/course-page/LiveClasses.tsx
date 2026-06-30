import React from "react";
import { LiveClass, Instructor, Course } from "./CourseTypes";

interface LiveClassesProps {
  course: Course | null;
  instructor: Instructor | null;
  liveClasses: LiveClass[];
  showAllLiveClasses: boolean;
  setShowAllLiveClasses: (show: boolean) => void;
}

const LiveClasses: React.FC<LiveClassesProps> = ({
  course,
  instructor,
  liveClasses,
  showAllLiveClasses,
  setShowAllLiveClasses,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF5C39] rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Live Classes</h2>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">{course?.course_title || "Course"}</span>
          </div>
        </div>
        {liveClasses.length > 3 && (
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button 
              onClick={() => setShowAllLiveClasses(!showAllLiveClasses)}
              className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {showAllLiveClasses ? 'View Less' : 'View All'}
            </button>
          </div>
        )}
      </div>
      {liveClasses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:gap-6">
          {(showAllLiveClasses ? liveClasses : liveClasses.slice(0, 3)).map((liveClass) => {
            const scheduledDate = new Date(liveClass.scheduled_at);
            const dayName = scheduledDate.toLocaleDateString("en-US", { weekday: "long" });
            const monthDay = scheduledDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const time = scheduledDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

            return (
              <div key={liveClass.id} className="bg-[#FFFFFF] rounded-[19.86px] p-3 sm:p-4 md:p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] w-full h-[280px] sm:h-[301px] flex flex-col">
                <div className="text-center mb-2 md:mb-3 mt-1">
                  <p className="text-[#2563EB] text-[11px] sm:text-[13px] font-medium mb-1">{dayName}</p>
                  <p className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#111827] leading-none mb-1.5 tracking-tight">{monthDay}</p>
                  <p className="text-[#2563EB] text-[11px] sm:text-[13px] font-medium">{time}</p>
                </div>
                <hr className="border-gray-100 mb-3 md:mb-4 w-full" />
                <div className="flex-1 flex flex-col">
                  <h4 className="font-bold text-[#111827] text-[13px] sm:text-[14px] md:text-[15px] mb-2 leading-snug line-clamp-2 capitalize text-left">{liveClass.title}</h4>
                  <div className="flex items-center gap-1.5 mb-3 md:mb-4 text-left">
                    <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-500 truncate">{instructor?.name || "Instructor"}</span>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <a
                      href={liveClass.join_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-[#2563EB] to-[#A855F7] text-white py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-center cursor-pointer shadow-sm hover:shadow-md transition-all truncate px-2"
                    >
                      Join With Link
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] text-center">
          <p className="text-gray-500 text-sm">No {course?.course_title || "course"} live classes scheduled.</p>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
