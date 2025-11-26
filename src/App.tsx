import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Jobs from "./components/ui/jobs";
import Dashboard from "./components/ui/Dashboard";
import Analytics from "./components/ui/Analytics";
import Settings from "./components/ui/settings";
import Calendar from "./components/calendar";
import Assessments from "./components/assessments&grades";
import Compiler from "./components/ui/compiler";
import Attendance from "./components/ui/attendance";
import MyCourses from "./components/mycourses";
import SuccessStories from "./components/ui/Successstories";
import AboutUs from "./pages/aboutus";
import Terms from "./components/ui/Terms";
import Policy from "./components/ui/Policy";
import Support from "./components/ui/Support";
import Mockinterview from "./components/ui/mockinterview";
import Certificates from "./components/certifications";
import Leaderboard from "./components/leaderboard";
import StudentProfileDashboard from "./components/ui/StudentProfileDashboard";
import Bootcamp from "./components/Bootcamp";
import StudentCourseDetail from "./pages/StudentCourseDetails";
import Profileheader from "./components/ui/Profileheader";
import ProfilePage from "./pages/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import Alumni from "./pages/Alumni";
import Resume from "./components/ui/Resume";

// import Contactus from "./components/ui/contactus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
        
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/courses" element={<Courses />} />
          <Route path="/jobs" element={<Jobs/>}/>
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/courses" element={<MyCourses />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/mycourses" element={<MyCourses />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/compiler" element={<Compiler />} />
          <Route path="/dashboard/assessments" element={<Assessments />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/dashboard/interviews" element={<Mockinterview/>} />
          <Route path="/dashboard/certificates" element={<Certificates/>} />
          <Route path="/dashboard/analytics" element={<Analytics/>} />
          <Route path="/dashboard/leaderboard" element={<Leaderboard/>} />
          <Route path="/dashboard/resume" element={<Resume />} />

          <Route path="/dashboard/settings" element={<Settings/>} />
          <Route path="/profile" element={<StudentProfileDashboard/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/bootcamp" element={<Bootcamp/>} />
          <Route path="/dashboard/course/:id" element={<StudentCourseDetail />} />
          

          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/alumni" element={<Alumni />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;