import React from "react";

interface TemplateGridWithoutPhotoProps {
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
}

export default function TemplateGridWithoutPhoto({
  selectedTemplate,
  setSelectedTemplate,
}: TemplateGridWithoutPhotoProps) {
  return (
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
  );
}
