import React, { useState, useEffect } from 'react';
import { Camera, Edit2, Mail, Phone, MapPin, GraduationCap, BookOpen, Brain, Code, Award, Activity, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/instance';

const GuestProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featuredCourse, setFeaturedCourse] = useState<any>(null);
  const [latestQuiz, setLatestQuiz] = useState<any>(null);
  const [coursesCount, setCoursesCount] = useState(0);
  const [quizzesCount, setQuizzesCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/guest/my-profile');
        setProfile(response.data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedCourse = async () => {
      try {
        const response = await api.get('/admin/courses');
        if (response.data) {
          const courses = Array.isArray(response.data) ? response.data : response.data.courses || [];
          setCoursesCount(response.data.count || courses.length || 0);
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
          setQuizzesCount(response.data.count || quizzes.length || 0);
          if (quizzes.length > 0) {
            const sortedQuizzes = [...quizzes].sort((a: any, b: any) => b.id - a.id);
            setLatestQuiz(sortedQuizzes[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchProfile();
    fetchFeaturedCourse();
    fetchLatestQuiz();
  }, []);

  if (loading) {
    return (
      <div className="px-4 lg:px-8 py-8 w-full max-w-[1200px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#5B4FFF] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 lg:px-8 py-8 w-full max-w-[1200px] mx-auto text-center text-red-500">
        {error}
      </div>
    );
  }

  const joinDate = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
    : 'Unknown';

  const location = [profile?.city, profile?.state, profile?.country].filter(Boolean).join(', ') || 'Not specified';

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1600px] mx-auto">
      {/* Top Profile Banner Section */}
      <div className="bg-white rounded-[24px] overflow-hidden mb-8 p-6 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-guest border border-gray-100">
        <div className="relative shrink-0">
          <div className="w-[100px] h-[100px] rounded-[20px] bg-[#5B4FFF] shadow-guest border-4 border-white flex items-center justify-center text-white text-[42px] font-normal">
            {profile?.name ? profile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'AS'}
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-3">
            <h1 className="text-[22px] font-medium text-slate-900 m-0 leading-none">{profile?.name || 'Arjun Sharma'}</h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3.5 py-1 bg-[#FFF5D1] text-[#A57B1A] text-[13px] font-medium rounded-full">
                Guest Access
              </span>
              <span className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Joined {joinDate}
              </span>
            </div>
          </div>
          
          <p className="text-[14.5px] text-slate-500 leading-relaxed max-w-3xl m-0">
            Passionate learner exploring full-stack development and data science. Currently on guest access — looking to enroll soon!
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full xl:w-[340px] flex flex-col gap-6">
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-guest border border-gray-100">
            <h2 className="text-[18px] font-bold text-slate-800 mb-6">Personal Information</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Email</p>
                  <p className="text-[14px] font-medium text-slate-800">{profile?.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Phone</p>
                  <p className="text-[14px] font-medium text-slate-800">{profile?.phone || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Location</p>
                  <p className="text-[14px] font-medium text-slate-800">{location}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Education</p>
                  <p className="text-[14px] font-medium text-slate-800">{profile?.qualification || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Education Status</p>
                  <p className="text-[14px] font-medium text-slate-800">
                    {profile?.educational_status || 'N/A'} {profile?.passedout_year ? `(${profile.passedout_year})` : ''}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium mb-0.5">Interests</p>
                  <p className="text-[14px] font-medium text-slate-800">{profile?.interest || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Unlock Card */}
            <div className="mt-8 bg-[#EBE9FF] rounded-[16px] p-5">
              <h3 className="text-[14px] font-bold text-slate-800 mb-1">Unlock Full Access</h3>
              <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
                Get unlimited courses, live classes & certificates.
              </p>
              <button 
                onClick={() => navigate('/guest/contact')}
                className="w-full py-2.5 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white text-[13px] font-semibold rounded-full shadow-guest transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Learning Stats */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-guest border border-gray-100">
            <h2 className="text-[18px] font-bold text-slate-800 mb-6">Learning Stats</h2>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#F8FAFC] rounded-[16px] p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[18px] sm:text-[20px] font-bold text-slate-800 leading-tight">{coursesCount}</p>
                  <p className="text-[11px] sm:text-[13px] text-gray-500 font-medium">Total Courses</p>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-[16px] p-3 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[18px] sm:text-[20px] font-bold text-slate-800 leading-tight">{quizzesCount}</p>
                  <p className="text-[11px] sm:text-[13px] text-gray-500 font-medium">Total Quizzes</p>
                </div>
              </div>




            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-guest border border-gray-100 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-slate-800">Recent Activity</h2>
              {/* <span className="text-[13px] text-gray-500 font-medium">Last 7 days</span> */}
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors p-4 rounded-[16px] border border-gray-100/50">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[14.5px] font-medium text-slate-800 mb-0.5">Previewed {featuredCourse?.title || 'React Basics - Lesson 1'}</p>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                    {/* <Clock className="w-3.5 h-3.5" /> 2 hours ago */}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors p-4 rounded-[16px] border border-gray-100/50">
                <div className="w-10 h-10 rounded-full bg-[#F4F2FF] text-[#5B4FFF] flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[14.5px] font-medium text-slate-800 mb-0.5">Attempted {latestQuiz?.title || 'JavaScript Fundamentals'} Quiz</p>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                    {/* <Clock className="w-3.5 h-3.5" /> 1 day ago */}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestProfile;
