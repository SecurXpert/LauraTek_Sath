import React from "react";
import { ArrowLeft } from "lucide-react";
import { ResumeFormData } from "../Resume";
import PhotoSelector from "./selection-sections/PhotoSelector";
import TemplateGridWithPhoto from "./selection-sections/TemplateGridWithPhoto";
import TemplateGridWithoutPhoto from "./selection-sections/TemplateGridWithoutPhoto";

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
      
      <PhotoSelector 
        withPhoto={withPhoto} 
        setWithPhoto={setWithPhoto} 
        setSelectedTemplate={setSelectedTemplate} 
      />

      {withPhoto === true && (
        <TemplateGridWithPhoto 
          selectedTemplate={selectedTemplate} 
          setSelectedTemplate={setSelectedTemplate} 
        />
      )}

      {withPhoto === false && (
        <TemplateGridWithoutPhoto 
          selectedTemplate={selectedTemplate} 
          setSelectedTemplate={setSelectedTemplate} 
        />
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
