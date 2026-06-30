// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, TrendingUp, Users, CheckCircle, Clock, BarChart3, PieChart, Award, UserCheck, Zap } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar";
// import Profileheader from "@/components/ui/Profileheader";
// import { Menu, X } from "lucide-react";

// const Analytics = () => {
//   useEffect(() => {
//     document.title = "Analytics - LauraTek";
//   }, []);

//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [active, setActive] = useState("Analytics");
//   const [activeTab, setActiveTab] = useState("performance");

//   // Mock data for stats
//   const stats = [
//     { title: "Attendance Rate", value: "92%", icon: UserCheck, color: "teal" },
//     { title: "Average Score", value: "87%", icon: TrendingUp, color: "blue" },
//     { title: "Sessions Attended", value: "45/50", icon: Calendar, color: "green" },
//     { title: "Mock Interviews", value: "4/5", icon: Users, color: "purple" },
//   ];

//   // Mock attendance data (last 30 days)
//   const attendanceData = [
//     { day: "Oct 1", attended: true },
//     { day: "Oct 2", attended: true },
//     { day: "Oct 3", attended: false },
//     { day: "Oct 4", attended: true },
//     { day: "Oct 5", attended: true },
//     // ... assume more data up to Oct 28
//   ];

//   // Mock performance data
//   const performanceData = {
//     weeklyTests: [
//       { week: "Week 1", score: 85 },
//       { week: "Week 2", score: 92 },
//       { week: "Week 3", score: 78 },
//       { week: "Week 4", score: 95 },
//     ],
//     mockInterviews: [
//       { interview: "Mock 1", score: 88 },
//       { interview: "Mock 2", score: 76 },
//       { interview: "Mock 3", score: 91 },
//       { interview: "Mock 4", score: 84 },
//     ],
//     softSkills: [
//       { skill: "Communication", rating: 4.5 },
//       { skill: "Teamwork", rating: 4.2 },
//       { skill: "Problem Solving", rating: 4.8 },
//       { skill: "Time Management", rating: 4.0 },
//     ],
//     courseInterviews: { completed: 3, total: 4, avgScore: 89 },
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const statVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const getIcon = (icon) => {
//     switch (icon) {
//       case UserCheck: return UserCheck;
//       case TrendingUp: return TrendingUp;
//       case Calendar: return Calendar;
//       case Users: return Users;
//       default: return Zap;
//     }
//   };

//   return (
//     <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-white via-sky-50 to-teal-50 overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Header */}
//         <Profileheader />
        
// <div className="lg:hidden py-4 flex justify-end">
//   <button
//     onClick={() => setSidebarOpen(!sidebarOpen)}
//     className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 
//                text-white rounded-lg shadow-md hover:shadow-lg 
//                transition-all duration-300"
//   >
//     {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
//   </button>
// </div>
//         {/* Content Area */}
//         <main className="p-6 flex-1 overflow-auto">
//           <div className="max-w-7xl mx-auto w-full">
//             {/* Header */}
//             <motion.div 
//               className="text-center mb-8"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent mb-4">
//                 Analytics Dashboard
//               </h1>
//               <p className="text-xl text-gray-600">Track your performance, attendance, and growth</p>
//             </motion.div>

//             {/* Stats Cards */}
//             <motion.div 
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {stats.map((stat, index) => {
//                 const Icon = getIcon(stat.icon);
//                 return (
//                   <motion.div
//                     key={index}
//                     className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow`}
//                     variants={statVariants}
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
//                         <Icon className={`h-6 w-6 text-${stat.color}-600`} />
//                       </div>
//                       <div className="text-right">
//                         <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
//                         <p className="text-sm text-gray-600">{stat.title}</p>
//                       </div>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <motion.div 
//                         className={`h-2 rounded-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}
//                         initial={{ width: 0 }}
//                         animate={{ width: stat.value.replace('%', '') }}
//                         transition={{ duration: 1.5, delay: index * 0.2 }}
//                       />
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             {/* Tabs */}
//             <div className="flex justify-center mb-8">
//               <div className="bg-white rounded-xl p-1 shadow-lg flex space-x-1">
//                 {["performance", "attendance"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//                       activeTab === tab
//                         ? "bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow-md"
//                         : "text-gray-600 hover:text-teal-600"
//                     }`}
//                   >
//                     {tab === "performance" ? "Performance" : "Attendance"}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Content based on tab */}
//             <AnimatePresence mode="wait">
//               {activeTab === "performance" && (
//                 <motion.div
//                   key="performance"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-8"
//                 >
//                   {/* Weekly Tests Bar Chart */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
//                       <BarChart3 className="h-6 w-6 text-teal-600" />
//                       Weekly Tests
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                       {performanceData.weeklyTests.map((test, index) => (
//                         <div key={index} className="text-center">
//                           <p className="text-sm font-semibold text-gray-600 mb-2">{test.week}</p>
//                           <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
//                             <motion.div 
//                               className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
//                               initial={{ width: 0 }}
//                               animate={{ width: `${test.score}%` }}
//                               transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
//                             />
//                           </div>
//                           <p className="text-sm font-bold text-gray-800">{test.score}%</p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.section>

//                   {/* Mock Interviews */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
//                       <Users className="h-6 w-6 text-purple-600" />
//                       Mock Interviews
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {performanceData.mockInterviews.map((interview, index) => (
//                         <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
//                           <p className="text-sm font-semibold text-gray-600 mb-2">{interview.interview}</p>
//                           <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                             <motion.div 
//                               className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
//                               initial={{ width: 0 }}
//                               animate={{ width: `${interview.score}%` }}
//                               transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
//                             />
//                           </div>
//                           <p className="text-sm font-bold text-gray-800">{interview.score}%</p>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.section>

//                   {/* Soft Skills Pie-like Representation */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
//                       <PieChart className="h-6 w-6 text-green-600" />
//                       Soft Skills Assessment
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {performanceData.softSkills.map((skill, index) => (
//                         <div key={index} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
//                           <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                             <Award className="h-6 w-6 text-green-600" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-800">{skill.skill}</p>
//                             <div className="flex items-center gap-2">
//                               <div className="flex gap-0.5">
//                                 {[...Array(5)].map((_, i) => (
//                                   <div key={i} className={`w-4 h-4 rounded-full ${i < skill.rating ? 'bg-yellow-400' : 'bg-gray-300'}`} />
//                                 ))}
//                               </div>
//                               <span className="text-sm text-gray-600">({skill.rating}/5)</span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </motion.section>

//                   {/* Course Interviews Summary */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
//                       <CheckCircle className="h-6 w-6 text-orange-600" />
//                       Course Interviews
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-orange-600">{performanceData.courseInterviews.completed}</p>
//                         <p className="text-gray-600">Completed</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-orange-600">{performanceData.courseInterviews.total}</p>
//                         <p className="text-gray-600">Total</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-orange-600">{performanceData.courseInterviews.avgScore}%</p>
//                         <p className="text-gray-600">Avg Score</p>
//                       </div>
//                     </div>
//                     <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
//                       <motion.div 
//                         className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${performanceData.courseInterviews.avgScore}%` }}
//                         transition={{ duration: 1.5 }}
//                       />
//                     </div>
//                   </motion.section>
//                 </motion.div>
//               )}

//               {activeTab === "attendance" && (
//                 <motion.div
//                   key="attendance"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-8"
//                 >
//                   {/* Daily Live Class Attendance Calendar/Line */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
//                       <Clock className="h-6 w-6 text-teal-600" />
//                       Daily Live Class Attendance (Last 30 Days)
//                     </h2>
//                     <div className="grid grid-cols-7 gap-2 text-center">
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                         <div key={day} className="font-semibold text-gray-500 text-sm">{day}</div>
//                       ))}
//                       {Array.from({ length: 30 }, (_, i) => {
//                         const day = attendanceData[i % attendanceData.length] || { attended: Math.random() > 0.2 };
//                         return (
//                           <div
//                             key={i}
//                             className={`p-2 rounded cursor-pointer transition-colors ${
//                               day.attended ? 'bg-teal-100 text-teal-800 font-semibold' : 'bg-gray-100 text-gray-400'
//                             }`}
//                           >
//                             {i + 1}
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <div className="mt-6 flex justify-between items-center">
//                       <span className="text-sm text-gray-600">92% Attendance</span>
//                       <div className="flex items-center gap-1">
//                         <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
//                         <span className="text-sm text-gray-600">Attended</span>
//                         <div className="w-3 h-3 bg-gray-300 rounded-full ml-4"></div>
//                         <span className="text-sm text-gray-600">Missed</span>
//                       </div>
//                     </div>
//                   </motion.section>

//                   {/* Additional Attendance Trends */}
//                   <motion.section 
//                     className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Trends</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-blue-600">28</p>
//                         <p className="text-gray-600">Consecutive Days</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-green-600">95%</p>
//                         <p className="text-gray-600">This Month</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-purple-600">2</p>
//                         <p className="text-gray-600">Missed Sessions</p>
//                       </div>
//                     </div>
//                     <div className="mt-6 w-full bg-gray-200 rounded-full h-4">
//                       <motion.div 
//                         className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
//                         initial={{ width: 0 }}
//                         animate={{ width: "95%" }}
//                         transition={{ duration: 1.5 }}
//                       />
//                     </div>
//                   </motion.section>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </main>

//         {/* Footer */}
//         <motion.footer 
//           className="bg-white border-t border-gray-200 mt-auto p-4 text-center text-sm text-gray-500"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           &copy; 2025 LauraTek. All rights reserved. | Privacy Policy | Terms of Service
//         </motion.footer>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
