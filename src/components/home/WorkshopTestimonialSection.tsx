import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import line1 from "@/assets/line1.png";

const testimonials = [
  {
    quote: "The course content was clear, practical, and easy to follow. I went from knowing almost nothing to feeling confident using these skills at work — all at a pace that actually fit my schedule.",
    author: "Savannah Nguyen",
    role: "Dog Trainer",
    image: trainer2,
  },
  {
    quote: "What stood out to me was how hands-on everything was. The instructors clearly know the industry, and I could apply what I learned almost immediately.",
    author: "Robert Fox",
    role: "Software Developer",
    image: trainer1,
  },
  {
    quote: "The platform offers an amazing range of courses. The instructors are highly knowledgeable, and the interactive lessons keep me engaged. I've gained practical skills that I immediately applied in my job! I love how I can learn at my own pace.",
    author: "Savannah Nguyen",
    role: "Dog Trainer",
    image: trainer2,
  },
  {
    quote: "The platform offers an amazing range of courses. The instructors are highly knowledgeable, and the interactive lessons keep me engaged. I've gained practical skills that I immediately applied in my job! I love how I can learn at my own pace.",
    author: "Savannah Nguyen",
    role: "Dog Trainer",
    image: trainer2,
  },
  {
    quote: "The platform offers an amazing range of courses. The instructors are highly knowledgeable, and the interactive lessons keep me engaged. I've gained practical skills that I immediately applied in my job! I love how I can learn at my own pace.",
    author: "Savannah Nguyen",
    role: "Dog Trainer",
    image: trainer2,
  },
];

const WorkshopTestimonialSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <>
      {/* ================== COMBINED WORKSHOP & TESTIMONIAL SECTION ================== */}
        <section id="success-stories" className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-b from-[#F4F4FD] via-[#FDFDFD] to-[#FCF4F7]">
          
          {/* Background Decorations for Top Part */}
          <div className="absolute top-[8%] left-[4%] text-[#D1D5F5] opacity-80 z-0">
            <svg width="110" height="110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0v24M0 12h24M3 3l18 18M3 21L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute top-[8%] right-[6%] z-0">
            <div className="w-16 h-16 opacity-80 -rotate-12 text-[#9333EA]">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M30 60 L70 60 L80 40 L20 40 Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <rect x="40" y="20" width="20" height="20" rx="5" fill="currentColor" />
                <circle cx="45" cy="30" r="2" fill="white" />
                <circle cx="55" cy="30" r="2" fill="white" />
                <path d="M45 15 C45 10 55 10 55 15" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M20 40 L30 80 L70 80 L80 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 mb-20 md:mb-24 mt-10">
          <div className="w-full flex flex-col md:flex-row items-center h-full">

              
                <div className="w-full md:w-[45%] relative flex justify-center items-end hidden md:flex">
                  {/* Decorative shapes behind student */}
                  <div className="absolute bottom-[0%] right-[20%] w-64 h-80 bg-[#FF6B4A] rounded-[40px] rotate-[15deg] shadow-lg"></div>
                  <div className="absolute bottom-[10%] left-[15%] w-64 h-80 bg-[#3B82F6] rounded-[40px] -rotate-[15deg] shadow-lg"></div>
                  
                  {/* Student Image - Using trainer1 as placeholder for the young guy */}
                  <img src={trainer1} alt="Student" className="relative z-10 w-4/5 object-cover drop-shadow-2xl" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-[55%] px-8 md:px-0 md:pr-20 py-12 md:py-0 flex flex-col justify-center">
                  <h2 className="font-dm-sans text-[38px] md:text-[46px] lg:text-[54px] font-extrabold text-[#050816] leading-[1.15] mb-12 max-w-2xl">
                    Join Us for a Free <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>UX Design</span> Workshop Today
                  </h2>
                  
                  {/* Countdown Hexagons */}
                  <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
                    <div className="flex flex-col items-center justify-center w-[100px] h-[115px] bg-[#DCE4FB] drop-shadow-sm relative transition-transform hover:-translate-y-1" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                       <span className="font-extrabold text-[#4C1D95] text-[28px] leading-none mb-1">198</span>
                       <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-wider">Days</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[100px] h-[115px] bg-[#DCE4FB] drop-shadow-sm relative transition-transform hover:-translate-y-1" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                       <span className="font-extrabold text-[#4C1D95] text-[28px] leading-none mb-1">14</span>
                       <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-wider">Hours</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[100px] h-[115px] bg-[#DCE4FB] drop-shadow-sm relative transition-transform hover:-translate-y-1" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                       <span className="font-extrabold text-[#4C1D95] text-[28px] leading-none mb-1">9</span>
                       <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-wider">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[100px] h-[115px] bg-[#DCE4FB] drop-shadow-sm relative transition-transform hover:-translate-y-1" style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                       <span className="font-extrabold text-[#4C1D95] text-[28px] leading-none mb-1">1</span>
                       <span className="text-[#6B7280] text-[11px] font-bold uppercase tracking-wider">Seconds</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <button 
                      onClick={() => navigate('/login', { state: { view: 'signup' } })}
                      className="text-white pl-7 pr-2 py-2.5 rounded-full font-medium transition-all flex items-center gap-4 text-[15px] shadow-lg shadow-purple-200 w-fit group"
                      style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)' }}
                    >
                      Sign Up Now
                      <span className="bg-white/20 rounded-full p-2.5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

            
        </div>

          
          
          {/* Background Decorations */}
          {/* Top right globe */}
          <div className="absolute top-[50%] right-[8%] text-[#A800B8] opacity-80">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <circle cx="12" cy="12" r="8" />
               <path d="M12 4v16M8 6a10 10 0 000 12M16 6a10 10 0 010 12" />
               <path d="M4 8l8-4 8 4-8 4-8-4z" />
               <path d="M4 8v4c0 2 3 4 8 4s8-2 8-4V8" />
               <path d="M7 3l5-3 5 3v3h-10z" /> {/* Hat approximation */}
             </svg>
          </div>
          {/* Bottom left robot */}
          <div className="absolute bottom-[10%] left-[8%] text-[#A800B8] opacity-70">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="currentColor">
              <path d="M30 60 L70 60 L80 40 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
              <rect x="35" y="25" width="30" height="25" rx="5" fill="currentColor" />
              <circle cx="45" cy="35" r="3" fill="white" />
              <circle cx="55" cy="35" r="3" fill="white" />
              <path d="M45 15 C45 5 55 5 55 15" stroke="currentColor" strokeWidth="3" fill="none" />
              <path d="M20 40 L30 80 L70 80 L80 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
              <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 mt-4 md:mt-8">
            
            {/* Header row */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              {/* Left side */}
              <div className="relative w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm relative">
                  Testimonials
                  {/* Confetti decoration */}
                  <div className="absolute -top-10 -right-8 text-[#A800B8] opacity-80">
                    <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 3v3m4-1l-2 2M7 5l2 2m-5 5h3m10 0h3" />
                    </svg>
                  </div>
                </div>
                <h2 className="font-dm-sans text-[34px] md:text-[42px] lg:text-[48px] font-extrabold text-[#050816] leading-[1.2]">
                  What<br />
                  Users Are <span className="relative inline-block" style={{ background: 'linear-gradient(180deg, #1F3799 0%, #9F18AC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Saying
                    <img src={line1} alt="underline" className="absolute -bottom-2 left-0 w-full" />
                  </span> About<br/>Lauratek
                </h2>
              </div>

              {/* Right side */}
              <div className="w-full md:w-1/2 flex flex-col md:items-end mt-6 md:mt-0">
                <p className="text-gray-500 text-sm md:text-[15px] max-w-[280px] md:text-left leading-relaxed mb-6 font-medium mr-auto md:mr-0 md:ml-auto">
                  Real learners, real results — here's what they're saying about learning with Lauratek.
                </p>
                
                {/* Carousel Controls Top Right */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
                        setIsTransitioning(false);
                      }, 300);
                    }} 
                    className="w-11 h-11 rounded-full border border-[#6D28D9] flex items-center justify-center text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-colors bg-transparent shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
                        setIsTransitioning(false);
                      }, 300);
                    }} 
                    className="w-11 h-11 rounded-full border border-[#6D28D9] flex items-center justify-center text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-colors bg-transparent shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              
              {[0, 1].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length;
                const testimonial = testimonials[index];
                return (
                  <div key={`${index}-${offset}`} className="relative">
                    {/* Giant Quote Background SVG */}
                    <div className="absolute top-0 left-0 w-full h-full text-[#F2F4F8] z-0 flex items-center justify-center -translate-y-4 scale-[1.3] pointer-events-none origin-top">
                      <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
                        <path d="M40 80 Q 40 40 80 40 L 90 40 L 90 90 L 60 90 Q 60 110 90 120 L 80 140 Q 40 120 40 80 Z M 120 80 Q 120 40 160 40 L 170 40 L 170 90 L 140 90 Q 140 110 170 120 L 160 140 Q 120 120 120 80 Z" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-4 sm:p-8">
                      {/* Stars */}
                      <div className="flex gap-1 text-[#FFB800] mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                      </div>
                      <p className="text-gray-600 font-medium text-[15px] leading-relaxed mb-8">
                        {testimonial.quote}
                      </p>
                      
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center overflow-hidden shadow-md">
                             <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[15px] text-gray-900">{testimonial.author}</h4>
                            <p className="text-gray-500 text-[13px] font-medium">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="h-10 w-[2px] bg-gray-200 mx-1"></div>
                        <div className="text-[#6D28D9]">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Carousel Dots */}
            <div className="flex justify-center mt-16 mb-4">
              <div className="bg-white rounded-full px-5 py-2.5 flex gap-2.5 shadow-sm border border-gray-100">
                {testimonials.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${currentIndex === i ? 'bg-[#6D28D9]' : 'bg-gray-300'}`}></div>
                ))}
              </div>
            </div>

          </div>
        
        </section>
    </>
  );
};

export default WorkshopTestimonialSection;
