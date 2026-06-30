import React from "react";
import { ArrowRight } from "lucide-react";

interface FilterButtonsProps {
  filteredCoursesLength: number;
  showAllCourses: boolean;
  setShowAllCourses: (show: boolean) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filteredCoursesLength,
  showAllCourses,
  setShowAllCourses,
  filter,
  setFilter,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-1">
            Continue Learning
          </h2>
          <p className="text-[14px] font-semibold text-gray-500">
            {filteredCoursesLength} courses available
          </p>
        </div>
        <span
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="text-blue-600 text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline"
        >
          {showAllCourses ? 'View Less' : 'View All'} <ArrowRight size={16} className={`transition-transform ${showAllCourses ? 'rotate-180' : ''}`} />
        </span>
      </div>

      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <span className="font-inter font-medium text-[13.82px] leading-[19.75px] tracking-[0px] text-[#0A0A0A] mr-1">Filter:</span>
        {["all", "inProgress", "completed", "notStarted"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-[6px] font-inter font-medium text-[13.82px] leading-[19.75px] tracking-[0px] text-center capitalize transition-all focus:outline-none rounded-full ${
              filter === status
                ? "bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white shadow-sm border border-transparent"
                : "bg-white border border-gray-100 text-[#0A0A0A] hover:bg-gray-50"
            }`}
          >
            {status === "all"
              ? "All"
              : status === "inProgress"
              ? "In Progress"
              : status === "completed"
              ? "Completed"
              : "Not Started"}
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterButtons;
