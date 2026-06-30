import React from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { CurriculumItem } from "./CourseTypes";

interface CourseCurriculumProps {
  curriculum: CurriculumItem[];
  expandedModules: number[];
  progressData: any;
  handleToggleAllModules: () => void;
  toggleModule: (moduleId: number) => void;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({
  curriculum,
  expandedModules,
  progressData,
  handleToggleAllModules,
  toggleModule,
}) => {
  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D946EF] rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full">
            {curriculum.filter((item: any) => item.completed).length} / {curriculum.length} Completed
          </span>
          <button 
            onClick={handleToggleAllModules}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            {expandedModules.length === curriculum.length && curriculum.length > 0 ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {curriculum.length > 0 ? (
        curriculum.map((item, index) => {
          const isExpanded = expandedModules.includes(item.id);
          
          return (
            <div key={item.id} className="bg-white rounded-[20px] border border-gray-100 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-300 mb-4">
              <div 
                className="px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors gap-4" 
                onClick={() => toggleModule(item.id)}
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="text-gray-400 mt-1 sm:mt-0 flex-shrink-0">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-inter font-semibold text-lg sm:text-[22px] sm:leading-[32px] tracking-[0px] text-[#0F172A]">
                        {index + 1}. {item.title}
                      </h3>
                      {item.is_active ? (
                        <span className="bg-[#E6F9F0] text-[#00D26A] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-50 text-red-500 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide flex-shrink-0">
                          Inactive
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-start md:justify-end ml-8 sm:ml-10 md:ml-0">
                  <button className="bg-[#EAEBFE] text-[#2B58FF] px-6 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#dfe1fe] transition-colors whitespace-nowrap">
                    Modules
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-5 border-t border-gray-50/50 bg-white relative">
                  {(() => {
                    const mod = progressData?.modules?.find((m: any) => m.module_id === item.id);
                    if (!mod) {
                      return (
                        <div className="text-gray-500 text-[13px] font-medium py-2">
                          No module assigned yet.
                        </div>
                      );
                    }
                    return (
                      <div className="text-[13px] sm:text-[14px] pr-0 sm:pr-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-[26px] h-[26px] rounded-full bg-[#20D26B] flex items-center justify-center text-white shrink-0">
                            <Check size={16} strokeWidth={3} />
                          </div>
                          <span className="font-inter font-normal tracking-[0px] text-[#0F172A] text-base sm:text-[20px] sm:leading-[28px]">
                            Progress Overview
                          </span>
                        </div>
                        <div className="ml-10">
                          <p className="text-[#334155] mb-2">
                            Completion: {(progressData.completion_ratio * 100).toFixed(1)}%
                          </p>
                          <p className="text-[#334155]">
                            Modules completed: {progressData.completed_modules} / {progressData.total_modules}
                          </p>
                        </div>

                        <div className="mt-8">
                          <div className="flex items-center gap-3 mb-5">
                            <div className="w-[26px] h-[26px] rounded-full bg-[#20D26B] flex items-center justify-center text-white shrink-0">
                              <Check size={16} strokeWidth={3} />
                            </div>
                            <span className="font-inter font-normal tracking-[0px] text-[#0F172A] text-base sm:text-[20px] sm:leading-[28px]">
                              Module details
                            </span>
                          </div>
                          <ul className="space-y-4 ml-10">
                            <li className="flex flex-col sm:flex-row justify-between sm:items-center text-[#334155] gap-1 sm:gap-0 border-b border-gray-50 sm:border-none pb-2 sm:pb-0">
                              <span>Module {item.id}</span>
                              <span className={`text-[12px] sm:text-[13px] font-medium ${
                                mod.status === 'completed' ? 'text-green-500' :
                                mod.status === 'in_progress' ? 'text-blue-500' : 'text-gray-400'
                              }`}>
                                {mod.status.replace("_", " ")}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 text-center shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A]">
          <p className="text-gray-500 text-sm font-medium">No curriculum modules available.</p>
        </div>
      )}
    </>
  );
};

export default CourseCurriculum;
