import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Contactus from '@/components/ui/contactus';
import QuizBanner from '@/components/guest/Quizzes/QuizBanner';

export const getTechColor = (tech: string) => {
    switch(tech?.toUpperCase()) {
      case 'REACT': return "bg-[#1E293B] text-white";
      case 'JS': case 'JAVASCRIPT': return "bg-[#E2E8F0] text-gray-700";
      case 'TS': case 'TYPESCRIPT': return "bg-[#3B82F6] text-white";
      case 'PY': case 'PYTHON': return "bg-[#FEF08A] text-yellow-800";
      case 'SQL': return "bg-[#FDE68A] text-yellow-800";
      case 'CSS': return "bg-[#0284C7] text-white";
      default: return "bg-[#1E293B] text-white";
    }
};

export const getTopBorderColor = (tech: string) => {
    switch(tech?.toUpperCase()) {
      case 'REACT': return "bg-gradient-to-r from-cyan-400 to-blue-500";
      case 'JS': case 'JAVASCRIPT': return "bg-gradient-to-r from-yellow-300 to-orange-400";
      case 'TS': case 'TYPESCRIPT': return "bg-gradient-to-r from-blue-400 to-indigo-600";
      case 'PY': case 'PYTHON': return "bg-gradient-to-r from-yellow-200 to-yellow-500";
      case 'SQL': return "bg-gradient-to-r from-emerald-400 to-teal-500";
      case 'CSS': return "bg-gradient-to-r from-blue-300 to-blue-600";
      default: return "bg-gradient-to-r from-purple-400 to-indigo-500";
    }
};

export const getLevelColor = (level: string) => {
    switch(level?.toLowerCase()) {
      case 'beginner': return "bg-[#DCFCE7] text-[#16A34A]";
      case 'intermediate': return "bg-[#FFF4E5] text-[#FF9800]";
      case 'advanced': return "bg-[#FCE7F3] text-[#EC4899]";
      default: return "bg-[#DCFCE7] text-[#16A34A]";
    }
};
import QuizAlert from '@/components/guest/Quizzes/QuizAlert';
import QuizCard from '@/components/guest/Quizzes/QuizCard';
import QuizSidebar from '@/components/guest/Quizzes/QuizSidebar';
import QuizSuccessModal from '@/components/guest/Quizzes/QuizSuccessModal';
import { VITE_API_URL } from '@/services/api/api';

const GuestQuizzes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromDashboard = location.state?.fromDashboard;
  
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactOpen, setContactOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const itemsPerPage = 6;

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token') || '';
      const response = await fetch(`${VITE_API_URL}/guest/quizzes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const quizzesList = Array.isArray(data) ? data : (data.quizzes || []);
      
      if (Array.isArray(quizzesList)) {
        const mapped = quizzesList.map((item: any, index: number) => {
          const techStr = item.title || "Tech";
          const displayTech = techStr.length > 5 ? techStr.substring(0, 2).toUpperCase() : techStr;
          
          return {
            ...item,
            id: item.id || index,
            tech: displayTech,
            techColor: getTechColor(techStr),
            topBorderColor: getTopBorderColor(techStr),
            title: item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : "Practice Quiz",
            desc: item.description || "Test your knowledge and improve your skills with this assessment.",
            questions: item.questions || 20,
            time: item.timer ? `${item.timer} min` : "25 min",
            status: index < 2 ? "unlocked" : "locked",
            level: item.level || "Intermediate",
            levelColor: getLevelColor(item.level || "Intermediate"),
            xp: item.xp ? `+${item.xp} XP` : "+150 XP",
            tags: item.tags || [techStr, "Practice"]
          };
        });
        setQuizzes(mapped);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="px-4 lg:px-8 pt-0 pb-8 w-full max-w-[1400px] mx-auto min-h-screen bg-[#F8F9FB]">
      {/* Header Info */}
      <div className="mb-6">
        {fromDashboard && (
          <button 
            onClick={() => navigate('/guest')}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#5B4FFF] mb-4 transition-colors text-[14px] font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        )}
        <h1 className="text-[24px] font-bold text-slate-800 mb-1">Quizzes & Assessments</h1>
        <p className="text-[14px] text-gray-500">Test your knowledge with practice assessments</p>
      </div>

      {/* Main Banner */}
      <QuizBanner />

      {/* Alert Box - Persistently displayed */}
      <QuizAlert onEnrollClick={() => setContactOpen(true)} />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Quiz Library - Left Column */}
        <div className="xl:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-bold text-slate-800">Quiz Library</h2>
              <p className="text-[13px] text-gray-500">
                {quizzes.length} quizzes across {new Set(quizzes.map(q => q.title)).size} technologies
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizzes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((quiz) => (
              <QuizCard 
                key={quiz.id} 
                quiz={quiz} 
                isUnlocked={isUnlocked} 
                onEnrollClick={() => setContactOpen(true)} 
                navigate={navigate} 
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {Math.ceil(quizzes.length / itemsPerPage) > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 mb-6">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 h-10 rounded-full flex items-center gap-1 border border-gray-200 text-gray-600 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-guest"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#5B4FFF] text-white shadow-guest">
                {currentPage}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(quizzes.length / itemsPerPage)))}
                disabled={currentPage === Math.ceil(quizzes.length / itemsPerPage)}
                className="px-4 h-10 rounded-full flex items-center gap-1 border border-gray-200 text-gray-600 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-guest"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar - Right Column */}
        <QuizSidebar navigate={navigate} onEnrollClick={() => setContactOpen(true)} />

      </div>

      <Contactus 
        open={contactOpen} 
        setOpen={setContactOpen} 
        onSuccess={() => {
          setIsUnlocked(true);
          setShowSuccessModal(true);
        }} 
      />

      <QuizSuccessModal 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
};

export default GuestQuizzes;
