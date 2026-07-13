import React, { useState } from 'react';
import { Award, Shield, TrendingUp, Star, CheckCircle, ArrowRight, Sparkles, Linkedin, Globe, Infinity as InfinityIcon, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import guest5 from '@/assets/guest5.png';
import Contactus from '@/components/ui/contactus';

const GuestCertificates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const fromQuizzes = location.state?.fromQuizzes;

  const certificates = [
    {
      title: "Full Stack Web Development",
      level: "Lauratek · Professional",
      color: "bg-[#7B5AFF]",
      textColor: "text-[#7B5AFF]",
      borderColor: "border-t-[#7B5AFF]",
      gradient: "linear-gradient(135deg, rgba(108, 59, 255, 0.07) 0%, rgba(108, 59, 255, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #6C3BFF 0%, rgba(108, 59, 255, 0.6) 100%)"
    },
    {
      title: "React.js & Modern Frontend",
      level: "Lauratek · Intermediate",
      color: "bg-[#5B4FFF]",
      textColor: "text-[#5B4FFF]",
      borderColor: "border-t-[#5B4FFF]",
      gradient: "linear-gradient(135deg, rgba(79, 70, 229, 0.07) 0%, rgba(79, 70, 229, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #4F46E5 0%, rgba(79, 70, 229, 0.6) 100%)"
    },
    {
      title: "Node.js Backend Mastery",
      level: "Lauratek · Professional",
      color: "bg-[#3D73FF]",
      textColor: "text-[#3D73FF]",
      borderColor: "border-t-[#3D73FF]",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #3B82F6 0%, rgba(59, 130, 246, 0.6) 100%)"
    },
    {
      title: "Python & Data Science",
      level: "Lauratek · Advanced",
      color: "bg-[#A855F7]",
      textColor: "text-[#A855F7]",
      borderColor: "border-t-[#A855F7]",
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.07) 0%, rgba(168, 85, 247, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #A855F7 0%, rgba(168, 85, 247, 0.6) 100%)"
    },
    {
      title: "UI/UX Design Fundamentals",
      level: "Lauratek · Foundation",
      color: "bg-[#F43F5E]",
      textColor: "text-[#F43F5E]",
      borderColor: "border-t-[#F43F5E]",
      gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.07) 0%, rgba(236, 72, 153, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #EC4899 0%, rgba(236, 72, 153, 0.6) 100%)"
    },
    {
      title: "DevOps & Cloud Engineering",
      level: "Lauratek · Professional",
      color: "bg-[#10B981]",
      textColor: "text-[#10B981]",
      borderColor: "border-t-[#10B981]",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.07) 0%, rgba(16, 185, 129, 0.024) 100%)",
      iconGradient: "linear-gradient(135deg, #10B981 0%, rgba(16, 185, 129, 0.6) 100%)"
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
    <div className="px-4 lg:px-8 pt-0 pb-8 w-full max-w-[1400px] mx-auto">
      {/* Back Navigation */}
      {fromQuizzes && (
        <button 
          onClick={() => navigate('/guest/quizzes')}
          className="flex items-center gap-2 text-[13px] font-bold text-gray-500 hover:text-[#5B4FFF] transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Quizzes
        </button>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-slate-800 mb-1">Certificates</h1>
        <p className="text-[14px] sm:text-[15px] text-gray-500">Earn industry-recognized credentials to power your career</p>
      </div>

      {/* Hero Banner */}
      <div 
        className="rounded-[24px] p-6 sm:p-8 lg:px-10 lg:py-8 mb-6 shadow-guest flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #FDFBFF 0%, #F0EEFF 40%, #E8F4FF 100%)',
          border: '1.32px solid #6C4DFF1F'
        }}
      >
        
        <div className="flex-1 w-full lg:max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#EFECFF] px-3.5 py-1.5 rounded-full text-[#7B5AFF] text-[11px] font-bold mb-4 border border-[#E0D9FF]">
            <Sparkles className="w-3 h-3" /> Industry-Recognized Certificates
          </div>
          
          <h2 className="text-[26px] sm:text-[30px] lg:text-[36px] xl:text-[40px] font-extrabold text-[#111827] leading-[1.2] mb-3 tracking-tight w-full">
            <span className="sm:whitespace-nowrap">Turn Your Learning Into <span className="text-[#5B4FFF]">Industry-</span></span><br />
            <span className="sm:whitespace-nowrap"><span className="text-[#5B4FFF]">Recognized</span> Credentials</span>
          </h2>
          
          <p className="text-[14px] sm:text-[15px] text-gray-500 mb-5 leading-relaxed max-w-xl">
            Complete premium courses and unlock professional certificates that strengthen your resume, LinkedIn profile, and career opportunities.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 max-w-[600px]">
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-guest">
              <Shield className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Industry Recognized</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-guest">
              <Linkedin className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Share on LinkedIn</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-guest">
              <Globe className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Employer Friendly</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-2 flex items-center gap-2 shadow-guest">
              <InfinityIcon className="w-3.5 h-3.5 text-[#5B4FFF]" /> <span className="text-[11px] sm:text-[12px] font-bold text-slate-700">Lifetime Digital Certificate</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setIsEnrollModalOpen(true)}
              className="bg-gradient-to-r from-[#6D5DFB] to-[#5B4FFF] hover:from-[#5a4ae6] hover:to-[#4a3ecc] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[14px] transition-colors shadow-guest flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Certificate Programs <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsEnrollModalOpen(true)}
              className="bg-white border-[1.5px] border-black hover:bg-gray-50 text-[#7B5AFF] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[14px] transition-colors shadow-guest flex justify-center w-full sm:w-auto"
            >
              Preview Certificates
            </button>
          </div>
        </div>
        
        <div className="relative z-10 w-full lg:w-[45%] xl:w-[50%] flex justify-center lg:justify-end mt-6 lg:mt-0">
           <img src={guest5} alt="Premium Certificate" className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[110%] max-w-[600px] h-auto object-contain transform lg:translate-x-4 xl:translate-x-8 drop-shadow-sm" />
        </div>
      </div>

      {/* Certificate Gallery */}
      <div id="certificate-gallery" className="mb-12 scroll-mt-6">
        <h3 
          className="mb-3"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 500,
            fontSize: '23.82px',
            lineHeight: '35.73px',
            letterSpacing: '0px',
            color: '#0F0F1A'
          }}
        >
          Certificate Gallery — Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[20px] border border-gray-100 overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
              style={{ boxShadow: '0px 1.32px 2.65px -1.32px #0000001A, 0px 1.32px 3.97px 0px #0000001A' }}
            >
              <div 
                className="p-6 flex flex-col items-center text-center flex-1"
                style={{ background: cert.gradient }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-guest`}
                  style={{ background: cert.iconGradient }}
                >
                  <Award className="w-5 h-5 text-white" />
                </div>
                <p className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${cert.textColor}`}>
                  Certificate of Completion
                </p>
                <h4 className="text-[15px] font-bold text-slate-800 mb-1">{cert.title}</h4>
                <p className="text-[12px] text-gray-400 mb-4">{cert.level}</p>
                
                <div className="w-full max-w-[200px] mt-auto">
                  <div className="border-t border-gray-200 pt-2">
                    <p className="text-[12px] text-gray-400 font-medium">Arjun Sharma</p>
                  </div>
                </div>
              </div>
              
              <div className={`border-t-[3px] ${cert.borderColor} px-4 sm:px-5 py-3 bg-white flex items-center justify-between`}>
                <span className="text-[11px] text-gray-500 font-medium">Course completion required</span>
                <button 
                  onClick={() => setIsEnrollModalOpen(true)}
                  className={`text-[11px] font-bold ${cert.textColor} hover:opacity-80 transition-opacity flex items-center gap-1`}
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
        <h3 
          className="mb-6"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 500,
            fontSize: '23.82px',
            lineHeight: '35.73px',
            letterSpacing: '0px',
            color: '#0F0F1A'
          }}
        >
          Why Lauratek Certificates Matter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div 
            className="bg-white p-6 rounded-[20px] border border-gray-100 flex items-start gap-4"
            style={{ boxShadow: '0px 1.32px 2.65px -1.32px #0000001A, 0px 1.32px 3.97px 0px #0000001A' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#F4F2FF] flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#7B5AFF]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Industry Verified</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Recognized by 500+ top companies including Google, Amazon, and Infosys</p>
            </div>
          </div>
          
          <div 
            className="bg-white p-6 rounded-[20px] border border-gray-100 flex items-start gap-4"
            style={{ boxShadow: '0px 1.32px 2.65px -1.32px #0000001A, 0px 1.32px 3.97px 0px #0000001A' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#EBF1FF] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-[#3D73FF]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Career Accelerator</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">94% of our certified learners receive job offers within 90 days</p>
            </div>
          </div>

          <div 
            className="bg-white p-6 rounded-[20px] border border-gray-100 flex items-start gap-4"
            style={{ boxShadow: '0px 1.32px 2.65px -1.32px #0000001A, 0px 1.32px 3.97px 0px #0000001A' }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FFF0F5] flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 mb-1">Lifelong Credential</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed">Certificates never expire and can be shared on LinkedIn and resume</p>
            </div>
          </div>

          <div 
            className="bg-white p-6 rounded-[20px] border border-gray-100 flex items-start gap-4"
            style={{ boxShadow: '0px 1.32px 2.65px -1.32px #0000001A, 0px 1.32px 3.97px 0px #0000001A' }}
          >
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
      <div className="bg-white py-6 sm:py-8 rounded-[24px] border border-gray-100 shadow-guest overflow-hidden">
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
              <div key={idx} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-600 shadow-guest hover:border-[#5B4FFF] hover:text-[#5B4FFF] transition-colors whitespace-nowrap cursor-default">
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
