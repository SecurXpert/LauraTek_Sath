import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import uiuxImg from '@/assets/UIUX Developer.jpg';
import { getCourseContent } from '@/components/guest/CourseDetails/courseData';
import CourseHeroBanner from '@/components/guest/CourseDetails/CourseHeroBanner';
import CourseTabs from '@/components/guest/CourseDetails/CourseTabs';
import CourseOverviewTab from '@/components/guest/CourseDetails/CourseOverviewTab';
import CourseCurriculumTab from '@/components/guest/CourseDetails/CourseCurriculumTab';
import CourseInstructorTab from '@/components/guest/CourseDetails/CourseInstructorTab';
import CourseReviewsTab from '@/components/guest/CourseDetails/CourseReviewsTab';
import CourseSidebar from '@/components/guest/CourseDetails/CourseSidebar';

const GuestCourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const location = useLocation();
  const passedCourse = location.state?.course;

  const course = passedCourse ? {
    ...passedCourse,
    description: passedCourse.description || "Comprehensive online course to master the skills you need.",
    rating: passedCourse.rating || 4.8,
    reviewsCount: passedCourse.reviewsCount || "2,847",
    students: passedCourse.students || "12,438",
    duration: passedCourse.hours || "48 hours",
    lessons: passedCourse.lessons || 12,
    instructor: passedCourse.instructor_name || passedCourse.instructor || "Rahul Mehta",
    updatedDate: "Dec 2025",
    image: passedCourse.image || uiuxImg
  } : {
    title: "Full Stack Web Development Bootcamp",
    description: "Master modern web development from scratch — HTML, CSS, JavaScript, React, Node.js, and deployment. Build 12 real-world projects.",
    rating: 4.8,
    reviewsCount: "2,847",
    students: "12,438",
    duration: "48 hours",
    lessons: 12,
    instructor: "Rahul Mehta",
    updatedDate: "Dec 2025",
    image: uiuxImg
  };

  const tabs = ['Overview', 'Curriculum', 'Instructor', 'Reviews'];
  
  // Dynamically load content based on the course title/category
  const courseContent = getCourseContent(course.title, course.category || '');

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 pt-2 pb-8 lg:px-8 lg:pt-3 lg:pb-8 bg-[#F8F9FE] min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/guest/courses')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 font-medium text-[14px]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      {/* Hero Banner */}
      <CourseHeroBanner course={course} courseContent={courseContent} />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column */}
        <div className="flex-1 w-full min-w-0">
          {/* Tabs */}
          <CourseTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          {activeTab === 'Overview' && <CourseOverviewTab courseContent={courseContent} />}
          {activeTab === 'Curriculum' && <CourseCurriculumTab course={course} courseContent={courseContent} />}
          {activeTab === 'Instructor' && <CourseInstructorTab courseContent={courseContent} />}
          {activeTab === 'Reviews' && <CourseReviewsTab course={course} courseContent={courseContent} />}
        </div>

        {/* Right Sticky Sidebar */}
        <CourseSidebar course={course} courseContent={courseContent} />
      </div>
    </div>
  );
};

export default GuestCourseDetails;
