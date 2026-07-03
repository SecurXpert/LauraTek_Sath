import React from "react";
import { Link, useNavigate } from "react-router-dom";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import online from "@/assets/online1.png";
import landing from "@/assets/landing.png";
import landing2 from "@/assets/landing2.png";
import python from "@/assets/python2.jpg";
import react from "@/assets/react2.jpg";
import cloud from "@/assets/cloud2.jpg";
import mock1 from "@/assets/mock1.png";
import live from "@/assets/live class.png";
import discussion from "@/assets/discussion room.png";
import resume from "@/assets/resume.png";
import guest14Img from "@/assets/guest14.png";
import guest12Img from "@/assets/guest12.png";
import techLogo from "@/assets/techlogo.png";
import { ChevronDown, ChevronUp } from 'lucide-react';
import line1 from "@/assets/line1.png";


const TopCategorySection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Top Category Section */}
        <section className="py-10 md:py-16 lg:py-20 bg-[#FDFDFD]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] max-w-[1650px]">
            {/* Header row */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              {/* Left side */}
              <div className="relative w-full md:w-1/2">
                {/* Decorative Confetti */}
                <div className="absolute -top-10 left-28 md:left-32 text-[#9333EA] opacity-80">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 3v3m4-1l-2 2M7 5l2 2m-5 5h3m10 0h3" />
                  </svg>
                </div>
                
                <div className="inline-block bg-[#A800B8] text-white px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4 shadow-sm">
                  Top Categories
                </div>
                <h2 className="font-dm-sans text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#050816] leading-[1.2]">
                  Find the Right <span style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Path</span><br />
                  <span style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Your</span> Career Goals
                </h2>
              </div>

              {/* Right side */}
              <div className="w-full md:w-1/2 flex flex-col md:items-start md:justify-center mt-6 md:mt-0 md:pl-20 xl:pl-40">
                <p className="text-gray-500 text-sm md:text-[15px] max-w-sm text-left leading-relaxed mb-4">
                  Whether you're starting out or leveling up, pick a category that matches the skill you want to build next.
                </p>
                <button 
                  className="text-white pl-5 pr-1.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-3 text-[14px]"
                  style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                >
                  Browse More
                  <span className="bg-white/20 rounded-full p-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* 1. Mobile Application */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#FFFBEB] hover:shadow-md transition-shadow cursor-pointer border border-[#FEF3C7]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#FEF3C7] text-[#F59E0B]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Mobile Application</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">45 Courses</p>
                </div>
              </div>

              {/* 2. Video & Photography */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#FDF2F8] hover:shadow-md transition-shadow cursor-pointer border border-[#FCE7F3]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#FCE7F3] text-[#EC4899]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Video & Photography</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">25 Courses</p>
                </div>
              </div>

              {/* 3. Data Science */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#EEF2FF] hover:shadow-md transition-shadow cursor-pointer border border-[#E0E7FF]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#E0E7FF] text-[#6366F1]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Data Science</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">40 Courses</p>
                </div>
              </div>

              {/* 4. Marketing Analysis */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#FFF1F2] hover:shadow-md transition-shadow cursor-pointer border border-[#FFE4E6]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#FFE4E6] text-[#F43F5E]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Marketing Analysis</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">20 Courses</p>
                </div>
              </div>

              {/* 5. Business Studies */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#EEF2FF] hover:shadow-md transition-shadow cursor-pointer border border-[#E0E7FF]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#E0E7FF] text-[#6366F1]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Business Studies</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">60 Courses</p>
                </div>
              </div>

              {/* 6. Mobile Application (2nd) */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#FFFBEB] hover:shadow-md transition-shadow cursor-pointer border border-[#FEF3C7]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#FEF3C7] text-[#F59E0B]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Mobile Application</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">30 Courses</p>
                </div>
              </div>

              {/* 7. Computer Science */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#FFF1F2] hover:shadow-md transition-shadow cursor-pointer border border-[#FFE4E6]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#FFE4E6] text-[#F43F5E]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Computer Science</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">35 Courses</p>
                </div>
              </div>

              {/* 8. Health & Fitness */}
              <div className="flex items-center gap-4 p-5 rounded-[12px] bg-[#F5F3FF] hover:shadow-md transition-shadow cursor-pointer border border-[#EDE9FE]/50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#EDE9FE] text-[#8B5CF6]">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-[15px]">Health & Fitness</h3>
                  <p className="text-[#6B7280] text-[13px] font-medium mt-0.5">50 Courses</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        
    </>
  );
};

export default TopCategorySection;
