import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@/api/instance";

import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../sidebar";
import Profileheader from "@/components/ui/Profileheader";
import CurriculumView from "./CurriculumView";

import DashboardHeader from "./dashboard-page/DashboardHeader";
import SummaryCards from "./dashboard-page/SummaryCards";
import FilterButtons from "./dashboard-page/FilterButtons";
import DashboardCourseCard from "./dashboard-page/DashboardCourseCard";
import RecordedClassesWidget from "./dashboard-page/RecordedClassesWidget";
import { decodeJWT } from "@/lib/jwtUtils";
import { VITE_API_URL } from "@/services/api/api";

/* ================= STATIC DATA ================= */

const allCourses = [
  {
    title: "Advanced React & TypeScript",
    desc: "Master modern React patterns with TypeScript and build scalable applications",
    author: "Sarah Johnson",
    authorImg: "",
    img: "/assets/data-science-course.jpg",
    progress: 65,
    modules: "6/10 modules",
    weeks: 8,
    students: "12.4k",
    rating: 4.8,
    status: "In Progress",
    difficulty: "Advanced",
    streak: "5 day streak",
    upNext: "Hooks in React",
    upNextTime: "5 min",
    lastAccessed: "Last accessed 2 days ago",
  },
  {
    title: "Python for Data Science",
    desc: "Learn Python programming and data analysis with real-world projects",
    author: "Michael Chen",
    authorImg: "",
    img: "/assets/sql.jpg",
    progress: 35,
    modules: "3/8 modules",
    weeks: 10,
    students: "18.9k",
    rating: 4.9,
    status: "In Progress",
    difficulty: "Intermediate",
    streak: "3 day streak",
    upNext: "Pandas DataFrame Operations",
    upNextTime: "12 min",
    lastAccessed: "Last accessed 1 day ago",
  },
  {
    title: "UI/UX Design Mastery",
    desc: "Complete guide to user interface and experience design principles",
    author: "Emma Williams",
    authorImg: "",
    img: "/assets/UIUX Developer.jpg",
    progress: 100,
    modules: "12/12 modules",
    weeks: 6,
    students: "25.3k",
    rating: 4.9,
    status: "Completed",
    difficulty: "Beginner",
    streak: null,
    upNext: null,
    upNextTime: null,
    lastAccessed: "Last accessed 1 week ago",
  },
];

const continueLearning = [allCourses[0]];

const notifications = [
  {
    title: "New Assignment Posted",
    desc: "Java Module 3 assignment is now available",
    time: "1 hour ago",
  },
  {
    title: "Quiz Results Available",
    desc: "Your last quiz scored 85%",
    time: "3 hours ago",
  },
  {
    title: "New Course Material",
    desc: "HTML Module 2 slides uploaded",
    time: "5 hours ago",
  },
];



const upcomingAssignments = [
  { title: "React Components Quiz", due: "Due today" },
  { title: "Java Assignment 2", due: "Due tomorrow" },
  { title: "Database Design Project", due: "Due in 2 days" },
  { title: "Algorithms Midterm Prep", due: "Due in 4 days" },
  { title: "SQL Queries Homework", due: "Due in 1 week" },
  { title: "Web Development Essay", due: "Due in 10 days" },
];

/* fallback if API empty */
const scheduledClassesStatic = [
  { title: "HTML Fundamentals", session: "5th Session", time: "Today 3PM" },
  { title: "CSS Basics", session: "3rd Session", time: "Today 5PM" },
  { title: "Java Basics", session: "7th Session", time: "Tomorrow 10AM" },
];


/* fallback if API empty */
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Today ${time}`;
  if (isTomorrow) return `Tomorrow ${time}`;

  return `${date.toLocaleDateString()} ${time}`;
};


/* ================= ANIMATIONS ================= */

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

/* ================= COMPONENT ================= */

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("user_name") || "User");

  /* ===== API STATE ===== */
  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState<any[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedCurriculumCourse, setSelectedCurriculumCourse] = useState<any>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [streakData, setStreakData] = useState<any>(null);

  /* ===== MODAL STATE ===== */
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const name = localStorage.getItem("user_name");
      if (name) setUserName(name);
    };
    window.addEventListener("user-name-updated", handleStorageChange);
    return () => window.removeEventListener("user-name-updated", handleStorageChange);
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [location.state, courses.length, recordedVideos.length]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  /* ===== DYNAMIC SUMMARY DATA ===== */
  const totalCourses = courses.length;
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((sum: number, c: any) => sum + (c.progress || 0), 0) / courses.length)
    : 0;
  const totalCertificates = certificates.length;
  const totalHours = courses.reduce((sum: number, c: any) => sum + (c.duration || 0), 0);

  const summaryCards = [
    { label: "Total Courses", value: totalCourses.toString(), icon: BookOpen,  trendUp: true, trendText: "+12.5%", iconBg: "bg-gradient-to-br from-[#7C3AED] to-[#6D28D9]", iconColor: "text-white" },
    { label: "Total Progress", value: `${avgProgress}%`, icon: TrendingUp,  trendUp: true, trendText: "+8.2%", iconBg: "bg-gradient-to-br from-teal-500 to-teal-700", iconColor: "text-white" },
    { label: "Certificates Earned", value: totalCertificates.toString(), icon: Award, trendUp: true, trendText: "+23.1%", iconBg: "bg-gradient-to-br from-orange-400 to-orange-600", iconColor: "text-white" },
    { label: "Hours Earned", value: `${totalHours} Hrs`, icon: Clock,  trendUp: false, trendText: "-2.4%", iconBg: "bg-gradient-to-br from-green-500 to-green-700", iconColor: "text-white" },
  ];

  /* ===== FETCH MY COURSES & INSTRUCTORS ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCoursesLoading(true);
        const [coursesRes, instructorsRes] = await Promise.all([
          api.get("/dashboard/my-courses").catch(() => ({ data: [] })),
          api.get("/dashboard/my-instructors").catch(() => ({ data: [] }))
        ]);
        const fetchedCourses = coursesRes.data || [];
        
        // Fetch progress for each course
        const token = localStorage.getItem("access_token");
        const decoded = token ? decodeJWT(token) : null;
        const studentId = decoded?.student_id || Number(decoded?.sub) || 12;
        const coursesWithProgress = await Promise.all(
          fetchedCourses.map(async (course: any) => {
            if (!token) return course;
            try {
              const progRes = await fetch(
                `${VITE_API_URL}/courses/students/${studentId}/courses/${course.course_id}/progress`,
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              );
              if (progRes.ok) {
                const progData = await progRes.json();
                return {
                  ...course,
                  completed_modules: progData.completed_modules,
                  total_modules: progData.total_modules,
                  progress: Math.round((progData.completion_ratio || 0) * 100),
                };
              }
            } catch (e) {
              console.error(`Failed to fetch progress for course ${course.id}:`, e);
            }
            return course;
          })
        );

        setCourses(coursesWithProgress);
        setInstructors(instructorsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch courses or instructors:", err);
        setCourses([]);
        setInstructors([]);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===== FETCH RECORDED VIDEOS ===== */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideosLoading(true);
        const res = await api.get("/dashboard/recorded-classes");
        setRecordedVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setRecordedVideos([]);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Map backend courses to display format
  const mappedCourses = courses.map((course: any) => {
    const isCompleted = course.completed || (course.total_modules > 0 && course.completed_modules === course.total_modules);
    const status = isCompleted ? "completed" : (course.progress > 0 ? "inProgress" : "notStarted");
    const inst = instructors.find((i: any) => i.course_titles?.includes(course.course_title));

    return {
      id: course.course_id,
      title: course.course_title,
      description: course.description || "high level",
      author: inst?.name || course.instructor_name || "Instructor",
      authorImg: (() => {
        const rawImg = inst ? (inst.profile_picture || "") : (course.instructor_image || "");
        if (rawImg && (rawImg.includes("unsplash.com") || rawImg.includes("dummy") || rawImg.includes("placeholder"))) {
          return "";
        }
        return rawImg;
      })(),
      image: course.course_image || "/assets/placeholder.jpg",
      progress: course.progress || 0,
      modules: `${course.progress || 0}%`,
      completed_modules: course.completed_modules,
      total_modules: course.total_modules,
      weeks: Math.round((course.duration || 0) / 24) || 1,
      duration: course.duration || 0,
      students: "1.2k",
      rating: inst?.rating ?? course.rating ?? 0,
      status: status,
      difficulty: status === "completed" ? "Beginner" : (course.course_id % 2 === 0 ? "Advanced" : "Intermediate"),
      streak: status === "inProgress" ? `${(course.course_id % 5) + 2} day streak` : null,
      upNext: course.progress > 0 && !course.completed ? "Continue Learning" : null,
      upNextTime: null,
      lastAccessed: course.progress > 0 ? "Recently accessed" : "Not started",
    };
  });

  const filteredCourses = mappedCourses.filter((c: any) =>
    filter === "all" ? true : c.status === filter
  ).reverse();

  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 3);


  /* ===== GET UPCOMING LIVE CLASSES ===== */
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/dashboard/upcoming-live-classes");
        setClasses(res.data);
      } catch (err) {
        console.error(err);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  /* ===== FETCH CERTIFICATES ===== */
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await api.get("/student/student/my-certificates");
        setCertificates(res.data?.certificates || []);
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setCertificates([]);
      }
    };
    fetchCertificates();
  }, []);

  /* ===== FETCH STREAK ===== */
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await api.get("/student-streaks/my-streak");
        setStreakData(res.data);
      } catch (err) {
        console.error("Failed to fetch streak:", err);
      }
    };
    fetchStreak();
  }, []);


  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-[#f7fafd] to-blue-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* <Header /> */}
        <Profileheader onMenuClick={() => setSidebarOpen(true)} />


        {/* ================= CONTENT ================= */}
        <main className="flex-1 overflow-auto p-0 relative">
          {selectedCurriculumCourse ? (
            <CurriculumView
              course={selectedCurriculumCourse}
              onBack={() => setSelectedCurriculumCourse(null)}
            />
          ) : (
          <motion.div
            className="w-full p-8"
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex flex-col gap-8">
              {/* Welcome */}
              <DashboardHeader userName={userName} streakData={streakData} />

              {/* Summary */}
              <SummaryCards cards={summaryCards} />

              {/* Continue Learning */}
              <div id="courses-section">
                <FilterButtons
                  filteredCoursesLength={filteredCourses.length}
                  showAllCourses={showAllCourses}
                  setShowAllCourses={setShowAllCourses}
                  filter={filter}
                  setFilter={setFilter}
                />

                {coursesLoading ? (
                  <p className="text-center text-gray-500 py-10">Loading courses...</p>
                ) : displayedCourses.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No courses found.</p>
                ) : (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {displayedCourses.map((course: any) => (
                      <DashboardCourseCard 
                        key={course.id} 
                        course={course} 
                        setSelectedCurriculumCourse={setSelectedCurriculumCourse} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Recorded Classes */}
              <RecordedClassesWidget recordedVideos={recordedVideos} videosLoading={videosLoading} />
            </motion.div>
          </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
