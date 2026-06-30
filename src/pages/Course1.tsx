import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Skeleton } from "@/components/ui/skeleton";
import CourseHeader from "@/components/ui/course-page/CourseHeader";
import AboutCourse from "@/components/ui/course-page/AboutCourse";
import CourseCurriculum from "@/components/ui/course-page/CourseCurriculum";
import LiveClasses from "@/components/ui/course-page/LiveClasses";
import ResourcesMaterials from "@/components/ui/course-page/ResourcesMaterials";
import AssessmentsChallenges from "@/components/ui/course-page/AssessmentsChallenges";
import CourseInstructor from "@/components/ui/course-page/CourseInstructor";
import CourseProgressSidebar from "@/components/ui/course-page/CourseProgressSidebar";
import { useCourseData } from "@/hooks/useCourseData";

const Course1 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Course");
  
  const {
    course,
    instructor,
    quizzes,
    materials,
    liveClasses,
    curriculum,
    hasCertificate,
    certificateData,
    loading,
    apiDuration,
    expandedModules,
    progressData,
    activeMaterialFilter,
    setActiveMaterialFilter,
    showAllQuizzes,
    setShowAllQuizzes,
    showAllLiveClasses,
    setShowAllLiveClasses,
    handleDownload,
    toggleModule,
    handleToggleAllModules,
  } = useCourseData();

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-4">
        {/* Profile Header */}
        <Profileheader onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="animate-pulse">
              <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-16 bg-gray-200">
                 <Skeleton className="w-32 h-6 mb-6" />
                 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
                    <div className="flex-1">
                       <Skeleton className="w-3/4 h-10 mb-3" />
                       <Skeleton className="w-1/2 h-6 mb-6" />
                       <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <Skeleton className="w-24 h-6" />
                          <Skeleton className="w-24 h-6" />
                       </div>
                       <Skeleton className="w-full h-24 rounded-2xl" />
                    </div>
                    <div className="w-full lg:w-72">
                       <Skeleton className="w-full h-80 rounded-2xl" />
                    </div>
                 </div>
              </div>
              <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 -mt-4 sm:-mt-6">
                 <div className="max-w-6xl mx-auto flex flex-col xl:flex-row gap-6">
                    <div className="flex-1">
                       <Skeleton className="w-48 h-8 mb-4" />
                       <Skeleton className="w-full h-64 rounded-2xl mb-6" />
                       <Skeleton className="w-48 h-8 mb-4" />
                       <div className="space-y-4">
                          <Skeleton className="w-full h-20 rounded-[20px]" />
                          <Skeleton className="w-full h-20 rounded-[20px]" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
          <>
            <CourseHeader 
              course={course} 
              instructor={instructor} 
              progressData={progressData} 
              curriculum={curriculum} 
              hasCertificate={hasCertificate} 
            />

            {/* White Main Content Area */}
            <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 -mt-4 sm:-mt-6 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                {/* Main Content Grid */}
                <div className="flex flex-col xl:flex-row gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <AboutCourse course={course} instructor={instructor} />
                    
                    <CourseCurriculum 
                      curriculum={curriculum} 
                      expandedModules={expandedModules} 
                      progressData={progressData} 
                      handleToggleAllModules={handleToggleAllModules} 
                      toggleModule={toggleModule} 
                    />

                    <LiveClasses 
                      course={course} 
                      instructor={instructor} 
                      liveClasses={liveClasses} 
                      showAllLiveClasses={showAllLiveClasses} 
                      setShowAllLiveClasses={setShowAllLiveClasses} 
                    />

                    <ResourcesMaterials 
                      course={course} 
                      materials={materials} 
                      activeMaterialFilter={activeMaterialFilter} 
                      setActiveMaterialFilter={setActiveMaterialFilter} 
                      handleDownload={handleDownload} 
                    />

                    <AssessmentsChallenges 
                      course={course} 
                      quizzes={quizzes} 
                      showAllQuizzes={showAllQuizzes} 
                      setShowAllQuizzes={setShowAllQuizzes} 
                    />

                    {/* Moved Course Instructor to the bottom of the main content */}
                    <div className="mt-6">
                      <CourseInstructor instructor={instructor} />
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="w-full xl:w-72 space-y-4 shrink-0">
                    <CourseProgressSidebar 
                      progressData={progressData} 
                      apiDuration={apiDuration} 
                      hasCertificate={hasCertificate} 
                      certificateData={certificateData} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Course1;
