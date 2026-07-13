import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Lock } from 'lucide-react';
import defaultCert from '@/assets/certificate.jpg';
import pythonCert from '@/assets/pythoncertificate.jpg';
import reactCert from '@/assets/reactcertificate.jpg';
import sqlCert from '@/assets/sqlcertificate.jpg';
import uiuxCert from '@/assets/uiuxcertificate.jpg';
import daCert from '@/assets/dacertificate.jpg';
import javaCert from '@/assets/javacertificate.jpg';

interface CourseSidebarProps {
  course: any;
  courseContent: any;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course, courseContent }) => {
  const navigate = useNavigate();
  
  const title = course.title?.toLowerCase() || '';
  let certificateImg = defaultCert;
  
  if (title.includes('python')) certificateImg = pythonCert;
  else if (title.includes('react')) certificateImg = reactCert;
  else if (title.includes('sql')) certificateImg = sqlCert;
  else if (title.includes('ui/ux') || title.includes('uiux') || title.includes('ui ux')) certificateImg = uiuxCert;
  else if (title.includes('data analytics') || title.includes('data')) certificateImg = daCert;
  else if (title.includes('java')) certificateImg = javaCert;

  return (
        <div className="w-full lg:w-[380px] shrink-0 sticky top-6">
          <div 
            className="bg-white rounded-[24px] p-5 lg:p-6 border border-gray-100"
            style={{ boxShadow: '0px 10.05px 12.56px -7.54px #0000001A, 0px 25.12px 31.4px -6.28px #0000001A' }}
          >
            {/* Course Video/Image Thumbnail */}
            <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-gray-900 mb-5 relative group cursor-pointer shadow-guest">
              <img src={certificateImg} alt="Sample Certificate" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Included Tag */}
            <div className="flex items-center justify-center gap-2 bg-[#F0FDF4] text-[#16A34A] py-2.5 px-4 rounded-[12px] font-bold text-[13px] mb-6 border border-green-100">
              <Award className="w-4 h-4" /> Industry Certificate Included
            </div>

            {/* Course Specs */}
            <div className="space-y-3.5 mb-6">
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Full Lifetime Access</span>
                <span className="font-bold text-slate-900">Unlimited</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">Total Lessons</span>
                <span className="font-bold text-slate-900">{course.lessons}</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">{courseContent?.features[0]?.title || 'Live Sessions'}</span>
                <span className="font-bold text-slate-900">{courseContent?.features[0]?.desc || `${course.lessons} Monthly`}</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">{courseContent?.features[2]?.title || 'Assignments'}</span>
                <span className="font-bold text-slate-900">{courseContent?.features[2]?.desc || '24 Projects'}</span>
              </div>
              <div className="flex justify-between items-center text-[14.5px]">
                <span className="text-slate-500 font-medium">{courseContent?.features[1]?.title || 'Community Access'}</span>
                <span className="font-bold text-slate-900">{courseContent?.features[1]?.desc || 'Included'}</span>
              </div>
            </div>

            {/* Enroll Button */}
            <button 
              onClick={() => navigate('/guest/contact')}
              className="w-full bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white font-bold py-4 rounded-[16px] transition-all shadow-guest hover:shadow-guest text-[16px] mb-4"
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
