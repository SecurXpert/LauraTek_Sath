


import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../sidebar";

import resume1 from "@/assets/resume1.png";
import resume2 from "@/assets/resume2.png";
import resume3 from "@/assets/resume3.png";
import resume4 from "@/assets/resume4.png";
import resume5 from "@/assets/resume5.png";
import resume6 from "@/assets/resume6.png";
import resume7 from "@/assets/resume7.png";
import resume8 from "@/assets/resume8.png";
import resume9 from "@/assets/resume9.png";

const templates = [
  { id: 1, img: resume1, hasPhoto: true },
  { id: 2, img: resume2, hasPhoto: false },
  { id: 3, img: resume3, hasPhoto: true },
  { id: 4, img: resume4, hasPhoto: false },
  { id: 5, img: resume5, hasPhoto: true },
  { id: 6, img: resume6, hasPhoto: false },
  { id: 7, img: resume7, hasPhoto: true },
  { id: 8, img: resume8, hasPhoto: true },
  { id: 9, img: resume9, hasPhoto: false },
];

const Resume = () => {
  const [active, setActive] = useState("Resume");
  const [withPhoto, setWithPhoto] = useState(false);
  const [withoutPhoto, setWithoutPhoto] = useState(false);

  const filtered = templates.filter((t) => {
    if (withPhoto && !withoutPhoto) return t.hasPhoto;
    if (!withPhoto && withoutPhoto) return !t.hasPhoto;
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar fixed */}
      <div className="fixed left-0 top-0 h-full z-50">
        <Sidebar sidebarOpen={true} active={active} setActive={setActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-16">

        {/* Header fixed */}
        <div className="fixed top-0 left-16 right-0 z-40 bg-white shadow">
          <Header />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pt-20 px-6 pb-10 mt-20">
          <div className="max-w-7xl mx-auto">

            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[34px] font-semibold text-[#111827]">
                  Best templates for students
                </h1>
                <p className="text-sm text-gray-900">
                  You can always change your template later.
                </p>
              </div>
              <button className="text-sm text-gray-900 hover:underline">
                More
              </button>
            </div>

            <div className="mt-8 flex gap-10">

              {/* Filters */}
              <aside className="w-40 shrink-0">
                <h3 className="text-[24px] font-semibold text-gray-800 mb-3">Filters</h3>

                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withPhoto}
                    onChange={(e) => setWithPhoto(e.target.checked)}
                    className="h-4 w-4"
                  />
                  With photo
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={withoutPhoto}
                    onChange={(e) => setWithoutPhoto(e.target.checked)}
                    className="h-4 w-4"
                  />
                  Without photo
                </label>
              </aside>

              {/* Templates Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((t) => (
                   <div key={t.id} className="border rounded bg-white shadow-sm">
  <img src={t.img} className="w-full" />

  <p className="text-[20px] font-medium text-gray-700 bg-gray-200 px-2 py-[2px] rounded-md w-fit ml-15 mr-1 mt-1">
    recommended
  </p>
</div>

                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume;
