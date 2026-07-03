import React from 'react';
import { Terminal, CheckCircle } from 'lucide-react';

interface ConsoleOutputProps {
  output: string;
  testResults: any;
}

const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output, testResults }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
      <div className="bg-[#EAE4FF] rounded-[24px] p-4 shadow-guest flex flex-col h-full min-h-[160px] md:col-span-2">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-6 h-6 rounded-full bg-[#120F1D] flex items-center justify-center text-[#10B981]"><Terminal className="w-3 h-3" /></div>
          <span className="text-[14px] font-bold text-slate-800">Console / Test Cases Output</span>
        </div>
        <div className="bg-[#0C0A15] rounded-[16px] p-4 font-mono text-[11px] text-gray-400 flex-1 leading-relaxed shadow-guest overflow-y-auto max-h-[200px] whitespace-pre-wrap">
          {output ? (
            <span className={output.includes('Error') ? 'text-red-400' : 'text-gray-300'}>{output}</span>
          ) : (
            <span className="opacity-50">Program output will appear here...</span>
          )}
          
          {testResults && Array.isArray(testResults) && testResults.map((tr: any, idx: number) => (
            <div key={idx} className="mt-2 pt-2 border-t border-white/10">
              {tr.passed !== undefined ? (
                <>
                  <p className={tr.passed ? "text-[#10B981]" : "text-red-400"}>
                    Test Case {tr.testcase || idx + 1}: {tr.passed ? "✓ Passed" : "✗ Failed"}
                  </p>
                  {!tr.passed && tr.expected_output && (
                    <p className="text-[10px] text-gray-500">Expected: {tr.expected_output} | Got: {tr.actual_output}</p>
                  )}
                </>
              ) : (
                <p>{JSON.stringify(tr)}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F5F3FF] rounded-[24px] p-5 shadow-guest flex flex-col h-full min-h-[160px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-guest"><CheckCircle className="w-3 h-3" /></div>
            <span className="text-[14px] font-bold text-slate-800">Status</span>
          </div>
          {testResults ? (
            <span className="text-[10px] font-bold text-[#10B981] bg-white px-3 py-1 rounded-full shadow-guest">Evaluated</span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-guest">Pending</span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center px-1">
          <p className="text-[11px] text-gray-500 mb-1">Test cases passed</p>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-[28px] font-bold text-[#10B981] leading-none">
              {testResults && Array.isArray(testResults) ? testResults.filter((t: any) => t.passed).length : '-'}
            </span>
            <span className="text-[14px] text-gray-400 font-medium pb-0.5">
              / {testResults && Array.isArray(testResults) ? testResults.length : '-'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E6F9F0] rounded-full">
            <div 
              className="h-full bg-[#10B981] rounded-full shadow-guest transition-all"
              style={{ width: testResults && Array.isArray(testResults) && testResults.length > 0 ? `${(testResults.filter((t: any) => t.passed).length / testResults.length) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleOutput;
