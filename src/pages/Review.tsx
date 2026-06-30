import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Star, Send, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReviewData } from "@/hooks/useReviewData";

const Review = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Review");

  const {
    rating, setRating,
    comments,
    isSubmitting,
    courses,
    instructors,
    selectedCourse, setSelectedCourse,
    selectedTrainer, setSelectedTrainer,
    isCourseOpen, setIsCourseOpen,
    isTrainerOpen, setIsTrainerOpen,
    getCourseTitle,
    getInstructorName,
    submitReview,
    handleCommentChange
  } = useReviewData();

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f8faff] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-auto scrollbar-hide">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-200/40 border border-gray-100 overflow-hidden relative min-h-full">
              {/* Card Header Gradient */}
              <div className="h-1.5 bg-gradient-to-r from-[#2B58FF] via-[#9B2BFF] to-[#FF2B95]"></div>
              
              {/* Decorative Chat Bubble SVG */}
              <div className="absolute top-10 right-10 opacity-10 hidden md:block">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C9.65481 21 7.94093 20.4722 6.48512 19.5623L2.5 21L3.9377 17.0149C3.02777 15.5591 2.5 13.8452 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21 6.25329 21 11.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="p-6 sm:p-10 md:p-14">
                {/* Header Section Inside Card */}
                <div className="mb-10">
                  <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-2">
                    Course Review
                  </h1>
                  <p className="text-gray-500 text-[15px] font-medium">
                    Share your feedback to help us improve the learning experience.
                  </p>
                </div>

                <div className="space-y-10">
                  {/* Selection Section */}
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label className="block text-[16px] font-semibold text-[#333] mb-3">
                          Select Course
                        </label>
                        <div 
                          className="w-full bg-[#fcfcfc] border border-gray-100 rounded-[2rem] px-5 py-4 md:px-8 md:py-5 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-300 shadow-sm cursor-pointer flex justify-between items-center"
                          onClick={() => { setIsCourseOpen(!isCourseOpen); setIsTrainerOpen(false); }}
                        >
                          <span className={selectedCourse ? "text-gray-800 font-medium" : "text-gray-400"}>
                            {selectedCourse ? getCourseTitle(selectedCourse) : "-- Choose Course --"}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCourseOpen ? "rotate-180" : ""}`} />
                        </div>

                        <AnimatePresence>
                          {isCourseOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-[100] mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200"
                            >
                              <div 
                                className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-gray-500 transition-colors border-b border-gray-50 font-medium"
                                onClick={() => { setSelectedCourse(""); setIsCourseOpen(false); }}
                              >
                                -- Choose Course --
                              </div>
                              {courses.map((course: any, idx) => {
                                const cId = course.id || course.course_id;
                                const cTitle = course.course_title || course.title || course.course_name || course.name;
                                const isSelected = selectedCourse === String(cId);
                                return (
                                  <div 
                                    key={cId || `course-${idx}`}
                                    className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between border-b border-gray-50 last:border-0 ${isSelected ? "bg-blue-50/40" : ""}`}
                                    onClick={() => { setSelectedCourse(String(cId)); setIsCourseOpen(false); }}
                                  >
                                    <span className={`text-[15px] ${isSelected ? "text-[#4F58EC] font-semibold" : "text-gray-700 font-medium"}`}>
                                      {cTitle || `Course ${cId}`}
                                    </span>
                                    {cTitle && (
                                      <span className="bg-[#f0f3ff] text-[#4F58EC] text-[11px] font-bold px-2.5 py-1 rounded-md ml-3 whitespace-nowrap shadow-sm">
                                        ID: {cId}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <label className="block text-[16px] font-semibold text-[#333] mb-3">
                          Select Instructor
                        </label>
                        <div 
                          className="w-full bg-[#fcfcfc] border border-gray-100 rounded-[2rem] px-5 py-4 md:px-8 md:py-5 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-300 shadow-sm cursor-pointer flex justify-between items-center"
                          onClick={() => { setIsTrainerOpen(!isTrainerOpen); setIsCourseOpen(false); }}
                        >
                          <span className={selectedTrainer ? "text-gray-800 font-medium" : "text-gray-400"}>
                            {selectedTrainer ? getInstructorName(selectedTrainer) : "-- Choose Instructor --"}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTrainerOpen ? "rotate-180" : ""}`} />
                        </div>

                        <AnimatePresence>
                          {isTrainerOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-[100] mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200"
                            >
                              <div 
                                className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-gray-500 transition-colors border-b border-gray-50 font-medium"
                                onClick={() => { setSelectedTrainer(""); setIsTrainerOpen(false); }}
                              >
                                -- Choose Instructor --
                              </div>
                              {instructors.map((inst: any, idx) => {
                                const iId = inst.id || inst.instructor_id || inst.trainer_id;
                                const iName = inst.name || inst.instructor_name || inst.trainer_name || inst.first_name || `Instructor ${iId}`;
                                const isSelected = selectedTrainer === String(iId);
                                return (
                                  <div 
                                    key={iId || `inst-${idx}`}
                                    className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between border-b border-gray-50 last:border-0 ${isSelected ? "bg-blue-50/40" : ""}`}
                                    onClick={() => { setSelectedTrainer(String(iId)); setIsTrainerOpen(false); }}
                                  >
                                    <span className={`text-[15px] ${isSelected ? "text-[#4F58EC] font-semibold" : "text-gray-700 font-medium"}`}>
                                      {iName}
                                    </span>
                                    <span className="bg-[#f0f3ff] text-[#4F58EC] text-[11px] font-bold px-2.5 py-1 rounded-md ml-3 whitespace-nowrap shadow-sm">
                                      ID: {iId}
                                    </span>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="space-y-4">
                    <label className="block text-[16px] font-semibold text-[#333] mb-2">
                      Overall Rating
                    </label>

                    <div className="bg-[#fff9ff] rounded-[2rem] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 border border-pink-50/30 shadow-sm">
                      <div className="flex items-center gap-2 sm:gap-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(rating === star ? 0 : star)}
                            className="transition-all duration-300 hover:scale-110 active:scale-95"
                          >
                            <Star 
                              className={`w-8 h-8 sm:w-10 sm:h-10 ${
                                rating >= star 
                                  ? "fill-[#7C5CFF] text-[#7C5CFF]" 
                                  : "text-gray-200 fill-transparent"
                              } transition-colors duration-300`}
                              strokeWidth={1}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7C5CFF] to-[#FF2B95] tracking-tight">
                        {rating} / 5
                      </div>
                    </div>
                  </div>

                  {/* Thoughts Section */}
                  <div className="space-y-4">
                    <label className="block text-[16px] font-semibold text-[#333] mb-2 flex justify-between items-center">
                      <span>Your Thoughts</span>
                      <span className="text-sm font-normal text-gray-400">{comments.length}/100</span>
                    </label>
                    <textarea
                      rows={4}
                      maxLength={100}
                      value={comments}
                      onChange={handleCommentChange}
                      placeholder="Share your detailed experience with this course. What did you learn? What could be improved?"
                      className="w-full bg-[#fcfcfc] border border-gray-100 rounded-[2rem] px-5 py-4 md:px-8 md:py-6 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all duration-300 text-gray-700 placeholder:text-gray-300 resize-none shadow-sm overflow-y-auto break-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: "0px 6.49px 9.74px -6.49px #0000001A, 0px 16.24px 24.35px -4.87px #0000001A" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={submitReview}
                      disabled={isSubmitting || !comments.trim() || !selectedCourse || !selectedTrainer}
                      style={{
                        boxShadow: (isSubmitting || !comments.trim() || !selectedCourse || !selectedTrainer) 
                          ? "none" 
                          : "0px 6.49px 9.74px -6.49px #0000001A, 0px 16.24px 24.35px -4.87px #0000001A"
                      }}
                      className={`w-full h-[50px] md:h-[60px] rounded-full font-bold text-white flex items-center justify-center gap-3 transition-all duration-500 ${
                        isSubmitting || !comments.trim() || !selectedCourse || !selectedTrainer
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#4F58EC] to-[#7244ED]"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="font-inter font-medium text-[18px] md:text-[20px] leading-[28px] tracking-[-0.51px] text-center">Submit My Review</span>
                          <Send className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" strokeWidth={2.71} color="#FFFFFF" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Review;
