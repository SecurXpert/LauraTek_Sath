import React, { useState } from "react";
import {
  FileText, Download, Search, AlertCircle,
  File, Link as LinkIcon, Image as ImageIcon, Video, ArrowLeft
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Sidebar from "@/components/sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMaterialsData } from "@/hooks/useMaterialsData";

export default function Materials() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseTitle = location.state?.courseTitle;
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id) : 1;

  const {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    moduleIdFilter,
    fileTypeFilter,
    filteredMaterials,
    handleDownload
  } = useMaterialsData(courseId);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActive={() => {}} active="Materials" />

      <div className="flex-1">
        <Profileheader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-8 flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard/courses')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to Courses"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="mb-1 font-inter font-bold text-[36.73px] leading-[44.07px] text-[#0F172A]">Course Materials</h1>
              {courseTitle && (
                <p className="text-[18px] md:text-[20px] font-medium text-[#64748B] leading-snug">{courseTitle}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  const lettersOnly = value.replace(/[0-9]/g, '');
                  setSearchQuery(lettersOnly);
                }}
                onKeyPress={(e) => {
                  if (/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-[12px] text-[14px] font-medium text-gray-800 focus:outline-none transition-all"
                style={{ background: '#FFFFFF', borderTop: '1.22px solid #E2E8F0', boxShadow: '0px 1.22px 2.45px -1.22px #0000001A, 0px 1.22px 3.67px 0px #0000001A' }}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 rounded-[12px]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div 
            className="bg-white border border-gray-200 rounded-[16px] overflow-hidden mb-12"
            style={{ borderTop: '1.22px solid #E2E8F0', boxShadow: '0px 1.22px 2.45px -1.22px #0000001A, 0px 1.22px 3.67px 0px #0000001A' }}
          >
            <div className="hidden md:grid md:grid-cols-[3fr_1fr_1.5fr_140px] items-center px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] gap-4 rounded-t-[16px]">
              <div className="font-inter font-medium text-[#64748B]" style={{ fontSize: '17.14px', lineHeight: '24.49px', letterSpacing: '0px' }}>Name</div>
              <div className="font-inter font-medium text-[#64748B] md:text-center" style={{ fontSize: '17.14px', lineHeight: '24.49px', letterSpacing: '0px' }}>Type</div>
              <div className="font-inter font-medium text-[#64748B] md:text-center" style={{ fontSize: '17.14px', lineHeight: '24.49px', letterSpacing: '0px' }}>Date</div>
              <div className="font-inter font-medium text-[#64748B] text-center" style={{ fontSize: '17.14px', lineHeight: '24.49px', letterSpacing: '0px' }}>Action</div>
            </div>

            {loading ? (
              <div className="flex flex-col">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1.5fr_140px] px-6 py-5 border-b border-[#E2E8F0] gap-3 md:gap-4 md:items-center">
                    <div className="flex items-center gap-4">
                       <Skeleton className="w-[42px] h-[42px] rounded-[10px]" />
                       <Skeleton className="w-48 h-5" />
                    </div>
                    <div className="flex md:justify-center"><Skeleton className="w-16 h-5" /></div>
                    <div className="flex md:justify-center"><Skeleton className="w-24 h-5" /></div>
                    <div className="flex justify-center"><Skeleton className="w-[96px] h-[56px] rounded-[10px]" /></div>
                  </div>
                ))}
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-16 text-[#6B7280] font-medium text-[15px]">
                {searchQuery || moduleIdFilter || fileTypeFilter
                  ? "No materials match your filters."
                  : "No materials found in this course."}
              </div>
            ) : (
              <div className="flex flex-col">
                {filteredMaterials.map((material) => (
                  <div key={material.id} className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1.5fr_140px] px-6 py-5 border-b border-[#E2E8F0] last:border-0 hover:bg-[#F9FAFB] transition-colors gap-3 md:gap-4 md:items-center group">
                    <div className="flex items-center gap-4 pr-0 md:pr-4 overflow-hidden mb-2 md:mb-0">
                      <div className="w-[42px] h-[42px] rounded-[10px] bg-[#6833FF] flex-shrink-0 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                        {(() => {
                          const t = (material.file_type || '').toLowerCase();
                          const title = (material.title || '').toLowerCase();
                          if (t.includes('pdf') || title.endsWith('.pdf')) return <FileText size={20} />;
                          if (t.includes('video') || t.includes('mp4') || t.includes('mov') || title.endsWith('.mp4') || title.endsWith('.mov')) return <Video size={20} />;
                          if (t.includes('url') || t.includes('link')) return <LinkIcon size={20} />;
                          if (t.includes('image') || t.includes('png') || t.includes('jpg') || t.includes('jpeg')) return <ImageIcon size={20} />;
                          return <File size={20} />;
                        })()}
                      </div>
                      <span className="text-[14px] font-bold text-[#334155] truncate group-hover:text-[#4F46E5] transition-colors">{material.title}</span>
                    </div>
                    <div className="flex md:block items-center justify-between text-[13px] font-semibold text-[#6B7280] md:text-center">
                      <span className="md:hidden text-gray-400 font-medium tracking-wide">Type:</span>
                      {(() => {
                        const t = (material.file_type || '').toLowerCase();
                        const title = (material.title || '').toLowerCase();
                        if (t.includes('pdf') || title.endsWith('.pdf')) return 'PDF';
                        if (t.includes('video') || t.includes('mp4') || t.includes('mov') || title.endsWith('.mp4') || title.endsWith('.mov')) return 'Video';
                        if (t.includes('url') || t.includes('link')) return 'Link';
                        if (t.includes('image') || t.includes('png') || t.includes('jpg') || t.includes('jpeg')) return 'Image';
                        return t ? t.toUpperCase() : 'FILE';
                      })()}
                    </div>
                    <div className="flex md:block items-center justify-between text-[13px] font-semibold text-[#6B7280] md:text-center">
                      <span className="md:hidden text-gray-400 font-medium tracking-wide">Date:</span>
                      {material.created_at ? new Date(material.created_at).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : 'Mar 15, 2026'}
                    </div>
                    <div className="flex md:block justify-center mt-4 md:mt-0">
                      {(() => {
                        const t = (material.file_type || '').toLowerCase();
                        const isUrl = t.includes('url') || t.includes('link') || t.includes('image') || t.includes('png') || t.includes('jpg');
                        
                        return (
                          <button 
                            onClick={() => {
                              if (isUrl && material.url) window.open(material.url, "_blank");
                              else handleDownload(material.id, material.title);
                            }} 
                            className="flex flex-col items-center justify-center md:mx-auto bg-gradient-to-r from-[#4D76F1] to-[#924AF0] text-white transition-all shadow-sm focus:outline-none outline-none hover:shadow-md" 
                            style={{ width: '96px', height: '56px', borderRadius: '10px', opacity: 1 }}
                          >
                            <Download size={18} className="mb-0.5" />
                            <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0px', textAlign: 'center' }}>Download</span>
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
