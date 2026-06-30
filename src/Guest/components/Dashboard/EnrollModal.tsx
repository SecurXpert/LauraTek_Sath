import React from 'react';
import { X } from 'lucide-react';
import guest2Img from "@/assets/guest2.png";
import logoImg from "@/assets/logo.png";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] w-full max-w-[1000px] flex flex-col md:flex-row overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={onClose} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-10 bg-white/50 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Left Side: Illustration */}
            <div className="w-full md:w-1/2 bg-[#F4F6FF] flex items-center justify-center p-8 lg:p-12">
               <img src={guest2Img} alt="Sign Up" className="w-full max-w-sm object-contain drop-shadow-md" />
            </div>
            
            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 lg:p-10 flex flex-col items-center overflow-y-auto max-h-[90vh]">
               {/* Logo */}
               <div className="mb-2">
                  <img src={logoImg} alt="Lauratek" className="h-14 object-contain" />
               </div>
               <h2 className="text-[22px] font-bold text-slate-800 mb-8">Contact Us</h2>
               
               <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your full name" className="w-full border border-blue-600 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,0.2)]" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Enter your email address" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Country <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your country" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Mobile <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter 10-digit mobile number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Qualification <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: B.Tech, B.Sc, MCA" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Year of Passed Out <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: 2022" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Interest <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Eg: Web Development, Data Science" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">State <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your state" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 <div className="col-span-1 md:col-span-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your city" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                 </div>
                 
                 <div className="col-span-1 md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5">Description</label>
                    <textarea rows={3} placeholder="Tell us about your background and interests (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                 </div>
                 
                 <div className="col-span-1 md:col-span-2 mt-2">
                    <button type="button" className="w-full bg-[#111827] hover:bg-black text-white font-bold py-3.5 rounded-lg transition-colors text-[14px]">
                      Send Message
                    </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
  );
};

export default EnrollModal;
