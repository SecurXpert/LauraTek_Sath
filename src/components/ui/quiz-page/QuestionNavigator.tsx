import React from "react";
import { Question } from "./types";

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
