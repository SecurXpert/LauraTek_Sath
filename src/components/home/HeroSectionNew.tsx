import React from "react";
import { Link, useNavigate } from "react-router-dom";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import guest40 from "@/assets/guest40.png";
import guest30 from "@/assets/guest30.png";
import guest31 from "@/assets/guest31.png";
import guest32 from "@/assets/guest32.png";
import guest33 from "@/assets/guest33.png";
import guest34 from "@/assets/guest34.png";
import guest35 from "@/assets/guest35.png";
import guest36 from "@/assets/guest36.png";

const HeroSectionNew = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* NEW HERO SECTION BASED ON SCREENSHOT */}
      <section className="relative w-full bg-[#F0F4F5] overflow-hidden font-mulish pt-0 pb-0">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.6]" style={{
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)',
          backgroundPosition: '0 -1.5px'
        }}></div>

        {/* Right Side Shapes */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-full z-0 overflow-hidden pointer-events-none">
          {/* Star Icon in Dark Blue */}
          <div className="absolute top-[8%] right-[18%] text-white z-10 animate-pulse">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>

        <div className="w-full relative z-20 flex flex-col lg:flex-row lg:items-center">
          
          {/* Left Column Content */}
          <div className="w-full lg:w-[55%] xl:w-[55%] pt-6 pb-[80px] md:pb-[90px] lg:pt-[40px] lg:pb-[140px] xl:pb-[160px] px-4 sm:px-8 lg:px-10 xl:pl-[80px] 2xl:pl-[100px] xl:pr-6 relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-20">
            
            {/* Floating Icons */}
            {/* Globe with Cap */}
            <div className="absolute top-[2%] left-[5%] w-14 h-14 xl:w-16 xl:h-16 drop-shadow-sm hidden md:block opacity-90 z-10">
              <img src={guest30} alt="Globe icon" className="w-full h-full object-contain" />
            </div>

            {/* Purple Square Guy (Mascot) */}
            <div className="absolute top-[45%] left-[1%] xl:left-[1%] w-16 h-16 xl:w-20 xl:h-20 opacity-95 drop-shadow-sm hidden xl:block z-10">
              <img src={guest32} alt="Mascot icon" className="w-full h-full object-contain" />
            </div>

            {/* Yellow Asterisk */}
            <div className="absolute bottom-[25%] right-[15%] lg:right-[10%] text-[#F59E0B] w-10 h-10 xl:w-12 xl:h-12 drop-shadow-sm hidden md:block z-10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
              </svg>
            </div>


            {/* Text Content */}
            <div className="relative w-full z-20 flex justify-center lg:justify-start lg:ml-2">
              <div className="inline-block bg-[#9D11A5] text-white px-5 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm relative z-30">
                # Career-Ready Skills, Built for 2026
                {/* Confetti (guest36) */}
                <img src={guest36} alt="Confetti" className="absolute top-[-30px] right-[-30px] w-[50px] h-[50px] object-contain hidden md:block z-[-1]" />
              </div>
            </div>

            <div className="relative z-20 mt-2 w-full flex flex-col items-center lg:items-start lg:ml-2">
              
              {/* Arrow relative to h1 block */}
              <div className="relative w-full max-w-[550px] xl:max-w-[650px] flex justify-center lg:justify-start">
                <h1 
                  className="mb-5 relative text-center lg:text-left"
                  style={{
                    fontFamily: '"League Spartan", sans-serif',
                    fontWeight: 800,
                    letterSpacing: '0px',
                    color: '#181818'
                  }}
                >
                  <span className="block text-[42px] leading-[48px] lg:text-[45px] lg:leading-[52px] xl:text-[54px] xl:leading-[60px]">Turn Your Ambition</span>
                  <span className="block text-[42px] leading-[48px] lg:text-[45px] lg:leading-[52px] xl:text-[54px] xl:leading-[60px] mt-1">
                    Into a <span 
                      style={{
                        background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >Career</span> That Pays
                  </span>

                  {/* Arrow (guest34) properly anchored to the top right of text area */}
                  <div className="absolute right-[0%] lg:right-[-20%] xl:right-[-15%] top-[-40px] lg:top-[-45px] xl:top-[-50px] w-[100px] lg:w-[130px] xl:w-[150px] h-[70px] lg:h-[90px] xl:h-[100px] z-30 hidden lg:block pointer-events-none">
                    <img src={guest34} alt="Arrow" className="w-full h-full object-contain" style={{ transform: 'scaleX(-1)' }} />
                  </div>
                </h1>
              </div>

              <p className="text-gray-600 text-[16px] xl:text-[17px] max-w-[480px] xl:max-w-lg leading-relaxed mb-8 xl:mb-10 font-medium">
                Choose from 4,500+ expert-led courses on Lauratek and build practical, job-ready skills you can apply from day one.
              </p>

              <div className="flex flex-wrap items-center gap-5 relative z-30">
                <button 
                  onClick={() => document.getElementById('trending-courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white pl-6 pr-2 py-2 rounded-full font-semibold transition-all flex items-center gap-4 shadow-lg text-[16px] shadow-purple-200 group hover:opacity-90"
                  style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                >
                  Start Learning Now
                  <span className="bg-[#5B21B6] rounded-full p-2 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (Girl and Cards) */}
          <div className="w-full lg:w-[45%] xl:w-[45%] flex justify-center lg:justify-end mt-4 lg:mt-0 pb-0 z-30 items-end self-end pointer-events-none">
            {/* Inner relative wrapper properly sized */}
            <div className="relative w-full max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] lg:translate-x-[10px] xl:translate-x-[20px] origin-bottom-right pointer-events-auto">
              
              {/* Robot reading book (guest35) */}
              <div className="absolute top-[8%] left-[-5%] lg:top-[5%] lg:left-[-15%] xl:top-[2%] xl:left-[-10%] w-[55px] h-[55px] xl:w-[65px] xl:h-[65px] z-40 drop-shadow-sm hidden md:block">
                <img src={guest35} alt="Robot icon" className="w-full h-full object-contain" />
              </div>

              <img src={guest40} alt="Student learning" className="relative z-30 w-full object-contain drop-shadow-2xl translate-y-[5px]" />

            {/* Floating Card: Instructor */}
            <div className="absolute top-[12%] right-[5%] lg:top-[20%] lg:right-[15%] xl:top-[20%] xl:right-[18%] z-40 bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-1.5 min-w-[160px] xl:min-w-[180px] border border-gray-50 animate-fade-in-up scale-[0.85] sm:scale-100 origin-right">
              <span className="text-[14px] xl:text-[15px] font-bold text-gray-900">Instructor</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <img src={trainer1} className="w-[32px] h-[32px] xl:w-[38px] xl:h-[38px] rounded-full border-[2px] border-white object-cover" />
                  <img src={trainer2} className="w-[32px] h-[32px] xl:w-[38px] xl:h-[38px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                  <img src={trainer1} className="w-[32px] h-[32px] xl:w-[38px] xl:h-[38px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                  <div className="w-[32px] h-[32px] xl:w-[38px] xl:h-[38px] rounded-full border-[2px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[16px] xl:text-[18px] font-medium leading-none pb-[2px]">
                    +
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[13px] xl:text-[14px] font-bold leading-tight text-[#6525a3]">136+</span>
                  <span className="text-[11px] xl:text-[12px] text-gray-500 font-medium pt-0.5">Instructor</span>
                </div>
              </div>
            </div>

            {/* Floating Card: Success Students */}
            <div className="absolute bottom-[2%] right-[5%] lg:bottom-[15%] lg:right-[8%] xl:bottom-[15%] xl:right-[10%] z-40 bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col min-w-[160px] xl:min-w-[180px] border border-gray-50 animate-fade-in-up scale-[0.85] sm:scale-100 origin-right" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-2">
                <img src={trainer1} className="w-[36px] h-[36px] xl:w-[42px] xl:h-[42px] rounded-full border-[2px] border-white object-cover" />
                <img src={trainer2} className="w-[36px] h-[36px] xl:w-[42px] xl:h-[42px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                <div className="w-[36px] h-[36px] xl:w-[42px] xl:h-[42px] rounded-full border-[2px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[18px] xl:text-[20px] font-medium leading-none pb-[2px]">
                  +
                </div>
              </div>
              <div className="flex flex-col mt-1">
                <span className="text-[18px] xl:text-[20px] font-extrabold leading-tight text-[#6525a3] mb-0.5">2,562+</span>
                <span className="text-[11px] xl:text-[12px] text-gray-500 font-medium">Success Students</span>
              </div>
            </div>

            </div>
          </div>
        </div>

        {/* Alarm Clock (guest31) sitting perfectly flat on the bottom banner border */}
        <div className="absolute bottom-[90px] lg:bottom-[95px] xl:bottom-[115px] 2xl:bottom-[115px] left-[20%] lg:left-[25%] xl:left-[27%] 2xl:left-[30%] w-[80px] h-[80px] xl:w-[110px] xl:h-[110px] hidden md:block drop-shadow-sm z-20">
          <img src={guest31} alt="Clock icon" className="w-full h-full object-contain" />
        </div>

        {/* Bottom Info Block (z-10 so it properly goes BEHIND the Right Column image for the cut-out 3D overlap effect!) */}
        <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-[100%] md:w-[80%] lg:w-[68%] xl:w-[62%] 2xl:w-[55%] bg-[#DBDFFF] z-10 overflow-visible"
             style={{ clipPath: 'polygon(0 0, 93% 0, 100% 100%, 0 100%)' }}>
          <div className="flex flex-wrap justify-start items-center gap-4 lg:gap-8 xl:gap-14 px-8 lg:px-12 xl:px-[100px] py-4 lg:py-6 xl:py-8">
            <div className="flex flex-col text-left lg:text-center mt-1 mb-1">
              <span className="font-extrabold text-[24px] lg:text-[28px] xl:text-[32px] leading-none text-[#111827]">23+</span>
              <span className="text-[12px] lg:text-[13px] xl:text-[14px] text-gray-700 font-semibold mt-1">Years Experience</span>
            </div>
            <div className="flex flex-col text-left lg:text-center mt-1 mb-1">
              <span className="font-extrabold text-[24px] lg:text-[28px] xl:text-[32px] leading-none text-[#111827]">414+</span>
              <span className="text-[12px] lg:text-[13px] xl:text-[14px] text-gray-700 font-semibold mt-1">Our Students</span>
            </div>
            <div className="flex flex-col text-left lg:text-center mt-1 mb-1">
              <span className="font-extrabold text-[24px] lg:text-[28px] xl:text-[32px] leading-none text-[#111827]">64+</span>
              <span className="text-[12px] lg:text-[13px] xl:text-[14px] text-gray-700 font-semibold mt-1">Popular Courses</span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSectionNew;
