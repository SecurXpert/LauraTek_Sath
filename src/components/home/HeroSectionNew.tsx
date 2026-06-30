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


const HeroSectionNew = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* NEW HERO SECTION BASED ON SCREENSHOT */}
        <section className="relative w-full min-h-[750px] lg:min-h-[850px] bg-[#FDFDFD] overflow-hidden font-mulish flex items-center pt-20 pb-10">
          
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 opacity-40" style={{
            backgroundSize: '40px 40px',
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)'
          }}></div>

          {/* Right Side Shapes */}
          <div className="hidden lg:block absolute top-0 right-0 w-[48%] h-full z-0 overflow-hidden pointer-events-none">
            {/* Dark Blue block - right 60% of right half */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-[#1e3294]"></div>
            
            {/* Purple block - center right */}
            <div className="absolute bottom-0 left-[-5%] w-[85%] h-[95%] bg-[#A800B8]"
                 style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 25%)' }}></div>

            {/* Star Icon in Dark Blue */}
            <div className="absolute top-[8%] right-[15%] text-white z-10 animate-pulse">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-20 flex flex-col lg:flex-row h-full">
            
            {/* Left Column Content */}
            <div className="w-full lg:w-[50%] xl:w-[52%] pt-10 pb-16 lg:pb-40 relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-20">
              
              {/* Floating Icons */}
              {/* Globe */}
              <div className="absolute top-[0%] left-[5%] text-[#A800B8] w-14 h-14 drop-shadow-sm hidden md:block">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="14" r="7" />
                  <path d="M12 7v14M7 14a10 10 0 0010 0M5 14a10 10 0 0114 0" />
                  <path d="M4 8l8-4 8 4-8 4-8-4z" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M4 8v4c0 2 3 4 8 4s8-2 8-4V8" />
                </svg>
              </div>

              {/* Purple Square Guy */}
              <div className="absolute top-[40%] left-[-2%] w-16 h-16 opacity-90 drop-shadow-sm hidden md:block">
                <svg viewBox="0 0 100 100" fill="#A800B8">
                  <rect x="25" y="35" width="50" height="45" rx="5" />
                  <circle cx="40" cy="55" r="5" fill="white" />
                  <circle cx="60" cy="55" r="5" fill="white" />
                  <path d="M45 70 Q50 75 55 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M15 35 L50 20 L85 35 L50 50 Z" fill="#1e3294"/>
                  <rect x="40" y="50" width="20" height="15" fill="#1e3294"/>
                  {/* arm */}
                  <path d="M25 50 Q10 50 15 40" fill="none" stroke="#A800B8" strokeWidth="4" strokeLinecap="round"/>
                  {/* arm */}
                  <path d="M75 50 Q90 50 85 60" fill="none" stroke="#A800B8" strokeWidth="4" strokeLinecap="round"/>
                  <rect x="80" y="60" width="10" height="15" fill="#3B82F6"/>
                </svg>
              </div>

              {/* Alarm Clock */}
              <div className="absolute bottom-[5%] left-[8%] w-24 h-24 hidden md:block drop-shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1e3294" strokeWidth="1.5" className="w-full h-full text-[#1e3294]">
                  <circle cx="12" cy="13" r="8" fill="#E2E6FB"/>
                  <path d="M12 9v4l2 2" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 5l3-3M20 5l-3-3M5 20l-2 2M19 20l2 2" strokeWidth="3" strokeLinecap="round" stroke="#F97316"/>
                  <path d="M8 2h8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Book Icon */}
              <div className="absolute bottom-[20%] right-[10%] text-[#A800B8] w-12 h-12 rotate-[15deg] hidden md:block">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  <path d="M8 6h8M8 10h8" />
                </svg>
              </div>

              {/* Robot reading */}
              <div className="absolute top-[8%] right-[5%] w-16 h-16 text-[#A800B8] opacity-90 rotate-12 hidden md:block">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M30 60 L70 60 L80 40 L20 40 Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                  <rect x="35" y="25" width="30" height="25" rx="5" fill="currentColor" />
                  <circle cx="45" cy="35" r="3" fill="white" />
                  <circle cx="55" cy="35" r="3" fill="white" />
                  <path d="M45 15 C45 5 55 5 55 15" stroke="currentColor" strokeWidth="3" fill="none" />
                  <path d="M20 40 L30 80 L70 80 L80 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Yellow Asterisk */}
              <div className="absolute bottom-[10%] right-[25%] text-[#F59E0B] w-12 h-12 drop-shadow-sm hidden md:block">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
              </div>


              {/* Text Content */}
              <div className="relative w-full lg:w-max pl-0 lg:pl-20 z-20 flex justify-center lg:justify-start">
                <div className="inline-block bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm">
                  # Career-Ready Skills, Built for 2026
                </div>

                {/* Curvy Arrow */}
                <div className="absolute right-[-100px] top-[0px] text-[#1e3294] w-24 h-16 opacity-90 hidden xl:block">
                  <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 10 60 C 20 10, 60 0, 100 30 C 120 45, 100 80, 70 60 C 50 45, 60 20, 100 10" />
                    <path d="M 5 50 L 10 60 L 25 55" />
                  </svg>
                </div>
              </div>

              <div className="pl-0 lg:pl-20 relative z-20 mt-4 w-full flex flex-col items-center lg:items-start px-4 lg:px-0">
                <h1 className="font-dm-sans text-5xl sm:text-6xl md:text-[64px] font-extrabold text-[#111827] leading-[1.15] tracking-tight mb-6">
                  Turn Your <br />
                  Ambition Into a <span style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Career</span> That <br />
                  Pays
                </h1>

                <p className="text-gray-500 text-[16px] max-w-lg leading-relaxed mb-10 font-medium">
                  Choose from 4,500+ expert-led courses on Lauratek and build practical, job-ready skills you can apply from day one.
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <button 
                    onClick={() => document.getElementById('trending-courses')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white pl-6 pr-2 py-2.5 rounded-full font-medium transition-all flex items-center gap-4 text-[15px] shadow-lg shadow-purple-200 w-fit group"
                    style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                  >
                    Start Learning Now
                    <span className="bg-white/20 rounded-full p-2 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column (Girl and Cards) */}
            <div className="w-full lg:w-[50%] xl:w-[48%] relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex justify-center items-end mt-10 lg:mt-0 z-20">
              
              <img src={landing} alt="Student learning" className="relative z-20 w-[85%] lg:w-[90%] max-w-[350px] lg:max-w-[450px] xl:max-w-[500px] object-contain drop-shadow-2xl lg:-translate-x-6 xl:-translate-x-8 translate-y-4 lg:translate-y-6 xl:translate-y-8" />

              {/* Floating Card: Instructor */}
              <div className="absolute top-[-5%] right-[0%] md:right-[15%] lg:top-[8%] lg:right-[-2%] xl:right-[5%] z-30 bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 lg:p-5 flex flex-col gap-2 lg:gap-3 min-w-[170px] lg:min-w-[210px] border border-gray-50 animate-fade-in-up scale-90 lg:scale-100 origin-top-right">
                <span className="text-[16px] font-bold text-gray-900">Instructor</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <img src={trainer1} className="w-10 h-10 rounded-full border-[2.5px] border-white object-cover" />
                    <img src={trainer2} className="w-10 h-10 rounded-full border-[2.5px] border-white -ml-3 object-cover" />
                    <img src={trainer1} className="w-10 h-10 rounded-full border-[2.5px] border-white -ml-3 object-cover" />
                    <div className="w-10 h-10 rounded-full border-[2.5px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[16px] font-medium leading-none pb-[2px]">
                      +
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[15px] font-bold leading-tight" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>136+</span>
                    <span className="text-[12px] text-gray-500 font-medium mt-0.5">Expert Instructors</span>
                  </div>
                </div>
              </div>

              {/* Floating Card: Success Students */}
              <div className="absolute bottom-[-10%] right-[0%] md:right-[5%] lg:bottom-[-2%] lg:right-[0%] xl:bottom-[2%] xl:right-[5%] z-30 bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 lg:p-5 flex flex-col min-w-[160px] lg:min-w-[200px] border border-gray-50 animate-fade-in-up scale-90 lg:scale-100 origin-bottom-right" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-3">
                  <img src={trainer1} className="w-10 h-10 rounded-full border-[2.5px] border-white object-cover" />
                  <img src={trainer2} className="w-10 h-10 rounded-full border-[2.5px] border-white -ml-3 object-cover" />
                  <div className="w-10 h-10 rounded-full border-[2.5px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[16px] font-medium leading-none pb-[2px]">
                    +
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[22px] font-bold leading-tight mb-0.5" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2,562+</span>
                  <span className="text-[13px] text-gray-500 font-medium">Success Students</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Info Block */}
          <div className="absolute bottom-0 left-0 w-[95%] md:w-[60%] lg:w-[48%] py-8 bg-[#E2E6FB] z-20 flex justify-center items-center"
               style={{ clipPath: 'polygon(0 0, 88% 0, 100% 35%, 100% 100%, 0 100%)' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-center mr-10 lg:mr-20">
              <div>
                <div style={{ fontFamily: '"League Spartan", sans-serif', fontWeight: 800, fontSize: '32px', lineHeight: '32px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#212529' }}>23+</div>
                <div className="mt-1" style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#4E4E4E' }}>Years Experience</div>
              </div>
              <div>
                <div style={{ fontFamily: '"League Spartan", sans-serif', fontWeight: 800, fontSize: '32px', lineHeight: '32px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#212529' }}>414+</div>
                <div className="mt-1" style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#4E4E4E' }}>Our Students</div>
              </div>
              <div>
                <div style={{ fontFamily: '"League Spartan", sans-serif', fontWeight: 800, fontSize: '32px', lineHeight: '32px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#212529' }}>64+</div>
                <div className="mt-1" style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px', letterSpacing: '0px', textAlign: 'center', verticalAlign: 'middle', color: '#4E4E4E' }}>Popular Courses</div>
              </div>
            </div>
          </div>

        </section>

        
    </>
  );
};

export default HeroSectionNew;
