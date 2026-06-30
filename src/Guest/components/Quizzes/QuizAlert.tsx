import React from 'react';

interface QuizAlertProps {
  onEnrollClick: () => void;
}

const QuizAlert: React.FC<QuizAlertProps> = ({ onEnrollClick }) => {
  return (
      <div className="bg-[#FFF8DD] border border-[#FDE68A] rounded-[16px] p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-5 h-5 rounded-full border-[1.5px] border-[#D97706] flex items-center justify-center flex-shrink-0 text-[#D97706] font-bold text-[12px]">!</div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#D97706] mb-0.5">Limited Quiz Attempts — Guest Access</h3>
            <p className="text-[13px] text-[#D97706]/80 font-medium">You have <span className="font-bold text-[#D97706]">3 quiz attempts</span> remaining. Enroll for unlimited assessments and detailed analytics.</p>
          </div>
        </div>
        <button 
          onClick={onEnrollClick}
          className="whitespace-nowrap px-8 py-2.5 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white text-[13px] font-bold rounded-full shadow-sm transition-colors self-start sm:self-auto"
        >
          Enroll
        </button>
      </div>
  );
};

export default QuizAlert;
