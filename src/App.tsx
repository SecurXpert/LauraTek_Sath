import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Exams from "./pages/Exams";
import NotFound from "./pages/NotFound";
import Jobs from "./components/ui/jobs";
import Dashboard from "./components/ui/Dashboard";
// import Analytics from "./components/ui/Analytics";
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
// import Mockinterview from "./components/ui/mockinterview";
import Certificates from "./components/certifications";
// import Leaderboard from "./components/leaderboard";
import StudentProfileDashboard from "./components/ui/StudentProfileDashboard";
import Bootcamp from "./components/Bootcamp";
// import StudentCourseDetail from "./pages/StudentCourseDetails"; // File does not exist
import Profileheader from "./components/ui/Profileheader";
import ProfilePage from "./pages/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import Alumni from "./pages/Alumni";
import Resume from "./components/ui/Resume";
// import Discussion from "./pages/Discussion";
import LiveClasses from "./pages/LiveClasses";
import ChatSystem from "./components/ChatSystem";
import Recording from "./pages/Recording";
import QuizPage from "./pages/QuizPage";
import Materials from "./pages/Materials";
import Course1 from "./pages/Course1";
import Review from "./pages/Review";
import LoginPage from "./pages/LoginPage";
import ExamResults from "./pages/ExamResults";

// Guest Pages
import GuestLayout from "./Guest/GuestLayout";
import GuestDashboard from "./Guest/GuestDashboard";
import GuestAttendance from "./Guest/GuestAttendance";
import GuestQuizzes from "./Guest/GuestQuizzes";
import GuestQuizTake from "./Guest/GuestQuizTake";
import GuestProfile from "./Guest/GuestProfile";
import GuestEnrollments from "./Guest/GuestEnrollments";
import GuestCertificates from "./Guest/GuestCertificates";
import GuestCompiler from "./Guest/GuestCompiler";
import GuestLiveClasses from "./Guest/GuestLiveClasses";
import GuestQuizResults from "./Guest/GuestQuizResults";
import GuestQuizDetailedResult from "./Guest/GuestQuizDetailedResult";
import GuestCourses from "./Guest/GuestCourses";
import GuestCourseDetails from "./Guest/GuestCourseDetails";

import Contactus from "./components/ui/contactus";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

const ContactWrapper = () => {
  const navigate = useNavigate();
  return <Contactus open={true} setOpen={(isOpen) => { if (!isOpen) navigate(-1); }} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/courses" element={<Courses />} />
          <Route path="/jobs" element={<Jobs/>}/>
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/courses" element={<MyCourses />} />
          <Route path="/mycourses" element={<MyCourses />} />
          {/* <Route path="/dashboard/analytics" element={<Analytics />} /> */}
          {/* <Route path="/dashboard/calendar" element={<Calendar />} /> */}
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard/mycourses" element={<MyCourses />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/dashboard/compiler" element={<Compiler />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/dashboard/exams" element={<Exams />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/dashboard/assessments" element={<Assessments />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          {/* <Route path="/dashboard/interviews" element={<Mockinterview/>} /> */}
          <Route path="/dashboard/certificates" element={<Certificates/>} />
          <Route path="/certificates" element={<Certificates/>} />
          {/* <Route path="/dashboard/analytics" element={<Analytics/>} /> */}
          {/* <Route path="/dashboard/leaderboard" element={<Leaderboard/>} /> */}
          <Route path="/dashboard/resume" element={<Resume />} />
          <Route path="/resume" element={<Resume />} />
          {/* <Route path="/dashboard/discussion" element={<Discussion />} /> */}
          <Route path="/dashboard/liveclasses" element={<LiveClasses />} />
          <Route path="/liveclasses" element={<LiveClasses />} />
          <Route path="/quiz/:id" element={<QuizPage />} />

          <Route path="/dashboard/settings" element={<Settings/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/bootcamp" element={<Bootcamp/>} />
          <Route path="/dashboard/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/curriculum" element={<CourseDetail />} />
          <Route path="/courses/:id/materials" element={<Materials />} />
          <Route path="/dashboard/chatsystem" element={<ChatSystem />} />
          <Route path="/chatsystem" element={<ChatSystem />} />
          <Route path="/dashboard/materials/:id" element={<Materials />} />
          <Route path="/materials/:id" element={<Materials />} />
          

          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/profile-settings" element={<ProfilePage />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/grades" element={<Assessments scrollTo="grades" />} />
          <Route path="/dashboard/results" element={<ExamResults />} />
          <Route path="/results" element={<ExamResults />} />
          <Route path="/dashboard/recording" element={<Recording/>} />
          <Route path="/recording" element={<Recording/>} />
          <Route path="/dashboard/course1/:id" element={<Course1/>} />
          <Route path="/course1/:id" element={<Course1/>} />
          <Route path="/dashboard/review" element={<Review/>} />
          <Route path="/review" element={<Review/>} />

          {/* Guest Routes */}
          <Route path="/guest" element={<GuestLayout />}>
            <Route index element={<GuestDashboard />} />
            <Route path="attendance" element={<GuestAttendance />} />
            <Route path="quizzes" element={<GuestQuizzes />} />
            <Route path="quizzes/:id" element={<GuestQuizTake />} />
            <Route path="profile" element={<GuestProfile />} />
            <Route path="enrollments" element={<GuestEnrollments />} />
            <Route path="certificates" element={<GuestCertificates />} />
            <Route path="compiler" element={<GuestCompiler />} />
            <Route path="live-classes" element={<GuestLiveClasses />} />
            <Route path="quiz-results" element={<GuestQuizResults />} />
            <Route path="quiz-results/details" element={<GuestQuizDetailedResult />} />
            <Route path="courses" element={<GuestCourses />} />
            <Route path="course/:id" element={<GuestCourseDetails />} />
            <Route path="contact" element={<ContactWrapper />} />
            {/* Additional guest routes can be added here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
