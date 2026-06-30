import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const GuestQuizTake = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { quizId, quizTitle } = location.state || {};
  const activeQuizId = id || quizId;
  
  useEffect(() => {
    document.title = quizTitle ? `${quizTitle} | Quiz` : "Quiz Challenge";
  }, [quizTitle]);
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes

  useEffect(() => {
    if (loading || !questions.length) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, questions.length]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('access_token') || '';
      const timeTaken = (30 * 60) - timeRemaining;
      
      const payload = {
        id: parseInt(activeQuizId) || 1,
        answers: Object.entries(answers).map(([qNum, optionId]) => {
          const q = questions[parseInt(qNum) - 1];
          return {
            question_id: q.id,
            selected_option: optionId
          };
        }),
        time_taken: timeTaken
      };

      const response = await fetch('https://lauratek.in:8000/guest/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        navigate('/guest/quiz-results', { state: { result: data, quizId: activeQuizId, quizTitle } });
      } else {
        console.error('Failed to submit:', data);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token') || '';
        const idToFetch = activeQuizId || 1; // Fallback
        const response = await fetch(`https://lauratek.in:8000/guest/quiz/${idToFetch}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setQuestions(data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [activeQuizId]);

  const currentQ = questions[currentQuestion - 1];
  
  const options = currentQ ? [
    { id: 'A', text: currentQ.option_a },
    { id: 'B', text: currentQ.option_b },
    { id: 'C', text: currentQ.option_c },
    { id: 'D', text: currentQ.option_d }
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#5B4FFF]" />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 mb-4">No questions found for this quiz.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-[#5B4FFF] text-white rounded-full text-sm font-medium">Go Back</button>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1400px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-[16px] p-4 lg:px-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-[0px_4px_20px_rgba(149,157,165,0.04)] border border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/guest/quizzes')}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#5B4FFF] transition-colors border border-gray-100 shadow-sm flex-shrink-0"
            title="Go back to quizzes"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[16px] font-bold text-slate-800 mb-0.5">{quizTitle || 'Practice Quiz'}</h1>
            <p className="text-[13px] text-gray-500">Question {currentQuestion} of {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-[14px] font-medium text-slate-700">
            <Clock className="w-4 h-4" /> {formatTime(timeRemaining)}
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-6 py-2 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white text-[13px] font-semibold rounded-full shadow-sm transition-colors flex items-center gap-2 ${submitting ? 'opacity-70 cursor-wait' : ''}`}
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-[16px] p-5 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] border border-gray-100">
            <div className="flex justify-between text-[13px] font-medium text-gray-500 mb-3">
              <span>{answeredCount}/{questions.length} answered</span>
              <span className="text-[#5B4FFF] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5B4FFF] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Question Block */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[#5B4FFF] text-white flex items-center justify-center font-bold text-[15px]">
                {currentQuestion}
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px] font-medium">
                Multiple Choice
              </span>
            </div>

            <h2 className="text-[18px] font-medium text-slate-800 mb-8">
              {currentQ.question_text}
            </h2>

            <div className="flex flex-col gap-4 mb-10">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion]: option.id }))}
                  className={`flex items-center gap-4 p-4 rounded-[16px] border ${
                    answers[currentQuestion] === option.id 
                      ? 'border-[#5B4FFF] bg-[#F4F2FF]' 
                      : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                  } transition-all text-left group`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors ${
                    answers[currentQuestion] === option.id 
                      ? 'bg-[#5B4FFF] text-white' 
                      : 'bg-white text-gray-500 border border-gray-200 group-hover:border-gray-300'
                  }`}>
                    {option.id}
                  </div>
                  <span className={`text-[15px] ${answers[currentQuestion] === option.id ? 'text-[#5B4FFF] font-medium' : 'text-slate-700'}`}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <button 
                onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-2 text-gray-400 font-medium text-[14px] hover:text-gray-600 transition-colors"
                disabled={currentQuestion === 1}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button 
                onClick={() => setCurrentQuestion(prev => Math.min(questions.length, prev + 1))}
                disabled={currentQuestion === questions.length}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-[14px] shadow-sm transition-colors ${
                  currentQuestion === questions.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Navigator) */}
        <div className="w-full lg:w-[320px]">
          <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] border border-gray-100">
            <h3 className="text-[15px] font-bold text-slate-800 mb-6">Question Navigator</h3>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {questions.map((_, idx) => {
                const num = idx + 1;
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentQuestion(num)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors ${
                      currentQuestion === num
                        ? 'bg-[#5B4FFF] text-white shadow-md shadow-purple-200'
                        : answers[num]
                          ? 'bg-[#00A962] text-white'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-[4px] bg-[#5B4FFF]"></div>
                <span className="text-[13px] text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-[4px] bg-[#00A962]"></div>
                <span className="text-[13px] text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-[4px] bg-gray-100 border border-gray-200"></div>
                <span className="text-[13px] text-gray-600">Not visited</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[16px] p-4">
              <p className="text-[13px] font-bold text-slate-800 mb-1">{answeredCount}/{questions.length} Answered</p>
              <p className="text-[12px] text-gray-500">{questions.length - answeredCount} remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestQuizTake;
