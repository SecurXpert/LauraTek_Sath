import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import guest10 from '../../../assets/guest10.png';

interface UnlockFeaturesCardProps {
  setContactOpen: (open: boolean) => void;
}

const UnlockFeaturesCard: React.FC<UnlockFeaturesCardProps> = ({ setContactOpen }) => {
  return (
    <div className="bg-[#F4F1FF] rounded-[24px] p-6 lg:p-8 flex flex-col relative overflow-hidden h-full">
      <h2 className="text-[26px] font-extrabold text-slate-900 mb-1 leading-tight tracking-tight">Unlock Full</h2>
      <h2 className="text-[26px] font-extrabold text-[#4A3AFF] mb-3 leading-tight tracking-tight">Attendance Tracking</h2>
      
      <p className="text-[#6B7280] text-[14px] font-medium mb-6 max-w-[240px] leading-relaxed">
        Enroll in a course to access complete attendance features
      </p>
      
      <ul className="space-y-4 z-10 flex-grow">
        {[
          "Track daily attendance",
          "Monitor Learning Hours",
          "Join Live Classes",
          "Download Attendance Reports",
          "Get Certificate of completion"
        ].map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full bg-[#4A3AFF] flex items-center justify-center shrink-0">
              <Check className="w-[10px] h-[10px] text-white stroke-[3px]" />
            </div>
            <span className="text-slate-700 text-[14px] font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="w-[160px] h-[160px] self-center my-6 pointer-events-none">
        <img src={guest10} alt="Unlock Features" className="w-full h-full object-contain drop-shadow-sm" />
      </div>

      <div className="mt-auto flex flex-col gap-4 z-10">
        <button 
          onClick={() => setContactOpen(true)}
          className="w-full bg-[#4A3AFF] text-white py-[14px] rounded-[14px] font-semibold text-[16px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          Enroll Now <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
        </button>
        <p className="text-center text-slate-600 text-[14px] font-medium">
          Start Learning Stay Consistent, Achieve More
        </p>
      </div>
    </div>
  );
};

export default UnlockFeaturesCard;
