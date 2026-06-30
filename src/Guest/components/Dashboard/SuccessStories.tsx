import React from 'react';
import { ChevronRight } from 'lucide-react';
import { successStoriesData } from './dashboardData';

interface SuccessStoriesProps {
  currentStoryIndex: number;
  handlePrevStory: () => void;
  handleNextStory: () => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ 
  currentStoryIndex, 
  handlePrevStory, 
  handleNextStory 
}) => {
  return (
      <div className="bg-[#F4F1FF] rounded-[24px] px-6 pt-4 pb-5 lg:px-10 lg:pt-5 lg:pb-6 mt-0 w-full shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[22px] lg:text-[26px] font-bold text-slate-900">Success Stories</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrevStory}
              className="w-10 h-10 rounded-full bg-[#7B46F6] text-white flex items-center justify-center hover:bg-[#6035EE] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5 rotate-180 -ml-0.5 stroke-[2.5]" />
            </button>
            <button 
              onClick={handleNextStory}
              className="w-10 h-10 rounded-full bg-[#7B46F6] text-white flex items-center justify-center hover:bg-[#6035EE] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5 ml-0.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((offset) => {
            const index = (currentStoryIndex + offset) % successStoriesData.length;
            const story = successStoriesData[index];
            return (
              <div key={index} className="bg-white rounded-[24px] p-8 shadow-sm flex flex-col relative overflow-hidden min-h-[260px]">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 ring-2 ring-[#F4F1FF]">
                    <img src={story.image} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-[16px] leading-tight">{story.name}</h4>
                    <p className="text-slate-500 text-[14px] font-medium">{story.role}</p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10 pr-2 sm:pr-4">
                  <div className="text-[#7B46F6] text-[40px] sm:text-[50px] font-serif leading-[0.8] shrink-0 font-bold mt-1">“</div>
                  <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed">
                    {story.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default SuccessStories;
