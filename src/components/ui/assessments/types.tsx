import { motion } from "framer-motion";
import { Filter, Search, ChevronDown, RefreshCw, Award, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timer?: number;
  subject?: string;
  difficulty?: string;
  questions?: number;
  timeLimit?: string;
  attempts?: number;
  status?: string;
  bestScore?: number;
  progress?: number;
  lastAttempt?: string;
  avgScore?: number;
}

export interface StudentAnalytics {
  student_id: number;
  total_attempts: number;
  average_score: number;
  accuracy_percentage: number;
}

export interface AssessmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  handleReset: () => void;
}

export const AssessmentFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  handleReset,
}: AssessmentFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[46px] h-[46px] bg-[#6B46FF] rounded-2xl flex items-center justify-center shadow-sm">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[16px] text-[#101828] mb-0.5">Filters & Search</h3>
          <p className="text-[13px] text-[#667085]">Refine your Course list</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#667085]" />
          <input
            type="text"
            placeholder="Search Courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-[53.09px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[17.7px] text-[14px] text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#6B46FF]/20 focus:border-[#6B46FF] transition-all"
          />
        </div>

        <div className="relative flex-1 sm:flex-none min-w-[150px] sm:min-w-[200px]">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-5 pr-10 h-[53.09px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[17.7px] text-[14px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#6B46FF]/20 focus:border-[#6B46FF] appearance-none cursor-pointer transition-all"
          >
            <option value="All Status">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
        </div>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium w-full sm:w-[243.98px] flex-shrink-0"
          style={{
            height: "53.09px",
            borderRadius: "17.7px",
            borderWidth: "1.26px",
            background: "#F9FAFB",
            borderColor: "#E5E7EB",
            borderStyle: "solid",
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export interface AssessmentStatsProps {
  studentStats: StudentAnalytics | null;
}

export const AssessmentStats = ({ studentStats }: AssessmentStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8"></div>
        <div className="relative">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {studentStats?.total_attempts ?? 24}
          </h3>
          <p className="text-sm text-gray-500 mb-2">Total Tests Taken</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-8 -mt-8"></div>
        <div className="relative">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {studentStats?.average_score ?? 78}%
          </h3>
          <p className="text-sm text-gray-500 mb-2">Avg Score</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8"></div>
        <div className="relative">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {studentStats?.accuracy_percentage ?? 82}%
          </h3>
          <p className="text-sm text-gray-500 mb-2">Accuracy Rate</p>
        </div>
      </div>
    </motion.div>
  );
};

export interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex-1">
          {quiz.title}
        </h3>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
      </div>

      <div className="border-t border-gray-100 my-4"></div>

      <div className="flex justify-start mb-4">
        <div className="text-left">
          <p className="text-xs text-gray-500 mb-1">Time Limit</p>
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {quiz.timeLimit}
          </p>
        </div>
      </div>
      
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

export const QuizSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[220px] flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="border-t border-gray-100 my-4"></div>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <Skeleton className="h-3 w-16 mb-1 mx-auto" />
          <Skeleton className="h-4 w-8 mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton className="h-3 w-16 mb-1 mx-auto" />
          <Skeleton className="h-4 w-12 mx-auto" />
        </div>
      </div>
      <div className="flex gap-3 mt-auto">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 flex-1 rounded-xl" />
      </div>
    </div>
  );
};
