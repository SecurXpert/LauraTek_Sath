import { motion } from "framer-motion";
import { LogIn, LogOut, Clock, ChevronDown } from "lucide-react";

interface MarkAttendanceCardProps {
  handleCheckIn: () => void;
  handleCheckOut: () => void;
  loading: boolean;
  isCheckedIn: boolean;
  seconds: number;
  todayDuration: number;
  formatTime: (secs: number) => string;
  courses: any[];
  selectedCourseId: number | null;
  onCourseChange: (courseId: number) => void;
}

export default function MarkAttendanceCard({
  handleCheckIn,
  handleCheckOut,
  loading,
  isCheckedIn,
  seconds,
  todayDuration,
  formatTime,
  courses,
  selectedCourseId,
  onCourseChange,
}: MarkAttendanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:col-span-2 rounded-xl p-4 sm:p-6 text-white shadow-[0px_1.21px_2.43px_-1.21px_rgba(0,0,0,0.1),0px_1.21px_3.64px_0px_rgba(0,0,0,0.1)] border-t-[1.21px] border-t-[#E2E8F0]"
      style={{
        background:
          "linear-gradient(90deg, #2563EB 0%, #3161EB 7.14%, #3B5FEB 14.29%, #435CEB 21.43%, #4A5AEC 28.57%, #5157EC 35.71%, #5755EC 42.86%, #5C52EC 50%, #624FEC 57.14%, #664CEC 64.29%, #6B49EC 71.43%, #7045ED 78.57%, #7442ED 85.71%, #783EED 92.86%, #7C3AED 100%)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mark Your Attendance</h2>
        {courses.length > 0 && (
          <div className="relative">
            <select
              className="appearance-none bg-white text-gray-900 pl-4 pr-10 py-1.5 rounded-full text-sm font-medium outline-none cursor-pointer"
              value={selectedCourseId || ""}
              onChange={(e) => onCourseChange(Number(e.target.value))}
              disabled={isCheckedIn}
            >
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none" size={16} strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Check In / Check Out Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={handleCheckIn}
          disabled={loading || isCheckedIn}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-indigo-600 px-4 py-3 rounded-lg font-medium transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-default"
        >
          <LogIn size={18} /> Check In
        </button>
        <button
          onClick={handleCheckOut}
          disabled={loading || !isCheckedIn}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-lg font-medium transition hover:bg-white/20 disabled:opacity-50 disabled:cursor-default"
        >
          <LogOut size={18} /> Check Out
        </button>
      </div>

      {/* Today's Status */}
      <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm mb-1">Today's Status</p>
          <p className="text-xl font-bold">
            {isCheckedIn ? formatTime(seconds) : `${todayDuration}h`}
          </p>
        </div>
        <Clock className="text-white/80" size={32} strokeWidth={1.5} />
      </div>

      {/* Running Timer */}
      {isCheckedIn && (
        <div className="mt-3 text-sm text-white/80">
          Session in progress...
        </div>
      )}
    </motion.div>
  );
}
