import React from 'react';
import { Lock, Trophy, BookOpen, Target, ChevronRight, Star } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface QuizSidebarProps {
  navigate: NavigateFunction;
  onEnrollClick: () => void;
}

const QuizSidebar: React.FC<QuizSidebarProps> = ({ navigate, onEnrollClick }) => {
  return (
        <div className="xl:col-span-1 flex flex-col gap-6">
           
           {/* Why Practice */}
           <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#5B4FFF] flex items-center justify-center shadow-sm">
                   <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-800">Why Practice?</h3>
             </div>

             <div className="space-y-4">
                {[
                  { icon: <BookOpen className="w-4 h-4 text-white" />, title: "Improve Coding Skills", color: "bg-[#0EA5E9]", route: "/guest/compiler" },
                  { icon: <Target className="w-4 h-4 text-white" />, title: "Prepare for Interviews", color: "bg-[#F43F5E]", route: "/guest/quizzes" },
                  { icon: <Trophy className="w-4 h-4 text-white" />, title: "Earn Certificates", color: "bg-[#F59E0B]", route: "/guest/certificates" }
                ].map((item, idx) => (
                  <div key={idx} onClick={() => navigate(item.route)} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                           {item.icon}
                        </div>
                        <span className="text-[14px] font-medium text-slate-700">{item.title}</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
             </div>
           </div>

           {/* Achievements */}
           <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-bold text-slate-800">Achievements</h3>
                <Lock className="w-4 h-4 text-gray-300" />
             </div>

             <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
                   <div className="text-2xl mb-2">🧩</div>
                   <span className="text-[11px] font-medium text-gray-500">Problem Solver</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
                   <div className="text-2xl mb-2">⚡</div>
                   <span className="text-[11px] font-medium text-gray-500">Quick Learner</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
                   <div className="text-2xl mb-2">🏆</div>
                   <span className="text-[11px] font-medium text-gray-500">Top Performer</span>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-60">
                   <div className="text-2xl mb-2">💼</div>
                   <span className="text-[11px] font-medium text-gray-500">Interview Ready</span>
                </div>
             </div>

             <button 
                onClick={onEnrollClick}
                className="w-full py-3 bg-[#5B4FFF]/10 hover:bg-[#5B4FFF]/20 text-[#5B4FFF] text-[13px] font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
             >
                <Trophy className="w-4 h-4" /> Unlock Achievements
             </button>
           </div>
        </div>
  );
};

export default QuizSidebar;
