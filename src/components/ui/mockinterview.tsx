import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, FileText, MessageCircle, Zap, Clock, BookOpen } from "lucide-react";
import Sidebar from "../sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";

const SessionBookingDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Sessions");
  const [activeTab, setActiveTab] = useState("MOCK SESSIONS");

  const tabs = [
    "MOCK SESSIONS",
    "MENTORSHIP SESSIONS",
    "Placement Mocks",
    "Others",
    "HR Expert Sessions",
    "Fundamentals",
    "Frontend",
    "DSA",
    "Backend"
  ];

  const sessionCardVariants = {
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-900 leading-relaxed">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Profileheader />

        {/* Content Area */}
        <main className="p-6 flex-1 overflow-auto">
          <motion.div
            className="font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Custom Header with Animation */}
            <motion.header 
              className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-5 flex justify-between items-center rounded-xl mb-6 shadow-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-5">
                <motion.button 
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Zap className="inline mr-2 h-4 w-4" /> Join Now
                </motion.button>
                <motion.div 
                  className="text-sm opacity-80"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  You have <span className="font-bold text-yellow-300">0</span> upcoming sessions.
                </motion.div>
              </div>
              <div className="flex gap-5">
                {[
                  { icon: User, label: "Job interview experience" },
                  { icon: FileText, label: "Comprehensive feedback" },
                  { icon: MessageCircle, label: "Personalised doubt solving" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <item.icon className="w-4 h-4 text-blue-300" />
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.header>

            {/* Main Flex Section with Staggered Animation */}
            <motion.main 
              className="flex min-h-[60vh] mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              <motion.section 
                className="flex-1 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mr-6"
                variants={sessionCardVariants}
                whileHover="hover"
              >
                <motion.h2 
                  className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Book Sessions
                </motion.h2>
                <p className="text-gray-600 mb-8 text-lg">All your eligible sessions that you can book are shown here</p>
                
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200/50 mb-6 hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <motion.h3 
                    className="text-xl font-bold mb-3 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    Frontend 1
                  </motion.h3>
                  <div className="text-green-600 mb-4 text-lg font-semibold">Last session: 4 Dec 23</div>
                  <motion.div 
                    className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    8.95
                  </motion.div>
                  <div className="flex gap-4">
                    <motion.button 
                      className="border border-blue-500 text-blue-500 bg-transparent px-6 py-3 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      View Details
                    </motion.button>
                    <motion.button 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 shadow-md"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Book Session
                    </motion.button>
                  </div>
                </motion.div>
              </motion.section>

              <motion.aside 
                className="w-80 bg-gradient-to-b from-amber-50 to-orange-50 p-8 rounded-2xl shadow-xl border border-amber-200/50"
                variants={sessionCardVariants}
                whileHover="hover"
              >
                <motion.h3 
                  className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Zap className="w-5 h-5" />
                  Recommended
                </motion.h3>
                <p className="text-gray-600 mb-6 text-base">You should attempt the following sessions:</p>
                <ul className="list-none space-y-4">
                  {[
                    "Frontend Resume & Project Mock",
                    "HR Mock"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-3 text-gray-800 p-3 bg-white/50 rounded-lg hover:bg-white transition-colors duration-200 cursor-pointer"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs">⚡</div>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.aside>
            </motion.main>

            {/* All Sessions Section with Tab Animation */}
            <motion.section 
              className="p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 flex items-center gap-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <Clock className="w-6 h-6 text-gray-600" />
                All Sessions
              </motion.h2>
              <div className="flex gap-2 mb-8 border-b border-gray-200/50 pb-4 overflow-x-auto">
                <AnimatePresence mode="wait">
                  {tabs.map((tabName, index) => (
                    <motion.button
                      key={tabName}
                      className={`px-6 py-3 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors relative whitespace-nowrap flex-shrink-0 ${
                        activeTab === tabName ? "text-indigo-600 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:rounded-full" : ""
                      }`}
                      onClick={() => setActiveTab(tabName)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tabName}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div 
                className="grid gap-6"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 flex items-center justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                  variants={sessionCardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      FE
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">Frontend 1</div>
                      <div className="text-gray-600 text-base flex items-center gap-3">
                        <motion.span 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
                          whileHover={{ scale: 1.1 }}
                        >
                          8.95
                        </motion.span>
                        <span>4 Dec 23</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.a 
                      href="#"
                      className="text-indigo-600 no-underline text-base font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Book Session
                    </motion.a>
                    <motion.a 
                      href="#"
                      className="text-indigo-600 no-underline text-base font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-sm"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      View Details →
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default SessionBookingDashboard;