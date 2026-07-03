import React from "react";
import { Link, useNavigate } from "react-router-dom";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import online from "@/assets/online1.png";
import landing from "@/assets/landing.png";
import landing2 from "@/assets/landing2.png";
import python from "@/assets/python2.jpg";
import react from "@/assets/react2.jpg";
import cloud from "@/assets/cloud2.jpg";
import mock1 from "@/assets/mock1.png";
import live from "@/assets/live class.png";
import discussion from "@/assets/discussion room.png";
import resume from "@/assets/resume.png";
import guest14Img from "@/assets/guest14.png";
import guest12Img from "@/assets/guest12.png";
import techLogo from "@/assets/techlogo.png";
import { ChevronDown, ChevronUp } from 'lucide-react';
import line1 from "@/assets/line1.png";


const UniqueSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* WHAT MAKES LAURATEK UNIQUE? – 100% EXACT LIKE YOUR IMAGE */}
          {/* WHAT MAKES LAURATEK UNIQUE? – SINGLE CARD CAROUSEL */}
{false && (
<>
<section className="py-12 md:py-16 lg:py-20 bg-white">
  <div className="container mx-auto px-6 lg:px-8 max-w-[1650px]">
    {/* Heading */}
    <div className="text-center mb-16">
      {/* <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
        What Makes LauraTek Unique?
      </h2> */}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
  What Makes LauraTek Unique?
</h2>

      <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
        At LauraTek, every course is designed with one goal — to get you job-ready. We combine practical learning, real support, and career-focused guidance to help you grow with purpose and confidence.
      </p>
    </div>
 
    {/* Carousel Container */}
    <div className="relative">
  <div
    id="unique-slider"
    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
    style={{ scrollSnapType: "x mandatory" }}
  >

    {/* CARD WRAPPER */}
    {[
      {
        img: discussion,
        title: "Mock Interview",
        text:
          "Boost your confidence with real-time mock interviews designed to prepare you for HR and technical rounds. Practice with expert mentors, improve your communication, and get fully job-ready.",
      },
      {
        img: live,
        title: "Discussion Room",
        text:
          "Join interactive discussion sessions where learners and mentors connect, share ideas, and solve real-world tech challenges together. Build clarity, confidence, and strong problem-solving skills.",
      },
      {
        img: mock1,
        title: "Virtual Live Classes & Recording Session",
        text:
          "Learn directly from expert trainers through interactive live sessions. Get real-time explanations, doubt clearing and guided practice to build strong, industry-ready skills.",
      },
      {
        img: resume,
        title: "50+ Resume Templates",
        text:
          "Access professional, ATS-friendly resume templates designed to highlight your skills, projects, and achievements. Create a strong first impression and boost your chances of getting hired.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-full flex justify-center snap-center px-4"
      >
        {/* MAIN CARD */}
        <div
          className="
            w-full max-w-[780px]
            flex flex-col lg:flex-row
            items-center lg:items-start
            gap-6 lg:gap-10
          "
        >
          {/* IMAGE */}
          <img
            src={item.img}
            alt={item.title}
            className="
              w-full sm:w-[360px] lg:w-96
              h-56 sm:h-64 lg:h-80
              object-cover
              rounded-3xl
              shadow-2xl
              flex-shrink-0
            "
          />

          {/* TEXT */}
          <div className="pt-0 lg:pt-4 max-w-md text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              {item.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* DOTS */}
  <div className="flex justify-center mt-10 gap-3">
    {[0, 1, 2, 3].map((index) => (
      <button
        key={index}
        onClick={() => {
          const slider = document.getElementById("unique-slider");
          if (slider) {
            slider.scrollTo({
              left: index * slider.clientWidth,
              behavior: "smooth",
            });
          }
        }}
        className="rounded-full transition-all duration-300"
        style={{
          backgroundColor:
            Math.round(
              (document.getElementById("unique-slider")?.scrollLeft || 0) /
                (document.getElementById("unique-slider")?.clientWidth || 1)
            ) === index
              ? "#001BB7"
              : "#9CA3AF",
          width:
            Math.round(
              (document.getElementById("unique-slider")?.scrollLeft || 0) /
                (document.getElementById("unique-slider")?.clientWidth || 1)
            ) === index
              ? "36px"
              : "12px",
          height: "12px",
        }}
      />
    ))}
  </div>
</div>

 
    
  </div>
</section>


{/* Hide Scrollbar */}
    <style >{`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
    `}</style>
</>
)}

        
    </>
  );
};

export default UniqueSection;
