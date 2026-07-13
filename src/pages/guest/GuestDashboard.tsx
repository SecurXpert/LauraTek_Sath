import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/instance";
import { 
  TopSection, 
  MiddleCards, 
  LearningJourney, 
  SuccessStories, 
  EnrollModal, 
  dailyQuotes, 
  successStoriesData 
} from "@/components/guest/Dashboard/dashboardData.tsx";

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("user_name") || "vamshi");
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [featuredCourse, setFeaturedCourse] = useState<any>(null);
  const [upcomingLiveClass, setUpcomingLiveClass] = useState<any>(null);
  const [latestQuiz, setLatestQuiz] = useState<any>(null);

  const currentQuote = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dailyQuotes[dayOfYear % dailyQuotes.length];
  }, []);

  const handleNextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % successStoriesData.length);
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + successStoriesData.length) % successStoriesData.length);
  };

  useEffect(() => {
    const fetchFeaturedCourse = async () => {
      try {
        const response = await api.get('/admin/courses');
        if (response.data) {
          const courses = Array.isArray(response.data) ? response.data : response.data.courses || [];
          if (courses.length > 0) {
            const sortedCourses = [...courses].sort((a: any, b: any) => b.id - a.id);
            setFeaturedCourse(sortedCourses[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    const fetchLatestQuiz = async () => {
      try {
        const response = await api.get('/guest/quizzes');
        if (response.data) {
          const quizzes = Array.isArray(response.data) ? response.data : response.data.quizzes || [];
          if (quizzes.length > 0) {
            const sortedQuizzes = [...quizzes].sort((a: any, b: any) => b.id - a.id);
            setLatestQuiz(sortedQuizzes[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchFeaturedCourse();
    fetchLatestQuiz();
  }, []);

  return (
    <div className="px-3 sm:px-4 lg:px-8 pb-8 w-full max-w-[1600px] mx-auto mt-2 overflow-hidden">
      <h1 className="flex items-end gap-2 sm:gap-3 text-slate-800 mb-4 lg:mb-6">
        <span className="text-[22px] sm:text-[28px] font-medium leading-none">Good Morning</span> 
        <span className="text-[#5B4FFF] text-[28px] sm:text-[36px] font-extrabold capitalize leading-none">{userName}</span>
      </h1>
      
      {/* Top Section */}
      <TopSection navigate={navigate} />

      {/* Middle Cards Section */}
      <MiddleCards 
        navigate={navigate} 
        upcomingLiveClass={upcomingLiveClass}
        featuredCourse={featuredCourse}
        latestQuiz={latestQuiz}
        currentQuote={currentQuote}
      />

      {/* Learning Journey */}
      <LearningJourney />

      {/* Success Stories Full Width Row */}
      <SuccessStories 
        currentStoryIndex={currentStoryIndex}
        handlePrevStory={handlePrevStory}
        handleNextStory={handleNextStory}
      />

      {/* Enroll / Contact Us Modal */}
      <EnrollModal 
        isOpen={isEnrollModalOpen} 
        onClose={() => setIsEnrollModalOpen(false)} 
      />
    </div>
  );
};

export default GuestDashboard;
