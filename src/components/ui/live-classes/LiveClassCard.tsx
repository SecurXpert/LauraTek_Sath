import React from 'react';
import { FaCalendarAlt, FaIdCard, FaLink } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

export interface LiveSession {
  id: number;
  scheduled_at: string;
  title: string;
  description?: string;
  duration?: number | string;
  meeting_id?: string;
  join_link: string;
}

interface LiveClassCardProps {
  item: LiveSession;
  copiedId: number | null;
  handleCopyLink: (id: number, link: string) => void;
}

const LiveClassCard: React.FC<LiveClassCardProps> = ({ item, copiedId, handleCopyLink }) => {
  const scheduledDate = new Date(item.scheduled_at);

  return (
    <div
      className="bg-white rounded-[24px] p-6 border border-gray-100 relative overflow-hidden flex flex-col justify-between shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0px_6px_25px_rgba(0,0,0,0.06)] transition-all duration-300 group"
    >
      {/* Top Right Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-bl from-[#E8D9FF]/70 via-[#F3EBFF]/40 to-transparent rounded-bl-full pointer-events-none -z-0 group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Row: Title & Active Badge */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3">
          <h3 className="font-bold text-[20px] text-gray-900 leading-snug flex-1 min-w-0 w-full sm:w-auto capitalize break-all sm:break-words">
            {item.title}
          </h3>
          <span className="px-4 py-1.5 bg-[#ECFDF3] text-[#008A3D] border border-[#A7F3D0] rounded-full text-xs font-bold tracking-wide uppercase shadow-sm whitespace-nowrap shrink-0">
            Active
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-3">
          {item.description || "Learn full-stack web development from scratch, including HTML, CSS, JavaScript, and modern frameworks, and build real-world projects."}
        </p>

        {/* Divider */}
        <hr className="border-gray-100 my-5" />

        {/* Grid of Details */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 my-2">
          {/* Date & Time */}
          <div>
            <div className="text-gray-500 text-xs font-medium flex items-center gap-2 mb-1.5">
              <FaCalendarAlt className="w-3.5 h-3.5 text-gray-400" />
              <span>Date & Time</span>
            </div>
            <p className="font-bold text-[16px] text-gray-900">
              {scheduledDate.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' })}
            </p>
          </div>

          {/* Time */}
          <div>
            <div className="text-gray-500 text-xs font-medium flex items-center gap-2 mb-1.5">
              <FiClock className="w-3.5 h-3.5 text-gray-400" />
              <span>Time</span>
            </div>
            <p className="font-bold text-[16px] text-gray-900">
              {scheduledDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()} (IST)
            </p>
          </div>

          {/* Duration */}
          <div>
            <div className="text-gray-500 text-xs font-medium flex items-center gap-2 mb-1.5">
              <FiClock className="w-3.5 h-3.5 text-gray-400" />
              <span>Duration</span>
            </div>
            <p className="font-bold text-[16px] text-gray-900">
              {item.duration ? `${item.duration} min` : "30 min"}
            </p>
          </div>

          {/* ID */}
          <div>
            <div className="text-gray-500 text-xs font-medium flex items-center gap-2 mb-1.5">
              <FaIdCard className="w-3.5 h-3.5 text-gray-400" />
              <span>ID</span>
            </div>
            <p className="font-bold text-[16px] text-gray-900">
              {item.meeting_id || (item.duration ? `${item.duration} min` : "30 min")}
            </p>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="mt-6 pt-2">
          <div 
            className="text-gray-500 text-xs font-medium flex items-center gap-2 mb-1.5 cursor-pointer hover:text-gray-700 w-fit transition-colors"
            onClick={() => handleCopyLink(item.id, item.join_link)}
            title="Click to copy link"
          >
            <FaLink className="w-3.5 h-3.5 text-gray-400" />
            <span>{copiedId === item.id ? "Copied!" : "Copy Link"}</span>
          </div>
          <a
            href={item.join_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B58FF] font-bold text-[15px] hover:underline inline-block"
          >
            Join Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveClassCard;
