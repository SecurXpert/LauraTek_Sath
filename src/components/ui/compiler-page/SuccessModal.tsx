import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  setShowSuccessModal: (show: boolean) => void;
}

export default function SuccessModal({ setShowSuccessModal }: SuccessModalProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Congratulations!!
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Your exam has been successfully completed.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            setShowSuccessModal(false);
            navigate("/dashboard/exams");
          }}
          className="w-full py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] hover:opacity-90 transition shadow-lg active:scale-[0.98]"
        >
          Go to Exam Portal →
        </button>
      </div>
    </div>
  );
}
