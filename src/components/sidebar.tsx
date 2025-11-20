import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 21V9h6v12"/></svg>
    ), path: "/dashboard" },
  { name: "My Courses", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
    ), path: "/dashboard/courses" },
  { name: "Calendar", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
    ), path: "/dashboard/calendar" },
  { name: "Attendance", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>
    ), path: "/dashboard/attendance" },
  { name: "Compiler", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
    ), path: "/dashboard/compiler" },
  { name: "Assessments & Grades", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
    ), path: "/dashboard/assessments" },
  { name: "Mock Interviews", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
    ), path: "/dashboard/interviews" },
  { name: "Certificates", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
    ), path: "/dashboard/certificates" },
  { name: "Analytics", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20v-6m4 6V10m4 10v-4m4 4V4"/></svg>
    ), path: "/dashboard/analytics" },
  { name: "Leaderboard", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/></svg>
    ), path: "/dashboard/leaderboard" },
  { name: "Settings", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09c-.66 0-1.26.39-1.51 1z"/></svg>
    ), path: "/dashboard/settings" },
];

const Sidebar = ({ sidebarOpen, setActive, active }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`$\{
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-16 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col items-center py-4 lg:translate-x-0 lg:static`}
    >
      <div className="flex items-center h-16 mb-4">
        <img src="/logo.svg" alt="Laural" className="h-8 w-8" />
      </div>
      <nav className="flex flex-col gap-2 w-full items-center">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActive(item.name);
              navigate(item.path);
            }}
            className={`flex flex-col items-center w-full py-2 transition group ${active === item.name ? "text-blue-600" : "text-gray-500"}`}
          >
            <span className={`w-7 h-7 flex items-center justify-center rounded ${active === item.name ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}>{item.icon}</span>
            <span className={`text-[10px] mt-1 text-center leading-tight ${active === item.name ? "font-semibold text-blue-600" : "text-gray-500"}`}>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;