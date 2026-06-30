import React from "react";
import { ArrowLeft, Image, ImageOff } from "lucide-react";
import { ResumeFormData } from "./types";

interface ResumeSelectionProps {
  resumesList: any[];
  setStep: (step: "selection" | "dashboard" | "form" | "file" | "preview") => void;
  withPhoto: boolean | null;
  setWithPhoto: (val: boolean | null) => void;
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
  setData: (data: ResumeFormData) => void;
  emptyResume: ResumeFormData;
  setResumeId: (id: number | null) => void;
  setImageFileName: (name: string) => void;
}

export default function ResumeSelection({
  resumesList,
  setStep,
  withPhoto,
  setWithPhoto,
  selectedTemplate,
  setSelectedTemplate,
  setData,
  emptyResume,
  setResumeId,
  setImageFileName,
}: ResumeSelectionProps) {
  return (
    <section className="w-full bg-white p-5 sm:p-8 rounded-xl shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Choose Resume Type</h2>
        {resumesList.length > 0 && (
          <button
            onClick={() => setStep("dashboard")}
            className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition text-sm text-gray-650 font-medium cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
      </div>
      
      {/* Radio Buttons for Photo Option */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8">
        <label className="flex flex-1 sm:flex-none items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition" style={{ borderColor: withPhoto === true ? "#4f46e5" : "#e5e7eb" }}>
          <input
            type="radio"
            name="photoOption"
            value="withPhoto"
            checked={withPhoto === true}
            onChange={() => {
              setWithPhoto(true);
              setSelectedTemplate("");
            }}
            className="h-5 w-5 text-indigo-600"
          />
          <Image size={20} className="text-gray-600" />
          <span className="text-base sm:text-lg font-medium text-gray-700">With Photo</span>
        </label>
        <label className="flex flex-1 sm:flex-none items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition" style={{ borderColor: withPhoto === false ? "#4f46e5" : "#e5e7eb" }}>
          <input
            type="radio"
            name="photoOption"
            value="withoutPhoto"
            checked={withPhoto === false}
            onChange={() => {
              setWithPhoto(false);
              setSelectedTemplate("");
            }}
            className="h-5 w-5 text-indigo-600"
          />
          <ImageOff size={20} className="text-gray-600" />
          <span className="text-base sm:text-lg font-medium text-gray-700">Without Photo</span>
        </label>
      </div>

      {/* Templates Grid */}
      {withPhoto === true && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Select a Template with Photo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Template 1 - Modern Sidebar */}
            <div 
              onClick={() => setSelectedTemplate("modern-sidebar")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "modern-sidebar" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="flex h-full text-[6px] leading-tight">
                  <div className="w-2/5 bg-slate-700 p-2 flex flex-col items-center text-white">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mb-2 overflow-hidden"></div>
                    <div className="text-[7px] font-bold mb-1">CONTACT</div>
                    <div className="w-full h-px bg-white/30 mb-1"></div>
                    <div className="text-[5px] text-white/80 text-center">+123 456 7890</div>
                    <div className="text-[5px] text-white/80 text-center">email@test.com</div>
                    <div className="text-[7px] font-bold mt-2 mb-1">SKILLS</div>
                    <div className="w-full h-px bg-white/30 mb-1"></div>
                    <div className="text-[5px] text-white/80">Management</div>
                    <div className="text-[5px] text-white/80">Communication</div>
                  </div>
                  <div className="w-3/5 p-2 bg-white">
                    <div className="text-[9px] font-bold text-slate-800 leading-none">JOHN DOE</div>
                    <div className="text-[6px] text-slate-600 mb-2">Marketing Manager</div>
                    <div className="w-full h-0.5 bg-slate-300 mb-2"></div>
                    <div className="text-[7px] font-bold text-slate-700 mb-1">ABOUT ME</div>
                    <div className="text-[5px] text-gray-600 mb-2 leading-tight">Experienced professional with expertise in business management.</div>
                    <div className="text-[7px] font-bold text-slate-700 mb-1">EXPERIENCE</div>
                    <div className="text-[5px] font-semibold text-slate-800">Manager</div>
                    <div className="text-[5px] text-gray-500">2019 - Present</div>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Modern Sidebar</p>
              <p className="text-xs text-gray-500">Left sidebar with photo</p>
            </div>

            {/* Template 2 - Classic Clean */}
            <div 
              onClick={() => setSelectedTemplate("classic-clean")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "classic-clean" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="p-3 text-[6px] leading-tight">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden"></div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 tracking-wide">SAMIRA HADID</div>
                      <div className="text-[7px] text-slate-600 mb-1">Marketing Manager</div>
                      <div className="w-8 h-0.5 bg-slate-700"></div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">CONTACT</div>
                      <div className="text-[5px] text-gray-500">+123 456 7890</div>
                      <div className="text-[5px] text-gray-500">hello@email.com</div>
                    </div>
                    <div className="w-2/3">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">ABOUT ME</div>
                      <div className="text-[5px] text-gray-600 leading-tight">Dynamic professional with strong leadership skills.</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Classic Clean</p>
              <p className="text-xs text-gray-500">Traditional with photo</p>
            </div>

            {/* Template 3 - Two Column */}
            <div 
              onClick={() => setSelectedTemplate("two-column-photo")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "two-column-photo" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="p-2 text-[6px] leading-tight">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[10px] font-bold text-slate-800">HANNAH MORALES</div>
                      <div className="text-[6px] text-slate-600">Marketing Manager</div>
                    </div>
                    <div className="w-10 h-10 rounded bg-gray-300 overflow-hidden"></div>
                  </div>
                  <div className="w-full h-px bg-gray-300 mb-2"></div>
                  <div className="flex gap-3">
                    <div className="w-1/2">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">ABOUT ME</div>
                      <div className="text-[5px] text-gray-600 leading-tight mb-2">Results-driven manager with proven track record.</div>
                      <div className="text-[6px] font-bold text-slate-700 mb-1">CONTACT</div>
                      <div className="text-[5px] text-gray-500">123-456-7890</div>
                      <div className="text-[5px] text-gray-500">hello@greatsite.com</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">EXPERIENCE</div>
                      <div className="text-[5px] font-semibold text-slate-800">Marketing Manager</div>
                      <div className="text-[5px] text-gray-500">2018 - 2021</div>
                      <div className="text-[5px] font-semibold text-slate-800 mt-1">Senior Manager</div>
                      <div className="text-[5px] text-gray-500">2021 - Present</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Two Column</p>
              <p className="text-xs text-gray-500">Split layout with photo</p>
            </div>

            {/* Template 4 - Creative Circle */}
            <div 
              onClick={() => setSelectedTemplate("creative-circle")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "creative-circle" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="p-3 text-center text-[6px] leading-tight">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 mx-auto mb-2 overflow-hidden"></div>
                  <div className="text-[11px] font-bold text-slate-800 tracking-wide">EMMA WILSON</div>
                  <div className="text-[7px] text-slate-500 mb-2">Creative Director</div>
                  <div className="w-16 h-0.5 bg-indigo-500 mx-auto mb-2"></div>
                  <div className="flex justify-center gap-3 mb-2">
                    <div className="text-[5px] text-gray-500">emma@design.com</div>
                    <div className="text-[5px] text-gray-500">|</div>
                    <div className="text-[5px] text-gray-500">+123 456 7890</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[6px] font-bold text-slate-700 mb-1 text-center">EXPERTISE</div>
                    <div className="flex justify-center gap-2">
                      <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Design</div>
                      <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Branding</div>
                      <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">UI/UX</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Creative Circle</p>
              <p className="text-xs text-gray-500">Centered photo design</p>
            </div>

          </div>
        </div>
      )}

      {withPhoto === false && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Select a Template without Photo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Template 1 - Professional Header */}
            <div 
              onClick={() => setSelectedTemplate("professional-header")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "professional-header" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="h-14 bg-slate-800 mb-2"></div>
                <div className="px-3 text-[6px] leading-tight">
                  <div className="text-[10px] font-bold text-slate-800 mb-0.5">MICHAEL CHEN</div>
                  <div className="text-[6px] text-slate-600 mb-2">Senior Business Analyst</div>
                  <div className="flex gap-2 mb-2">
                    <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Excel</div>
                    <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">SQL</div>
                    <div className="text-[5px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Tableau</div>
                  </div>
                  <div className="text-[6px] font-bold text-slate-700 mb-1">CONTACT</div>
                  <div className="text-[5px] text-gray-500">michael@email.com | +123 456 7890</div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Professional Header</p>
              <p className="text-xs text-gray-500">Bold header, no photo</p>
            </div>

            {/* Template 2 - Minimalist */}
            <div 
              onClick={() => setSelectedTemplate("minimalist")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "minimalist" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="p-3 text-[6px] leading-tight">
                  <div className="text-[12px] font-light text-slate-800 mb-0.5">SARAH ANDERSON</div>
                  <div className="text-[7px] text-slate-500 mb-2">Product Designer</div>
                  <div className="w-full h-px bg-gray-300 mb-2"></div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">EDUCATION</div>
                      <div className="text-[5px] text-gray-600 leading-tight">Stanford University</div>
                      <div className="text-[5px] text-gray-500">BS Design, 2018</div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-[6px] font-bold text-slate-700 mb-1">SKILLS</div>
                      <div className="text-[5px] text-gray-600">Figma, Sketch, Adobe</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Minimalist</p>
              <p className="text-xs text-gray-500">Clean, simple layout</p>
            </div>

            {/* Template 3 - Corporate */}
            <div 
              onClick={() => setSelectedTemplate("corporate")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "corporate" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="border-b-2 border-blue-800 pb-2 mb-2">
                  <div className="px-3 pt-2 text-[6px] leading-tight">
                    <div className="text-[10px] font-bold text-blue-900">ROBERT TAYLOR</div>
                    <div className="text-[6px] text-blue-600">Finance Director</div>
                  </div>
                </div>
                <div className="px-3 text-[6px] leading-tight">
                  <div className="text-[6px] font-bold text-slate-700 mb-1">SUMMARY</div>
                  <div className="text-[5px] text-gray-600 mb-2 leading-tight">Experienced finance professional with CPA certification.</div>
                  <div className="text-[6px] font-bold text-slate-700 mb-1">EXPERIENCE</div>
                  <div className="text-[5px] text-gray-600 leading-tight">Senior Analyst at Deloitte (2015-2019)</div>
                  <div className="text-[5px] text-gray-600 leading-tight">Finance Director at Corp Inc (2019-Present)</div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Corporate Blue</p>
              <p className="text-xs text-gray-500">Professional business style</p>
            </div>

            {/* Template 4 - Modern No Photo */}
            <div 
              onClick={() => setSelectedTemplate("modern-no-photo")}
              className={`cursor-pointer rounded-lg border-2 p-3 transition hover:shadow-lg ${selectedTemplate === "modern-no-photo" ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}
            >
              <div className="bg-white rounded h-48 mb-3 overflow-hidden shadow-sm">
                <div className="p-3 text-[6px] leading-tight">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-8 bg-green-500"></div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-800">LISA PARK</div>
                      <div className="text-[6px] text-slate-500">Software Engineer</div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  <div className="flex gap-1 mb-2">
                    <div className="text-[5px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">React</div>
                    <div className="text-[5px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Node.js</div>
                    <div className="text-[5px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Python</div>
                  </div>
                  <div className="text-[6px] font-bold text-slate-700 mb-1">CONTACT</div>
                  <div className="text-[5px] text-gray-500">lisa@tech.com | github.com/lisa</div>
                </div>
              </div>
              <p className="font-medium text-gray-800">Modern Clean</p>
              <p className="text-xs text-gray-500">Contemporary no-photo</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => {
            if (withPhoto !== null && selectedTemplate) {
              const templateToUse = selectedTemplate;
              const photoOptToUse = withPhoto;
              setData(emptyResume);
              setResumeId(null);
              setImageFileName("");
              setWithPhoto(photoOptToUse);
              setSelectedTemplate(templateToUse);
              setStep("form");
            }
          }}
          disabled={withPhoto === null || !selectedTemplate}
          className="mt-6 w-full max-w-md px-8 py-3.5 bg-gradient-to-r from-[#2B58FF] to-[#8B3BFF] text-white font-bold text-[16px] rounded-full shadow-md hover:shadow-lg hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
