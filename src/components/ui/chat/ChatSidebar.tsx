import { Search, ArrowLeft } from "lucide-react";

interface Course {
  course_id: number;
  course_title: string;
  course_image?: string;
  instructor_name?: string;
}

interface ChatSidebarProps {
  selectedCourse: Course | null;
  userCourses: Course[];
  coursesLoading: boolean;
  handleSelectCourse: (course: Course) => void;
  onBack: () => void;
}

const ChatSidebar = ({
  selectedCourse,
  userCourses,
  coursesLoading,
  handleSelectCourse,
  onBack,
}: ChatSidebarProps) => {
  return (
    <div className={`
      ${selectedCourse ? 'hidden' : 'flex'} 
      md:flex w-full md:w-64 lg:w-72 xl:w-80 bg-white border-r border-gray-200 flex-col flex-shrink-0
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-600 flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-sans font-bold text-[24.39px] leading-[34.15px] tracking-[-0.55px] text-black">Messages</h2>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {coursesLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">Loading courses...</p>
          </div>
        ) : userCourses.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">No courses assigned</p>
          </div>
        ) : (
          userCourses.map((course) => (
            <div
              key={course.course_id}
              onClick={() => handleSelectCourse(course)}
              className={`flex items-start gap-3 p-3 mx-4 mb-2 rounded-xl cursor-pointer transition-all ${
                course.course_id === selectedCourse?.course_id
                  ? 'bg-blue-50/80 border border-blue-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={course.course_image || 'https://ui-avatars.com/api/?name=Course&background=0D8ABC&color=fff'}
                  alt={course.course_title}
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{course.course_title}</h3>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-0.5 ${
                  course.course_id === selectedCourse?.course_id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {course.instructor_name || 'Instructor'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
