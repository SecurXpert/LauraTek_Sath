// // src/pages/Alumni.tsx
// import Header from "@/components/Header"; // Adjust path if needed
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// const Alumni = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         {/* Section Title */}
//         <div className="text-center mb-12">
//           <p className="text-sm font-medium text-blue-600 tracking-wider uppercase mb-2">
//             Our Testimonials
//           </p>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             What Students Think And Say
//             <br />
//             <span className="text-blue-600">About LauraTek</span>
//           </h1>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative">
//           {/* Navigation Arrows */}
//           <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
//             <ChevronLeft className="h-6 w-6 text-gray-600" />
//           </button>
//           <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
//             <ChevronRight className="h-6 w-6 text-gray-600" />
//           </button>

//           {/* Testimonial Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
//             {/* Card 1 */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="flex items-center gap-1 mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <p className="text-lg font-semibold text-blue-600 mb-2">Great Quality!</p>
//               <p className="text-sm text-gray-600 leading-relaxed mb-6">
//                 “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
//                   <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-lg">
//                     W
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Wade Warren</p>
//                   <p className="text-xs text-gray-500">Designer</p>
//                 </div>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="flex items-center gap-1 mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <p className="text-lg font-semibold text-blue-600 mb-2">Great Quality!</p>
//               <p className="text-sm text-gray-600 leading-relaxed mb-6">
//                 “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
//                   <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-orange-600 font-bold text-lg">
//                     J
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Jenny Wilson</p>
//                   <p className="text-xs text-gray-500">Designer</p>
//                 </div>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
//               <div className="flex items-center gap-1 mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <p className="text-lg font-semibold text-blue-600 mb-2">Great Quality!</p>
//               <p className="text-sm text-gray-600 leading-relaxed mb-6">
//                 “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//               </p>
//               <div className="flex items-center gap-3">
//                 <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
//                   <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-pink-600 font-bold text-lg">
//                     K
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">Kristin Watson</p>
//                   <p className="text-xs text-gray-500">Designer</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alumni;




// // src/pages/Alumni.tsx
// import Header from "@/components/Header";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// const Alumni = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         {/* Header Section: Left Title + Right Arrows */}
//         <div className="flex justify-between items-start mb-16">
//           {/* Left: Title */}
//           <div className="max-w-2xl">
//             <p className="text-sm font-medium text-blue-600 tracking-wider uppercase mb-3">
//               Our Testimonials
//             </p>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//               What Students Think And Say
//               <br />
//               <span className="text-gray-900">About LauraTek</span>
//             </h1>
//           </div>

//           {/* Right: Navigation Arrows */}
//           <div className="flex gap-2">
//             <button className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-105">
//               <ChevronLeft className="h-5 w-5 text-gray-700" />
//             </button>
//             <button className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-105">
//               <ChevronRight className="h-5 w-5 text-gray-700" />
//             </button>
//           </div>
//         </div>

//         {/* Testimonial Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Card 1 */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
//             {/* Watermark Quote */}
//             <div className="absolute top-4 right-6 text-8xl text-blue-100 opacity-30 font-serif leading-none pointer-events-none">“</div>

//             {/* Stars */}
//             <div className="flex items-center gap-1 mb-5">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//               ))}
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold text-blue-600 mb-4">
//               Great Quality!
//             </h3>

//             {/* Quote */}
//             <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
//               “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//             </p>

//             {/* Avatar + Name */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
//                   alt="Wade Warren"
//                   className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//                   W
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-lg">Wade Warren</h4>
//                 <p className="text-sm text-gray-500 font-medium">Designer</p>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
//             {/* Watermark Quote */}
//             <div className="absolute top-4 right-6 text-8xl text-yellow-100 opacity-30 font-serif leading-none pointer-events-none">“</div>

//             {/* Stars */}
//             <div className="flex items-center gap-1 mb-5">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//               ))}
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold text-yellow-600 mb-4">
//               Great Quality!
//             </h3>

//             {/* Quote */}
//             <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
//               “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//             </p>

//             {/* Avatar + Name */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
//                   alt="Jenny Wilson"
//                   className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//                   J
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-lg">Jenny Wilson</h4>
//                 <p className="text-sm text-gray-500 font-medium">Designer</p>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
//             {/* Watermark Quote */}
//             <div className="absolute top-4 right-6 text-8xl text-pink-100 opacity-30 font-serif leading-none pointer-events-none">“</div>

//             {/* Stars */}
//             <div className="flex items-center gap-1 mb-5">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//               ))}
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold text-pink-600 mb-4">
//               Great Quality!
//             </h3>

//             {/* Quote */}
//             <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
//               “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
//             </p>

//             {/* Avatar + Name */}
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
//                   alt="Kristin Watson"
//                   className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//                   K
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-lg">Kristin Watson</h4>
//                 <p className="text-sm text-gray-500 font-medium">Designer</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alumni;



// src/pages/Alumni.tsx
import Header from "@/components/Header";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Alumni = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section: Title + Arrows */}
        <div className="flex justify-between items-center mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-600 tracking-wider uppercase mb-3">
              Our Testimonials
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              What Students Think And Say
              <br />
              <span className="text-gray-900">About LauraTek</span>
            </h1>
          </div>

          <div className="flex gap-2 items-center">
            <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.2)] border border-blue-100 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-200 hover:scale-105">
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            </button>
            <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.2)] border border-blue-100 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-200 hover:scale-105">
              <ChevronRight className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Wade Warren */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            {/* Watermark Quote - Top Right */}
            <div className="absolute top-6 right-6 text-[10rem] text-gray-100 opacity-80 font-serif leading-none pointer-events-none select-none">
    ”
  </div>

            <h3 className="text-xl font-bold text-blue-600 mb-2">Great Quality!</h3>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
              “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
            </p>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                alt="Wade Warren"
                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Wade Warren</h4>
                <p className="text-sm text-gray-500 font-medium">Designer</p>
              </div>
            </div>
          </div>

          {/* Card 2 - Jenny Wilson */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            {/* Watermark Quote - Top Right */}
           <div className="absolute top-6 right-6 text-[10rem] text-gray-100 opacity-80 font-serif leading-none pointer-events-none select-none">
    ”
  </div>

            <h3 className="text-xl font-bold text-blue-600 mb-2">Great Quality!</h3>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
              “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
            </p>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                alt="Jenny Wilson"
                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Jenny Wilson</h4>
                <p className="text-sm text-gray-500 font-medium">Designer</p>
              </div>
            </div>
          </div>

          {/* Card 3 - Kristin Watson */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            {/* Watermark Quote - Top Right */}
           <div className="absolute top-6 right-6 text-[10rem] text-gray-100 opacity-80 font-serif leading-none pointer-events-none select-none">
    ”
  </div>

            <h3 className="text-xl font-bold text-blue-600 mb-2">Great Quality!</h3>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8 pl-1">
              “when an unknown printer took a galley of type and scrambled it to make a type specimen book has”
            </p>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                alt="Kristin Watson"
                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Kristin Watson</h4>
                <p className="text-sm text-gray-500 font-medium">Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;