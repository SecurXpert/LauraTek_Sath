export const getTechColor = (tech: string) => {
    switch(tech?.toUpperCase()) {
      case 'REACT': return "bg-[#1E293B] text-white";
      case 'JS': case 'JAVASCRIPT': return "bg-[#E2E8F0] text-gray-700";
      case 'TS': case 'TYPESCRIPT': return "bg-[#3B82F6] text-white";
      case 'PY': case 'PYTHON': return "bg-[#FEF08A] text-yellow-800";
      case 'SQL': return "bg-[#FDE68A] text-yellow-800";
      case 'CSS': return "bg-[#0284C7] text-white";
      default: return "bg-[#1E293B] text-white";
    }
};

export const getTopBorderColor = (tech: string) => {
    switch(tech?.toUpperCase()) {
      case 'REACT': return "bg-gradient-to-r from-cyan-400 to-blue-500";
      case 'JS': case 'JAVASCRIPT': return "bg-gradient-to-r from-yellow-300 to-orange-400";
      case 'TS': case 'TYPESCRIPT': return "bg-gradient-to-r from-blue-400 to-indigo-600";
      case 'PY': case 'PYTHON': return "bg-gradient-to-r from-yellow-200 to-yellow-500";
      case 'SQL': return "bg-gradient-to-r from-emerald-400 to-teal-500";
      case 'CSS': return "bg-gradient-to-r from-blue-300 to-blue-600";
      default: return "bg-gradient-to-r from-purple-400 to-indigo-500";
    }
};

export const getLevelColor = (level: string) => {
    switch(level?.toLowerCase()) {
      case 'beginner': return "bg-[#DCFCE7] text-[#16A34A]";
      case 'intermediate': return "bg-[#FFF4E5] text-[#FF9800]";
      case 'advanced': return "bg-[#FCE7F3] text-[#EC4899]";
      default: return "bg-[#DCFCE7] text-[#16A34A]";
    }
};
