import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";

interface PersonalInfoCardProps {
  isEditMode: boolean;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string | null;
  setAddress: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  aboutMe: string | null;
  setAboutMe: (val: string) => void;
  fullName: string;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  isEditMode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  dob,
  setDob,
  gender,
  setGender,
  aboutMe,
  setAboutMe,
  fullName,
}) => {
  return (
    <div className="bg-[#FFFFFF] border-t-[1.22px] border-t-[#E2E8F0] rounded-xl p-4 sm:p-6 shadow-[0px_1.22px_2.43px_-1.22px_#0000001A,0px_1.22px_3.65px_0px_#0000001A]">
      <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs text-gray-500">Full Name</Label>
          {isEditMode ? (
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 15))
                }
                placeholder="First"
              />
              <Input
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 15))
                }
                placeholder="Last"
              />
            </div>
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              {fullName}
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Email</Label>
          {isEditMode ? (
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value.replace(/(\.com).*$/, "$1"))}
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              <Mail size={14} className="text-gray-400" />
              {email || "john.doe@example.com"}
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Phone</Label>
          {isEditMode ? (
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              <Phone size={14} className={phone ? "text-gray-400" : "text-gray-300"} />
              <span className={phone ? "" : "text-gray-400"}>{phone || ""}</span>
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Location</Label>
          {isEditMode ? (
            <Input
              value={address || ""}
              onChange={(e) =>
                setAddress(e.target.value.replace(/[^a-zA-Z0-9_\-\s]/g, "").slice(0, 25))
              }
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              {address || "Gachibowli Hyderabad"}
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Date of Birth</Label>
          {isEditMode ? (
            <Input
              type="date"
              value={dob}
              max={`${new Date().getFullYear() - 1}-12-31`}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              <span className={dob ? "" : "text-gray-400"}>{dob || "Not added"}</span>
            </div>
          )}
        </div>
        <div>
          <Label className="text-xs text-gray-500">Gender</Label>
          {isEditMode ? (
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 flex items-center gap-2">
              <span className={gender ? "" : "text-gray-400"}>
                {gender || "Not added"}
              </span>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <Label className="text-xs text-gray-500">About Me</Label>
          {isEditMode ? (
            <textarea
              value={aboutMe || ""}
              onChange={(e) =>
                setAboutMe(e.target.value.slice(0, 100))
              }
              rows={3}
              maxLength={100}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1 resize-none"
              placeholder="Tell us about yourself"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded-lg text-sm text-gray-900 min-h-[40px]">
              <span className={aboutMe ? "" : "text-gray-400"}>
                {aboutMe || "Not added"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
