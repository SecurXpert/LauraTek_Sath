import React from 'react';
import { Star, Users, PlayCircle } from 'lucide-react';
import learningImg from '@/assets/learning.png';

interface CourseInstructorTabProps {
  courseContent: any;
}

const CourseInstructorTab: React.FC<CourseInstructorTabProps> = ({ courseContent }) => {
  return (
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(149,157,165,0.05)] border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-[20px] overflow-hidden shrink-0 ring-4 ring-[#F4F1FF]">
                  <img src={learningImg} alt="Instructor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-1">{courseContent.instructor.name}</h3>
                  <p className="text-[15px] text-slate-500 font-medium mb-4">{courseContent.instructor.title}</p>
                  
                  <div className="flex flex-wrap gap-6 text-[14px] font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {courseContent.instructor.rating} Rating
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#5B4FFF]" /> {courseContent.instructor.students} Students
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-[#5B4FFF]" /> {courseContent.instructor.courses} Courses
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600">
                <p>
                  {courseContent.instructor.bio}
                </p>
              </div>
            </div>
  );
};

export default CourseInstructorTab;
