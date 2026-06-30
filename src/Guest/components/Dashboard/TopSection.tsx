import React from 'react';
import { ChevronRight, Target } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';
import guest1Img from "@/assets/guest1.png";

interface TopSectionProps {
  navigate: NavigateFunction;
}

const TopSection: React.FC<TopSectionProps> = ({ navigate }) => {
  return (
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 mb-6">
        {/* Purple Banner */}
        <div className="relative p-5 sm:p-6 lg:p-8 flex flex-col justify-center shrink-0 w-full xl:w-auto flex-[1.35] overflow-hidden" style={{ maxWidth: '815.15px', minHeight: '220px', borderRadius: '16.39px', opacity: 1, background: 'linear-gradient(66.15deg, #8548CA -5.25%, #8548CC 35.43%, #5D41F1 98.77%)' }}>
          <div className="relative z-10 w-full max-w-[60%] sm:max-w-[55%] lg:max-w-[340px]">
            <p className="text-white/80 font-medium mb-1 text-[11px] sm:text-[13px] lg:text-[18px]">Your Journey To excellence</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[48px] font-bold text-white mb-2 sm:mb-3 leading-[1.1] sm:leading-none">Starts Here</h2>
            <p className="text-white/80 text-[10px] sm:text-[12px] lg:text-[14px] mb-4 sm:mb-6 leading-relaxed max-w-[280px]">
              Explore World Class Courses, Attend Live Sessions Solve Real World Problems
            </p>
            <button 
              onClick={() => navigate('/guest/courses')}
              className="bg-white text-slate-900 font-bold px-3 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-[8px] lg:rounded-full flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors text-[11px] sm:text-[13px] lg:text-[15px] w-max shadow-sm"
            >
              Explore Courses <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
          
          <div className="absolute right-0 lg:right-4 bottom-0 z-20 pointer-events-none flex items-end justify-center">
             <img 
               src={guest1Img} 
               alt="Student" 
               className="object-contain object-bottom drop-shadow-[-10px_15px_30px_rgba(0,0,0,0.2)] w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[240px] 2xl:w-[280px] h-auto" 
             />
          </div>
        </div>
        
        {/* Daily Quiz Challenge */}
        <div className="bg-[#F3EFFF] p-5 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden shrink-0 w-full xl:w-auto flex-1" style={{ maxWidth: '605px', minHeight: '220px', borderRadius: '16.39px', opacity: 1 }}>
          <div className="relative z-10 flex flex-col gap-2 pr-[90px] sm:pr-[130px] lg:pr-[150px]">
             <div className="flex items-center gap-1.5 sm:gap-3 mb-1">
                <Target className="w-5 h-5 sm:w-7 sm:h-7 text-[#7B46F6]" />
                <h3 className="font-bold text-slate-800 text-[16px] sm:text-[22px] whitespace-nowrap">Daily Quiz Challenge</h3>
             </div>
             <p className="text-[#6B7089] text-[18px] sm:text-[24px] font-medium leading-[1.1] sm:leading-none">
               Challenge yourself daily<br/>& level up
             </p>
          </div>
          
          {/* Circle Progress */}
          <div className="absolute -right-4 sm:right-2 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] opacity-40 sm:opacity-100">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle className="text-[#E0D8FB] stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
              <circle className="text-[#9317B8] stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="83.73"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#8A38E8]">2/3</span>
            </div>
          </div>

          <div className="relative z-10 mt-6 sm:mt-0">
            <button 
              onClick={() => navigate('/guest/quizzes')}
              className="text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-[12px] flex items-center justify-between w-[130px] sm:w-[160px] lg:w-[180px] text-[13px] sm:text-[15px] lg:text-[16px] hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' }}
            >
              Start Quiz <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
  );
};

export default TopSection;
