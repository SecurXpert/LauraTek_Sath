import React from 'react';
import { Bookmark, Share2, Terminal, ChevronUp, ChevronDown } from 'lucide-react';

interface ProblemDescriptionProps {
  selectedProblem: number;
  questionDetails: any;
  currentProbMeta: any;
  isDescOpen: boolean;
  setIsDescOpen: (open: boolean) => void;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  selectedProblem, questionDetails, currentProbMeta, isDescOpen, setIsDescOpen
}) => {
  return (
    <div className="bg-[#F5F3FF] rounded-[24px] p-6 lg:p-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-gray-500">Problem #{selectedProblem}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h1 className="text-[28px] font-bold text-slate-800 mb-6">{questionDetails ? questionDetails.title : currentProbMeta.title}</h1>
      
      <div className="bg-[#EAE5FF] rounded-[24px] overflow-hidden mb-6 transition-all duration-300">
        <div 
          className="border-b border-[#5B4FFF]/10 px-6 py-4 flex items-center justify-between text-[#5B4FFF] text-[13px] font-bold cursor-pointer hover:bg-[#DED7FF] transition-colors"
          onClick={() => setIsDescOpen(!isDescOpen)}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Problem Description
          </div>
          {isDescOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
        {isDescOpen && (
          <div className="p-6">
            {questionDetails ? (
              <>
                <div className="text-[15px] font-bold text-slate-800 mb-2">
                  {questionDetails.question?.split(/\r?\n/)[0]}
                </div>
                <div className="text-[13px] text-slate-600 leading-relaxed mb-4">
                  {questionDetails.question?.split(/\r?\n/).slice(1).join('\n') || questionDetails.description}
                </div>
                {questionDetails.sample_inputs && (
                  <div className="bg-white/50 p-3 rounded-lg mb-2 border border-white">
                    <p className="text-[12px] font-bold text-slate-700">Sample Input:</p>
                    <p className="text-[12px] font-mono text-slate-600">{questionDetails.sample_inputs}</p>
                  </div>
                )}
                {(questionDetails.sample_outputs || (questionDetails.test_cases && questionDetails.test_cases.length > 0)) && (
                  <div className="bg-white/50 p-3 rounded-lg border border-white">
                    <p className="text-[12px] font-bold text-slate-700">Sample Output:</p>
                    <p className="text-[12px] font-mono text-slate-600">
                      {questionDetails.sample_outputs || questionDetails.test_cases[0].output}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-[13px] text-slate-600 leading-relaxed">
                Select a problem or wait for the problem to load. If it fails, check your API connection.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
