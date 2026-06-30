import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Filter, Search, ChevronDown, Clock, HelpCircle, RefreshCw, Users, TrendingUp, Target, Award, Activity, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { Skeleton } from "@/components/ui/skeleton";

import AssessmentStats from "./ui/assessments/AssessmentStats";
import AssessmentFilters from "./ui/assessments/AssessmentFilters";
import QuizCard from "./ui/assessments/QuizCard";
import QuizSkeleton from "./ui/assessments/QuizSkeleton";
import { Quiz, StudentAnalytics } from "./ui/assessments/types";
const Assessments = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Assessments");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [studentStats, setStudentStats] = useState<StudentAnalytics | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchQuizzes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/dashboard/available-quizzes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      // Add mock data for UI demonstration
      const enrichedData = data.map((quiz: Quiz, index: number) => ({
        ...quiz,
        subject: index % 2 === 0 ? "Java" : "Python",
        difficulty: index % 3 === 0 ? "Hard" : "Easy",
        questions: index % 2 === 0 ? 25 : 30,
        timeLimit: quiz.timer ? `${quiz.timer}m` : "30m",
        attempts: index % 2 === 0 ? 3 : 2,
        status: index % 2 === 0 ? "Completed" : "In Progress",
        bestScore: index % 2 === 0 ? 85 : 70,
        progress: index % 2 === 0 ? 100 : 60,
        lastAttempt: index % 2 === 0 ? "2 days ago" : "1 day ago",
        avgScore: index % 2 === 0 ? 72 : 65,
      })).sort((a: Quiz, b: Quiz) => (Number(b.id) || 0) - (Number(a.id) || 0));
      setQuizzes(enrichedData);
      setFilteredQuizzes(enrichedData);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // FETCH AVAILABLE QUIZZES
  // =============================
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // =============================
  // FETCH STUDENT ANALYTICS
  // =============================
  // useEffect(() => {
  //   const fetchStudentAnalytics = async () => {
  //     try {
  //       const token = localStorage.getItem("access_token");
  //       const studentId = localStorage.getItem("student_id") || "12";

  //       const res = await fetch(
  //         `${import.meta.env.VITE_API_URL}/quiz/admin/results/student/${studentId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       if (res.ok) {
  //         const data = await res.json();
  //         setStudentStats(data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching student analytics:", err);
  //     }
  //   };

  //   fetchStudentAnalytics();
  // }, []);

  // Filter quizzes based on search, date, and status
  useEffect(() => {
    let filtered = quizzes;

    // Search by name (alphabetical)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((quiz) =>
        (quiz.title?.toLowerCase() || "").includes(lowerQuery) ||
        (quiz.description?.toLowerCase() || "").includes(lowerQuery)
      );
      // Sort alphabetically when searching
      filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    // Filter by status
    if (selectedStatus !== "All Status") {
      filtered = filtered.filter((quiz) => quiz.status === selectedStatus);
    }

    setFilteredQuizzes(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, quizzes]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("All Status");
    setCurrentPage(1);
    fetchQuizzes();
  };

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuizzes = filteredQuizzes.slice(startIndex, endIndex);

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-[#f7fafd] to-blue-50 overflow-hidden">
 <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader />

        <main className="p-6 flex-1 overflow-auto bg-[#f8fafc]">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828] mb-2">Assessments</h1>
            <p className="text-gray-500">Test your knowledge and track your improvement</p>
          </motion.div>

          <AssessmentStats studentStats={studentStats} />

          <AssessmentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleReset={handleReset}
          />

          {/* Page Title & View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Available Quizzes
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <QuizSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Quiz Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {currentQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#6B46FF] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === totalPages 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredQuizzes.length === 0 && (
            <div className="mt-10 text-center text-gray-500">
              No quizzes available.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Assessments;
