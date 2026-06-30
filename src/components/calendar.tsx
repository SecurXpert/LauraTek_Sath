import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video, CalendarPlus, Zap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./sidebar";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";
import CalendarGrid from "./ui/calendar-page/CalendarGrid";
import UpcomingEvents from "./ui/calendar-page/UpcomingEvents";
import QuickActions from "./ui/calendar-page/QuickActions";

// Calendar data - only API fetched live classes will be displayed

// API response type
interface LiveClass {
  id: number;
  course_id: number;
  title: string;
  scheduled_at: string;
  join_link: string;
  recorded_link: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  timer: number;
}

// Use actual current date
const now = new Date();
const currentYear = now.getFullYear();
const initialMonth = now.getMonth();
const currentDate = now;
const selectedDateInit = now.getDate();

// Generate calendar days
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
};

const Calendar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Calendar");
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYearState, setCurrentYearState] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(selectedDateInit);
  const [liveClasses, setLiveClasses] = useState([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [apiInfo, setApiInfo] = useState<{method: string, endpoint: string, duration: number} | null>(null);
  const [showApiDetails, setShowApiDetails] = useState(false);
  const days = generateCalendarDays(currentYearState, currentMonth);

  // Fetch upcoming live classes from API
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard/upcoming-live-classes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const sortedData = [...data].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
          setLiveClasses(sortedData);

          // Navigate to the month of the first upcoming event
          if (sortedData.length > 0) {
            const firstEvent = sortedData[0];
            const eventDate = new Date(firstEvent.scheduled_at);
            setCurrentYearState(eventDate.getFullYear());
            setCurrentMonth(eventDate.getMonth());
            setSelectedDate(eventDate.getDate());
          }
        }
      } catch (error) {
        console.error("Error fetching live classes:", error);
      }
    };

    fetchLiveClasses();
  }, []);

  // Fetch available quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const startTime = performance.now();
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard/available-quizzes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        
        if (res.ok) {
          const data = await res.json();
          setQuizzes(data);
          setApiInfo({
            method: 'GET',
            endpoint: "/dashboard/available-quizzes",
            duration: duration
          });
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Convert API live classes to calendar event format
  const apiEvents = liveClasses.map((liveClass) => {
    const scheduledDate = new Date(liveClass.scheduled_at);
    const dateStr = scheduledDate.toISOString().split('T')[0];
    const timeStr = scheduledDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      id: `api-${liveClass.id}`,
      date: dateStr,
      time: timeStr,
      type: "live-class",
      title: liveClass.title,
      shortTitle: liveClass.title.length > 12 ? liveClass.title.substring(0, 12) + '...' : liveClass.title,
      status: "confirmed",
      joinLink: liveClass.join_link
    };
  });

  // Only API events (no hardcoded events)
  const calendarEvents = apiEvents;
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYearState}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live-class":
        return "bg-blue-100 text-blue-600";
      case "assignment":
        return "bg-amber-100 text-amber-600";
      case "quiz":
        return "bg-teal-100 text-teal-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getUpcomingEventBadgeColor = (type: string) => {
    switch (type) {
      case "live-class":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white";
      case "assignment":
        return "bg-gradient-to-r from-amber-400 to-red-500 text-white";
      case "quiz":
        return "bg-teal-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "live-class":
        return "Live Classes";
      case "assignment":
        return "Assignments";
      case "quiz":
        return "Quizzes";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return "destructive";
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "scheduled":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Dynamic stats (for October)
  const todaysEvents = getEventsForDate(currentDate.getDate()).length;
  const totalLiveClasses = calendarEvents.filter(e => e.type === "live-class").length;
  const totalSpecialClasses = calendarEvents.filter(e => e.type === "event" || e.type === "special-event").length;

  const handlePreviousMonth = () => {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYearState - 1 : currentYearState;
    setCurrentMonth(prevMonth);
    setCurrentYearState(prevYear);

    const prefix = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;
    const monthEvents = calendarEvents.filter(e => e.date.startsWith(prefix));
    if (monthEvents.length > 0) {
      const firstEventDay = new Date(monthEvents[0].date).getDate();
      setSelectedDate(firstEventDay);
    } else {
      setSelectedDate(0);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYearState + 1 : currentYearState;
    setCurrentMonth(nextMonth);
    setCurrentYearState(nextYear);

    const prefix = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}`;
    const monthEvents = calendarEvents.filter(e => e.date.startsWith(prefix));
    if (monthEvents.length > 0) {
      const firstEventDay = new Date(monthEvents[0].date).getDate();
      setSelectedDate(firstEventDay);
    } else {
      setSelectedDate(0);
    }
  };

  const handleScheduleEvent = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/upcoming-live-classes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0 && data[0].join_link) {
          window.open(data[0].join_link, '_blank');
        }
      }
    } catch (error) {
      console.error("Error fetching live classes for schedule event:", error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f7fafd] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Profileheader />



        {/* Content Area */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          {/* Page Header */}
          <div className="mb-6 flex justify-between items-start md:items-center">
            <div>
              <h1 className="font-inter font-bold text-xl md:text-[23.7px] leading-tight md:leading-[31.6px] tracking-normal text-[#101828]">Calendar</h1>
              <p className="text-gray-500 mt-1 text-xs md:text-sm">Manage your schedule and upcoming events</p>
            </div>
            <button 
              className="lg:hidden p-2 rounded-md bg-white border border-gray-200 text-gray-600 shadow-sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main left content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <CalendarGrid
                currentMonth={currentMonth}
                currentYearState={currentYearState}
                monthNames={monthNames}
                days={days}
                currentDate={currentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                getEventsForDate={getEventsForDate}
                handlePreviousMonth={handlePreviousMonth}
                handleNextMonth={handleNextMonth}
                getEventTypeColor={getEventTypeColor}
              />
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-4 md:gap-6 lg:overflow-auto lg:max-h-[calc(100vh-140px)]">
              <UpcomingEvents
                calendarEvents={calendarEvents}
                getUpcomingEventBadgeColor={getUpcomingEventBadgeColor}
              />

              {/* Quick Actions */}
              <QuickActions handleScheduleEvent={handleScheduleEvent} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
