import React from "react";

interface TemplateGridWithPhotoProps {
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
}

export default function TemplateGridWithPhoto({
  selectedTemplate,
  setSelectedTemplate,
}: TemplateGridWithPhotoProps) {
  return (
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
  );
}
