import React from 'react';
import { ClipboardList, Target, CheckCircle2 } from 'lucide-react';
import guestquize from '@/assets/guestquize.png';

const QuizBanner: React.FC = () => {
  return (
      <div className="bg-[#F3EDFF] rounded-[24px] mb-6 p-8 md:p-10 flex flex-col md:flex-row relative overflow-hidden shadow-sm">
        <div className="md:w-2/3 relative z-10">
          <p className="text-[#5B4FFF] font-bold text-lg mb-2">Level Your Learning</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1E293B] leading-tight">
            Practice Today
          </h2>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#5B4FFF] leading-tight mb-4">
            Master Tomorrow!
          </h2>
          <p className="text-[#64748B] text-[16px] md:text-[18px] max-w-lg mb-8 leading-relaxed">
            Take quizzes challenge yourself and more closer to becoming a pro
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-[#EAE2FF] px-5 py-2.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-transparent border border-[#5B4FFF]/20 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-[#5B4FFF]" />
              </div>
              <span className="font-semibold text-slate-800 text-[14px]">Instant Results</span>
            </div>
            <div className="flex items-center gap-3 bg-[#EAE2FF] px-5 py-2.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-transparent border border-[#5B4FFF]/20 flex items-center justify-center">
                <Target className="w-4 h-4 text-[#5B4FFF]" />
              </div>
              <span className="font-semibold text-slate-800 text-[14px]">Track Progress</span>
            </div>
            <div className="flex items-center gap-3 bg-[#EAE2FF] px-5 py-2.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-transparent border border-[#5B4FFF]/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#5B4FFF]" />
              </div>
              <span className="font-semibold text-slate-800 text-[14px]">Improve Skills</span>
            </div>
          </div>
        </div>
        
        {/* 3D graphic image */}
        <div className="hidden md:flex absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[40%] items-center justify-center pointer-events-none">
            <img src={guestquize} alt="Quiz Practice Graphic" className="w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
  );
};

export default QuizBanner;
