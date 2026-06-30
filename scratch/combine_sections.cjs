const fs = require('fs');

const filePath = 'c:/Users/sathw/OneDrive/Desktop/Laura_Userside/src/pages/Home.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const bannerRegex = /\{\/\* Free UX Design Workshop Banner \*\/\}[\s\S]*?<\/section>/;
const instructorRegex = /\{\/\* MEET OUR EXPERT INSTRUCTOR — 100% EXACT TO YOUR LATEST IMAGE \*\/\}[\s\S]*?<\/section>\s*\*\//;
const bestChoiceRegex = /\{\/\* <section className="py-12 md:py-16 bg-\[#001BB7\] text-white">[\s\S]*?<\/section> \*\//;
const testimonialRegex = /\{\/\* ================== NEW TESTIMONIAL SECTION ================== \*\/\}[\s\S]*?\{\/\* ================== END NEW TESTIMONIAL SECTION ================== \*\/\}/;

const bannerMatch = content.match(bannerRegex);
const instructorMatch = content.match(instructorRegex);
const bestChoiceMatch = content.match(bestChoiceRegex);
const testimonialMatch = content.match(testimonialRegex);

if (!bannerMatch || !instructorMatch || !bestChoiceMatch || !testimonialMatch) {
  console.log("One or more sections not found!");
  process.exit(1);
}

// Extract the contents
let bannerContent = bannerMatch[0];
let testimonialContent = testimonialMatch[0];

// Clean up banner to remove outer section and inner rounded container
let innerBanner = bannerContent
  .replace(/\{\/\* Free UX Design Workshop Banner \*\/\}[\s\S]*?<div className="bg-gradient-to-r from-\[#EAF0FC\] via-\[#F4F4F8\] to-\[#FFF0F4\] rounded-\[32px\] overflow-hidden relative min-h-\[460px\] flex items-center shadow-sm border border-gray-50\/50">/, '')
  .replace(/<\/div>\s*<\/div>\s*<\/section>$/, '');

// Add a container around the inner banner content so it still centers correctly
innerBanner = `
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1650px] relative z-10 mb-20 md:mb-24 mt-10">
          <div className="w-full flex flex-col md:flex-row items-center h-full">
` + innerBanner.replace(/<div className="w-full flex flex-col md:flex-row items-center relative z-10 h-full">/, '') + `
        </div>
`;

// Clean up testimonial to remove outer section
let innerTestimonial = testimonialContent
  .replace(/\{\/\* ================== NEW TESTIMONIAL SECTION ================== \*\/\}[\s\S]*?<section id="success-stories" className="py-24 relative overflow-hidden bg-gradient-to-r from-\[#F4F4FD\] via-\[#FDFDFD\] to-\[#FCF4F7\]">/, '')
  .replace(/<\/section>\s*\{\/\* ================== END NEW TESTIMONIAL SECTION ================== \*\/\}/, '');

// The globe and robot in testimonial need to be repositioned so they don't clash with the top ones.
// In testimonial, change "top-[15%]" to "top-[50%]"
innerTestimonial = innerTestimonial.replace(/top-\[15\%\]/g, 'top-[50%]');

const combinedSection = `
        {/* ================== COMBINED WORKSHOP & TESTIMONIAL SECTION ================== */}
        <section id="success-stories" className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-b from-[#F4F4FD] via-[#FDFDFD] to-[#FCF4F7]">
          
          {/* Background Decorations for Top Part */}
          <div className="absolute top-[8%] left-[4%] text-[#D1D5F5] opacity-80 z-0">
            <svg width="110" height="110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0v24M0 12h24M3 3l18 18M3 21L21 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute top-[8%] right-[6%] z-0">
            <div className="w-16 h-16 opacity-80 -rotate-12 text-[#9333EA]">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M30 60 L70 60 L80 40 L20 40 Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <rect x="40" y="20" width="20" height="20" rx="5" fill="currentColor" />
                <circle cx="45" cy="30" r="2" fill="white" />
                <circle cx="55" cy="30" r="2" fill="white" />
                <path d="M45 15 C45 10 55 10 55 15" stroke="currentColor" strokeWidth="3" fill="none" />
                <path d="M20 40 L30 80 L70 80 L80 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          ${innerBanner}
          ${innerTestimonial}
        </section>
`;

const finalChunk = combinedSection + '\n' + instructorMatch[0] + '\n\n' + bestChoiceMatch[0];

// Create a giant regex to replace everything from Banner to Testimonial
const fullRegex = new RegExp(
  bannerRegex.source + '[\\s\\S]*?' + testimonialRegex.source
);

content = content.replace(fullRegex, finalChunk);
fs.writeFileSync(filePath, content, 'utf-8');
console.log("Successfully combined sections.");
