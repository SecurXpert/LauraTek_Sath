import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Award, TrendingUp, TrendingDown, BarChart3, Calendar, Check, Clock } from "lucide-react";
import Sidebar from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";

const assignments = [
  { title: "ML Model Integration", course: "Machine Learning Basics", due: "12-07-2025", status: "Submitted", action: "Resubmit" },
  { title: "Database Schema", course: "SQL Basics", due: "14-07-2025", status: "Pending", action: "Submit" },
  { title: "Database Schema", course: "SQL Basics", due: "14-07-2025", status: "Pending", action: "Submit" },
  { title: "Database Schema", course: "SQL Basics", due: "14-07-2025", status: "Pending", action: "Submit" },
  { title: "Database Schema", course: "SQL Basics", due: "14-07-2025", status: "Pending", action: "Submit" },
  { title: "JS To-Do App", course: "JavaScript", due: "17-07-2025", status: "Pending", action: "Submit" },
];

const grades = [
  { course: "Machine Learning Basics", overall: "88%", quiz: "85%", attendance: "95%", performance: "Good" },
  { course: "SQL Basics", overall: "92%", quiz: "85%", attendance: "95%", performance: "Excellent" },
  { course: "Data Structures & Algorithms", overall: "34%", quiz: "57%", attendance: "38%", performance: "Bad" },
  { course: "UX Fundamentals", overall: "72%", quiz: "85%", attendance: "76%", performance: "Average" },
  { course: "Web Development", overall: "41%", quiz: "45%", attendance: "57%", performance: "Bad" },
];

const chartData = [
  { month: "Jan", "Course 1": 40, "Course 2": 10, "Course 3": 50 },
  { month: "Feb", "Course 1": 25, "Course 2": 35, "Course 3": 65 },
  { month: "Mar", "Course 1": 45, "Course 2": 30, "Course 3": 45 },
  { month: "Apr", "Course 1": 70, "Course 2": 20, "Course 3": 55 },
  { month: "May", "Course 1": 60, "Course 2": 45, "Course 3": 35 },
  { month: "Jun", "Course 1": 55, "Course 2": 65, "Course 3": 50 },
];

const Assessments = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Assessments");
  useEffect(() => {
    document.title = "Assessments - LauraTek";
  }, []);
  const [tab, setTab] = useState("Grades");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted": return { bg: "from-green-500 to-emerald-600", text: "text-green-800", badge: "bg-green-100/80" };
      default: return { bg: "from-orange-500 to-red-600", text: "text-orange-800", badge: "bg-orange-100/80" };
    }
  };

  const statusColors = getStatusColor(tab === "Assignments" ? "Pending" : "Good"); // Default

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f7fafd] to-blue-50">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Profileheader />

        {/* Content Area */}
        <main className="p-4 flex-1 overflow-auto"> {/* Reduced padding for wider content */}
          <motion.div 
            className="w-full" // Full width
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex border-b mb-6 w-full overflow-x-auto" // Full width, scrollable tabs
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {[
                  { name: "Assignments", icon: FileText },
                  { name: "Grades", icon: Award }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    className={`px-8 py-4 font-bold text-lg flex items-center gap-2 whitespace-nowrap mr-1 transition-all duration-300 ${
                      tab === item.name 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg rounded-t-xl border-b-0' 
                        : 'bg-white/70 text-gray-600 hover:text-green-600 border-b-2 border-transparent hover:border-green-300'
                    }`}
                    onClick={() => setTab(item.name)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap="tap"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              {tab === "Assignments" && (
                <motion.div 
                  key="assignments"
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full border border-white/20 overflow-hidden" // Full width
                  variants={cardVariants}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.h2 
                    className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FileText className="h-7 w-7 text-green-600" />
                    Assignments
                  </motion.h2>
                  <motion.div 
                    className="overflow-x-auto w-full" // Full width
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.table 
                      className="min-w-full text-base bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-inner" // Full width, enhanced styling
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                        <tr>
                          <th className="p-5 font-bold text-left">Title</th>
                          <th className="p-5 font-bold text-left">Course</th>
                          <th className="p-5 font-bold text-left">Due Date</th>
                          <th className="p-5 font-bold text-left">Status</th>
                          <th className="p-5 font-bold text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-100/50">
                        {assignments.map((a, i) => {
                          const colors = getStatusColor(a.status);
                          return (
                            <motion.tr 
                              key={i} 
                              className="hover:bg-green-50/50 transition-colors duration-200"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                            >
                              <td className="p-5 font-semibold text-gray-800">{a.title}</td>
                              <td className="p-5 text-gray-600">{a.course}</td>
                              <td className="p-5 text-blue-600 font-medium">{a.due}</td>
                              <td className="p-5">
                                <motion.span 
                                  className={`px-3 py-2 text-sm rounded-full font-semibold inline-flex items-center gap-1 ${colors.badge}`}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Check className="h-3 w-3" />
                                  {a.status}
                                </motion.span>
                              </td>
                              <td className="p-5">
                                <motion.button 
                                  className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 text-sm ${colors.text}`}
                                  variants={buttonVariants}
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  {a.action}
                                </motion.button>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </motion.table>
                  </motion.div>
                </motion.div>
              )}

              {tab === "Grades" && (
                <motion.div 
                  key="grades"
                  className="space-y-6 w-full" // Full width
                  variants={cardVariants}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Stats Cards */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-wrap gap-8 items-center border border-white/20 w-full" // Full width
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.div 
                      className="text-center"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="text-sm text-gray-500 mb-1">Average Grade</div>
                      <motion.div 
                        className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        12 %
                      </motion.div>
                    </motion.div>
                    <div className="flex gap-8">
                      <motion.div 
                        className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-md transition-all duration-300"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="text-sm text-gray-500 mb-1">Quizzes</div>
                        <div className="text-2xl font-bold text-green-600">90 %</div>
                      </motion.div>
                      <motion.div 
                        className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-md transition-all duration-300"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="text-sm text-gray-500 mb-1">Attendance</div>
                        <div className="text-2xl font-bold text-green-600">80 %</div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Historical Performance Chart */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20 w-full" // Full width
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className="flex justify-between items-center mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.h3 
                        className="text-2xl font-bold flex items-center gap-2 text-gray-800"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                      >
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                        Historical Performance
                      </motion.h3>
                      <motion.span 
                        className="text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        Last 6 Months +5%
                      </motion.span>
                    </motion.div>
                    <motion.div 
                      className="w-full h-[300px]" // Increased height for chart
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip contentStyle={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #e5e7eb" }} />
                          <Legend />
                          <Line type="monotone" dataKey="Course 1" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="Course 2" stroke="#06B6D4" strokeWidth={3} dot={{ fill: "#06B6D4", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="Course 3" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </motion.div>

                  {/* Detailed Grade Breakdown */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full border border-white/20 overflow-hidden" // Full width
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h3 
                      className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Award className="h-6 w-6 text-purple-600" />
                      Detailed Grade Breakdown
                    </motion.h3>
                    <motion.div 
                      className="overflow-x-auto w-full" // Full width
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.table 
                        className="min-w-full text-base bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-inner" // Full width
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <thead className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                          <tr>
                            <th className="p-5 font-bold text-left">Course</th>
                            <th className="p-5 font-bold text-left">Overall Grade</th>
                            <th className="p-5 font-bold text-left">Quiz Average</th>
                            <th className="p-5 font-bold text-left">Attendance</th>
                            <th className="p-5 font-bold text-left">Performance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100/50">
                          {grades.map((g, i) => (
                            <motion.tr 
                              key={i} 
                              className="hover:bg-purple-50/50 transition-colors duration-200"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.05)" }}
                            >
                              <td className="p-5 font-semibold text-gray-800">{g.course}</td>
                              <td className="p-5 text-purple-600 font-bold">{g.overall}</td>
                              <td className="p-5 text-green-600 font-medium">{g.quiz}</td>
                              <td className="p-5 text-blue-600 font-medium">{g.attendance}</td>
                              <td className="p-5">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  g.performance === "Excellent" ? "bg-green-100 text-green-800" :
                                  g.performance === "Good" ? "bg-blue-100 text-blue-800" :
                                  g.performance === "Average" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                }`}>
                                  {g.performance}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </motion.table>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Assessments;