import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "./types";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      {/* Header with title and recommended badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex-1">
          {quiz.title}
        </h3>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Stats Row */}
      <div className="flex justify-start mb-4">
        {/* <div className="text-left">
          <p className="text-xs text-gray-500 mb-1">Questions</p>
          <p className="text-sm font-semibold text-gray-800">{quiz.questions}</p>
        </div> */}
        
        <div className="text-left">
          <p className="text-xs text-gray-500 mb-1">Time Limit</p>
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {quiz.timeLimit}
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/quiz/${quiz.id}`, { state: { timer: quiz.timer } })}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-md shadow-purple-200"
          >
            Start Quiz
          </button>

          <button
            onClick={() => navigate(`/quiz/${quiz.id}?view=result`)}
            className="flex-1 py-2.5 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition"
          >
            View Results
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;
