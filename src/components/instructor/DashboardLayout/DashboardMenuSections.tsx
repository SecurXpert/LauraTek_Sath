import {
  LayoutDashboard,
  FileQuestion,
  Bell,
  Menu,
  LogOut,
  PlusSquare,
  Search,
  BarChart,
  Book,
  BookMarked,
  FilePlus,
  ClipboardPenLine,
  Video,
  Film,
  FileText,
  Users,
  Calendar,
  Medal,
  MessageSquare,
  FolderOpen
} from "lucide-react";
import { PiCertificateFill } from "react-icons/pi";

export const menuSections = [
  {
    title: "OVERVIEW",
    items: [
      { path: "/instructor/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/instructor/courses", label: "Courses", icon: Book },
      { path: "/instructor/curriculum", label: "Curriculum", icon: BookMarked },
    ],
  },
  {
    title: "Assessments",
    items: [
      { path: "/instructor/quizzes", label: "Quizzes", icon: FileQuestion },
      { path: "/instructor/quizzes/questions", label: "Question Bank", icon: FilePlus },
      { path: "/instructor/exam-management", label: "Coding Exam", icon: ClipboardPenLine },
    ],
  },
  {
    title: "Classes",
    items: [
      { path: "/instructor/classes", label: "Live Classes", icon: Video },
      { path: "/instructor/videos", label: "Recorded Videos", icon: Film },
      { path: "/instructor/resources", label: "Resources", icon: FileText },
      { path: "/instructor/coursematerials", label: "Course Materials", icon: FolderOpen },
    ],
  },
  {
    title: "Students",
    items: [
      { path: "/instructor/mystudents", label: "My Students", icon: Users },
      { path: "/instructor/attendance", label: "Attendance", icon: Calendar },
      { path: "/instructor/performance", label: "Performance Review", icon: BarChart },
    ],
  },
  {
    title: "More",
    items: [
      { path: "/instructor/badges", label: "Badges", icon: Medal },
      { path: "/instructor/certificates", label: "Certificates", icon: PiCertificateFill },
      { path: "/instructor/chat", label: "Chat", icon: MessageSquare },
      { path: "/instructor/analytics", label: "Analytics", icon: BarChart },
    ],
  },
];
