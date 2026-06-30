import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Trophy, Users, CheckCircle, Clock, TrendingUp, Crown, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Menu, X } from "lucide-react";

const mockStudents = [
  {
    id: "STU-2024-001",
    name: "Navya D",
    avatar: "https://picsum.photos/40?random=1",
    mockInterviews: 95,
    attendance: 98,
    codingQuestions: 92,
    overall: 95,
  },
  {
    id: "STU-2024-002",
    name: "Rajesh K",
    avatar: "https://picsum.photos/40?random=2",
    mockInterviews: 88,
    attendance: 92,
    codingQuestions: 89,
    overall: 90,
  },
  {
    id: "STU-2024-003",
    name: "Priya S",
    avatar: "https://picsum.photos/40?random=3",
    mockInterviews: 85,
    attendance: 95,
    codingQuestions: 87,
    overall: 89,
  },
  {
    id: "STU-2024-004",
    name: "Amit M",
    avatar: "https://picsum.photos/40?random=4",
    mockInterviews: 82,
    attendance: 90,
    codingQuestions: 85,
    overall: 86,
  },
  {
    id: "STU-2024-005",
    name: "Sneha R",
    avatar: "https://picsum.photos/40?random=5",
    mockInterviews: 78,
    attendance: 88,
    codingQuestions: 80,
    overall: 82,
  },
  // Add more students as needed
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Leaderboard");
  const [activeTab, setActiveTab] = useState("overall");

  const tabs = [
    { id: "overall", label: "Overall Ranking", icon: Trophy },
    { id: "mockInterviews", label: "Mock Interviews", icon: Users },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "codingQuestions", label: "Coding Questions", icon: TrendingUp },
  ];

  const getCurrentMetric = (student) => {
    switch (activeTab) {
      case "mockInterviews": return student.mockInterviews;
      case "attendance": return student.attendance;
      case "codingQuestions": return student.codingQuestions;
      default: return student.overall;
    }
  };

  const sortedStudents = [...mockStudents].sort((a, b) => getCurrentMetric(b) - getCurrentMetric(a));

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

  const barVariants = {
    hidden: { width: 0 },
    visible: { width: "auto" }
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case "mockInterviews": return { from: "purple", to: "pink" };
      case "attendance": return { from: "green", to: "teal" };
      case "codingQuestions": return { from: "blue", to: "sky" };
      default: return { from: "teal", to: "sky" };
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-white via-sky-50 to-teal-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Profileheader />

                


        {/* Content Area */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
                <Crown className="h-12 w-12" />
                Leaderboard
              </h1>
              <p className="text-xl text-gray-600">Compare your performance with peers across key metrics</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-xl p-1 shadow-lg flex space-x-1 flex-wrap justify-center">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow-md"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard Graph Section */}
            <AnimatePresence mode="wait">
              {tabs.map((tab) => (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <motion.section 
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                        <BarChart3 className="h-6 w-6" style={{ color: getTabColor(tab.id).from === "purple" ? "#8B5CF6" : getTabColor(tab.id).from === "green" ? "#10B981" : getTabColor(tab.id).from === "blue" ? "#3B82F6" : "#0D9488" }} />
                        {tab.label} Comparison
                      </h2>
                      <div className="space-y-4">
                        {sortedStudents.slice(0, 8).map((student, index) => {
                          const metric = getCurrentMetric(student);
                          const { from, to } = getTabColor(tab.id);
                          return (
                            <motion.div
                              key={student.id}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-sky-500 text-white">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{student.name}</div>
                                  <div className="text-xs text-gray-500">#{index + 1}</div>
                                </div>
                              </div>
                              <div className="flex-1 mx-6">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <motion.div 
                                    className={`h-3 rounded-full bg-gradient-to-r from-${from}-500 to-${to}-500`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric}%` }}
                                    transition={{ duration: 1.5, delay: index * 0.1 }}
                                  />
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">{metric}%</div>
                                <div className="text-xs text-gray-500">{student.id}</div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.section>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Your Position Card */}
            <motion.div 
              className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                Your Position
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal-600">#1</div>
                  <p className="text-sm text-gray-600">Overall Rank</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                      initial={{ width: 0 }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">95%</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">#2</div>
                  <p className="text-sm text-gray-600">Mock Interviews</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">88%</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">#1</div>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">98%</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">#3</div>
                  <p className="text-sm text-gray-600">Coding Questions</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">92%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer 
          className="bg-white border-t border-gray-200 mt-auto p-4 text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          &copy; 2025 LauraTek. All rights reserved. | Privacy Policy | Terms of Service
        </motion.footer>
      </div>
    </div>
  );
};

export default Leaderboard;
