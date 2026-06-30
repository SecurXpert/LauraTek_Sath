import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Eye,
  Download,
  Plus,
  Trash2,
  X,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
  Edit,
  Heart,
  MapPin,
  Image,
  ImageOff,
  ArrowLeft,
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Sidebar from "../sidebar";
import Profileheader from "@/components/ui/Profileheader";
import { useToast } from "@/hooks/use-toast";

import { ResumeFormData, Address, WorkExperience, Education, Project, ApiResumePayload, emptyResume } from "./resume-builder/types";
import ResumeDashboard from "./resume-builder/ResumeDashboard";
import ResumeSelection from "./resume-builder/ResumeSelection";
import ResumeForm from "./resume-builder/ResumeForm";
import ResumePreview from "./resume-builder/ResumePreview";

export default function ResumeBuilder() {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeFormData>(emptyResume);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"selection" | "dashboard" | "form" | "file" | "preview">("selection");
  const [withPhoto, setWithPhoto] = useState<boolean | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [resumesList, setResumesList] = useState<any[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageFileName, setImageFileName] = useState<string>("");
  const previewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      message &&
      !message.includes("Error") &&
      message !== "Generating PDF..." &&
      message !== "Fetching download URL..." &&
      message !== "Uploading PDF to server..." &&
      message !== "Downloading PDF from server..."
    ) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchResumes = async () => {
    setLoadingResumes(true);
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/resumes/my-resume`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // If the data has an id, it's a valid resume
          const listData = Array.isArray(data) ? data : (data && data.id ? [data] : []);
          setResumesList(listData);
          localStorage.setItem("cached_resumes", JSON.stringify(listData));
        } else {
          console.error("Failed to fetch resumes:", response.status);
          const cached = localStorage.getItem("cached_resumes");
          if (cached) {
            try { setResumesList(JSON.parse(cached)); } catch { setResumesList([]); }
          }
        }
      } else {
        const cached = localStorage.getItem("cached_resumes");
        if (cached) {
          try { setResumesList(JSON.parse(cached)); } catch { setResumesList([]); }
        }
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      const cached = localStorage.getItem("cached_resumes");
      if (cached) {
        try { setResumesList(JSON.parse(cached)); } catch { setResumesList([]); }
      }
    } finally {
      setLoadingResumes(false);
    }
  };

  const fetchAndMapSingleResume = async (id: number, token: string) => {
    try {
      const getUrl = `${import.meta.env.VITE_API_URL}/resumes/my-resume`;
      const getResponse = await fetch(getUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (getResponse.ok) {
        const getData = await getResponse.json().catch(() => ({}));
        console.log("Successfully hit GET resume endpoint:", getData);
        
        const mappedData: ResumeFormData = {
          first_name: getData.first_name || "",
          last_name: getData.last_name || "",
          job_title: getData.job_title || "Creative Developer & Designer",
          email: getData.email || "",
          phone_number: getData.phone_number || "",
          nationality: getData.nationality || "",
          city: getData.city || "",
          pin_code: getData.pin_code || "",
          professional_summary: getData.professional_summary?.additionalProp1?.text || getData.professional_summary?.text || (typeof getData.professional_summary === "string" ? getData.professional_summary : ""),
          permanent_address: getData.permanent_address && getData.permanent_address.length > 0 ? getData.permanent_address : [
            {
              street: "",
              city: "",
              state: "",
              country: "India",
              postal_code: "",
            },
          ],
          skills: getData.skills || [],
          languages: getData.languages?.map((l: any) => {
            if (typeof l === 'string') return l;
            if (l?.additionalProp1?.value) return l.additionalProp1.value;
            if (l?.value) return l.value;
            if (l?.name) return l.name;
            return JSON.stringify(l);
          }) || [],
          hobbies: getData.hobbies || [],
          work_experience: (getData.work_experience || []).map((exp: any) => ({
            company_name: exp.company_name || "",
            designation: exp.designation || "",
            employment_type: exp.employment_type || "",
            location: exp.location || "",
            start_date: exp.start_date ? exp.start_date.slice(0, 7) : "",
            end_date: exp.end_date ? exp.end_date.slice(0, 7) : "",
            is_current: exp.is_current || false,
            technologies_used: exp.technologies_used || [],
            responsibilities: exp.responsibilities || [],
            achievements: exp.achievements || [],
          })),
          education_details: (getData.education_details || []).map((edu: any) => ({
            degree: edu.degree || "",
            institution: edu.institution || "",
            field_of_study: edu.field_of_study || "",
            start_year: edu.start_year ? String(edu.start_year) : "",
            end_year: edu.end_year ? String(edu.end_year) : "",
            grade: edu.grade || "",
          })),
          project_details: (getData.project_details || []).map((proj: any) => {
            const rawTech = proj.additionalProp1?.technologies || proj.technologies || "";
            return {
              name: proj.additionalProp1?.name || proj.name || "",
              description: proj.additionalProp1?.description || proj.description || "",
              technologies: Array.isArray(rawTech) ? rawTech.join(", ") : String(rawTech),
              link: proj.additionalProp1?.link || proj.link || "",
            };
          }),
          certifications: getData.certifications?.map((c: any) => {
            if (typeof c === 'string') return c;
            if (c?.additionalProp1?.value) return c.additionalProp1.value;
            if (c?.value) return c.value;
            if (c?.name) return `${c.name}${c.issuer ? ` from ${c.issuer}` : ''}${c.year ? ` (${c.year})` : ''}`;
            return JSON.stringify(c);
          }) || [],
          awards: getData.awards?.map((a: any) => {
            if (typeof a === 'string') return a;
            if (a?.additionalProp1?.value) return a.additionalProp1.value;
            if (a?.value) return a.value;
            if (a?.name) return `${a.name}${a.issuer ? ` from ${a.issuer}` : ''}${a.year ? ` (${a.year})` : ''}`;
            return JSON.stringify(a);
          }) || [],
          linkedin_url: getData.linkedin_url || "",
          github_url: getData.github_url || "",
          profile_photo_url: getData.extra_data?.profile_photo_data || getData.profile_photo_url || "",
          extra_data: getData.extra_data || {},
        };
        setData(mappedData);
        setResumeId(id);
        if (mappedData.profile_photo_url) {
          setImageFileName("Selected Image");
        } else {
          setImageFileName("");
        }

        // Update local storage cache
        const cached = localStorage.getItem("cached_resumes");
        let list: any[] = [];
        if (cached) {
          try {
            list = JSON.parse(cached);
          } catch {}
        }
        const existingIndex = list.findIndex((r: any) => r.id === id);
        if (existingIndex > -1) {
          list[existingIndex] = getData;
        } else {
          list.push(getData);
        }
        localStorage.setItem("cached_resumes", JSON.stringify(list));
        setResumesList(list);
      } else {
        console.error(`Failed to hit GET resume endpoint: ${getResponse.status}`);
      }
    } catch (getErr) {
      console.error("Error calling GET resume endpoint:", getErr);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (token) {
      fetchResumes();
    }
  }, []);

  const handleEditResumeFromList = (resume: any) => {
    const mappedData: ResumeFormData = {
      first_name: resume.first_name || "",
      last_name: resume.last_name || "",
      job_title: resume.job_title || "",
      email: resume.email || "",
      phone_number: resume.phone_number || "",
      nationality: resume.nationality || "",
      city: resume.city || "",
      pin_code: resume.pin_code || "",
      professional_summary: resume.professional_summary?.additionalProp1?.text || resume.professional_summary?.text || (typeof resume.professional_summary === "string" ? resume.professional_summary : ""),
      permanent_address: resume.permanent_address && resume.permanent_address.length > 0 ? resume.permanent_address : [
        {
          street: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
        },
      ],
      skills: resume.skills || [],
      languages: resume.languages?.map((l: any) => {
        if (typeof l === 'string') return l;
        if (l?.additionalProp1?.value) return l.additionalProp1.value;
        if (l?.value) return l.value;
        if (l?.name) return l.name;
        return JSON.stringify(l);
      }) || [],
      hobbies: resume.hobbies || [],
      work_experience: (resume.work_experience || []).map((exp: any) => ({
        company_name: exp.company_name || "",
        designation: exp.designation || "",
        employment_type: exp.employment_type || "",
        location: exp.location || "",
        start_date: exp.start_date ? exp.start_date.slice(0, 7) : "",
        end_date: exp.end_date ? exp.end_date.slice(0, 7) : "",
        is_current: exp.is_current || false,
        technologies_used: exp.technologies_used || [],
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || [],
      })),
      education_details: (resume.education_details || []).map((edu: any) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        field_of_study: edu.field_of_study || "",
        start_year: edu.start_year ? String(edu.start_year) : "",
        end_year: edu.end_year ? String(edu.end_year) : "",
        grade: edu.grade || "",
      })),
      project_details: (resume.project_details || []).map((proj: any) => {
        const rawTech = proj.additionalProp1?.technologies || proj.technologies || "";
        return {
          name: proj.additionalProp1?.name || proj.name || "",
          description: proj.additionalProp1?.description || proj.description || "",
          technologies: Array.isArray(rawTech) ? rawTech.join(", ") : String(rawTech),
          link: proj.additionalProp1?.link || proj.link || "",
        };
      }),
      certifications: resume.certifications?.map((c: any) => {
        if (typeof c === 'string') return c;
        if (c?.additionalProp1?.value) return c.additionalProp1.value;
        if (c?.value) return c.value;
        if (c?.name) return `${c.name}${c.issuer ? ` from ${c.issuer}` : ''}${c.year ? ` (${c.year})` : ''}`;
        return JSON.stringify(c);
      }) || [],
      awards: resume.awards?.map((a: any) => {
        if (typeof a === 'string') return a;
        if (a?.additionalProp1?.value) return a.additionalProp1.value;
        if (a?.value) return a.value;
        if (a?.name) return `${a.name}${a.issuer ? ` from ${a.issuer}` : ''}${a.year ? ` (${a.year})` : ''}`;
        return JSON.stringify(a);
      }) || [],
      linkedin_url: resume.linkedin_url || "",
      github_url: resume.github_url || "",
      profile_photo_url: resume.extra_data?.profile_photo_data || resume.profile_photo_url || "",
      extra_data: resume.extra_data || {},
    };

    setData(mappedData);
    setResumeId(resume.id);
    if (mappedData.profile_photo_url) {
      setImageFileName("Selected Image");
    } else {
      setImageFileName("");
    }
    const selTemplate = resume.extra_data?.selectedTemplate || "classic-clean";
    const photoOpt = typeof resume.extra_data?.withPhoto === "boolean" ? resume.extra_data.withPhoto : false;
    setSelectedTemplate(selTemplate);
    setWithPhoto(photoOpt);
    setStep("form");
  };

  const handlePreviewResumeFromList = (resume: any) => {
    const mappedData: ResumeFormData = {
      first_name: resume.first_name || "",
      last_name: resume.last_name || "",
      job_title: resume.job_title || "",
      email: resume.email || "",
      phone_number: resume.phone_number || "",
      nationality: resume.nationality || "",
      city: resume.city || "",
      pin_code: resume.pin_code || "",
      professional_summary: resume.professional_summary?.additionalProp1?.text || resume.professional_summary?.text || (typeof resume.professional_summary === "string" ? resume.professional_summary : ""),
      permanent_address: resume.permanent_address && resume.permanent_address.length > 0 ? resume.permanent_address : [
        {
          street: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
        },
      ],
      skills: resume.skills || [],
      languages: resume.languages?.map((l: any) => {
        if (typeof l === 'string') return l;
        if (l?.additionalProp1?.value) return l.additionalProp1.value;
        if (l?.value) return l.value;
        if (l?.name) return l.name;
        return JSON.stringify(l);
      }) || [],
      hobbies: resume.hobbies || [],
      work_experience: (resume.work_experience || []).map((exp: any) => ({
        company_name: exp.company_name || "",
        designation: exp.designation || "",
        employment_type: exp.employment_type || "",
        location: exp.location || "",
        start_date: exp.start_date ? exp.start_date.slice(0, 7) : "",
        end_date: exp.end_date ? exp.end_date.slice(0, 7) : "",
        is_current: exp.is_current || false,
        technologies_used: exp.technologies_used || [],
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || [],
      })),
      education_details: (resume.education_details || []).map((edu: any) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        field_of_study: edu.field_of_study || "",
        start_year: edu.start_year ? String(edu.start_year) : "",
        end_year: edu.end_year ? String(edu.end_year) : "",
        grade: edu.grade || "",
      })),
      project_details: (resume.project_details || []).map((proj: any) => {
        const rawTech = proj.additionalProp1?.technologies || proj.technologies || "";
        return {
          name: proj.additionalProp1?.name || proj.name || "",
          description: proj.additionalProp1?.description || proj.description || "",
          technologies: Array.isArray(rawTech) ? rawTech.join(", ") : String(rawTech),
          link: proj.additionalProp1?.link || proj.link || "",
        };
      }),
      certifications: resume.certifications?.map((c: any) => {
        if (typeof c === 'string') return c;
        if (c?.additionalProp1?.value) return c.additionalProp1.value;
        if (c?.value) return c.value;
        if (c?.name) return `${c.name}${c.issuer ? ` from ${c.issuer}` : ''}${c.year ? ` (${c.year})` : ''}`;
        return JSON.stringify(c);
      }) || [],
      awards: resume.awards?.map((a: any) => {
        if (typeof a === 'string') return a;
        if (a?.additionalProp1?.value) return a.additionalProp1.value;
        if (a?.value) return a.value;
        if (a?.name) return `${a.name}${a.issuer ? ` from ${a.issuer}` : ''}${a.year ? ` (${a.year})` : ''}`;
        return JSON.stringify(a);
      }) || [],
      linkedin_url: resume.linkedin_url || "",
      github_url: resume.github_url || "",
      profile_photo_url: resume.extra_data?.profile_photo_data || resume.profile_photo_url || "",
      extra_data: resume.extra_data || {},
    };

    setData(mappedData);
    setResumeId(resume.id);
    if (mappedData.profile_photo_url) {
      setImageFileName("Selected Image");
    } else {
      setImageFileName("");
    }
    const selTemplate = resume.extra_data?.selectedTemplate || "classic-clean";
    const photoOpt = typeof resume.extra_data?.withPhoto === "boolean" ? resume.extra_data.withPhoto : false;
    setSelectedTemplate(selTemplate);
    setWithPhoto(photoOpt);
    setPreviewOpen(true);
  };

  const handleDeleteResumeFromList = async (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Resume ID ${id}? This action cannot be undone.`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const url = `${import.meta.env.VITE_API_URL}/resumes/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.detail?.[0]?.msg || errorData.detail || errorData.message || `Delete failed (${response.status})`;
        throw new Error(errorMsg);
      }

      if (resumeId === id) {
        setResumeId(null);
        setData(emptyResume);
      }
      
      const cached = localStorage.getItem("cached_resumes");
      if (cached) {
        try {
          const list = JSON.parse(cached);
          const filtered = list.filter((r: any) => r.id !== id);
          localStorage.setItem("cached_resumes", JSON.stringify(filtered));
          setResumesList(filtered);
        } catch {}
      }

      alert("Resume deleted successfully!");
      fetchResumes();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const startNewResume = () => {
    setData(emptyResume);
    setResumeId(null);
    setImageFileName("");
    if (withPhoto === null) setWithPhoto(true);
    if (!selectedTemplate) setSelectedTemplate("classic-clean");
    setStep("form");
  };

  // Error state for validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation helper functions
  const onlyAlphabets = (value: string): boolean => /^[a-zA-Z\s,]*$/.test(value);
  const onlyNumbers = (value: string): boolean => /^[0-9]*$/.test(value);
  const isValidUrl = (value: string): boolean => {
    if (!value) return true;
    if (value.startsWith("data:")) return true;
    try { new URL(value); return true; } catch { return false; }
  };

  // Filter functions to remove invalid characters
  const filterAlphabets = (value: string): string => value.replace(/[^a-zA-Z\s,]/g, "");
  const filterNumbers = (value: string): string => value.replace(/[^0-9]/g, "");

  const validateField = (field: string, value: string): string => {
    const alphaFields = ["first_name", "last_name", "job_title", "nationality", "city", "address_city", "address_state", "address_country"];
    const numFields = ["phone_number", "pin_code", "postal_code"];
    const urlFields = ["linkedin_url", "github_url", "profile_photo_url"];

    if (field === "email" && value) {
      if (!value.includes("@")) return "Email must contain @";
      if (!value.toLowerCase().endsWith(".com")) return "Email must end with .com";
    }

    if (alphaFields.includes(field) && value && !onlyAlphabets(value)) return "Only alphabets allowed";
    if (numFields.includes(field) && value && !onlyNumbers(value)) return "Only numbers allowed";
    if (urlFields.includes(field) && value && !isValidUrl(value)) return "Must be a valid URL";
    return "";
  };

  const update = (field: keyof ResumeFormData, value: any) => {
    // Filter the value based on field type before setting
    let filteredValue = value;
    const fieldStr = field as string;
    const alphaFields = ["first_name", "last_name", "job_title", "nationality", "city"];
    const numFields = ["phone_number", "pin_code"];

    if (typeof value === "string") {
      if (alphaFields.includes(fieldStr)) {
        filteredValue = filterAlphabets(value);
      } else if (numFields.includes(fieldStr)) {
        filteredValue = filterNumbers(value);
      } else if (fieldStr === "email") {
        const dotComIdx = value.toLowerCase().indexOf(".com");
        if (dotComIdx !== -1) {
          filteredValue = value.slice(0, dotComIdx + 4);
        }
      }
    }

    setData((prev) => ({ ...prev, [field]: filteredValue }));
    const errorMsg = validateField(fieldStr, filteredValue as string);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const updateAddress = (field: keyof Address, value: string) => {
    // Filter the value based on field type
    let filteredValue = value;
    if (field === "city" || field === "state" || field === "country") {
      filteredValue = filterAlphabets(value);
    } else if (field === "postal_code") {
      filteredValue = filterNumbers(value);
    }

    setData((prev) => ({
      ...prev,
      permanent_address: [
        {
          ...prev.permanent_address[0],
          [field]: filteredValue,
        },
      ],
    }));
    const errorMsg = validateField(`address_${field}`, filteredValue);
    setErrors((prev) => ({ ...prev, [`address_${field}`]: errorMsg }));
  };

  const addSkill = () => update("skills", [...data.skills, ""]);
  const addLanguage = () => update("languages", [...data.languages, ""]);
  const addHobby = () => update("hobbies", [...data.hobbies, ""]);
  const addCertification = () => update("certifications", [...data.certifications, ""]);
  const addAward = () => update("awards", [...data.awards, ""]);

  const updateArray = <T extends any[]>(
    field: keyof ResumeFormData,
    index: number,
    value: string,
    subField?: keyof T[number]
  ) => {
    // Filter alphabets only for specific array fields
    const alphaOnlyFields = ["certifications", "awards", "languages", "hobbies"];
    let filteredValue = value;
    if (alphaOnlyFields.includes(field as string)) {
      filteredValue = filterAlphabets(value);
    }

    setData((prev) => {
      const arr = [...(prev[field] as any[])];
      if (subField) {
        arr[index] = { ...arr[index], [subField]: filteredValue };
      } else {
        arr[index] = filteredValue;
      }
      return { ...prev, [field]: arr };
    });

    // Validate and set error for array fields
    if (alphaOnlyFields.includes(field as string)) {
      const errorMsg = filteredValue && !onlyAlphabets(filteredValue) ? "Only alphabets allowed" : "";
      setErrors((prev) => ({ ...prev, [`${field}_${index}`]: errorMsg }));
    }
  };

  const removeFromArray = (field: keyof ResumeFormData, index: number) => {
    setData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const addExperience = () =>
    update("work_experience", [
      ...data.work_experience,
      {
        company_name: "",
        designation: "",
        employment_type: "",
        location: "",
        start_date: "",
        end_date: "",
        is_current: false,
        technologies_used: [],
        responsibilities: [],
        achievements: [],
      },
    ]);

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    // Filter alphabets only for specific work experience fields
    const alphaOnlyFields = ["company_name", "designation", "employment_type", "location"];
    let filteredValue = value;
    
    if (alphaOnlyFields.includes(field as string) && typeof value === "string") {
      filteredValue = filterAlphabets(value);
    }
    // Handle array fields like technologies_used, responsibilities, achievements
    if ((field === "technologies_used" || field === "responsibilities" || field === "achievements") && Array.isArray(value)) {
      filteredValue = value;
    }

    setData((prev) => {
      const exp = [...prev.work_experience];
      exp[index] = { ...exp[index], [field]: filteredValue };
      return { ...prev, work_experience: exp };
    });

    // Validate and set error
    let errorMsg = "";
    if (field === "company_name" || field === "designation" || field === "employment_type" || field === "location") {
      if (filteredValue && !onlyAlphabets(filteredValue as string)) {
        errorMsg = "Only alphabets allowed";
      }
    }
    
    if (field === "start_date" && typeof filteredValue === "string" && filteredValue) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (filteredValue > currentMonth) {
        errorMsg = "Cannot be a future date";
      }
    }
    if (field === "end_date" && typeof filteredValue === "string" && filteredValue) {
      const startDt = data.work_experience[index].start_date;
      if (startDt && filteredValue < startDt) {
        errorMsg = "Cannot be before start date";
      }
    }

    setErrors((prev) => ({ ...prev, [`exp_${field}_${index}`]: errorMsg }));
  };

  const addEducation = () =>
    update("education_details", [
      ...data.education_details,
      { degree: "", institution: "", field_of_study: "", start_year: "", end_year: "", grade: "" },
    ]);

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    // Filter the value based on field type
    let filteredValue = value;
    const alphaFields = ["degree", "institution", "field_of_study"];
    const numFields = ["start_year", "end_year"];

    if (alphaFields.includes(field)) {
      filteredValue = filterAlphabets(value);
    } else if (numFields.includes(field)) {
      filteredValue = filterNumbers(value);
      // Limit start_year and end_year to 4 digits max
      if (filteredValue.length > 4) {
        filteredValue = filteredValue.slice(0, 4);
      }
    } else if (field === "grade") {
      filteredValue = value.replace(/[^0-9.%]/g, "");
      if (filteredValue.length > 6) {
        filteredValue = filteredValue.slice(0, 6);
      }
    }

    setData((prev) => {
      const edu = [...prev.education_details];
      edu[index] = { ...edu[index], [field]: filteredValue };
      return { ...prev, education_details: edu };
    });

    // Validate and set error
    let errorMsg = "";
    if (alphaFields.includes(field) && filteredValue && !onlyAlphabets(filteredValue)) {
      errorMsg = "Only alphabets allowed";
    } else if (numFields.includes(field) && filteredValue && !onlyNumbers(filteredValue)) {
      errorMsg = "Only numbers allowed";
    } else if (numFields.includes(field) && filteredValue.length > 4) {
      errorMsg = "Max 4 digits";
    }
    
    if (field === "start_year" && filteredValue.length === 4) {
      if (Number(filteredValue) > new Date().getFullYear()) {
        errorMsg = "Cannot be a future year";
      }
    }
    if (field === "end_year" && filteredValue.length === 4) {
      const startYr = data.education_details[index].start_year;
      if (startYr && Number(filteredValue) < Number(startYr)) {
        errorMsg = "Cannot be before start year";
      }
    }
    if (field === "grade" && filteredValue) {
      if (filteredValue.includes('%')) {
        if (parseFloat(filteredValue) > 100) errorMsg = "Max 100%";
      } else if (filteredValue.includes('.')) {
        if (parseFloat(filteredValue) > 10) errorMsg = "Max 10 points";
      }
    }

    setErrors((prev) => ({ ...prev, [`edu_${field}_${index}`]: errorMsg }));
  };

  const addProject = () =>
    update("project_details", [...data.project_details, { name: "", description: "", technologies: "" }]);

  const updateProject = (index: number, field: keyof Project, value: string) => {
    // Filter the value - only alphabets for specific project fields
    const alphaFields = ["name"];
    let filteredValue = value;
    if (alphaFields.includes(field)) {
      filteredValue = filterAlphabets(value);
    }

    setData((prev) => {
      const proj = [...prev.project_details];
      proj[index] = { ...proj[index], [field]: filteredValue };
      return { ...prev, project_details: proj };
    });

    // Validate and set error
    let errorMsg = "";
    if (alphaFields.includes(field) && filteredValue && !onlyAlphabets(filteredValue)) {
      errorMsg = "Only alphabets allowed";
    }
    setErrors((prev) => ({ ...prev, [`proj_${field}_${index}`]: errorMsg }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    // Validate all fields before saving
    const newErrors: Record<string, string> = {};

    const topLevelFields = ["first_name", "last_name", "job_title", "email", "phone_number", "nationality", "city", "pin_code", "professional_summary", "linkedin_url", "github_url"];
    if (withPhoto) topLevelFields.push("profile_photo_url");

    topLevelFields.forEach(field => {
      const val = data[field as keyof ResumeFormData] as string;
      if (!val || !val.trim()) {
        newErrors[field] = "This field is required";
      } else {
        const err = validateField(field, val);
        if (err) newErrors[field] = err;
      }
    });

    const addr = data.permanent_address[0];
    if (!addr) {
      newErrors.address_street = "This field is required";
    } else {
      if (!addr.street?.trim()) newErrors.address_street = "This field is required";
      if (!addr.city?.trim()) newErrors.address_city = "This field is required";
      else { const e = validateField("address_city", addr.city); if (e) newErrors.address_city = e; }
      
      if (!addr.state?.trim()) newErrors.address_state = "This field is required";
      else { const e = validateField("address_state", addr.state); if (e) newErrors.address_state = e; }
      
      if (!addr.country?.trim()) newErrors.address_country = "This field is required";
      else { const e = validateField("address_country", addr.country); if (e) newErrors.address_country = e; }
      
      if (!addr.postal_code?.trim()) newErrors.postal_code = "This field is required";
      else { const e = validateField("postal_code", addr.postal_code); if (e) newErrors.postal_code = e; }
    }

    if (data.skills.length === 0) newErrors.skills_main = "At least one skill is required";
    data.skills.forEach((s, i) => { if (typeof s !== "string" || !s.trim()) newErrors[`skills_${i}`] = "Required"; });

    if (data.languages.length === 0) newErrors.languages_main = "At least one language is required";
    data.languages.forEach((s, i) => { if (typeof s !== "string" || !s.trim()) newErrors[`languages_${i}`] = "Required"; });

    if (data.hobbies.length === 0) newErrors.hobbies_main = "At least one hobby is required";
    data.hobbies.forEach((s, i) => { if (typeof s !== "string" || !s.trim()) newErrors[`hobbies_${i}`] = "Required"; });

    if (data.certifications.length === 0) newErrors.certifications_main = "At least one certification is required";
    data.certifications.forEach((s, i) => { if (typeof s !== "string" || !s.trim()) newErrors[`certifications_${i}`] = "Required"; });

    if (data.awards.length === 0) newErrors.awards_main = "At least one award is required";
    data.awards.forEach((s, i) => { if (typeof s !== "string" || !s.trim()) newErrors[`awards_${i}`] = "Required"; });

    if (data.education_details.length === 0) newErrors.education_details_main = "At least one education detail is required";
    data.education_details.forEach((edu, index) => {
      if (!edu.degree?.trim()) newErrors[`edu_degree_${index}`] = "Required";
      if (!edu.institution?.trim()) newErrors[`edu_institution_${index}`] = "Required";
      if (!edu.field_of_study?.trim()) newErrors[`edu_field_of_study_${index}`] = "Required";
      if (!edu.grade?.trim()) newErrors[`edu_grade_${index}`] = "Required";
      if (!edu.start_year?.trim()) newErrors[`edu_start_year_${index}`] = "Required";
      if (!edu.end_year?.trim()) newErrors[`edu_end_year_${index}`] = "Required";

      if (edu.start_year && !onlyNumbers(edu.start_year)) {
        newErrors[`edu_start_year_${index}`] = "Only numbers allowed";
      } else if (edu.start_year && Number(edu.start_year) > new Date().getFullYear()) {
        newErrors[`edu_start_year_${index}`] = "Cannot be a future year";
      }
      
      if (edu.end_year && !onlyNumbers(edu.end_year)) {
        newErrors[`edu_end_year_${index}`] = "Only numbers allowed";
      } else if (edu.end_year && edu.start_year && Number(edu.end_year) < Number(edu.start_year)) {
        newErrors[`edu_end_year_${index}`] = "Cannot be before start year";
      }
      
      if (edu.grade) {
        if (edu.grade.includes('%')) {
          if (parseFloat(edu.grade) > 100) newErrors[`edu_grade_${index}`] = "Max 100%";
        } else if (edu.grade.includes('.')) {
          if (parseFloat(edu.grade) > 10) newErrors[`edu_grade_${index}`] = "Max 10 points";
        }
      }
    });

    if (data.project_details.length === 0) newErrors.project_details_main = "At least one project is required";
    data.project_details.forEach((proj, i) => {
      if (!proj.name?.trim()) newErrors[`proj_name_${i}`] = "Required";
      if (!proj.description?.trim()) newErrors[`proj_description_${i}`] = "Required";
      const techStr = typeof proj.technologies === "string" ? proj.technologies : (Array.isArray(proj.technologies) ? proj.technologies.join(", ") : String(proj.technologies || ""));
      if (!techStr.trim()) newErrors[`proj_technologies_${i}`] = "Required";
    });

    // Validate work experience dates
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    // Removed mandatory check for work experience
    data.work_experience.forEach((exp, index) => {
      if (exp.start_date && exp.start_date > currentMonth) {
        newErrors[`exp_start_date_${index}`] = "Cannot be a future date";
      }
      if (exp.end_date && exp.start_date && exp.end_date < exp.start_date) {
        newErrors[`exp_end_date_${index}`] = "Cannot be before start date";
      }
      
      if (exp.company_name || exp.designation || exp.employment_type || exp.location) {
         if (!exp.company_name?.trim()) newErrors[`exp_company_name_${index}`] = "Required";
         if (!exp.designation?.trim()) newErrors[`exp_designation_${index}`] = "Required";
         if (!exp.employment_type?.trim()) newErrors[`exp_employment_type_${index}`] = "Required";
         if (!exp.location?.trim()) newErrors[`exp_location_${index}`] = "Required";
         if (!exp.start_date) newErrors[`exp_start_date_${index}`] = "Required";
      }
    });

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    setErrors(newErrors);

    if (hasErrors) {
      setSaving(false);
      setMessage("Error: Please fill all the required fields.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const payload: ApiResumePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        nationality: data.nationality,
        city: data.city,
        pin_code: data.pin_code,
        job_title: data.job_title,
        professional_summary: {
          additionalProp1: {
            text: data.professional_summary,
          },
        },
        permanent_address: data.permanent_address,
        education_details: data.education_details.map((e) => ({
          degree: e.degree,
          institution: e.institution,
          field_of_study: e.field_of_study,
          start_year: Number(e.start_year) || 0,
          end_year: Number(e.end_year) || 0,
          grade: e.grade,
        })),
        work_experience: data.work_experience.map((exp) => ({
          ...exp,
          responsibilities: exp.responsibilities.filter((r) => r.trim() !== ""),
          achievements: exp.achievements.filter((a) => a.trim() !== ""),
          start_date: exp.start_date ? `${exp.start_date}-01T00:00:00` : null,
          end_date: exp.end_date ? `${exp.end_date}-01T00:00:00` : (exp.is_current ? null : null),
        })),
        project_details: data.project_details.map((p) => ({
          additionalProp1: {
            name: p.name,
            description: p.description,
            technologies: p.technologies,
            ...(p.link ? { link: p.link } : {}),
          },
        })),
        skills: data.skills,
        certifications: data.certifications.map((c) => ({
          additionalProp1: { value: c },
        })),
        hobbies: data.hobbies,
        awards: data.awards.map((a) => ({
          additionalProp1: { value: a },
        })),
        languages: data.languages.map((l) => ({
          additionalProp1: { value: l },
        })),
        profile_photo_url: data.profile_photo_url,
        linkedin_url: data.linkedin_url,
        github_url: data.github_url,
        extra_data: {
          ...(data.extra_data || {}),
          selectedTemplate,
          withPhoto,
          profile_photo_data: data.profile_photo_url,
        },
      };

      const url = resumeId
        ? `${import.meta.env.VITE_API_URL}/resumes/my-resume`
        : `${import.meta.env.VITE_API_URL}/resumes/`;

      const baseInit: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, { ...baseInit, method: resumeId ? "PUT" : "POST" });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.detail?.[0]?.msg || errorData.detail || errorData.message || `Save failed (${response.status})`;
        throw new Error(errorMsg);
      }

      const responseData = await response.json().catch(() => ({}));
      const newResumeId = responseData.id || resumeId;
      if (newResumeId) {
        setResumeId(newResumeId);
      }

      setMessage("Resume saved successfully!");
      setStep("dashboard");
      fetchResumes();
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };



  const handleDeleteResume = async () => {
    let targetId = resumeId;
    if (!targetId) {
      const idInput = prompt("Enter Resume ID to delete:");
      if (!idInput) return;
      targetId = Number(idInput);
      if (isNaN(targetId)) {
        alert("Please enter a valid numeric Resume ID.");
        return;
      }
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete Resume ID ${targetId}? This action cannot be undone.`);
    if (!confirmDelete) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const url = `${import.meta.env.VITE_API_URL}/resumes/${targetId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.detail?.[0]?.msg || errorData.detail || errorData.message || `Delete failed (${response.status})`;
        throw new Error(errorMsg);
      }

      setResumeId(null);
      setData(emptyResume);
      setMessage("Resume deleted successfully!");

      const cached = localStorage.getItem("cached_resumes");
      if (cached) {
        try {
          const list = JSON.parse(cached);
          const filtered = list.filter((r: any) => r.id !== targetId);
          localStorage.setItem("cached_resumes", JSON.stringify(filtered));
          setResumesList(filtered);
        } catch {}
      }

      alert("Resume deleted successfully!");
      setStep("dashboard");
      fetchResumes();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        update("profile_photo_url", reader.result as string);
        setPreviewOpen(true);
        setStep("preview");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        update("profile_photo_url", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    update("profile_photo_url", "");
    setImageFileName("");
  };

  const handlePreviewPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!resumeId) {
      alert("Please save the resume first to upload a photo.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      const formData = new FormData();
      formData.append("file", file);

      const url = `${import.meta.env.VITE_API_URL}/resumes/${resumeId}/upload-photo`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail?.[0]?.msg || errData.detail || "Failed to upload photo");
      }

      alert("Photo uploaded successfully!");

      try {
        const photoUrl = `${import.meta.env.VITE_API_URL}/resumes/${resumeId}/photo`;
        const photoResponse = await fetch(photoUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (photoResponse.ok) {
          const contentType = photoResponse.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await photoResponse.json();
            const photoVal = data.profile_photo_url || data.photo_url || data.photo || data.data;
            if (photoVal && typeof photoVal === "string") {
              update("profile_photo_url", photoVal);
            }
          } else {
            const blob = await photoResponse.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              update("profile_photo_url", reader.result as string);
            };
            reader.readAsDataURL(blob);
          }
        }
      } catch (photoErr) {
        console.error("Failed to fetch photo endpoint:", photoErr);
      }

      await fetchAndMapSingleResume(resumeId, token);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const generatePDFClientSide = async (targetId: number) => {
    let openedTemporarily = false;
    if (!previewOpen || !previewRef.current) {
      setPreviewOpen(true);
      openedTemporarily = true;
      // Wait for React to update the state and render the DOM element
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    try {
      const element = previewRef.current;
      if (!element) {
        throw new Error("Preview element not found in DOM");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 2) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      return pdf.output("blob");
    } catch (err: any) {
      console.error("Client side PDF generation failed:", err);
      throw err;
    } finally {
      if (openedTemporarily) {
        setPreviewOpen(false);
      }
    }
  };

  const handleDownloadClick = async () => {
    let targetId = resumeId;
    if (!targetId) {
      const idInput = prompt("Enter Resume ID to download PDF:");
      if (!idInput) return;
      targetId = Number(idInput);
      if (isNaN(targetId)) {
        alert("Please enter a valid numeric Resume ID.");
        return;
      }
    }

    setSaving(true);
    
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) throw new Error("Please login first");

      // Step 1: Generate PDF locally
      setMessage("Generating PDF...");
      const pdfBlob = await generatePDFClientSide(targetId);

      // Step 2: Trigger immediate download for snappy UX
      if (pdfBlob) {
        setMessage("Downloading...");
        const filename = `${data.first_name || "resume"}_${data.last_name || ""}_${targetId}.pdf`;
        const localUrl = window.URL.createObjectURL(pdfBlob as Blob);
        const link = document.createElement("a");
        link.href = localUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(localUrl);
        setMessage("");
        toast({
          title: "Success",
          description: "PDF downloaded successfully!",
          duration: 1000,
        });

        // Step 3: Background upload to server (fire and forget)
        const formData = new FormData();
        formData.append("file", pdfBlob, filename);
        const uploadUrl = `${import.meta.env.VITE_API_URL}/resumes/${targetId}/upload-generated-pdf`;
        fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(async (res) => {
          if (!res.ok) {
            console.warn(`Server upload endpoint failed with status ${res.status}.`);
          }
        }).catch(e => {
          console.warn("Background PDF upload failed:", e);
        });
      }

    } catch (err: any) {
      console.error("PDF download failed:", err);
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-[#f7fafd] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-hidden">
        <Profileheader />
        <main className="flex-1 overflow-y-auto pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="font-inter font-bold text-xl sm:text-[23.7px] leading-tight sm:leading-[31.6px] tracking-normal text-[#101828]">Resume Builder</h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1">Create a professional resume with AI assistance</p>
              </div>
              {step === "dashboard" && (
                <div className="flex gap-4">
                  <button
                    onClick={startNewResume}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2B58FF] to-[#8B3BFF] text-white font-bold rounded-lg hover:opacity-95 shadow-md transition cursor-pointer"
                  >
                    <Plus size={18} />
                    Create Resume
                  </button>
                </div>
              )}
              {step === "form" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setPreviewOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition font-medium"
                  >
                    <Eye size={18} />
                    Preview
                  </button>
                  <button
                    onClick={() => setStep("dashboard")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                </div>
              )}
              {step === "preview" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => { setStep("selection"); setMessage(""); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-sm cursor-pointer"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to Selection</span>
                  </button>
                  <button
                    onClick={handleDownloadClick}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Download size={18} />
                    <span>{saving ? "Downloading..." : "Download PDF"}</span>
                  </button>
                </div>
              )}
            </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-green-50 text-green-800 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {step === "init" && (
          <section className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-sm border text-center my-6 sm:my-12">
            <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Plus className="text-[#2B58FF]" size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Resume Builder</h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-md mx-auto font-inter">
              Create a professional, industry-ready resume with AI assistance. Choose from modern templates, customize your details, and download a PDF.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setStep("selection")}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#2B58FF] to-[#8B3BFF] text-white font-bold text-[15px] sm:text-[16px] rounded-full shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={18} />
                Create Resume
              </button>
              <button
                onClick={() => setStep("dashboard")}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-gray-700 border border-gray-300 font-bold text-[15px] sm:text-[16px] rounded-full shadow-sm hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit size={18} />
                Edit Existing Resume
              </button>
            </div>
          </section>
        )}

        {step === "selection" && (
          <ResumeSelection
            resumesList={resumesList}
            setStep={setStep}
            withPhoto={withPhoto}
            setWithPhoto={setWithPhoto}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            setData={setData}
            emptyResume={emptyResume}
            setResumeId={setResumeId}
            setImageFileName={setImageFileName}
          />
        )}

        {step === "dashboard" && (
          <ResumeDashboard
            resumesList={resumesList}
            loadingResumes={loadingResumes}
            setStep={setStep}
            handlePreviewResumeFromList={handlePreviewResumeFromList}
            handleEditResumeFromList={handleEditResumeFromList}
            handleDeleteResumeFromList={handleDeleteResumeFromList}
          />
        )}

        {step === "form" && (
          <ResumeForm
            data={data}
            update={update}
            updateAddress={updateAddress}
            updateArray={updateArray}
            updateExperience={updateExperience}
            updateEducation={updateEducation}
            updateProject={updateProject}
            addSkill={addSkill}
            addLanguage={addLanguage}
            addHobby={addHobby}
            addCertification={addCertification}
            addAward={addAward}
            addExperience={addExperience}
            addEducation={addEducation}
            addProject={addProject}
            removeFromArray={removeFromArray}
            errors={errors}
            withPhoto={withPhoto}
            handleFormFileChange={handleFormFileChange}
            imageFileName={imageFileName}
            handleRemovePhoto={handleRemovePhoto}
            saving={saving}
            handleSave={handleSave}
          />
        )}



        {previewOpen && (
          <ResumePreview
            previewOpen={previewOpen}
            setPreviewOpen={setPreviewOpen}
            previewRef={previewRef}
            selectedTemplate={selectedTemplate}
            withPhoto={withPhoto}
            data={data}
            handlePreviewPhotoUpload={handlePreviewPhotoUpload}
            message={message}
            saving={saving}
            handleDownloadClick={handleDownloadClick}
            step={step}
          />
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
