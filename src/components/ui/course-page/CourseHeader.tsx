import React from "react";
import { ArrowLeft, Star, Clock, Play, Clock3, Users, BookOpen, Award } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import bg1 from "@/assets/bg1.png";
import { Course, Instructor, CurriculumItem } from "./CourseTypes";

interface CourseHeaderProps {
  course: Course | null;
  instructor: Instructor | null;
  progressData: any;
  curriculum: CurriculumItem[];
  hasCertificate: boolean;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  instructor,
  progressData,
  curriculum,
  hasCertificate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinueLearning = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/recorded-classes`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const videosArray = Array.isArray(data) ? data : (data.data || []);
        const courseVideo = videosArray.find((video: any) => video.course_id === course?.course_id);
        if (courseVideo && (courseVideo.url || courseVideo.urll)) {
          const videoUrl = (courseVideo.url || courseVideo.urll || '').startsWith("http")
            ? (courseVideo.url || courseVideo.urll)
            : `${import.meta.env.VITE_API_URL}/${courseVideo.url || courseVideo.urll}`;
          window.open(videoUrl, '_blank');
        } else {
          alert("No recorded videos have been assigned to this course.");
        }
      }
    } catch (error) {
      console.error("Error fetching recorded classes:", error);
    }
  };

  return (
    <div 
      className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12 md:pb-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Back Button */}
      <button 
        onClick={() => {
          if (location.state?.from === 'dashboard') {
            navigate("/dashboard");
          } else {
            navigate("/mycourses");
          }
        }}
        className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        {location.state?.from === 'dashboard' ? 'Back to Dashboard' : 'Back to My Courses'}
      </button>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {course?.course_title || "Loading..."}
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base mb-6">
            {course?.description || ""}
          </p>

          {/* Instructor Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              {instructor?.profile_picture && !instructor.profile_picture.includes("unsplash.com") && !instructor.profile_picture.includes("dummy") && !instructor.profile_picture.includes("placeholder") ? (
                <img
                  src={instructor.profile_picture}
                  alt={instructor.name}
                  className="w-10 h-10 rounded-full border-2 border-white/30 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                  <div className="w-5 h-5 text-white/70 bg-gray-400 rounded-full flex items-center justify-center">U</div>
                </div>
              )}
              <div>
                <p className="text-white text-sm font-medium">{instructor?.name || "Instructor"}</p>
                <p className="text-white/50 text-xs">Instructor</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-medium">{instructor?.rating?.toFixed(1) || "0.0"}</span>
              <span className="text-white/50 text-sm">({instructor?.course_count || 0} courses)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-white text-sm">{course?.duration || 0} hours</span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold text-sm">Your Progress</p>
                <p className="text-white/50 text-xs mt-0.5">
                  {progressData?.completed_modules || 0} of {progressData?.total_modules || 0} modules completed
                </p>
              </div>
              <span className="text-white text-2xl font-bold">
                {progressData ? `${Math.round(progressData.completion_ratio)}%` : "0%"}
              </span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
                style={{ width: `${progressData?.completion_ratio || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Card - Resume Learning */}
        <div className="w-full lg:w-72 bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 -mx-5 -mt-5 px-5 py-3 rounded-t-2xl mb-4">
            <p className="text-white font-semibold text-sm">{course?.course_title || "Loading..."}</p>
            <p className="text-white/70 text-xs mt-1">{course?.description || ""}</p>
          </div>

          {/* Continue Button */}
          <button 
            onClick={handleContinueLearning}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow mb-4 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            Continue Learning
          </button>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <Clock3 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-gray-900 font-bold text-sm">{course?.duration || 0} hours</p>
              <p className="text-gray-400 text-xs">Duration</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-gray-900 font-bold text-sm">{instructor?.course_count || 0}</p>
              <p className="text-gray-400 text-xs">Courses</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-gray-900 font-bold text-sm">{curriculum.length}</p>
              <p className="text-gray-400 text-xs">Modules</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <Award className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-gray-900 font-bold text-sm">{hasCertificate ? "Yes" : "No"}</p>
              <p className="text-gray-400 text-xs">Certificate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
