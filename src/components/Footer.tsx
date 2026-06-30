import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import logo from "../assets/techlogo.png";

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #EFF3F4 0%, #F0E5E8 100%)' }} className="text-[#4E5665] pt-16 pb-8 font-dm-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="flex flex-col">
            <div className="mb-6">
              <img src={logo} alt="Lauratek" className="h-10 object-contain" />
            </div>
            <p className="text-[15px] leading-relaxed text-[#6B7280] mb-8 pr-4">
              We've got the perfect tools for your success. Join us today and empower your journey toward excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#32269B] hover:text-white transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#32269B] hover:text-white transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#32269B] hover:text-white transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-[#32269B] hover:text-white transition-colors">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col">
            <h4 className="text-[#32269B] font-bold text-lg mb-6">Links</h4>
            <ul className="space-y-4">
              <li><a href="/#about-us" className="text-[15px] text-[#6B7280] hover:text-[#32269B] transition-colors">About Us</a></li>
              <li><a href="/courses" className="text-[15px] text-[#6B7280] hover:text-[#32269B] transition-colors">Our Courses</a></li>
              <li><a href="/team" className="text-[15px] text-[#6B7280] hover:text-[#32269B] transition-colors">Our Team</a></li>
              <li><a href="/contact-us" className="text-[15px] text-[#6B7280] hover:text-[#32269B] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col">
            <h4 className="text-[#32269B] font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="text-[15px] text-[#6B7280]">
                3891 Ranchview Dr. Richardson,<br/>
                California 62639
              </li>
              <li className="text-[15px] text-[#6B7280]">(702) 555-0122</li>
              <li className="text-[15px] text-[#6B7280]">kenzi.lawson@example.com</li>
            </ul>
          </div>

          {/* Column 4: Anytime Connect With Us */}
          <div className="flex flex-col items-start lg:items-center">
            <h4 className="text-[#32269B] font-bold text-lg mb-6 text-center">Anytime Connect<br/>With Us</h4>
            
            <div className="relative mb-6">
              <button className="w-24 h-24 rounded-full border border-gray-300 bg-transparent flex flex-col items-center justify-center text-[#32269B] hover:bg-white transition-colors">
                <ArrowUpRight size={20} className="mb-1" />
                <span className="text-[11px] font-bold">Contact Us</span>
              </button>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#32269B] rounded-full border-[3px] border-[#F0E5E8]"></div>
            </div>

            <div className="text-center">
              <p className="text-[#32269B] font-bold text-[14px]">07 : 00 AM - 12 : 30 PM</p>
              <p className="text-[#6B7280] text-[11px] mt-1">Saturday - Thursday</p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6">
          <p className="text-[14px] text-[#6B7280]">
            Copyright @ 2026 Lauratek
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
