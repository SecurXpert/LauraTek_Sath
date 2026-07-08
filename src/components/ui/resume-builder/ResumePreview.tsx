import React from "react";
import { X, Download } from "lucide-react";
import { ResumeFormData } from "../Resume";
import ModernSidebarTemplate from "./preview-templates/ModernSidebarTemplate";
import CleanProfessionalTemplate from "./preview-templates/CleanProfessionalTemplate";

interface ResumePreviewProps {
  previewOpen: boolean;
  setPreviewOpen: (val: boolean) => void;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate: string;
  withPhoto: boolean | null;
  data: ResumeFormData;
  handlePreviewPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  saving: boolean;
  handleDownloadClick: () => void;
  step: "selection" | "dashboard" | "form" | "file" | "preview" | "init";
}

export default function ResumePreview({
  previewOpen,
  setPreviewOpen,
  previewRef,
  selectedTemplate,
  withPhoto,
  data,
  handlePreviewPhotoUpload,
  message,
  saving,
  handleDownloadClick,
  step,
}: ResumePreviewProps) {
  if (!previewOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-auto relative">
        <button
          onClick={() => setPreviewOpen(false)}
          className="absolute top-4 right-6 text-gray-600 hover:text-gray-900 z-10 bg-white/80 rounded-full p-2 shadow"
        >
          <X size={28} />
        </button>

        <div ref={previewRef} className="p-0 bg-white">
          {selectedTemplate === "modern-sidebar" ? (
            <ModernSidebarTemplate
              data={data}
              step={step}
              handlePreviewPhotoUpload={handlePreviewPhotoUpload}
            />
          ) : (
            <CleanProfessionalTemplate
              data={data}
              step={step}
              withPhoto={withPhoto}
              handlePreviewPhotoUpload={handlePreviewPhotoUpload}
            />
          )}
        </div>

        {step === "dashboard" && (
          <div className="p-6 bg-gray-50 border-t flex justify-between items-center gap-4">
            <div className="flex-1">
              {message && (
                <div className={`px-4 py-3 rounded-lg inline-block text-sm font-medium ${message.includes("Error") ? "bg-red-50 text-red-800 border border-red-200" : "bg-green-50 text-green-800 border border-green-200"}`}>
                  {message}
                </div>
              )}
            </div>
            <button
              onClick={handleDownloadClick}
              disabled={saving}
              className="flex items-center gap-3 px-8 py-4 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download size={24} strokeWidth={2} />
              <span className="text-lg font-medium">{saving ? "Generating..." : "Download PDF"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
