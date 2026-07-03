import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import techlogo from "@/assets/techlogo.png";

import { 
  LayoutGrid, 
  ClipboardCheck, 
  Code, 
  ChartColumnIncreasing, 
  Video, 
  MessageSquare, 
  Tv, 
  MessageCircle,
  Award, 
  Star, 
  BarChart3, 
  Trophy, 
  Contact, 
  User, 
  Settings, 
  LogOut,
  Menu,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { FaCalendar } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";
import { BsFileEarmarkPersonFill } from "react-icons/bs";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutGrid
  },
  {
    name: "My Courses",
    path: "/mycourses",
    icon: BiSolidBook,
    fill: "currentColor"
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: FaCalendar,
    fill: "currentColor"
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck
  },
  {
    name: "Compiler",
    path: "/exams",
    icon: Code
  },
  {
    name: "Results",
    path: "/results",
    icon: Trophy
  },
  {
    name: "Assessments",
    path: "/assessments",
    icon: ChartColumnIncreasing
  },
  // {
  //   name: "Mock Interviews",
  //   path: "/interviews",
  //   icon: Video
  // },
  // {
  //   name: "Discussion",
  //   path: "/discussion",
  //   icon: MessageSquare
  // },
  {
    name: "Live Classes",
    path: "/liveclasses",
    icon: Tv
  },
  {
    name: "Chat",
    path: "/chatsystem",
    icon: MessageCircle
  },
  {
    name: "Certificates",
    path: "/certificates",
    icon: Award
  },
  {
    name: "Review",
    path: "/review",
    icon: Star,
    fill: "currentColor"
  },
  // {
  //   name: "Analytics",
  //   path: "/analytics",
  //   icon: BarChart3
  // },
  // {
  //   name: "Leaderboard",
  //   path: "/leaderboard",
  //   icon: Trophy
  // },
  {
    name: "Resume",
    path: "/resume",
    icon: BsFileEarmarkPersonFill,
    fill: "currentColor"
  }
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, setActive, active }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMobileOpen(prev => !prev);
    window.addEventListener('toggle-mobile-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-mobile-sidebar', handleToggle);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-[70] ${isCollapsed && !mobileOpen ? 'w-20' : 'w-64'} bg-white transition-all duration-300 ease-in-out flex flex-col h-screen lg:h-[calc(100vh-32px)] lg:m-4 lg:rounded-[24px] lg:sticky lg:top-4 lg:self-start lg:border-none lg:shadow-[0px_8px_24px_rgba(149,157,165,0.1)] border-r border-gray-100 shadow-2xl lg:translate-x-0 shrink-0`}
      >
        {/* Logo and Mobile Close Button */}
        <div className={`relative flex items-center ${isCollapsed && !mobileOpen ? 'flex-col justify-center py-3 min-h-[80px] gap-2' : 'justify-center h-20 px-6'} border-b border-gray-50 lg:border-none mt-2 transition-all duration-300`}>
          {!(isCollapsed && !mobileOpen) ? (
            <img src={techlogo} alt="LauraTek" className="h-12 object-contain" />
          ) : (
            <>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 text-[#64748B] hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <ChevronsRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <img src={techlogo} alt="LauraTek" className="h-6 object-contain hidden lg:block" />
            </>
          )}
          
          {!(isCollapsed && !mobileOpen) && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute right-4 hidden lg:flex p-2 text-[#64748B] hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ChevronsLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          <button 
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronsLeft className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pt-2 pb-4 scrollbar-hidden">
          <div className="flex flex-col gap-1">
            {sidebarItems.map((item) => {
              const isFromDashboard = location.state && (location.state as any).from === 'dashboard';
              const isActive = 
                location.pathname === item.path ||
                (item.name === "Dashboard" && isFromDashboard && (
                  location.pathname.startsWith("/course1/") ||
                  location.pathname.startsWith("/materials/") ||
                  location.pathname.startsWith("/course/") ||
                  location.pathname.startsWith("/dashboard/course1/") ||
                  location.pathname.startsWith("/dashboard/materials/") ||
                  location.pathname.startsWith("/dashboard/course/") ||
                  location.pathname.startsWith("/quiz/")
                )) ||
                (item.name === "My Courses" && (
                  location.pathname === "/mycourses" ||
                  location.pathname === "/dashboard/mycourses" ||
                  location.pathname === "/dashboard/courses" ||
                  (!isFromDashboard && (
                    location.pathname.startsWith("/course1/") ||
                    location.pathname.startsWith("/materials/") ||
                    location.pathname.startsWith("/course/") ||
                    location.pathname.startsWith("/dashboard/course1/") ||
                    location.pathname.startsWith("/dashboard/materials/") ||
                    location.pathname.startsWith("/dashboard/course/") ||
                    (location.pathname.startsWith("/quiz/") && location.state && ((location.state as any).from === 'course' || (location.state as any).from === 'mycourses'))
                  ))
                )) ||
                (item.name === "Assessments" && (
                  location.pathname === "/assessments" ||
                  location.pathname === "/dashboard/assessments" ||
                  location.pathname.startsWith("/assessments/") ||
                  (location.pathname.startsWith("/quiz/") && (!location.state || ((location.state as any).from !== 'dashboard' && (location.state as any).from !== 'course' && (location.state as any).from !== 'mycourses')))
                )) ||
                (item.name === "Results" && (
                  location.pathname === "/results" ||
                  location.pathname === "/dashboard/results"
                )) ||
                (item.name === "Playground" && (
                  location.pathname === "/exams" ||
                  location.pathname === "/dashboard/exams" ||
                  location.pathname.startsWith("/dashboard/compiler") ||
                  location.pathname.startsWith("/compiler")
                ));
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative w-full flex items-center ${isCollapsed && !mobileOpen ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? "bg-[#F4F2FF] text-[#5B4FFF]" 
                      : "text-[#64748B] hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#5B4FFF] rounded-r-md"></div>
                  )}
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} fill={isActive ? "#5B4FFF" : (item.fill || "none")} className={`${isActive ? "text-[#5B4FFF]" : "text-[#64748B]"} flex-shrink-0`} />
                  {(!isCollapsed || mobileOpen) && (
                    <span className={`font-inter text-[18.89px] leading-[26.99px] tracking-[-0.2px] font-medium whitespace-nowrap`}>
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavigation("/profile-settings")}
              className={`relative w-full flex items-center ${isCollapsed && !mobileOpen ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl transition-all cursor-pointer ${
                location.pathname === "/profile-settings" || location.pathname === "/dashboard/profile"
                  ? "bg-[#F4F2FF] text-[#5B4FFF]" 
                  : "text-[#64748B] hover:bg-slate-50"
              }`}
            >
              {(location.pathname === "/profile-settings" || location.pathname === "/dashboard/profile") && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#5B4FFF] rounded-r-md"></div>
              )}
              <User size={20} strokeWidth={location.pathname === "/profile-settings" || location.pathname === "/dashboard/profile" ? 2 : 1.5} className={`${location.pathname === "/profile-settings" || location.pathname === "/dashboard/profile" ? "text-[#5B4FFF]" : "text-[#64748B]"} flex-shrink-0`} />
              {(!isCollapsed || mobileOpen) && (
                <span className={`font-inter text-[18.89px] leading-[26.99px] tracking-[-0.2px] font-medium whitespace-nowrap`}>
                  Profile
                </span>
              )}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("token");
                handleNavigation("/");
              }}
              className={`w-full flex items-center ${isCollapsed && !mobileOpen ? 'justify-center' : 'justify-start gap-3 px-4'} py-3 rounded-xl transition-all text-[#64748B] hover:bg-slate-50 cursor-pointer`}
            >
              <LogOut size={20} strokeWidth={1.5} className="flex-shrink-0" />
              {(!isCollapsed || mobileOpen) && <span className="font-inter font-medium text-[18.89px] leading-[26.99px] tracking-[-0.2px] whitespace-nowrap">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
