import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CourseOverviewTabProps {
  courseContent: any;
}

const CourseOverviewTab: React.FC<CourseOverviewTabProps> = ({ courseContent }) => {
  return (
            <div className="flex flex-col gap-8">
              {/* What You'll Learn */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(149,157,165,0.05)] border border-gray-100">
                <h3 className="text-[20px] font-bold text-slate-900 mb-6">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseContent.whatYouWillLearn.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-[16px] bg-[#F8F9FE]">
                      <CheckCircle2 className="w-5 h-5 text-[#5B4FFF] shrink-0 mt-0.5" />
                      <span className="text-[14.5px] font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {courseContent.features.map((feature: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100">
                    <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-[14px] mb-1">{feature.title}</h4>
                    <p className="text-slate-500 text-[12px] font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(149,157,165,0.05)] border border-gray-100">
                <h3 className="text-[20px] font-bold text-slate-900 mb-6">Requirements</h3>
                <ul className="space-y-4">
                  {courseContent.requirements.map((req: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-[15px] text-slate-600 font-medium before:content-['•'] before:text-slate-400 before:text-xl">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  );
};

export default CourseOverviewTab;
