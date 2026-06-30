import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Loader2, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import api from '@/api/instance';
import Sidebar from '@/components/sidebar';
import Profileheader from '@/components/ui/Profileheader';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";

interface ExamAPIResponse {
  id: number;
  title: string;
  description: string;
  course_id: number;
  course_title: string;
  window_start: string;
  window_end: string;
  duration: number;
  category: string;
  is_active: number;
  status?: string;
  is_completed?: boolean;
  is_submitted?: boolean;
  completed?: boolean;
}

export default function Exams() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('Exams');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: exams = [], isLoading: loading } = useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const response = await api.get('/exam/get');
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && response.data.value) {
        return response.data.value;
      }
      return [];
    },
    refetchOnMount: "always",
  });

  const handleStartExam = async (exam: ExamAPIResponse) => {
    // Quick check if frontend flag exists
    if (exam.status === 'completed' || exam.status === 'submitted' || exam.is_completed || exam.is_submitted || exam.completed) {
      toast.error("Exam already submitted!");
      return;
    }

    const toastId = toast.loading("Checking exam status...");
    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("access_token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/exam/get/details?exam_id=${exam.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      
      // If API returns 400 with 'already submitted'
      if (!res.ok) {
        const errorMsg = data.detail || data.message || "Error";
        if (String(errorMsg).toLowerCase().includes("already submitted") || String(errorMsg).toLowerCase().includes("completed")) {
          toast.dismiss(toastId);
          toast.error("Exam already submitted!");
          return;
        }
      }
      
      // If API returns 200 but includes a submitted flag
      if (data.is_submitted || data.status === 'completed' || data.status === 'submitted' || (data.message && String(data.message).toLowerCase().includes("already submitted"))) {
        toast.dismiss(toastId);
        toast.error("Exam already submitted!");
        return;
      }
      
      toast.dismiss(toastId);
      navigate(`/dashboard/compiler?exam_id=${exam.id}`);
    } catch (err) {
      console.error("Exam status check failed", err);
      toast.dismiss(toastId);
      // Fallback
      navigate(`/dashboard/compiler?exam_id=${exam.id}`);
    }
  };

  // Helper to format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const ExamCard = ({ exam }: { exam: ExamAPIResponse }) => (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-6 flex flex-col gap-5 hover:shadow-md transition-all duration-200 h-full">
      {/* Title & Category */}
      <div className="space-y-2 border-b border-gray-100 pb-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1 truncate">Exam Title</span>
            <h3 className="text-[17px] sm:text-lg font-bold text-gray-900 leading-tight capitalize break-words line-clamp-2" title={exam.title}>
              {exam.title}
            </h3>
          </div>
          <div className="flex flex-col items-end shrink-0 max-w-[120px]">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Category</span>
            <span className="inline-flex items-center gap-1 bg-[#7c3aed]/10 text-[#7c3aed] px-2 py-1 rounded-md text-[11px] font-semibold capitalize max-w-full" title={exam.category}>
              <Tag className="w-3 h-3 shrink-0" />
              <span className="truncate">{exam.category}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Description</span>
        <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50/75 p-3 rounded-lg border border-gray-100 break-all whitespace-normal overflow-hidden" title={exam.description}>
          {exam.description || "No description provided."}
        </p>
      </div>

      {/* Meta Details */}
      <div className="space-y-2.5 bg-[#7c3aed]/[0.02] p-4 rounded-lg border border-[#7c3aed]/10 mt-1 flex-grow">
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
          <BookOpen className="w-4 h-4 text-[#7c3aed] shrink-0" />
          <span className="min-w-0 flex-1 truncate" title={exam.course_title}><strong className="font-semibold text-gray-900">Course:</strong> <span className="capitalize">{exam.course_title}</span></span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-[#7c3aed] shrink-0" />
          <span className="min-w-0 flex-1 truncate"><strong className="font-semibold text-gray-900">Start:</strong> {formatDate(exam.window_start)}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-[#7c3aed] shrink-0" />
          <span className="min-w-0 flex-1 truncate"><strong className="font-semibold text-gray-900">Duration:</strong> {exam.duration} mins</span>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <Button
          onClick={() => handleStartExam(exam)}
          className="w-full bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-full py-4 sm:py-5 text-sm sm:text-base font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Start Exam Now
        </Button>
      </div>
    </div>
  );

  const filteredExams = exams.filter((exam: ExamAPIResponse) => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exam.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const currentExams = filteredExams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f7fafd] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActive={setActive}
        active={active}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Profile Header */}
        <div className="z-50 w-full min-w-0">
          <Profileheader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 pt-4 pb-12 relative">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Exam Portal</h1>
            <p className="text-sm text-gray-500 mt-1">View and start your available exams</p>
          </div>

          {loading ? (
            <div className="mb-12">
              <div className="mb-6 h-7 w-40">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-6 flex flex-col gap-5">
                    <div className="space-y-2 border-b border-gray-100 pb-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-2 w-2/3">
                          <Skeleton className="h-3 w-1/3" />
                          <Skeleton className="h-5 w-3/4" />
                        </div>
                        <div className="space-y-2 w-1/3 flex flex-col items-end">
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-6 w-16 rounded-md" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-16 w-full rounded-lg" />
                    </div>
                    <div className="space-y-2.5 p-4 rounded-lg mt-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="mt-auto pt-2">
                      <Skeleton className="h-[60px] w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p>No exams available at the moment.</p>
            </div>
          ) : (
            <section className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-900">Available Exams</h2>
                <div className="relative w-full sm:w-64 shrink-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value.replace(/[0-9]/g, ''));
                      setCurrentPage(1);
                    }}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all bg-white"
                  />
                </div>
              </div>
              {filteredExams.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {currentExams.map((exam: ExamAPIResponse) => (
                      <ExamCard key={exam.id} exam={exam} />
                    ))}
                  </div>
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
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500 font-medium">No exams found matching your search.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
