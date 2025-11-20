import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import online from "@/assets/online1.png";
import online1 from "@/assets/online2.png";
import { Link, useNavigate} from "react-router-dom";

import google from "@/assets/googlelogo.png";
import bombay from "@/assets/bombay.png";
import iit from "@/assets/IIT-Delhi.png";
import sanford from "@/assets/stfornd.png";
import microsoft from "@/assets/microsoft.png";
import amazon from "@/assets/amazon.png";
import startup from "@/assets/Startup-India .png";
import nsdc from "@/assets/nsdc.png";
import nasscom from "@/assets/nasscom.png";
import commerce from "@/assets/commerce.png";

// Import course images
import webDevCourse from "@/assets/cloud2.jpg";
import python from "@/assets/python2.jpg";
import node from "@/assets/node2.jpg";
import react from "@/assets/react2.jpg";
import java from "@/assets/java2.jpg";
import sql from "@/assets/sql2.jpg";
import cloud from "@/assets/cloud2.jpg";
import home2 from "@/assets/home2.png";




const mockCourses = [
  {
    id: "web-development",
    title: "UI/UX Design",
    image: webDevCourse,
    description: "Designed to build industry-ready professionals skilled in both design principles and front-end development.",
    duration: "13 weeks",
    level: "Beginner",
  },
  {
    id: "ReactJS",
    title: "ReactJS Developer",
    image: react,
    description: "Build high-performing, responsive web and mobile applications using a single JavaScript library — React.",
    duration: "16 weeks",
    level: "Intermediate",
  },
    {
    id: "ReactJS",
    title: "ReactNative Developer",
    image: react,
    description: "Build high-performing, responsive web and mobile applications using a single JavaScript library — React.",
    duration: "20 weeks",
    level: "Intermediate",
  },
  {
    id: "Python",
    title: "Python Developer",
    image: python,
    description: "Structured to equip you with professional skills in programming, database management, and building scalable APIs using FastAPI.",
    duration: "16 weeks",
    level: "Beginner",
  },
  {
    id: "Java Developer",
    title: "Java Developer",
    image: java,
    description: "Develop secure, scalable, and high-performance backend systems using Java — one of the most trusted languages in the software industry.",
    duration: "10 weeks",
    level: "Advanced",
  },
  {
    id: "Node.js Developer",
    title: "Node.js Developer",
    image: node,
    description: "Thoughtfully designed to help you build scalable, high-performance server-side applications using JavaScript — the language you already know from the frontend.",
    duration: "20 weeks",
    level: "Advanced",
  },
  {
    id: "SQL & Database Management",
    title: "Database Management",
    image: sql,
    description: "Learn startup growth strategies, conversion optimization, and performance marketing.",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "Cloud + DevOps Program",
    title: "Cloud + DevOps Program",
    image: cloud,
    description: "Secure environments, automate CI/CD pipelines, and operate mission-critical applications in multi-cloud environments.",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "Java FullStack Developer",
    title: "Java FullStack Developer",
    image: java,
    description: "Designed to help you build dynamic web applications from the ground up — covering frontend design, backend logic, and database integration using industry-standard Java technologies.",
    duration: "6 weeks",
    level: "Intermediate",
  },
];

const testimonials = [
  {
    quote: "The best training program I've ever experienced. Truly transformative!",
    author: "Sarah Johnson",
    role: "Bootcamp Graduate",
    image: "https://via.placeholder.com/80"
  },
  {
    quote: "Incredible instructors and hands-on learning. Highly recommend!",
    author: "Michael Chen",
    role: "Software Developer",
    image: "https://via.placeholder.com/80"
  },
  {
    quote: "This program changed my career trajectory for the better!",
    author: "Emily Davis",
    role: "Tech Lead",
    image: "https://via.placeholder.com/80"
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300); // Duration of the slide animation
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const logos = [google, microsoft, amazon, bombay, iit, sanford];


  const recognized = [nasscom, startup, nsdc, commerce];


   const handleAlumniClick = () => {
    navigate("/alumni");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>

      {/* Main content */}
      <main className="flex-1 ">
        {/* Hero Section */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Mulish:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <section className="relative bg-white py-12 md:py-16 lg:py-20 overflow-hidden font-mulish">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left Column - Content */}
              <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                {/* Heading */}
                <h1 className="font-dm-sans text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your{' '}
                  <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-lg -rotate-1 transform">
                    Career
                  </span>
                  <br className="hidden lg:block" />
                  <span className="text-gray-800">Learn Skills That Matter</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join thousands of students who've launched successful careers through our industry-focused courses.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 max-w-xs pt-0 mx-auto lg:mx-0">
                  <span className="inline-flex items-center gap-3 text-black px-5 py-3 rounded-full text-sm font-medium ">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="orange"
                      stroke="black"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Live classes online 24/7
                  </span>
                  <span className="inline-flex items-center gap-3 text-black px-5 py-3 rounded-full text-sm font-medium ">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="orange"
                      stroke="black"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Learn in small groups or 1-on-1
                  </span>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-0 lg:justify-start">
                  <Link to="/courses">
                    <Button className="bg-[#001BB7] hover:bg-blue-700 text-white font-semibold px-8 py-4  text-lg shadow-lg transition-all hover:shadow-xl">
                      Start Learning Today
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Image with Floating Badges */}
              <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
                {/* Background Decorative Shape */}
                <div className="absolute inset-0 -left-20 -top-20 w-full h-full">
                  <div className="absolute top-10 right-10 w-32 h-32">
                    <svg className="w-full h-full text-yellow-300 opacity-40" fill="currentColor">
                      <circle cx="15" cy="15" r="4" />
                      <circle cx="45" cy="15" r="4" />
                      <circle cx="75" cy="15" r="4" />
                      <circle cx="15" cy="45" r="4" />
                      <circle cx="45" cy="45" r="4" />
                      <circle cx="75" cy="45" r="4" />
                    </svg>
                  </div>
                </div>

                {/* Main Student Image */}
                <div className="relative z-10 w-full">
                  <div>
                    <img
                      src={home2}
                      alt="Student learning online"
                      className="w-450"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* === ALUMNI RECOGNITION - HEIGHT REDUCED BY 2.5px (py-11) + CONTINUOUS LOGOS === */}
        <section className="py-11 bg-[#11224E] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Learn from the Alumni of</h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee items-center">
                {Array(4).fill(null).flatMap(() =>
                  logos.map((src, i, arr) => (
                    <div key={`${i}-${Math.random()}`} className="flex items-center">
                      <span className="text-yellow-400 text-8xl mx-2">*</span>
                      <button
                        onClick={handleAlumniClick}
                        className="flex-shrink-0 mx-6 transition-transform hover:scale-110 focus:outline-none"
                        aria-label={`View alumni at ${src.split('/').pop()?.split('.')[0] || 'company'}`}
                      >
                        <div className="w-24 h-24 rounded-full bg-white p-3 shadow">
                          <img src={src} alt="" className="w-full h-full object-contain" />
                        </div>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
 
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
              display: flex;
            }
            .animate-marquee-reverse {
              animation: marquee-reverse 25s linear infinite;
            }
          `}</style>
        </section>




        {/* Courses Section */}
        <section className="py-8 xs:py-[1.5rem] sm:py-[1.5rem] md:py-[1.5rem] lg:py-[1.5rem] xl:py-[1.5rem] 2xl:py-[1.5rem]">
          <div
            className="
              container
              mx-auto
              px-2 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10
              min-w-full
              sm:min-w-[640px]
              md:min-w-[768px]
              lg:min-w-[1024px]
              xl:min-w-[1280px]
              2xl:min-w-[1596px]
              3xl:min-w-[1920px]
            "
          >
            <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14 2xl:mb-16">
              <h2
                className="
                  text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl
                  font-bold font-dm-sans 
                  text-foreground
                  mb-2 xs:mb-[1.5rem] sm:mb-[1.5rem] md:mb-[1.5rem] lg:mb-[1.5rem] xl:mb-[1.5rem] 2xl:mb-[1.5rem]
                "
              >
                Featured Courses
              </h2>
              <p
                className="
                  text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl
                  text-muted-foreground
                  max-w-[250px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
                  mx-auto
                  leading-relaxed
                  px-2 xs:px-3 sm:px-4
                "
              >
                Choose from our carefully curated selection of industry-relevant
                courses designed to advance your career.
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4
                gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12
              "
            >
              {mockCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="py-8 xs:py-[1.5rem] sm:py-[1.5rem] md:py-[1.5rem] lg:py-[1.5rem] xl:py-[1.5rem] 2xl:py-[1.5rem] bg-white">
          <div className="container mx-auto px-2 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10">
            <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14 2xl:mb-16">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-dm-sans font-bold text-foreground mb-2">
                Featured Courses
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl text-muted-foreground max-w-[250px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-mulish mx-auto leading-relaxed px-2 xs:px-3 sm:px-4">
                Choose from our carefully curated selection of industry-relevant
                courses designed to advance your career.
              </p>
            </div>
 
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12">
              {mockCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border-2 border-[#001BB7] rounded-lg overflow-hidden"
                >
             
                  <div className="p-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-dm-sans font-bold text-[#001BB7] mb-2">
                      {course.title}
                    </h3>
                    <p className=" font-mulish text-sm text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#001BB7] text-sm font-medium mb-4">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        <path d="M10 6a1 1 0 011 1v3.586l2.707 2.707a1 1 0 11-1.414 1.414L9.586 12H10z" />
                      </svg>
                      <span>{course.duration}</span>
                    </div>
                    <button className="w-full py-2.5 text-sm font-semibold bg-[#001BB7] hover:bg-[#0015a0] text-white rounded-md">
                      
            Explore Course
  
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="py-[2rem] xs:py-[2rem] sm:py-[2rem] md:py-[2rem] lg:py-[2rem] xl:py-[2rem] 2xl:py-[2rem] mb-[2rem] xs:mb-[2rem] sm:mb-[2rem] md:mb-[2rem] lg:mb-[2rem] xl:mb-[2rem] 2xl:mb-[2rem] bg-white from-course-hero via-primary to-course-gradient-end text-white">
          <div className="container mx-auto px-2 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10 min-w-full sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px] 2xl:min-w-[1596px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 items-center">
              {/* Left Side - Two Images in Staggered Layout */}
              <div className="relative w-full h-[400px]">
                <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={online}
                    alt="Training session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={online1}
                    alt="Another training session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Side - Consistent Learning Content */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-gray-900">Consistent <span className="text-[#001BB7]">Learning</span></h2>

                <p className="text-base text-gray-600 leading-relaxed">
                  Laura Tek online video learning platform is perfect for exploring new courses and individuals to build skills and career confidence.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-[#001BB7]">224+</div>
                    <p className="text-sm text-gray-500 mt-1">hours of curated classes taught by experts</p>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-[#001BB7]">40,500+</div>
                    <p className="text-sm text-gray-500 mt-1">minutes of learning with memorisly</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Laura Tek online video learning platform is perfect for exploring new courses and individuals to build skills and career confidence.
                </p>
              </div>

            </div>

            {/* Stats Section Below */}
            <div className="mt-12 bg-[#001BB7] rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 text-center text-white">

                {/* Item 1 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">50+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">Success Stories</p>
                  {/* Divider - Hidden on mobile last item */}
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 2 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">10+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">Expert Instructors</p>
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 3 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">120+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">Overall Students</p>
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 4 */}
                <div>
                  <div className="text-3xl md:text-4xl font-bold">15+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">Trendy Subjects</p>
                </div>

              </div>
            </div>
          </div>
        </section>

       <section className="py-12 md:py-16 bg-[#001BB7] text-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-dm-sans  font-bold mb-4">What Makes LauraTek Unique?</h2>
    <p className="text-base md:text-lg text-blue-200 mb-8 max-w-3xl mx-auto">
      At LauraTek, every course is designed with one goal — to get you job-ready.
      We combine practical learning, real support, and career-focused guidance to help you grow with purpose and confidence.
    </p>
    <button className="px-6 py-3 bg-white text-[#001BB7] font-semibold rounded-full hover:bg-gray-100 transition">
      Start Now
    </button>
 
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
      {[
        { label: "Best Tutors", path: "M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" },
        { label: "Best Curriculum", path: "M440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6q47 0 91.5 10.5T440-278Zm40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q74 0 126 17t112 52q11 6 16.5 14t5.5 21v418q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-481q15 5 29.5 11t28.5 14q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm140-240v-440l120-40v440l-120 40Zm-340-99Z" },
        { label: "Certificate", path: "M480-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" },
        { label: "Best Price", path: "m389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" },
        { label: "Creative Thinking", path: "M480-80q-26 0-47-12.5T400-126q-33 0-56.5-23.5T320-206v-142q-59-39-94.5-103T190-590q0-121 84.5-205.5T480-880q121 0 205.5 84.5T770-590q0 77-35.5 140T640-348v142q0 33-23.5 56.5T560-126q-12 21-33 33.5T480-80Zm-80-126h160v-36H400v36Zm0-76h160v-38H400v38Zm-8-118h58v-108l-88-88 42-42 76 76 76-76 42 42-88 88v108h58q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-162Zm0-38Z" },
        { label: "Online Live Classes + Recording", path: "m590-488 160-92-160-92-160 92 160 92Zm0 122 110-64v-84l-110 64-110-64v84l110 64ZM480-480Zm320 320H600q0-20-1.5-40t-4.5-40h206v-480H160v46q-20-3-40-4.5T80-680v-40q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160Zm-720 0v-120q50 0 85 35t35 85H80Zm200 0q0-83-58.5-141.5T80-360v-80q117 0 198.5 81.5T360-160h-80Zm160 0q0-75-28.5-140.5t-77-114q-48.5-48.5-114-77T80-520v-80q91 0 171 34.5T391-471q60 60 94.5 140T520-160h-80Z" },
      ].map((item, i) => (
        <div
          key={i}
          className=" p-4 text-center border border-white" // SQUARE + WHITE BORDER + NO BLUR
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF">
              <path d={item.path} />
            </svg>
          </div>
          <p className="text-sm">{item.label}</p>
        </div>
      ))}
    </div>
 
 {/* Our Bootcamp Training - EXACT IMAGE MATCH */}
    <h3 className="text-2xl md:text-3xl font-dm-sans  font-bold text-white mt-16 mb-10">Our Bootcamp Training</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Become an Instructor */}
      <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6 hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <div className="w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2">
            <div className="w-full h-full bg-white rounded-full overflow-hidden">
              <img
                src={trainer1}
                alt="Instructor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="text-left flex-1">
          <h4 className="text-xl md:text-2xl font-bold text-[#001BB7] mb-2">Become an Instructor</h4>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            To take a trivial example, which of us undertakes physical exercise yes is this happen here.
          </p>
        </div>
      </div>
 
      {/* Become a Student */}
      <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6 hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <div className="w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2">
            <div className="w-full h-full bg-white rounded-full overflow-hidden">
              <img
                src={trainer2}
                alt="Students"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="text-left flex-1">
          <h4 className="text-xl md:text-2xl font-bold text-[#001BB7] mb-2">Become a Student</h4>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Join millions of people from around the world learning together. Online learning is as easy and natural.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Alumni Recognition Section */}
        <section className="py-[2rem] xs:py-[2rem] sm:py-[2rem] md:py-[2rem] lg:py-[2rem] xl:py-[2rem] 2xl:py-[2rem] bg-white text-gray-900">
          <div className="container mx-auto px-2 xs:px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10 text-center">
            <h2 className="text-3xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6">
              Learn from the Alumni of
            </h2>

            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...logos, ...logos].map((src, i) => (
                  <div key={i} className="flex flex-col items-center justify-center mx-4">
                    <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center mb-2 bg-white p-2 shadow">
                      <img src={src} alt="" className="w-full h-full object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl xs:text-2xl sm:text-3xl mb-8 text-gray-600">and many more...</p>

            <div className="mt-12">
              <h3 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold mb-6">Recognized By</h3>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee-reverse whitespace-nowrap">
                  {[...recognized, ...recognized].map((src, i) => (
                    <div key={i} className="flex flex-col items-center justify-center mx-4">
                      <div className="w-48 h-24 rounded-lg flex items-center justify-center bg-white p-2 shadow">
                        <img src={src} alt="" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee { animation: marquee 20s linear infinite; }
            .animate-marquee-reverse { animation: marquee-reverse 20s linear infinite; }
          `}</style>
        </section>


        <Footer />
      </main>
    </div>
  );
};

export default Home;