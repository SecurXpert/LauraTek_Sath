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


const PopularCoursesSection = ({ activeCourseTab, setActiveCourseTab }: any) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Popular Courses Section */}
        <section id="courses" className="py-20 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px]">
            {/* Header row */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              {/* Left side */}
              <div className="relative w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm relative">
                  Popular Courses
                  {/* Confetti decoration */}
                  <div className="absolute -top-10 -right-8 text-[#A800B8] opacity-80">
                    <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 3v3m4-1l-2 2M7 5l2 2m-5 5h3m10 0h3" />
                    </svg>
                  </div>
                </div>
                <h2 className="font-dm-sans text-[34px] md:text-[42px] lg:text-[48px] font-extrabold text-[#050816] leading-[1.2]">
                  Choose a Course <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>and</span><br />
                  <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start</span> Learning Today
                </h2>
              </div>

              {/* Right side */}
              <div className="w-full md:w-1/2 flex flex-col md:items-end mt-6 md:mt-0">
                <p className="text-gray-500 text-sm md:text-[15px] max-w-xs md:text-right leading-relaxed mb-6">
                  Browse by category, compare course details at a glance, and enroll in minutes.
                </p>
                {/* <button 
                  className="text-white pl-6 pr-2 py-2 rounded-full font-medium transition-all flex items-center gap-3 text-[14px] shadow-lg shadow-purple-200"
                  style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                >
                  Browse More
                  <span className="bg-white/20 rounded-full p-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button> */}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <button className="text-[#9333EA] hover:text-[#7C3AED] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-2 border border-gray-100 rounded-full shadow-sm max-w-full">
                {['All', 'Business', 'Engineering', 'Data Science', 'Architecture', 'Psychology', 'Technology', 'Electricity'].map((tab, index, array) => (
                  <div key={tab} className="contents">
                    <button
                      onClick={() => setActiveCourseTab(tab)}
                      className={`px-5 py-2 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
                        activeCourseTab === tab
                          ? "text-white shadow-md shadow-purple-200/50"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      style={activeCourseTab === tab ? { background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' } : {}}
                    >
                      {tab}
                    </button>
                    {index < array.length - 1 && <div className="w-[1px] h-4 bg-gray-200 mx-1 flex-shrink-0"></div>}
                  </div>
                ))}
              </div>
              <button className="text-[#9333EA] hover:text-[#7C3AED] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              {['All', 'Engineering', 'Technology', 'Data Science'].includes(activeCourseTab) && (
                <div className="bg-[#F4F5F7] rounded-[24px] overflow-hidden group border border-gray-100/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-60 w-full overflow-hidden p-3 pb-0">
                  <img src={python} alt="Python" className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-6 left-6 bg-[#A800B8] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 shadow-md">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8 (2)
                  </div>
                  <div className="absolute bottom-4 right-6 bg-[#A800B8] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-lg z-10 border-2 border-[#F4F5F7]">
                    Development
                  </div>
                </div>
                <div className="p-7 pt-5">
                  <h3 className="font-bold text-[18px] text-gray-900 leading-snug mb-4 line-clamp-2 min-h-[50px]">
                    Advanced Python Programming Techniques
                  </h3>
                  <div className="flex items-center gap-6 text-[13px] text-gray-500 font-medium mb-5">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      12 Lessons
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      175Hours 40 Minutes
                    </div>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center gap-3 mb-5">
                    <img src={trainer1} alt="Instructor" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <span className="text-[13px] text-gray-700 font-medium">By Mahmud In Art & Humanities</span>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-400 font-medium line-through decoration-1">$180.00</span>
                      <span className="text-[18px] text-gray-900 font-extrabold">$170.00</span>
                    </div>
                    <button className="text-[14px] font-bold text-gray-800 hover:text-[#A800B8] flex items-center gap-1 transition-colors group/btn">
                      Enroll Courses
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              )}

              {/* Card 2 */}
              {['All', 'Business', 'Technology', 'Architecture'].includes(activeCourseTab) && (
                <div className="bg-[#F4F5F7] rounded-[24px] overflow-hidden group border border-gray-100/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-60 w-full overflow-hidden p-3 pb-0">
                  <img src={react} alt="React Native" className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-6 left-6 bg-[#A800B8] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 shadow-md">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8 (2)
                  </div>
                  <div className="absolute bottom-4 right-6 bg-[#A800B8] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-lg z-10 border-2 border-[#F4F5F7]">
                    Business
                  </div>
                </div>
                <div className="p-7 pt-5">
                  <h3 className="font-bold text-[18px] text-gray-900 leading-snug mb-4 line-clamp-2 min-h-[50px]">
                    Mobile App Development with React Native
                  </h3>
                  <div className="flex items-center gap-6 text-[13px] text-gray-500 font-medium mb-5">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      14 Lessons
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      175Hours 40 Minutes
                    </div>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center gap-3 mb-5">
                    <img src={trainer2} alt="Instructor" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <span className="text-[13px] text-gray-700 font-medium">By Mahmud In Art & Humanities</span>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-400 font-medium line-through decoration-1">$160.00</span>
                      <span className="text-[18px] text-gray-900 font-extrabold">$145.00</span>
                    </div>
                    <button className="text-[14px] font-bold text-gray-800 hover:text-[#A800B8] flex items-center gap-1 transition-colors group/btn">
                      Enroll Courses
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              )}

              {/* Card 3 */}
              {['All', 'Business', 'Psychology', 'Architecture', 'Data Science', 'Electricity'].includes(activeCourseTab) && (
                <div className="bg-[#F4F5F7] rounded-[24px] overflow-hidden group border border-gray-100/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-60 w-full overflow-hidden p-3 pb-0">
                  <img src={cloud} alt="Finance" className="w-full h-full object-cover rounded-[16px] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-6 left-6 bg-[#A800B8] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 shadow-md">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8 (2)
                  </div>
                  <div className="absolute bottom-4 right-6 bg-[#A800B8] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-lg z-10 border-2 border-[#F4F5F7]">
                    Accounting
                  </div>
                </div>
                <div className="p-7 pt-5">
                  <h3 className="font-bold text-[18px] text-gray-900 leading-snug mb-4 line-clamp-2 min-h-[50px]">
                    Personal Finance: Build Long-Term Financial Security
                  </h3>
                  <div className="flex items-center gap-6 text-[13px] text-gray-500 font-medium mb-5">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      18 Lessons
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      175Hours 40 Minutes
                    </div>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center gap-3 mb-5">
                    <img src={trainer1} alt="Instructor" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <span className="text-[13px] text-gray-700 font-medium">By Mahmud In Art & Humanities</span>
                  </div>
                  <hr className="border-gray-200 mb-5" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-400 font-medium line-through decoration-1">$190.00</span>
                      <span className="text-[18px] text-gray-900 font-extrabold">$175.00</span>
                    </div>
                    <button className="text-[14px] font-bold text-gray-800 hover:text-[#A800B8] flex items-center gap-1 transition-colors group/btn">
                      Enroll Courses
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              )}

            </div>

            {/* Bottom Carousel Controls */}
            <div className="flex items-center justify-between mt-12 max-w-[800px] mx-auto">
              <div className="flex-grow max-w-sm h-[3px] bg-gray-200 rounded-full flex mr-8">
                <div className="w-[30%] h-full bg-[#6D28D9] rounded-full"></div>
              </div>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#6D28D9] hover:text-[#6D28D9] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-[#6D28D9] flex items-center justify-center text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </section>



 
 
        
    </>
  );
};

export default PopularCoursesSection;
