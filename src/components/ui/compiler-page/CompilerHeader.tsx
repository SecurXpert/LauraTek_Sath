import React from "react";
import { Camera } from "lucide-react";

interface CompilerHeaderProps {
  examTitle: string;
  activeIdx: number;
  questionsLength: number;
  cameraError: boolean;
  setCameraError: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraRetryCount: React.Dispatch<React.SetStateAction<number>>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function CompilerHeader({
  examTitle,
  activeIdx,
  questionsLength,
  cameraError,
  setCameraError,
  setCameraRetryCount,
  videoRef,
}: CompilerHeaderProps) {
  return (
    <div className="min-h-[90px] bg-white shadow-sm border-b px-3 sm:px-4 py-3 flex items-center justify-between shrink-0">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2 sm:pr-4">
        <h1 className="text-lg sm:text-xl font-bold truncate">{examTitle}</h1>
      </div>

      {/* CENTER - Progress Bar */}
      <div className="hidden md:flex flex-1 items-center justify-center px-8">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400">OVERALL PROGRESS</p>
            <span className="text-xs text-gray-400 font-bold">
              {Math.round(((activeIdx + 1) / questionsLength) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{
                width: `${((activeIdx + 1) / questionsLength) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        {/* Webcam */}
        <div className="relative pt-2">
          <div className="w-20 h-20 sm:w-28 sm:h-20 rounded-lg overflow-hidden bg-black">
            {cameraError ? (
              <button
                onClick={() => {
                  setCameraError(false);
                  setCameraRetryCount((prev) => prev + 1);
                }}
                className="w-full h-full flex flex-col items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
                title="Click to retry camera access"
              >
                <Camera className="text-gray-500 mb-1 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[10px] text-gray-400 font-medium">Retry</span>
              </button>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}
          </div>
          <span className="absolute top-3 left-24 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
