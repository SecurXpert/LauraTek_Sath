import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, User, LogOut, Settings, Menu } from "lucide-react"; // Added Menu icon
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "@/api/instance";
import { VITE_API_URL } from "@/services/api/api";

interface ProfileheaderProps {
  onMenuClick?: () => void;
}

let cachedUserToken: string | null = null;
let profileFetchPromise: Promise<void> | null = null;

const globalSearchOptions = [
  { title: "Dashboard Overview", path: "/dashboard" },
  { title: "My Courses", path: "/mycourses" },
  { title: "Calendar", path: "/calendar" },
  { title: "Attendance", path: "/attendance" },
  { title: "Playground / Compiler", path: "/exams" },
  { title: "Assessments & Grades", path: "/assessments" },
  { title: "Certificates", path: "/certificates" },
  { title: "Resume Builder", path: "/resume" },
  { title: "Live Classes", path: "/liveclasses" },
  { title: "Chat / Messages", path: "/chatsystem" },
  { title: "Profile", path: "/profile-settings" },
  { title: "Review", path: "/review" },
];

const Profileheader = ({ onMenuClick }: ProfileheaderProps) => { // Added onMenuClick prop
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({
    name: localStorage.getItem("user_name") || "",
    role: localStorage.getItem("user_role") || "",
    profilePicture: localStorage.getItem("user_profile_pic") || null,
  });
  const logoRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");
        if (!token) return;
        
        if (cachedUserToken === token) {
          // If we already fetched for this token successfully, we are good.
          return;
        }

        if (profileFetchPromise) {
          // If a request is already in flight, wait for it
          await profileFetchPromise;
          setUserData({
            name: localStorage.getItem("user_name") || "",
            role: localStorage.getItem("user_role") || "",
            profilePicture: localStorage.getItem("user_profile_pic") || null,
          });
          return;
        }

        const BASE_URL = VITE_API_URL;

        profileFetchPromise = (async () => {
          try {
            let res = await fetch(`${BASE_URL}/student/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            let isGuest = false;
            if (!res.ok) {
              res = await fetch(`${BASE_URL}/guest/my-profile`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              isGuest = true;
            }

            if (res.ok) {
              cachedUserToken = token;
              const data = await res.json();
              const newName = data.name || "";
              const newRole = data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : (isGuest ? "Guest" : "Student");
              const newPic = data.profile_picture || null;
              
              setUserData({
                name: newName,
                role: newRole,
                profilePicture: newPic,
              });
              
              if (newName) localStorage.setItem("user_name", newName);
              if (newRole) localStorage.setItem("user_role", newRole);
              if (newPic) localStorage.setItem("user_profile_pic", newPic);
              
              window.dispatchEvent(new Event("user-name-updated"));
            } else if (res.status === 401) {
              localStorage.removeItem("access_token");
              localStorage.removeItem("token");
              window.location.href = "/login";
            }
          } catch (e) {
            profileFetchPromise = null; // Reset so we can retry on failure
            throw e;
          }
        })();

        await profileFetchPromise;
      } catch (err) {
        console.error("Failed to fetch user profile in header:", err);
      }
    };

    fetchUserData();

    const handleStorageChange = () => {
      fetchUserData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getInitials = (name) => {
    if (!name || name === "Student") return "S";
    return name.charAt(0).toUpperCase();
  };


  useEffect(() => {
    // Animate company logo on mount: subtle glow and slide-in
    if (logoRef.current) {
      logoRef.current.style.opacity = '0';
      logoRef.current.style.transform = 'translateY(-10px) scale(0.95)';
      requestAnimationFrame(() => {
        logoRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        logoRef.current.style.opacity = '1';
        logoRef.current.style.transform = 'translateY(0) scale(1)';
      });
    }
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      const match = globalSearchOptions.find(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (match) {
        navigate(match.path, match.scrollTo ? { state: { scrollTo: match.scrollTo } } : undefined);
        setSearchQuery("");
      }
    }
  };

  return (
    <header className="bg-transparent min-h-[64px] flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-50 w-full lg:mt-4">
      {/* Left Section: Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => {
            if (onMenuClick) onMenuClick();
            window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
          }}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={searchRef}
              type="text"
              placeholder="Search courses, assessments, or resources..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow alphabets and spaces, no numbers
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setSearchQuery(value);
                }
              }}
              className="pl-10 pr-4 w-full bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all duration-200"
            />
          </div>
          {/* Scrollable Search Suggestions Dropdown */}
          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-20 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* Global search results */}
              {globalSearchOptions.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).sort((a, b) => a.title.localeCompare(b.title)).map((suggestion) => (
                <button
                  key={suggestion.title}
                  type="button"
                  onClick={() => {
                    navigate(suggestion.path, suggestion.scrollTo ? { state: { scrollTo: suggestion.scrollTo } } : undefined);
                    setSearchQuery("");
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <Search className="w-3 h-3 text-gray-400" />
                  {suggestion.title}
                </button>
              ))}
              {searchQuery && !globalSearchOptions.some(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              ) && (
                <div className="px-4 py-2 text-sm text-gray-500 italic">No results found</div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Right Section: User Menu */}
      <div className="flex items-center gap-4 relative z-10 shrink-0">

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 px-2 hover:bg-transparent transition-all duration-300">
              <div className="hidden md:flex flex-col items-end min-w-0 mr-2">
                <span className="font-semibold text-sm text-gray-900 truncate max-w-32">{userData.name || "\u00A0"}</span>
                <span className="text-xs text-gray-500 truncate max-w-32">{userData.role || "\u00A0"}</span>
              </div>
              <Avatar className="h-9 w-9 ring-2 ring-gray-100 ring-offset-2">
                {userData.profilePicture ? (
                  <AvatarImage src={userData.profilePicture} alt={userData.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-[#6A5AE0] to-[#5B4FFF] text-white font-semibold text-sm shadow-sm">{getInitials(userData.name)}</AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => navigate("/profile-settings")} onClick={() => navigate("/profile-settings")} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => navigate("/settings")} className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("token");
              localStorage.removeItem("user_name");
              localStorage.removeItem("user_role");
              localStorage.removeItem("user_profile_pic");
              navigate("/");
            }}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-th::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </header>
  );
};

export default Profileheader;






































































