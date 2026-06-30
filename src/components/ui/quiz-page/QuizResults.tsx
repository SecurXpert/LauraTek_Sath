import { Trophy, TrendingUp, Clock, Target } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Result } from "./types";

interface QuizResultsProps {
  results: Result[];
  id?: string;
  loading: boolean;
}

const QuizResults = ({ results, id, loading }: QuizResultsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (results.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
        <p className="text-gray-500 mb-6">Take the quiz to see your results here</p>
        <button
          onClick={() => navigate(`/quiz/${id}`)}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (results.length === 0) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828]">Quiz Results</h1>
          <p className="text-gray-500">Java Fundamentals Quiz</p>
        </div>
        <button
          onClick={() => {
            if (location.state?.courseId) {
              navigate(`/course1/${location.state.courseId}`, { state: { from: location.state?.from } });
            } else {
              navigate('/assessments');
            }
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          {location.state?.courseId ? 'Back to Course' : 'Back to Assessments'}
        </button>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 relative overflow-hidden" style={{ boxShadow: '0px 1.25px 2.51px -1.25px #0000001A, 0px 1.25px 3.76px 0px #0000001A' }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-10 -mt-10"></div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative">
          {/* Left: Score Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              You scored {results[0]?.score}/{results[0]?.total_questions}
            </h2>
            <p className="text-gray-500 mb-3">
              That's {results[0]?.percentage}% accuracy
            </p>
          </div>

          {/* Right: Circular Progress */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(results[0]?.percentage / 100) * 351.86} 351.86`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {results[0]?.percentage}%
                </span>
                <span className="text-xs text-gray-500">Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Results Table - Original Data */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6" style={{ boxShadow: '0px 1.25px 2.51px -1.25px #0000001A, 0px 1.25px 3.76px 0px #0000001A' }}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Quiz Results</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Quiz ID</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Total Questions</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Time Taken (s)</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 text-center">{result.quiz_id}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-green-600 text-center">{result.score}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 text-center">{result.total_questions}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-center">{result.time_taken}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-center">
                    {new Date(result.submitted_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate(`/quiz/${id}`)}
          className="w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-lg font-medium hover:opacity-90 transition shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retake Quiz
        </button>

        <button
          onClick={() => {
            if (location.state?.courseId) {
              navigate(`/course1/${location.state.courseId}`, { state: { from: location.state?.from } });
            } else {
              navigate('/dashboard');
            }
          }}
          className="w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-2 px-6 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          style={{ background: '#F3F4F6' }}
        >
          {location.state?.courseId ? 'Go to Course' : 'Go to Dashboard'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
