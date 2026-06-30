export interface WorkExperience {
  company_name: string;
  designation: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  technologies_used: string[];
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  grade: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export type ApiAdditionalProps = Record<string, any>;

export interface ApiResumePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  nationality: string;
  city: string;
  pin_code: string;
  job_title: string;
  professional_summary: { additionalProp1: ApiAdditionalProps };
  permanent_address: Address[];
  education_details: Array<{
    degree: string;
    institution: string;
    field_of_study: string;
    start_year: number;
    end_year: number;
    grade: string;
  }>;
  work_experience: WorkExperience[];
  project_details: Array<{ additionalProp1: ApiAdditionalProps }>;
  skills: string[];
  certifications: Array<{ additionalProp1: ApiAdditionalProps }>;
  hobbies: string[];
  awards: Array<{ additionalProp1: ApiAdditionalProps }>;
  languages: Array<{ additionalProp1: ApiAdditionalProps }>;
  profile_photo_url: string;
  linkedin_url: string;
  github_url: string;
  extra_data: Record<string, any>;
}

export interface ResumeFormData {
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  phone_number: string;
  nationality: string;
  city: string;
  pin_code: string;
  professional_summary: string;
  permanent_address: Address[];
  skills: string[];
  languages: string[];
  hobbies: string[];
  work_experience: WorkExperience[];
  education_details: Education[];
  project_details: Project[];
  certifications: string[];
  awards: string[];
  linkedin_url: string;
  github_url: string;
  profile_photo_url: string;
  extra_data?: Record<string, any>;
}

export const emptyResume: ResumeFormData = {
  first_name: "",
  last_name: "",
  job_title: "",
  email: "",
  phone_number: "",
  nationality: "",
  city: "",
  pin_code: "",
  professional_summary: "",
  permanent_address: [
    {
      street: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    },
  ],
  skills: [],
  languages: [],
  hobbies: [],
  work_experience: [],
  education_details: [],
  project_details: [],
  certifications: [],
  awards: [],
  linkedin_url: "",
  github_url: "",
  profile_photo_url: "",
  extra_data: {},
};
