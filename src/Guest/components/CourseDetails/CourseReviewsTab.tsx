import React from 'react';
import { Star } from 'lucide-react';

interface CourseReviewsTabProps {
  course: any;
  courseContent: any;
}

const CourseReviewsTab: React.FC<CourseReviewsTabProps> = ({ course, courseContent }) => {
  return (
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_rgba(149,157,165,0.05)] border border-gray-100">
              <div className="flex flex-col md:flex-row gap-12 mb-10 pb-10 border-b border-gray-100">
                {/* Rating Summary */}
                <div className="text-center md:text-left shrink-0">
                  <div className="text-[64px] font-bold text-slate-900 leading-none mb-2">{course.rating}</div>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-[14px] text-slate-500 font-medium">Course Rating</div>
                </div>
                
                {/* Rating Bars */}
                <div className="flex-1 flex flex-col gap-3">
                  {[
                    { stars: 5, percent: 72 },
                    { stars: 4, percent: 20 },
                    { stars: 3, percent: 6 },
                    { stars: 2, percent: 2 },
                    { stars: 1, percent: 2 }
                  ].map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16 shrink-0">
                        <span className="text-[14px] font-medium text-slate-600">{bar.stars}</span>
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${bar.percent}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-[13px] font-medium text-slate-500 shrink-0">
                        {bar.percent}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-8">
                {courseContent.reviews.map((review: any, idx: number) => (
                  <div key={idx} className="pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F4F1FF] text-[#5B4FFF] flex items-center justify-center font-bold text-[18px]">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-[15px]">{review.name}</h4>
                          <p className="text-[13px] text-slate-500 font-medium">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[15px] text-slate-600 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
  );
};

export default CourseReviewsTab;
