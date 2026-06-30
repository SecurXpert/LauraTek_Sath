import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Linkedin, Github, FileText } from "lucide-react";

interface SocialProfilesCardProps {
  isEditMode: boolean;
  linkedin: string;
  setLinkedin: (val: string) => void;
  github: string;
  setGithub: (val: string) => void;
  resumeUrl: string;
  setResumeUrl: (val: string) => void;
  resumeFile?: File | null;
  setResumeFile?: (val: File | null) => void;
}

const SocialProfilesCard: React.FC<SocialProfilesCardProps> = ({
  isEditMode,
  linkedin,
  setLinkedin,
  github,
  setGithub,
  resumeUrl,
  setResumeUrl,
  resumeFile,
  setResumeFile,
}) => {
  return (
    <div className="bg-[#FFFFFF] border-t-[1.22px] border-t-[#E2E8F0] rounded-xl p-4 sm:p-6 shadow-[0px_1.22px_2.43px_-1.22px_#0000001A,0px_1.22px_3.65px_0px_#0000001A]">
      <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
        Social Profiles
      </h3>
      <div className="space-y-3">
        <div>
          <Label className="text-xs text-gray-500">LinkedIn</Label>
          {isEditMode ? (
            <Input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value.replace(/\s/g, ""))}
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm flex items-center gap-2">
              <Linkedin
                size={14}
                className={linkedin ? "text-blue-600" : "text-gray-400"}
              />
              <span className={linkedin ? "text-blue-600" : "text-gray-400"}>
                {linkedin || "Not added"}
              </span>
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">GitHub</Label>
          {isEditMode ? (
            <Input
              value={github}
              onChange={(e) => setGithub(e.target.value.replace(/\s/g, ""))}
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm flex items-center gap-2">
              <Github
                size={14}
                className={github ? "text-blue-600" : "text-gray-400"}
              />
              <span className={github ? "text-blue-600" : "text-gray-400"}>
                {github || "Not added"}
              </span>
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Resume Link</Label>
          {isEditMode ? (
            <div className="mt-1 flex flex-col gap-2">
              {resumeUrl && !resumeFile && (
                <span className="text-xs text-gray-500 truncate">Current: {resumeUrl.split('/').pop()}</span>
              )}
              <Input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] && setResumeFile) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
                className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx"
              />
            </div>
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm flex items-center gap-2">
              <FileText
                size={14}
                className={resumeUrl ? "text-blue-600" : "text-gray-400"}
              />
              {resumeUrl ? (
                <div className="min-w-0 flex-1">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate block"
                  >
                    {resumeUrl}
                  </a>
                </div>
              ) : (
                <span className="text-gray-400">Not added</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialProfilesCard;
