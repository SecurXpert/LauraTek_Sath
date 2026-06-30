import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, BookOpen, Clock, Users, Star, Lock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import guest1 from '../assets/guest1.png';
import guest2 from '../assets/guest2.png';
import guest16 from '../assets/guest16.png';
import guest6 from '../assets/guest6.png';
import Contactus from '../components/ui/contactus';

const GuestCourses = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [contactOpen, setContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const itemsPerPage = 8;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, statusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSearchQuery(value);
    }
  };

  const filters = ['All', 'Development', 'Data Science', 'Design', 'Marketing', 'DevOps', 'Mobile', 'Cybersecurity'];

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://lauratek.in:8000/admin/courses');
        const data = await response.json();
        
        const coursesList = Array.isArray(data) ? data : (data.courses || []);
        
        const formattedCourses = coursesList.map((c: any) => ({
          id: c.id,
          category: c.category_id === 2 ? 'Development' : (c.category_id === 6 ? 'Data Science' : 'Development'),
          status: c.status,
          difficulty: c.level || '',
          title: c.title || '',
          description: c.description || "",
          hours: c.duration ? `${c.duration}h` : '',
          image: c.image || guest6
        }));
        setCourses(formattedCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses
    .map((course, originalIndex) => ({ ...course, originalIndex }))
    .filter(course => activeFilter === 'All' || course.category === activeFilter)
    .filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(course => {
      const isUnlocked = course.originalIndex < 2;
      if (statusFilter === 'Preview') return isUnlocked;
      if (statusFilter === 'Locked') return !isUnlocked;
      return true;
    });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-slate-800 mb-1">Courses</h1>
          <p className="text-[14px] text-gray-500">Browse 8 courses across multiple domains</p>
        </div>
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-full text-[14px] font-medium outline-none focus:border-[#5B4FFF] shadow-sm cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="Preview">Preview</option>
            <option value="Locked">Locked</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Banner */}
      <div className="relative w-full rounded-[24px] overflow-hidden mb-8 shadow-sm group bg-[#0A0514]">
        <img src={guest16} alt="Explore Courses Banner" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0514] via-[#0A0514]/90 to-transparent"></div>
        <div className="relative p-8 md:p-12 flex flex-col justify-between h-full min-h-[380px]">
          <div className="max-w-xl mb-10">
            <h2 className="text-4xl md:text-[54px] font-bold text-white mb-5 leading-[1.1]">
              Discover Courses <br />
              That Shape <span className="text-[#A855F7] italic">Your Future</span>
            </h2>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-relaxed max-w-md font-medium">
              Explore top-rated courses across multiple domains and start your learning journey today.
            </p>
          </div>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 md:gap-10 p-5 rounded-[12px] bg-[#1a103c]/40 border border-[#3b2d6e] backdrop-blur-md w-max max-w-full">
            <div className="flex items-center gap-3">
              <div className="text-[#A855F7]"><User className="w-6 h-6" strokeWidth={1.5} /></div>
              <div>
                <div className="text-white font-bold text-[17px] leading-tight">50+</div>
                <div className="text-gray-400 text-[12px] font-medium">Expert Instructors</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#A855F7]"><BookOpen className="w-6 h-6" strokeWidth={1.5} /></div>
              <div>
                <div className="text-white font-bold text-[17px] leading-tight">500+</div>
                <div className="text-gray-400 text-[12px] font-medium">Cources Available</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#A855F7]"><Users className="w-6 h-6" strokeWidth={1.5} /></div>
              <div>
                <div className="text-white font-bold text-[17px] leading-tight">10k+</div>
                <div className="text-gray-400 text-[12px] font-medium">Active learners</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[#A855F7]"><Star className="w-6 h-6" strokeWidth={1.5} /></div>
              <div>
                <div className="text-white font-bold text-[17px] leading-tight">95%</div>
                <div className="text-gray-400 text-[12px] font-medium">positive Reviewers</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Search Bar */}
      <div className="bg-white rounded-[16px] p-2 flex items-center border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center flex-1 px-4 gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search courses by name, instructor, or topic..." 
            className="w-full bg-transparent outline-none text-[15px] placeholder:text-gray-400"
          />
        </div>
        <button className="px-8 py-2.5 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white text-[14px] font-bold rounded-[12px] shadow-sm transition-colors">
          Search
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all border ${
              activeFilter === filter 
                ? 'bg-[#5B4FFF] text-white border-[#5B4FFF] shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {paginatedCourses.map((course) => {
            const index = course.originalIndex;
            return (
          <div 
            key={course.id} 
            className="relative overflow-hidden group border-0 w-full rounded-[16px] flex flex-col cursor-pointer"
            onClick={() => {
              const isUnlocked = index < 2;
              if (isUnlocked) {
                navigate(`/guest/course/${course.id}`, { state: { course } });
              } else {
                setSelectedCourseId(course.id);
                setContactOpen(true);
              }
            }}
            style={{ 
              height: '380px', 
              backgroundColor: '#5B4FFF'
            }}
          >
            {/* Background Image Container */}
            <div className="absolute top-0 left-0 w-full h-[65%]">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#5B4FFF]"></div>
            </div>
            
            {/* Top Badges */}
            <div className="absolute top-4 right-4 flex justify-end z-10">
              {!(index < 2) ? (
                <span className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-semibold rounded-full bg-[#FFF5CE] text-[#A16207]">
                  <Lock className="w-3.5 h-3.5" /> Locked
                </span>
              ) : (
                <span className="px-3 py-1 text-[12px] font-semibold rounded-full bg-[#E6F9F0] text-[#00A962]">
                  Preview
                </span>
              )}
            </div>

            {/* Content at Bottom */}
            <div className="p-6 text-white z-10 flex flex-col h-full justify-end mt-auto">
              {course.difficulty && (
                <div className="mb-3">
                  <span className="inline-block px-3.5 py-1 bg-white text-[#5B4FFF] text-[13px] font-bold rounded-full shadow-sm">
                    {course.difficulty}
                  </span>
                </div>
              )}
              
              <h3 className="text-[20px] font-bold mb-3 leading-snug line-clamp-2">
                {course.title}
              </h3>
              
              {course.hours && (
                <div className="flex items-center gap-1.5 text-[14px] text-white/90 font-medium">
                  <Clock className="w-4 h-4 opacity-80" /> {course.hours}
                </div>
              )}
            </div>
          </div>
            );
          })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 h-10 rounded-full flex items-center gap-1 border border-gray-200 text-gray-600 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] bg-[#5B4FFF] text-white shadow-sm">
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

      <Contactus 
        open={contactOpen} 
        setOpen={setContactOpen} 
        onSuccess={() => {
          setShowSuccessModal(true);
          setSelectedCourseId(null);
        }} 
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Enrolled Successfully!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for enrolling in this course. We will reach out to you soon.
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestCourses;
