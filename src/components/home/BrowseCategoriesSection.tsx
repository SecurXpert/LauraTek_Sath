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


const BrowseCategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Browse Categories Section */}
        <section className="relative w-full py-10 overflow-hidden bg-gradient-to-r from-[#FDFDFD] via-[#F6F5FB] to-[#FAE8F1]">
          {/* Left Decorative Arrows */}
          <div className="absolute left-[-2%] top-[10%] flex opacity-[0.08] text-[#8B5CF6]">
            <svg width="100" height="150" viewBox="0 0 24 24" fill="currentColor" className="-mr-12">
              <path d="M7 2L17 12L7 22L10 22L20 12L10 2L7 2Z" />
            </svg>
            <svg width="100" height="150" viewBox="0 0 24 24" fill="currentColor" className="-mr-12">
              <path d="M7 2L17 12L7 22L10 22L20 12L10 2L7 2Z" />
            </svg>
            <svg width="100" height="150" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2L17 12L7 22L10 22L20 12L10 2L7 2Z" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Text */}
            <div className="md:w-1/3 flex justify-center md:justify-start pl-0 md:pl-20">
              <h2 className="text-center md:text-left" style={{ fontFamily: '"League Spartan", sans-serif', fontWeight: 800, fontSize: '35px', lineHeight: '33.6px', letterSpacing: '0px', verticalAlign: 'middle', color: '#2A359B' }}>
                Explore In-Demand <br />
                Learning Categories
              </h2>
            </div>

            {/* Right Icons */}
            <div 
              className="md:w-2/3 overflow-hidden relative"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
              <div className="inline-flex items-center animate-marquee hover:[animation-play-state:paused] w-max">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-10 md:gap-14 lg:gap-16 min-w-max px-5 md:px-7 lg:px-8">
                    {/* Slack */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45" fill="none">
                        <path fill="#E01E5A" d="M5.04 14.63a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52z"/>
                        <path fill="#E01E5A" d="M6.3 14.63a2.52 2.52 0 1 1 5.04 0v6.3a2.52 2.52 0 1 1-5.04 0v-6.3z"/>
                        <path fill="#36C5F0" d="M9.37 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H9.37z"/>
                        <path fill="#36C5F0" d="M9.37 6.3a2.52 2.52 0 1 1 0 5.04h-6.3a2.52 2.52 0 1 1 0-5.04h6.3z"/>
                        <path fill="#2EB67D" d="M18.96 9.37a2.52 2.52 0 1 1 2.52 2.52h-2.52V9.37z"/>
                        <path fill="#2EB67D" d="M17.7 9.37a2.52 2.52 0 1 1-5.04 0v-6.3a2.52 2.52 0 1 1 5.04 0v6.3z"/>
                        <path fill="#ECB22E" d="M14.63 18.96a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52z"/>
                        <path fill="#ECB22E" d="M14.63 17.7a2.52 2.52 0 1 1 0-5.04h6.3a2.52 2.52 0 1 1 0 5.04h-6.3z"/>
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">Slack</span>
                    </div>

                    {/* Figma */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45" fill="none">
                        <path fill="#F24E1E" d="M12 12V6a3 3 0 1 0-6 0v6h6z"/>
                        <path fill="#FF7262" d="M12 6a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
                        <path fill="#1ABCFE" d="M12 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
                        <path fill="#0ACF83" d="M12 18v3a3 3 0 1 1-6-0v-3h6z"/>
                        <path fill="#A259FF" d="M6 12a3 3 0 1 0 6 0H6z"/>
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">Figma</span>
                    </div>

                    {/* Github */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45" fill="currentColor" className="text-[#181717]">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">Github</span>
                    </div>

                    {/* Excel */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45">
                        <path fill="#21A366" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <path fill="#107C41" d="M14 2v6h6"/>
                        <path fill="#fff" d="M10.8 15.6l-1.4-2.5-1.4 2.5H6.2l2.3-3.7-2.1-3.6h1.8l1.3 2.4 1.3-2.4h1.8l-2.2 3.6 2.3 3.7h-1.9z"/>
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">Excel</span>
                    </div>

                    {/* PowerBI */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#181717]">
                        <rect x="3" y="14" width="3" height="6" fill="currentColor" stroke="none" />
                        <rect x="8" y="10" width="3" height="10" fill="currentColor" stroke="none" />
                        <rect x="13" y="6" width="3" height="14" fill="currentColor" stroke="none" />
                        <polyline points="1 18 1 4 19 8 19 20" stroke="currentColor" fill="none" strokeWidth="1.5" />
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">PowerBI</span>
                    </div>

                    {/* Salesforce */}
                    <div className="flex flex-col items-center gap-3">
                      <svg viewBox="0 0 24 24" width="45" height="45" fill="#00A1E0">
                        <path d="M16.5 7.5c-1.3 0-2.4.8-2.9 2-.4-.2-.8-.3-1.2-.3-1.5 0-2.8 1-3.2 2.3-.3-.1-.7-.2-1.1-.2-1.8 0-3.2 1.4-3.2 3.2 0 1.8 1.4 3.2 3.2 3.2h8.5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5c-.1 0-.1 0-.1 0 0-.7-.4-1.2-1-1.2z"/>
                        <text x="12" y="15" fill="#fff" fontSize="3" fontWeight="bold" textAnchor="middle">salesforce</text>
                      </svg>
                      <span className="text-[#5E647D] font-medium text-[15px]">Salesforce</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* === ALUMNI RECOGNITION - HEIGHT REDUCED BY 2.5px (py-11) + CONTINUOUS LOGOS === 
        <section className="py-11 bg-[#11224E] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Learn from the Alumni of
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee items-center">
                {Array(4)
                  .fill(null)
                  .flatMap(() =>
                    logos.map((src, i) => (
                      <div key={`${i}-${Math.random()}`} className="flex items-center">
                        <span className="text-yellow-400 text-8xl mx-2">*</span>
                        <button
                          onClick={handleAlumniClick}
                          className="flex-shrink-0 mx-6 transition-transform hover:scale-110 focus:outline-none"
                          aria-label={`View alumni at ${
                            src.split("/").pop()?.split(".")[0] || "company"
                          }`}
                        >
                          <div className="w-24 h-24 rounded-full bg-white p-3 shadow">
                            <img
                              src={src}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </button>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
              display: flex;
            }
            .animate-marquee-reverse {
              animation: marquee-reverse 25s linear infinite;
            }
          `}</style>
        </section>
        */}

        
    </>
  );
};

export default BrowseCategoriesSection;
