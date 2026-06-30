import React from "react";
import { CalendarIcon, Clock, CalendarPlus } from "lucide-react";

interface UpcomingEventsProps {
  calendarEvents: any[];
  getUpcomingEventBadgeColor: (type: string) => string;
}

export default function UpcomingEvents({
  calendarEvents,
  getUpcomingEventBadgeColor,
}: UpcomingEventsProps) {
  return (
    <div
      className="bg-[#FFFFFF] rounded-[19.5px] shadow-[0px_1.22px_2.45px_-1.22px_rgba(0,0,0,0.1),0px_1.22px_3.67px_0px_rgba(0,0,0,0.1)] p-4 md:p-6 flex flex-col flex-1 min-h-0"
      style={{ border: "1.22px solid #E2E8F0" }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Upcoming Events
      </h3>
      <div
        className="space-y-3 overflow-y-auto flex-1 pr-1 max-h-[300px] lg:max-h-[380px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="no-scrollbar space-y-3">
          {calendarEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-sm transition-all duration-300 ${
                event.joinLink
                  ? "cursor-pointer hover:shadow-md hover:border-blue-200"
                  : ""
              }`}
              onClick={() =>
                event.joinLink && window.open(event.joinLink, "_blank")
              }
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${getUpcomingEventBadgeColor(
                    event.type
                  )}`}
                >
                  {event.type === "live-class"
                    ? "Live Class"
                    : event.type === "assignment"
                    ? "Assignment"
                    : "Quiz"}
                </span>
              </div>
              <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <CalendarIcon size={12} />
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <Clock size={12} />
                {event.time}
              </div>
            </div>
          ))}

          {/* Placeholder card to fill the gap if less than 4 events */}
          {calendarEvents.length > 0 && calendarEvents.length < 4 && (
            <div className="bg-gray-50/50 rounded-lg p-4 border border-dashed border-gray-200 flex flex-col items-center justify-center py-6">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                <CalendarPlus size={16} className="text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium text-center">
                More classes will be
                <br />
                scheduled soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
