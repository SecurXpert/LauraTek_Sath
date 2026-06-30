import React, { useState } from 'react';
import { Award, Shield, TrendingUp, Star, CheckCircle, ArrowRight, Sparkles, Linkedin, Globe, Infinity as InfinityIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import guest5 from '@/assets/guest5.png';
import Contactus from '@/components/ui/contactus';

const GuestCertificates = () => {
  const navigate = useNavigate();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const certificates = [
    {
      title: "Full Stack Web Development",
      level: "Lauratek · Professional",
      color: "bg-[#7B5AFF]",
      textColor: "text-[#7B5AFF]",
      borderColor: "border-t-[#7B5AFF]"
    },
    {
      title: "React.js & Modern Frontend",
      level: "Lauratek · Intermediate",
      color: "bg-[#5B4FFF]",
      textColor: "text-[#5B4FFF]",
      borderColor: "border-t-[#5B4FFF]"
    },
    {
      title: "Node.js Backend Mastery",
      level: "Lauratek · Professional",
      color: "bg-[#3D73FF]",
      textColor: "text-[#3D73FF]",
      borderColor: "border-t-[#3D73FF]"
    },
    {
      title: "Python & Data Science",
      level: "Lauratek · Advanced",
      color: "bg-[#A855F7]",
      textColor: "text-[#A855F7]",
      borderColor: "border-t-[#A855F7]"
    },
    {
      title: "UI/UX Design Fundamentals",
      level: "Lauratek · Foundation",
      color: "bg-[#F43F5E]",
      textColor: "text-[#F43F5E]",
      borderColor: "border-t-[#F43F5E]"
    },
    {
      title: "DevOps & Cloud Engineering",
      level: "Lauratek · Professional",
      color: "bg-[#10B981]",
      textColor: "text-[#10B981]",
      borderColor: "border-t-[#10B981]"
    }
  ];

  const companies = [
    "Google", "Amazon", "Microsoft", "Infosys", "TCS", 
    "Wipro", "Cognizant", "Accenture", "Capgemini", "Deloitte",
    "Meta", "Netflix", "Adobe", "IBM", "Oracle",
    "KPMG", "EY", "PwC", "HCLTech", "Tech Mahindra",
    "Apple", "Cisco", "Intel", "Salesforce", "Samsung"
  ];

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-slate-800 mb-1">Certificates</h1>
        <p className="text-[14px] sm:text-[15px] text-gray-500">Earn industry-recognized credentials to power your career</p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#F4F6FF] via-[#F2F4FF] to-[#EAEFFF] rounded-[24px] p-6 sm:p-8 lg:p-12 mb-12 border border-[#E5E9FF] shadow-[0px_4px_24px_rgba(91,79,255,0.06)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        <div className="flex-1 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EFECFF] px-3.5 py-1.5 rounded-full text-[#7B5AFF] text-[11px] font-bold mb-6 border border-[#E0D9FF]">
            <Sparkles className="w-3 h-3" /> Industry-Recognized Certificates
          </div>
          
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] xl:text-[46px] font-extrabold text-[#111827] leading-[1.15] mb-5 tracking-tight">
            Turn Your Learning Into <span className="text-[#5B4FFF]">Industry-<br className="hidden lg:block" />Recognized</span> Credentials
          </h2>
          
          <p className="text-[14px] sm:text-[15px] text-gray-500 mb-8 leading-relaxed max-w-xl">
            Complete premium courses and unlock professional certificates that strengthen your resume, LinkedIn profile, and career opportunities.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 max-w-[600px]">
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <Shield className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Industry Recognized</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <Linkedin className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Share on LinkedIn</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <Globe className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Employer Friendly</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
              <InfinityIcon className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Lifetime Digital Certificate</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setIsEnrollModalOpen(true)}
              className="bg-gradient-to-r from-[#6D5DFB] to-[#5B4FFF] hover:from-[#5a4ae6] hover:to-[#4a3ecc] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[14px] transition-colors shadow-[0px_4px_16px_rgba(91,79,255,0.3)] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Certificate Programs <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsEnrollModalOpen(true)}
              className="bg-white border-[1.5px] border-black hover:bg-gray-50 text-[#7B5AFF] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[14px] transition-colors shadow-sm flex justify-center w-full sm:w-auto"
            >
              Preview Certificates
            </button>
          </div>
        </div>
        
        <div className="relative z-10 w-full lg:w-[45%] xl:w-[50%] flex justify-center lg:justify-end mt-6 lg:mt-0">
           <img src={guest5} alt="Premium Certificate" className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[110%] max-w-[600px] h-auto object-contain transform lg:translate-x-4 xl:translate-x-8 drop-shadow-xl" />
        </div>
      </div>

      {/* Certificate Gallery */}
      <div id="certificate-gallery" className="mb-16 scroll-mt-6">
        <h3 className="text-[18px] font-bold text-slate-800 mb-6">Certificate Gallery — Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <div key={idx} className="bg-white rounded-[20px] shadow-[0px_4px_20px_rgba(149,157,165,0.06)] border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-[0px_8px_24px_rgba(149,157,165,0.12)]">
              <div className="p-8 flex flex-col items-center text-center flex-1">
                <div className={`w-14 h-14 rounded-full ${cert.color} flex items-center justify-center mb-6 shadow-sm`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${cert.textColor}`}>
                  Certificate of Completion
                </p>
                <h4 className="text-[16px] font-bold text-slate-800 mb-1">{cert.title}</h4>
                <p className="text-[12px] text-gray-400 mb-6">{cert.level}</p>
                
                <div className="w-full max-w-[200px] mt-auto">
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-[13px] text-gray-400 font-medium">Arjun Sharma</p>
                  </div>
                </div>
              </div>
              
              <div className={`border-t-[3px] ${cert.borderColor} px-4 sm:px-6 py-4 bg-white flex items-center justify-between`}>
                <span className="text-[11px] sm:text-[12px] text-gray-500 font-medium">Course completion required</span>
                <button 
                  onClick={() => setIsEnrollModalOpen(true)}
                  className={`text-[11px] sm:text-[12px] font-bold ${cert.textColor} hover:opacity-80 transition-opacity flex items-center gap-1`}
                >
                  Unlock <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Certificates Matter */}
      <div className="mb-12">
        <h3 className="text-[18px] font-bold text-slate-800 mb-6">Why Lauratek Certificates Matter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F2FF] flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#7B5AFF]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Industry Verified</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Recognized by 500+ top companies including Google, Amazon, and Infosys</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EBF1FF] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-[#3D73FF]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Career Accelerator</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">94% of our certified learners receive job offers within 90 days</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FFF0F5] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Lifelong Credential</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Certificates never expire and can be shared on LinkedIn and resume</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E6F9F0] flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Skill Validated</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Every certificate represents real project work and assessments completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Logo Strip */}
      <div className="bg-white py-6 sm:py-8 rounded-[24px] border border-gray-100 shadow-[0px_4px_20px_rgba(149,157,165,0.04)] overflow-hidden">
        <div className="px-6 sm:px-8 mb-6">
          <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-800 mb-1">Certificates Recognized By</h3>
          {/* <p className="text-[13px] text-gray-500">500+ companies hire from Lauratek's certified pool</p> */}
        </div>
        
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 8px)); }
            }
            .animate-marquee {
              animation: marquee 40s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        
        <div className="w-full relative flex items-center overflow-hidden group min-w-0">
          <div className="flex gap-4 w-max animate-marquee px-4">
            {[...companies, ...companies].map((company, idx) => (
              <div key={idx} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-600 shadow-sm hover:border-[#5B4FFF] hover:text-[#5B4FFF] transition-colors whitespace-nowrap cursor-default">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enroll / Contact Us Modal */}
      <Contactus open={isEnrollModalOpen} setOpen={setIsEnrollModalOpen} />
    </div>
  );
};

export default GuestCertificates;
