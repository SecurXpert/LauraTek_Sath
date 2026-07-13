import React from 'react';
import { Radio, Lock, Calendar, Clock, Users, Video, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GuestLiveClasses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromDashboard = location.state?.fromDashboard;

  const classes = [
    {
      title: "Advanced React Patterns & Performance",
      instructor: "Rahul Mehta",
      date: "Dec 12, 2024 at 10:00 AM",
      duration: "2h",
      enrolled: "342",
      status: "Upcoming",
      statusColor: "bg-[#F4F2FF] text-[#5B4FFF]",
      category: "React Advanced",
      isEnded: false,
      bgColor: "from-blue-400 to-indigo-500"
    },
    {
      title: "System Design Interview Workshop",
      instructor: "Vikram Nair",
      date: "Dec 13, 2024 at 3:00 PM",
      duration: "2.5h",
      enrolled: "518",
      status: "Live Now",
      statusColor: "bg-[#FFF0F5] text-[#D83A76] flex items-center gap-1.5",
      isLive: true,
      category: "Career Prep",
      isEnded: false,
      bgColor: "from-red-400 to-rose-500"
    },
    {
      title: "Full Stack Project — Day 1",
      instructor: "Priya Kapoor",
      date: "Dec 14, 2024 at 11:00 AM",
      duration: "3h",
      enrolled: "267",
      status: "Upcoming",
      statusColor: "bg-[#F4F2FF] text-[#5B4FFF]",
      category: "Project Work",
      isEnded: false,
      bgColor: "from-emerald-400 to-teal-500"
    },
    {
      title: "Database Design & Optimization",
      instructor: "Deepak Sharma",
      date: "Dec 15, 2024 at 2:00 PM",
      duration: "2h",
      enrolled: "189",
      status: "Upcoming",
      statusColor: "bg-[#F4F2FF] text-[#5B4FFF]",
      category: "Backend",
      isEnded: false,
      bgColor: "from-amber-400 to-orange-500"
    },
    {
      title: "CSS Animation & Motion Design",
      instructor: "Anjali Singh",
      date: "Dec 11, 2024 at 10:00 AM",
      duration: "1.5h",
      enrolled: "156",
      status: "Completed",
      statusColor: "bg-white/90 text-slate-700",
      category: "Frontend",
      isEnded: true,
      bgColor: "from-gray-400 to-slate-500"
    },
    {
      title: "Ethical Hacking Fundamentals",
      instructor: "Aryan Gupta",
      date: "Dec 10, 2024 at 4:00 PM",
      duration: "2h",
      enrolled: "423",
      status: "Completed",
      statusColor: "bg-white/90 text-slate-700",
      category: "Security",
      isEnded: true,
      bgColor: "from-slate-600 to-gray-800"
    }
  ];

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        {fromDashboard && (
          <button 
            onClick={() => navigate('/guest')}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#5B4FFF] mb-4 transition-colors text-[14px] font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
          </button>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-slate-800 mb-1">Live Classes</h1>
            <p className="text-[14px] text-gray-500">Interactive sessions with expert instructors</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[13px] font-bold text-slate-800 border border-gray-200 shadow-guest">
            <Sparkles className="w-4 h-4 text-[#5B4FFF]" /> 6 Sessions
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#D83A76] to-[#E11D48] rounded-[24px] p-6 lg:p-8 text-white mb-6 shadow-guest shadow-rose-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-[16px] bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/20 backdrop-blur-sm">
            <Radio className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/20 backdrop-blur-sm rounded-full text-[11px] font-bold tracking-wide uppercase border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Live Now
              </span>
              <span className="text-[13px] text-white/80 font-medium">Career Prep</span>
            </div>
            <h2 className="text-[20px] font-bold mb-1">System Design Interview Workshop</h2>
            <p className="text-[14px] text-white/80">Vikram Nair · 518 enrolled</p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 relative z-10">
          <button 
            onClick={() => navigate('/guest/enrollments')}
            className="flex items-center gap-2 bg-white text-[#D83A76] hover:bg-gray-50 px-6 py-2.5 rounded-full font-bold text-[14px] transition-colors shadow-guest"
          >
            <Lock className="w-4 h-4" /> Enroll to Join
          </button>
          <button className="flex items-center gap-1.5 text-white/90 hover:text-white text-[13px] font-medium transition-colors">
            <ExternalLink className="w-4 h-4" /> View Details
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#F4F2FF] border border-[#5B4FFF]/20 rounded-[16px] p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#5B4FFF] flex-shrink-0" />
          <p className="text-[14px] text-slate-800">
            <span className="font-bold">View-Only Mode:</span> You can see class schedules and details, but joining is restricted to enrolled students.
          </p>
        </div>
        <button 
          onClick={() => navigate('/guest/enrollments')}
          className="flex-shrink-0 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white px-6 py-2.5 rounded-full font-bold text-[13px] transition-colors shadow-guest shadow-purple-200"
        >
          Enroll Now
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-white rounded-[24px] border border-gray-100 shadow-guest overflow-hidden flex flex-col">
            {/* Card Image Header */}
            <div className={`h-40 bg-gradient-to-br ${cls.bgColor} relative p-4 flex flex-col justify-between`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex justify-between items-start">
                <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${cls.statusColor}`}>
                  {cls.isLive && <span className="w-1.5 h-1.5 rounded-full bg-[#D83A76] animate-pulse inline-block mr-1.5"></span>}
                  {cls.status}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium rounded-lg border border-white/10">
                  {cls.category}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-800 mb-1 leading-snug line-clamp-2 min-h-[44px]">
                {cls.title}
              </h3>
              <p className="text-[13px] text-gray-500 mb-5">{cls.instructor}</p>

              <div className="space-y-2 mb-6 mt-auto">
                <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {cls.date}
                </div>
                <div className="flex items-center gap-4 text-[13px] text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {cls.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    {cls.enrolled} enrolled
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 py-2.5 rounded-[12px] text-[13px] font-bold transition-colors">
                  <Video className="w-4 h-4" /> View Details
                </button>
                {cls.isEnded ? (
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-2.5 rounded-[12px] text-[13px] font-bold cursor-not-allowed">
                    Ended
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/guest/enrollments')}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white py-2.5 rounded-[12px] text-[13px] font-bold transition-colors shadow-guest shadow-purple-200"
                  >
                    <Lock className="w-3.5 h-3.5" /> Enroll <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestLiveClasses;
