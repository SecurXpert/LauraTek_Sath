import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import NotFound from "../pages/NotFound";
import Jobs from "../components/ui/jobs";
import Dashboard from "../components/ui/Dashboard";
import Analytics from "../components/ui/Analytics";
import Settings from "../components/ui/settings";

import Compiler from "../components/ui/compiler";
import Attendance from "../components/ui/attendance";
import MyCourses from "../components/mycourses";
import Assessments from "@/components/assessments&grades";
import Calendar from "../components/calendar"
import Sidebar from "../components/sidebar";

const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar sidebarOpen={true} setActive={() => {}} active={""} />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/dashboard/courses" element={<MyCourses />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/mycourses" element={<MyCourses />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/compiler" element={<Compiler />} />
          <Route path="/dashboard/assessments" element={<Assessments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default Layout;