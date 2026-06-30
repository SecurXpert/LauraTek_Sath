import { Skeleton } from "@/components/ui/skeleton";

const CertificateSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-[350px]">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-3 mb-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-3 mt-auto">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CertificateSkeleton;
