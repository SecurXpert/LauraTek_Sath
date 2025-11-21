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