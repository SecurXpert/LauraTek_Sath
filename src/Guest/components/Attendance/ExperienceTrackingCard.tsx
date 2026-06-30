import React from 'react';
import { User, ArrowRightToLine, ArrowLeftFromLine, Clock } from 'lucide-react';
import guest11 from '../../../assets/guest11.png';

interface ExperienceTrackingCardProps {
  handleCheckIn: () => void;
  handleCheckOut: () => void;
  todaySession: string;
}

const ExperienceTrackingCard: React.FC<ExperienceTrackingCardProps> = ({ handleCheckIn, handleCheckOut, todaySession }) => {
  return (
    <div 
      className="bg-[#F4F1FF] p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row gap-6 md:items-center"
      style={{ width: '100%', height: 'auto', minHeight: '271px', borderRadius: '16.49px' }}
    >
      <div className="flex-1 z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#4A3AFF] flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-[#4A3AFF] text-xl font-bold">Experience Attendance Tracking</h3>
            <p className="text-[#6B7280] text-[14px]">Try the attendance experience, enroll in a course to track real attendance</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={handleCheckIn}
            className="flex items-center justify-center gap-2 bg-[#4A3AFF] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md">
            <ArrowRightToLine className="w-5 h-5" /> Check In
          </button>
          <button 
            onClick={handleCheckOut}
            className="flex items-center justify-center gap-2 bg-transparent text-[#4A3AFF] border border-[#4A3AFF] px-8 py-3 rounded-full font-semibold hover:bg-[#4A3AFF]/5 transition-colors">
            <ArrowLeftFromLine className="w-5 h-5" /> Check Out
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 flex items-center justify-between w-full max-w-[320px] shadow-sm">
          <div>
            <p className="text-gray-800 text-[13px] font-semibold mb-1">Today status</p>
            <p className="text-gray-600 font-medium text-[14px]">Learning Sessions : {todaySession}</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-[#4A3AFF] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#4A3AFF]" />
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex justify-end relative w-[160px] h-[154px] z-10" style={{ transform: 'translateY(-10px)' }}>
        <img src={guest11} alt="Calendar" className="w-full h-full object-contain drop-shadow-xl" />
      </div>
    </div>
  );
};

export default ExperienceTrackingCard;
