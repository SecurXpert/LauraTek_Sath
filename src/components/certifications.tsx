import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Eye, Calendar, User, Award, Check, Clock, X, Star } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Sidebar from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profileheader from "@/components/ui/Profileheader";

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
    id: "CERT-001",
    course: "React Fundamentals",
    courseLogo: "https://picsum.photos/80?random=1",
    completionDate: "2025-03-15",
    status: "Completed",
    progress: 100,
    rating: 4.8,
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: "CERT-002",
    course: "Advanced JavaScript",
    courseLogo: "https://picsum.photos/80?random=2",
    completionDate: "2025-02-20",
    status: "In Progress",
    progress: 75,
    rating: 4.5,
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: "CERT-003",
    course: "Data Structures & Algorithms",
    courseLogo: "https://picsum.photos/80?random=3",
    completionDate: "2025-01-10",
    status: "Completed",
    progress: 100,
    rating: 4.9,
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: "CERT-004",
    course: "UI/UX Design Principles",
    courseLogo: "https://picsum.photos/80?random=4",
    completionDate: "N/A",
    status: "Expired",
    progress: 100,
    rating: 4.2,
    downloadUrl: "#",
    viewUrl: "#",
  },
  {
    id: "CERT-005",
    course: "Python for Beginners",
    courseLogo: "https://picsum.photos/80?random=5",
    completionDate: "2025-04-05",
    status: "Completed",
    progress: 100,
    rating: 4.7,
    downloadUrl: "#",
    viewUrl: "#",
  },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Completed": return { bg: "bg-teal-100", text: "text-teal-800", icon: Check };
    case "In Progress": return { bg: "bg-blue-100", text: "text-blue-800", icon: Clock };
    case "Expired": return { bg: "bg-red-100", text: "text-red-800", icon: X };
    default: return { bg: "bg-gray-100", text: "text-gray-800", icon: null };
  }
};

const Certifications = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Certifications");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCerts = mockCertifications.filter(cert => 
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

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-sky-50 to-teal-50">
      <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Profileheader />

        {/* Content Area */}
        <main className="p-4 flex-1 overflow-auto">
          <motion.div 
            className="w-full max-w-7xl mx-auto" // Centered but wider container
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Navigation Bar */}
            <motion.div 
              className="flex justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-md border border-gray-200/50"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="text-xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                  LauraTek
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage src="https://picsum.photos/40?random=1" />
                      <AvatarFallback>ND</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </motion.div>

            {/* Student Profile Section */}
            <motion.section 
              className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200/50 w-full" // Reduced padding and margin
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex flex-col lg:flex-row items-center lg:items-start gap-4" // Reduced gap
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl"> {/* Reduced avatar size */}
                    <AvatarImage src={mockStudent.photo} />
                    <AvatarFallback className="h-24 w-24 bg-gradient-to-br from-teal-500 to-sky-500 text-white text-2xl font-bold"> {/* Adjusted fallback size and text */}
                      {mockStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div className="text-center lg:text-left flex-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2"> {/* Reduced text size */}
                    {mockStudent.name}
                  </h2>
                  <p className="text-gray-600 text-base mb-1"> {/* Reduced text size */}
                    ID: <span className="font-mono font-bold text-teal-600">{mockStudent.id}</span>
                  </p>
                  <p className="text-gray-600 text-base mb-2">{mockStudent.email}</p> {/* Reduced margin */}
                  <p className="text-gray-600 text-base mb-2">{mockStudent.university}</p> {/* Reduced margin */}
                  <div className="flex flex-wrap gap-2">
                    {mockStudent.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Certifications Section */}
            <motion.section 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent flex items-center gap-3"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Award className="h-10 w-10" />
                My Course Certifications
              </motion.h3>

              {/* Search and Filters */}
              <motion.div 
                className="flex flex-col lg:flex-row gap-4 mb-8 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div className="relative flex-1" whileFocus={{ scale: 1.02 }}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm transition-all duration-300"
                  />
                </motion.div>
                <div className="flex gap-4">
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm appearance-none bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>

              {/* Certifications Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full" // Responsive full-width grid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredCerts.length > 0 ? (
                  filteredCerts.map((cert, index) => {
                    const { bg, text, icon: StatusIcon } = getStatusVariant(cert.status);
                    return (
                      <motion.div
                        key={cert.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 hover:border-teal-300/50 transition-all duration-300 cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        onClick={() => openModal(cert)}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Course Logo & Name */}
                        <div className="relative p-6 pb-4 text-center">
                          <motion.div 
                            className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 shadow-lg"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <img src={cert.courseLogo} alt={cert.course} className="w-full h-full object-cover rounded-full" />
                          </motion.div>
                          <motion.h3 
                            className="mt-4 text-xl font-bold text-gray-800"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {cert.course}
                          </motion.h3>
                        </div>

                        {/* Cert ID & Completion Date */}
                        <div className="px-6 pb-4">
                          <motion.p 
                            className="text-xs text-gray-500 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            ID: <span className="font-mono font-bold text-teal-600">{cert.id}</span>
                          </motion.p>
                          <motion.p 
                            className="text-sm text-gray-600 mb-4 flex items-center gap-2 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Calendar className="h-4 w-4" />
                            {cert.completionDate}
                          </motion.p>

                          {/* Progress Bar */}
                          <motion.div 
                            className="mb-6"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <motion.div 
                                className={`h-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500`}
                                initial={{ width: 0 }}
                                animate={{ width: `${cert.progress}%` }}
                                transition={{ duration: 1.5 }}
                              />
                            </div>
                            <p className="text-center text-xs text-gray-600">{cert.progress}% Complete</p>
                          </motion.div>

                          {/* Status Badge */}
                          <motion.div 
                            className="mb-6 text-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
                          >
                            <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${bg} ${text}`}>
                              <StatusIcon className="h-4 w-4" />
                              {cert.status}
                            </span>
                          </motion.div>

                          {/* Rating */}
                          <motion.div 
                            className="mb-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="flex justify-center gap-0.5 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(cert.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm font-semibold text-gray-700">{cert.rating}/5</p>
                          </motion.div>

                          {/* Action Buttons */}
                          <motion.div 
                            className="flex gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <motion.button
                              className="flex-1 p-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 rounded-xl font-medium transition-all duration-300 border border-sky-200/50 flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => { e.stopPropagation(); window.open(cert.viewUrl, '_blank'); }}
                            >
                              <Eye className="h-4 w-4" />
                              View Certificate
                            </motion.button>
                            <motion.button
                              className="flex-1 p-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 rounded-xl font-medium transition-all duration-300 border border-teal-200/50 flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => { e.stopPropagation(); window.open(cert.downloadUrl, '_blank'); }}
                            >
                              <Download className="h-4 w-4" />
                              Download PDF
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Award className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-500 mb-2">No Certifications Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters to view certifications.</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.section>
          </motion.div>
        </main>

        {/* Modal for Certificate Details */}
        <AnimatePresence>
          {isModalOpen && selectedCert && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div 
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCert.course} Certificate</h2>
                      <p className="text-gray-600">ID: <span className="font-mono font-bold text-sky-600">{selectedCert.id}</span></p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <img src={selectedCert.courseLogo} alt={selectedCert.course} className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg object-cover" />
                      <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{selectedCert.course}</h3>
                      <div className="flex justify-center space-x-4 text-sm text-gray-600">
                        <span>Completion: {selectedCert.completionDate}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-2">Student Details</h4>
                        <p className="text-sm text-gray-600">{mockStudent.name}</p>
                        <p className="text-sm text-gray-600">{mockStudent.email}</p>
                        <p className="text-sm text-gray-600">{mockStudent.university}</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-teal-800 mb-2">Status</h4>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-teal-200 text-teal-800">
                          <Check className="h-3 w-3" />
                          {selectedCert.status}
                        </span>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-blue-800 mb-2">Rating</h4>
                        <div className="flex justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(selectedCert.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm text-blue-600 font-semibold text-center mt-1">{selectedCert.rating}/5</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <motion.button 
                      className="px-8 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedCert.downloadUrl, '_blank')}
                    >
                      <Download className="inline mr-2 h-4 w-4" />
                      Download PDF
                    </motion.button>
                    <motion.button 
                      className="px-8 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedCert.viewUrl, '_blank')}
                    >
                      <Eye className="inline mr-2 h-4 w-4" />
                      View Certificate
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Footer */}
        <motion.footer 
          className="bg-white border-t border-gray-200 mt-auto p-4 text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          &copy; 2025 LauraTek. All rights reserved. | Privacy Policy | Terms of Service
        </motion.footer>
      </div>
    </div>
  );
};

export default Certifications;