import React, { useState } from 'react';
import { PlayCircle, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface CourseCurriculumTabProps {
  course: any;
  courseContent: any;
}

const CourseCurriculumTab: React.FC<CourseCurriculumTabProps> = ({ course, courseContent }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

  return (
            <div 
              className="bg-white rounded-[24px] p-8 border border-gray-100"
              style={{ boxShadow: '0px 10.05px 12.56px -7.54px #0000001A, 0px 25.12px 31.4px -6.28px #0000001A' }}
            >
              <div className="mb-8">
                <h3 className="text-[20px] font-bold text-slate-900 mb-1">Course Curriculum</h3>
                <p className="text-[14px] text-slate-500 font-medium">{courseContent.curriculum.length} sections • {courseContent.curriculum.reduce((acc: any, curr: any) => acc + curr.lessonsCount, 0)} lessons • {course.duration} total</p>
              </div>

              <div className="space-y-4">
                {courseContent.curriculum.map((section: any) => (
                  <div key={section.id} className="border border-gray-100 rounded-[16px] overflow-hidden bg-white">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#F4F1FF] text-[#5B4FFF] font-bold text-[14px] flex items-center justify-center shrink-0">
                          {section.id}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-slate-900 text-[15px]">{section.title}</h4>
                          <p className="text-[13px] text-slate-500 font-medium mt-0.5">{section.lessonsCount} lessons</p>
                        </div>
                      </div>
                      <div className="text-slate-400">
                        {expandedSection === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {expandedSection === section.id && section.items.length > 0 && (
                      <div className="px-5 pb-5 pt-2">
                        <div className="space-y-2">
                          {section.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between py-3 px-4 rounded-[12px] hover:bg-[#F8F9FE] transition-colors group">
                              <div className="flex items-center gap-3">
                                {item.type === 'video' ? (
                                  <div className="w-8 h-8 rounded-full bg-[#F4F1FF] flex items-center justify-center text-[#5B4FFF]">
                                    <PlayCircle className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Lock className="w-4 h-4" />
                                  </div>
                                )}
                                <span className={`text-[14.5px] font-medium ${item.type === 'video' ? 'text-slate-800' : 'text-slate-500'}`}>
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                {item.isPreview && (
                                  <span className="px-3 py-1 rounded-full bg-[#F4F1FF] text-[#5B4FFF] text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                    Preview
                                  </span>
                                )}
                                <span className="text-[13px] text-slate-500 font-medium">{item.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
  );
};

export default CourseCurriculumTab;
