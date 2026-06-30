import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Lock } from 'lucide-react';

interface CourseSidebarProps {
  course: any;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course }) => {
  const navigate = useNavigate();
  
  return (
        <div className="w-full lg:w-[380px] shrink-0 sticky top-6">
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
            {/* Course Video/Image Thumbnail */}
            <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-gray-900 mb-6 relative group cursor-pointer">
              <img src={course.image} alt="Course Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Included Tag */}
            <div className="flex items-center justify-center gap-2 bg-[#F0FDF4] text-[#16A34A] py-3 px-4 rounded-[12px] font-bold text-[14px] mb-8 border border-green-100">
              <Award className="w-5 h-5" /> Industry Certificate Included
            </div>

            {/* Course Specs */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Full Lifetime Access</span>
                <span className="font-bold text-slate-900">Unlimited</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Total Lessons</span>
                <span className="font-bold text-slate-900">{course.lessons}</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Live Sessions</span>
                <span className="font-bold text-slate-900">{course.lessons} Monthly</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Assignments</span>
                <span className="font-bold text-slate-900">24 Projects</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Community Access</span>
                <span className="font-bold text-slate-900">Included</span>
              </div>
            </div>

            {/* Enroll Button */}
            <button 
              onClick={() => navigate('/guest/contact')}
              className="w-full bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white font-bold py-4 rounded-[16px] transition-all shadow-md hover:shadow-lg text-[16px] mb-4"
            >
              Enroll Now — Unlock Full Access
            </button>
            
            <p className="text-center text-[13px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> 30-day money-back guarantee
            </p>
          </div>
        </div>
  );
};

export default CourseSidebar;
