import { motion } from "framer-motion";
import { Download, Share2, Award } from "lucide-react";

export interface Certificate {
  id: string;
  course: string;
  certificateNo: string;
  issuedAt: string;
  status: string;
  downloadUrl: string;
  completionDate: string;
}

interface CertificateCardProps {
  cert: Certificate;
  index: number;
  downloadCertificate: (cert: Certificate) => void;
}

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

const CertificateCard = ({ cert, index, downloadCertificate }: CertificateCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      {/* Gradient Header with Medal and Status */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Award className="h-8 w-8 text-white" />
          </div>
        </div>
        <p className="text-center text-blue-100 text-xs uppercase tracking-wider mt-4">Certificate of Completion</p>
        <h3 className="text-center text-white font-bold text-lg mt-1">{cert.course}</h3>
      </div>

      {/* Certificate Details */}
      <div className="p-5">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Certificate ID</span>
            <span className="text-gray-800 font-medium text-sm">{cert.certificateNo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Issued On</span>
            <span className="text-gray-800 font-medium text-sm">{cert.completionDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="text-gray-800 font-medium text-sm capitalize">{cert.status}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <motion.button
            className="flex-1 py-3 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-full font-bold text-sm transition-all duration-300 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              downloadCertificate(cert);
            }}
          >
            <Download className="h-4 w-4" />
            Download
          </motion.button>
          <motion.button
            className="px-4 py-3 border border-gray-100 bg-[#f8faff] rounded-full text-gray-500 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              if (cert.downloadUrl) {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(cert.downloadUrl)}`, '_blank');
              }
            }}
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
