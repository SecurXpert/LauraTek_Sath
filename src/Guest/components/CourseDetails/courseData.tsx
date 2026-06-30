import React from 'react';
import { Code2, Globe, BarChart, Award } from 'lucide-react';

export const getCourseContent = (title: string, category: string) => {
  const t = title.toLowerCase();
  
  // Data Analytics / SQL Profile
  if (t.includes('data') || t.includes('sql') || category === 'Data Science') {
    return {
      whatYouWillLearn: [
        "Analyze complex datasets with Python and Pandas",
        "Master SQL for database querying",
        "Create interactive dashboards with Tableau",
        "Implement basic machine learning models",
        "Data cleaning and preprocessing techniques",
        "Statistical analysis and hypothesis testing"
      ],
      features: [
        { icon: <Code2 className="w-6 h-6 text-[#F97316]" />, title: "Hands-on Labs", desc: "15 sessions", bg: "bg-orange-50" },
        { icon: <Globe className="w-6 h-6 text-[#3B82F6]" />, title: "Real Datasets", desc: "8 projects", bg: "bg-blue-50" },
        { icon: <BarChart className="w-6 h-6 text-[#A855F7]" />, title: "Case Studies", desc: "12 total", bg: "bg-purple-50" },
        { icon: <Award className="w-6 h-6 text-[#22C55E]" />, title: "Certificate", desc: "Included", bg: "bg-green-50" }
      ],
      requirements: [
        "Basic understanding of mathematics",
        "No prior coding experience required",
        "A computer with internet access"
      ],
      curriculum: [
         { id: 1, title: "Introduction to Data Analytics", lessonsCount: 4, items: [
            { type: "video", title: "What is Data Analytics?", duration: "10:00", isPreview: true },
            { type: "video", title: "Setting up Python & Jupyter", duration: "15:20", isPreview: true },
            { type: "locked", title: "Basic Statistics", duration: "25:00", isPreview: false },
         ]},
         { id: 2, title: "SQL for Data Analysis", lessonsCount: 3, items: [
            { type: "video", title: "Intro to SQL", duration: "12:00", isPreview: true },
            { type: "locked", title: "Advanced Queries", duration: "30:00", isPreview: false },
            { type: "locked", title: "Database Design", duration: "45:00", isPreview: false },
         ] },
         { id: 3, title: "Data Visualization", lessonsCount: 5, items: [
            { type: "video", title: "Why Visualization Matters", duration: "08:00", isPreview: true },
            { type: "locked", title: "Tableau Basics", duration: "22:00", isPreview: false },
            { type: "locked", title: "Building Dashboards", duration: "35:00", isPreview: false },
         ] }
      ],
      instructor: {
        name: "Priya Sharma",
        title: "Lead Data Scientist • 8+ years experience",
        bio: "Priya is a former Data Scientist at Amazon. She specializes in making complex data concepts easy to understand for beginners.",
        rating: 4.8, students: "32K", courses: 5
      },
      reviews: [
        { name: "Amit Kumar", date: "Jan 2026", rating: 5, text: "Excellent course! The Python exercises were exactly what I needed to kickstart my data journey." },
        { name: "Sarah Lee", date: "Dec 2025", rating: 4, text: "Great introduction to SQL and Tableau. Would love more advanced ML topics." }
      ]
    };
  }
  
  // Cybersecurity Profile
  if (t.includes('cyber') || category === 'Cybersecurity') {
    return {
      whatYouWillLearn: [
        "Understand core cybersecurity principles",
        "Identify and mitigate network vulnerabilities",
        "Master ethical hacking techniques",
        "Implement secure encryption protocols",
        "Analyze malware and respond to incidents",
        "Prepare for CompTIA Security+ certification"
      ],
      features: [
        { icon: <Code2 className="w-6 h-6 text-[#F97316]" />, title: "Security Labs", desc: "20 sessions", bg: "bg-orange-50" },
        { icon: <Globe className="w-6 h-6 text-[#3B82F6]" />, title: "Simulations", desc: "5 attacks", bg: "bg-blue-50" },
        { icon: <BarChart className="w-6 h-6 text-[#A855F7]" />, title: "Assessments", desc: "10 total", bg: "bg-purple-50" },
        { icon: <Award className="w-6 h-6 text-[#22C55E]" />, title: "Certificate", desc: "Included", bg: "bg-green-50" }
      ],
      requirements: [
        "Basic knowledge of computer networks",
        "Familiarity with operating systems (Windows/Linux)",
        "A computer capable of running virtual machines"
      ],
      curriculum: [
         { id: 1, title: "Introduction to Cybersecurity", lessonsCount: 3, items: [
            { type: "video", title: "The Threat Landscape", duration: "15:00", isPreview: true },
            { type: "video", title: "Basic Security Concepts", duration: "20:00", isPreview: true },
            { type: "locked", title: "Setting up a Kali Linux VM", duration: "35:00", isPreview: false },
         ]},
         { id: 2, title: "Network Security", lessonsCount: 4, items: [
            { type: "locked", title: "OSI Model & TCP/IP", duration: "25:00", isPreview: false },
            { type: "locked", title: "Firewalls & VPNs", duration: "30:00", isPreview: false },
            { type: "locked", title: "Network Sniffing", duration: "40:00", isPreview: false },
         ] },
         { id: 3, title: "Ethical Hacking Basics", lessonsCount: 5, items: [
            { type: "locked", title: "Reconnaissance", duration: "20:00", isPreview: false },
            { type: "locked", title: "Scanning & Enumeration", duration: "35:00", isPreview: false },
            { type: "locked", title: "Gaining Access", duration: "45:00", isPreview: false },
         ] }
      ],
      instructor: {
        name: "David Chen",
        title: "Senior Security Analyst • 12+ years experience",
        bio: "David has worked as a penetration tester and security consultant for top tech firms. He holds CISSP and CEH certifications.",
        rating: 4.9, students: "18K", courses: 3
      },
      reviews: [
        { name: "John Smith", date: "Feb 2026", rating: 5, text: "The hands-on labs with Kali Linux were amazing. Highly recommend this for beginners!" },
        { name: "Maria Garcia", date: "Jan 2026", rating: 5, text: "Clear explanations of complex security concepts. Great instructor." }
      ]
    };
  }
  
  // Default / Web Development Profile
  return {
      whatYouWillLearn: [
        "Build responsive web apps with HTML/CSS",
        "Master React.js and modern hooks",
        "Create RESTful APIs with Node.js",
        "Work with MongoDB & PostgreSQL",
        "Deploy to AWS, Vercel & Netlify",
        "Implement authentication & security"
      ],
      features: [
        { icon: <Code2 className="w-6 h-6 text-[#F97316]" />, title: "Live Coding", desc: "12 sessions", bg: "bg-orange-50" },
        { icon: <Globe className="w-6 h-6 text-[#3B82F6]" />, title: "Deployed Apps", desc: "5 projects", bg: "bg-blue-50" },
        { icon: <BarChart className="w-6 h-6 text-[#A855F7]" />, title: "Assignments", desc: "24 total", bg: "bg-purple-50" },
        { icon: <Award className="w-6 h-6 text-[#22C55E]" />, title: "Certificate", desc: "Included", bg: "bg-green-50" }
      ],
      requirements: [
        "Basic computer skills",
        "No prior programming experience needed",
        "A laptop or desktop computer"
      ],
      curriculum: [
         { id: 1, title: "Getting Started", lessonsCount: 3, items: [
            { type: "video", title: "Introduction & Course Overview", duration: "12:30", isPreview: true },
            { type: "video", title: "Setting Up Your Development Environment", duration: "18:45", isPreview: true },
            { type: "locked", title: "Understanding the Tech Stack", duration: "15:20", isPreview: false }
         ]},
         { id: 2, title: "HTML & CSS Foundations", lessonsCount: 3, items: [
            { type: "locked", title: "HTML5 Semantic Elements", duration: "20:00", isPreview: false },
            { type: "locked", title: "CSS Flexbox & Grid", duration: "35:00", isPreview: false },
            { type: "locked", title: "Responsive Design", duration: "40:00", isPreview: false },
         ] },
         { id: 3, title: "JavaScript Essentials", lessonsCount: 3, items: [
            { type: "locked", title: "Variables, Loops, and Functions", duration: "25:00", isPreview: false },
            { type: "locked", title: "DOM Manipulation", duration: "30:00", isPreview: false },
            { type: "locked", title: "Async JavaScript & Fetch API", duration: "45:00", isPreview: false },
         ] },
         { id: 4, title: "React Fundamentals", lessonsCount: 3, items: [
            { type: "locked", title: "Components & Props", duration: "20:00", isPreview: false },
            { type: "locked", title: "State & Hooks", duration: "35:00", isPreview: false },
            { type: "locked", title: "React Router", duration: "40:00", isPreview: false },
         ] }
      ],
      instructor: {
        name: "Rahul Mehta",
        title: "Senior Software Engineer • 10+ years experience",
        bio: "Rahul is a seasoned full-stack engineer with experience at Google, Flipkart, and multiple startups. He's passionate about making coding education accessible and practical.",
        rating: 4.8, students: "45K", courses: 8
      },
      reviews: [
        { name: "Ishaan Chopra", date: "Dec 2025", rating: 5, text: "Best course I've taken online. The projects are real-world and the mentor support is exceptional." },
        { name: "Meena Pillai", date: "Nov 2025", rating: 5, text: "Rahul explains complex topics in the simplest way possible. Highly recommend!" },
        { name: "Rohan Das", date: "Oct 2025", rating: 4, text: "Excellent content, well-structured curriculum. Could use more practice exercises." }
      ]
  };
};
