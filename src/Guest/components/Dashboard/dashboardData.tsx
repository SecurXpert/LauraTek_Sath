import React from 'react';
import { X, Calendar, Clock, ChevronRight, User, Target } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

import student1 from "@/assets/15.png";
import student2 from "@/assets/srinidhi.png";
import student3 from "@/assets/instructor1.png";
import student4 from "@/assets/instructor2.png";
import student5 from "@/assets/trainer1.jpg";
import student6 from "@/assets/trainer2.jpg";
import guest1Img from "@/assets/guest1.png";
import guest2Img from "@/assets/guest2.png";
import guest8Img from "@/assets/guest8.png";
import logoImg from "@/assets/logo.png";
import liveClassImg from "@/assets/online1.png";
import discussionImg from "@/assets/discussion room.png";
import quizTrophyImg from "@/assets/guestquize.png";

export const dailyQuotes = [
  "The beautiful thing about learning is that no one can take it away from you.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "Anyone who stops learning is old, whether at twenty or eighty.",
  "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
  "Continuous learning is the minimum requirement for success in any field.",
  "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  "Every student can learn, just not on the same day, or the same way.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
  "The expert in anything was once a beginner.",
  "I am always doing that which I cannot do, in order that I may learn how to do it.",
  "Don't let what you cannot do interfere with what you can do.",
  "There are no shortcuts to any place worth going.",
  "Motivation is what gets you started. Habit is what keeps you going."
];

export const successStoriesData = [
  {
    name: "Amgothu sai naik",
    role: "DATA ANALYST",
    image: student1,
    quote: "A Data Analyst transforms raw data into clear, meaningful insights that support business decisions. They collect, clean, and analyze datasets to identify patterns, trends, and performance metrics."
  },
  {
    name: "Jatavath sandeep",
    role: "DATA ANALYST",
    image: student2,
    quote: "Data Analyst helps organizations solve problems, improve processes, and make data-driven decisions that lead to growth and efficiency."
  },
  {
    name: "Ajay Angadi",
    role: "Java Frontend",
    image: student3,
    quote: "Their role involves integrating UI with backend APIs, optimizing performance, and ensuring a seamless user experience. Strong skills in HTML, CSS, JavaScript, and Java frameworks help them deliver clean, efficient, and scalable frontend solutions."
  },
  {
    name: "PITLA HARINDRA NAIDU",
    role: "DATA ANALYST",
    image: student4,
    quote: "They collect, clean, and analyze datasets to identify patterns, trends, and performance metrics. Using tools like Excel, SQL, Python, and visualization platforms, a Data Analyst helps organizations solve problems."
  },
  {
    name: "Sri Ram Degari",
    role: "DATA ANALYST",
    image: student5,
    quote: "A Data Analyst transforms raw data into meaningful insights by analyzing patterns, preparing dashboards, and generating actionable reports. They collaborate with management teams to support decision-making and improve business outcomes."
  },
  {
    name: "Shiva Krishna Yara",
    role: "Java Frontend",
    image: student6,
    quote: "A Java Frontend Developer builds the user interface of applications using Java-based technologies like JavaFX, JSP, and servlets. They focus on creating interactive, responsive, and user-friendly screens that connect smoothly with backend services."
  }
];

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] w-full max-w-[1000px] flex flex-col md:flex-row overflow-hidden relative shadow-guest animate-in fade-in zoom-in duration-300">
            <button 
              onClick={onClose} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-10 bg-white/50 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Left Side: Illustration */}
            <div className="w-full md:w-1/2 bg-[#F4F6FF] flex items-center justify-center p-8 lg:p-12">
               <img src={guest2Img} alt="Sign Up" className="w-full max-w-sm object-contain drop-shadow-sm" />
            </div>
            
            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 lg:p-10 flex flex-col items-center overflow-y-auto max-h-[90vh]">
               {/* Logo */}
               <div className="mb-2">
                  <img src={logoImg} alt="Lauratek" className="h-14 object-contain" />
               </div>
               <h2 className="text-[22px] font-bold text-slate-800 mb-8">Contact Us</h2>
               
               <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your full name" className="w-full border border-blue-600 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-guest" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Enter your email address" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Country <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your country" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Mobile <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter 10-digit mobile number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Qualification <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: B.Tech, B.Sc, MCA" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Year of Passed Out <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: 2022" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Interest <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: Web Development, Data Science" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">State <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your state" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your city" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Description</label>
                    <textarea rows={3} placeholder="Tell us about your background and interests (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                 </div>
                 
                 <div className="col-span-1 md:col-span-2 mt-2">
                    <button type="button" className="w-full bg-[#111827] hover:bg-black text-white font-bold py-3.5 rounded-lg transition-colors text-[14px]">
                      Send Message
                    </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
  );
};

export const LearningJourney: React.FC = () => {
  return (
      <div className="rounded-[24px] px-6 pt-3 pb-4 lg:px-10 lg:pt-5 lg:pb-6 shadow-guest overflow-hidden mb-4 w-full mx-auto border border-gray-100" style={{ maxWidth: '1446px', background: 'linear-gradient(180deg, #E7E8F9 0%, #EDE3F6 100%)' }}>
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

interface MiddleCardsProps {
  navigate: NavigateFunction;
  upcomingLiveClass: any;
  featuredCourse: any;
  latestQuiz: any;
  currentQuote: string;
}

export const MiddleCards: React.FC<MiddleCardsProps> = ({ 
  navigate, 
  upcomingLiveClass, 
  featuredCourse, 
  latestQuiz, 
  currentQuote 
}) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mb-4">
        {/* Upcoming live classes */}
        <div className="relative overflow-hidden bg-slate-900 group flex flex-col mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          {upcomingLiveClass && (
            <img src={upcomingLiveClass.image || liveClassImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
          
          <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-auto">
               <span className="text-white/90 text-[11px] font-medium">Upcoming live classes</span>
               <span className="bg-[#FF3B30] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-guest">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                 </svg> Live
               </span>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-[22px] mb-3 leading-tight">Java Script<br/>for Beginners</h3>
              <div className="flex items-center gap-2 text-white/80 text-[11px] mb-1.5">
                 <Calendar className="w-3.5 h-3.5" /> Today 6 PM (IST)
              </div>
              <div className="flex items-center gap-2 text-white/80 text-[11px] mb-3">
                 <Clock className="w-3.5 h-3.5" /> Duration 3 hours
              </div>
              
              <div className="flex items-center gap-2.5 mb-4">
                 <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden border border-white/20">
                    <img src="/assets/placeholder.jpg" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <p className="text-[9px] text-white/70">Instructor</p>
                    <p className="text-[10px] text-white font-semibold">John Doe (SR. Developer)</p>
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/contact', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Join Class now <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white group flex flex-col mx-auto w-full min-h-[200px] lg:h-full border border-gray-100 shadow-guest" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          {featuredCourse && (
            <img src={featuredCourse.image || discussionImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
          
          <div className="relative z-10 p-5 flex flex-col h-full bg-gradient-to-t from-white/90 via-white/40 to-white/10">
            <div className="mb-auto">
               <span className="text-slate-800 text-[11px] font-bold bg-white/80 px-2.5 py-1 rounded-md shadow-guest">Featured Course</span>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-slate-900 font-bold text-[22px] mb-2 leading-tight line-clamp-2 drop-shadow-sm" title={featuredCourse?.title}>
                {featuredCourse?.title || "Full Stack Developer"}
              </h3>
              <span className="inline-block bg-[#00A962] text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-4 shadow-guest">
                 Top Selling Course
              </span>
              
              <div className="flex items-center gap-5 text-slate-800 font-semibold text-[11px] mb-4 drop-shadow-sm">
                 <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {featuredCourse?.level || "Beginner"}
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/courses', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Explore Courses Now <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiz Challenge */}
        <div className="relative overflow-hidden bg-[#0F0C29] group flex flex-col mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px' }}>
          <div className="relative z-10 p-5 flex flex-col h-full">
            <div className="mb-1">
               <span className="text-white/90 text-[11px] font-medium">Quiz Challenge</span>
            </div>
            
            <h3 className="text-white font-bold text-[22px] leading-tight mb-2 line-clamp-2" title={latestQuiz?.title}>
              {latestQuiz?.title || "Test Your Knowledge"}
            </h3>
            
            <div className="flex-1 flex justify-center items-center my-1 relative">
               <div className="w-[120px] h-[100px] relative z-10 flex items-center justify-center">
                 <img src={quizTrophyImg} alt="Quiz Image" className="w-full h-full object-contain" />
               </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-white/80 text-[11px] mb-4">
                 <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {latestQuiz?.timer || 5} MIN
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/guest/quizzes', { state: { fromDashboard: true } })}
                className="w-full mx-auto text-white text-[13px] font-bold flex items-center justify-between px-5 transition-opacity hover:opacity-90 shadow-guest"
                style={{ 
                  width: '100%', 
                  maxWidth: '314.4px', 
                  height: '42px', 
                  borderRadius: '17.87px', 
                  background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' 
                }}
              >
                Start Quiz <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Learning Tip */}
        <div className="p-5 lg:p-6 flex flex-col shadow-guest relative overflow-hidden mx-auto w-full min-h-[200px] lg:h-full" style={{ maxWidth: '348.13px', borderRadius: '13.89px', background: 'linear-gradient(180deg, #E7E8F9 0%, #EDE3F6 100%)' }}>
           <h3 className="text-[#7B46F6] font-bold text-[13px] sm:text-[14px] mb-3">Daily Learning Tip</h3>
           <div className="text-[#7B46F6] text-[40px] sm:text-[48px] font-serif leading-[0.5] mb-4 mt-2 font-bold tracking-[-6px]">“</div>
           <p className="text-slate-800 text-[15px] font-semibold leading-relaxed tracking-tight line-clamp-6">
             {currentQuote}
           </p>
        </div>
      </div>
  );
};

interface SuccessStoriesProps {
  currentStoryIndex: number;
  handlePrevStory: () => void;
  handleNextStory: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ 
  currentStoryIndex, 
  handlePrevStory, 
  handleNextStory 
}) => {
  return (
      <div 
        className="rounded-[24px] px-6 pt-4 pb-5 lg:px-10 lg:pt-5 lg:pb-6 mt-0 w-full shadow-guest"
        style={{ background: 'linear-gradient(180deg, #E7E7F9 0%, #EDE3F6 100%)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[22px] lg:text-[26px] font-bold text-slate-900">Success Stories</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrevStory}
              className="w-8 h-8 rounded-full bg-[#7B46F6] text-white flex items-center justify-center hover:bg-[#6035EE] transition-colors shadow-guest"
            >
              <ChevronRight className="w-4 h-4 rotate-180 -ml-0.5 stroke-[2.5]" />
            </button>
            <button 
              onClick={handleNextStory}
              className="w-8 h-8 rounded-full bg-[#7B46F6] text-white flex items-center justify-center hover:bg-[#6035EE] transition-colors shadow-guest"
            >
              <ChevronRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((offset) => {
            const index = (currentStoryIndex + offset) % successStoriesData.length;
            const story = successStoriesData[index];
            return (
              <div key={index} className="bg-white rounded-[24px] p-8 shadow-guest flex flex-col relative overflow-hidden min-h-[260px]">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 ring-2 ring-[#F4F1FF]">
                    <img src={story.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-[16px] leading-tight">{story.name}</h4>
                    <p className="text-slate-500 text-[14px] font-medium">{story.role}</p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10 pr-2 sm:pr-4">
                  <div className="text-[#7B46F6] text-[40px] sm:text-[50px] font-serif leading-[0.8] shrink-0 font-bold mt-1">“</div>
                  <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed">
                    {story.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

interface TopSectionProps {
  navigate: NavigateFunction;
}

export const TopSection: React.FC<TopSectionProps> = ({ navigate }) => {
  return (
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 mb-6">
        {/* Purple Banner */}
        <div className="relative p-5 lg:p-6 flex flex-col justify-center shrink-0 w-full xl:w-auto flex-[1.35] overflow-visible" style={{ maxWidth: '815.15px', minHeight: '180px', borderRadius: '16.39px', opacity: 1, background: 'linear-gradient(66.15deg, #8548CA -5.25%, #8548CC 35.43%, #5D41F1 98.77%)' }}>
          <div className="relative z-10 w-full max-w-[60%] sm:max-w-[55%] lg:max-w-[340px]">
            <p className="text-white/80 font-medium mb-1 text-[11px] sm:text-[13px] lg:text-[18px]">Your Journey To excellence</p>
            <h2 className="text-[24px] sm:text-[28px] md:text-[40px] lg:text-[48px] font-bold text-white mb-2 sm:mb-3 leading-[1.1] sm:leading-none">Starts Here</h2>
            <p className="text-white/80 text-[10px] sm:text-[12px] lg:text-[14px] mb-4 sm:mb-6 leading-relaxed max-w-[280px]">
              Explore World Class Courses, Attend Live Sessions Solve Real World Problems
            </p>
            <button 
              onClick={() => navigate('/guest/courses', { state: { fromDashboard: true } })}
              className="bg-white text-slate-900 font-bold px-3 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-[8px] lg:rounded-full flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors text-[11px] sm:text-[13px] lg:text-[15px] w-max shadow-guest"
            >
              Explore Courses <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
          
          <div className="absolute right-0 lg:right-6 bottom-0 z-20 pointer-events-none flex items-end justify-center h-[115%]">
             <img 
               src={guest1Img} 
               alt="Student" 
               className="object-contain object-bottom drop-shadow-sm h-full w-auto" 
             />
          </div>
        </div>
        
        {/* Daily Quiz Challenge */}
        <div className="bg-[#F3EFFF] p-5 lg:p-6 flex flex-col justify-between relative overflow-hidden shrink-0 w-full xl:w-auto flex-1" style={{ maxWidth: '605px', minHeight: '180px', borderRadius: '16.39px', opacity: 1 }}>
          <div className="relative z-10 flex flex-col gap-2 pr-[90px] sm:pr-[130px] lg:pr-[150px]">
             <div className="flex items-center gap-1.5 sm:gap-3 mb-1">
                <div className="relative flex items-center justify-center shrink-0">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6 sm:w-[32px] sm:h-[32px]"
                    strokeWidth="2.5"
                  >
                    <defs>
                      <linearGradient id="quizLogoGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8146C6" />
                        <stop offset="100%" stopColor="#8146C5" />
                      </linearGradient>
                    </defs>
                    <g stroke="url(#quizLogoGradient)">
                      <path d="M22 12 A10 10 0 1 1 15.5 2.6" />
                      <path d="M17 12 A5 5 0 1 1 13.5 7.2" />
                      <polyline points="23 3 12 14 8 10" />
                    </g>
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800 text-[16px] sm:text-[22px] whitespace-nowrap tracking-tight">Daily Quiz Challenge</h3>
             </div>
             <p className="text-[#6B7089] text-[18px] sm:text-[24px] font-medium leading-[1.1] sm:leading-none">
               Challenge yourself daily<br/>& level up
             </p>
          </div>
          
          {/* Circle Progress */}
          <div className="absolute -right-4 sm:right-2 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] opacity-40 sm:opacity-100">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle className="text-[#E0D8FB] stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
              <circle className="text-[#9317B8] stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="83.73"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#8A38E8]">2/3</span>
            </div>
          </div>

          <div className="relative z-10 mt-6 sm:mt-0">
            <button 
              onClick={() => navigate('/guest/quizzes', { state: { fromDashboard: true } })}
              className="text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-[12px] flex items-center justify-between w-[130px] sm:w-[160px] lg:w-[180px] text-[13px] sm:text-[15px] lg:text-[16px] hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #3D5EEB 0%, #9317B8 100%)' }}
            >
              Start Quiz <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
  );
};
