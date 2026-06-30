import React from 'react';
import guest8Img from "@/assets/guest8.png";

const LearningJourney: React.FC = () => {
  return (
      <div className="rounded-[24px] px-6 pt-3 pb-4 lg:px-10 lg:pt-5 lg:pb-6 shadow-sm overflow-hidden mb-4 w-full mx-auto border border-gray-100" style={{ maxWidth: '1446px', background: 'linear-gradient(180deg, #E7E8F9 0%, #EDE3F6 100%)' }}>
         <h3 className="text-[#5B4FFF] font-bold text-[18px] mb-2">Your Learning Journey</h3>
         <p className="text-slate-600 text-[14px] mb-6 font-medium">Follow these simple steps to achieve your goals</p>
         
         <div className="w-full overflow-x-auto pb-0">
            <div className="min-w-[800px]">
               <img src={guest8Img} alt="Learning Journey Steps" className="w-full h-auto block" />
            </div>
         </div>
      </div>
  );
};

export default LearningJourney;
