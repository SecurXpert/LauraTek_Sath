import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Check, X, Share2, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";
import certificate from "@/assets/certificate.jpg";
import sqlcertificate from '@/assets/sqlcertificate.jpg';
import reactcertificate from '@/assets/reactcertificate.jpg';
import uiuxcertificate from "@/assets/uiuxcertificate.jpg";
import javacertificate from "@/assets/javacertificate.jpg";
import pythoncertificate from "@/assets/pythoncertificate.jpg";
import dacertificate from "@/assets/dacertificate.jpg";
import { Menu } from "lucide-react";
import api from "@/api/instance";
import StudentProfileCard from "./ui/certifications/StudentProfileCard";
import CertificateCard from "./ui/certifications/CertificateCard";
import CertificateSkeleton from "./ui/certifications/CertificateSkeleton";
import CertificateViewerModal from "./ui/certifications/CertificateViewerModal";

const mockStudent = {
  name: "Navya D",
  id: "STU-2024-001",
  email: "navya.d@example.com",
  university: "LauraTek University",
  tags: ["Active Student", "Certified Learner"],
  photo: "https://picsum.photos/120?random=1"
};

const mockCertifications = [
  {
    id: "CERT-REACT",
    course: "React Advanced Patterns",
    shortName: "reactjs",
    completionDate: "Mar 20, 2026",
    status: "Completed",
    progress: 100,
    rating: 4.9,
    grade: "A+",
    instructor: "Sarah Johnson",
    certificateImage: reactcertificate,
  },
  {
    id: "CERT-JS",
    course: "JavaScript Mastery",
    shortName: "javascript",
    completionDate: "Feb 15, 2026",
    status: "Completed",
    progress: 100,
    rating: 4.8,
    grade: "A",
    instructor: "Michael Chen",
    certificateImage: certificate,
  },
  {
    id: "CERT-DS",
    course: "Data Structures Complete",
    shortName: "datastructures",
    completionDate: "Jan 10, 2026",
    status: "Completed",
    progress: 100,
    rating: 4.7,
    grade: "A-",
    instructor: "Emily Rodriguez",
    certificateImage: dacertificate,
  },
  {
    id: "CERT-PYTHON",
    course: "Python Programming",
    shortName: "python",
    completionDate: "Dec 05, 2025",
    status: "Completed",
    progress: 100,
    rating: 4.9,
    grade: "A+",
    instructor: "David Park",
    certificateImage: pythoncertificate,
  },
  {
    id: "CERT-JAVA",
    course: "Java Programming",
    shortName: "java",
    completionDate: "Nov 20, 2025",
    status: "Completed",
    progress: 100,
    rating: 4.8,
    grade: "A",
    instructor: "Jennifer Lee",
    certificateImage: javacertificate,
  },
  {
    id: "CERT-SQL",
    course: "SQL & Database",
    shortName: "sql",
    completionDate: "Oct 15, 2025",
    status: "Completed",
    progress: 100,
    rating: 4.8,
    grade: "A-",
    instructor: "Robert Taylor",
    certificateImage: sqlcertificate,
  },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Completed": return { bg: "bg-teal-100", text: "text-teal-800", icon: Check };
    default: return { bg: "bg-gray-100", text: "text-gray-800", icon: null };
  }
};

// Helper to decode JWT token
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const Certifications = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Certifications");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertViewModalOpen, setIsCertViewModalOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "Student",
    id: "",
    role: "Student"
  });

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await api.get("/student/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData({
            name: response.data.name || "Student",
            id: response.data.id || "",
            role: response.data.role || "student"
          });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Fallback to token if API fails
        const token = localStorage.getItem("access_token");
        if (token) {
          const decoded = decodeToken(token);
          if (decoded) {
            setUserData({
              name: decoded.name || decoded.sub || "Student",
              id: decoded.student_id || decoded.id || decoded.sub || "",
              role: decoded.role || "Student"
            });
          }
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get("/student/student/my-certificates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Transform API response to match component structure
        const certs = response.data.certificates.map((cert) => ({
          id: cert.certificate_no,
          course: cert.course_name,
          certificateNo: cert.certificate_no,
          issuedAt: cert.issued_at,
          status: cert.status,
          downloadUrl: cert.download_url,
          completionDate: new Date(cert.issued_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }));
        setCertificates(certs);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCerts = certificates.filter(
    (cert) =>
      cert.course.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || cert.status === filterStatus)
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Download certificate using API download_url
  const downloadCertificate = (cert: (typeof certificates)[0]) => {
    if (cert.downloadUrl) {
      const link = document.createElement("a");
      link.href = cert.downloadUrl;
      link.download = `${cert.course.replace(/ /g, "_")}_Certificate.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-white via-sky-50 to-teal-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Profileheader />

                


        <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-auto">
          <motion.div 
            className="w-full max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="font-inter font-bold text-[23.7px] leading-[31.6px] tracking-normal text-[#101828]">Certificates</h1>
              <p className="text-gray-500 mt-1">Your achievements and earned certificates</p>
            </motion.div>

            {/* Student Profile Summary Card */}
            <StudentProfileCard userData={userData} />

            {/* Certifications Section */}
            <motion.section className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {/* Certifications Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                  {[1, 2, 3].map(i => (
                    <CertificateSkeleton key={i} />
                  ))}
                </div>
              ) : (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full" variants={containerVariants} initial="hidden" animate="visible">
                {certificates.map((cert: any, index) => (
                  <CertificateCard key={cert.id} cert={cert} index={index} downloadCertificate={downloadCertificate} />
                ))}
              </motion.div>
              )}
            </motion.section>
          </motion.div>
        </main>

        {/* Certificate Viewer Modal */}
        <AnimatePresence>
          {isCertViewModalOpen && selectedCert && (
            <CertificateViewerModal
              selectedCert={selectedCert}
              setIsCertViewModalOpen={setIsCertViewModalOpen}
              downloadCertificate={downloadCertificate}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Certifications;




