import React from 'react';
import { Star, Clock, Users, BookOpen } from 'lucide-react';

interface CourseHeroBannerProps {
  course: any;
  courseContent: any;
}

const CourseHeroBanner: React.FC<CourseHeroBannerProps> = ({ course, courseContent }) => {
  return (
      <div 
        className="rounded-[24px] p-8 lg:p-12 mb-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)' }}
      >
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full border border-white/20 text-[13px] font-medium backdrop-blur-sm">
              {course.category || 'Development'}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#E0F2E9] text-[#16A34A] text-[13px] font-bold">
              2 Free Previews
            </span>
            <span className="px-4 py-1.5 rounded-full border border-white/20 text-[13px] font-medium backdrop-blur-sm bg-white/5">
              Bestseller
            </span>
          </div>

          <h1 className="text-[32px] lg:text-[42px] font-bold leading-tight mb-4">{course.title}</h1>
          <p className="text-[16px] lg:text-[18px] text-white/80 leading-relaxed mb-8 max-w-2xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-[14px] text-white/90">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-white">{course.rating}</span>
              <span className="text-white/70">({course.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> {courseContent.instructor.students} students
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {course.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> {course.lessons} lessons
            </div>
          </div>

          <div className="mt-6 text-[14px] text-white/80">
            Instructor: <span className="font-bold text-white">{courseContent.instructor.name}</span> • Last updated {course.updatedDate}
          </div>
        </div>
      </div>
  );
};

export default CourseHeroBanner;
