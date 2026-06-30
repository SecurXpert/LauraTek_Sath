const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'src/pages/Home.tsx');
let content = fs.readFileSync(homePath, 'utf8');

const markers = [
    { name: 'HeroSection', start: '{/* Hero Section */}', end: '{/* NEW HERO SECTION BASED ON SCREENSHOT */}' },
    { name: 'HeroSectionNew', start: '{/* NEW HERO SECTION BASED ON SCREENSHOT */}', end: '{/* Browse Categories Section */}' },
    { name: 'BrowseCategoriesSection', start: '{/* Browse Categories Section */}', end: '{/* Top Category Section */}' },
    { name: 'TopCategorySection', start: '{/* Top Category Section */}', end: '{/* WHAT MAKES LAURATEK UNIQUE? \u2013 100% EXACT LIKE YOUR IMAGE */}' },
    { name: 'UniqueSection', start: '{/* WHAT MAKES LAURATEK UNIQUE?', end: '{/* About Us Section */}' },
    { name: 'AboutUsSection', start: '{/* About Us Section */}', end: '{/* Popular Courses Section */}' },
    { name: 'PopularCoursesSection', start: '{/* Popular Courses Section */}', end: '{/* Why Choose Us Section */}' },
    { name: 'WhyChooseUsSection', start: '{/* Why Choose Us Section */}', end: '{/* Trending Courses Section */}' },
    { name: 'TrendingCoursesSection', start: '{/* Trending Courses Section */}', end: '{/* ================== COMBINED WORKSHOP & TESTIMONIAL SECTION ================== */}' },
    { name: 'WorkshopTestimonialSection', start: '{/* ================== COMBINED WORKSHOP & TESTIMONIAL SECTION ================== */}', end: '{/* ================== CONTACT & FAQ SECTION ================== */}' },
    { name: 'ContactFaqSection', start: '{/* ================== CONTACT & FAQ SECTION ================== */}', end: '{/* ================== NEWSLETTER & FOOTER SECTION ================== */}' },
    { name: 'NewsletterFooterSection', start: '{/* ================== NEWSLETTER & FOOTER SECTION ================== */}', end: '{/* <Footer /> */}' }
];

const getImports = () => `import React from "react";
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
`;

if (!fs.existsSync(path.join(__dirname, 'src/components/home'))) {
    fs.mkdirSync(path.join(__dirname, 'src/components/home'));
}

const components = [];

for (const marker of markers) {
    const startIndex = content.indexOf(marker.start);
    if (startIndex === -1) {
        console.log("Could not find start for", marker.name);
        continue;
    }
    
    let endIndex = content.length;
    let foundEnd = false;
    
    const markerIndex = markers.findIndex(m => m.name === marker.name);
    if (markerIndex < markers.length - 1) {
        const nextMarkerStartIndex = content.indexOf(markers[markerIndex + 1].start, startIndex + 1);
        if (nextMarkerStartIndex !== -1) {
            endIndex = nextMarkerStartIndex;
            foundEnd = true;
        }
    }
    
    if (!foundEnd && marker.end) {
        const tryEnd = content.indexOf(marker.end, startIndex + 1);
        if (tryEnd !== -1) {
            endIndex = tryEnd;
        }
    }

    const sectionContent = content.substring(startIndex, endIndex);
    
    const props = [];
    if (sectionContent.includes("activeCourseTab")) props.push("activeCourseTab", "setActiveCourseTab");
    if (sectionContent.includes("openFaq")) props.push("openFaq", "setOpenFaq");
    if (sectionContent.includes("faqs")) props.push("faqs");
    if (sectionContent.includes("handleSubmit")) {
        props.push("formData", "handleChange", "handleBlur", "handleSubmit", "isSubmitting", "isValid", "touched", "errors", "submitMessage");
    }
    if (sectionContent.includes("testimonials")) props.push("testimonials", "currentIndex", "setCurrentIndex", "isTransitioning", "setIsTransitioning");
    
    let propsString = "";
    if (props.length > 0) {
        propsString = "{ " + props.join(", ") + " }: any";
    }

    let componentCode = getImports() + "\n\nconst " + marker.name + " = (" + propsString + ") => {\n  const navigate = useNavigate();\n  return (\n    <>\n      " + sectionContent + "\n    </>\n  );\n};\n\nexport default " + marker.name + ";\n";
    
    fs.writeFileSync(path.join(__dirname, 'src/components/home/' + marker.name + '.tsx'), componentCode);
    components.push({ name: marker.name, props });
    console.log("Created", marker.name);
}

console.log(JSON.stringify(components, null, 2));
