import React from 'react';
import { Search, Tag, BookOpen, Calendar, Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Contactus from '../../../components/ui/contactus';

interface ExamListProps {
  exams: any[];
  loadingExams: boolean;
  examSearch: string;
  setExamSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: React.SetStateAction<number>) => void;
  itemsPerPage: number;
  setSelectedExamId: (id: number) => void;
  setShowCompiler: (show: boolean) => void;
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
}

const ExamList: React.FC<ExamListProps> = ({
  exams, loadingExams, examSearch, setExamSearch, currentPage, setCurrentPage,
  itemsPerPage, setSelectedExamId, setShowCompiler, contactOpen, setContactOpen
}) => {
  const filteredExams = exams.filter(e => (e.title || '').toLowerCase().includes(examSearch.toLowerCase()));
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);

  return (
    <>
      <div className="px-4 lg:px-8 py-8 w-full max-w-[1400px] mx-auto min-h-screen">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-slate-800 mb-1">Exam Portal</h1>
          <p className="text-[14px] text-gray-500">View and start your available exams</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-[20px] font-bold text-slate-800">Available Exams</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search exams..." 
              value={examSearch}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setExamSearch(value);
                }
              }}
              className="pl-10 pr-4 py-2.5 w-full sm:w-[300px] bg-white border border-gray-200 rounded-full text-[13px] outline-none focus:border-[#7C3AED] transition-colors"
            />
          </div>
        </div>

        {loadingExams ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-[#7C3AED]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, originalIndex) => ({ ...exam, originalIndex }))
              .filter(e => (e.title || '').toLowerCase().includes(examSearch.toLowerCase()))
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((exam, i) => (
              <div key={exam.id || i} className="bg-white rounded-[16px] p-6 border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.06)] transition-shadow">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Exam Title</p>
                       <h3 className="text-[18px] font-bold text-slate-800 leading-tight">{exam.title}</h3>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                       <span className="px-2 py-1 bg-[#F5F3FF] text-[#A855F7] text-[10px] font-bold rounded-[6px] flex items-center gap-1.5">
                          <Tag className="w-3 h-3" /> {exam.category || 'Technical'}
                       </span>
                    </div>
                 </div>
                 
                 <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description</p>
                    <div className="bg-[#F8F9FA] rounded-[12px] p-4 min-h-[72px]">
                       <p className="text-[13px] text-gray-600 line-clamp-2">{exam.description || "This description will be visible to students when they view the exam"}</p>
                    </div>
                 </div>

                 <div className="bg-[#FCFCFF] border border-[#F5F3FF] rounded-[12px] p-4 flex flex-col gap-3 mt-auto mb-5">
                    <div className="flex items-center gap-3 text-[13px]">
                       <BookOpen className="w-4 h-4 text-[#A855F7]" />
                       <span className="font-bold text-slate-700 w-16">Course:</span>
                       <span className="text-gray-600 line-clamp-1 flex-1">{exam.course || exam.course_id || "Data Base"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                       <Calendar className="w-4 h-4 text-[#A855F7]" />
                       <span className="font-bold text-slate-700 w-16">Start:</span>
                       <span className="text-gray-600">{exam.start_time || "Jun 19, 12:00 AM"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                       <Clock className="w-4 h-4 text-[#A855F7]" />
                       <span className="font-bold text-slate-700 w-16">Duration:</span>
                       <span className="text-gray-600">{exam.duration_minutes || exam.duration || "120"} mins</span>
                    </div>
                 </div>

                 <button 
                   onClick={() => {
                     setSelectedExamId(exam.id || exam.exam_id);
                     setShowCompiler(true);
                   }} 
                   className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[14px] font-bold rounded-[12px] transition-colors shadow-sm"
                 >
                   Start Exam Now
                 </button>
              </div>
            ))}
          </div>
        )}

        {!loadingExams && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 mb-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 h-10 rounded-full flex items-center gap-1 border border-gray-200 text-gray-600 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#8B5CF6] text-white shadow-sm">
              {currentPage}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 h-10 rounded-full flex items-center gap-1 border border-gray-200 text-gray-600 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <Contactus 
        open={contactOpen} 
        setOpen={setContactOpen}
      />
    </>
  );
};

export default ExamList;
