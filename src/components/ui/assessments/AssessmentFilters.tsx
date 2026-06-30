import { motion } from "framer-motion";
import { Filter, Search, ChevronDown, RefreshCw } from "lucide-react";

interface AssessmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  handleReset: () => void;
}

const AssessmentFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  handleReset,
}: AssessmentFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[46px] h-[46px] bg-[#6B46FF] rounded-2xl flex items-center justify-center shadow-sm">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[16px] text-[#101828] mb-0.5">Filters & Search</h3>
          <p className="text-[13px] text-[#667085]">Refine your Course list</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#667085]" />
          <input
            type="text"
            placeholder="Search Courses by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-[53.09px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[17.7px] text-[14px] text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#6B46FF]/20 focus:border-[#6B46FF] transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative flex-1 sm:flex-none min-w-[150px] sm:min-w-[200px]">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-5 pr-10 h-[53.09px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[17.7px] text-[14px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#6B46FF]/20 focus:border-[#6B46FF] appearance-none cursor-pointer transition-all"
          >
            <option value="All Status">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085] pointer-events-none" />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium w-full sm:w-[243.98px] flex-shrink-0"
          style={{
            height: "53.09px",
            borderRadius: "17.7px",
            borderWidth: "1.26px",
            background: "#F9FAFB",
            borderColor: "#E5E7EB",
            borderStyle: "solid",
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export default AssessmentFilters;
