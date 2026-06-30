import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const LiveClassSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-16 mb-6" />
        <hr className="border-gray-100 my-5" />
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 my-2">
          {[1, 2, 3, 4].map((j) => (
            <div key={j}>
              <Skeleton className="w-20 h-3 mb-1.5" />
              <Skeleton className="w-24 h-5" />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-2">
          <Skeleton className="w-20 h-3 mb-1.5" />
          <Skeleton className="w-24 h-5" />
        </div>
      </div>
    </div>
  );
};

export default LiveClassSkeleton;
