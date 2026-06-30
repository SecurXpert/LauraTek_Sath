import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { decodeJWT } from "@/lib/jwtUtils";

interface CurriculumItem {
  id: number;
  course_id: number;
  title: string;
  description: string;
  order_index: number;
  is_active: boolean;
}

interface ModuleProgress {
  module_id: number;
  status: "not_started" | "in_progress" | "completed";
  completed_at: string | null;
}

interface CourseProgress {
  student_id: number;
  course_id: number;
  completion_ratio: number;
  completed_modules: number;
  total_modules: number;
  modules: ModuleProgress[];
}

interface CurriculumViewProps {
  course: any;
  onBack: () => void;
}

const CurriculumView: React.FC<CurriculumViewProps> = ({ course, onBack }) => {
  const [curriculum, setCurriculum] = useState<CurriculumItem[] | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      setLoadingCurriculum(true);
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");
        if (!token) return;

        const decoded = decodeJWT(token);
        const studentId = decoded?.student_id || Number(decoded?.sub) || 12; // Dynamic studentId
        
        const [currRes, progRes] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_API_URL}/courses/${course.id || course.course_id}/curriculum`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `${import.meta.env.VITE_API_URL}/courses/students/${studentId}/courses/${course.id || course.course_id}/progress`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ).catch(() => null)
        ]);

        if (currRes.ok) {
          const data = await currRes.json();
          setCurriculum(data);
        }
        
        if (progRes && progRes.ok) {
          const progData = await progRes.json();
          setCourseProgress(progData);
        }
      } catch (err) {
        console.error("Error fetching curriculum:", err);
      } finally {
        setLoadingCurriculum(false);
      }
    };

    if (course) {
      fetchCurriculum();
    }
  }, [course]);

  const toggleExpand = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 w-full bg-[#FAFBFF] p-6 lg:p-10 min-h-full">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-4 sm:gap-0">
          <div>
            <h1 className="font-inter font-bold text-2xl sm:text-[36.73px] sm:leading-[44.07px] tracking-[0px] text-[#0F172A]">Course Curriculum</h1>
            <p className="font-inter font-normal text-base sm:text-[19.59px] sm:leading-[29.38px] tracking-[0px] text-[#64748B] mt-1">{course.title || "React Advanced Patterns"}</p>
          </div>
          <button 
            onClick={onBack} 
            className="flex items-center justify-center gap-2 w-full sm:w-[111px] h-[48px] rounded-[14px] px-4 py-2 bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white font-semibold text-[14px] hover:opacity-90 transition-opacity"
          >
            Back
          </button>
        </div>

        {loadingCurriculum ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 animate-pulse font-medium">Loading curriculum...</p>
          </div>
        ) : curriculum && curriculum.length > 0 ? (
          <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            {curriculum
              .sort((a, b) => a.order_index - b.order_index)
              .map((item) => {
                const isExpanded = expandedModules.includes(item.id);
                const moduleProgress = courseProgress?.modules?.find((m) => m.module_id === item.id);
                const status = moduleProgress?.status || "not_started";
                const isCompleted = status === "completed";
                const isInProgress = status === "in_progress";

                return (
                  <div key={item.id} className="bg-white rounded-[20px] border border-gray-100 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-300">
                    <div 
                      className="px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors gap-4" 
                      onClick={() => toggleExpand(item.id)}
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <div className="text-gray-400 mt-1 sm:mt-0 flex-shrink-0">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h3 className="font-inter font-semibold text-lg sm:text-[30.38px] sm:leading-[45.57px] tracking-[0px] text-[#0F172A]">
                              {item.order_index + 1}. {item.title}
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
                          const mod = courseProgress?.modules?.find((m: any) => m.module_id === item.id);
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
                              <div className="ml-10 sm:ml-[38px]">
                                <p className="text-[#334155] mb-2">
                                  Completion: {(courseProgress.completion_ratio * 100).toFixed(1)}%
                                </p>
                                <p className="text-[#334155]">
                                  Modules completed: {courseProgress.completed_modules} / {courseProgress.total_modules}
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
                                <ul className="space-y-4 ml-10 sm:ml-[38px]">
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
              })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white rounded-2xl border border-gray-100">
            <p className="text-lg font-medium">No curriculum items available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumView;
