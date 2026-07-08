import React from "react";
import { Save } from "lucide-react";
import { ResumeFormData, Address, WorkExperience, Education, Project } from "../Resume";
import PersonalDetailsSection from "./form-sections/PersonalDetailsSection";
import ProfessionalSummarySection from "./form-sections/ProfessionalSummarySection";
import AddressSection from "./form-sections/AddressSection";
import SkillsSection from "./form-sections/SkillsSection";
import WorkExperienceSection from "./form-sections/WorkExperienceSection";
import EducationSection from "./form-sections/EducationSection";
import ProjectsSection from "./form-sections/ProjectsSection";
import AdditionalInfoSection from "./form-sections/AdditionalInfoSection";

interface ResumeFormProps {
  data: ResumeFormData;
  update: (field: keyof ResumeFormData, value: any) => void;
  updateAddress: (field: keyof Address, value: string) => void;
  updateArray: (field: keyof ResumeFormData, index: number, value: string, subField?: string) => void;
  updateExperience: (index: number, field: keyof WorkExperience, value: any) => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  updateProject: (index: number, field: keyof Project, value: string) => void;
  addSkill: () => void;
  addLanguage: () => void;
  addHobby: () => void;
  addCertification: () => void;
  addAward: () => void;
  addExperience: () => void;
  addEducation: () => void;
  addProject: () => void;
  removeFromArray: (field: keyof ResumeFormData, index: number) => void;
  errors: Record<string, string>;
  withPhoto: boolean | null;
  handleFormFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFileName: string;
  handleRemovePhoto: () => void;
  saving: boolean;
  handleSave: () => void;
}

export default function ResumeForm({
  data,
  update,
  updateAddress,
  updateArray,
  updateExperience,
  updateEducation,
  updateProject,
  addSkill,
  addLanguage,
  addHobby,
  addCertification,
  addAward,
  addExperience,
  addEducation,
  addProject,
  removeFromArray,
  errors,
  withPhoto,
  handleFormFileChange,
  imageFileName,
  handleRemovePhoto,
  saving,
  handleSave,
}: ResumeFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-6 sm:space-y-8">
          <PersonalDetailsSection
            data={data}
            update={update}
            errors={errors}
            withPhoto={withPhoto}
            handleFormFileChange={handleFormFileChange}
            imageFileName={imageFileName}
            handleRemovePhoto={handleRemovePhoto}
          />
          <ProfessionalSummarySection data={data} update={update} errors={errors} />
          <AddressSection data={data} updateAddress={updateAddress} errors={errors} />
        </div>

        <div className="space-y-6 sm:space-y-8">
          <SkillsSection
            data={data}
            updateArray={updateArray}
            addSkill={addSkill}
            removeFromArray={removeFromArray}
            errors={errors}
          />
          <WorkExperienceSection
            data={data}
            updateExperience={updateExperience}
            addExperience={addExperience}
            removeFromArray={removeFromArray}
            errors={errors}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
        <EducationSection
          data={data}
          updateEducation={updateEducation}
          addEducation={addEducation}
          removeFromArray={removeFromArray}
          errors={errors}
        />
        <ProjectsSection
          data={data}
          updateProject={updateProject}
          addProject={addProject}
          removeFromArray={removeFromArray}
          errors={errors}
        />
        <AdditionalInfoSection
          data={data}
          updateArray={updateArray}
          addCertification={addCertification}
          addAward={addAward}
          addLanguage={addLanguage}
          addHobby={addHobby}
          removeFromArray={removeFromArray}
          errors={errors}
        />
      </div>

      <div className="flex justify-end mt-8 pb-12">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#2B58FF] to-[#8B3BFF] text-white font-bold text-[16px] rounded-full shadow-md hover:shadow-lg hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Resume"}
        </button>
      </div>
    </>
  );
}
