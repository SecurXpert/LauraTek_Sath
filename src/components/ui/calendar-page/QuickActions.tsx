import React from "react";
import { CalendarPlus } from "lucide-react";

interface QuickActionsProps {
  handleScheduleEvent: () => void;
}

export default function QuickActions({ handleScheduleEvent }: QuickActionsProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-[0px_9.8px_12.25px_-7.35px_rgba(0,0,0,0.1),0px_24.49px_30.61px_-6.12px_rgba(0,0,0,0.1)] p-4 md:p-6 flex-shrink-0 mt-auto">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button
          className="w-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-colors"
          onClick={handleScheduleEvent}
        >
          <CalendarPlus size={16} />
          <span className="text-sm font-medium">Join Class</span>
        </button>
      </div>
    </div>
  );
}
