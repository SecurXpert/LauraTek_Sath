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


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Mulish:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
 
{false && (
<section 
  className="relative bg-[#FDFDFD] pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden font-mulish"
>
  {/* Scaled background layer to permanently push the baked-in cut-off card off the right edge of the screen */}
  <div 
    className="absolute inset-0 z-0 scale-[1.15] origin-left bg-cover bg-center pointer-events-none"
    style={{ backgroundImage: `url(${landing2})` }}
  ></div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 flex flex-col lg:flex-row items-center">
    
    {/* Left Content */}
    <div className="w-full lg:w-[55%] pt-10 pb-20 relative z-20">
      
      {/* Decorative Icon - Top Left */}
      <div className="absolute top-0 left-[-30px] hidden md:block opacity-60">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="1.5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      </div>

      <div className="inline-block bg-[#A855F7] text-white px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm">
        # Online Courses 2026
      </div>

      <h1 className="font-dm-sans text-5xl sm:text-6xl md:text-[65px] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
        Join Lauratek <br />
        For <span style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4500+</span> Best Online <br />
        Courses
      </h1>

      <p className="mt-6 text-gray-600 text-lg max-w-lg leading-relaxed">
        Discover 4500+ premium online courses at EduZen, empowering you with
        valuable skills and knowledge to excel professionally.
      </p>

      <div className="flex flex-wrap items-center gap-5 mt-10">
        <button 
          onClick={() => document.getElementById('trending-courses')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white pl-6 pr-2 py-2 rounded-full font-semibold transition-all flex items-center gap-4 shadow-lg shadow-purple-500/30 text-base"
        >
          Browse Courses
          <span className="bg-[#5B21B6] rounded-full p-2.5 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>
      
      {/* Decorative Icon - Bottom Right of Text */}
      <div className="absolute bottom-5 right-10 hidden md:block opacity-60 text-yellow-400">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m12.728 0L5.636 5.636" />
        </svg>
      </div>
    </div>

    {/* Right Visuals */}
    <div className="w-full lg:w-[45%] relative min-h-[500px] md:min-h-[600px] lg:min-h-[650px] flex justify-center items-end mt-10 lg:mt-0 z-10">
      


      {/* Girl Image (landing.png) */}
      <img
        src={landing}
        alt="Student learning"
        className="relative z-10 w-[90%] max-w-md lg:max-w-lg object-contain drop-shadow-2xl -mb-4"
      />

      {/* Star Icon Top Right */}
      <div className="absolute top-[10%] right-[10%] z-20 text-white animate-pulse">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>
  </div>


</section>
)}

        
    </>
  );
};

export default HeroSection;
