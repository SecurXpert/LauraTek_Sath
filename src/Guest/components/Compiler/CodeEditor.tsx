import React, { useState } from 'react';
import { Sun, Moon, RefreshCw, Maximize2, Minimize2, Terminal, Play, CheckCircle } from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset your code?")) {
      const defaultSnippets: Record<string, string> = {
        python: "def add(a, b):\n    return a + b\n\n# Read input and call your function here\n",
        php: "<?php\n\nfunction add($a, $b) {\n    return $a + $b;\n}\n",
        NodeJs: "function add(a, b) {\n    return a + b;\n}\n\n// Add your logic here\n",
        java: "public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}\n"
      };
      setCode(defaultSnippets[language] || "");
    }
  };

  const containerBg = isDarkMode ? "bg-[#0C0A15]" : "bg-white border border-gray-200";
  const headerBg = isDarkMode ? "bg-[#120F1D]" : "bg-gray-100 border-b border-gray-200";
  const selectBg = isDarkMode ? "bg-[#2D284D] text-[#A78BFA]" : "bg-white text-[#5B4FFF] border border-gray-300";
  const iconBtn = isDarkMode ? "bg-[#2D284D] text-[#A78BFA] hover:text-white" : "bg-white text-gray-500 hover:text-[#5B4FFF] border border-gray-200 shadow-sm";
  const textBg = isDarkMode ? "bg-transparent text-[#E2E8F0]" : "bg-transparent text-gray-800";
  const inputContainerBg = isDarkMode ? "bg-[#0C0A15] border-t border-white/10" : "bg-gray-50 border-t border-gray-200";
  const inputBg = isDarkMode ? "bg-[#120F1D] text-gray-300 border-white/5" : "bg-white text-gray-700 border-gray-300";
  const inputTitle = isDarkMode ? "text-[#A78BFA]" : "text-[#5B4FFF]";
  const fullscreenClasses = isFullscreen ? "fixed inset-4 z-[100] shadow-2xl" : "relative min-h-[420px]";

  return (
    <div className={`${containerBg} ${fullscreenClasses} rounded-[24px] overflow-hidden flex flex-col shadow-guest transition-colors duration-300`}>
      <div className={`h-12 ${headerBg} flex items-center justify-between px-4 transition-colors duration-300`}>
        <div className="flex items-center gap-6">
          <div className="flex gap-2 pl-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={language} 
              onChange={(e) => {
                setLanguage(e.target.value);
                const defaultSnippets: Record<string, string> = {
                  python: "def add(a, b):\n    return a + b\n\n# Read input and call your function here\n",
                  php: "<?php\n\nfunction add($a, $b) {\n    return $a + $b;\n}\n",
                  NodeJs: "function add(a, b) {\n    return a + b;\n}\n\n// Add your logic here\n",
                  java: "public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}\n"
                };
                if(code === "" || code.includes("def add") || code.includes("function add")) {
                   setCode(defaultSnippets[e.target.value] || "");
                }
              }}
              className={`${selectBg} px-4 py-1.5 rounded-full text-[12px] font-mono outline-none cursor-pointer transition-colors duration-300`}
            >
              <option value="python">python</option>
              <option value="php">php</option>
              <option value="NodeJs">NodeJs</option>
              <option value="java">java</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-7 h-7 rounded-full ${iconBtn} flex items-center justify-center transition-colors`} title="Toggle Theme">
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={handleReset} className={`w-7 h-7 rounded-full ${iconBtn} flex items-center justify-center transition-colors`} title="Reset Code">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className={`w-7 h-7 rounded-full ${iconBtn} flex items-center justify-center transition-colors`} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      
      <div className={`flex-1 flex flex-col ${containerBg} relative transition-colors duration-300`}>
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`flex-1 w-full ${isFullscreen ? 'min-h-[50vh]' : 'min-h-[240px]'} p-4 ${textBg} font-mono text-[13px] leading-relaxed resize-none outline-none z-10 custom-scrollbar transition-colors duration-300`}
          spellCheck={false}
          placeholder="Write your code here..."
        ></textarea>
        
        <div className={`p-4 pb-20 ${inputContainerBg} transition-colors duration-300`}>
          <p className={`${inputTitle} text-[12px] font-bold mb-2 flex items-center gap-2 transition-colors duration-300`}><Terminal className="w-3 h-3" /> Custom Input (stdin)</p>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter standard input here..."
            className={`w-full ${isFullscreen ? 'h-32' : 'h-20'} ${inputBg} font-mono text-[12px] p-3 rounded-lg border outline-none focus:border-[#5B4FFF]/50 resize-none custom-scrollbar transition-colors duration-300`}
            spellCheck={false}
          ></textarea>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button 
          onClick={handleTestCases}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#4B5563] hover:bg-[#374151] text-white text-[13px] font-bold rounded-full shadow-guest transition-transform active:scale-95 disabled:opacity-50"
        >
          Test Cases
        </button>
        <button 
          onClick={handleRunCode}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-bold rounded-full shadow-guest transition-transform active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" /> {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#6D5DFB] hover:bg-[#5a4ae6] text-white text-[13px] font-bold rounded-full shadow-guest transition-transform active:scale-95 disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4 fill-white/20" /> {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
