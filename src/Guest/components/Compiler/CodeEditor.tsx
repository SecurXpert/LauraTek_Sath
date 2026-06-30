import React from 'react';
import { Sun, RefreshCw, Maximize2, Terminal, Play, CheckCircle } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  setLanguage: (lang: string) => void;
  code: string;
  setCode: (code: string) => void;
  customInput: string;
  setCustomInput: (input: string) => void;
  handleTestCases: () => void;
  handleRunCode: () => void;
  handleSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language, setLanguage, code, setCode, customInput, setCustomInput,
  handleTestCases, handleRunCode, handleSubmit, isRunning, isSubmitting
}) => {
  return (
    <div className="bg-[#0C0A15] rounded-[24px] overflow-hidden flex flex-col relative shadow-[0px_8px_32px_rgba(0,0,0,0.08)] min-h-[420px]">
      <div className="h-12 bg-[#120F1D] flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-2 pl-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#2D284D] px-4 py-1.5 rounded-full text-[12px] text-[#A78BFA] font-mono outline-none border-none cursor-pointer"
            >
              <option value="python">python</option>
              <option value="php">php</option>
              <option value="NodeJs">NodeJs</option>
              <option value="java">java</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 rounded-full bg-[#2D284D] flex items-center justify-center text-[#A78BFA] hover:text-white transition-colors"><Sun className="w-3.5 h-3.5" /></button>
          <button className="w-7 h-7 rounded-full bg-[#2D284D] flex items-center justify-center text-[#A78BFA] hover:text-white transition-colors" onClick={() => setCode("")}><RefreshCw className="w-3.5 h-3.5" /></button>
          <button className="w-7 h-7 rounded-full bg-[#2D284D] flex items-center justify-center text-[#A78BFA] hover:text-white transition-colors"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col bg-[#0C0A15] relative">
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full min-h-[240px] p-4 bg-transparent text-[#E2E8F0] font-mono text-[13px] leading-relaxed resize-none outline-none z-10 custom-scrollbar"
          spellCheck={false}
          placeholder="Write your code here..."
        ></textarea>
        
        <div className="border-t border-white/10 p-4 pb-20 bg-[#0C0A15]">
          <p className="text-[#A78BFA] text-[12px] font-bold mb-2 flex items-center gap-2"><Terminal className="w-3 h-3" /> Custom Input (stdin)</p>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter standard input here..."
            className="w-full h-20 bg-[#120F1D] text-gray-300 font-mono text-[12px] p-3 rounded-lg border border-white/5 outline-none focus:border-[#5B4FFF]/50 resize-none custom-scrollbar"
            spellCheck={false}
          ></textarea>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button 
          onClick={handleTestCases}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#4B5563] hover:bg-[#374151] text-white text-[13px] font-bold rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.4)] transition-transform active:scale-95 disabled:opacity-50"
        >
          Test Cases
        </button>
        <button 
          onClick={handleRunCode}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-bold rounded-full shadow-[0px_4px_16px_rgba(16,185,129,0.4)] transition-transform active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" /> {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#6D5DFB] hover:bg-[#5a4ae6] text-white text-[13px] font-bold rounded-full shadow-[0px_4px_16px_rgba(109,93,251,0.4)] transition-transform active:scale-95 disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4 fill-white/20" /> {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
