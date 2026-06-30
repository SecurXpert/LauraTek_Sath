import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Question } from "./types";

interface QuestionAreaProps {
  questions: Question[];
  currentQuestionIndex: number;
  markedQuestions: number[];
  answers: { [key: number]: string };
  handleMarkForReview: (id: number) => void;
  handleOptionSelect: (id: number, option: string) => void;
}

const QuestionArea = ({
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

export default QuestionArea;
