// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Header from '../Header';
// import Footer from '../Footer';
// import ibm from '@/assets/logoibm.webp';
// import hrmsImage from '@/assets/dhora.jpg';
// import mediImage from '@/assets/onestep.png';

// // Placeholder images - replace with actual image paths
// const student1 = '/images/student1.jpg';
// const student2 = '/images/student2.jpg';
// const student3 = '/images/student3.jpg';
// const student4 = '/images/student4.jpg';
// const student5 = '/images/student5.jpg';
// const student6 = '/images/student6.jpg';

// const initialSuccessStories = [
//   {
//     name: "Rohit M.",
//     education: "BCA Student",
//     placement: "Frontend/Backend Developer",
//     quote: "I was new to coding, but Laura's trainers made frontend and backend development easy to grasp. Their patience and support were incredible.",
//     image: student1,
//   },
//   {
//     name: "Kiran R.",
//     education: "B.Tech Final Year",
//     placement: "Placed in 2 months",
//     quote: "Laura helped me move from theory to real-time projects. The LMS is simple, and I cracked my first placement in just 2 months.",
//     image: student2,
//   },
//   {
//     name: "Sneha T.",
//     education: "B.Sc Student",
//     placement: "Internship Experience",
//     quote: "Thanks to Laura's online education model, I gained hands-on project experience and an internship certificate while still in college.",
//     image: student3,
//   },
//   {
//     name: "Aditya P.",
//     education: "MCA Student",
//     placement: "App Developer",
//     quote: "The structured LMS and hybrid training made it easy to balance college and learning. I built real apps and learned by doing.",
//     image: student4,
//   },
//   {
//     name: "Divya S.",
//     education: "Fresher",
//     placement: "Successfully Placed",
//     quote: "Mock interviews, resume help, and real-time training helped me land a job. Laura is truly career-focused.",
//     image: student5,
//   },
//   {
//     name: "Ravi K.",
//     education: "BSc Graduate",
//     placement: "Software Developer",
//     quote: "At Laura, we worked on live software projects. It gave me the confidence to face technical rounds.",
//     image: student6,
//   },
// ];

// const partnerLogos = [
//   { name: "IBM", logo: ibm },
//   { name: "Cognizant", logo: ibm },
//   { name: "Hiring Panda", logo: ibm },
//   { name: "HIC Global Solutions", logo: ibm },
//   { name: "Krazy Tech", logo: ibm },
//   { name: "Inity Infotech", logo: ibm },
// ];

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1 } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2
//     }
//   }
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.6 }
//   }
// };

// const SuccessStories = () => {
//   const [successStories, setSuccessStories] = useState(initialSuccessStories);
//   const [currentStory, setCurrentStory] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   useEffect(() => {
//     let interval;
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         setCurrentStory(prev => (prev === successStories.length - 1 ? 0 : prev + 1));
//       }, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, successStories.length]);

//   const handlePrev = () => {
//     setIsAutoPlaying(false);
//     setCurrentStory((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setIsAutoPlaying(false);
//     setCurrentStory((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
//   };

//   const handleImageUpload = (index, event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result;
//         if (typeof result === 'string') {
//           const updatedStories = [...successStories];
//           updatedStories[index] = { 
//             ...updatedStories[index], 
//             image: result
//           };
//           setSuccessStories(updatedStories);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-indigo-900">
//       {/* Header */}
//       <div className="sticky top-0 z-50 bg-background">
//         <Header />
//       </div>

//       {/* Main Content */}
//       <main className="
//         flex-grow 
//         py-8 2xs:py-8 xs:py-10 2sm:py-12 sm:py-14 md:py-16 md800:py-16 md900:py-16 lg:py-18 xl:py-20 2xl:py-24 3xl:py-28
//         px-2 2xs:px-2 xs:px-3 2sm:px-4 sm:px-6 md:px-6 md800:px-7 md900:px-7 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16
//       ">
//         <div className="
//           mx-auto
//           max-w-[90%] 2xs:max-w-[90%] xs:max-w-[85%] 2sm:max-w-[80%] sm:max-w-4xl md:max-w-5xl md800:max-w-5xl md900:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-[100rem]
//         ">
//           <motion.h1 
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="
//               text-2xl 2xs:text-2xl xs:text-3xl 2sm:text-3xl sm:text-4xl md:text-4xl md800:text-5xl md900:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 
//               font-extrabold text-center text-white 
//               mb-6 2xs:mb-6 xs:mb-6 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-9 md900:mb-9 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
//             "
//           >
//             Success Beyond the Classroom
//           </motion.h1>

//           {/* Stats Section */}
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             className="
//               bg-white rounded-2xl shadow-2xl 
//               p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14 
//               mb-8 2xs:mb-8 xs:mb-10 2sm:mb-12 sm:mb-14 md:mb-16 md800:mb-16 md900:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24 3xl:mb-28
//               overflow-hidden
//             "
//           >
//             <div className="text-center mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16">
//               <h2 className="
//                 text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 
//                 font-bold text-indigo-900
//               ">
//                 LauraTek's Placement Journeys
//               </h2>
//               <p className="
//                 text-gray-600 mt-2 
//                 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//               ">
//                 Transforming students into industry-ready professionals
//               </p>
//             </div>
            
//             <motion.div 
//               variants={staggerContainer}
//               initial="hidden"
//               animate="visible"
//               className="
//                 grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md800:grid-cols-3 md900:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 
//                 gap-4 2xs:gap-4 xs:gap-5 2sm:gap-5 sm:gap-6 md:gap-6 md800:gap-7 md900:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14 
//                 mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
//               "
//             >
//               <motion.div 
//                 variants={fadeInUp}
//                 className="
//                   bg-indigo-50 
//                   p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12 
//                   rounded-lg hover:shadow-lg transition-all
//                 "
//               >
//                 <h3 className="
//                   text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                   font-semibold text-indigo-900
//                 ">
//                   3 Full Batches
//                 </h3>
//                 <p className="
//                   text-gray-600 
//                   text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
//                 ">
//                   Transformed in just 9 months
//                 </p>
//               </motion.div>
//               <motion.div 
//                 variants={fadeInUp}
//                 className="
//                   bg-indigo-50 
//                   p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12 
//                   rounded-lg hover:shadow-lg transition-all
//                 "
//               >
//                 <h3 className="
//                   text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                   font-semibold text-indigo-900
//                 ">
//                   20+ Hiring Partners
//                 </h3>
//                 <p className="
//                   text-gray-600 
//                   text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
//                 ">
//                   Including IBM, Cognizant, and more
//                 </p>
//               </motion.div>
//               <motion.div 
//                 variants={fadeInUp}
//                 className="
//                   bg-indigo-50 
//                   p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12 
//                   rounded-lg hover:shadow-lg transition-all
//                 "
//               >
//                 <h3 className="
//                   text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                   font-semibold text-indigo-900
//                 ">
//                   Comprehensive Training
//                 </h3>
//                 <p className="
//                   text-gray-600 
//                   text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
//                 ">
//                   Real projects, certifications, and placement prep
//                 </p>
//               </motion.div>
//             </motion.div>

//             <motion.div 
//               initial="hidden"
//               animate="visible"
//               variants={fadeIn}
//               className="mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16"
//             >
//               <h3 className="
//                 text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                 font-semibold text-indigo-900 mb-4 text-center
//               ">
//                 Our Placement Partners
//               </h3>
//               <div className="overflow-hidden relative py-4">
//                 <motion.div
//                   className="flex"
//                   initial={{ x: 0 }}
//                   animate={{
//                     x: `-${partnerLogos.length * (90 / 2)}px`, // Adjusted for smaller screens
//                     transition: {
//                       x: {
//                         repeat: Infinity,
//                         repeatType: 'loop',
//                         duration: partnerLogos.length * 2,
//                         ease: 'linear',
//                       },
//                     },
//                   }}
//                   style={{ 
//                     display: 'flex',
//                     width: `calc(${partnerLogos.length * 2} * (90 / 2))px 2xs:calc(${partnerLogos.length * 2} * (90 / 2))px xs:calc(${partnerLogos.length * 2} * 100px) 2sm:calc(${partnerLogos.length * 2} * 110px) sm:calc(${partnerLogos.length * 2} * 120px) md:calc(${partnerLogos.length * 2} * 130px) md800:calc(${partnerLogos.length * 2} * 140px) md900:calc(${partnerLogos.length * 2} * 150px) lg:calc(${partnerLogos.length * 2} * 160px) xl:calc(${partnerLogos.length * 2} * 180px) 2xl:calc(${partnerLogos.length * 2} * 200px) 3xl:calc(${partnerLogos.length * 2} * 220px)`,
//                   }}
//                 >
//                   {[...partnerLogos, ...partnerLogos].map((partner, index) => (
//                     <div
//                       key={`${partner.name}-${index}`}
//                       className="
//                         flex-shrink-0 bg-white 
//                         p-2 2xs:p-2 xs:p-3 2sm:p-3 sm:p-4 md:p-4 md800:p-4 md900:p-4 lg:p-5 xl:p-6 2xl:p-7 3xl:p-8 
//                         rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center
//                       "
//                       style={{ 
//                         width: '90px 2xs:90px xs:100px 2sm:110px sm:120px md:130px md800:140px md900:150px lg:160px xl:180px 2xl:200px 3xl:220px',
//                         minWidth: '90px 2xs:90px xs:100px 2sm:110px sm:120px md:130px md800:140px md900:150px lg:160px xl:180px 2xl:200px 3xl:220px',
//                         marginRight: '0px',
//                       }}
//                     >
//                       <img
//                         src={partner.logo}
//                         alt={`${partner.name} logo`}
//                         className="
//                           h-8 2xs:h-8 xs:h-9 2sm:h-10 sm:h-10 md:h-11 md800:h-12 md900:h-12 lg:h-14 xl:h-16 2xl:h-18 3xl:h-20 
//                           w-auto object-contain mb-2
//                         "
//                         onError={(e) => {
//                           const target = e.target;
//                           // target.onerror = null;
//                           // target.src = '/images/placeholder-logo.png';
//                         }}
//                       />
//                       <span className="
//                         text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 
//                         font-medium text-indigo-900 text-center
//                       ">
//                         {partner.name}
//                       </span>
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Carousel Section */}
//           <motion.h2 
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="
//               text-xl 2xs:text-xl xs:text-2xl 2sm:text-2xl sm:text-3xl md:text-3xl md800:text-4xl md900:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 
//               font-extrabold text-center text-white 
//               mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
//             "
//           >
//             Student Success Stories
//           </motion.h2>
          
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             className="
//               relative bg-white rounded-2xl shadow-2xl overflow-hidden 
//               mb-8 2xs:mb-8 xs:mb-10 2sm:mb-12 sm:mb-14 md:mb-16 md800:mb-16 md900:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24 3xl:mb-28
//               transform hover:scale-[1.01] transition-transform duration-300
//             "
//           >
//             <div className="relative">
//               {successStories[currentStory].image ? (
//                 <motion.img
//                   key={currentStory}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                   src={successStories[currentStory].image}
//                   alt={successStories[currentStory].name}
//                   className="
//                     w-full 
//                     h-[200px] 2xs:h-[220px] xs:h-[240px] 2sm:h-[260px] sm:h-[300px] md:h-[350px] md800:h-[400px] md900:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] 
//                     object-cover rounded-t-2xl
//                   "
//                 />
//               ) : (
//                 <div className="
//                   w-full 
//                   h-[200px] 2xs:h-[220px] xs:h-[240px] 2sm:h-[260px] sm:h-[300px] md:h-[350px] md800:h-[400px] md900:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px] 
//                   bg-gray-200 flex items-center justify-center rounded-t-2xl
//                 ">
//                   <span className="
//                     text-gray-500 
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   ">
//                     No image uploaded
//                   </span>
//                 </div>
//               )}
//               <div className="
//                 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
//                 p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14
//               ">
//                 <motion.h3 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="
//                     text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 
//                     font-bold text-white
//                   "
//                 >
//                   {successStories[currentStory].name}
//                 </motion.h3>
//                 <motion.p 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="
//                     text-indigo-200 
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   "
//                 >
//                   {successStories[currentStory].education}
//                 </motion.p>
//                 <motion.p 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="
//                     text-white font-medium mt-1 2xs:mt-1 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2 md900:mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 3xl:mt-6
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   "
//                 >
//                   {successStories[currentStory].placement}
//                 </motion.p>
//                 <motion.p 
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="
//                     text-white italic 
//                     mt-2 2xs:mt-2 xs:mt-3 2sm:mt-3 sm:mt-4 md:mt-4 md800:mt-4 md900:mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 3xl:mt-8
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   "
//                 >
//                   "{successStories[currentStory].quote}"
//                 </motion.p>
//               </div>
//               <div className="
//                 absolute inset-0 flex items-center justify-between 
//                 px-2 2xs:px-2 xs:px-3 2sm:px-4 sm:px-6 md:px-6 md800:px-6 md900:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-14 
//                 opacity-0 hover:opacity-100 transition-opacity
//               ">
//                 <button
//                   onClick={handlePrev}
//                   className="
//                     bg-indigo-600 text-white 
//                     p-2 2xs:p-2 xs:p-2 2sm:p-2 sm:p-3 md:p-3 md800:p-3 md900:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 
//                     rounded-full hover:bg-indigo-700 transition shadow-lg
//                   "
//                 >
//                   <ChevronLeft 
//                     size={16} 
//                     className="2xs:size-16 xs:size-18 2sm:size-20 sm:size-24 md:size-24 md800:size-28 md900:size-28 lg:size-28 xl:size-32 2xl:size-36 3xl:size-40"
//                   />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="
//                     bg-indigo-600 text-white 
//                     p-2 2xs:p-2 xs:p-2 2sm:p-2 sm:p-3 md:p-3 md800:p-3 md900:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 
//                     rounded-full hover:bg-indigo-700 transition shadow-lg
//                   "
//                 >
//                   <ChevronRight 
//                     size={16} 
//                     className="2xs:size-16 xs:size-18 2sm:size-20 sm:size-24 md:size-24 md800:size-28 md900:size-28 lg:size-28 xl:size-32 2xl:size-36 3xl:size-40"
//                   />
//                 </button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Student Grid */}
//           <motion.div 
//             variants={staggerContainer}
//             initial="hidden"
//             animate="visible"
//             className="
//               grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md800:grid-cols-2 md900:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 
//               gap-4 2xs:gap-4 xs:gap-5 2sm:gap-5 sm:gap-6 md:gap-6 md800:gap-7 md900:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14
//             "
//           >
//             {successStories.map((story, index) => (
//               <motion.div
//                 key={index}
//                 variants={fadeInUp}
//                 whileHover={{ y: -10 }}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="
//                   relative 
//                   h-[160px] 2xs:h-[180px] xs:h-[200px] 2sm:h-[220px] sm:h-[240px] md:h-[260px] md800:h-[280px] md900:h-[300px] lg:h-[320px] xl:h-[360px] 2xl:h-[400px] 3xl:h-[440px] 
//                   overflow-hidden
//                 ">
//                   {story.image ? (
//                     <motion.img
//                       whileHover={{ scale: 1.05 }}
//                       src={story.image}
//                       alt={story.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <span className="
//                         text-gray-500 
//                         text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                       ">
//                         No image uploaded
//                       </span>
//                     </div>
//                   )}
//                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
//                 </div>
//                 <div className="
//                   p-3 2xs:p-3 xs:p-4 2sm:p-4 sm:p-5 md:p-5 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
//                 ">
//                   <h3 className="
//                     text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                     font-semibold text-indigo-900
//                   ">
//                     {story.name}
//                   </h3>
//                   <p className="
//                     text-indigo-600 
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   ">
//                     {story.education}
//                   </p>
//                   <p className="
//                     text-indigo-800 font-medium 
//                     mt-1 2xs:mt-1 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2 md900:mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 3xl:mt-6
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   ">
//                     {story.placement}
//                   </p>
//                   <p className="
//                     text-gray-600 italic 
//                     mt-1 2xs:mt-1 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2 md900:mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 3xl:mt-6
//                     text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                   ">
//                     "{story.quote}"
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Innovations Section */}
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="
//               bg-white rounded-2xl shadow-2xl 
//               p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14 
//               mt-8 2xs:mt-8 xs:mt-10 2sm:mt-12 sm:mt-14 md:mt-16 md800:mt-16 md900:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 3xl:mt-28
//               overflow-hidden
//             "
//           >
//             <h2 className="
//               text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 
//               font-bold text-center text-indigo-900 
//               mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
//             ">
//               Our Innovations
//             </h2>
//             <p className="
//               text-center text-gray-600 
//               mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
//               text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//             ">
//               Driving Impact Across Education, HR, and Healthcare
//             </p>
            
//             <div className="
//               grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md800:grid-cols-2 md900:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 
//               gap-4 2xs:gap-4 xs:gap-5 2sm:gap-5 sm:gap-6 md:gap-6 md800:gap-7 md900:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14
//             ">
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="
//                   bg-indigo-50 
//                   p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12 
//                   rounded-lg overflow-hidden
//                 "
//               >
//                 <div className="
//                   h-[120px] 2xs:h-[140px] xs:h-[160px] 2sm:h-[180px] sm:h-[200px] md:h-[220px] md800:h-[240px] md900:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] 3xl:h-[400px] 
//                   mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4 md:mb-4 md800:mb-4 md900:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8 
//                   overflow-hidden rounded-lg
//                 ">
//                   <motion.img 
//                     whileHover={{ scale: 1.1 }}
//                     src={hrmsImage} 
//                     alt="Dohra HRMS" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="
//                   text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                   font-semibold text-indigo-900 
//                   mb-2 2xs:mb-2 xs:mb-2 2sm:mb-2 sm:mb-2 md:mb-2 md800:mb-2 md900:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6
//                 ">
//                   Dohra HRMS
//                 </h3>
//                 <p className="
//                   text-gray-600 
//                   text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                 ">
//                   A smart, cloud-based Human Resource Management System built to streamline employee lifecycle management, including onboarding, attendance tracking, payroll automation, and performance insights for modern organizations.
//                 </p>
//               </motion.div>
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="
//                   bg-indigo-50 
//                   p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12 
//                   rounded-lg overflow-hidden
//                 "
//               >
//                 <div className="
//                   h-[120px] 2xs:h-[140px] xs:h-[160px] 2sm:h-[180px] sm:h-[200px] md:h-[220px] md800:h-[240px] md900:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] 3xl:h-[400px] 
//                   mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4 md:mb-4 md800:mb-4 md900:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8 
//                   overflow-hidden rounded-lg
//                 ">
//                   <motion.img 
//                     whileHover={{ scale: 1.1 }}
//                     src={mediImage} 
//                     alt="OneStep Medi" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="
//                   text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 
//                   font-semibold text-indigo-900 
//                   mb-2 2xs:mb-2 xs:mb-2 2sm:mb-2 sm:mb-2 md:mb-2 md800:mb-2 md900:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6
//                 ">
//                   OneStep Medi
//                 </h3>
//                 <p className="
//                   text-gray-600 
//                   text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
//                 ">
//                   A comprehensive digital healthcare platform that facilitates doctor appointments, diagnostic bookings, medicine delivery, and includes dedicated digital marketing services for doctors to enhance their online visibility, patient reach, and brand reputation.
//                 </p>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default SuccessStories;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';
import ibm from '@/assets/logoibm.webp';
import hrmsImage from '@/assets/dhora.jpg';
import mediImage from '@/assets/onestep.png';
 
// Placeholder images - replace with actual image paths
const student1 = '/images/student1.jpg';
const student2 = '/images/student2.jpg';
const student3 = '/images/student3.jpg';
const student4 = '/images/student4.jpg';
const student5 = '/images/student5.jpg';
const student6 = '/images/student6.jpg';
 
const initialSuccessStories = [
  {
    name: "Rohit M.",
    education: "BCA Student",
    placement: "Frontend/Backend Developer",
    quote: "I was new to coding, but Laura's trainers made frontend and backend development easy to grasp. Their patience and support were incredible.",
    image: student1,
  },
  {
    name: "Kiran R.",
    education: "B.Tech Final Year",
    placement: "Placed in 2 months",
    quote: "Laura helped me move from theory to real-time projects. The LMS is simple, and I cracked my first placement in just 2 months.",
    image: student2,
  },
  {
    name: "Sneha T.",
    education: "B.Sc Student",
    placement: "Internship Experience",
    quote: "Thanks to Laura's online education model, I gained hands-on project experience and an internship certificate while still in college.",
    image: student3,
  },
  {
    name: "Aditya P.",
    education: "MCA Student",
    placement: "App Developer",
    quote: "The structured LMS and hybrid training made it easy to balance college and learning. I built real apps and learned by doing.",
    image: student4,
  },
  {
    name: "Divya S.",
    education: "Fresher",
    placement: "Successfully Placed",
    quote: "Mock interviews, resume help, and real-time training helped me land a job. Laura is truly career-focused.",
    image: student5,
  },
  {
    name: "Ravi K.",
    education: "BSc Graduate",
    placement: "Software Developer",
    quote: "At Laura, we worked on live software projects. It gave me the confidence to face technical rounds.",
    image: student6,
  },
];
 
const partnerLogos = [
  { name: "IBM", logo: ibm },
  { name: "Cognizant", logo: ibm },
  { name: "Hiring Panda", logo: ibm },
  { name: "HIC Global Solutions", logo: ibm },
  { name: "Krazy Tech", logo: ibm },
  { name: "Inity Infotech", logo: ibm },
];
 
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};
 
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
 
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};
 
const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState(initialSuccessStories);
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentStory(prev => (prev === successStories.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, successStories.length]);
 
  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentStory((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
  };
 
  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentStory((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
  };
 
  const handleImageUpload = (index, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const updatedStories = [...successStories];
          updatedStories[index] = {
            ...updatedStories[index],
            image: result
          };
          setSuccessStories(updatedStories);
        }
      };
      reader.readAsDataURL(file);
    }
  };
 
  return (
    <div className="flex flex-col min-h-screen bg-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
 
      {/* Main Content */}
      <main className="
        flex-grow
        py-8 2xs:py-8 xs:py-10 2sm:py-12 sm:py-14 md:py-16 md800:py-16 md900:py-16 lg:py-18 xl:py-20 2xl:py-24 3xl:py-28
        px-2 2xs:px-2 xs:px-3 2sm:px-4 sm:px-6 md:px-6 md800:px-7 md900:px-7 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16
      ">
        <div className="
          mx-auto
          max-w-[90%] 2xs:max-w-[90%] xs:max-w-[85%] 2sm:max-w-[80%] sm:max-w-4xl md:max-w-5xl md800:max-w-5xl md900:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-[100rem]
        ">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="
              text-2xl 2xs:text-2xl xs:text-3xl 2sm:text-3xl sm:text-4xl md:text-4xl md800:text-5xl md900:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl
              font-extrabold text-center text-white
              mb-6 2xs:mb-6 xs:mb-6 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-9 md900:mb-9 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
            "
          >
            Success Beyond the Classroom
          </motion.h1>
 
          {/* Stats Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="
              bg-white rounded-2xl shadow-2xl
              p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14
              mb-8 2xs:mb-8 xs:mb-10 2sm:mb-12 sm:mb-14 md:mb-16 md800:mb-16 md900:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24 3xl:mb-28
              overflow-hidden
            "
          >
            <div className="text-center mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16">
              <h2 className="
                text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl
                font-bold text-indigo-900
              ">
                LauraTek's Placement Journeys
              </h2>
              <p className="
                text-gray-600 mt-2
                text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
              ">
                Transforming students into industry-ready professionals
              </p>
            </div>
           
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="
                grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 md800:grid-cols-3 md900:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3
                gap-4 2xs:gap-4 xs:gap-5 2sm:gap-5 sm:gap-6 md:gap-6 md800:gap-7 md900:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14
                mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
              "
            >
              <motion.div
                variants={fadeInUp}
                className="
                  bg-indigo-50
                  p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                  rounded-lg hover:shadow-lg transition-all
                "
              >
                <h3 className="
                  text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                  font-semibold text-indigo-900
                ">
                  3 Full Batches
                </h3>
                <p className="
                  text-gray-600
                  text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
                ">
                  Transformed in just 9 months
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="
                  bg-indigo-50
                  p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                  rounded-lg hover:shadow-lg transition-all
                "
              >
                <h3 className="
                  text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                  font-semibold text-indigo-900
                ">
                  20+ Hiring Partners
                </h3>
                <p className="
                  text-gray-600
                  text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
                ">
                  Including IBM, Cognizant, and more
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="
                  bg-indigo-50
                  p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                  rounded-lg hover:shadow-lg transition-all
                "
              >
                <h3 className="
                  text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                  font-semibold text-indigo-900
                ">
                  Comprehensive Training
                </h3>
                <p className="
                  text-gray-600
                  text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl
                ">
                  Real projects, certifications, and placement prep
                </p>
              </motion.div>
            </motion.div>
 
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16"
            >
              <h3 className="
                text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                font-semibold text-indigo-900 mb-4 text-center
              ">
                Our Placement Partners
              </h3>
              <div className="overflow-hidden relative py-4">
                <motion.div
                  className="flex"
                  initial={{ x: 0 }}
                  animate={{
                    x: `-${partnerLogos.length * (90 / 2)}px`, // Adjusted for smaller screens
                    transition: {
                      x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: partnerLogos.length * 2,
                        ease: 'linear',
                      },
                    },
                  }}
                  style={{
                    display: 'flex',
                    width: `calc(${partnerLogos.length * 2} * (90 / 2))px 2xs:calc(${partnerLogos.length * 2} * (90 / 2))px xs:calc(${partnerLogos.length * 2} * 100px) 2sm:calc(${partnerLogos.length * 2} * 110px) sm:calc(${partnerLogos.length * 2} * 120px) md:calc(${partnerLogos.length * 2} * 130px) md800:calc(${partnerLogos.length * 2} * 140px) md900:calc(${partnerLogos.length * 2} * 150px) lg:calc(${partnerLogos.length * 2} * 160px) xl:calc(${partnerLogos.length * 2} * 180px) 2xl:calc(${partnerLogos.length * 2} * 200px) 3xl:calc(${partnerLogos.length * 2} * 220px)`,
                  }}
                >
                  {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="
                        flex-shrink-0 bg-white
                        p-2 2xs:p-2 xs:p-3 2sm:p-3 sm:p-4 md:p-4 md800:p-4 md900:p-4 lg:p-5 xl:p-6 2xl:p-7 3xl:p-8
                        rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center
                      "
                      style={{
                        width: '90px 2xs:90px xs:100px 2sm:110px sm:120px md:130px md800:140px md900:150px lg:160px xl:180px 2xl:200px 3xl:220px',
                        minWidth: '90px 2xs:90px xs:100px 2sm:110px sm:120px md:130px md800:140px md900:150px lg:160px xl:180px 2xl:200px 3xl:220px',
                        marginRight: '0px',
                      }}
                    >
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="
                          h-8 2xs:h-8 xs:h-9 2sm:h-10 sm:h-10 md:h-11 md800:h-12 md900:h-12 lg:h-14 xl:h-16 2xl:h-18 3xl:h-20
                          w-auto object-contain mb-2
                        "
                        onError={(e) => {
                          const target = e.target;
                          // target.onerror = null;
                          // target.src = '/images/placeholder-logo.png';
                        }}
                      />
                      <span className="
                        text-[0.6rem] 2xs:text-[0.65rem] xs:text-xs 2sm:text-xs sm:text-sm md:text-sm md800:text-sm md900:text-base lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl
                        font-medium text-indigo-900 text-center
                      ">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
 
          {/* Carousel Section */}
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="
              text-xl 2xs:text-xl xs:text-2xl 2sm:text-2xl sm:text-3xl md:text-3xl md800:text-4xl md900:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl
              font-extrabold text-center text-white
              mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
            "
          >
            Student Success Stories
          </motion.h2>
         
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="
              relative bg-white rounded-2xl shadow-2xl overflow-hidden
              mb-8 2xs:mb-8 xs:mb-10 2sm:mb-12 sm:mb-14 md:mb-16 md800:mb-16 md900:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24 3xl:mb-28
              transform hover:scale-[1.005] transition-transform duration-300
            "
          >
            <div className="relative">
              {successStories[currentStory].image ? (
                <motion.img
                  key={currentStory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={successStories[currentStory].image}
                  alt={successStories[currentStory].name}
                  className="
                    w-full
                    h-[200px] 2xs:h-[220px] xs:h-[240px] 2sm:h-[260px] sm:h-[300px] md:h-[350px] md800:h-[400px] md900:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px]
                    object-cover rounded-t-2xl
                  "
                />
              ) : (
                <div className="
                  w-full
                  h-[200px] 2xs:h-[220px] xs:h-[240px] 2sm:h-[260px] sm:h-[300px] md:h-[350px] md800:h-[400px] md900:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] 3xl:h-[650px]
                  bg-gray-200 flex items-center justify-center rounded-t-2xl
                ">
                  <span className="
                    text-gray-500
                    text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                  ">
                    No image uploaded
                  </span>
                </div>
              )}
              <div className="
                absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent
                p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14
              ">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="
                    text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl
                    font-bold text-white
                  "
                >
                  {successStories[currentStory].name}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="
                    text-indigo-200
                    text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                  "
                >
                  {successStories[currentStory].education}
                </motion.p>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="
                    text-white font-medium mt-1 2xs:mt-1 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2 md900:mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 3xl:mt-6
                    text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                  "
                >
                  {successStories[currentStory].placement}
                </motion.p>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="
                    text-white italic
                    mt-2 2xs:mt-2 xs:mt-3 2sm:mt-3 sm:mt-4 md:mt-4 md800:mt-4 md900:mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 3xl:mt-8
                    text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                  "
                >
                  "{successStories[currentStory].quote}"
                </motion.p>
              </div>
              <div className="
                absolute inset-0 flex items-center justify-between
                px-2 2xs:px-2 xs:px-3 2sm:px-4 sm:px-6 md:px-6 md800:px-6 md900:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-14
                opacity-0 hover:opacity-100 transition-opacity
              ">
                <button
                  onClick={handlePrev}
                  className="
                    bg-indigo-600 text-white
                    p-2 2xs:p-2 xs:p-2 2sm:p-2 sm:p-3 md:p-3 md800:p-3 md900:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7
                    rounded-full hover:bg-indigo-700 transition shadow-lg
                  "
                >
                  <ChevronLeft
                    size={16}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="
                    bg-indigo-600 text-white
                    p-2 2xs:p-2 xs:p-2 2sm:p-2 sm:p-3 md:p-3 md800:p-3 md900:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7
                    rounded-full hover:bg-indigo-700 transition shadow-lg
                  "
                >
                  <ChevronRight
                    size={16}
                     className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                  />
                </button>
              </div>
            </div>
          </motion.div>
 
          {/* Student Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="
             grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4
            "
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="
                relative h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] overflow-hidden
                ">
                  {story.image ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="
                        text-gray-500
                        text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                      ">
                        No image uploaded
                      </span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="
                  p-3 2xs:p-3 xs:p-4 2sm:p-4 sm:p-5 md:p-5 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                ">
                  <h3 className="
                    text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                    font-semibold text-indigo-900
                  ">
                    {story.name}
                  </h3>
                  <p className="
                  text-indigo-600 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-base
                  ">
                    {story.education}
                  </p>
                  <p className="
                   text-indigo-800 font-medium mt-1 sm:mt-2 md:mt-2 lg:mt-3 xl:mt-4
                   text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-base
                  ">
                    {story.placement}
                  </p>
                  <p className="
                  text-gray-600 italic
                    mt-1 sm:mt-2 md:mt-3 lg:mt-4
                    text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                  ">
                    "{story.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
 
          {/* Innovations Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="
              bg-white rounded-2xl shadow-2xl
              p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-7 md900:p-7 lg:p-8 xl:p-10 2xl:p-12 3xl:p-14
              mt-8 2xs:mt-8 xs:mt-10 2sm:mt-12 sm:mt-14 md:mt-16 md800:mt-16 md900:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 3xl:mt-28
              overflow-hidden
            "
          >
            <h2 className="
              text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-2xl md:text-2xl md800:text-3xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl
              font-bold text-center text-indigo-900
              mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
            ">
              Our Innovations
            </h2>
            <p className="
              text-center text-gray-600
              mb-6 2xs:mb-6 xs:mb-7 2sm:mb-7 sm:mb-8 md:mb-8 md800:mb-8 md900:mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 3xl:mb-16
              text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
            ">
              Driving Impact Across Education, HR, and Healthcare
            </p>
           
            <div className="
              grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md800:grid-cols-2 md900:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2
              gap-4 2xs:gap-4 xs:gap-5 2sm:gap-5 sm:gap-6 md:gap-6 md800:gap-7 md900:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14
            ">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  bg-indigo-50
                  p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                  rounded-lg overflow-hidden
                "
              >
                <div className="
                  h-[120px] 2xs:h-[140px] xs:h-[160px] 2sm:h-[180px] sm:h-[200px] md:h-[220px] md800:h-[240px] md900:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] 3xl:h-[400px]
                  mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4 md:mb-4 md800:mb-4 md900:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8
                  overflow-hidden rounded-lg
                ">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={hrmsImage}
                    alt="Dohra HRMS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="
                  text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                  font-semibold text-indigo-900
                  mb-2 2xs:mb-2 xs:mb-2 2sm:mb-2 sm:mb-2 md:mb-2 md800:mb-2 md900:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6
                ">
                  Dohra HRMS
                </h3>
                <p className="
                  text-gray-600
                  text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                ">
                  A smart, cloud-based Human Resource Management System built to streamline employee lifecycle management, including onboarding, attendance tracking, payroll automation, and performance insights for modern organizations.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="
                  bg-indigo-50
                  p-4 2xs:p-4 xs:p-5 2sm:p-5 sm:p-6 md:p-6 md800:p-6 md900:p-6 lg:p-7 xl:p-8 2xl:p-10 3xl:p-12
                  rounded-lg overflow-hidden
                "
              >
                <div className="
                  h-[120px] 2xs:h-[140px] xs:h-[160px] 2sm:h-[180px] sm:h-[200px] md:h-[220px] md800:h-[240px] md900:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] 3xl:h-[400px]
                  mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4 md:mb-4 md800:mb-4 md900:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8
                  overflow-hidden rounded-lg
                ">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={mediImage}
                    alt="OneStep Medi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="
                  text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                  font-semibold text-indigo-900
                  mb-2 2xs:mb-2 xs:mb-2 2sm:mb-2 sm:mb-2 md:mb-2 md800:mb-2 md900:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6
                ">
                  OneStep Medi
                </h3>
                <p className="
                  text-gray-600
                  text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-base md:text-base md800:text-base md900:text-lg lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                ">
                  A comprehensive digital healthcare platform that facilitates doctor appointments, diagnostic bookings, medicine delivery, and includes dedicated digital marketing services for doctors to enhance their online visibility, patient reach, and brand reputation.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
 
      {/* Footer */}
      <Footer />
    </div>
  );
};
 
export default SuccessStories;