import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Filter, Calendar, TrendingUp, PieChart } from 'lucide-react';
import Sidebar from '../sidebar';
import Profileheader from '../ui/Profileheader';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define types for attendance data
interface AttendanceCategory {
  totalSessions: number;
  attended: number;
  percentage: number;
}

interface AttendanceData {
  coding: AttendanceCategory;
  liveClasses: AttendanceCategory;
  mcqs: AttendanceCategory;
  interviews: AttendanceCategory;
}

const AttendancePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('Attendance');

  // Mock data for attendance calculations
  const attendanceData: AttendanceData = {
    coding: { totalSessions: 20, attended: 18, percentage: 90 },
    liveClasses: { totalSessions: 15, attended: 12, percentage: 80 },
    mcqs: { totalSessions: 10, attended: 9, percentage: 90 },
    interviews: { totalSessions: 5, attended: 4, percentage: 80 },
  };

  // Calculate overall attendance percentage
  const totalAttended = Object.values(attendanceData).reduce((sum, cat) => sum + cat.attended, 0);
  const totalSessions = Object.values(attendanceData).reduce((sum, cat) => sum + cat.totalSessions, 0);
  const overallPercentage = Math.round((totalAttended / totalSessions) * 100);

  // Data for Pie Chart: Attendance distribution by category
  const pieData = {
    labels: ['Coding', 'Live Classes', 'MCQs', 'Interviews'],
    datasets: [
      {
        label: 'Attendance %',
        data: [attendanceData.coding.percentage, attendanceData.liveClasses.percentage, attendanceData.mcqs.percentage, attendanceData.interviews.percentage],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Graph: Sessions attended vs missed
  const barData = {
    labels: ['Coding', 'Live Classes', 'MCQs', 'Interviews'],
    datasets: [
      {
        label: 'Attended',
        data: [attendanceData.coding.attended, attendanceData.liveClasses.attended, attendanceData.mcqs.attended, attendanceData.interviews.attended],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Missed',
        data: [
          attendanceData.coding.totalSessions - attendanceData.coding.attended,
          attendanceData.liveClasses.totalSessions - attendanceData.liveClasses.attended,
          attendanceData.mcqs.totalSessions - attendanceData.mcqs.attended,
          attendanceData.interviews.totalSessions - attendanceData.interviews.attended,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attendance Distribution by Category (%)',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attended vs Missed Sessions',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    document.title = 'Attendance - LauraTek';
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
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

        {/* Attendance Content */}
        <motion.div 
          className="py-6"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center gap-3"
            variants={itemVariants}
          >
            <Users className="h-10 w-10" />
            Attendance Dashboard
          </motion.h1>
          
          {/* Overall Attendance Card */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-8 mb-8 text-center border border-white/20"
            variants={itemVariants}
            style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overall Attendance</h2>
            <div className={`text-6xl font-bold ${overallPercentage > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
              {overallPercentage}%
            </div>
            <p className="text-gray-600 mt-2">Attended {totalAttended} out of {totalSessions} sessions</p>
          </motion.div>

          {/* Category Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(attendanceData).map(([key, data], index) => (
              <motion.div 
                key={key} 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md border border-white/20"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
                <div className={`text-3xl font-bold mb-2 ${data.percentage > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {data.percentage}%
                </div>
                <p className="text-sm text-gray-600">Attended: {data.attended}/{data.totalSessions}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20"
              variants={itemVariants}
              style={{ 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Attendance Distribution</h3>
              </div>
              <div className="h-80">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </motion.div>
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/20"
              variants={itemVariants}
              style={{ 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Sessions Overview</h3>
              </div>
              <div className="h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendancePage;