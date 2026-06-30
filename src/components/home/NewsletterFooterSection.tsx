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


const NewsletterFooterSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* ================== NEWSLETTER & FOOTER SECTION ================== */}
        <div className="relative bg-[#F5F4F9] pt-40 pb-10 mt-40">
          
          {/* Overlapping Newsletter Banner */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1200px] rounded-[24px] p-10 md:p-14 shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between z-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${guest14Img})` }}
          >
            <div className="relative z-10 w-full md:w-1/2 mb-8 md:mb-0 text-white">
              <p className="text-[13px] font-semibold tracking-wider uppercase mb-2">Newsletter</p>
              <h2 className="text-[32px] md:text-[40px] font-extrabold leading-tight">Subscribe Our<br/>Newsletter</h2>
            </div>

            <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start md:items-end">
              <div className="flex w-full max-w-md bg-white rounded-full p-1.5 shadow-sm mb-6">
                <input type="email" placeholder="Enter Email Address" className="flex-1 bg-transparent border-none outline-none px-4 text-[14px] text-gray-700" />
                <button className="bg-[#FF6B4A] hover:bg-[#ff6b4a]/90 text-white px-6 py-2.5 rounded-full text-[14px] font-semibold transition-colors">Subscribe</button>
                <button className="bg-[#FF6B4A] hover:bg-[#ff6b4a]/90 text-white w-10 h-10 rounded-full flex items-center justify-center ml-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 text-white text-[13px] font-medium mr-auto md:mr-0 md:ml-auto">
                <div className="flex -space-x-3">
                  <img src={trainer1} alt="User" className="w-10 h-10 rounded-full border-2 border-[#9327D1] object-cover" />
                  <img src={trainer2} alt="User" className="w-10 h-10 rounded-full border-2 border-[#9327D1] object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#9327D1] bg-[#FF6B4A] flex items-center justify-center text-[11px] font-bold">+15k</div>
                </div>
                <div>
                  <p>More than 15k active users!</p>
                  <a href="#" className="hover:underline flex items-center gap-1 mt-0.5">Join them now <span>&rarr;</span></a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16">
              
              {/* Logo & About */}
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <Link to="/" className="flex items-center">
                    <img src={techLogo} alt="Lauratek Logo" className="h-10 w-auto object-contain" />
                  </Link>
                </div>
                <p className="text-[#8896AB] text-[14px] leading-relaxed mb-6 font-medium pr-4">
                  We've got the perfect tools for your success. Join us today and empower your journey toward excellence.
                </p>
                <div className="flex gap-3">
                  {['facebook', 'twitter', 'linkedin', 'pinterest'].map((social, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-[10px] border border-[#E2E8F0] flex items-center justify-center text-[#8896AB] hover:text-[#3B42A4] hover:border-[#3B42A4] transition-colors bg-transparent">
                      {/* Using generic path for placeholder social icon */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="col-span-1">
                <h4 className="text-[#3B42A4] font-bold text-[16px] mb-6">Links</h4>
                <ul className="space-y-4 text-[#8896AB] text-[14px] font-medium">
                  <li><a href="/#about-us" className="hover:text-[#3B42A4]">About Us</a></li>
                  <li><a href="/#courses" className="hover:text-[#3B42A4]">Our Courses</a></li>
                  {/* <li><a href="#" className="hover:text-[#3B42A4]">Our Team</a></li> */}
                  <li><Link to="/contact-us" className="hover:text-[#3B42A4]">Contact Us</Link></li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="col-span-1">
                <h4 className="text-[#3B42A4] font-bold text-[16px] mb-6">Contact Us</h4>
                <ul className="space-y-4 text-[#8896AB] text-[14px] font-medium">
                  <li className="leading-relaxed">3891 Ranchview Dr. Richardson,<br/>California 62639</li>
                  <li>(702) 555-0122</li>
                  <li>kenzi.lawson@example.com</li>
                </ul>
              </div>

              {/* Anytime Connect */}
              <div className="col-span-1 flex flex-col items-start md:items-center text-left md:text-center">
                <h4 className="text-[#3B42A4] font-bold text-[16px] mb-6 md:mb-8">Anytime Connect<br/>With Us</h4>
                <button className="w-[100px] h-[100px] rounded-full border border-gray-300 flex flex-col items-center justify-center text-[#3B42A4] hover:bg-[#3B42A4] hover:text-white transition-colors relative group mb-6">
                  <svg className="w-5 h-5 mb-1 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  <span className="text-[12px] font-bold">Contact Us</span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3B42A4] rounded-full border-[4px] border-[#F5F4F9] group-hover:bg-white group-hover:border-[#3B42A4]"></div>
                </button>
                <div className="text-[#3B42A4] text-[13px] font-bold mb-1">07 : 00 AM - 12 : 30 PM</div>
                <div className="text-[#8896AB] text-[11px] font-medium">Saturday - Thursday</div>
              </div>

            </div>

            {/* Copyright Line */}
            <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-[#8896AB] text-[13px] font-medium">
              <p className="mb-2 md:mb-0">Copyright @ 2026 Lauratek</p>
            </div>

          </div>
        </div>
        {/* ================== END NEWSLETTER & FOOTER SECTION ================== */}

        
    </>
  );
};

export default NewsletterFooterSection;
