import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Search, User, LogOut, Settings } from "lucide-react"; // Assuming Lucide icons for better consistency
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Profileheader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const logoRef = useRef(null);
  const searchRef = useRef(null);

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

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  // Mock notifications for demo - in real app, fetch from API
  const notifications = [
    { id: 1, title: "New course enrolled", time: "2 min ago", type: "success" },
    { id: 2, title: "Assignment due soon", time: "1 hour ago", type: "warning" },
    { id: 3, title: "Interview scheduled", time: "Yesterday", type: "info" },
    { id: 4, title: "Grade updated", time: "2 days ago", type: "success" },
    { id: 5, title: "System maintenance", time: "3 days ago", type: "warning" },
  ];

  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-white border-b border-gray-200/50 shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 relative overflow-hidden">
      {/* Animated Company Logo - Left Section */}
      <div className="flex items-center gap-4 relative z-10">
        <div 
          ref={logoRef}
          className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300 group"
          onClick={() => navigate('/dashboard')}
        >
          Laural
          <span className="ml-1 text-xs text-blue-500 group-hover:translate-x-1 transition-transform duration-300">✨</span>
        </div>
        <span className="text-xs text-gray-500 hidden md:block bg-gray-100 px-2 py-1 rounded-full">
          Powered by{" "}
          <span className="text-blue-700 font-semibold">SecurXpert</span>
        </span>
      </div>

      {/* Scrollable Search Bar - Center Section with individual scroll for suggestions */}
      <div className="flex items-center gap-4 flex-1 justify-center max-w-md relative">
        <form onSubmit={handleSearch} className="w-full relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={searchRef}
              type="text"
              placeholder="Search courses, assessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
            />
          </div>
          {/* Scrollable Search Suggestions Dropdown */}
          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-20 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* Mock suggestions - replace with real API */}
              {["Dashboard", "My Courses", "Compiler", "Mock Interviews"].filter(item => 
                item.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    navigate(`/dashboard/${suggestion.toLowerCase().replace(/\s+/g, '-')}`);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <Search className="w-3 h-3 text-gray-400" />
                  {suggestion}
                </button>
              ))}
              {searchQuery && !["Dashboard", "My Courses", "Compiler", "Mock Interviews"].some(item => 
                item.toLowerCase().includes(searchQuery.toLowerCase())
              ) && (
                <div className="px-4 py-2 text-sm text-gray-500 italic">No results found</div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Right Section: Notifications (Scrollable Dropdown) + User Menu */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Animated Notifications Bell with Scrollable Dropdown */}
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" align="end">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-sm text-gray-900">Notifications</h3>
              <p className="text-xs text-gray-500">{notifications.length} new</p>
            </div>
            <div className="py-2">
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 w-full text-sm cursor-pointer hover:bg-blue-50 border-b border-gray-50 last:border-b-0">
                  <span className={`font-medium ${notif.type === 'success' ? 'text-green-600' : notif.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {notif.title}
                  </span>
                  <span className="text-xs text-gray-500">{notif.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
            {notifications.length === 0 && (
              <DropdownMenuItem disabled className="text-center text-gray-500 py-8">
                No notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 px-2 hover:bg-gray-100 transition-all duration-300">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="shailu" />
                <AvatarFallback className="bg-blue-100 text-blue-700">ND</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start min-w-0">
                <span className="font-medium text-sm truncate max-w-32">shailu</span>
                <span className="text-xs text-gray-500 truncate max-w-32">shailu@gmail.com</span>
              </div>
              <span className="hidden md:block ml-1">▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/profile")} className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
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