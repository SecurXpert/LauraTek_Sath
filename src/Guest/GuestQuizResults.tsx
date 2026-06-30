import React, { useState } from 'react';
import { FileText, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, BarChart2, XCircle } from 'lucide-react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

const GuestQuizResults = () => {
  const location = useLocation();
  // As requested, commenting out this page and directly showing the detailed results (screen shot img 2)
  return <Navigate to="/guest/quiz-results/details" state={location.state} replace />;
  
  /*
  const navigate = useNavigate();
  const [expandedQuiz, setExpandedQuiz] = useState<number | null>(1);
  const [filter, setFilter] = useState('All Results');

  const initialQuizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      topic: "Web Development",
      difficulty: "Beginner",
      status: "Passed",
      bestScore: 80,
      attemptsCount: 2,
      lastDate: "Dec 10, 2024",
      attempts: [
        { id: 1, score: 67, date: "Dec 8, 2024", time: "38 min", correct: "20/30" },
        { id: 2, score: 80, date: "Dec 10, 2024", time: "32 min", correct: "24/30" }
      ]
    },
    {
      id: 2,
      title: "React & Hooks Deep Dive",
      topic: "Frontend",
      difficulty: "Intermediate",
      status: "Passed",
      bestScore: 72,
      attemptsCount: 2,
      lastDate: "Dec 12, 2024",
      attempts: [
        { id: 1, score: 58, date: "Dec 10, 2024", time: "45 min", correct: "17/30" },
        { id: 2, score: 72, date: "Dec 12, 2024", time: "40 min", correct: "22/30" }
      ]
    },
    {
      id: 3,
      title: "CSS & Responsive Design",
      topic: "Frontend",
      difficulty: "Beginner",
      status: "Passed",
      bestScore: 64,
      attemptsCount: 1,
      lastDate: "Nov 28, 2024",
      attempts: [
        { id: 1, score: 64, date: "Nov 28, 2024", time: "25 min", correct: "19/30" }
      ]
    },
    {
      id: 4,
      title: "Database & SQL",
      topic: "Backend",
      difficulty: "Intermediate",
      status: "Failed",
      bestScore: 52,
      attemptsCount: 1,
      lastDate: "Nov 20, 2024",
      attempts: [
        { id: 1, score: 52, date: "Nov 20, 2024", time: "50 min", correct: "15/30" }
      ]
    }
  ];

  const [quizzes, setQuizzes] = useState<any[]>(initialQuizzes);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token') || '';
        const response = await fetch('https://lauratek.in:8000/guest/results', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any, index: number) => ({
            id: item.id || index + 1,
            title: item.title || item.quiz_title || `Quiz Assessment ${item.quiz_id || index + 1}`,
            topic: item.topic || "Practice",
            difficulty: item.difficulty || "Intermediate",
            status: (item.score || item.best_score || item.bestScore) >= 70 ? "Passed" : "Failed",
            bestScore: item.score || item.best_score || item.bestScore || 0,
            attemptsCount: item.attemptsCount || item.attempts?.length || 1,
            lastDate: item.date || item.created_at ? new Date(item.date || item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently",
            attempts: item.attempts || [
              { 
                id: 1, 
                score: item.score || 0, 
                date: item.date || item.created_at ? new Date(item.date || item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently", 
                time: item.time_taken ? `${Math.ceil(item.time_taken/60)} min` : "15 min", 
                correct: item.correct_count ? `${item.correct_count}` : "N/A" 
              }
            ]
          }));
          setQuizzes(mapped);
        }
      } catch (error) {
        console.error('Error fetching guest results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1200px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-bold tracking-wide text-slate-500 uppercase mb-2">
            <FileText className="w-4 h-4 text-[#5B4FFF]" /> Quiz Results
          </div>
          <h1 className="text-[24px] font-bold text-slate-800 mb-1">My Results & History</h1>
          <p className="text-[14px] text-gray-500">Review all your quiz attempts and performance</p>
        </div>
        <button 
          onClick={() => navigate('/guest/quizzes')}
          className="flex items-center justify-center gap-2 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white px-6 py-2.5 rounded-full font-bold text-[14px] transition-colors shadow-sm"
        >
          Take a Quiz <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
          {['All Results', 'Passed', 'Failed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-1.5 rounded-full text-[13px] font-bold transition-all ${
                filter === f ? 'bg-[#5B4FFF] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-gray-500 font-medium">{quizzes.length} quizzes</span>
      </div>

      <div className="flex flex-col gap-4">
        {quizzes.map((quiz) => {
          if (filter !== 'All Results' && filter !== quiz.status) return null;
          
          const isPassed = quiz.status === 'Passed';
          const isExpanded = expandedQuiz === quiz.id;

          return (
            <div key={quiz.id} className="bg-white rounded-[20px] border border-gray-200 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] overflow-hidden transition-all">
              <div className="p-5 flex flex-col md:flex-row items-center gap-6">
                <div className={`w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center flex-shrink-0 border-2 ${
                  isPassed ? 'border-[#00A962] bg-[#E6F9F0]' : 'border-[#F43F5E] bg-[#FFF0F2]'
                }`}>
                  <span className={`text-[18px] font-bold ${isPassed ? 'text-[#00A962]' : 'text-[#F43F5E]'}`}>{quiz.bestScore}%</span>
                  <span className={`text-[11px] font-medium ${isPassed ? 'text-[#00A962]' : 'text-[#F43F5E]'}`}>best</span>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1.5">
                    <h2 className="text-[16px] font-bold text-slate-800">{quiz.title}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      quiz.difficulty === 'Beginner' ? 'bg-[#E6F9F0] text-[#00A962]' :
                      quiz.difficulty === 'Intermediate' ? 'bg-[#EBF1FF] text-[#3D73FF]' :
                      'bg-[#FFF0F2] text-[#F43F5E]'
                    }`}>
                      {quiz.difficulty}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isPassed ? 'bg-[#E6F9F0] text-[#00A962]' : 'bg-[#FFF0F2] text-[#F43F5E]'
                    }`}>
                      {quiz.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-3">
                    {quiz.topic} · {quiz.attemptsCount} attempt{quiz.attemptsCount !== 1 ? 's' : ''} · Last: {quiz.lastDate}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    {quiz.attempts.map((att: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full border border-gray-100">
                        {att.score >= 70 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A962]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-[#F43F5E]" />
                        )}
                        <span className="text-[12px] text-gray-600 font-medium">Attempt {att.id}: {att.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => navigate('/guest/quiz-results/details')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white px-5 py-2.5 rounded-full font-bold text-[13px] transition-colors shadow-sm"
                  >
                    Full Report <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setExpandedQuiz(isExpanded ? null : quiz.id)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors border border-gray-200"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 bg-[#FAFAFA] p-6">
                  <h3 className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-4">Attempt History</h3>
                  
                  <div className="flex flex-col gap-4">
                    {quiz.attempts.map((att: any) => (
                      <div key={att.id} className="bg-white rounded-[16px] p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          att.score >= 70 ? 'bg-[#E6F9F0] text-[#00A962]' : 'bg-[#FFF0F2] text-[#F43F5E]'
                        }`}>
                          {att.score >= 70 ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[13px] font-bold text-slate-800">Attempt {att.id}</span>
                            <span className={`text-[15px] font-bold ${att.score >= 70 ? 'text-[#00A962]' : 'text-[#F43F5E]'}`}>{att.score}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${att.score >= 70 ? 'bg-[#00A962]' : 'bg-[#F43F5E]'}`} style={{ width: `${att.score}%` }}></div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 text-[12px] text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-gray-400 rounded flex items-center justify-center text-[8px]">📅</span> {att.date}</div>
                          <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 border border-gray-400 rounded-full flex items-center justify-center text-[8px]">🕒</span> {att.time}</div>
                          <div className="flex items-center gap-1.5 ml-auto md:ml-0">{att.correct} correct</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right">
                    <button 
                      onClick={() => navigate('/guest/quiz-results/details')}
                      className="inline-flex items-center gap-1.5 text-[#5B4FFF] hover:text-[#4a3fdb] text-[13px] font-bold transition-colors"
                    >
                      <BarChart2 className="w-4 h-4" /> View Detailed Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  */
};

export default GuestQuizResults;
