import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {

  Eye,

  Calendar,

  Star,

  BookOpen,

  Menu,

  X,

  User,

  FileText,

  List,

  BookCheck,

  Search,

  TrendingUp,

  Award,

  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Profileheader from "./ui/Profileheader";
import CurriculumView from "./ui/CurriculumView";
import { Skeleton } from "@/components/ui/skeleton";
import { VITE_API_URL } from "@/services/api/api";
import { Course, Instructor, CourseCard, InstructorCard } from "./ui/mycourses-page/types.tsx";
import { decodeJWT } from "@/lib/jwtUtils";

// InstructorCard and CourseCard have been extracted

 

const MyCourses: React.FC = () => {

  const [courses, setCourses] = useState<Course[]>([]);

  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const [filter, setFilter] = useState("all");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllMentors, setShowAllMentors] = useState(false);
  const [selectedCurriculumCourse, setSelectedCurriculumCourse] = useState<Course | null>(null);

  const [active, setActive] = useState("My Courses");

  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

 

  const navigate = useNavigate();

 

  useEffect(() => {

    document.title = "My Courses - LauraTek";

 

    const token = localStorage.getItem("access_token");

 

    if (!token) {

      console.error("No access_token found");

      setLoading(false);

      return;

    }

 

    const fetchData = async () => {

      try {

        const coursesRes = await fetch(

          `${VITE_API_URL}/dashboard/my-courses`,

          {

            method: "GET",

            headers: { Authorization: `Bearer ${token}` },

          }

        );

 

        let instructorsData: Instructor[] = [];

        const instructorsRes = await fetch(

          `${VITE_API_URL}/dashboard/my-instructors`,

          {

            method: "GET",

            headers: { Authorization: `Bearer ${token}` },

          }

        );



        if (instructorsRes.ok) {

          instructorsData = await instructorsRes.json();

          setInstructors(instructorsData);

        }

       

        let formattedCourses: Course[] = [];

        if (coursesRes.ok) {

          const result = await coursesRes.json();

          formattedCourses = result.map((item: any) => {

            // Find instructor by matching course title

            const instructor = instructorsData.find((inst: Instructor) =>

              inst.course_titles?.includes(item.course_title)

            );



            return {

              id: item.course_id,

              title: item.course_title,

              author: instructor?.name || "LauraTek",

              description: item.description,

              image: item.course_image,

              status: item.completed

                ? "completed"

                : item.progress > 0

                ? "inProgress"

                : "notStarted",

              weeksToComplete: item.duration || 0,

              duration: item.duration || 0,

              views: 0,

              rating: instructor?.rating ?? 0,
              progress: item.progress,
              instructorId: instructor?.id,
              authorImage: instructor?.profile_picture,
            };

          });

          // Fetch progress for each course
          const decoded = decodeJWT(token);
          const studentId = decoded?.student_id || Number(decoded?.sub) || 12;
          formattedCourses = await Promise.all(
            formattedCourses.map(async (course: any) => {
              if (!token) return course;
              try {
                const progRes = await fetch(
                  `${VITE_API_URL}/courses/students/${studentId}/courses/${course.id}/progress`,
                  {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                  }
                );
                if (progRes.ok) {
                  const progData = await progRes.json();
                  const newProgress = Math.round((progData.completion_ratio || 0) * 100);
                  const isCompleted = course.completed || (progData.total_modules > 0 && progData.completed_modules === progData.total_modules);
                  const newStatus = isCompleted ? "completed" : newProgress > 0 ? "inProgress" : "notStarted";
                  return {
                    ...course,
                    completed_modules: progData.completed_modules,
                    total_modules: progData.total_modules,
                    progress: newProgress,
                    status: newStatus,
                  };
                }
              } catch (e) {
                console.error(`Failed to fetch progress for course ${course.id}:`, e);
              }
              return course;
            })
          );
        }

        setCourses(formattedCourses);

      } catch (error) {

        console.error("Error fetching data:", error);

      } finally {

        setLoading(false);

      }

    };

 

    fetchData();

  }, []);

 

  const filteredCourses = courses.filter((c) => {

    return filter === "all" ? true : c.status === filter;

  }).reverse();

  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 3);

  return (

    <div className="fixed inset-0 w-full h-full flex bg-[#EFF6FF33] overflow-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

 

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <Profileheader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

 

        <main className="flex-1 overflow-y-auto p-0 relative">
          {selectedCurriculumCourse ? (
            <CurriculumView 
              course={selectedCurriculumCourse} 
              onBack={() => setSelectedCurriculumCourse(null)} 
            />
          ) : (
            <div className="p-6">
              {/* New Learning Journey Hero Section */}

          <div className="mb-10">

            

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10 px-1">

              <div>

                <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-2 flex items-center gap-2">
                  My Learning Journey
                </h1>

                <p className="text-gray-500 font-medium text-sm md:text-base">

                  Track progress, continue learning, and stay consistent 🚀

                </p>

              </div>

            </div>



            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">

              {/* Card 1: Total Courses */}

              <div className="relative overflow-hidden bg-[#F0F7FF] rounded-2xl p-5 border border-[#E0EFFF] shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] transition-transform hover:scale-[1.02]">

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E0EFFF] rounded-full opacity-70"></div>

                <div className="w-10 h-10 rounded-full bg-[#1A8DFF] flex items-center justify-center text-white mb-4 relative z-10 shadow-sm shadow-blue-200">

                  <BookOpen size={18} />

                </div>

                <div className="relative z-10">

                  <p className="text-[13px] text-gray-500 font-medium mb-1">Total Courses</p>

                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>

                </div>

              </div>



              {/* Card 2: In Progress */}

              <div className="relative overflow-hidden bg-[#FAEFFC] rounded-2xl p-5 border border-[#F3E0F6] shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] transition-transform hover:scale-[1.02]">

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F2DCF5] rounded-full opacity-70"></div>

                <div className="w-10 h-10 rounded-full bg-[#D139E0] flex items-center justify-center text-white mb-4 relative z-10 shadow-sm shadow-fuchsia-200">

                  <TrendingUp size={18} />

                </div>

                <div className="relative z-10">

                  <p className="text-[13px] text-gray-500 font-medium mb-1">In Progress</p>

                  <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === "inProgress").length}</p>

                </div>

              </div>



              {/* Card 3: Completed */}

              <div className="relative overflow-hidden bg-[#E7FEF1] rounded-2xl p-5 border border-[#CCF6D7] shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] transition-transform hover:scale-[1.02]">

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#CCF6D7] rounded-full opacity-70"></div>

                <div className="w-10 h-10 rounded-full bg-[#00C253] flex items-center justify-center text-white mb-4 relative z-10 shadow-sm shadow-green-200">

                  <Award size={18} />

                </div>

                <div className="relative z-10">

                  <p className="text-[13px] text-gray-500 font-medium mb-1">Completed</p>

                  <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === "completed").length}</p>

                </div>

              </div>



              {/* Card 4: Avg Completion */}

              <div className="relative overflow-hidden bg-[#FFF7E8] rounded-2xl p-5 border border-[#FFEACB] shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] transition-transform hover:scale-[1.02]">

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FDE5C5] rounded-full opacity-70"></div>

                <div className="w-10 h-10 rounded-full bg-[#FF8A00] flex items-center justify-center text-white mb-4 relative z-10 shadow-sm shadow-orange-200">

                  <TrendingUp size={18} />

                </div>

                <div className="relative z-10">

                  <p className="text-[13px] text-gray-500 font-medium mb-1">Avg Completion</p>

                  <p className="text-2xl font-bold text-gray-900">

                    {courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length) : 0}%

                  </p>

                </div>

              </div>



              {/* Card 5: Weekly Hours */}

              <div className="relative overflow-hidden bg-[#FFF0F4] rounded-2xl p-5 border border-[#FFE1E8] shadow-[0px_0.99px_1.97px_-0.99px_#0000001A,0px_0.99px_2.96px_0px_#0000001A] transition-transform hover:scale-[1.02]">

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFE1E8] rounded-full opacity-70"></div>

                <div className="w-10 h-10 rounded-full bg-[#FF2D5F] flex items-center justify-center text-white mb-4 relative z-10 shadow-sm shadow-rose-200">

                  <Clock size={18} />

                </div>

                <div className="relative z-10">

                  <p className="text-[13px] text-gray-500 font-medium mb-1">Weekly Hours</p>

                  <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, c) => acc + c.duration, 0)}</p>

                </div>

              </div>

            </div>

          </div>



          <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 px-1">

            <div>

              <h2 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-1">
                Your Mentors
              </h2>

              <p className="text-[13px] font-semibold text-gray-500">

                Learn from industry experts

              </p>

            </div>

              <button 
                onClick={() => setShowAllMentors(!showAllMentors)}
                className="text-[13px] font-bold text-[#4A72FF] hover:text-[#3B5BCC] flex items-center transition-colors mt-3 md:mt-0 whitespace-nowrap"
              >
                {showAllMentors ? "View Less" : "View All"} <span className="ml-1 text-lg leading-none mb-[2px]">{showAllMentors ? "‹" : "›"}</span>
              </button>

          </div>

 

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-[19.75px] mb-12 w-full max-w-[1319.29px] min-h-[317.97px] opacity-100 mx-auto">
              {[1, 2, 3, 4].map((i, index) => (
                 <div key={i} className={`w-full flex justify-center ${index === 3 ? 'hidden 2xl:flex' : ''} ${index === 2 ? 'hidden lg:flex' : ''} ${index === 1 ? 'hidden sm:flex' : ''}`}>
                   <div className="relative bg-[#FFFFFF] rounded-[19.75px] w-full max-w-[315.01px] h-full min-h-[288.35px] p-[23.7px] flex flex-col shadow-sm border border-gray-50 items-center text-center">
                      <Skeleton className="w-[86px] h-[86px] rounded-full mb-3" />
                      <Skeleton className="w-32 h-6 mb-1" />
                      <Skeleton className="w-16 h-4 mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="w-16 h-6 rounded-[11.85px]" />
                        <Skeleton className="w-16 h-6 rounded-[11.85px]" />
                        <Skeleton className="w-16 h-6 rounded-[11.85px]" />
                      </div>
                      <Skeleton className="w-full max-w-[267.61px] mt-auto h-[36px] rounded-[13.82px]" />
                   </div>
                 </div>
              ))}
            </div>
          ) : instructors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-[19.75px] mb-12 w-full max-w-[1319.29px] min-h-[317.97px] opacity-100 mx-auto">
              {(showAllMentors ? instructors : instructors.slice(0, 4)).map((instructor, index) => (
                <div 
                  key={instructor.id} 
                  className={`w-full flex justify-center ${!showAllMentors && index === 3 ? 'hidden 2xl:flex' : ''} ${!showAllMentors && index === 2 ? 'hidden lg:flex' : ''} ${!showAllMentors && index === 1 ? 'hidden sm:flex' : ''}`}
                >
                  <InstructorCard instructor={instructor} />
                </div>
              ))}
            </div>
          ) : (

            <p className="text-center text-gray-500 mb-12 py-10">No mentors found.</p>

          )}

 

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 flex-wrap gap-4 px-1">

            <div>

              <h2 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-1">
                Continue Learning
              </h2>

              <p className="text-[14px] font-semibold text-[#6B7280]">

                {filteredCourses.length} courses available

              </p>

            </div>

            <span
              onClick={() => setShowAllCourses(!showAllCourses)}
              className="text-blue-600 text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline"
            >
              {showAllCourses ? 'View Less' : 'View All'} <ArrowRight size={16} className={`transition-transform ${showAllCourses ? 'rotate-180' : ''}`} />
            </span>
          </div>

 

          <div className="flex items-center gap-3 mb-8 px-1 flex-wrap">

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

 

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#FFFFFF] rounded-[19.75px] w-full max-w-[423.96px] h-[500px] flex flex-col shadow-sm border border-gray-100/80 mx-auto overflow-hidden">
                  <Skeleton className="h-[11.5rem] w-full rounded-none" />
                  <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-10 w-full mb-6" />
                    <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-gray-100/80">
                      <Skeleton className="w-11 h-11 rounded-full" />
                      <div className="space-y-2">
                         <Skeleton className="h-4 w-24" />
                         <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="flex flex-col mt-auto">
                       <Skeleton className="h-4 w-full mb-2" />
                       <Skeleton className="h-8 w-full rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {displayedCourses.length > 0 ? (

                displayedCourses.map((course) => (

                  <CourseCard key={course.id} course={course} onViewCurriculum={(c) => setSelectedCurriculumCourse(c)} currentStreak={currentStreak} />

                ))

              ) : (

                <p className="text-center col-span-full text-gray-500 py-10">

                  No courses found.

                </p>

              )}

            </div>

          )}

            </div>
          )}
        </main>

      </div>

    </div>

  );

};

 

export default MyCourses;
