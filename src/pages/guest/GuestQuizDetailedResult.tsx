import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Trophy, Target, CheckCircle2, Clock, XCircle, Zap, Star, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VITE_API_URL } from '@/services/api/api';

const GuestQuizDetailedResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || { score: 80, time_taken: 1920 };
  const quizTitle = location.state?.quizTitle || 'JavaScript Fundamentals';
  
  const scoreValue = result.score !== undefined ? result.score : 80;
  const timeTakenSecs = result.time_taken || 0;
  const timeStr = timeTakenSecs < 60 ? `${timeTakenSecs} sec` : `${Math.ceil(timeTakenSecs / 60)} min`;
  
  const circleOffset = 283 - (283 * scoreValue / 100);

  const [questions, setQuestions] = useState<any[]>([]);
  const quizId = location.state?.quizId || result?.quiz_id || 39;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('access_token') || '';
        const response = await fetch(`${VITE_API_URL}/guest/quiz/${quizId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (Array.isArray(data)) {
          const formattedQuestions = data.map((item: any, index: number) => ({
            id: item.id || index,
            isCorrect: true, // Assuming correct for mock display
            text: item.question_text || "Untitled Question",
            yourAnswer: item.option_a || "N/A",
            correctAnswer: item.correct_option || "N/A",
            tag: quizTitle.length > 15 ? quizTitle.substring(0, 15) + "..." : quizTitle,
            difficulty: "Medium"
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    
    fetchQuestions();
  }, [quizId, quizTitle]);

  const topics = [
    { name: "JS Fundamentals", score: 100, color: "bg-[#00A962]" },
    { name: "React Hooks", score: 100, color: "bg-[#3D73FF]" },
    { name: "CSS", score: 100, color: "bg-[#A855F7]" },
    { name: "JS Async", score: 0, color: "bg-[#F43F5E]" },
    { name: "REST APIs", score: 0, color: "bg-[#F43F5E]" }
  ];

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1200px] mx-auto min-h-screen bg-gray-50/30">
      {/* Top Navigation */}
      <button 
        onClick={() => navigate('/guest/quizzes')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-[13px] font-bold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Quizzes
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-slate-800 mb-1">{quizTitle}</h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6F9F0] rounded-full text-[13px] font-bold text-[#00A962] border border-[#00A962]/20">
          <Trophy className="w-4 h-4" /> Excellent
        </div>
      </div>

      {/* Hero Stats Card */}
      <div className="bg-[#1a1446] rounded-[24px] p-8 lg:p-10 mb-8 relative overflow-hidden shadow-guest shadow-indigo-900/10">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#5B4FFF]/30 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Circular Progress */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="8" strokeDasharray="283" strokeDashoffset={circleOffset} className="text-white transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-3xl font-bold leading-none">{scoreValue}%</span>
              <span className="text-[11px] font-medium text-white/60">Score</span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-5 border border-white/10">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Trophy className="w-4 h-4" /> <span className="text-[12px] font-medium">Score</span>
              </div>
              <p className="text-2xl font-bold text-white">{scoreValue}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-5 border border-white/10">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Clock className="w-4 h-4" /> <span className="text-[12px] font-medium">Time Taken</span>
              </div>
              <p className="text-2xl font-bold text-white">{timeStr}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8 relative z-10">

          <button 
            onClick={() => navigate('/guest/quizzes')}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-900 text-[13px] font-bold hover:bg-gray-100 transition-colors"
          >
            Back to Quizzes <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Topics & Questions) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Topic Performance 
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-guest p-6 md:p-8">
            <h3 className="text-[16px] font-bold text-slate-800 mb-6">Topic Performance</h3>
            <div className="space-y-5">
              {topics.map((t, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] font-bold text-slate-700">{t.name}</span>
                    <span className={`text-[13px] font-bold ${t.score === 100 ? 'text-[#00A962]' : t.score > 0 ? 'text-[#3D73FF]' : 'text-[#F43F5E]'}`}>
                      {t.score}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          */}

          {/* Question Breakdown */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-guest p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-slate-800 mb-1">Question Breakdown</h3>
            </div>
            
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    q.isCorrect ? 'bg-[#E6F9F0] text-[#00A962]' : 'bg-[#FFF0F2] text-[#F43F5E]'
                  }`}>
                    {q.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <p className="text-[15px] font-bold text-slate-800 leading-snug">{q.text}</p>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-500">Your answer:</span>
                        <span className={`px-2 py-1 rounded-[6px] text-[12px] font-bold ${
                          q.isCorrect ? 'bg-[#E6F9F0] text-[#00A962]' : 'bg-[#FFF0F2] text-[#F43F5E]'
                        }`}>
                          {q.yourAnswer}
                        </span>
                      </div>
                      {!q.isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-gray-500">Correct answer:</span>
                          <span className="px-2 py-1 rounded-[6px] text-[12px] font-bold bg-[#E6F9F0] text-[#00A962]">
                            {q.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>

                    <span className="inline-block px-2.5 py-1 bg-[#5B4FFF] text-white rounded text-[11px] font-bold">
                      {q.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (History & Insights) */}
        <div className="flex flex-col gap-6">
          {/* Attempt History 
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-guest p-6">
            <h3 className="text-[15px] font-bold text-slate-800 mb-6">Attempt History</h3>
            
            <div className="flex items-end justify-center gap-4 h-24 mb-6 px-4">
              <div className="w-1/2 bg-[#F59E0B] rounded-t-[8px] flex flex-col justify-end items-center relative" style={{ height: '67%' }}>
                <span className="absolute -bottom-5 text-[10px] text-gray-400 font-bold uppercase">Attempt 1</span>
              </div>
              <div className="w-1/2 bg-[#5B4FFF] rounded-t-[8px] flex flex-col justify-end items-center relative" style={{ height: '80%' }}>
                <span className="absolute -bottom-5 text-[10px] text-gray-400 font-bold uppercase">Attempt 2</span>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-slate-800">Attempt 1</span>
                  <span className="text-[#F59E0B]">67%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>Dec 8</span>
                  <span>38 min</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-slate-800">Attempt 2</span>
                  <span className="text-[#5B4FFF]">80%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B4FFF] rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>Dec 10</span>
                  <span>32 min</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#F4F2FF] rounded-[12px] border border-[#5B4FFF]/20 p-4 flex flex-col gap-1">
              <span className="text-[13px] font-bold text-[#5B4FFF] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> +13% improvement!
              </span>
              <span className="text-[12px] text-gray-500">Great progress between attempts</span>
            </div>
          </div>
          */}

          {/* Smart Insights */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-guest p-6">
            <h3 className="text-[15px] font-bold text-slate-800 mb-4">Smart Insights</h3>
            
            <div className="space-y-3">
              <div className="bg-[#FFF8DD] rounded-[12px] p-3 flex items-start gap-3">
                <Zap className="w-4 h-4 text-[#D4A000] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[#D4A000] font-medium leading-tight">Focus on JS Async & REST APIs to hit 100%</p>
              </div>
              <div className="bg-[#F4F2FF] rounded-[12px] p-3 flex items-start gap-3">
                <Star className="w-4 h-4 text-[#5B4FFF] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[#5B4FFF] font-medium leading-tight">You're in the top 30% of test takers</p>
              </div>
              <div className="bg-[#E6F9F0] rounded-[12px] p-3 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00A962] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[#00A962] font-medium leading-tight">Perfect score on CSS & React topics!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestQuizDetailedResult;
