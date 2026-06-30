import React from 'react';

interface CourseTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
          <div className="bg-white rounded-full p-1.5 flex mb-8 shadow-[0px_4px_20px_rgba(149,157,165,0.05)] border border-gray-100 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-[#5B4FFF] text-white shadow-md' 
                    : 'text-slate-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
  );
};

export default CourseTabs;
