import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarDays, LogIn, LogOut } from "lucide-react";
import Sidebar from "../sidebar";
import Profileheader from "../ui/Profileheader";
import api from "../../api/instance";
import MarkAttendanceCard from "./attendance/MarkAttendanceCard";
import AttendanceStatsCard from "./attendance/AttendanceStatsCard";
import AttendanceHistoryTable from "./attendance/AttendanceHistoryTable";
const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [todayDuration, setTodayDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/dashboard/my-courses");
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
          const savedCourseId = localStorage.getItem('course_id');
          if (savedCourseId && res.data.some((c: any) => c.course_id === Number(savedCourseId))) {
            setSelectedCourseId(Number(savedCourseId));
          } else {
            setSelectedCourseId(res.data[0].course_id);
            localStorage.setItem('course_id', String(res.data[0].course_id));
          }
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // TIMER STATES
  const [isCheckedIn, setIsCheckedIn] = useState(() => !!localStorage.getItem('checkInTime'));
  const [seconds, setSeconds] = useState(() => {
    const localCheckIn = localStorage.getItem('checkInTime');
    if (localCheckIn) {
      const checkInDate = new Date(localCheckIn);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
      return elapsedSeconds > 0 ? elapsedSeconds : 0;
    }
    return 0;
  });

  // ===============================
  // TIMER EFFECT
  // ===============================
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCheckedIn) {
      interval = setInterval(() => {
        const localCheckIn = localStorage.getItem('checkInTime');
        if (localCheckIn) {
          const checkInDate = new Date(localCheckIn);
          const now = new Date();
          const elapsedSeconds = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
          setSeconds(elapsedSeconds > 0 ? elapsedSeconds : 0);
        } else {
          // Fallback if no start time is recorded
          setSeconds((prev) => prev + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const sec = secs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // ===============================
  // FETCH ATTENDANCE LIST
  // ===============================
  const fetchAttendance = async () => {
    try {
      const res = await api.get(
        "/attendance/dashboard/my-attendance"
      );
      setAttendance(Array.isArray(res.data?.items) ? res.data.items : []);

      // Check if user is currently checked in
      // Find the most recent record by date
      const attendanceData = Array.isArray(res.data?.items) ? res.data.items : [];
      if (attendanceData.length > 0) {
        // Find an active session: a record with a check-in time but NO check-out time
        const activeSession = attendanceData.find((item) => {
          const hasCheckIn = item.check_in_time && item.check_in_time !== "";
          const hasCheckOut = item.check_out_time && item.check_out_time !== "";
          return hasCheckIn && !hasCheckOut;
        });

        if (activeSession) {
          setIsCheckedIn(true);
          
          if (activeSession.check_in_time) {
            localStorage.setItem('checkInTime', activeSession.check_in_time);
            const checkInDate = new Date(activeSession.check_in_time);
            const now = new Date();
            const elapsedSeconds = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
            setSeconds(elapsedSeconds > 0 ? elapsedSeconds : 0);
          } else {
            setSeconds(0);
          }
        } else {
          // Check local storage as a fallback
          const localCheckIn = localStorage.getItem('checkInTime');
          
          // Verify if today's record has a check out time, if so, invalidate local storage
          const todayDate = new Date().toISOString().split('T')[0];
          const todayRecord = attendanceData.find((item: any) => item.date && item.date.startsWith(todayDate));
          
          if (todayRecord && todayRecord.check_out_time) {
            localStorage.removeItem('checkInTime');
            setIsCheckedIn(false);
            setSeconds(0);
          } else if (localCheckIn) {
            setIsCheckedIn(true);
            const checkInDate = new Date(localCheckIn);
            const now = new Date();
            const elapsedSeconds = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
            setSeconds(elapsedSeconds > 0 ? elapsedSeconds : 0);
          } else {
            setIsCheckedIn(false);
            setSeconds(0);
          }
        }
      } else {
        const localCheckIn = localStorage.getItem('checkInTime');
        if (localCheckIn) {
            setIsCheckedIn(true);
            const checkInDate = new Date(localCheckIn);
            const now = new Date();
            const elapsedSeconds = Math.floor((now.getTime() - checkInDate.getTime()) / 1000);
            setSeconds(elapsedSeconds > 0 ? elapsedSeconds : 0);
        } else {
            setIsCheckedIn(false);
            setSeconds(0);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // FETCH TOTAL HORS
  // ===============================
  const fetchTotalHours = async () => {
    try {
      const res = await api.get(
        "/attendance/dashboard/my-total-hours"
      );
      setTotalHours(res.data.total_attended_hours);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // CHECK IN
  // ===============================
  const handleCheckIn = async () => {
    if (!selectedCourseId) {
      alert("Please select a course first.");
      return;
    }
    try {
      setLoading(true);
      await api.post(
        "/attendance/check-in",
        { course_id: selectedCourseId }
      );
 
      setIsCheckedIn(true);  
      setSeconds(0);
      localStorage.setItem('checkInTime', new Date().toISOString());
 
      fetchTotalHours();
      fetchAttendance();
    } catch (err: any) {
      console.error(err);
     
      const responseData = err?.response?.data;
      const errorMsg = typeof responseData === 'string' ? responseData : (responseData?.detail || responseData?.message || err?.message || "");
      
      if (errorMsg.toLowerCase().includes("already checked in")) {
        setIsCheckedIn(true);
        if (!localStorage.getItem('checkInTime')) {
          localStorage.setItem('checkInTime', new Date().toISOString());
        }
      } else {
        alert("Check-in failed: " + JSON.stringify(responseData || errorMsg));
      }
    } finally {
      setLoading(false);
    }
  };
 
  // ===============================
  // CHECK OUT
  // ===============================
const handleCheckOut = async () => {
  const confirmCheckout = window.confirm(
    "checkout successfully"
  );
 
  if (!confirmCheckout) return;
 
  try {
    setLoading(true);
    const res = await api.put(
      "/attendance/check-out",
      { course_id: selectedCourseId }
    );
      setTodayDuration(res.data.duration_hours || 0);
      setIsCheckedIn(false);
      localStorage.removeItem('checkInTime');
 
      fetchAttendance();
    fetchTotalHours();
  } catch (err: any) {
    console.error(err);
   
    const responseData = err?.response?.data;
    const errorMsg = typeof responseData === 'string' ? responseData : (responseData?.detail || responseData?.message || err?.message || "");
    if (errorMsg.toLowerCase().includes("no active check-in")) {
      setIsCheckedIn(false);
      fetchAttendance();
    }
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchAttendance();
    fetchTotalHours();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "text-green-600 bg-green-100";
      case "absent":
        return "text-red-600 bg-red-100";
      case "late":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gray-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={() => {}} active="Attendance" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-500 text-sm">Track your daily attendance and hours</p>
          </div>

          {/* Top Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <MarkAttendanceCard
              handleCheckIn={handleCheckIn}
              handleCheckOut={handleCheckOut}
              loading={loading}
              isCheckedIn={isCheckedIn}
              seconds={seconds}
              todayDuration={todayDuration}
              formatTime={formatTime}
              courses={courses}
              selectedCourseId={selectedCourseId}
              onCourseChange={(id) => {
                setSelectedCourseId(id);
                localStorage.setItem('course_id', String(id));
              }}
            />

            <AttendanceStatsCard totalHours={totalHours} />
          </div>

          {/* Attendance History Table */}
          <AttendanceHistoryTable
            attendance={attendance}
            getStatusColor={getStatusColor}
          />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendancePage;
