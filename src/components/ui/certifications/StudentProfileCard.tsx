import { motion } from "framer-motion";

interface UserData {
  name: string;
  id: string;
  role: string;
}

interface StudentProfileCardProps {
  userData: UserData;
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

const StudentProfileCard = ({ userData }: StudentProfileCardProps) => {
  return (
    <motion.section 
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 w-full" 
      variants={cardVariants} 
      whileHover="hover" 
      initial="hidden" 
      animate="visible"
    >
      <motion.div className="flex flex-col sm:flex-row items-center sm:items-start gap-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <motion.div className="relative flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold uppercase">
            {userData.name ? userData.name.charAt(0) : "S"}
          </div>
        </motion.div>
        <motion.div className="text-center sm:text-left flex-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-white mb-1">{userData.name}</h2>
          <p className="text-blue-100 text-sm">ID: {userData.id}</p>
          <p className="text-blue-100 text-sm">ROLE: {userData.role}</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default StudentProfileCard;
