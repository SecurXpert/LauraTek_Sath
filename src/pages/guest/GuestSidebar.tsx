import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  HelpCircle,
  Code,
  Award,
  User,
  LogOut
} from "lucide-react";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import logo from "@/assets/techlogo.png";
import { Button } from "@/components/ui/button";

const CustomQuizIcon = ({ className, fill }: { className?: string, fill?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="7" y="3" width="14" height="14" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    <text x="14" y="13.5" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
  </svg>
);

const guestMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/guest" },
  { icon: BookOpen, label: "Courses", path: "/guest/courses" },
  { icon: ClipboardCheck, label: "Attendance", path: "/guest/attendance" },
  { icon: CustomQuizIcon, label: "Quizzes", path: "/guest/quizzes" },
  { icon: Code, label: "Compiler", path: "/guest/compiler" },
  { icon: Award, label: "Certificates", path: "/guest/certificates" },
  { icon: User, label: "Profile", path: "/guest/profile" },
  { icon: LogOut, label: "Logout", path: "#logout" },
];

interface GuestSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const GuestSidebar = ({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed }: GuestSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(localStorage.getItem("user_name") || "Guest User");

  useEffect(() => {
    const checkName = () => {
      const storedName = localStorage.getItem("user_name");
      if (storedName && storedName !== userName) {
        setUserName(storedName);
      }
    };
    
    // Check initially
    checkName();
    
    // Set up an interval to check for changes since localStorage events 
    // only fire across different tabs, not in the same tab.
    const interval = setInterval(checkName, 1000);
    
    return () => clearInterval(interval);
  }, [userName]);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    navigate("/", { replace: true });
  };

  const isActive = (path: string) => {
    if (path === "#logout") return false;
    let currentPath = location.pathname;
    
    if (path === "/guest") {
      return currentPath === "/guest" || currentPath === "/guest/";
    }
    if (path === "/guest/courses") {
       return currentPath.startsWith("/guest/course");
    }
    if (path === "/guest/quizzes") {
       return currentPath.startsWith("/guest/quiz");
    }

    return currentPath.toLowerCase().startsWith(path.toLowerCase());
  };

  const collapsedState = !sidebarOpen && isCollapsed;

  const onToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // If the mobile/tablet drawer is currently open, always close it first
    if (sidebarOpen) {
      setSidebarOpen(false);
      return;
    }

    // Otherwise, toggle based on screen size
    if (window.innerWidth < 1024) {
      setSidebarOpen(true);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 bg-white shadow-guest transition-all duration-300 ease-in-out flex flex-col select-none border border-gray-100/50",
          "top-4 bottom-4 rounded-[24px]",
          sidebarOpen ? "translate-x-0 w-64 left-4" : (
             isCollapsed 
             ? "-translate-x-full lg:translate-x-0 lg:w-16 left-0 lg:left-4"
             : "-translate-x-full lg:translate-x-0 w-64 left-0 lg:left-4"
          )
        )}
      >
        <div className={cn(
          "pt-6 pb-4 flex items-center justify-between px-4 relative transition-all duration-300",
          collapsedState && "flex-col gap-4 px-2 justify-center"
        )}>
          {collapsedState ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-gray-600 hover:bg-gray-100 h-10 w-10 flex items-center justify-center rounded-lg"
                aria-label="Expand Sidebar"
              >
                <MdKeyboardDoubleArrowRight className="w-8 h-8 text-gray-700" />
              </Button>
              <img
                src={logo}
                alt="Lauratek Small Logo"
                className="w-10 h-10 object-contain transition-all duration-300 animate-in fade-in zoom-in duration-300"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full relative">
              <img
                src={logo}
                alt="Lauratek Logo"
                className="h-10 object-contain transition-all duration-300 animate-in fade-in duration-300"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-gray-600 hover:bg-gray-100 h-8 w-8 flex items-center justify-center rounded-lg absolute right-0"
                aria-label="Collapse Sidebar"
              >
                <MdKeyboardDoubleArrowLeft className="w-6 h-6 text-gray-700" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide mt-1">


          <nav className="flex flex-col space-y-0.5 py-1">
            {guestMenuItems.map((item) => {
              const Icon = item.icon;
              const isLogout = item.path === "#logout";

              if (isLogout) {
                return (
                  <button
                    key={item.path}
                    onClick={handleSignOut}
                    title={collapsedState ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-2.5 mx-3 my-0.5 text-[16px] transition-all duration-200 text-[#64748B] hover:bg-gray-50/80 hover:text-gray-900 font-medium rounded-xl text-left w-auto mt-4",
                      collapsedState ? "lg:justify-center lg:mx-1.5 lg:px-0" : ""
                    )}
                  >
                    <Icon className="w-[18px] h-[18px] flex-shrink-0 stroke-[1.75] text-gray-400" />
                    {!collapsedState && <span>{item.label}</span>}
                  </button>
                );
              }

              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={collapsedState ? item.label : undefined}
                  onClick={() => {
                     if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-2.5 mx-3 my-0.5 text-[16px] transition-all duration-200 relative rounded-xl",
                    active
                      ? "text-[#5D3EFC] font-semibold"
                      : "text-[#64748B] hover:bg-gray-50/80 hover:text-gray-900 font-medium",
                    collapsedState && "lg:justify-center lg:mx-1.5 lg:px-0"
                  )}
                  style={active ? { background: 'linear-gradient(90deg, #F0F6FF 0%, #FAF5FF 100%)' } : {}}
                >
                  {active && !collapsedState && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#5D3EFC] rounded-full" />
                  )}

                  <Icon
                    className={cn(
                      "w-[18px] h-[18px] flex-shrink-0 stroke-[1.75]",
                      active ? "text-[#5D3EFC]" : "text-gray-400"
                    )}
                    fill={active ? "currentColor" : "none"}
                  />

                  {!collapsedState && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default GuestSidebar;
