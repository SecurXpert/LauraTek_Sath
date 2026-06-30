import React from "react";
import { Material, Course } from "./CourseTypes";

interface ResourcesMaterialsProps {
  course: Course | null;
  materials: Material[];
  activeMaterialFilter: string;
  setActiveMaterialFilter: (filter: string) => void;
  handleDownload: (materialId: number, title: string) => void;
}

const ResourcesMaterials: React.FC<ResourcesMaterialsProps> = ({
  course,
  materials,
  activeMaterialFilter,
  setActiveMaterialFilter,
  handleDownload,
}) => {
  const safeMaterials = Array.isArray(materials) ? materials : [];
  const filteredMaterials = safeMaterials.filter(material => {
    if (activeMaterialFilter === 'All') return true;
    const type = material.file_type.toLowerCase();
    if (activeMaterialFilter === 'Pdf') return type === 'pdf';
    if (activeMaterialFilter === 'Video') return type === 'video' || type === 'mp4';
    if (activeMaterialFilter === 'Code') return type === 'code' || type === 'zip';
    return true;
  });

  return (
    <div id="resources-section" className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#10B981] rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Resources & Materials</h2>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          {['All', 'Pdf', 'Video', 'Code'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveMaterialFilter(filter)}
              className={`px-5 py-1.5 text-[13px] font-medium rounded-full shadow-sm transition-colors ${
                activeMaterialFilter === filter 
                  ? 'bg-[#8B5CF6] text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[19.86px]">
          {filteredMaterials.map((material) => {
          // Determine icon colors based on file type
          const type = material.file_type.toLowerCase();
          let bgClass = "bg-gray-50 border border-gray-100";
          let iconColor = "text-gray-500";
          let IconSvg = (
            <svg className={`w-7 h-7 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          );

          if (type === 'pdf') {
            bgClass = "bg-[#FEF2F2]"; // very light red
            iconColor = "text-[#EF4444]";
            IconSvg = (
              <svg className={`w-7 h-7 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h1.5m1.5 0H15m-4.5 4h3m-3 4h1.5" />
              </svg>
            );
          } else if (type === 'code') {
            bgClass = "bg-[#F0FDF4]"; // very light green
            iconColor = "text-[#22C55E]";
            IconSvg = (
              <svg className={`w-7 h-7 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            );
          }

          return (
            <div key={material.id} className="bg-white rounded-[19.86px] p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] h-full flex flex-col">
              <div className="flex items-start gap-4 mb-5 flex-grow">
                <div className={`w-[60px] h-[60px] ${bgClass} rounded-[16px] flex items-center justify-center flex-shrink-0`}>
                  {IconSvg}
                </div>
                <div className="flex-1 mt-1">
                  <h4 className="font-bold text-[#111827] text-[16px] mb-2 leading-tight">{material.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 bg-[#F3F4F6] text-[#4B5563] text-[11px] font-bold rounded-full">{material.file_type.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <button
                  onClick={() => handleDownload(material.id, material.title)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
      ) : (
        <div className="w-full max-w-[873.8px] bg-white rounded-2xl p-5 shadow-[0px_3.97px_5.96px_-3.97px_#0000001A,0px_9.93px_14.89px_-2.98px_#0000001A] text-center">
          <p className="text-gray-500 text-sm">
            {activeMaterialFilter !== 'All' 
              ? `No ${activeMaterialFilter} documents found.` 
              : "No documents found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourcesMaterials;
