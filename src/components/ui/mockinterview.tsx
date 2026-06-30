// import React , {useState} from "react";

// import Sidebar from "../sidebar";
// import { Brain, Clock, Code2, Database, FileQuestion, PlayCircle, BarChart3, CheckCircle } from "lucide-react";

// import Profileheader from "@/components/ui/Profileheader";

// export default function MockInterview() {

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [active, setActive] = useState("Sessions");
//   const [activeTab, setActiveTab] = useState("MOCK SESSIONS");

//   const tabs = [
//     "MOCK SESSIONS",
//     "MENTORSHIP SESSIONS",
//     "Placement Mocks",
//     "Others",
//     "HR Expert Sessions",
//     "Fundamentals",
//     "Frontend",
//     "DSA",
//     "Backend"
//   ];

 
//   return (
//     <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-900 leading-relaxed overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Header */}
//         <Profileheader />

//         {/* Content Area */}
//         <main className="p-6 flex-1 overflow-auto">
//         <div className="w-full min-h-screen bg-white text-gray-800">
//       {/* Main container */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">

//         {/* Title */}
//         <h2 className="text-2xl font-bold">Mock Interviews</h2>

//         {/* Hero Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 items-center">

//           {/* Left side */}
//           <div className="space-y-6">
//             <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-blue-700">
//               Ace Any <br /> Tech Interview <br /> With AI Coaching
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Revolutionary AI-powered interview preparation that analyzes your
//               performance in real-time and provides personalized feedback to guarantee
//               interview success.
//             </p>

//             {/* Stats */}
//             <div className="flex items-center gap-10 mt-6">
//               <div>
//                 <h3 className="text-3xl font-bold text-blue-600">97%</h3>
//                 <p className="text-gray-500 text-sm">Success Rate</p>
//               </div>
//               <div>
//                 <h3 className="text-3xl font-bold text-purple-600">500K+</h3>
//                 <p className="text-gray-500 text-sm">Practice Sessions</p>
//               </div>
//             </div>
//           </div>

//           {/* Right panel (AI Progress Card) */}
//           <div className="w-full bg-white shadow-xl rounded-2xl border p-6 space-y-6">
//             <h3 className="font-bold text-lg">AI Analysis Complete</h3>
//             <p className="text-sm text-gray-600">Processing your interview performance…</p>

//             {/* Score Card */}
//             <div className="bg-gray-50 p-5 rounded-xl">
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Overall Performance Score</span>
//                 <span className="font-bold text-blue-700">87%</span>
//               </div>
//               <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
//                 <div className="h-full bg-blue-600 rounded-full" style={{ width: "87%" }}></div>
//               </div>

//               <div className="flex justify-between mt-4 text-sm">
//                 <span className="text-green-600 font-semibold">Technical Skills: 92%</span>
//                 <span className="text-purple-600 font-semibold">Communication: 84%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* PYTHON INTERVIEW CARD */}
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 border shadow-md rounded-3xl p-6 space-y-4">
//           {/* Header */}
//           <div className="flex items-center gap-4">
//             <img
//               src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
//               className="h-12 w-12"
//               alt="Python"
//             />

//             <div>
//               <h3 className="text-xl font-semibold">Python</h3>
//               <div className="flex gap-2 mt-1">
//                 <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
//                   beginner
//                 </span>
//                 <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
//                   tech
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Info Row */}
//           <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mt-3">
//             <span className="flex items-center gap-2"><Database size={16}/> backend</span>
//             <span className="flex items-center gap-2"><FileQuestion size={16}/> 10 Questions</span>
//             <span className="flex items-center gap-2"><Clock size={16}/> 60 min</span>
//             <span className="flex items-center gap-2"><Code2 size={16}/> 1 language</span>
//           </div>

//           {/* Topics */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             {["Data Structures", "OOP", "Modules", "Exception Handling"].map((topic) => (
//               <span
//                 key={topic}
//                 className="px-3 py-1 bg-white border rounded-full text-xs shadow-sm"
//               >
//                 {topic}
//               </span>
//             ))}
//             <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">+ more</span>
//           </div>

//           {/* Start Button */}
//           <div className="text-right mt-5">
//             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 ml-auto">
//               Start Interview <PlayCircle size={18} />
//             </button>
//           </div>
//         </div>

//         {/* HOW IT WORKS SECTION */}
//         <div className="mt-20 text-center">
//           <h3 className="text-blue-600 font-semibold">HOW IT WORKS</h3>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//             Master interviews in <br className="md:hidden" /> 4 simple steps
//           </h1>

//           {/* Steps Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

//             {/* STEP 1 */}
//             <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//               <div className="flex justify-center">
//                 <PlayCircle size={40} className="text-blue-600" />
//               </div>
//               <h4 className="font-bold mt-4">Start Your Practice Session</h4>
//               <p className="text-gray-600 text-sm mt-2">
//                 Choose from 500+ real interview questions customized for your skill level.
//               </p>
//             </div>

//             {/* STEP 2 */}
//             <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//               <div className="flex justify-center">
//                 <Brain size={40} className="text-purple-600" />
//               </div>
//               <h4 className="font-bold mt-4">AI Analyzes Everything</h4>
//               <p className="text-gray-600 text-sm mt-2">
//                 Our AI evaluates your answers and accuracy with 97% precision.
//               </p>
//             </div>

//             {/* STEP 3 */}
//             <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//               <div className="flex justify-center">
//                 <CheckCircle size={40} className="text-green-600" />
//               </div>
//               <h4 className="font-bold mt-4">Get Instant Feedback</h4>
//               <p className="text-gray-600 text-sm mt-2">
//                 Receive detailed insights with suggestions for better responses.
//               </p>
//             </div>

//             {/* STEP 4 */}
//             <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//               <div className="flex justify-center">
//                 <BarChart3 size={40} className="text-yellow-600" />
//               </div>
//               <h4 className="font-bold mt-4">Track Your Progress</h4>
//               <p className="text-gray-600 text-sm mt-2">
//                 Monitor improvement across all skills with detailed analytics.
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>

//         </main>
//       </div>
//     </div>
//   );
// };


// import React, { useState, useEffect } from "react";

// import Sidebar from "../sidebar";
// import { Menu,  } from "lucide-react";


// import {
//   Brain,
//   Clock,
//   Code2,
//   Database,
//   FileQuestion,
//   PlayCircle,
//   BarChart3,
//   CheckCircle,
//   X,
//   Mail,
//   User,
//   BookOpen,
//   Send,
//   Calendar
// } from "lucide-react";
// import Profileheader from "@/components/ui/Profileheader";
 
// export default function MockInterview() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [active, setActive] = useState("Sessions");
 
//   // Popup State
//   const [showForm, setShowForm] = useState(false);
//   const [formError, setFormError] = useState("");
//     const [errors, setErrors] = useState<any>({});


//     const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   education: "",
//   technology: "",
//   message: "",
//   interviewDate: "",
//   interviewTime: "",
// });

  



  
// useEffect(() => {
//   if (!showForm) {
//     setFormData({
//       name: "",
//       email: "",
//       education: "",
//       technology: "",
//       message: "",
//       interviewDate: "",
//       interviewTime: "",
//     });
//     setErrors({});
//     setFormError("");
//   }
// }, [showForm]);



 
 
//   // Topics state
//   const [showMoreTopics, setShowMoreTopics] = useState(false);
 
//   const topics = [
//     "Variables & Data Types",
//     "Operators",
//     "Functions",
//     "Decorators",
//     "Loops",
//     "Conditional Statements",
//     "OOP Concepts",
//     "Error Handling",
//     "Lists & Tuples",
//     "Dictionaries",
//     "Modules & Packages",
//   ];


  
 
//  /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     /* ---------- NAME ---------- */
//     if (name === "name") {
//       if (value.startsWith(" ")) return;
//       if (!/^[A-Za-z\s]*$/.test(value)) return;
//       if (value.length > 30) return;

//       setFormData(p => ({ ...p, name: value }));
//       setErrors(p => ({ ...p, name: "" }));
//       return;
//     }

//     /* ---------- EMAIL ---------- */
//     if (name === "email") {
//       setFormData(p => ({ ...p, email: value }));
//       setErrors(p => ({ ...p, email: "" }));
//       return;
//     }

//     /* ---------- EDUCATION ---------- */
//     if (name === "education") {
//       if (value.startsWith(" ")) return;
//       if (/\d/.test(value)) return;
//       if (value.length > 30) return;

//       setFormData(p => ({ ...p, education: value }));
//       setErrors(p => ({ ...p, education: "" }));
//       return;
//     }

//     /* ---------- TECHNOLOGY ---------- */
//     if (name === "technology") {
//       if (value.startsWith(" ")) return;
//       if (/\d/.test(value)) return;
//       if (value.length > 30) return;

//       setFormData(p => ({ ...p, technology: value }));
//       setErrors(p => ({ ...p, technology: "" }));
//       return;
//     }

//     /* ---------- MESSAGE ---------- */
//     if (name === "message") {
//       if (value.startsWith(" ")) return;
//       if (value.length > 100) return;

//       setFormData(p => ({ ...p, message: value }));
//       setErrors(p => ({ ...p, message: "" }));
//       return;
//     }

//     setFormData(p => ({ ...p, [name]: value }));
//   };
//  /* ================= HANDLE SUBMIT ================= */
//   const handleSubmit = () => {
//     const e: any = {};



//     if (formData.name.trim().length < 3)
//       e.name = "Name must be between 3 and 30 characters";

//     if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     )
//       e.email = "Enter a valid email address";

//     if (formData.education.trim().length < 3)
//       e.education = "Education must be between 3 and 30 characters";

//     if (formData.technology.trim().length < 2)
//       e.technology = "Technology must be between 2 and 30 characters";

//     if (formData.message.trim().length < 3)
//       e.message = "Message must be between 3 and 100 characters";

    
//   if (!formData.name.trim()) e.name = "Name is required";
//   if (!formData.email.trim()) e.email = "Email is required";
//   if (!formData.education.trim()) e.education = "Education is required";
//   if (!formData.technology.trim()) e.technology = "Technology is required";
//   if (!formData.message.trim()) e.message = "Message is required";

//   if (!formData.interviewDate)
//     e.interviewDate = "Interview date is required";

//   if (!formData.interviewTime)
//     e.interviewTime = "Interview time is required";

//     setErrors(e);
//     if (Object.keys(e).length > 0) return;

//     alert("Interview Request Submitted Successfully!");
//     setShowForm(false);
//   };
 
//   return (
//     <div className="fixed inset-0 w-full h-full flex bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-900 leading-relaxed overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />
 
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         {/* Header */}
//         <Profileheader />

//         <div className="lg:hidden py-4 flex justify-end">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 
//                        text-white rounded-lg shadow-md hover:shadow-lg 
//                        transition-all duration-300"
//           >
//             {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
//           </button>
//         </div>
         


        
 
//         {/* Content Area */}
//         <main className="p-6 flex-1 overflow-auto">
//           <div className="w-full min-h-screen bg-white text-gray-800">
//             <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
//               {/* Title */}
//               <h2 className="text-2xl font-bold">Mock Interviews</h2>
 
//               {/* Hero Section */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 items-center">
//                 <div className="space-y-6">
//                   <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-blue-700">
//                     Ace Any <br /> Tech Interview <br /> With AI Coaching
//                   </h1>
//                   <p className="text-gray-600 text-lg">
//                     Revolutionary AI-powered interview preparation that analyzes your
//                     performance in real-time and provides personalized feedback to guarantee
//                     interview success.
//                   </p>
 
//                   <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
//   {/* Success Rate Box */}
//   <div className="p-6 sm:p-8 border rounded-2xl bg-white shadow-md text-center min-h-[140px] flex flex-col justify-center">
//     <h3 className="text-4xl font-bold text-blue-600">97%</h3>
//     <p className="text-gray-500 text-base mt-2">Success Rate</p>
//   </div>

//   {/* Practice Sessions Box */}
//   <div className="p-6 sm:p-8 border rounded-2xl bg-white shadow-md text-center min-h-[140px] flex flex-col justify-center">
//     <h3 className="text-4xl font-bold text-purple-600">500K+</h3>
//     <p className="text-gray-500 text-base mt-2">Practice Sessions</p>
//   </div>
// </div>

//                 </div>
 
//       <div className="w-full bg-white shadow-xl rounded-2xl border overflow-hidden">

//   {/* 🔹 TOP BAR (3 dots + title) */}
//   <div className="flex items-center justify-between px-5 py-3 ">
//   {/* Left: window dots */}
//   <div className="flex items-center gap-2">
//     <span className="w-3 h-3 rounded-full bg-red-500"></span>
//     <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
//     <span className="w-3 h-3 rounded-full bg-green-500"></span>
//   </div>

//   {/* Right: title */}
//   <span className="text-sm font-medium text-gray-500">
//     AI Interview Coach
//   </span>
// </div>


//   {/* 🔹 MAIN CONTENT */}
//   <div className="p-6 space-y-6">
//     <div className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4">
//   {/* AI Analyze Image */}
//   <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
//     <img
//       src="/ai-analyze.png"   // your AI image path
//       alt="AI Analysis"
//       className="w-6 h-6"
//     />
//   </div>

//   {/* Text Content */}
//   <div>
//     <h3 className="font-bold text-lg text-gray-900">
//       AI Analysis Complete
//     </h3>
//     <p className="text-sm text-gray-600">
//       Processing your interview performance…
//     </p>
//   </div>
// </div>


//     <div className="bg-gray-50 p-5 rounded-xl">
//       <div className="flex justify-between text-sm text-gray-600">
//         <span>Overall Performance Score</span>
//         <span className="font-bold text-blue-700">87%</span>
//       </div>

//       <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
//         <div
//           className="h-full bg-blue-600 rounded-full"
//           style={{ width: "87%" }}
//         ></div>
//       </div>

//       {/* 🔹 SKILL CARDS */}
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Technical Skills */}
//         <div className="p-4 border rounded-xl bg-green-50 shadow-sm">
//           <p className="text-sm text-green-600 mb-1">Technical Skills</p>
//           <p className="text-2xl font-bold text-green-600">92%</p>
//         </div>

//         {/* Communication */}
//         <div className="p-4 border rounded-xl bg-purple-50 shadow-sm">
//           <p className="text-sm text-purple-600 mb-1">Communication</p>
//           <p className="text-2xl font-bold text-purple-600">84%</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//               </div>
 
//               {/* Python Card */}
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border shadow-md rounded-3xl p-6 space-y-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
//                     className="h-12 w-12"
//                     alt="Python"
//                   />
 
//                   <div>
//                     <h3 className="text-xl font-semibold">Python</h3>
//                     <h4 className="text-xs text-gray ">High-level programming language </h4>
//                     <div className="flex gap-2 mt-1">
//                       <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">beginner</span>
//                       <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">tech</span>
//                     </div>
//                   </div>
//                 </div>
 
//                 <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mt-3">
//                   <span className="flex items-center gap-2"><Database size={16} /> backend</span>
//                   <span className="flex items-center gap-2"><FileQuestion size={16} /> 10 Questions</span>
//                   <span className="flex items-center gap-2"><Clock size={16} /> 60 min</span>
//                   <span className="flex items-center gap-2"><Code2 size={16} /> 1 language</span>
//                 </div>
 
//                 {/* Topics */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   {(showMoreTopics ? topics : topics.slice(0, 4)).map((t) => (
//                     <span
//                       key={t}
//                       className="px-3 py-1 bg-white border rounded-full text-xs shadow-sm"
//                     >
//                       {t}
//                     </span>
//                   ))}
 
//                   <button
//                     onClick={() => setShowMoreTopics(!showMoreTopics)}
//                     className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200"
//                   >
//                     {showMoreTopics ? "Show Less -" : "+ More"}
//                   </button>
//                 </div>
 
//                 {/* Start Button */}
//                 <div className="text-right mt-5">
//                   <button
//                     onClick={() => setShowForm(true)}
//                     className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md flex items-center gap-2 ml-auto"
//                   >
//                     Schedule Interview <PlayCircle size={18} />
//                   </button>
//                 </div>
//               </div>
 
//               {/* HOW IT WORKS */}
//               <div className="mt-20 text-center">
//                 <h3 className="text-blue-600 font-semibold">HOW IT WORKS</h3>
//                 <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//                   Master interviews in <br className="md:hidden" /> 4 simple steps
//                 </h1>
 
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//                   <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//                     <div className="flex justify-center">
//                       <PlayCircle size={40} className="text-blue-600" />
//                     </div>
//                     <h4 className="font-bold mt-4">Start Your Practice Session</h4>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Choose from 500+ real interview questions customized for your skill level.
//                     </p>
//                   </div>
 
//                   <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//                     <div className="flex justify-center">
//                       <Brain size={40} className="text-purple-600" />
//                     </div>
//                     <h4 className="font-bold mt-4">AI Analyzes Everything</h4>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Our AI evaluates your answers and accuracy with 97% precision.
//                     </p>
//                   </div>
 
//                   <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//                     <div className="flex justify-center">
//                       <CheckCircle size={40} className="text-green-600" />
//                     </div>
//                     <h4 className="font-bold mt-4">Get Instant Feedback</h4>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Receive detailed insights with suggestions for better responses.
//                     </p>
//                   </div>
 
//                   <div className="p-6 bg-white border rounded-2xl shadow hover:shadow-lg transition">
//                     <div className="flex justify-center">
//                       <BarChart3 size={40} className="text-yellow-600" />
//                     </div>
//                     <h4 className="font-bold mt-4">Track Your Progress</h4>
//                     <p className="text-gray-600 text-sm mt-2">
//                       Monitor improvement across all skills with detailed analytics.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
 
//       {/* Popup Form */}
//      {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">

//             {/* Close Button */}
//             <button
//               className="absolute right-4 top-4 text-gray-500 hover:text-black"
//               onClick={() => setShowForm(false)}
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-bold mb-6 text-center">
//               Interview Request Form
//             </h2>

//             <div className="space-y-4">

//               {/* NAME */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <User size={18} /> Name<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                   placeholder="Enter your name"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//               </div>

//               {/* EMAIL */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <Mail size={18} /> Email<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//               </div>

//               {/* EDUCATION */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <BookOpen size={18} /> Education<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="education"
//                   value={formData.education}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                   placeholder="Enter your education"
//                 />
//                 {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
//               </div>

//               {/* TECHNOLOGY */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <Code2 size={18} /> Technology Interested<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="technology"
//                   value={formData.technology}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                   placeholder="Ex: Python, Java, React"
//                 />
//                 {errors.technology && <p className="text-red-500 text-sm">{errors.technology}</p>}
//               </div>

//               {/* MESSAGE */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <Send size={18} /> Message<span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={4}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                   placeholder="Write your message..."
//                 />
//                 {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//               </div>

//               {/* DATE */}
//               <div>
//                 <label className="font-semibold flex items-center gap-2">
//                   <Calendar size={18} /> Interview Date<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   name="interviewDate"
//                   value={formData.interviewDate}
//                   onChange={handleChange}
//                   className="w-full mt-1 p-3 border rounded-xl"
//                 />
//               </div>

//               {/* TIME */}
//               <div>
//   <label className="font-semibold flex items-center gap-2">
//     <Clock size={18} /> Interview Time<span className="text-red-500">*</span>
//   </label>

//   <input
//     type="time"
//     name="interviewTime"
//     value={formData.interviewTime}
//     onChange={(e) =>
//       setFormData((p) => ({
//         ...p,
//         interviewTime: e.target.value,
//       }))
//     }
//     className="w-full mt-1 p-3 border rounded-xl"
//   />
// </div>


//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
//               >
//                 Submit Request
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// }
 
 
