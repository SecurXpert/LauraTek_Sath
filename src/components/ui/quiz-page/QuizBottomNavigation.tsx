import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Question } from "./types";

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
