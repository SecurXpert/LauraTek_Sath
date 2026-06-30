import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="p-10 max-w-md w-full flex flex-col items-center">
        <FileText className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No questions found</h2>
        <p className="text-gray-500 mb-8">
          This exam doesn't have any questions yet. Please try again later.
        </p>
        <button
          onClick={() => navigate("/dashboard/exams")}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition shadow-md w-full"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Exams
        </button>
      </div>
    </div>
  );
}
