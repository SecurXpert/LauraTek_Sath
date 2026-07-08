import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import guest12Img from '@/assets/guest12.png';

const ContactFAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of courses do you offer?",
      answer: "We offer a wide variety of courses ranging from web development, data science, to digital marketing. Whether you are a beginner or a professional, we have something for everyone."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, many of our courses are self-paced, allowing you to learn at your convenience. Some courses also have live sessions for an interactive experience."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Absolutely! Upon successful completion of a course, you will receive a verifiable certificate that you can showcase on your resume and LinkedIn profile."
    },
    {
      question: "What is the cost of the courses?",
      answer: "The cost varies depending on the specific course. We offer both free introductory courses and premium comprehensive programs. Check the course details for specific pricing."
    }
  ];

  return (
        <section className="pt-12 pb-4 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* FAQ Illustration */}
              <div className="w-full flex justify-center lg:justify-end pr-0 lg:pr-10 relative">
                 <img src={guest12Img} alt="FAQ Illustration" className="max-w-full h-auto drop-shadow-2xl object-contain max-h-[500px]" />
              </div>

              {/* FAQ Accordion */}
              <div className="w-full max-w-xl">
                <div className="inline-flex items-center gap-2 bg-[#A800B8] text-white px-5 py-1.5 rounded-full text-[13px] font-semibold mb-6 shadow-sm relative">
                  FAQ'S
                  <div className="absolute -top-10 -right-8 text-[#A800B8] opacity-80">
                    <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 3v3m4-1l-2 2M7 5l2 2m-5 5h3m10 0h3" />
                    </svg>
                  </div>
                </div>
                <h2 className="font-dm-sans text-[34px] md:text-[42px] font-extrabold text-[#050816] leading-[1.2] mb-10">
                  Frequently <span className="text-[#050816] relative inline-block">
                    Asked
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 3 Q 25 8 50 3 T 100 3" stroke="#1D4ED8" strokeWidth="2.5" fill="none"/>
                       <path d="M0 6 Q 25 11 50 6 T 100 6" stroke="#1D4ED8" strokeWidth="2.5" fill="none" opacity="0.6"/>
                    </svg>
                  </span> Questions.
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-transparent bg-[#1E3A8A] shadow-md text-white' : 'border-gray-100 bg-white text-gray-800'}`}>
                      <button 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className={`w-full flex items-center justify-between p-5 text-left font-bold text-[15px] transition-colors ${openFaq === index ? 'text-white' : 'hover:text-[#1E3A8A]'}`}
                      >
                        {faq.question}
                        {openFaq === index ? (
                          <ChevronUp className={`w-5 h-5 ${openFaq === index ? 'text-white' : 'text-gray-400'}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${openFaq === index ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-5 pb-5 text-blue-100 text-[14px] leading-relaxed animate-in slide-in-from-top-2 duration-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default ContactFAQSection;
