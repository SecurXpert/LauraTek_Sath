import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar, Star, Play, Clock, Users, Award, Filter, BookOpen } from "lucide-react";
import Sidebar from '../components/sidebar'
import learn from '../assets/learn.jpg';
import Profileheader from './ui/Profileheader';
 
// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    author: 'John Doe',
    description: 'Learn the fundamentals of React for building dynamic web applications.',
    image: learn,
    status: 'inProgress',
    weeksToComplete: 4,
    views: 1200,
    rating: 4.5,
    progress: 60,
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    author: 'Jane Smith',
    description: 'Deep dive into JavaScript with modern ES6+ features and patterns.',
    image: learn,
    status: 'completed',
    weeksToComplete: 6,
    views: 850,
    rating: 4.8,
    progress: 100,
  },
  {
    id: 3,
    title: 'Python for Beginners',
    author: 'Alice Johnson',
    description: 'Get started with Python programming for data science and automation.',
    image: learn,
    status: 'notStarted',
    weeksToComplete: 5,
    views: 600,
    rating: 4.2,
    progress: 0,
  },
  {
    id: 4,
    title: 'Web Development',
    author: 'Bob Wilson',
    description: 'Comprehensive course covering HTML, CSS, and JavaScript.',
    image: learn,
    status: 'inProgress',
    weeksToComplete: 8,
    views: 2000,
    rating: 4.7,
    progress: 25,
  },
  {
    id: 5,
    title: 'Data Science with R',
    author: 'Emma Brown',
    description: 'Explore data analysis and visualization using R.',
    image: learn,
    status: 'notStarted',
    weeksToComplete: 7,
    views: 450,
    rating: 4.3,
    progress: 0,
  },
  {
    id: 6,
    title: 'UI/UX Design',
    author: 'Michael Lee',
    description: 'Learn the principles of designing user-friendly interfaces.',
    image: learn,
    status: 'completed',
    weeksToComplete: 3,
    views: 1800,
    rating: 4.9,
    progress: 100,
  },
];
 
const CourseCard = ({ course }) => {
  const navigate = useNavigate();
 
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
      case 'completed': return { bg: 'from-green-500 to-emerald-600', text: 'text-green-800', badge: 'bg-green-100' };
      case 'inProgress': return { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-800', badge: 'bg-blue-100' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-800', badge: 'bg-gray-100' };
    }
  };

  const statusColors = getStatusColor(course.status);

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/20 group hover:bg-white transition-all duration-300"
      variants={cardVariants}
      whileHover="hover"
    >
      <motion.div 
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-black/70 to-transparent text-white px-2 py-1 rounded-full text-xs font-bold">
          {course.views} views
        </div>
      </motion.div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <motion.h3 
            className="text-xl font-bold text-gray-800 line-clamp-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {course.title}
          </motion.h3>
          <motion.span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors.badge}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          >
            {course.status === 'completed'
              ? 'Completed'
              : course.status === 'inProgress'
              ? 'In Progress'
              : 'Not Started'}
          </motion.span>
        </div>
        <p className="text-sm text-gray-600 mb-2">by {course.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{course.description}</p>
 
        {/* Progress Bar */}
        <motion.div 
          className="mt-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gray-200 rounded-full h-2.5">
            <motion.div
              className={`h-2.5 rounded-full ${statusColors.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <motion.span 
            className="absolute top-[-0.5rem] right-0 text-xs text-gray-600 font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {course.progress}%
          </motion.span>
        </motion.div>
 
        {/* Course Info */}
        <div className="mt-5 flex justify-between items-center text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {course.weeksToComplete} weeks
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {course.views} views
          </span>
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3 fill-current" /> {course.rating}
          </span>
        </div>
 
        {/* Action Button */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
              course.status === 'completed'
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={course.status === 'completed'}
            onClick={() => navigate(`/dashboard/course/${course.id}`)}
          >
            {course.status === 'completed' ? (
              <>
                <Award className="inline mr-2 h-4 w-4" />
                Course Completed
              </>
            ) : course.status === 'inProgress' ? (
              <>
                <Play className="inline mr-2 h-4 w-4" />
                Continue Course
              </>
            ) : (
              <>
                <Play className="inline mr-2 h-4 w-4" />
                Start Course
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
 
const MyCourses = () => {
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('My Courses');
 
  useEffect(() => {
    document.title = 'My Courses - LauraTek';
  }, []);
 
  const filteredCourses = courses.filter((course) => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    }
  };

  const buttonFilterVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />
 
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6">
        <Profileheader />
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {sidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>
 
        {/* Courses Content */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center gap-3"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookOpen className="h-10 w-10" />
            My Courses
          </motion.h1>
 
          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
          >
            {['all', 'inProgress', 'completed', 'notStarted'].map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center gap-2 ${
                  filter === status
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-gray-200/50'
                }`}
                variants={buttonFilterVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Filter className="h-4 w-4" />
                {status === 'all'
                  ? 'All Courses'
                  : status === 'inProgress'
                  ? 'In Progress'
                  : status === 'completed'
                  ? 'Completed'
                  : 'Not Started'}
              </motion.button>
            ))}
          </motion.div>
 
          {/* Courses Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
            ) : (
              <motion.p 
                className="col-span-full text-center text-gray-500 text-lg py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                No courses found for this filter. <br />
                <span className="text-sm">Try adjusting your filter above.</span>
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
 
export default MyCourses;