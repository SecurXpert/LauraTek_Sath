import { motion } from "framer-motion";
import { Award, Target } from "lucide-react";
import { StudentAnalytics } from "./types";

interface AssessmentStatsProps {
  studentStats: StudentAnalytics | null;
}

const AssessmentStats = ({ studentStats }: AssessmentStatsProps) => {
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

      {/* Avg Score */}
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

      {/* Accuracy Rate */}
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

export default AssessmentStats;
