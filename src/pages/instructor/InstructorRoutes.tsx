import { Route } from "react-router-dom";
import { AuthProvider as InstructorAuthProvider } from "@/context/instructor/AuthContext";
import InstructorDashboardLayout from "@/components/instructor/DashboardLayout";

// Import all instructor pages
import InstructorDashboard from "./Dashboard";
import InstructorCourses from "./Courses";
import InstructorCurriculum from "./Curriculum";
import InstructorQuizzes from "./Quizzes";
import InstructorExamManagement from "./ExamManagement";
import InstructorClasses from "./Classes";
import InstructorVideos from "./Videos";
import InstructorResources from "./Resources";
import InstructorCourseMaterials from "./CourseMaterials";
import InstructorMystudents from "./Mystudents";
import InstructorAttendance from "./Attendance";
import InstructorPerformanceReview from "./Performancereview";
import InstructorBadges from "./Badges";
import InstructorCertificates from "./Certificates";
import InstructorChat from "./Chat";
import InstructorAnalytics from "./Analytics";
import InstructorAddQuestionPage from "./AddQuestionPage"; // Or CodingQuestions depending on what they actually use

export const InstructorRoutes = (
  <Route
    path="/instructor"
    element={
      <InstructorAuthProvider>
        <InstructorDashboardLayout />
      </InstructorAuthProvider>
    }
  >
    <Route path="dashboard" element={<InstructorDashboard />} />
    <Route path="courses" element={<InstructorCourses />} />
    <Route path="curriculum" element={<InstructorCurriculum />} />
    <Route path="quizzes" element={<InstructorQuizzes />} />
    <Route path="quizzes/questions" element={<InstructorAddQuestionPage />} />
    <Route path="exam-management" element={<InstructorExamManagement />} />
    <Route path="classes" element={<InstructorClasses />} />
    <Route path="videos" element={<InstructorVideos />} />
    <Route path="resources" element={<InstructorResources />} />
    <Route path="coursematerials" element={<InstructorCourseMaterials />} />
    <Route path="mystudents" element={<InstructorMystudents />} />
    <Route path="attendance" element={<InstructorAttendance />} />
    <Route path="performance" element={<InstructorPerformanceReview />} />
    <Route path="badges" element={<InstructorBadges />} />
    <Route path="certificates" element={<InstructorCertificates />} />
    <Route path="chat" element={<InstructorChat />} />
    <Route path="analytics" element={<InstructorAnalytics />} />
  </Route>
);
