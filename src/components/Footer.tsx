// import React, { useState } from 'react';
// import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import logo from '../assets/logo.png'; // Assume a logo asset for LauraTek

// const Footer = () => {
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   return (
//     <footer className="relative bg-gradient-to-r from-navy-900 via-blue-900 to-navy-900 text-white pt-8 pb-6">
//       {/* Wavy Top Border */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//   className="relative block w-full h-8 sm:h-10"
//   viewBox="0 0 1200 120"
//   preserveAspectRatio="none"
// >
//   <path
//     d="M0,0V46.29
//        c47.79,22.2,103.59,32.17,158,28,
//        70.36-5.37,136.33-33.31,206.8-37.5,
//        C438.64,32.43,512.34,53.67,583,72.05,
//        c69.27,18,138.3,24.88,209.4,13.08,
//        36.15-6,69.85-17.84,104.45-29.34,
//        C989.49,25,1113.64,28.06,1200,56.86V0Z"
//     fill="white"
//   />
// </svg>

//       </div>

//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
//         {/* About Section with Logo */}
//         <div className="mb-6">
//           <div className="flex items-center mb-3">
//             <img
//               src={logo}
//               alt="LauraTek Logo"
//               className="w-16 h-16 mr-2 border-2 border-teal-300 rounded-full"
//             />
//             <h3 className="text-xl font-bold text-teal-100">
//               LauraTek
//             </h3>
//           </div>
//           <p className="text-sm text-sky-100 mb-3">
//             Empowering future leaders through innovative learning and certification.
//           </p>
//           <div className="mt-3 flex flex-col sm:flex-row gap-2">
//             <input
//               type="email"
//               placeholder="Email Address..."
//               className="flex-1 p-2.5 bg-teal-800/50 border border-teal-400 rounded-md text-white placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//             />
//             <button className="bg-teal-500 hover:bg-teal-600 text-white p-2.5 rounded-md transition-colors duration-300 text-sm">
//               Subscribe
//             </button>
//           </div>
//           <p className="text-sm text-sky-100 mt-3">
//             Certified by
//           </p>
//           <div className="flex space-x-2 mt-2">
//             <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
//               </svg>
//             </div>
//             <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
//               </svg>
//             </div>
//             <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
//               </svg>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-sky-100 mb-2">
//               Follow Us On:
//             </p>
//             <div className="flex gap-2">
//               <a
//                 href="#"
//                 aria-label="Follow LauraTek on YouTube"
//                 className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.121-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Follow LauraTek on LinkedIn"
//                 className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.391-1.875-2.391-1.879 0-2.125 1.392-2.125 2.391v5.604h-3v-11h3v1.563c.5-.938 1.333-1.563 2.375-1.563 2.625 0 3.125 1.828 3.125 4.207v6.793z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Follow LauraTek on Facebook"
//                 className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <FaFacebookF className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 aria-label="Follow LauraTek on Instagram"
//                 className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
//               >
//                 <FaInstagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold text-teal-100 mb-3">
//             Quick Links
//           </h4>
//           <ul className="space-y-2 text-sm text-sky-100">
//             <li><a href="/" className="hover:text-teal-300 transition-colors duration-200">Home</a></li>
//             <li><a href="/courses" className="hover:text-teal-300 transition-colors duration-200">Courses</a></li>
//             <li><a href="/jobs" className="hover:text-teal-300 transition-colors duration-200">Jobs</a></li>
//             <li><a href="/success-stories" className="hover:text-teal-300 transition-colors duration-200">Success Stories</a></li>
//             <li><a href="/bootcamp" className="hover:text-teal-300 transition-colors duration-200">BootCamp</a></li>
//             <li><a href="/support" className="hover:text-teal-300 transition-colors duration-200">Support</a></li>
//           </ul>
//         </div>

//         {/* Policies & Support */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold text-teal-100 mb-3">
//             Policies & Support
//           </h4>
//           <ul className="space-y-2 text-sm text-sky-100">
//             <li><a href="/privacy" className="hover:text-teal-300 transition-colors duration-200">Privacy Policy</a></li>
//             <li><a href="/terms" className="hover:text-teal-300 transition-colors duration-200">Terms & Conditions</a></li>
//             <li>
//               <button onClick={toggleChatbot} className="hover:text-teal-300 transition-colors duration-200 text-sky-100">
//                 Need Help?
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h4 className="text-lg font-semibold text-teal-100 mb-3">
//             Contact Information
//           </h4>
//           <p className="text-sm text-sky-100 flex items-center mb-2">
//             <svg className="w-5 h-5 mr-2 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//             </svg>
//             support@lauratek.com
//           </p>
//           <p className="text-sm text-sky-100 flex items-center mb-2">
//             <svg className="w-5 h-5 mr-2 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//             </svg>
//             LauraTek Campus, Innovation District, Hyderabad, Telangana 500081
//           </p>
//           <p className="text-sm text-sky-100 flex items-center">
//             <svg className="w-5 h-5 mr-2 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z"/>
//             </svg>
//             +91 79932 56679
//           </p>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <motion.div 
//         className="mt-6 text-center text-sm text-sky-100 border-t border-teal-700 pt-3"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         © 2025 LauraTek. All Rights Reserved | <a href="/privacy" className="hover:text-teal-300 transition-colors duration-200">Privacy Policy</a> | <a href="/terms" className="hover:text-teal-300 transition-colors duration-200">Terms & Conditions</a>
//       </motion.div>
//     </footer>
//   );
// };

// export default Footer;


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