import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Zap } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";

// Dummy student-related calendar data (removed appointments and emergency)
const calendarEvents = [
  { 
    id: 1, 
    date: "2025-10-01", 
    time: "9:00 AM", 
    type: "live-class", 
    title: "Daily Live Class - Calculus Basics", 
    status: "confirmed" 
  },
  { 
    id: 5, 
    date: "2025-10-25", 
    time: "10:30 AM", 
    type: "live-class", 
    title: "Prof. Reddy - Interactive Q&A Session", 
    status: "confirmed" 
  },
  { 
    id: 7, 
    date: "2025-10-28", 
    time: "11:00 AM", 
    type: "event", 
    title: "Special Guest Lecture: AI in Education", 
    status: "confirmed" 
  },
  { 
    id: 8, 
    date: "2025-10-28", 
    time: "2:00 PM", 
    type: "live-class", 
    title: "Daily Live Class - Data Structures", 
    status: "confirmed" 
  },
  { 
    id: 9, 
    date: "2025-10-30", 
    time: "3:00 PM", 
    type: "special-event", 
    title: "Midterm Exam Review Workshop", 
    status: "confirmed" 
  },
  { 
    id: 10, 
    date: "2025-10-25", 
    time: "2:00 PM", 
    type: "special-event", 
    title: "Group Study Session - Chemistry", 
    status: "confirmed" 
  },
];

const currentYear = 2025;
const initialMonth = 9; // October
const currentDate = new Date(currentYear, initialMonth, 28); // Current date: Oct 28, 2025
const selectedDateInit = 28;

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
  const days = generateCalendarDays(currentYearState, currentMonth);
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYearState}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live-class":
        return "bg-success";
      case "event":
        return "bg-purple-500";
      case "special-event":
        return "bg-amber-500";
      default:
        return "bg-muted";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "live-class":
        return "Live Class";
      case "event":
        return "Event";
      case "special-event":
        return "Special Class";
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
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYearState(currentYearState - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    // Reset selected if needed
    if (selectedDate > new Date(currentYearState, currentMonth, 0).getDate()) {
      setSelectedDate(1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYearState(currentYearState + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    // Reset selected if needed
    const daysInNextMonth = new Date(currentYearState, currentMonth + 1, 0).getDate();
    if (selectedDate > daysInNextMonth) {
      setSelectedDate(1);
    }
  };

  return (
    <div className="flex h-screen bg-[#f7fafd]">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Profileheader />

        {/* Content Area */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main left content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Calendar Grid */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{monthNames[currentMonth]} {currentYearState}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleNextMonth}>
                        Next
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                      <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all duration-200
                          ${day === null ? 'invisible' : ''}
                          ${day === currentDate.getDate() && currentMonth === initialMonth ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
                          ${day === selectedDate ? 'ring-2 ring-primary' : ''}
                        `}
                        onClick={() => day && setSelectedDate(day)}
                      >
                        {day && (
                          <>
                            <div className="font-medium">{day}</div>
                            <div className="space-y-1 mt-1">
                              {getEventsForDate(day).slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                                  title={`${event.time} ${event.title}`}
                                >
                                  {`${event.time} ${event.title.substring(0, 20)}${event.title.length > 20 ? '...' : ''}`}
                                </div>
                              ))}
                              {getEventsForDate(day).length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{getEventsForDate(day).length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Selected Date Events */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>
                    Events for {monthNames[currentMonth]} {selectedDate}, {currentYearState}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No events for this date
                      </p>
                    ) : (
                      getEventsForDate(selectedDate).map((event) => (
                        <div key={event.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant={getStatusBadge(event.status)}>
                              {event.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                          </div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                            <span className="text-sm">{getTypeLabel(event.type)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Right sidebar */}
            <div className="flex flex-col gap-6">
              {/* Calendar Stats - 3 cards */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{todaysEvents}</div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Live Classes</CardTitle>
                    <Clock className="h-5 w-5 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">{totalLiveClasses}</div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Special Classes</CardTitle>
                    <Zap className="h-5 w-5 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{totalSpecialClasses}</div>
                  </CardContent>
                </Card>
              </div>
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="font-semibold mb-2 text-sm">Notifications</div>
                <ul className="space-y-2">
                  <li className="text-xs">
                    <span className="font-medium text-blue-700">
                      • New Live Class Reminder
                    </span>
                    <div className="text-gray-500">Data Structures class starts in 1 hour</div>
                    <div className="text-gray-400 text-xs">1 hour ago</div>
                  </li>
                  <li className="text-xs">
                    <span className="font-medium text-blue-700">
                      • Workshop Update
                    </span>
                    <div className="text-gray-500">Midterm Review materials uploaded</div>
                    <div className="text-gray-400 text-xs">3 hours ago</div>
                  </li>
                  <li className="text-xs">
                    <span className="font-medium text-blue-700">
                      • Guest Lecture
                    </span>
                    <div className="text-gray-500">AI in Education session recording available</div>
                    <div className="text-gray-400 text-xs">5 hours ago</div>
                  </li>
                </ul>
                <button className="mt-2 w-full text-blue-600 text-xs font-medium hover:underline">
                  View all notifications
                </button>
              </div>
              {/* Upcoming Assignments */}
              <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="font-semibold mb-2 text-sm">
                  Upcoming Quizzes
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-xs">
                    <span>Calculus Quiz</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                      Due tomorrow
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span>Data Structures Assignment</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                      Due in 2 days
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span>Chemistry Lab Report</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                      Due in 1 week
                    </span>
                  </li>
                </ul>
                <button className="mt-2 w-full text-blue-600 text-xs font-medium hover:underline">
                  View all quizzes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;