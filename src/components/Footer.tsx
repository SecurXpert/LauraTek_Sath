import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Replace with your logo

const Footer = () => {
  return (
    <footer className="bg-[#001BB7] text-white">
      {/* Wavy Top Border */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="w-full h-8 sm:h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,C438.64,32.43,512.34,53.67,583,72.05,c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34,C989.49,25,1113.64,28.06,1200,56.86V0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="LauraTek Logo"
              className="w-12 h-12 mr-3"
            />
            <h3 className="text-xl font-bold">LauraTek</h3>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Empowering future leaders through innovative learning and certification.
          </p>

          {/* Social Icons */}
          <p className="text-sm text-gray-300 mb-2">Follow Us:</p>
          <div className="flex space-x-3">
            <a href="https://www.youtube.com/@SecurXpert" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaYoutube className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/securxpert-technologies-pvt-ltd/" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/share/1FTGS4JLXi/?mibextid=wwXIfr" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/securxpert/profilecard/?igsh=eGNnNnloajlyZmI1" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-dm-sans font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
            <li><a href="/jobs" className="hover:text-white transition">Jobs</a></li>
            <li><a href="/success-stories" className="hover:text-white transition">Success Stories</a></li>
            <li><a href="/bootcamp" className="hover:text-white transition">BootCamp</a></li>
            <li><a href="/support" className="hover:text-white transition">Support</a></li>
          </ul>
        </div>

        {/* Policies & Support */}
        <div>
          <h4 className="text-lg font-dm-sans font-semibold mb-4 border-b border-white/20 pb-2">Policies & Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="/support" className="hover:text-white transition">Need Help?</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-dm-sans  font-semibold mb-4 border-b border-white/20 pb-2">Contact Information</h4>
          
          {/* Newsletter */}
          <p className="text-sm text-gray-300 mb-3">
            Get the latest LauraTek news delivered to your inbox
          </p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-full text-sm focus:outline-none"
            />
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-r-full text-sm font-medium transition">
              Subscribe
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              LauraTek Campus, Innovation District, Hyderabad, Telangana 500081
            </p>
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              support@lauratek.com | +91 79932 56679
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Divider & Copyright */}
      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-white/20 my-6" />
        <p className="text-center text-sm text-gray-400">
          © 2025 LauraTek. All Rights Reserved | 
          <a href="/privacy" className="hover:text-white mx-1">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-white mx-1">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;