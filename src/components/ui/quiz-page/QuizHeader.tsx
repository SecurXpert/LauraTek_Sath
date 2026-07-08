import React from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Question } from "./types";

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
