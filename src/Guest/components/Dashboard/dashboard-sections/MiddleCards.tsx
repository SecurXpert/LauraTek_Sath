import React from 'react';
import { Calendar, Clock, ChevronRight, User } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';
import liveClassImg from "@/assets/online1.png";
import discussionImg from "@/assets/discussion room.png";
import quizTrophyImg from "@/assets/guestquize.png";

interface MiddleCardsProps {
  navigate: NavigateFunction;
  upcomingLiveClass: any;
  featuredCourse: any;
  latestQuiz: any;
  currentQuote: string;
}

export const MiddleCards: React.FC<MiddleCardsProps> = ({ 
  navigate, 
  upcomingLiveClass, 
  featuredCourse, 
  latestQuiz, 
  currentQuote 
}) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mb-4">
        {/* Upcoming live classes */}
        <div className="relative overflow-hidden bg-slate-900 group flex flex-col mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          {upcomingLiveClass && (
            <img src={upcomingLiveClass.image || liveClassImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
          
          <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-auto">
               <span className="text-white/90 text-[11px] font-medium">Upcoming live classes</span>
               <span className="bg-[#FF3B30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-guest">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg> Live
               </span>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-[22px] mb-3 leading-tight">Java Script<br/>for Beginners</h3>
              <div className="flex items-center gap-2 text-white/80 text-[11px] mb-1.5">
                 <Calendar className="w-3.5 h-3.5" /> Today 6 PM (IST)
              </div>
              <div className="flex items-center gap-2 text-white/80 text-[11px] mb-3">
                 <Clock className="w-3.5 h-3.5" /> Duration 3 hours
              </div>
              
              <div className="flex items-center gap-2.5 mb-4">
                 <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white/20">
                    <img src="/assets/placeholder.jpg" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <p className="text-[9px] text-white/70">Instructor</p>
                    <p className="text-[10px] text-white font-semibold">John Doe (SR. Developer)</p>
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/contact', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Join Class now <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white group flex flex-col mx-auto w-full min-h-[200px] lg:h-full border border-gray-100 shadow-guest" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          {featuredCourse && (
            <img src={featuredCourse.image || discussionImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
          
          <div className="relative z-10 p-5 flex flex-col h-full bg-gradient-to-t from-white/90 via-white/40 to-white/10">
            <div className="mb-auto">
               <span className="text-slate-800 text-[11px] font-bold bg-white/80 px-2.5 py-1 rounded-md shadow-guest">Featured Course</span>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-slate-900 font-bold text-[22px] mb-2 leading-tight line-clamp-2 drop-shadow-sm" title={featuredCourse?.title}>
                {featuredCourse?.title || "Full Stack Developer"}
              </h3>
              <span className="inline-block bg-[#00A962] text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-4 shadow-guest">
                 Top Selling Course
              </span>
              
              <div className="flex items-center gap-5 text-slate-800 font-semibold text-[11px] mb-4 drop-shadow-sm">
                 <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {featuredCourse?.level || "Beginner"}
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/courses', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Explore Courses Now <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiz Challenge */}
        <div className="relative overflow-hidden bg-[#0F0C29] group flex flex-col mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="mb-1">
               <span className="text-white/90 text-[11px] font-medium">Quiz Challenge</span>
            </div>
            
            <h3 className="text-white font-bold text-[22px] leading-tight mb-2 line-clamp-2" title={latestQuiz?.title}>
              {latestQuiz?.title || "Test Your Knowledge"}
            </h3>
            
            <div className="flex-1 flex justify-center items-center my-1 relative">
               <div className="w-[120px] h-[100px] relative z-10 flex items-center justify-center">
                 <img src={quizTrophyImg} alt="Quiz Image" className="w-full h-full object-contain" />
               </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-white/80 text-[11px] mb-4">
                 <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {latestQuiz?.timer || 5} MIN
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/quizzes', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Start Quiz <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Learning Tip */}
        <div className="p-5 lg:p-6 flex flex-col shadow-guest relative overflow-hidden mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px', background: 'linear-gradient(180deg, #E7E8F9 0%, #EDE3F6 100%)' }}>
           <h3 className="text-[#7B46F6] font-bold text-[13px] sm:text-[14px] mb-3">Daily Learning Tip</h3>
           <div className="text-[#7B46F6] text-[40px] sm:text-[48px] font-serif leading-[0.5] mb-4 mt-2 font-bold tracking-[-6px]">“</div>
           <p className="text-slate-800 text-[15px] font-semibold leading-relaxed tracking-tight line-clamp-6">
             {currentQuote}
           </p>
        </div>
      </div>
  );
};
