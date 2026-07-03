import React from "react";
import { motion } from "framer-motion";
import { Bookmark, ChevronLeft, ChevronRight, ArrowLeft, Clock, Trophy, TrendingUp, Target } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

export interface Result {
  id: number;
  quiz_id: number;
  score: number;
  total_questions: number;
  time_taken: number;
  submitted_at: string;
  percentage: number;
}

interface QuestionAreaProps {
  questions: Question[];
  currentQuestionIndex: number;
  markedQuestions: number[];
  answers: { [key: number]: string };
  handleMarkForReview: (id: number) => void;
  handleOptionSelect: (id: number, option: string) => void;
}

export const QuestionArea = ({
  questions,
  currentQuestionIndex,
  markedQuestions,
  answers,
  handleMarkForReview,
  handleOptionSelect,
}: QuestionAreaProps) => {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:overflow-y-auto">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Question Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {currentQuestionIndex + 1}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1}</p>
              <p className="text-xs text-gray-400">Java</p>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <p className="text-gray-800 text-base mb-6 leading-relaxed break-all whitespace-normal">
            {currentQuestion.question_text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {[
              { key: "a", value: currentQuestion.option_a },
              { key: "b", value: currentQuestion.option_b },
              { key: "c", value: currentQuestion.option_c },
              { key: "d", value: currentQuestion.option_d },
            ].map((option) => (
              <label
                key={option.key}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  answers[currentQuestion.id] === option.key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                  answers[currentQuestion.id] === option.key
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}>
                  {answers[currentQuestion.id] === option.key && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  className="hidden"
                  checked={answers[currentQuestion.id] === option.key}
                  onChange={() => handleOptionSelect(currentQuestion.id, option.key)}
                />
                <span className="text-gray-700 break-all whitespace-normal">{option.value}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestionIndex: number;
  savedQuestions: number[];
  markedQuestions: number[];
  answeredCount: number;
  notAnsweredCount: number;
  markedCount: number;
  navigateToQuestion: (index: number) => void;
}

export const QuestionNavigator = ({
  questions,
  currentQuestionIndex,
  savedQuestions,
  markedQuestions,
  answeredCount,
  notAnsweredCount,
  markedCount,
  navigateToQuestion,
}: QuestionNavigatorProps) => {
  return (
    <div className="w-full lg:w-64 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6 lg:overflow-y-auto">
      <h3 className="font-semibold text-gray-800 mb-2">Question Navigator</h3>
      <p className="text-xs text-gray-500 mb-4">Click on a question to navigate</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-green-600">{answeredCount}</p>
          <p className="text-xs text-green-600">Answered</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-lg font-bold text-gray-600">{notAnsweredCount}</p>
          <p className="text-xs text-gray-500">Not Answered</p>
        </div>
      </div>

      {/* Question Buttons */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((q, idx) => {
          const isAnswered = savedQuestions.includes(q.id);
          const isMarked = markedQuestions.includes(q.id);
          const isCurrent = idx === currentQuestionIndex;

          return (
            <button
              key={q.id}
              onClick={() => navigateToQuestion(idx)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                isCurrent
                  ? "bg-blue-500 text-white"
                  : isAnswered
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          <span className="text-gray-600">Not Answered</span>
        </div>
      </div>
    </div>
  );
};

interface QuizBottomNavigationProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: string };
  savedQuestions: number[];
  setSavedQuestions: React.Dispatch<React.SetStateAction<number[]>>;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const QuizBottomNavigation = ({
  questions,
  currentQuestionIndex,
  answers,
  savedQuestions,
  setSavedQuestions,
  handlePrevious,
  handleNext,
}: QuizBottomNavigationProps) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <span className="text-xs sm:text-sm text-gray-500 text-center">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={() => {
              const currentQuestion = questions[currentQuestionIndex];
              if (currentQuestion && answers[currentQuestion.id]) {
                if (!savedQuestions.includes(currentQuestion.id)) {
                  setSavedQuestions((prev) => [...prev, currentQuestion.id]);
                }
                alert("Answer saved successfully ✅");
              } else {
                alert("Please select an option to save");
              }
            }}
            className="flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition shadow-md shadow-purple-200 whitespace-nowrap"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition shadow-md shadow-purple-200 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Save & </span>Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

interface QuizHeaderProps {
  questions: Question[];
  currentQuestionIndex: number;
  id?: string;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  answers: { [key: number]: string };
  savedQuestions: number[];
  handleSubmit: () => void;
  answeredCount: number;
}

export const QuizHeader = ({
  questions,
  currentQuestionIndex,
  id,
  timeLeft,
  formatTime,
  answers,
  savedQuestions,
  handleSubmit,
  answeredCount,
}: QuizHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 sm:p-2.5 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a] tracking-tight truncate">
              {questions[0]?.question_text ? "Java Fundamentals Quiz" : `Quiz ID: ${id}`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Timer */}
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-50 rounded-full border border-gray-100">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3b82f6]" />
            <span className="text-xs sm:text-sm font-bold text-[#1e293b] tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              const currentQuestion = questions[currentQuestionIndex];
              if (currentQuestion && answers[currentQuestion.id] && !savedQuestions.includes(currentQuestion.id)) {
                alert("Please click 'Save' to save your current answer before submitting!");
                return;
              }
              
              const unsavedAnswers = Object.keys(answers).filter(qId => !savedQuestions.includes(Number(qId)));
              if (unsavedAnswers.length > 0) {
                alert("You have unsaved answers. Please save them before submitting!");
                return;
              }

              handleSubmit();
            }}
            className="px-6 sm:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Progress Bar - Fixed at bottom of header */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] rounded-r-full"
        ></motion.div>
      </div>
    </div>
  );
};

interface QuizResultsProps {
  results: Result[];
  id?: string;
  loading: boolean;
}

export const QuizResults = ({ results, id, loading }: QuizResultsProps) => {
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
