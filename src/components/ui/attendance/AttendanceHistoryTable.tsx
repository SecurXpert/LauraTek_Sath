import { motion } from "framer-motion";

interface AttendanceHistoryTableProps {
  attendance: any[];
  getStatusColor: (status: string) => string;
}

export default function AttendanceHistoryTable({
  attendance,
  getStatusColor,
}: AttendanceHistoryTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl border-x border-b border-gray-100 overflow-hidden shadow-[0px_1.21px_2.43px_-1.21px_rgba(0,0,0,0.1),0px_1.21px_3.64px_0px_rgba(0,0,0,0.1)] border-t-[1.21px] border-t-[#E2E8F0]"
    >
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">
          Attendance History
        </h2>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendance.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No attendance records found
                </td>
              </tr>
            ) : (
              attendance.map((item, index) => {
                const checkIn = item.check_in_time;
                const checkOut = item.check_out_time;
                const duration = parseFloat(item.duration_hours) || 0;

                const formatDate = (dateStr: string) => {
                  if (!dateStr) return "-";
                  const date = new Date(dateStr);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                };

                const formatTime = (timeStr: string) => {
                  if (!timeStr) return "-";
                  const date = new Date(timeStr);
                  return date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                };

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {checkIn ? formatTime(checkIn) : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {checkOut ? formatTime(checkOut) : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {duration > 0 ? `${duration}h` : "0h"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status || "-"
                        )}`}
                      >
                        {item.status
                          ? item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)
                          : "-"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
