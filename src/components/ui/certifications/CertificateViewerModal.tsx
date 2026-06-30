import { motion } from "framer-motion";
import { X, Award, Download } from "lucide-react";
import { Certificate } from "./CertificateCard";

interface CertificateViewerModalProps {
  selectedCert: Certificate;
  setIsCertViewModalOpen: (open: boolean) => void;
  downloadCertificate: (cert: Certificate) => void;
}

const CertificateViewerModal = ({ selectedCert, setIsCertViewModalOpen, downloadCertificate }: CertificateViewerModalProps) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsCertViewModalOpen(false)}
    >
      <motion.div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-auto shadow-2xl relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setIsCertViewModalOpen(false)} className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-lg">
          <X className="h-6 w-6 text-gray-700" />
        </button>

        <div className="p-6 pb-4 text-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{selectedCert.course}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Certificate ID: {selectedCert.certificateNo} • Completed: {selectedCert.completionDate}
          </p>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-center">
            {selectedCert.downloadUrl ? (
              <iframe
                src={selectedCert.downloadUrl}
                title={`${selectedCert.course} Certificate`}
                className="max-w-full max-h-[70vh] w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl shadow-xl border border-gray-300"
              />
            ) : (
              <div className="p-10 bg-white rounded-xl shadow-lg text-center">
                <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{selectedCert.course}</h3>
                <p className="text-gray-600 mt-2">Certificate ID: {selectedCert.certificateNo}</p>
                <p className="text-gray-600">Status: <span className="capitalize">{selectedCert.status}</span></p>
                <p className="text-gray-600">Issued: {selectedCert.completionDate}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 pt-4 text-center border-t border-gray-200">
          <motion.button
            className="px-10 py-3.5 bg-gradient-to-r from-[#2B58FF] to-[#9B2BFF] text-white rounded-full font-bold shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 inline-flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadCertificate(selectedCert)}
          >
            <Download className="h-5 w-5" />
            Download Certificate
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateViewerModal;
