import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, User, Bell, Search } from "lucide-react";
import api from "../api/instance";
import { cn } from "../lib/utils";

interface GuestHeaderProps {
  setSidebarOpen: (val: boolean) => void;
  isCollapsed: boolean;
}

const GuestHeader = ({ setSidebarOpen, isCollapsed }: GuestHeaderProps) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const storedName = localStorage.getItem("user_name") || "vamshi";
  const [userName, setUserName] = useState(storedName);
  const initialInitials = storedName !== "vamshi" ? storedName.substring(0, 2).toUpperCase() : "VA";
  const [initials, setInitials] = useState(initialInitials);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const searchItems = [
    { name: "Attendance", path: "/guest/attendance" },
    { name: "Certificates", path: "/guest/certificates" },
    { name: "Compiler", path: "/guest/compiler" },
    { name: "Courses", path: "/guest/courses" },
    { name: "Dashboard", path: "/guest" },
    { name: "Profile", path: "/guest/profile" },
    { name: "Quizzes", path: "/guest/quizzes" },
  ];

  const filteredItems = searchQuery
    ? searchItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any numbers from the input
    const newValue = e.target.value.replace(/[0-9]/g, '');
    setSearchQuery(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredItems.length > 0) {
      const exactMatch = filteredItems.find(item => item.name.toLowerCase() === searchQuery.toLowerCase());
      const targetItem = exactMatch || filteredItems[0];
      handleSearchResultClick(targetItem);
    }
  };

  const handleSearchResultClick = (item: { name: string, path: string }) => {
    setSearchQuery(item.name);
    navigate(item.path);
    setIsSearchFocused(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/guest/my-profile');
        if (response.data && response.data.name) {
          const name = response.data.name;
          setUserName(name);
          localStorage.setItem("user_name", name);
          // Generate initials from name (e.g. "Arjun Sharma" -> "AS", "Vamshi" -> "V")
          const nameParts = name.trim().split(" ");
          if (nameParts.length >= 2) {
            setInitials((nameParts[0][0] + nameParts[1][0]).toUpperCase());
          } else if (nameParts.length === 1 && nameParts[0].length >= 1) {
            setInitials(nameParts[0].substring(0, 2).toUpperCase());
          }
        }
      } catch (err) {
        console.error("Error fetching header profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 sm:h-20 bg-[#F8F9FB]/95 backdrop-blur-md border-b border-[#ECEEF2]/40 transition-all duration-300",
        isCollapsed ? "left-0 lg:left-[96px]" : "left-0 lg:left-[288px]"
      )}
    >
      <div className="flex items-center px-4 lg:px-8 h-16 sm:h-20 w-full">
        {/* Hamburger Menu */}
        <div className="flex items-center lg:hidden shrink-0 mr-3 sm:mr-6">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-800 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-[220px] sm:max-w-[320px] lg:max-w-[440px]">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#5B4FFF]/60" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 sm:py-2.5 bg-white border-none rounded-full shadow-[0px_2px_12px_rgba(149,157,165,0.06)] text-[13px] md:text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5B4FFF]/20 transition-all"
            />
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                {filteredItems.length > 0 ? (
                  <ul className="py-1">
                    {filteredItems.map((item) => (
                      <li key={item.name}>
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSearchResultClick(item);
                          }}
                          className="w-full text-left px-4 py-2.5 text-[14px] text-gray-700 hover:bg-[#F4F2FF] hover:text-[#5B4FFF] transition-colors"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-[14px] text-gray-500 text-center">
                    No matching pages found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center shrink-0 ml-auto pl-3 sm:pl-6">
          {/* Notification Bell */}
          {/* <button className="relative p-2 text-gray-400 hover:text-[#5B4FFF] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-[15px] h-[15px] bg-[#5B4FFF] border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
              3
            </span>
          </button> */}

          {/* Profile Section */}
          <div className="relative flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[14px] font-bold text-gray-800">{userName}</span>
              <span className="text-[12px] font-medium text-gray-500">Guest Access</span>
            </div>
            <div 
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#5B4FFF] flex items-center justify-center cursor-pointer hover:bg-[#4a3fdb] transition-colors text-white font-bold text-[13px] sm:text-sm shadow-sm"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              {initials}
            </div>
            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                <div className="py-1">
                  <button onClick={() => { setIsProfileDropdownOpen(false); navigate("/guest/profile"); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4 mr-3" /> Profile
                  </button>
                  <button onClick={handleSignOut} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-3" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestHeader;
