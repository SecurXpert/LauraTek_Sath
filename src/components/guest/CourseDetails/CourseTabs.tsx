import React from 'react';

interface CourseTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
          <div 
            className="bg-white flex mb-8 overflow-x-auto hide-scrollbar items-center border-[#f3f4f6]"
            style={{
              borderRadius: '20.1px',
              borderWidth: '1.26px',
              borderTop: '1.26px solid #6C3BFF1F',
              padding: '5.02px',
              gap: '5.02px',
              boxShadow: '0px 1.26px 2.51px -1.26px #0000001A, 0px 1.26px 3.77px 0px #0000001A'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-[#5B4FFF] text-white shadow-guest' 
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
