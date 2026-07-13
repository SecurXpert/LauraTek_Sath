import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contactus from '@/components/ui/contactus';
import AttendanceBanner from '@/components/guest/Attendance/AttendanceBanner';
import ExperienceTrackingCard from '@/components/guest/Attendance/ExperienceTrackingCard';
import AttendanceHistoryCard from '@/components/guest/Attendance/AttendanceHistoryCard';
import UnlockFeaturesCard from '@/components/guest/Attendance/UnlockFeaturesCard';
import SuccessModal from '@/components/guest/Attendance/SuccessModal';
import { VITE_API_URL } from '@/services/api/api';

const GuestAttendance = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [todaySession, setTodaySession] = useState("0h 0m");
  const [contactOpen, setContactOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const fetchTodaySession = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      const response = await fetch(`${VITE_API_URL}/guest/attendance/today`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        setTodaySession("0h 0m");
        return;
      }
      
      const data = await response.json();
      
      if (data && typeof data.duration_hours === 'number') {
        setTodaySession(`${data.duration_hours.toFixed(1)}h`);
      } else if (data && data.duration_hours !== undefined && data.duration_hours !== null) {
        setTodaySession(`${parseFloat(data.duration_hours).toFixed(1)}h`);
      } else {
        setTodaySession("0.0h");
      }
    } catch (error) {
      console.error('Failed to fetch today session:', error);
      setTodaySession("0h 0m");
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setDate(toDate.getDate() - 30);
      const toDateStr = toDate.toISOString().split('T')[0];
      const fromDateStr = fromDate.toISOString().split('T')[0];

      const response = await fetch(`${VITE_API_URL}/guest/attendance/my-attendance?from_date=${fromDateStr}&to_date=${toDateStr}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const formatted = data.map((item: any) => {
          const checkIn = item.check_in_time;
          const checkOut = item.check_out_time;
          const duration = parseFloat(item.duration_hours) || 0;

          const formatDate = (dateStr: string) => {
            if (!dateStr) return "Unknown Date";
            const parsedStr = dateStr.includes('T') && !dateStr.endsWith('Z') ? `${dateStr}Z` : dateStr;
            const date = new Date(parsedStr);
            return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
          };

          const formatTime = (timeStr: string) => {
            if (!timeStr) return "-";
            const parsedStr = timeStr.includes('T') && !timeStr.endsWith('Z') ? `${timeStr}Z` : timeStr;
            const date = new Date(parsedStr);
            return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
          };

          const parsedDate = formatDate(item.date || item.created_at || checkIn || checkOut);

          return {
            date: parsedDate,
            checkIn: checkIn ? formatTime(checkIn) : "-",
            checkOut: checkOut ? formatTime(checkOut) : "-",
            hours: duration > 0 ? `${duration.toFixed(1)}h` : "0.0h",
            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Present'
          };
        });
        setHistory(formatted.reverse().slice(0, 5));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchTodaySession();
  }, []);

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      const response = await fetch(`${VITE_API_URL}/guest/attendance/check-in`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert('Checked in successfully!');
        fetchAttendance();
        fetchTodaySession();
      } else {
        alert('Check-in failed.');
      }
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem('access_token') || '';
      const response = await fetch(`${VITE_API_URL}/guest/attendance/check-out`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert('Checked out successfully!');
        fetchAttendance();
        fetchTodaySession();
      } else {
        alert('Check-out failed.');
      }
    } catch (error) {
      console.error('Error during check-out:', error);
    }
  };

  return (
    <div className="px-4 lg:px-8 pt-0 pb-8 w-full max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-slate-800 mb-1">Attendance</h1>
          <p className="text-[14px] text-gray-500">Track your daily attendance and hours</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Action buttons could go here */}
        </div>
      </div>

      <AttendanceBanner />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <ExperienceTrackingCard 
            handleCheckIn={handleCheckIn}
            handleCheckOut={handleCheckOut}
            todaySession={todaySession}
          />

          <AttendanceHistoryCard 
            history={history}
            loading={loading}
            isUnlocked={isUnlocked}
          />
        </div>

        {/* Right Column */}
        <UnlockFeaturesCard setContactOpen={setContactOpen} />
      </div>

      <Contactus 
        open={contactOpen} 
        setOpen={setContactOpen} 
        onSuccess={() => {
          setIsUnlocked(true);
          setShowSuccessModal(true);
        }} 
      />

      <SuccessModal 
        showSuccessModal={showSuccessModal} 
        setShowSuccessModal={setShowSuccessModal} 
      />
    </div>
  );
};

export default GuestAttendance;
