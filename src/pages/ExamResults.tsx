import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trophy, Calendar, CheckCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Profileheader from '@/components/ui/Profileheader';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/api/instance';

export default function ExamResults() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('Results');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  // Try to grab student ID. The screenshot shows candidate_id=16
  const studentId = localStorage.getItem('student_id') || localStorage.getItem('user_id') || '16';

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['examResults', studentId],
    queryFn: async () => {
      // The API call matches the screenshot: GET /exam/results?candidate_id=...
      // Without passing exam_id, we hope the backend returns all exams for the candidate.
      // If it requires exam_id, the user might need to specify it, but usually a dashboard fetches all.
      try {
        const response = await api.get(`/exam/results?candidate_id=${studentId}`);
        return Array.isArray(response.data) ? response.data : (response.data?.value || []);
      } catch (err) {
        console.error("Failed to fetch exam results:", err);
        return [];
      }
    },
    refetchOnMount: "always",
  });

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f8fafc] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="z-20 w-full min-w-0">
          <Profileheader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        <main className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Compiler Results</h1>
            <p className="text-sm text-gray-500 mt-1">View your performance across all completed exams.</p>
          </div>

          {isLoading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h2>
              <p className="text-gray-500 text-center max-w-md">
                You haven't completed any exams yet. Your results will appear here once you finish an exam.
              </p>
              <button 
                onClick={() => navigate('/exams')}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-full hover:opacity-90 transition shadow-md font-medium"
              >
                Browse Exams
              </button>
            </div>
          ) : (
            <div className="grid gap-6 pb-10">
              {currentResults.map((result: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#5B4FFF]/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-[#5B4FFF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{result.exam_title || 'Exam Application'}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {result.submitted_at 
                              ? new Date(result.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Unknown Date'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-medium">Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center md:items-end bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Score</span>
                    <div className="text-3xl font-bold text-[#6B46FF]">
                      {result.total !== undefined ? result.total : '-'}
                    </div>
                  </div>
                </div>
              ))}
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-400 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center mx-1">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-[#5B4FFF] text-white shadow-sm cursor-default">
                      {currentPage}
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-slate-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
