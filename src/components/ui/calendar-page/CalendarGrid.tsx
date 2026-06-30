import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarGridProps {
  currentMonth: number;
  currentYearState: number;
  monthNames: string[];
  days: (number | null)[];
  currentDate: Date;
  selectedDate: number;
  setSelectedDate: (day: number) => void;
  getEventsForDate: (day: number) => any[];
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  getEventTypeColor: (type: string) => string;
}

export default function CalendarGrid({
  currentMonth,
  currentYearState,
  monthNames,
  days,
  currentDate,
  selectedDate,
  setSelectedDate,
  getEventsForDate,
  handlePreviousMonth,
  handleNextMonth,
  getEventTypeColor,
}: CalendarGridProps) {
  return (
    <div
      className="bg-white rounded-[19.5px] shadow-[0px_1.22px_2.45px_-1.22px_rgba(0,0,0,0.1),0px_1.22px_3.67px_0px_rgba(0,0,0,0.1)] p-4 md:p-6"
      style={{ border: "1.22px solid #E2E8F0" }}
    >
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYearState}
        </h2>
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={handlePreviousMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDate(day) : [];
          const hasEvents = dayEvents.length > 0;
          const isToday =
            day === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYearState === currentDate.getFullYear();

          return (
            <div
              key={index}
              className={`
                min-h-[50px] md:min-h-[80px] lg:min-h-[100px] aspect-square md:aspect-auto p-1 md:p-2 border rounded-md md:rounded-lg cursor-pointer transition-all overflow-hidden flex flex-col
                ${day === null ? "invisible" : ""}
                ${
                  isToday
                    ? "bg-blue-50 border-blue-400 hover:bg-blue-100 ring-2 ring-blue-500"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
                ${!isToday && day === selectedDate ? "ring-2 ring-gray-200" : ""}
              `}
              onClick={() => {
                if (day) {
                  setSelectedDate(day);
                  // If clicking on a date with events, open the first event's join link
                  if (hasEvents && dayEvents[0]?.joinLink) {
                    window.open(dayEvents[0].joinLink, "_blank");
                  }
                }
              }}
            >
              {day && (
                <>
                  <div className="text-xs md:text-sm font-medium text-gray-700">
                    {day}
                  </div>
                  <div className="mt-1 flex-1 overflow-y-auto no-scrollbar">
                    {dayEvents.slice(0, 1).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded truncate leading-tight cursor-pointer hover:opacity-80 ${getEventTypeColor(
                          event.type
                        )}`}
                        title={`${event.title} - ${event.time}${
                          event.joinLink ? " (Click to join)" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (event.joinLink) {
                            window.open(event.joinLink, "_blank");
                          }
                        }}
                      >
                        {event.shortTitle}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-600">Live Classes</span>
        </div>
      </div>
    </div>
  );
}
