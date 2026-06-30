import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Play, ArrowLeft } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import liveClassImg from "@/assets/live class.png";
 
// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
 
interface RecordedVideo {
  id: number;
  title: string;
  tutor?: string;
  experience?: string;
  date: string;           // ISO string e.g. "2026-01-06T00:00:00"
  url?: string;           // Some APIs return 'url'
  urll?: string;          // Some APIs return 'urll'
  course_id?: number;
}
 
// ────────────────────────────────────────────────
// Constants & Helpers
// ────────────────────────────────────────────────
 
const API_URL = `${import.meta.env.VITE_API_URL}/dashboard/recorded-classes`;
 
const formatDate = (isoString: string): string => {
  if (!isoString) return "Date not available";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
 
// Temporary mapping until backend returns tutor & experience
const tutorMap: Record<string, { tutor: string; experience: string }> = {
  JavaScript: { tutor: "Sneha P", experience: "8+ years" },
  Java: { tutor: "Rohan S", experience: "6 years" },
  "UI/UX": { tutor: "Vikram P", experience: "4 years" },
  hms: { tutor: "Unknown Tutor", experience: "N/A" },
  hhms: { tutor: "Unknown Tutor", experience: "N/A" },
  // Add more titles as they appear
};
 
// Helper to get token from localStorage
const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token") || localStorage.getItem("token") || null;
};
 
// ────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────
 
const Recording = () => {
  const navigate = useNavigate();
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Recording");
  const [videos, setVideos] = useState<RecordedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const sidebarRef = useRef<HTMLDivElement>(null);
 
  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);
 
  // Fetch recorded classes
  useEffect(() => {
    const fetchRecordedClasses = async () => {
      const token = getAccessToken();
 
      if (!token) {
        setError("Please log in to view recorded sessions");
        setLoading(false);
        return;
      }
 
      try {
        setLoading(true);
        setError(null);
 
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
 
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token");
            setError("Session expired. Please log in again.");
            setTimeout(() => navigate("/login"), 1800); // redirect to home/login
            return;
          }
          throw new Error(`Server responded with status ${response.status}`);
        }
 
        const data = await response.json();
        
        // Handle both direct array and wrapped response
        const videosArray = Array.isArray(data) ? data : (data.data || []);
        
        console.log("Fetched recorded classes:", videosArray.length, videosArray);
        
        // Create new array reference for React state (immutable update)
        const sorted = [...videosArray].sort((a: any, b: any) => {
          const dateA = new Date(a.date || 0).getTime();
          const dateB = new Date(b.date || 0).getTime();
          return dateB - dateA;
        });
        
        console.log("Setting videos state:", sorted.length);
        setVideos(sorted);
      } catch (err: any) {
        setError(err.message || "Failed to load recorded sessions");
      } finally {
        setLoading(false);
      }
    };
 
    fetchRecordedClasses();
  }, [navigate]);
 
  return (
    <div className="flex w-full h-screen bg-[#f7fafd] overflow-hidden">
      {/* Sidebar */}
      <div ref={sidebarRef} className="flex-shrink-0">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setActive={setActive}
          active={active}
        />
      </div>
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Header */}
        <div className="z-50 w-full min-w-0">
          <Profileheader />
        </div>
 
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto mx-3 sm:mx-4 lg:mx-6 mt-4 p-6 relative">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <h2 className="font-bold text-2xl mb-8 text-blue-700">
            Recorded Sessions
          </h2>
 
          {loading && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-50 rounded-xl overflow-hidden flex flex-col h-full border border-gray-100">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 flex flex-col items-center flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-32 rounded-lg mt-auto" />
                  </div>
                </div>
              ))}
            </div>
          )}
 
          {error && (
            <div className="text-center py-12 text-red-600 text-lg font-medium">
              {error}
            </div>
          )}
 
          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-12 text-gray-600 text-lg">
              No recorded sessions available at the moment.
            </div>
          )}
 
          {!loading && !error && videos.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video) => {
                const tutorInfo = tutorMap[video.title] || {
                  tutor: "TBD",
                  experience: "N/A",
                };
 
                const videoUrl = (video.url || video.urll || '').startsWith("http")
                  ? (video.url || video.urll)
                  : `${import.meta.env.VITE_API_URL}/${video.url || video.urll}`;
 
                return (
                  <div
                    key={video.id}
                    className="group relative bg-gray-50 rounded-xl shadow hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                  >
                    {/* Video Preview Area */}
                    <div className="relative h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src={liveClassImg} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      <Play className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-10" />
                    </div>
 
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 text-center">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                     
                      <p className="text-sm text-gray-500 mt-1.5 mb-4">
                        Date: {formatDate(video.date)}
                      </p>
 
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto mx-auto block bg-gradient-to-r from-[#2563EB] to-[#9333EA] hover:from-[#1D4ED8] hover:to-[#7C22D4] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md mt-5"
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Recording;
 
