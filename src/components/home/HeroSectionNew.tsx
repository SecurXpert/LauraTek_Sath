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
          backgroundImage: 'linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)'
        }}></div>

        {/* Right Side Shapes */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-full z-0 overflow-hidden pointer-events-none">
          {/* Background shapes removed as they are baked into guest40.png */}

          {/* Star Icon in Dark Blue */}
          <div className="absolute top-[5%] right-[18%] text-white z-10 animate-pulse">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-20 flex flex-col lg:flex-row lg:items-center">
          
          {/* Left Column Content */}
          <div className="w-full lg:w-[50%] xl:w-[50%] pt-4 pb-[100px] lg:pt-4 lg:pb-[120px] relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-20">
            
            {/* Floating Icons */}
            {/* Globe with Cap */}
            <div className="absolute top-[5%] left-[2%] w-16 h-16 drop-shadow-sm hidden md:block opacity-90">
              <img src={guest30} alt="Globe icon" className="w-full h-full object-contain" />
            </div>

            {/* Purple Square Guy (Mascot) */}
            <div className="absolute top-[40%] left-[2%] w-20 h-20 opacity-95 drop-shadow-sm hidden md:block">
              <img src={guest32} alt="Mascot icon" className="w-full h-full object-contain" />
            </div>

            {/* Clock moved to section level to align properly with the bottom banner */}
            <div className="absolute bottom-[20%] right-[2%] w-[60px] h-[60px] hidden lg:block opacity-90">
              <img src={guest33} alt="Open book icon" className="w-full h-full object-contain" />
            </div>


            {/* Yellow Asterisk */}
            <div className="absolute bottom-[5%] right-[22%] text-[#F59E0B] w-12 h-12 drop-shadow-sm hidden md:block">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
              </svg>
            </div>


            {/* Text Content */}
            <div className="relative w-full lg:w-max pl-0 lg:pl-[120px] z-20 flex justify-center lg:justify-start">
              <div className="inline-block bg-[#9D11A5] text-white px-5 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm relative">
                # Career-Ready Skills, Built for 2026
                {/* Confetti (guest36) */}
                <img src={guest36} alt="Confetti" className="absolute top-[-30px] right-[-30px] w-[50px] h-[50px] object-contain hidden md:block" />
              </div>
            </div>

            <div className="pl-0 lg:pl-[120px] relative z-20 mt-2 w-full w-full flex flex-col items-center lg:items-start px-4 lg:px-0">
              
              <h1 
                className="mb-5 relative"
                style={{
                  fontFamily: '"League Spartan", sans-serif',
                  fontWeight: 800,
                  fontSize: '56px',
                  lineHeight: '67.2px',
                  letterSpacing: '0px',
                  verticalAlign: 'middle',
                  color: '#181818'
                }}
              >
                Turn Your Ambition Into a <br />
                <span 
                  style={{
                    background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >Career</span> That Pays

                {/* Arrow (guest34) matching Screenshot 2 */}
                <div className="absolute left-[55%] md:left-[55%] lg:left-[60%] xl:left-[65%] top-[-40px] md:top-[-60px] lg:top-[-75px] w-[130px] md:w-[180px] lg:w-[220px] h-[70px] md:h-[100px] lg:h-[120px] z-30 hidden md:block pointer-events-none">
                  <img src={guest34} alt="Arrow" className="w-full h-full object-contain" style={{ transform: 'scaleX(-1)' }} />
                </div>
              </h1>

              <p className="text-gray-600 text-[17px] max-w-lg leading-relaxed mb-10 font-medium">
                Choose from 4,500+ expert-led courses on Lauratek and build practical, job-ready skills you can apply from day one.
              </p>

              <div className="flex flex-wrap items-center gap-5">
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
          <div className="w-full lg:w-[50%] xl:w-[50%] flex justify-center mt-4 lg:mt-0 z-20">
            {/* Inner relative wrapper that perfectly matches the image size */}
            <div className="relative w-full max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px]">
              
              {/* Robot reading book (guest35) near the top left of the purple block */}
              <div className="absolute top-[2%] left-[-10%] md:top-[5%] md:left-[-10%] lg:top-[5%] lg:left-[-20%] xl:top-[2%] xl:left-[-15%] w-[65px] h-[65px] z-30 drop-shadow-sm hidden md:block">
                <img src={guest35} alt="Robot icon" className="w-full h-full object-contain" />
              </div>

              <img src={guest40} alt="Student learning" className="relative z-20 w-full object-contain drop-shadow-2xl" />

            {/* Floating Card: Instructor */}
            <div className="absolute top-[5%] right-[5%] md:right-[10%] lg:top-[12%] lg:right-[20%] xl:top-[12%] xl:right-[25%] z-30 bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-2 min-w-[200px] border border-gray-50 animate-fade-in-up">
              <span className="text-[15px] font-bold text-gray-900">Instructor</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <img src={trainer1} className="w-[38px] h-[38px] rounded-full border-[2px] border-white object-cover" />
                  <img src={trainer2} className="w-[38px] h-[38px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                  <img src={trainer1} className="w-[38px] h-[38px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                  <div className="w-[38px] h-[38px] rounded-full border-[2px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[18px] font-medium leading-none pb-[2px]">
                    +
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[14px] font-bold leading-tight text-[#111827]">136+</span>
                  <span className="text-[12px] text-gray-500 font-medium">Expert Instructors</span>
                </div>
              </div>
            </div>

            {/* Floating Card: Success Students */}
            <div className="absolute bottom-[2%] right-[5%] md:right-[10%] lg:bottom-[20%] lg:right-[12%] xl:bottom-[20%] xl:right-[15%] z-30 bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col min-w-[180px] border border-gray-50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-2">
                <img src={trainer1} className="w-[42px] h-[42px] rounded-full border-[2px] border-white object-cover" />
                <img src={trainer2} className="w-[42px] h-[42px] rounded-full border-[2px] border-white -ml-3 object-cover" />
                <div className="w-[42px] h-[42px] rounded-full border-[2px] border-white -ml-3 bg-[#F97316] text-white flex items-center justify-center text-[20px] font-medium leading-none pb-[2px]">
                  +
                </div>
              </div>
              <div className="flex flex-col mt-1">
                <span className="text-[20px] font-extrabold leading-tight text-[#1b2a75] mb-0.5">2,562+</span>
                <span className="text-[12px] text-gray-500 font-medium">Success Students</span>
              </div>
            </div>

            </div>
          </div>
        </div>

        {/* Alarm Clock (guest31) placed relative to section bottom so it sits precisely on the blue bar */}
        <div className="absolute bottom-[115px] md:bottom-[120px] lg:bottom-[130px] left-[10%] lg:left-[120px] w-[90px] h-[90px] hidden md:block drop-shadow-sm z-20">
          <img src={guest31} alt="Clock icon" className="w-full h-full object-contain" />
        </div>

        {/* Bottom Info Block */}
        <div className="absolute bottom-0 left-0 w-full md:w-[60%] lg:w-[45%] xl:w-[42%] py-6 md:py-8 bg-[#DBDFFF] z-30"
             style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}>
          <div className="flex flex-wrap justify-start items-center gap-8 md:gap-14 pl-10 lg:pl-[120px]">
            <div className="text-center">
              <div className="font-extrabold text-[28px] md:text-[32px] text-[#111827]">23+</div>
              <div className="text-[13px] md:text-[14px] text-gray-600 font-medium mt-0.5">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-extrabold text-[28px] md:text-[32px] text-[#111827]">414+</div>
              <div className="text-[13px] md:text-[14px] text-gray-600 font-medium mt-0.5">Our Students</div>
            </div>
            <div className="text-center">
              <div className="font-extrabold text-[28px] md:text-[32px] text-[#111827]">64+</div>
              <div className="text-[13px] md:text-[14px] text-gray-600 font-medium mt-0.5">Popular Courses</div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSectionNew;
