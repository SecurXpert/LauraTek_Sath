import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface AttendanceStatsCardProps {
  totalHours: number;
}

export default function AttendanceStatsCard({ totalHours }: AttendanceStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl p-6 border-x border-b border-gray-100 shadow-[0px_1.21px_2.43px_-1.21px_rgba(0,0,0,0.1),0px_1.21px_3.64px_0px_rgba(0,0,0,0.1)] border-t-[1.21px] border-t-[#E2E8F0]"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
          <CalendarDays className="text-cyan-600" size={20} />
        </div>
        <div>
          <p className="text-gray-500 text-sm"></p>
          <p className="text-2xl font-bold text-gray-900">{totalHours} hours</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">This Month</span>
          <span className="font-semibold text-gray-900">{totalHours} hours</span>
        </div>
      </div>
    </motion.div>
  );
}
