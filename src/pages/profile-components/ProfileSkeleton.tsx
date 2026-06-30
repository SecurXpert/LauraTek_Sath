import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#FFFFFF] border-t-[1.22px] border-t-[#E2E8F0] rounded-xl p-6 shadow-sm">
          <Skeleton className="w-48 h-6 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <Skeleton className="w-24 h-4 mb-2" />
                <Skeleton className="w-full h-10 rounded-lg" />
              </div>
            ))}
            <div className="md:col-span-2">
              <Skeleton className="w-24 h-4 mb-2" />
              <Skeleton className="w-full h-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-[#FFFFFF] border-t-[1.22px] border-t-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <Skeleton className="w-32 h-6 mb-5" />
          <div className="space-y-3">
            <Skeleton className="w-full h-12 rounded-xl" />
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
