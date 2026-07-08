import React from "react";
import { Image, ImageOff } from "lucide-react";

interface PhotoSelectorProps {
  withPhoto: boolean | null;
  setWithPhoto: (val: boolean | null) => void;
  setSelectedTemplate: (val: string) => void;
}

export default function PhotoSelector({
  withPhoto,
  setWithPhoto,
  setSelectedTemplate,
}: PhotoSelectorProps) {
  return (
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
  );
}
