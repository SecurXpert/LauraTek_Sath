import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin } from "lucide-react";

interface ProfileHeroBannerProps {
  displayImage: string | null;
  initials: string;
  fullName: string;
  aboutMe: string | null;
  address: string | null;
  completionPercentage: number;
  isEditMode: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeroBanner: React.FC<ProfileHeroBannerProps> = ({
  displayImage,
  initials,
  fullName,
  aboutMe,
  address,
  completionPercentage,
  isEditMode,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        {/* Avatar */}
        <div className="relative self-center sm:self-auto">
          <div
            className="cursor-pointer"
            onClick={() => isEditMode && fileInputRef.current?.click()}
          >
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 ring-4 ring-white/30">
              {displayImage ? (
                <AvatarImage src={displayImage} alt="Profile" />
              ) : (
                <AvatarFallback className="text-3xl font-bold bg-white/20 text-white">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div
            className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={16} />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{fullName}</h2>
          <p className="text-white/90 mt-1 text-sm sm:text-base">
            {aboutMe || "Passionate software developer and lifelong learner"}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-3">
            <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
              <MapPin size={14} />
              {address || "San Francisco, CA"}
            </span>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white/20 rounded-xl p-3 sm:p-4 text-center min-w-[100px] sm:min-w-[120px] w-full sm:w-auto mt-4 sm:mt-0">
          <div className="text-2xl sm:text-3xl font-bold">{completionPercentage}%</div>
          <div className="text-xs text-white/80">Profile Complete</div>
          <div className="mt-2 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroBanner;
