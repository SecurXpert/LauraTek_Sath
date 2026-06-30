import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface CompilerSidebarProps {
  setShowCompiler: (show: boolean) => void;
  questionSearch: string;
  setQuestionSearch: (search: string) => void;
  dynamicProblems: any[];
  selectedProblem: number;
  setSelectedProblem: (id: number) => void;
}

const CompilerSidebar: React.FC<CompilerSidebarProps> = ({
  setShowCompiler, questionSearch, setQuestionSearch, dynamicProblems,
  selectedProblem, setSelectedProblem
}) => {
  return (
    <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col h-[calc(100vh-200px)] bg-[#F5F3FF] rounded-[24px] p-5">
      <div className="mb-5">
        <button 
          onClick={() => setShowCompiler(false)} 
          className="flex items-center gap-1 text-[#5B4FFF] text-[13px] font-bold mb-4 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Exams
        </button>
        <h2 className="text-[18px] font-bold text-slate-800 mb-1">Coding Questions</h2>
        <p className="text-[12px] text-gray-500 leading-tight">Sharpen your skills with interview-ready challenges.</p>
      </div>
      
      <div className="bg-white rounded-full flex items-center px-4 py-2.5 mb-5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
        <input 
          type="text" 
          placeholder="Search questions..." 
          value={questionSearch}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              setQuestionSearch(value);
            }
          }}
          className="w-full bg-transparent text-[13px] outline-none text-slate-700 placeholder:text-gray-400" 
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col space-y-3 pb-4">
        {dynamicProblems.filter(p => (p.title || '').toLowerCase().includes(questionSearch.toLowerCase())).map(prob => (
          <div 
            key={prob.id} 
            onClick={() => setSelectedProblem(prob.id)}
            className={`p-4 rounded-[20px] cursor-pointer transition-colors shadow-sm ${selectedProblem === prob.id ? 'bg-[#EDE9FF]' : 'bg-white hover:bg-gray-50'}`}
          >
            <div className="flex justify-between items-start mb-1.5">
               <h3 className={`text-[14px] font-bold ${selectedProblem === prob.id ? 'text-[#5B4FFF]' : 'text-slate-800'}`}>{prob.title}</h3>
               {prob.solved ? <div className="w-4 h-4 rounded-full border border-[#10B981] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-[#10B981]" /></div> : <Circle className="w-4 h-4 text-gray-200" strokeWidth={1.5} />}
            </div>
            <p className="text-[11px] text-gray-400 mb-3 leading-tight line-clamp-1">{prob.desc}</p>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
               <span className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">{prob.tag}</span>
               <span className="text-gray-400 ml-auto">⏱ {prob.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-auto px-4 py-3 bg-[#EAE4FF] text-[#5B4FFF] text-[12px] font-bold rounded-full flex items-center justify-center gap-2 hover:bg-[#E0D9FF] transition-colors shadow-sm w-full">
        Explore 20+ Coding Questions <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CompilerSidebar;
