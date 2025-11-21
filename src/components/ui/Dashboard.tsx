import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, BarChart3, Award, Clock, Play, Users, Star, Bell, FileText, AlertCircle, ArrowRight } from "lucide-react";
import Sidebar from "../sidebar";
import Profileheader from "@/components/ui/Profileheader";
import Header from "../Header";

const summaryCards = [
  { label: "Total Courses", value: 4, icon: BookOpen },
  { label: "Total Progress", value: "78%", icon: BarChart3 },
  { label: "Certificates Earned", value: "03", icon: Award },
  { label: "Hours Learned", value: 46, icon: Clock },
];

const continueLearning = [
  {
    title: "Java Basics",
    desc: "Master Java from basics to advanced concepts",
    author: "by Ashwin K",
    img: "/assets/UIUX Developer.jpg",
    progress: 79,
    weeks: 8,
    students: 1200,
    rating: 4.8,
  },
  {
    title: "Data Structures & Algorithms",
    desc: "Master Java from basics to advanced concepts",
    author: "by Ashwin K",
    img: "/assets/data-science-course.jpg",
    progress: 79,
    weeks: 8,
    students: 1200,
    rating: 4.8,
  },
  {
    title: "Database Management Systems",
    desc: "Master Java from basics to advanced concepts",
    author: "by Ashwin K",
    img: "/assets/sql.jpg",
    progress: 79,
    weeks: 8,
    students: 1200,
    rating: 4.8,
  },
];

const notifications = [
  {
    title: "New Assignment Posted",
    desc: "Java Module 3 assignment is now available",
    time: "1 hour ago",
    type: "new",
  },
  {
    title: "Quiz Results Available",
    desc: "Your last quiz scored 85%",
    time: "3 hours ago",
    type: "quiz",
  },
  {
    title: "New Course Material",
    desc: "HTML Module 2 slides uploaded",
    time: "5 hours ago",
    type: "material",
  },
];

const upcomingAssignments = [
  { title: "React Components Quiz", due: "Due today" },
  { title: "Java Assignment 2", due: "Due tomorrow" },
  { title: "Database Design Project", due: "Due in 2 days" },
  { title: "Algorithms Midterm Prep", due: "Due in 4 days" },
  { title: "SQL Queries Homework", due: "Due in 1 week" },
  { title: "Web Development Essay", due: "Due in 10 days" },
  { title: "Algorithms Midterm Prep", due: "Due in 4 days" },
  { title: "SQL Queries Homework", due: "Due in 1 week" },
  { title: "Web Development Essay", due: "Due in 10 days" },
];

const scheduledClasses = [
  { title: "HTML Fundamentals", session: "5th Session", time: "Today 3PM" },
  { title: "HTML Fundamentals", session: "5th Session", time: "Today 3PM" },
  { title: "HTML Fundamentals", session: "5th Session", time: "Today 3PM" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f7fafd] to-blue-50">
      
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* === PROFILE HEADER (NAVBAR) === */}
        <Header />
        {/* <Profileheader /> */}

        {/* Content Area */}
        <main className="p-6 flex-1 overflow-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {/* Main left content */}
            <motion.div className="lg:col-span-2 flex flex-col gap-6" variants={cardVariants}>
              {/* Welcome Banner */}
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-white/20"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <span className="text-xl font-semibold">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">shailu!</span>
                  </span>
                  <div className="text-sm text-gray-500 mt-2">
                    Here's what's happening with your learning today.
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-blue-700 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-lg shadow-md">
                    Points: <span className="font-bold">75</span> | Badge: <Award className="inline h-4 w-4" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Summary Cards */}
              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={cardVariants}>
                {summaryCards.map((card, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col items-center border border-white/20 hover:bg-white transition-all duration-300"
                    variants={cardVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <motion.div 
                      className="text-3xl mb-2 p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <card.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <div className="text-xs text-gray-500 mb-1 text-center">
                      {card.label}
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {card.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Learning */}
              <motion.div variants={cardVariants}>
                <div className="flex justify-between items-center mb-4">
                  <motion.h2 
                    className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                  >
                    Continue Learning
                  </motion.h2>
                  <motion.button 
                    className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {continueLearning.map((course, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-500"
                      variants={cardVariants}
                      whileHover="hover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <motion.div 
                        className="relative overflow-hidden rounded-lg mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={course.img}
                          alt={course.title}
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          {course.progress}%
                        </div>
                      </motion.div>
                      <h3 className="font-bold text-base mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.author}</p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.desc}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.7 + i * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span><Clock className="inline h-3 w-3 mr-1" /> {course.weeks} weeks</span>
                        <span><Users className="inline h-3 w-3 mr-1" /> {course.students}</span>
                        <span><Star className="inline h-3 w-3 mr-1 text-yellow-500" /> {course.rating}</span>
                      </div>
                      <motion.button 
                        className="mt-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Continue Learning
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Classes Scheduled, Recorded, Utilisation */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={cardVariants}>
                <motion.div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20">
                  <motion.div className="font-bold mb-4 text-lg flex items-center gap-2">
                    <Play className="h-5 w-5 text-blue-600" />
                    Classes Scheduled for today
                  </motion.div>
                  <ul className="space-y-3">
                    {scheduledClasses.map((cls, i) => (
                      <motion.li
                        key={i}
                        className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <span className="font-medium">{cls.title} - {cls.session}</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {cls.time}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20 flex flex-col items-center justify-center">
                  <motion.div className="font-bold mb-4 text-lg flex items-center gap-2">
                    <Play className="h-5 w-5 text-green-600" />
                    Recorded Classes
                  </motion.div>
                  <div className="mb-4 text-sm text-gray-500 text-center">
                    Access recorded sessions anytime
                    <br /><span className="font-bold text-green-600">72 Available</span>
                  </div>
                  <motion.button 
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Watch Now
                  </motion.button>
                </motion.div>

                <motion.div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20 flex flex-col items-center justify-center">
                  <motion.div className="font-bold mb-4 text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Utilisation of Portal
                  </motion.div>
                  <div className="w-32 h-32 flex items-center justify-center mb-4">
                    <motion.div 
                      className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center relative"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                        80%
                      </div>
                    </motion.div>
                  </div>
                  <div className="text-xs text-gray-500 grid grid-cols-2 gap-2 w-full text-center">
                    <div>Exams <span className="font-bold text-purple-600">40%</span></div>
                    <div>Compiler <span className="font-bold text-purple-600">25%</span></div>
                    <div>Mock Interviews <span className="font-bold text-purple-600">20%</span></div>
                    <div>Analytics <span className="font-bold text-purple-600">15%</span></div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right sidebar */}
            <motion.div className="flex flex-col gap-6" variants={cardVariants}>
              <motion.div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20">
                <motion.div className="font-bold mb-4 text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Notifications
                </motion.div>
                <ul className="space-y-3">
                  {notifications.map((n, i) => (
                    <motion.li 
                      key={i} 
                      className="text-sm p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-semibold text-blue-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> {n.title}
                      </span>
                      <div className="text-gray-500 text-sm">{n.desc}</div>
                      <div className="text-gray-400 text-xs mt-1">{n.time}</div>
                    </motion.li>
                  ))}
                </ul>
                <motion.button className="mt-4 w-full text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1 justify-center">
                  View all notifications <Bell className="h-3 w-3" />
                </motion.button>
              </motion.div>

              <motion.div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20">
                <motion.div className="font-bold mb-4 text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Upcoming Assignments
                </motion.div>
                <ul className="space-y-3">
                  {upcomingAssignments.map((a, i) => (
                    <motion.li 
                      key={i} 
                      className="flex justify-between items-center text-sm p-3 bg-orange-50 rounded-lg hover:bg-orange-100"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <span className="font-medium">{a.title}</span>
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {a.due}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button className="mt-4 w-full text-orange-600 text-sm font-medium hover:underline flex items-center gap-1 justify-center">
                  View all assignments <FileText className="h-3 w-3" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;