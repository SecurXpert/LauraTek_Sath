import { Skeleton } from "@/components/ui/skeleton";

const QuizSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[220px] flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="border-t border-gray-100 my-4"></div>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <Skeleton className="h-3 w-16 mb-1 mx-auto" />
          <Skeleton className="h-4 w-8 mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton className="h-3 w-16 mb-1 mx-auto" />
          <Skeleton className="h-4 w-12 mx-auto" />
        </div>
      </div>
      <div className="flex gap-3 mt-auto">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 flex-1 rounded-xl" />
      </div>
    </div>
  );
};

export default QuizSkeleton;
