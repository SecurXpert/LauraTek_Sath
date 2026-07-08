import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Star } from "lucide-react";
import { Instructor, extractTags } from "./types";

export const InstructorCard: React.FC<{ instructor: Instructor }> = ({
  instructor,
}) => {
  const navigate = useNavigate();
  const tags = extractTags(instructor.course_titles || []);

  return (
    <div className="relative bg-[#FFFFFF] rounded-[19.75px] w-full max-w-[315.01px] mx-auto h-full min-h-[288.35px] opacity-100 p-[23.7px] flex flex-col shadow-[0px_1.97px_3.95px_-1.97px_#0000001A,0px_3.95px_5.92px_-0.99px_#0000001A] border border-gray-50 items-center text-center transition-all duration-300 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.12)] hover:-translate-y-1">
      <div className="w-full flex flex-col items-center flex-grow">
        {/* Avatar with Status */}
        <div className="relative mx-auto w-[86px] h-[86px] flex-shrink-0 rounded-full border-[3px] border-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)] mb-3">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            {instructor.profile_picture &&
            instructor.profile_picture.trim() !== "" &&
            !instructor.profile_picture.includes("unsplash.com") &&
            !instructor.profile_picture.includes("dummy") &&
            !instructor.profile_picture.includes("placeholder") ? (
              <img
                src={instructor.profile_picture}
                alt={instructor.name}
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
            ) : null}
            <div
              className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center text-gray-300"
              style={{
                display:
                  instructor.profile_picture &&
                  instructor.profile_picture.trim() !== "" &&
                  !instructor.profile_picture.includes("unsplash.com") &&
                  !instructor.profile_picture.includes("dummy") &&
                  !instructor.profile_picture.includes("placeholder")
                    ? "none"
                    : "flex",
              }}
            >
              <User size={36} />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-4">
          <h3 className="font-inter font-bold text-[20px] text-[#111827] mb-1 leading-tight line-clamp-1">
            {instructor.name}
          </h3>

          <div className="flex items-center justify-center gap-1.5">
            <Star size={16} className="text-[#FFC200] fill-[#FFC200]" />
            <span className="text-[14px] font-semibold text-[#4B5563]">
              {instructor.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-2 overflow-hidden flex-wrap mt-auto mb-3">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#F0F5FF] text-[#3B82F6] px-3.5 py-1 flex items-center justify-center rounded-[11.85px] text-[11.5px] font-medium tracking-tight whitespace-nowrap flex-shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          navigate("/chatsystem", {
            state: { selectedInstructorName: instructor.name },
          })
        }
        className="w-full max-w-[267.61px] mx-auto mt-auto h-[36px] bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-90 text-white rounded-[13.82px] flex items-center justify-center gap-2 text-[14px] font-medium transition-all cursor-pointer flex-shrink-0"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Message
      </button>
    </div>
  );
};
