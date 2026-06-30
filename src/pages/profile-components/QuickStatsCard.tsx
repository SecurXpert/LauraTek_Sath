import React from "react";

interface QuickStatsCardProps {
  courseCount: number;
  certificateCount: number;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  courseCount,
  certificateCount,
}) => {
  return (
    <div className="bg-[#FFFFFF] border-t-[1.22px] border-t-[#E2E8F0] rounded-2xl p-4 sm:p-6 shadow-[0px_1.22px_2.43px_-1.22px_#0000001A,0px_1.22px_3.65px_0px_#0000001A]">
      <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-4 sm:mb-5">
        Quick Stats
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
          <span className="text-sm text-gray-500">Courses</span>
          <span className="font-semibold text-gray-900 text-lg">{courseCount}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
          <span className="text-sm text-gray-500">Certificates</span>
          <span className="font-semibold text-gray-900 text-lg">
            {certificateCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;
