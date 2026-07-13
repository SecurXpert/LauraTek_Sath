import React, { useState, useRef, useEffect } from "react";
import { FaClock, FaPlus, FaUser, FaBookOpen, FaCalendarAlt, FaIdCard, FaLink, FaTrash, FaCopy } from "react-icons/fa";
import { FaRegMessage, FaFilter } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCalendar, IoTrendingUp } from "react-icons/io5";
import { FiClock, FiRefreshCw, FiSearch } from "react-icons/fi";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Menu, X, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import LiveClassCard from "@/components/ui/live-classes/LiveClassCard";
import LiveClassSkeleton from "@/components/ui/live-classes/LiveClassSkeleton";
import { VITE_API_URL } from "@/services/api/api";
const LiveClasses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Live Classes");
  const [activeTab, setActiveTab] = useState<"live" | "record">("live");
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("most_recent");

  const sortedSessions = [...liveSessions].sort((a, b) => {
    const dateA = new Date(a.scheduled_at).getTime();
    const dateB = new Date(b.scheduled_at).getTime();
    if (sortBy === "most_recent") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const handleCopyLink = (id: number, link: string) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Handle search input - only alphabets allowed
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow alphabets and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSearchQuery(value);
    }
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  // ============================
  // FETCH LIVE CLASSES API
  // ============================
  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        setLoadingLive(true);

        const token = localStorage.getItem("access_token");

        const res = await fetch(
          `${VITE_API_URL}/dashboard/upcoming-live-classes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setLiveSessions(data);
      } catch (error) {
        console.error("Error fetching live classes:", error);
      } finally {
        setLoadingLive(false);
      }
    };

    fetchLiveClasses();
  }, []);

  // Sidebar click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex w-full h-screen bg-[#f7fafd] overflow-hidden">

      {/* Sidebar */}
      <div ref={sidebarRef} className="flex-shrink-0">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <div className="z-50 w-full min-w-0">
          <Profileheader />
        </div>

        {/* Page Header */}
        <div className="mx-6 mt-6">
          <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828]">Live Classes Management</h1>
          <p className="text-gray-500 text-sm mt-1">manage your upcoming live sessions</p>
        </div>
      {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="mx-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-700">{sortedSessions.length}</span> of <span className="font-bold text-gray-700">{liveSessions.length}</span> live classes
              </span>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-4 pr-10 w-[177px] h-[40px] border border-[#E5E7EB] rounded-[13.49px] bg-[#FFFFFF] text-gray-700 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="most_recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {loadingLive && (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <LiveClassSkeleton key={i} />
                ))}
              </div>
            )}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {activeTab === "live" &&
                sortedSessions.map((item) => {
                  const scheduledDate = new Date(item.scheduled_at);

                  return (
                    <LiveClassCard
                      key={item.id}
                      item={item}
                      copiedId={copiedId}
                      handleCopyLink={handleCopyLink}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;
