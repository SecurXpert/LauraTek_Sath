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
import guest30 from "@/assets/guest30.png";
import guest36 from "@/assets/guest36.png";
import { ChevronDown, ChevronUp } from 'lucide-react';
import line1 from "@/assets/line1.png";


const AboutUsSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* About Us Section */}
        <section id="about-us" className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-r from-[#F4F4FD] via-[#FDFDFD] to-[#FCF4F7]">
          {/* Background decorations */}
          {/* Top left star */}
          <div className="absolute top-[10%] left-[5%] text-[#D8B4FE] opacity-60">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5L12 0z" />
            </svg>
          </div>
          {/* Bottom left arrow */}
          <div className="absolute bottom-[15%] left-[8%] text-[#D8B4FE] opacity-60">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          {/* Top right globe/cap */}
          <div className="absolute top-[12%] right-[5%] w-[60px] h-[60px] opacity-80">
            <img src={guest30} alt="Globe icon" className="w-full h-full object-contain" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1550px] relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left side Images */}
            <div className="w-full lg:w-1/2 relative min-h-[500px]">
              {/* Main Vertical Image */}
              <div className="relative z-0 rounded-[24px] overflow-hidden w-[75%] max-w-[380px] aspect-[3/4] shadow-xl border-4 border-white mx-auto lg:ml-0">
                <img src={trainer1} alt="Student learning" className="w-full h-full object-cover" />
              </div>

              {/* Floating Years of Experience Card */}
              <div className="absolute bottom-[20%] left-[2%] sm:bottom-auto sm:top-[10%] sm:left-auto sm:right-[0%] lg:right-[15%] z-30 bg-white rounded-xl shadow-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border border-gray-50 min-w-[190px] sm:min-w-[240px] overflow-hidden scale-[0.85] sm:scale-100 origin-bottom-left sm:origin-right">
                {/* Right Gradient Border */}
                <div className="absolute top-0 right-0 bottom-0 w-[4px] sm:w-[6px]" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}></div>
                
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                    <defs>
                      <linearGradient id="expGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1F3799" />
                        <stop offset="100%" stopColor="#9F18AC" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="url(#expGradient)"
                      strokeWidth="3.5"
                      strokeDasharray="85, 100"
                      strokeDashoffset="-15"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-bold text-xl text-gray-900 relative z-10">5+</span>
                </div>
                <span className="text-[14px] font-bold text-gray-800 leading-tight">Years of<br/>Experience</span>
              </div>

              {/* Overlapping Horizontal Image */}
              <div className="absolute bottom-[-5%] right-[5%] lg:right-[20%] z-10 rounded-[18px] overflow-hidden w-[65%] max-w-[320px] aspect-[4/3] shadow-2xl border-4 border-white">
                <img src={trainer2} alt="Student studying" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right side Content */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <div className="inline-block bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-5 shadow-sm relative">
                About Us
                {/* Confetti decoration */}
                {/* Confetti decoration */}
                <div className="absolute -top-7 -right-12 opacity-80">
                  <img src={guest36} alt="Confetti" className="w-[45px] h-[45px] object-contain" />
                </div>
              </div>
              
              <h2 className="font-dm-sans text-[32px] md:text-[40px] lg:text-[46px] font-extrabold text-[#050816] leading-[1.2] mb-5">
                Built to Help You Learn <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Skills
                  <img src={line1} alt="underline" className="absolute -bottom-4 left-0 w-full" />
                </span> That Actually<br/>Move Your Career
              </h2>
              
              <p className="text-gray-600 text-[15px] font-medium leading-relaxed max-w-xl mb-10">
                Lauratek brings together expert instructors, practical curriculum, and flexible learning paths — all built around where you want your career to go next.
              </p>

              {/* Mission & Vision List */}
              <div className="flex flex-col gap-8 relative mb-10">
                {/* Connecting line */}
                <div className="absolute left-[24px] top-12 bottom-12 w-[2px] bg-[#E2E8F0]"></div>

                {/* Mission */}
                <div className="flex gap-6 relative z-10">
                  <div 
                    className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg shadow-purple-200"
                    style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.45m.31-.31c.019-.104.04-.208.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[16px] mb-1.5">Our Mission:</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                      We make high-quality education accessible to everyone — giving learners the tools, confidence, and practical skills to reach their personal and professional goals.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="flex gap-6 relative z-10">
                  <div 
                    className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg shadow-purple-200"
                    style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-18v18m-9-9h18m-9-9a9 9 0 019 9H3a9 9 0 019-9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[16px] mb-1.5">Our Vision:</h4>
                    <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                      We're working toward a future where anyone, anywhere can access the skills they need to grow — through courses that stay current, practical, and built for real careers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-6">
                {/* <button 
                  className="text-white pl-6 pr-1.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-3 text-[14px] shadow-lg shadow-purple-200"
                  style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                >
                  Know More
                  <span className="bg-white/20 rounded-full p-2 flex items-center justify-center border border-white/20">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button> */}

                {/* <button className="flex items-center gap-3 group text-gray-700 font-bold hover:text-[#6D28D9] transition-colors text-[14px]">
                  <div className="w-11 h-11 rounded-full bg-[#A800B8] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  Live Class
                </button> */}
              </div>

            </div>
          </div>
        </section>

        {/* Courses Section */}
        {/* <section className="py-8 xs:py-[1.5rem] sm:py-[1.5rem] md:py-[1.5rem] lg:py-[1.5rem] xl:py-[1.5rem] 2xl:py-[1.5rem]">
          <div
            className="
              container
              mx-auto
              px-2 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10
              min-w-full
              sm:min-w-[640px]
              md:min-w-[768px]
              lg:min-w-[1024px]
              xl:min-w-[1280px]
              2xl:min-w-[1596px]
              3xl:min-w-[1920px]
            "
          >
            <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14 2xl:mb-16">
              <h2
                className="
                  text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl
                  font-bold font-dm-sans 
                  text-foreground
                  mb-2 xs:mb-[1.5rem] sm:mb-[1.5rem] md:mb-[1.5rem] lg:mb-[1.5rem] xl:mb-[1.5rem] 2xl:mb-[1.5rem]
                "
              >
                Featured Courses
              </h2>
              <p
                className="
                  text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl
                  text-muted-foreground
                  max-w-[250px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
                  mx-auto
                  leading-relaxed
                  px-2 xs:px-3 sm:px-4
                "
              >
                Choose from our carefully curated selection of
                industry-relevant courses designed to advance your career.
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4
                gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12
              "
            >
              {mockCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </section> */}

    </>
  );
};

export default AboutUsSection;
