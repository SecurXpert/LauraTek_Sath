import React from 'react';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: string;
}

interface AttendanceHistoryCardProps {
  history: AttendanceRecord[];
  loading: boolean;
  isUnlocked: boolean;
}

const AttendanceHistoryCard: React.FC<AttendanceHistoryCardProps> = ({ history, loading, isUnlocked }) => {
  return (
    <div 
      className="overflow-hidden flex flex-col relative"
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '19.84px',
        borderWidth: '1.24px',
        padding: '1.24px',
        background: 'linear-gradient(180deg, rgba(65, 51, 241, 0.05) 0%, rgba(142, 26, 169, 0.05) 100%)',
        borderTop: '1.24px solid #E2E8F0',
        boxShadow: '0px 1.24px 2.48px -1.24px #0000001A, 0px 1.24px 3.72px 0px #0000001A'
      }}
    >
      <div className="p-6">
        <h2 className="text-[18px] font-bold text-slate-800">Attendance History</h2>
      </div>
      
      <div className="overflow-x-auto pb-4 w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="py-3 px-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">Date</th>
              <th className="py-3 px-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">Check In</th>
              <th className="py-3 px-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">Check Out</th>
              <th className="py-3 px-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">Hours</th>
              <th className="py-3 px-4 text-[14px] font-semibold text-gray-500 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200/30">
                <td className="py-3 px-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">{row.date}</td>
                <td className="py-3 px-4 text-[14px] text-gray-500 whitespace-nowrap">{row.checkIn}</td>
                <td className="py-3 px-4 text-[14px] text-gray-500 whitespace-nowrap">{row.checkOut}</td>
                <td className="py-3 px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">{row.hours}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-[12px] font-bold ${row.status.toLowerCase() === 'absent' ? 'bg-[#FFF0F0] text-[#E03137]' : 'bg-[#E6F9F0] text-[#00A962]'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            {history.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 font-medium">
                  No attendance records found. Check in to start tracking!
                </td>
              </tr>
            )}
            {!isUnlocked && (
              <tr className="relative opacity-60">
                <td className="py-3 px-4 text-[14px] font-medium text-gray-400 whitespace-nowrap">Mar 23, 2026</td>
                <td className="py-3 px-4 text-[14px] text-gray-400 whitespace-nowrap">09:00 AM</td>
                <td className="py-3 px-4 text-[14px] text-gray-400 whitespace-nowrap">06:00 PM</td>
                <td className="py-3 px-4 text-[14px] font-semibold text-gray-400 whitespace-nowrap">9h</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-bold bg-[#FFF0F0] text-[#E03137]/60">
                    Absent
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isUnlocked && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-[72px] backdrop-blur-md flex items-center justify-center rounded-b-[19.84px]"
          style={{ background: '#C8C4E5CC' }}
        >
          <p style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '22.32px', lineHeight: '34.72px', letterSpacing: '0px' }} className="text-[#0F172A] m-0">
            Enroll in a course to view your full attendance history.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistoryCard;
