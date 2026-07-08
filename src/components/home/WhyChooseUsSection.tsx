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
import guest32 from "@/assets/guest32.png";
import guest34 from "@/assets/guest34.png";
import guest36 from "@/assets/guest36.png";
import guest37 from "@/assets/guest37.png";
import { ChevronDown, ChevronUp } from 'lucide-react';
import line1 from "@/assets/line1.png";


const WhyChooseUsSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-r from-[#F4F4FD] via-[#FDFDFD] to-[#FCF4F7]">
          {/* Background decorations */}
          {/* Top left globe */}
          <div className="absolute -top-4 left-4 md:-top-2 md:left-8 lg:top-0 lg:left-16 w-[70px] h-[70px] opacity-80 z-0">
             <img src={guest30} alt="Globe icon" className="w-full h-full object-contain" />
          </div>
          {/* Top right asterisk */}
          <div className="absolute top-[10%] lg:top-[15%] right-[5%] lg:right-[10%] w-[80px] md:w-[100px] lg:w-[120px] opacity-80 z-0">
             <img src={guest32} alt="Asterisk" className="w-full h-auto object-contain" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 flex flex-col xl:flex-row items-center gap-16 xl:gap-8">
            
            {/* Left Side Content */}
            <div className="w-full xl:w-[45%] relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm relative">
                Why Choose Us
                {/* Confetti decoration */}
                <div className="absolute -top-10 -right-8 opacity-80">
                  <img src={guest36} alt="Confetti" className="w-[45px] h-[45px] object-contain" />
                </div>
              </div>

              <h2 className="font-dm-sans text-[38px] md:text-[46px] lg:text-[52px] font-extrabold text-[#050816] leading-[1.15] mb-6">
                Learn From <br/>
                People Who've <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Actually
                  <img src={line1} alt="underline" className="absolute -bottom-4 left-0 w-full" />
                </span> Done the<br/>Job
              </h2>

              <p className="text-gray-500 text-[15px] font-medium max-w-md leading-relaxed mb-10">
                Every course is taught by instructors with real industry experience, so what you learn is current, practical, and immediately useful.
              </p>

              {/* Feature Cards */}
              <div className="flex flex-col gap-6 relative">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/40 flex gap-5 max-w-[420px] items-start border border-gray-50">
                  <div className="w-14 h-14 rounded-xl bg-[#F4F0FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#A800B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[17px] mb-2">Flexible Schedule</h4>
                    <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
                      Learn at your own pace, on your own time — no fixed class times, no missed sessions.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/40 flex gap-5 max-w-[420px] items-start ml-0 lg:ml-12 border border-gray-50">
                  <div className="w-14 h-14 rounded-xl bg-[#FDF2F8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#DB2777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[17px] mb-2">Highly Experienced</h4>
                    <p className="text-gray-500 text-[13px] leading-relaxed font-medium">
                      Our instructors bring 5+ years of hands-on industry experience into every course they teach.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Curvy Arrow */}
            <div className="hidden xl:block w-[15%] relative z-0 flex justify-center -mt-20">
              <img src={guest34} alt="Arrow" className="w-[180px] object-contain" />
            </div>

            {/* Right Side Images */}
            <div className="w-full xl:w-[40%] relative min-h-[550px] flex justify-center items-center mt-16 xl:mt-0">
              
              {/* Main Circular Image */}
              <div className="relative z-10 w-[85%] max-w-[420px] aspect-square rounded-full overflow-hidden border-[8px] border-white shadow-2xl">
                <img src={trainer1} alt="Instructor in academia" className="w-full h-full object-cover" />
              </div>

              {/* Overlapping Circle Image */}
              <div className="absolute bottom-[0%] left-[5%] sm:left-[10%] xl:left-[-10%] z-20 w-36 h-36 sm:w-44 sm:h-44 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[4px] sm:border-[6px] xl:border-[8px] border-white shadow-2xl">
                <img src={trainer2} alt="Instructor smiling" className="w-full h-full object-cover" />
              </div>

              {/* Top Left Floating Box */}
              <div className="absolute top-[5%] left-[2%] sm:left-[5%] xl:top-[10%] xl:left-[-15%] z-30 bg-white rounded-xl shadow-xl p-3 xl:p-4 flex flex-col gap-2 min-w-[160px] xl:min-w-[190px] border border-gray-50 scale-[0.85] sm:scale-100 origin-top-left">
                <span className="text-[14px] font-bold text-gray-800">Instructor</span>
                <div className="flex items-center mt-1">
                  <img src={trainer1} className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                  <img src={trainer2} className="w-9 h-9 rounded-full border-2 border-white -ml-3 object-cover" />
                  <img src={trainer1} className="w-9 h-9 rounded-full border-2 border-white -ml-3 object-cover" />
                  <div className="w-9 h-9 rounded-full border-2 border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[11px] font-bold">
                    136+
                  </div>
                  <span className="text-[12px] text-gray-500 font-medium ml-3">Instructors</span>
                </div>
              </div>

              {/* Bottom Right Floating Box */}
              <div className="absolute bottom-[10%] right-[5%] sm:right-[5%] xl:right-[8%] 2xl:right-[-5%] z-30 bg-white rounded-xl shadow-xl p-3 xl:p-4 flex items-center gap-2 sm:gap-3 border border-gray-50 pr-4 sm:pr-8 scale-[0.85] sm:scale-100 origin-bottom-right">
                <div className="w-11 h-11 rounded-md bg-[#F59E0B] flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 14.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L2.82 8.125a.75.75 0 01.416-1.28l4.21-.611L9.327 2.418A.75.75 0 0110 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 text-[18px]">4.8</div>
                  <div className="text-[12px] text-gray-500 font-medium">Avg. Rating</div>
                </div>
              </div>

              {/* Floating Lightbulb */}
              <div className="absolute bottom-[5%] left-[45%] text-gray-400 opacity-60">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

            </div>

          </div>
          {/* Bottom Right Mascot */}
          <div className="absolute bottom-0 right-4 lg:right-12 w-[100px] md:w-[130px] z-20">
            <img src={guest37} alt="Mascot" className="w-full h-auto object-contain" />
          </div>
        </section>

        
    </>
  );
};

export default WhyChooseUsSection;
