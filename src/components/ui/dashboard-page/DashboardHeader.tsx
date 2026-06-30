import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  streakData: any;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, streakData }) => {
  return (
    <motion.div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-white">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-blue-100 mt-2">
          Here's what's happening with your learning journey today.
        </p>
      </div>
      {streakData !== null && (
        <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
          <div className="bg-orange-500/20 p-2.5 rounded-xl shadow-sm">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Current Streak</span>
            <span className="font-bold text-white text-2xl leading-none mt-1">
              {streakData.current_streak ?? streakData.streak_count ?? streakData.streak ?? streakData.days ?? 0} <span className="text-base font-medium text-blue-50">Days</span>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;
