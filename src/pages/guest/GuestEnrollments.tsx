import React from 'react';
import { Sparkles, BookOpen, Brain, Code, Video, MessageSquare, Award, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const GuestEnrollments = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-[#5B4FFF]" />,
      iconBg: "bg-[#F4F2FF]",
      title: "200+ Courses",
      desc: "Full stack, data science, design, DevOps, marketing, and more"
    },
    {
      icon: <Brain className="w-6 h-6 text-[#5B4FFF]" />,
      iconBg: "bg-[#F4F2FF]",
      title: "Unlimited Assessments",
      desc: "Test your knowledge with detailed feedback and AI analysis"
    },
    {
      icon: <Code className="w-6 h-6 text-[#3D73FF]" />,
      iconBg: "bg-[#EBF1FF]",
      title: "Unlimited Coding",
      desc: "Practice with 10+ languages, custom tests, and a full debugger"
    },
    {
      icon: <Video className="w-6 h-6 text-[#D83A76]" />,
      iconBg: "bg-[#FFF0F5]",
      title: "Live Classes",
      desc: "12 monthly live sessions with Q&A and replay recordings"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#D4A000]" />,
      iconBg: "bg-[#FFF8DD]",
      title: "Community Access",
      desc: "Post, reply, and connect with 50,000+ active learners"
    },
    {
      icon: <Award className="w-6 h-6 text-[#00A962]" />,
      iconBg: "bg-[#E6F9F0]",
      title: "Verified Certificates",
      desc: "Industry-recognized credentials to add to your LinkedIn and resume"
    }
  ];

  const comparison = [
    { feature: "Course Access", guest: "Preview only", enrolled: "All 200+ courses", isText: true },
    { feature: "Video Lessons", guest: "First 2 lessons", enrolled: "Full HD access", isText: true },
    { feature: "Assessments", guest: "3 attempts only", enrolled: "Unlimited attempts", isText: true },
    { feature: "Compiler Runs", guest: "5 runs only", enrolled: "Unlimited runs", isText: true },
    { feature: "Live Classes", guest: false, enrolled: true, isText: false },
    { feature: "Discussion Forum", guest: "Read-only", enrolled: "Full participation", isText: true },
    { feature: "Certificates", guest: false, enrolled: "Verified certificates", isText: true, enrolledIsText: true },
    { feature: "Progress Tracking", guest: "Basic", enrolled: "Full analytics", isText: true },
    { feature: "Mentor Support", guest: false, enrolled: "1-on-1 sessions", isText: true, enrolledIsText: true },
    { feature: "Job Placement", guest: false, enrolled: "Career assistance", isText: true, enrolledIsText: true },
    { feature: "Downloadable Resources", guest: false, enrolled: true, isText: false },
    { feature: "Mobile App Access", guest: false, enrolled: true, isText: false },
  ];

  const testimonials = [
    {
      quote: "Lauratek's curriculum is hands-on and current. I cracked my Google interview prep in 3 months.",
      name: "Priya Kapoor",
      title: "Software Engineer @ Google",
      initial: "P",
      color: "bg-[#5B4FFF]"
    },
    {
      quote: "The live classes and mentor support made all the difference. Worth every rupee!",
      name: "Rohan Das",
      title: "Full Stack Dev @ Razorpay",
      initial: "R",
      color: "bg-[#45b7ff]"
    },
    {
      quote: "From zero design experience to a design job at Swiggy in 4 months. Lauratek made it possible.",
      name: "Sneha Reddy",
      title: "UI Designer @ Swiggy",
      initial: "S",
      color: "bg-[#5B4FFF]"
    }
  ];

  return (
    <div className="px-4 lg:px-8 py-8 w-full max-w-[1000px] mx-auto">
      
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-br from-[#6b58ff] to-[#45b7ff] rounded-[24px] p-8 lg:p-12 text-center text-white mb-12 shadow-guest shadow-purple-200/50">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[13px] font-medium border border-white/20 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" /> Limited Time — Full Access Offer
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Unlock Your Full Learning Experience</h1>
        <p className="text-[15px] lg:text-[16px] text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Get unlimited access to 200+ courses, live classes, assessments, compiler, certificates, and expert mentorship.
          Join 50,000+ learners who have transformed their careers with Lauratek.
        </p>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl font-bold">₹4,999</span>
            <span className="px-3 py-1 bg-[#D4A000] text-white text-[13px] font-bold rounded-full">67% OFF</span>
          </div>
          <span className="text-white/60 line-through text-[15px]">₹14,999</span>
        </div>

        <button className="flex items-center justify-center gap-2 bg-white text-[#5B4FFF] hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-[15px] mx-auto mb-4 transition-colors shadow-guest">
          Enroll Now — Get Instant Access <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[12px] text-white/70">30-day money-back guarantee · No hidden charges · EMI available</p>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-[20px] font-bold text-slate-800 text-center mb-8">Everything You Get When You Enroll</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-guest">
              <div className={`w-12 h-12 rounded-xl ${feat.iconBg} flex items-center justify-center mb-4`}>
                {feat.icon}
              </div>
              <h3 className="text-[15px] font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-guest overflow-hidden mb-12">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-[18px] font-bold text-slate-800">Guest vs Enrolled — What's the Difference?</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-[14px] font-bold text-slate-800 border-b border-gray-100">Feature</th>
                <th className="py-4 px-6 text-[14px] font-bold text-slate-800 border-b border-gray-100 text-center">Guest</th>
                <th className="py-4 px-6 text-[14px] font-bold text-[#5B4FFF] border-b border-gray-100 text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Enrolled
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 text-[14px] font-medium text-gray-700">{row.feature}</td>
                  
                  <td className="py-4 px-6 text-center">
                    {row.isText || row.guest !== false ? (
                      <span className="text-[13px] text-gray-500">{row.guest}</span>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto stroke-[1.5]" />
                    )}
                  </td>
                  
                  <td className="py-4 px-6 text-center">
                    {row.isText || row.enrolledIsText ? (
                      <span className="text-[13px] font-medium text-[#00A962]">{row.enrolled}</span>
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-[#00A962] mx-auto stroke-[1.5]" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white py-6 rounded-[20px] border border-gray-100 shadow-guest text-center">
          <p className="text-2xl font-bold text-slate-800 mb-1">50K+</p>
          <p className="text-[12px] text-gray-500 font-medium">Active Learners</p>
        </div>
        <div className="bg-white py-6 rounded-[20px] border border-gray-100 shadow-guest text-center">
          <p className="text-2xl font-bold text-slate-800 mb-1">94%</p>
          <p className="text-[12px] text-gray-500 font-medium">Placement Rate</p>
        </div>
        <div className="bg-white py-6 rounded-[20px] border border-gray-100 shadow-guest text-center">
          <p className="text-2xl font-bold text-slate-800 mb-1">4.8★</p>
          <p className="text-[12px] text-gray-500 font-medium">Average Rating</p>
        </div>
        <div className="bg-white py-6 rounded-[20px] border border-gray-100 shadow-guest text-center">
          <p className="text-2xl font-bold text-slate-800 mb-1">30</p>
          <p className="text-[12px] text-gray-500 font-medium">Day Guarantee</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-[18px] font-bold text-slate-800 text-center mb-8">What Our Learners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-guest flex flex-col">
              <p className="text-[14px] text-gray-600 italic mb-6 flex-1">"{test.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${test.color} text-white flex items-center justify-center font-bold text-[14px]`}>
                  {test.initial}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">{test.name}</p>
                  <p className="text-[11px] text-gray-500">{test.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#F4F2FF] border-2 border-[#5B4FFF]/20 rounded-[24px] p-8 lg:p-10 text-center relative overflow-hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Start Your Journey?</h2>
        <p className="text-[14px] text-gray-600 mb-8 max-w-lg mx-auto">
          One enrollment. Unlimited learning. Verified credentials. Career support.
        </p>
        <button className="flex items-center justify-center gap-2 bg-[#5B4FFF] hover:bg-[#4a3fdb] text-white px-8 py-3.5 rounded-full font-bold text-[15px] mx-auto mb-4 transition-colors shadow-guest shadow-purple-200">
          Enroll Now — ₹4,999 <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[12px] text-gray-500">EMI starting at ₹999/month · 30-day money-back guarantee</p>
      </div>

    </div>
  );
};

export default GuestEnrollments;
