// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import Header from "../Header";
// import Footer from "../Footer";
// import { getjobs } from "../../services/apiservices";
// import { Lock } from 'lucide-react';
// import RegistrationDialog from './RegistrationDialog';

// // Wrapper component to handle className for Footer
// const FooterWithClassName = ({ className, ...props }: { className?: string }) => (
//   <div className={className}>
//     <Footer {...props} />
//   </div>
// );

// const JobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [regOpen, setRegOpen] = useState(false);

//   useEffect(() => {
//     // Check for access token in localStorage
//     const token = localStorage.getItem('access_token');
//     setAccessToken(!!token);
   
//     const fetchJobs = async () => {
//       try {
//         const data = await getjobs();
//         setJobs(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load job listings');
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <div className="sticky top-0 z-50 bg-background">
//           <Header />
//         </div>
//         <div className="container py-10 flex-grow">
//           <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
//           <p>Loading...</p>
//         </div>
//         <FooterWithClassName className="bg-background" />
//       </div>
//     );
//   }

//   // Show registration prompt for both error and no access token cases
//   if (error || !accessToken) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <div className="sticky top-0 z-50 bg-background">
//           <Header />
//         </div>
//         <div className="container py-10 flex-grow">
//           <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
//           <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
//             <p className="text-yellow-700">
//               Please register to view job openings.{' '}
//               <Button onClick={() => setRegOpen(true)}>Register now</Button>
//               <RegistrationDialog open={regOpen} setOpen={setRegOpen} />
//             </p>
//           </div>
//         </div>
//         <FooterWithClassName className="bg-background" />
//       </div>
//     );
//   }

//   // Show first 3 jobs unlocked, rest are locked
//   const unlockedJobs = jobs.slice(0, 3);
//   const lockedJobs = jobs.slice(3);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="sticky top-0 z-50 bg-background">
//         <Header />
//       </div>
//       <div className="container py-10 flex-grow">
//         <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {unlockedJobs.map((job) => (
//             <Card key={job.id} className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <CardTitle className="text-xl">{job.designation}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground mb-2"><strong>Company:</strong> {job.company_name}</p>
//                 <p className="text-muted-foreground mb-2"><strong>Location:</strong> {job.location}</p>
//                 <p className="text-muted-foreground mb-2"><strong>Salary:</strong> {job.salary}</p>
//                 <p className="text-muted-foreground mb-4"><strong>Experience:</strong> {job.experience}</p>
//                 <Button asChild>
//                   <Link to={job.url}>View Details</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//           {lockedJobs.map((job) => (
//             <Card key={job.id} className="hover:shadow-lg transition-shadow opacity-75">
//               <CardHeader>
//                 <CardTitle className="text-xl flex items-center">
//                   <Lock className="mr-2 h-5 w-5" />
//                   {job.designation}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground mb-4">Enroll now to unlock this job listing</p>
//                 <Button asChild>
//                   <Link to="/enroll">Enroll Now</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         {lockedJobs.length > 0 && (
//           <div className="mt-6 text-center">
//             <p className="text-muted-foreground mb-4">
//               Want to unlock all job listings?{' '}
//               <Link to="/enroll" className="text-blue-600 hover:underline">
//                 Enroll now
//               </Link>
//             </p>
//           </div>
//         )}
//       </div>
//       <FooterWithClassName className="bg-background" />
//     </div>
//   );
// };

// export default JobsPage;




// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import Header from "../Header";
// import {
//   Dialog,
//   DialogHeader,
//   DialogContent,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
 
// //  Correct Image Paths
// import sql from "@/assets/sql1.jpg";
 
// interface JobsProps {
//   id: string;
//   title: string;
//   image: string;
//   description: string;
// }
 
// interface ApplicationForm {
//   name: string;
//   email: string;
//   phone: string;
//   year: string;
//   qualification: string;
//   experience: string;
//   resume: File | null;
// }
 
// // ------------ Job Card Component ------------
// const JobCard = ({
//   id,
//   title,
//   image,
//   description,
//   openForm,
// }: JobsProps & { openForm: (jobTitle: string) => void }) => {
//   return (
//     <Card
//       className="group overflow-hidden border border-[#001BB7] rounded-2xl
//         hover:shadow-xl hover:-translate-y-1 transition-all duration-300
//         w-full max-w-sm mx-auto"
//     >
//       {/* IMAGE */}
//       <div className="relative overflow-hidden rounded-t-2xl bg-white">
//         <div className="m-[5px]">
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-48 object-cover rounded-t-[calc(2rem-5px)]
//               group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
//       </div>
 
//       {/* CONTENT */}
//       <CardContent className="p-5 space-y-3">
//         <h3 className="text-lg font-semibold text-blue-900 line-clamp-1">
//           {title}
//         </h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           {description}
//         </p>
//       </CardContent>
 
//       {/* BUTTON */}
//       <CardFooter className="px-5 pb-5 pt-0">
//         <Button
//           onClick={() => openForm(title)}
//           className="w-full bg-[#001BB7] hover:bg-[#0018a0]
//             text-white font-medium text-sm py-5 rounded-xl"
//         >
//           Apply Now
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };
 
// // ------------ MAIN COMPONENT ------------
// const Jobs = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [jobTitle, setJobTitle] = useState("");
 
//   const [formData, setFormData] = useState<ApplicationForm>({
//     name: "",
//     email: "",
//     phone: "",
//     year: "",
//     qualification: "",
//     experience: "",
//     resume: null,
//   });
 
//   const openForm = (title: string) => {
//     setJobTitle(title);
//     setIsOpen(true);
//   };
 
//   const handleChange = (e: any) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };
 
//   const handleSubmit = () => {
//     console.log("Form Submitted:", formData);
//     alert("Application Submitted Successfully!");
//     setIsOpen(false);
//   };
 
//   // ------------ JOB DATA ------------
//   const jobsData: JobsProps[] = [
//     {
//       id: "1",
//       title: "Frontend Developer",
//       image: sql,
//       description:
//         "We are looking for a React developer with strong UI/UX and Tailwind CSS experience.",
//     },
//     {
//       id: "2",
//       title: "Backend Developer",
//       image: sql,
//       description:
//         "Seeking a Node.js backend engineer with experience in APIs, databases, and server-side logic.",
//     },
//     {
//       id: "3",
//       title: "UI/UX Designer",
//       image: sql,
//       description:
//         "Looking for a creative designer with experience in Figma, prototyping, and user experience design.",
//     },
//   ];
 
//   return (
//     <>
//       {/* Header */}
//       <div className="sticky top-0 z-50 bg-background">
//         <Header />
//       </div>
 
//       {/* Job Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {jobsData.map((job) => (
//           <JobCard key={job.id} {...job} openForm={openForm} />
//         ))}
//       </div>
 
//       {/* Apply Form Modal */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Apply for {jobTitle}</DialogTitle>
//           </DialogHeader>
 
//           <div className="grid gap-4 mt-3">
//             {/* NAME */}
//             <div>
//               <Label>Name</Label>
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//               />
//             </div>
 
//             {/* EMAIL */}
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//             </div>
 
//             {/* PHONE */}
//             <div>
//               <Label>Phone Number</Label>
//               <Input
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter phone number"
//               />
//             </div>
 
//             {/* YEAR */}
//             <div>
//               <Label>Year of Passed Out</Label>
//               <Input
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 placeholder="Ex: 2022"
//               />
//             </div>
 
//             {/* QUALIFICATION */}
//             <div>
//               <Label>Qualification</Label>
//               <Input
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 placeholder="Ex: B.Tech, MCA"
//               />
//             </div>
 
//             {/* EXPERIENCE */}
//             <div>
//               <Label>Fresher / Experience</Label>
//               <Select
//                 onValueChange={(value) =>
//                   setFormData((prev) => ({ ...prev, experience: value }))
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Fresher">Fresher</SelectItem>
//                   <SelectItem value="Experienced">Experienced</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
 
//             {/* RESUME */}
//             <div>
//               <Label>Upload Resume</Label>
//               <Input
//                 type="file"
//                 name="resume"
//                 onChange={handleChange}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>
//           </div>
 
//           <DialogFooter>
//             <Button
//               onClick={handleSubmit}
//               className="bg-blue-600 text-white w-full"
//             >
//               Submit Application
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };
 
// export default Jobs;


// import { useState } from "react";

// import { Button } from "@/components/ui/button";

// import Header from "../Header";

// import {

//   Dialog,

//   DialogHeader,

//   DialogContent,

//   DialogTitle,

//   DialogFooter,

// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";

// import { Label } from "@/components/ui/label";

// import {

//   Select,

//   SelectTrigger,

//   SelectContent,

//   SelectItem,

//   SelectValue,

// } from "@/components/ui/select";
 
// // ------------------ INTERFACES ------------------

// interface JobsProps {

//   id: string;

//   title: string;

//   description: string;

//   experience: string;

//   location: string;

//   workMode: string;

// }
 
// interface ApplicationForm {

//   name: string;

//   email: string;

//   phone: string;

//   year: string;

//   qualification: string;

//   experience: string;

//   resume: File | null;

// }
 
// // ------------ MAIN COMPONENT ------------

// const Jobs = () => {

//   const [isOpen, setIsOpen] = useState(false);

//   const [jobTitle, setJobTitle] = useState("");
 
//   const [formData, setFormData] = useState<ApplicationForm>({

//     name: "",

//     email: "",

//     phone: "",

//     year: "",

//     qualification: "",

//     experience: "",

//     resume: null,

//   });
 
//   const openForm = (title: string) => {

//     setJobTitle(title);

//     setIsOpen(true);

//   };
 
//   const handleChange = (e: any) => {

//     const { name, value, files } = e.target;

    

//     setFormData((prev) => ({

//       ...prev,

//       [name]: files ? files[0] : value,




//     }));

//   };
 
//   const handleSubmit = () => {

//     console.log("Form Submitted:", formData);

//     alert("Application Submitted Successfully!");

//     setIsOpen(false);

//   };
 
//   // ------------ JOB DATA ------------

//   const jobsData: JobsProps[] = [

//     {

//       id: "1",

//       title: "React Developer",

//       description:

//         "We are seeking a talented React Developer to join our dynamic team. The ideal candidate will have hands-on experience in building responsive, high-performance web applications using React.js and modern frontend technologies. You should be proficient in creating reusable components, managing state efficiently, and integrating with RESTful APIs or GraphQL. Familiarity with tools like Redux, TypeScript, and Tailwind CSS is a plus.",

//       experience: "2-4 years",

//       location: "Bangalore, India",

//       workMode: "Remote",

//     },

//     {

//       id: "2",

//       title: "Frontend Developer",

//       description:

//         "Looking for a skilled Frontend Developer with strong HTML, CSS, and JavaScript skills. Experience in frameworks like React or Vue is preferred. The candidate should be able to build responsive, user-friendly web interfaces, collaborate with designers and backend developers, optimize applications for performance and scalability, ensure cross-browser compatibility, maintain clean and reusable code, and stay updated with modern web development best practices.",

//       experience: "1-3 years",

//       location: "Hyderabad, India",

//       workMode: "Hybrid",

//     },

//     {

//       id: "3",

//       title: "Full Stack Developer",

//       description:

//         "We are hiring a Full Stack Developer proficient in both frontend and backend technologies. The candidate must have hands-on experience with Node.js, Express, React, and database management using SQL or NoSQL. Responsibilities include designing and developing scalable web applications, integrating APIs, ensuring high performance and responsiveness, collaborating with designers and team members, maintaining clean and reusable code, and staying updated with modern web development best practices.",

//       experience: "3-5 years",

//       location: "Pune, India",

//       workMode: "Onsite",

//     },

//   ];
 
//   return (
// <>
// {/*  SCROLLBAR HIDDEN GLOBALLY (ONLY ADDITION) */}
//       <style>{`
//         ::-webkit-scrollbar {
//           width: 0;
//           height: 0;
//         }
//         * {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//       `}</style>


      
//       {/* Header */}
// <div className="sticky top-0 z-50 bg-background">
// <Header />
// </div>
 
//       {/* Job List - Centered */}
// <div className="flex flex-col items-center justify-center p-6 space-y-12">

//         {jobsData.map((job) => (
// <div key={job.id} className="text-center max-w-2xl">
// <h3 className="text-3xl font-bold text-blue-900 mb-3">{job.title}</h3>
// <p className="text-gray-700 text-justify mb-4">{job.description}</p>
// <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-600 mb-6">
// <p><strong>Experience:</strong> {job.experience}</p>
// <p><strong>Location:</strong> {job.location}</p>
// <p><strong>Work Mode:</strong> {job.workMode}</p>
// </div>
// <Button

//               onClick={() => openForm(job.title)}

//               className="bg-[#001BB7] hover:bg-[#0018a0] text-white px-6 py-2 rounded-lg"
// >

//               Apply Now
// </Button>
// </div>

//         ))}
// </div>
 
//       {/* Apply Form Modal */}
// <Dialog open={isOpen} onOpenChange={setIsOpen}>
// <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
// <DialogHeader>
// <DialogTitle>Apply for {jobTitle}</DialogTitle>
// </DialogHeader>
 
//           <div className="grid gap-4 mt-3">
// <div>
// <Label>Name</Label>
// <Input

//                 name="name"

//                 value={formData.name}

//                 onChange={handleChange}

//                 placeholder="Enter your name"

//               />
// </div>
 
//             <div>
// <Label>Email</Label>
// <Input

//                 type="email"

//                 name="email"

//                 value={formData.email}

//                 onChange={handleChange}

//                 placeholder="Enter your email"

//               />
// </div>
 
//             <div>
// <Label>Phone Number</Label>
// <Input

//                 name="phone"

//                 value={formData.phone}

//                 onChange={handleChange}

//                 placeholder="Enter phone number"

//               />
// </div>
 
//             <div>
// <Label>Year of Passed Out</Label>
// <Input

//                 name="year"

//                 value={formData.year}

//                 onChange={handleChange}

//                 placeholder="Ex: 2022"

//               />
// </div>
 
//             <div>
// <Label>Qualification</Label>
// <Input

//                 name="qualification"

//                 value={formData.qualification}

//                 onChange={handleChange}

//                 placeholder="Ex: B.Tech, MCA"

//               />
// </div>
 
//             <div>
// <Label>Fresher / Experience</Label>
// <Select

//                 onValueChange={(value) =>

//                   setFormData((prev) => ({ ...prev, experience: value }))

//                 }
// >
// <SelectTrigger>
// <SelectValue placeholder="Select" />
// </SelectTrigger>
// <SelectContent>
// <SelectItem value="Fresher">Fresher</SelectItem>
// <SelectItem value="Experienced">Experienced</SelectItem>
// </SelectContent>
// </Select>
// </div>
 
//             <div>
// <Label>Upload Resume</Label>
// <Input

//                 type="file"

//                 name="resume"

//                 onChange={handleChange}

//                 accept=".pdf,.doc,.docx"

//               />
// </div>
// </div>
 
//           <DialogFooter>
// <Button

//               onClick={handleSubmit}

//               className="bg-blue-600 text-white w-full"
// >

//               Submit Application
// </Button>
// </DialogFooter>
// </DialogContent>
// </Dialog>
// </>

//   );

// };
 
// export default Jobs;


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import Header from "../Header";
// import {
//   Dialog,
//   DialogHeader,
//   DialogContent,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// // ------------------ INTERFACES ------------------

// interface JobsProps {
//   id: string;
//   title: string;
//   description: string;
//   experience: string;
//   location: string;
//   workMode: string;
// }

// interface ApplicationForm {
//   name: string;
//   email: string;
//   phone: string;
//   year: string;
//   qualification: string;
//   experience: string;
//   resume: File | null;
// }

// // ------------ MAIN COMPONENT ------------

// const Jobs = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [jobTitle, setJobTitle] = useState("");

//   const [formData, setFormData] = useState<ApplicationForm>({
//     name: "",
//     email: "",
//     phone: "",
//     year: "",
//     qualification: "",
//     experience: "",
//     resume: null,
//   });

//   const openForm = (title: string) => {
//     setJobTitle(title);
//     setIsOpen(true);
//   };

//   /* ================= VALIDATION HANDLER ================= */
//   const handleChange = (e: any) => {
//     const { name, value, files } = e.target;

//     if (["name", "qualification"].includes(name)) {
//       if (!/^[A-Za-z\s]*$/.test(value)) return;
//     }

//     if (name === "phone") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 10) return;
//     }

//     if (name === "year") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 4) return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };
//   /* ====================================================== */

//   const handleSubmit = () => {
//     console.log("Form Submitted:", formData);
//     alert("Application Submitted Successfully!");
//     setIsOpen(false);
//   };

//   const jobsData: JobsProps[] = [
//     {
//       id: "1",
//       title: "React Developer",
//       description: "We are seeking a talented React Developer...",
//       experience: "2-4 years",
//       location: "Bangalore, India",
//       workMode: "Remote",
//     },
//     {
//       id: "2",
//       title: "Frontend Developer",
//       description: "Looking for a skilled Frontend Developer...",
//       experience: "1-3 years",
//       location: "Hyderabad, India",
//       workMode: "Hybrid",
//     },
//     {
//       id: "3",
//       title: "Full Stack Developer",
//       description: "We are hiring a Full Stack Developer...",
//       experience: "3-5 years",
//       location: "Pune, India",
//       workMode: "Onsite",
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         ::-webkit-scrollbar { width: 0; height: 0; }
//         * { scrollbar-width: none; -ms-overflow-style: none; }
//       `}</style>

//       <div className="sticky top-0 z-50 bg-background">
//         <Header />
//       </div>

//       <div className="flex flex-col items-center justify-center p-6 space-y-12">
//         {jobsData.map((job) => (
//           <div key={job.id} className="text-center max-w-2xl">
//             <h3 className="text-3xl font-bold text-blue-900 mb-3">
//               {job.title}
//             </h3>
//             <p className="text-gray-700 text-justify mb-4">
//               {job.description}
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-600 mb-6">
//               <p><strong>Experience:</strong> {job.experience}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Work Mode:</strong> {job.workMode}</p>
//             </div>
//             <Button
//               onClick={() => openForm(job.title)}
//               className="bg-[#001BB7] hover:bg-[#0018a0] text-white px-6 py-2 rounded-lg"
//             >
//               Apply Now
//             </Button>
//           </div>
//         ))}
//       </div>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Apply for {jobTitle}</DialogTitle>
//           </DialogHeader>

//           <div className="grid gap-4 mt-3">
//             <div>
//               <Label>Name</Label>
//               <Input
//                 name="name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label>Phone Number</Label>
//               <Input
//                 name="phone"
//                 placeholder="Enter 10-digit mobile number"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label>Year of Passed Out</Label>
//               <Input
//                 name="year"
//                 placeholder="YYYY"
//                 value={formData.year}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label>Qualification</Label>
//               <Input
//                 name="qualification"
//                 placeholder="Ex: B.Tech, MCA"
//                 value={formData.qualification}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <Label>Fresher / Experience</Label>
//               <Select onValueChange={(value) =>
//                 setFormData((prev) => ({ ...prev, experience: value }))
//               }>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select experience" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Fresher">Fresher</SelectItem>
//                   <SelectItem value="Experienced">Experienced</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Upload Resume</Label>
//               <Input
//                 type="file"
//                 name="resume"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleSubmit} className="bg-blue-600 text-white w-full">
//               Submit Application
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Jobs;


 
 
 import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "../Header";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Footer from "../Footer";
 
/* ------------------ INTERFACES ------------------ */
 
interface JobsProps {
  id: string;
  title: string;
  description: string;
  experience: string;
  location: string;
  workMode: string;
}
 
interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  year: string;
  qualification: string;
  experience: string;
  experienceYears: string;
  resume: File | null;
}
 
/* ------------ MAIN COMPONENT ------------ */
 
const Jobs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
 
  const [formData, setFormData] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    year: "",
    qualification: "",
    experience: "",
    experienceYears: "",
    resume: null,
  });
 
  const [errors, setErrors] = useState<any>({});
 
  const openForm = (title: string) => {
    setJobTitle(title);
    setIsOpen(true);
    // Reset form and errors when opening
    setFormData({
      name: "",
      email: "",
      phone: "",
      year: "",
      qualification: "",
      experience: "",
      experienceYears: "",
      resume: null,
    });
    setErrors({});
  };
 
  /* ================= HANDLE CHANGE ================= */
 
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
 
    if (name === "name") {
      if (value.startsWith(" ")) return;
      if (!/^[A-Za-z\s]*$/.test(value)) return;
      if (value.length > 30) return;
 
      setFormData((p) => ({ ...p, name: value }));
 
      if (value.length < 3) {
        setErrors((p: any) => ({
          ...p,
          name: "Minimum 3 characters required",
        }));
      } else {
        setErrors((p: any) => ({ ...p, name: "" }));
      }
 
      return;
    }
 
    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
 
    if (name === "qualification") {
      if (value.startsWith(" ")) return;
      if (/\d/.test(value)) return;
      if (value.length > 30) return;
 
      setFormData((p) => ({ ...p, qualification: value }));
 
      if (value.length < 2) {
        setErrors((p: any) => ({
          ...p,
          qualification: "Minimum 2 characters required",
        }));
      } else {
        setErrors((p: any) => ({ ...p, qualification: "" }));
      }
 
      return;
    }
 
    if (name === "email") {
      setFormData((p) => ({ ...p, email: value }));
 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
      if (!emailRegex.test(value)) {
        setErrors((p: any) => ({
          ...p,
          email: "Enter a valid email address",
        }));
      } else {
        setErrors((p: any) => ({ ...p, email: "" }));
      }
      return;
    }
 
    if (name === "year") {
      if (!/^\d*$/.test(value) || value.length > 4) return;
    }
 
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
 
    setErrors((p: any) => ({ ...p, [name]: "" }));
  };
 
  /* ================= HANDLE SUBMIT ================= */
 
  const handleSubmit = () => {
    const e: any = {};
 
    if (!formData.name || formData.name.length < 3)
      e.name = "Please fill this field";
 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setErrors((prev: any) => ({
      ...prev,
      email: "Please enter a valid email address",
    }));
    return;
  }
 
    if (formData.phone.length !== 10)
      e.phone = "Please fill this field";
 
    if (formData.year.length !== 4)
      e.year = "Please fill this field";
 
    if (!formData.qualification)
      e.qualification = "Please fill this field";
 
    if (!formData.experience)
      e.experience = "Please fill this field";
 
    if (
      formData.experience === "Experienced" &&
      !formData.experienceYears
    )
      e.experienceYears = "Please fill this field";
 
    if (!formData.resume)
      e.resume = "Please fill this field";
 
    setErrors(e);
    if (Object.keys(e).length > 0) return;
 
    alert("Application Submitted Successfully!");
   
    // Close dialog and fully reset form
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      year: "",
      qualification: "",
      experience: "",
      experienceYears: "",
      resume: null,
    });
    setErrors({});
  };
 
  /* ================= PREVIEW RESUME ================= */
 
  const handlePreview = () => {
    if (formData.resume) {
      const url = URL.createObjectURL(formData.resume);
      window.open(url, "_blank");
    }
  };
 
  /* ================= JOB DATA ================= */
 
  const jobsData: JobsProps[] = [
    {
      id: "1",
      title: "React Developer",
      description:
        "We are seeking a talented React Developer to build scalable and user-friendly web applications.",
      experience: "2–4 years",
      location: "Bangalore, India",
      workMode: "Remote",
    },
    {
      id: "2",
      title: "Frontend Developer",
      description:
        "Looking for a skilled Frontend Developer with strong HTML, CSS, and JavaScript knowledge.",
      experience: "1–3 years",
      location: "Hyderabad, India",
      workMode: "Hybrid",
    },
    {
      id: "3",
      title: "Full Stack Developer",
      description:
        "We are hiring a Full Stack Developer proficient in React and backend technologies.",
      experience: "3–5 years",
      location: "Pune, India",
      workMode: "Onsite",
    },
  ];
 
  return (
    <>
      {/*  SCROLLBAR HIDDEN GLOBALLY */}
      <style>{`
        ::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
     
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
 
      {/* ================= JOB CARDS ================= */}
 
      <div className="max-w-7xl mx-auto px-2 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="border rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {job.title}
                </h3>
 
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {job.description}
                </p>
 
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Work Mode:</strong> {job.workMode}
                  </p>
                </div>
              </div>
 
              <Button
                onClick={() => openForm(job.title)}
                className="mt-6 w-full bg-[#001BB7] hover:bg-[#0018a0] text-white rounded-lg h-11"
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>
 
        
      </div>
      <Footer />
 
      {/* ================= APPLY NOW FORM ================= */}
 
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {jobTitle}</DialogTitle>
          </DialogHeader>
 
          <div className="grid gap-4 mt-3">
            <div>
              <Label>Name <span className="text-red-500">*</span></Label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
 
            <div>
  <Label>
    Email <span className="text-red-500">*</span>
  </Label>

  <Input
    name="email"
    placeholder="Enter your email address"
    value={formData.email}
    onChange={handleChange}
  />

  {errors.email && (
    <p className="text-red-500 text-xs">{errors.email}</p>
  )}
</div>

 
            <div>
              <Label>Phone <span className="text-red-500">*</span></Label>
              <Input
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
 
            <div>
              <Label>Year of Passed Out <span className="text-red-500">*</span></Label>
              <Input
                name="year"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
            </div>
 
            <div>
              <Label>Qualification <span className="text-red-500">*</span></Label>
              <Input
                name="qualification"
                placeholder="Ex: B.Tech, MCA, M.Sc"
                value={formData.qualification}
                onChange={handleChange}
              />
              {errors.qualification && <p className="text-red-500 text-xs">{errors.qualification}</p>}
            </div>
 
            <div>
              <Label>Fresher / Experience <span className="text-red-500">*</span></Label>
              <Select
                value={formData.experience}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    experience: v,
                    experienceYears: v === "Experienced" ? p.experienceYears : "",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresher">Fresher</SelectItem>
                  <SelectItem value="Experienced">Experienced</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
            </div>
 
            {formData.experience === "Experienced" && (
              <div>
                <Label>Years of Experience <span className="text-red-500">*</span></Label>
                <Input
                  name="experienceYears"
                  placeholder="Enter total years of experience"
                  value={formData.experienceYears}
                  onChange={handleChange}
                />
                {errors.experienceYears && (
                  <p className="text-red-500 text-xs">{errors.experienceYears}</p>
                )}
              </div>
            )}
 
            <div>
              <Label>Upload Resume <span className="text-red-500">*</span></Label>
              <Input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
              {errors.resume && <p className="text-red-500 text-xs">{errors.resume}</p>}
 
              {/* Only Preview button — no "Selected file:" text */}
              {formData.resume && (
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePreview}
                  >
                    Preview Resume
                  </Button>
                </div>
              )}
            </div>
          </div>
 
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
 
export default Jobs;
 
