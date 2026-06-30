import React from 'react';
import { Play, Lock, LockKeyhole, Clock } from 'lucide-react';
import { NavigateFunction } from 'react-router-dom';

interface QuizCardProps {
  quiz: any;
  isUnlocked: boolean;
  onEnrollClick: () => void;
  navigate: NavigateFunction;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, isUnlocked, onEnrollClick, navigate }) => {
  return (
              <div className="bg-white rounded-[20px] p-5 pt-6 border border-gray-100 shadow-sm relative overflow-hidden group flex flex-col h-full">
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${quiz.topBorderColor}`}></div>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] ${quiz.techColor}`}>
                         {quiz.tech}
                      </div>
                   </div>
                </div>

                <h3 className="text-[16px] font-bold text-slate-800 mb-2">{quiz.title}</h3>
                <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 min-h-[38px]">{quiz.desc}</p>
                
                <div className="flex items-center gap-4 text-[12px] text-gray-400 mb-4 font-medium mt-auto">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {quiz.time}</span>
                </div>

                {quiz.status === 'locked' && !isUnlocked && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                     <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-3">
                        <Lock className="w-5 h-5 text-[#5B4FFF]" />
                     </div>
                     <h4 className="font-bold text-slate-800 text-[15px] mb-1">Premium Quiz</h4>
                     <p className="text-[12px] text-gray-600 mb-4">Enroll to unlock this quiz</p>
                     <button 
                        onClick={onEnrollClick}
                        className="px-6 py-2.5 bg-[#5B4FFF] text-white text-[13px] font-bold rounded-full shadow-sm hover:bg-[#4a3fdb] transition-colors w-[80%] mx-auto"
                     >
                        Unlock with Course Enrollment
                     </button>
                     <button 
                        onClick={onEnrollClick}
                        className="mt-3 flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-600"
                     >
                        <LockKeyhole className="w-3 h-3" /> Unlock with Enrollment
                     </button>
                  </div>
                )}

                <button 
                  onClick={() => (quiz.status === 'unlocked' || isUnlocked) && navigate(`/guest/quizzes/${quiz.id}`, { state: { quizId: quiz.id, quizTitle: quiz.title } })}
                  className={`w-full py-2.5 rounded-full flex items-center justify-center gap-2 text-[13px] font-bold transition-colors mt-auto ${
                    (quiz.status === 'unlocked' || isUnlocked) 
                      ? 'bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Play className={`w-4 h-4 ${(quiz.status === 'unlocked' || isUnlocked) ? 'fill-white' : 'fill-gray-400'}`} /> 
                  Start Quiz
                </button>
              </div>
  );
};

export default QuizCard;
