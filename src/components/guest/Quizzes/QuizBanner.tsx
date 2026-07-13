import React from 'react';
import { ClipboardList, Target, TrendingUp } from 'lucide-react';
import guestquize from '@/assets/guestquize.png';
import carbonResult from '@/assets/carbon_result.png';
import streamlineProgress from '@/assets/streamline_progress.png';
import groupIcon from '@/assets/group_1000000970.png';

const QuizBanner: React.FC = () => {
  return (
      <div className="bg-[#F3EDFF] rounded-[24px] mb-6 px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row relative overflow-hidden shadow-guest">
        <div className="md:w-2/3 relative z-10">
          <p className="text-[#5B4FFF] font-bold text-lg mb-2">Level Your Learning</p>
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#1E293B] leading-tight">
            Practice Today
          </h2>
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#5B4FFF] leading-tight mb-2">
            Master Tomorrow!
          </h2>
          <p className="text-[#64748B] text-[15px] md:text-[16px] max-w-lg mb-6 leading-relaxed">
            Take quizzes challenge yourself and more closer to becoming a pro
          </p>
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-[64px] h-[64px] rounded-full bg-[#E8E2FF] flex items-center justify-center shrink-0">
                <img src={carbonResult} alt="Instant Results" className="w-[32px] h-[32px] object-contain" />
              </div>
              <span className="font-medium text-slate-800 text-[15px] tracking-wide">Instant Results</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[64px] h-[64px] rounded-full bg-[#E8E2FF] flex items-center justify-center shrink-0">
                <img src={streamlineProgress} alt="Track Progress" className="w-[32px] h-[32px] object-contain" />
              </div>
              <span className="font-medium text-slate-800 text-[15px] tracking-wide">Track Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[64px] h-[64px] rounded-full bg-[#E8E2FF] flex items-center justify-center shrink-0">
                <img src={groupIcon} alt="Improve Skills" className="w-[32px] h-[32px] object-contain" />
              </div>
              <span className="font-medium text-slate-800 text-[15px] tracking-wide">Improve Skills</span>
            </div>
          </div>
        </div>
        
        {/* 3D graphic image */}
        <div className="hidden md:flex absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 w-[40%] items-center justify-center pointer-events-none">
            <img src={guestquize} alt="Quiz Practice Graphic" className="w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-sm transform hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
  );
};

export default QuizBanner;
