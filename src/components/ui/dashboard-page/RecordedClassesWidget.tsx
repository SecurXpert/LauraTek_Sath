import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecordedClassesWidgetProps {
  recordedVideos: any[];
  videosLoading: boolean;
}

const RecordedClassesWidget: React.FC<RecordedClassesWidgetProps> = ({ recordedVideos, videosLoading }) => {
  const navigate = useNavigate();

  return (
    <div id="recordings-section">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-gray-800">Recorded Classes</h3>
          <p className="text-sm text-gray-500">
            {videosLoading ? 'Loading...' : `${recordedVideos.length} videos available`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-xs">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Play className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Recorded Classes</p>
            <p className="text-sm text-gray-500">
              {videosLoading ? '...' : `${recordedVideos.length} Available`}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/recording")}
          className="mt-4 w-full bg-gradient-to-r from-[#2563EB] to-[#9333EA] hover:from-[#1D4ED8] hover:to-[#7C22D4] text-white py-2.5 rounded-lg font-medium text-sm transition-all shadow-md"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default RecordedClassesWidget;
