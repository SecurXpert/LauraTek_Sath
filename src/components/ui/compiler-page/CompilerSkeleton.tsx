import { Skeleton } from "@/components/ui/skeleton";

export default function CompilerSkeleton() {
  return (
    <div className="min-h-screen md:h-screen bg-[#f5f6fb] flex flex-col md:overflow-hidden">
      {/* HEADER SKELETON */}
      <div className="min-h-[90px] bg-white shadow-sm border-b px-3 sm:px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2 sm:pr-4">
          <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0" />
          <Skeleton className="w-32 sm:w-40 h-6" />
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <div className="w-full max-w-2xl">
            <Skeleton className="w-full h-8" />
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Skeleton className="w-20 h-20 sm:w-28 sm:h-20 rounded-lg" />
        </div>
      </div>

      {/* MAIN SKELETON */}
      <div className="flex-1 flex flex-col md:grid md:min-h-0 md:grid-cols-[60px_1fr] lg:grid-cols-[70px_1fr_1.2fr] md:grid-rows-[1fr_1.5fr] lg:grid-rows-1">
        {/* LEFT SIDEBAR (QNS) */}
        <div className="bg-[#f0eef6] flex md:flex-col flex-row items-center py-2 md:py-4 gap-2 md:gap-3 px-2 md:px-0 border-r shrink-0 md:row-span-2 lg:row-span-1">
          <Skeleton className="hidden md:block w-8 h-4 mb-2" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="min-w-[36px] h-9 md:w-10 md:h-10 rounded-xl shrink-0" />
          ))}
        </div>

        {/* LEFT PANEL (QUESTION) */}
        <div className="p-3 sm:p-4 md:p-6 shrink-0 md:overflow-y-auto md:min-h-0">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="w-1/4 h-5" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
            <Skeleton className="w-1/4 h-5 mt-6" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (EDITOR) */}
        <div className="flex flex-col bg-[#0f172a] h-[600px] md:h-auto md:min-h-0 md:flex-1 md:col-start-2 lg:col-auto">
          <div className="bg-white p-3 flex items-center gap-4">
            <Skeleton className="w-32 h-10 rounded" />
            <Skeleton className="w-32 h-10 rounded ml-auto" />
          </div>
          <div className="flex-1 min-h-0 p-4">
            <div className="space-y-2">
              <Skeleton className="w-1/3 h-4 bg-slate-700" />
              <Skeleton className="w-1/2 h-4 bg-slate-700" />
              <Skeleton className="w-1/4 h-4 bg-slate-700" />
            </div>
          </div>
          <div className="h-[150px] sm:h-[180px] bg-white border-t p-3 sm:p-4 shrink-0">
            <Skeleton className="w-32 h-5 mb-4" />
            <Skeleton className="w-full h-20" />
          </div>
          <div className="bg-white p-4 shrink-0 border-t">
            <div className="flex justify-end gap-2">
              <Skeleton className="w-24 h-10 rounded-lg" />
              <Skeleton className="w-24 h-10 rounded-lg" />
              <Skeleton className="w-32 h-10 rounded-lg" />
              <Skeleton className="w-24 h-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
