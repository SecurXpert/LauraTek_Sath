import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Skeleton } from "@/components/ui/skeleton";

import QuizHeader from "@/components/ui/quiz-page/QuizHeader";
import QuestionArea from "@/components/ui/quiz-page/QuestionArea";
import QuestionNavigator from "@/components/ui/quiz-page/QuestionNavigator";
import QuizBottomNavigation from "@/components/ui/quiz-page/QuizBottomNavigation";
import QuizResults from "@/components/ui/quiz-page/QuizResults";
import { useQuizData } from "@/hooks/useQuizData";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isResultMode,
    questions,
    loading,
    answers,
    savedQuestions,
    setSavedQuestions,
    markedQuestions,
    currentQuestionIndex,
    timeLeft,
    results,
    formatTime,
    handleOptionSelect,
    handleMarkForReview,
    handleNext,
    handlePrevious,
    navigateToQuestion,
    handleSubmit,
    answeredCount,
    notAnsweredCount,
    markedCount
  } = useQuizData(id);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f8fafc] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="z-20">
          <Profileheader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        <main className="flex-1 overflow-auto">
          {loading && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="w-64 h-8" />
                <Skeleton className="w-32 h-10 rounded-full" />
              </div>
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  <Skeleton className="w-full h-[400px] rounded-2xl" />
                </div>
                <div className="w-64 space-y-4 hidden lg:block">
                  <Skeleton className="w-full h-32 rounded-lg" />
                  <Skeleton className="w-full h-64 rounded-lg" />
                </div>
              </div>
            </div>
          )}

          {/* ================= NO QUESTIONS STATE ================= */}
          {!isResultMode && !loading && questions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                <HelpCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No questions found</h2>
              <p className="text-gray-500 mb-8 max-w-md text-center">
                This quiz doesn't have any questions yet. Please try again later.
              </p>
              <button
                onClick={() => {
                  if (location.state?.courseId) {
                    navigate(`/course1/${location.state.courseId}`, { state: { from: location.state?.from } });
                  } else {
                    navigate('/assessments');
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-lg font-semibold hover:opacity-90 transition shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Assessments
              </button>
            </div>
          )}

          {/* ================= QUESTIONS MODE ================= */}
          {!isResultMode && questions.length > 0 && (
            <>
              <QuizHeader
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                id={id}
                timeLeft={timeLeft}
                formatTime={formatTime}
                answers={answers}
                savedQuestions={savedQuestions}
                handleSubmit={handleSubmit}
                answeredCount={answeredCount}
              />

              {/* Main Content */}
              <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
                <QuestionArea
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  markedQuestions={markedQuestions}
                  answers={answers}
                  handleMarkForReview={handleMarkForReview}
                  handleOptionSelect={handleOptionSelect}
                />
                
                <QuestionNavigator
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  savedQuestions={savedQuestions}
                  markedQuestions={markedQuestions}
                  answeredCount={answeredCount}
                  notAnsweredCount={notAnsweredCount}
                  markedCount={markedCount}
                  navigateToQuestion={navigateToQuestion}
                />
              </div>

              <QuizBottomNavigation
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                savedQuestions={savedQuestions}
                setSavedQuestions={setSavedQuestions}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
            </>
          )}

          {/* ================= RESULT UI ================= */}
          {isResultMode && (
            <QuizResults results={results} id={id} loading={loading} />
          )}
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
