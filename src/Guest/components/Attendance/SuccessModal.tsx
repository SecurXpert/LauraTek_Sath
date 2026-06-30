import React from 'react';

interface SuccessModalProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ showSuccessModal, setShowSuccessModal }) => {
  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Enrolled Successfully!</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for enrolling in this course. We will reach out to you soon.
        </p>
        <button 
          onClick={() => setShowSuccessModal(false)}
          className="w-full bg-[#4A3AFF] hover:bg-[#3b2fc9] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
