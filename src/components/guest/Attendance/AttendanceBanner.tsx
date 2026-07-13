import React from 'react';

const AttendanceBanner = () => {
  return (
    <div className="bg-[#F4F1FF] rounded-[24px] mb-6 flex flex-col md:flex-row overflow-hidden relative md:h-[220px] lg:h-[240px]">
      <div className="py-6 md:py-0 pl-8 md:pl-10 lg:pl-12 flex-1 flex flex-col justify-center z-10">
        <h3 className="font-semibold text-[16px] lg:text-[18px] mb-2 text-[#5B4FFF]">Attendance Preview</h3>
        <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1E1E1E] leading-none mb-1">
          Experience Smart
        </h2>
        <h2 className="text-[32px] lg:text-[40px] font-bold leading-none mb-3 text-[#5B4FFF]">
          Attendance Tracking
        </h2>
        <p className="text-[#88909F] font-medium text-[16px] lg:text-[18px] max-w-lg leading-[1.6]">
          Get accurate attendance records for live classes and track your learning journey with ease
        </p>
      </div>
      <div className="md:w-[45%] lg:w-[50%] h-[250px] md:h-full relative">
        <div className="absolute inset-0 bg-[#F4F1FF]"></div>
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Student studying" 
          className="w-full h-full object-cover rounded-tl-[80px] rounded-bl-none z-10 relative"
        />
      </div>
    </div>
  );
};

export default AttendanceBanner;
