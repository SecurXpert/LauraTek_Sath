import React from "react";
import { ArrowLeft, Plus, Eye, Edit, Trash2 } from "lucide-react";

interface ResumeDashboardProps {
  resumesList: any[];
  loadingResumes: boolean;
  setStep: (step: "selection" | "dashboard" | "form" | "file" | "preview") => void;
  handlePreviewResumeFromList: (resume: any) => void;
  handleEditResumeFromList: (resume: any) => void;
  handleDeleteResumeFromList: (id: number) => void;
}

export default function ResumeDashboard({
  resumesList,
  loadingResumes,
  setStep,
  handlePreviewResumeFromList,
  handleEditResumeFromList,
  handleDeleteResumeFromList,
}: ResumeDashboardProps) {
  return (
    <section className="w-full bg-white p-5 sm:p-8 rounded-xl shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Resumes</h2>
          <p className="text-sm text-gray-500">Manage, edit, delete or preview your generated resumes.</p>
        </div>
        <button
          onClick={() => setStep("selection")}
          className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition text-sm text-gray-650 font-medium cursor-pointer"
        >
          <ArrowLeft size={16} />
          Choose Template
        </button>
      </div>

      {loadingResumes ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-3"></div>
          <p className="text-gray-500 font-medium">Loading your resumes...</p>
        </div>
      ) : resumesList.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <Plus className="text-[#2B58FF]" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No resumes yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            You haven't created any resumes yet. Click the "Create Resume" button in the top right to start building one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {resumesList.map((resume) => {
            const resumeName = `${resume.first_name || ""} ${resume.last_name || ""}`.trim() || "Untitled Resume";
            const templateName = resume.extra_data?.selectedTemplate
              ? resume.extra_data.selectedTemplate.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
              : "Classic Clean";

            return (
              <div
                key={resume.id}
                className="border rounded-xl p-5 bg-gradient-to-br from-white to-[#fafbfe] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                      {templateName}
                    </span>
                    <span className="text-xs text-gray-400">ID: {resume.id}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{resumeName}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resume.job_title || "No Job Title"}</p>
                  
                  <div className="space-y-1.5 text-xs text-gray-500 border-t pt-3 mb-4">
                    {resume.email && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="truncate">{resume.email}</span>
                      </div>
                    )}
                    {resume.phone_number && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span>{resume.phone_number}</span>
                      </div>
                    )}
                    {resume.city && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-700">City:</span>
                        <span>{resume.city}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 mt-auto w-full">
                  <button
                    onClick={() => handlePreviewResumeFromList(resume)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-xs font-medium transition cursor-pointer min-w-[70px]"
                  >
                    <Eye size={20} />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleEditResumeFromList(resume)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 text-black text-xs font-medium transition cursor-pointer min-w-[70px]"
                  >
                    <Edit size={18} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteResumeFromList(resume.id)}
                    className="flex-none flex items-center justify-center p-2 border border-red-100 bg-red-50 rounded-lg hover:bg-red-100 text-red-600 transition cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
