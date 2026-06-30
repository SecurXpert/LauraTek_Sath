import { FileText } from "lucide-react";

interface Course {
  course_id: number;
  course_title: string;
}

interface CourseFile {
  id: string | number;
  name: string;
  type: string;
}

interface CourseAssignment {
  id: string | number;
  name: string;
  status: string;
  due: string;
}

interface CourseContextSidebarProps {
  selectedCourse: Course | null;
  activeContextTab: 'files' | 'assignments';
  setActiveContextTab: (tab: 'files' | 'assignments') => void;
  courseFiles: CourseFile[];
  courseAssignments: CourseAssignment[];
}

const CourseContextSidebar = ({
  selectedCourse,
  activeContextTab,
  setActiveContextTab,
  courseFiles,
  courseAssignments,
}: CourseContextSidebarProps) => {
  if (!selectedCourse) return null;

  return (
    <div className="hidden xl:flex w-64 xl:w-72 bg-white border-l border-gray-200 flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Course Context</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveContextTab('files')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeContextTab === 'files'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Files
        </button>
        <button
          onClick={() => setActiveContextTab('assignments')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeContextTab === 'assignments'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Assignments
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeContextTab === 'files' ? (
          <div className="space-y-3">
            {courseFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.type === 'pdf' ? 'PDF' : 'Code'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {courseAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    assignment.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{assignment.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{assignment.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContextSidebar;
