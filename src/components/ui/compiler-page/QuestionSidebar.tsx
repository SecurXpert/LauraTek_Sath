import React from "react";

interface QuestionSidebarProps {
  questionsLength: number;
  activeIdx: number;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionSidebar({
  questionsLength,
  activeIdx,
  setActiveIdx,
}: QuestionSidebarProps) {
  return (
    <div className="bg-[#f0eef6] flex md:flex-col flex-row overflow-x-auto md:overflow-y-auto md:h-full items-center py-2 md:py-4 gap-2 md:gap-3 px-2 md:px-0 shrink-0 md:row-span-2 lg:row-span-1">
      <p className="hidden md:block text-xs font-bold text-purple-700">
        QNS
      </p>
      {Array.from({ length: questionsLength }).map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIdx(i)}
          className={`min-w-[36px] h-9 md:w-10 md:h-10 rounded-xl font-bold text-sm ${
            i === activeIdx
              ? "bg-purple-600 text-white"
              : "bg-white border text-gray-600"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
