
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import trainer1 from "@/assets/instructor2.png";
import trainer2 from "@/assets/instructor1.png";
import online from "@/assets/online1.png";
import online1 from "@/assets/online2.png";
import { Link, useNavigate } from "react-router-dom";

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
import yellowstar from "@/assets/yellowstar.png";
import curve from "@/assets/curve.png";

// Import course images
import webDevCourse from "@/assets/cloud2.jpg";
import python from "@/assets/python2.jpg";
import node from "@/assets/node2.jpg";
import react from "@/assets/react2.jpg";
import java from "@/assets/java2.jpg";
import sql from "@/assets/sql2.jpg";
import cloud from "@/assets/cloud2.jpg";
import home2 from "@/assets/home2.png";
import discussion1 from "@/assets/discussion1.png"; // Replace with actual image
import worldmap from "@/assets/worldmap.png";


const mockCourses = [
  {
    id: "web-development",
    title: "UI/UX Design",
    image: webDevCourse,
    description:
      "Designed to build industry-ready professionals skilled in both design principles and front-end development.",
    duration: "13 weeks",
    level: "Beginner",
  },
  {
    id: "ReactJS",
    title: "ReactJS Developer",
    image: react,
    description:
      "Build high-performing, responsive web and mobile applications using a single JavaScript library — React.",
    duration: "16 weeks",
    level: "Intermediate",
  },
  {
    id: "ReactJS",
    title: "ReactNative Developer",
    image: react,
    description:
      "Build high-performing, responsive web and mobile applications using a single JavaScript library — React.",
    duration: "20 weeks",
    level: "Intermediate",
  },
  {
    id: "Python",
    title: "Python Developer",
    image: python,
    description:
      "Structured to equip you with professional skills in programming, database management, and building scalable APIs using FastAPI.",
    duration: "16 weeks",
    level: "Beginner",
  },
  {
    id: "Java Developer",
    title: "Java Developer",
    image: java,
    description:
      "Develop secure, scalable, and high-performance backend systems using Java — one of the most trusted languages in the software industry.",
    duration: "10 weeks",
    level: "Advanced",
  },
  {
    id: "Node.js Developer",
    title: "Node.js Developer",
    image: node,
    description:
      "Thoughtfully designed to help you build scalable, high-performance server-side applications using JavaScript — the language you already know from the frontend.",
    duration: "20 weeks",
    level: "Advanced",
  },
  {
    id: "SQL & Database Management",
    title: "Database Management",
    image: sql,
    description:
      "Learn startup growth strategies, conversion optimization, and performance marketing.",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "Cloud + DevOps Program",
    title: "Cloud + DevOps Program",
    image: cloud,
    description:
      "Secure environments, automate CI/CD pipelines, and operate mission-critical applications in multi-cloud environments.",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: "Java FullStack Developer",
    title: "Java FullStack Developer",
    image: java,
    description:
      "Designed to help you build dynamic web applications from the ground up — covering frontend design, backend logic, and database integration using industry-standard Java technologies.",
    duration: "6 weeks",
    level: "Intermediate",
  },
];

const testimonials = [
  {
    quote: "The best training program I've ever experienced. Truly transformative!",
    author: "Sarah Johnson",
    role: "Bootcamp Graduate",
    image: "https://via.placeholder.com/80",
  },
  {
    quote: "Incredible instructors and hands-on learning. Highly recommend!",
    author: "Michael Chen",
    role: "Software Developer",
    image: "https://via.placeholder.com/80",
  },
  {
    quote: "This program changed my career trajectory for the better!",
    author: "Emily Davis",
    role: "Tech Lead",
    image: "https://via.placeholder.com/80",
  },
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
                  Transform Your{" "}
                  <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-lg -rotate-1 transform">
                    Career
                  </span>
                  <br className="hidden lg:block" />
                  <span className="text-gray-800">Learn Skills That Matter</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join thousands of students who've launched successful careers
                  through our industry-focused courses.
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
                    <svg
                      className="w-full h-full text-yellow-300 opacity-40"
                      fill="currentColor"
                    >
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Learn from the Alumni of
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee items-center">
                {Array(4)
                  .fill(null)
                  .flatMap(() =>
                    logos.map((src, i) => (
                      <div key={`${i}-${Math.random()}`} className="flex items-center">
                        <span className="text-yellow-400 text-8xl mx-2">*</span>
                        <button
                          onClick={handleAlumniClick}
                          className="flex-shrink-0 mx-6 transition-transform hover:scale-110 focus:outline-none"
                          aria-label={`View alumni at ${
                            src.split("/").pop()?.split(".")[0] || "company"
                          }`}
                        >
                          <div className="w-24 h-24 rounded-full bg-white p-3 shadow">
                            <img
                              src={src}
                              alt=""
                              className="w-full h-full object-contain"
                            />
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

        {/* WHAT MAKES LAURATEK UNIQUE? – 100% EXACT LIKE YOUR IMAGE */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8 max-w-[1650px]">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                What Makes LauraTek Unique?
              </h2>
              <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
                At LauraTek, every course is designed with one goal — to get you
                job-ready. We combine practical learning, real support, and
                career-focused guidance to help you grow with purpose and
                confidence.
              </p>
            </div>

            {/* Scrollable Cards – 2 FULL CARDS VISIBLE */}
            <div className="overflow-x-auto scrollbar-hide" id="unique-slider">
              <div className="flex gap-10 px-4 min-w-max">
                {/* Card 1 */}
                <div className="flex-shrink-0 w-[780px] flex items-start gap-10">
                  <div className="flex-shrink-0">
                    <img
                      src={discussion1}
                      alt="Discussion Room"
                      className="w-96 h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                      Discussion Room
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-md">
                      World leaders gathered at the Global Climate Summit to
                      discuss urgent climate action, emissions reduction, and
                      renewable energy transitions.
                    </p>
                    <button className="bg-[#001BB7] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-blue-800 transition shadow-lg hover:shadow-xl">
                      Explore Course
                    </button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex-shrink-0 w-[780px] flex items-start gap-10">
                  <div className="flex-shrink-0">
                    <img
                      src={discussion1}
                      alt="Discussion Room"
                      className="w-96 h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                      Discussion Room
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-md">
                      World leaders gathered at the Global Climate Summit to
                      discuss urgent climate action, emissions reduction, and
                      renewable energy transitions.
                    </p>
                    <button className="bg-[#001BB7] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-blue-800 transition shadow-lg hover:shadow-xl">
                      Explore Course
                    </button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex-shrink-0 w-[780px] flex items-start gap-10">
                  <div className="flex-shrink-0">
                    <img
                      src={discussion1}
                      alt="Discussion Room"
                      className="w-96 h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                      Discussion Room
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-md">
                      World leaders gathered at the Global Climate Summit to
                      discuss urgent climate action, emissions reduction, and
                      renewable energy transitions.
                    </p>
                    <button className="bg-[#001BB7] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-blue-800 transition shadow-lg hover:shadow-xl">
                      Explore Course
                    </button>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="flex-shrink-0 w-[780px] flex items-start gap-10">
                  <div className="flex-shrink-0">
                    <img
                      src={discussion1}
                      alt="Discussion Room"
                      className="w-96 h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
                      Discussion Room
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-md">
                      World leaders gathered at the Global Climate Summit to
                      discuss urgent climate action, emissions reduction, and
                      renewable energy transitions.
                    </p>
                    <button className="bg-[#001BB7] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-blue-800 transition shadow-lg hover:shadow-xl">
                      Explore Course
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots – Clickable + Active */}
            <div className="flex justify-center mt-12 gap-3">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    const slider = document.getElementById("unique-slider");
                    slider?.scrollTo({
                      left: index * 790, // 780px card + ~10px gap
                      behavior: "smooth",
                    });
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.round(
                      (document.getElementById("unique-slider")?.scrollLeft ||
                        0) / 790
                    ) === index
                      ? "bg-[#001BB7] w-10"
                      : "bg-gray-400 hover:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hide Scrollbar */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
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
                Choose from our carefully curated selection of
                industry-relevant courses designed to advance your career.
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
                <h2 className="text-4xl md:text-5xl font-dm-sans font-bold text-gray-900">
                  Consistent <span className="text-[#001BB7]">Learning</span>
                </h2>

                <p className="text-base text-gray-600 leading-relaxed">
                  Laura Tek online video learning platform is perfect for
                  exploring new courses and individuals to build skills and
                  career confidence.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-[#001BB7]">
                      224+
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      hours of curated classes taught by experts
                    </p>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-bold text-[#001BB7]">
                      40,500+
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      minutes of learning with memorisly
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Laura Tek online video learning platform is perfect for
                  exploring new courses and individuals to build skills and
                  career confidence.
                </p>
              </div>
            </div>

            {/* Stats Section Below */}
            <div className="mt-12 bg-[#001BB7] rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 text-center text-white">
                {/* Item 1 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">50+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">
                    Success Stories
                  </p>
                  {/* Divider - Hidden on mobile last item */}
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 2 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">10+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">
                    Expert Instructors
                  </p>
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 3 */}
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold">120+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">
                    Overall Students
                  </p>
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-px h-12 bg-white/30"></div>
                </div>

                {/* Item 4 */}
                <div>
                  <div className="text-3xl md:text-4xl font-bold">15+</div>
                  <p className="text-xs md:text-sm text-blue-200 mt-1">
                    Trendy Subjects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEET OUR EXPERT INSTRUCTOR — 100% EXACT TO YOUR LATEST IMAGE */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl ">
            {/* Yellow Star */}
            <div className="absolute top-25 left-[40%]">
              <img
                src={yellowstar}
                alt="yellow star"
                className="w-[60px] h-[60px]"
              />
            </div>

            {/* Yellow Curve */}
            <div className="absolute bottom-[204px] left-[86px] md:left-32 ml-[30%]">
              <img
                src={curve}
                alt="curve"
                className="w-16 h-16 rotate-75"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side: Heading, Text & Button */}
              <div className="text-left lg:pr-10 mt-[221px]">
                <span className="inline-block px-6 py-2 bg-purple-100 text-purple-600 text-sm font-semibold uppercase tracking-wider rounded-full mb-4 mt-[-4px]">
                  OUR INSTRUCTOR
                </span>

                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Meet Our Expert
                  <br />
                  Instructor
                </h2>

                <p className="text-gray-600 max-w-lg text-base leading-relaxed mt-[26px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris..
                </p>

                <div className="mt-12">
                  <button className="bg-[#0802AE] text-white font-bold px-10 py-4 rounded-md hover:bg-[#0802AE]/90 transition shadow-lg text-lg">
                    Explore Course
                  </button>
                </div>
              </div>

              {/* Right Side: 2×2 Instructors Grid with Stagger */}
              <div className="grid grid-cols-2 gap-8">
                {/* Esther Howard */}
                <div className="relative w-full max-w-[342px] h-[338px]">
                  <div className="absolute inset-0 rounded-lg overflow-hidden outline outline-[5.33px] outline-[#704FE6] -outline-offset-[5.33px]">
                    <img
                      src={trainer2}
                      alt="Esther Howard"
                      className="absolute left-[5.33px] top-[5.33px] w-[332px] h-[327px] object-cover rounded-lg"
                    />
                    <div className="absolute right-8 top-9 w-10 h-10 bg-[#704FE6] rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="17" cy="7" r="3"></circle>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="12" r="3"></circle>
                        <path
                          d="M14.5 8.5L9.5 11.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 15.5L9.5 12.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* centered name tag inside image */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[240px] h-[60px] bg-white rounded-lg shadow-2xl border border-purple-100 flex items-center px-5">
                      <div className="flex-1">
                        <h4 className="text-[#0E2A46] font-bold text-lg leading-tight">
                          Esther Howard
                        </h4>
                        <p className="text-[#704FE6] text-xs mt-1">
                          Junior Instructor
                        </p>
                      </div>

                      <div className="w-10 h-10 bg-[#E9E2FF] rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-[18px] h-[7px] bg-[#704FE6] rotate-[-30deg]" />
                        <svg
                          className="w-5 h-5 text-[#704FE6] ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="12" x2="16" y2="12" />
                          <polyline points="12 8 16 12 12 16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beverly Hathcock */}
                <div className="relative w-full max-w-[342px] h-[338px]">
                  <div className="absolute inset-0 rounded-lg overflow-hidden outline outline-[5.33px] outline-[#704FE6] -outline-offset-[5.33px]">
                    <img
                      src={trainer1}
                      alt="Beverly Hathcock"
                      className="absolute left-[5.33px] top-[5.33px] w-[332px] h-[327px] object-cover rounded-lg"
                    />
                    <div className="absolute right-8 top-9 w-10 h-10 bg-[#704FE6] rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="17" cy="7" r="3"></circle>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="12" r="3"></circle>
                        <path
                          d="M14.5 8.5L9.5 11.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 15.5L9.5 12.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* centered name tag inside image */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[240px] h-[60px] bg-white rounded-lg shadow-2xl border border-purple-100 flex items-center px-5">
                      <div className="flex-1">
                        <h4 className="text-[#0E2A46] font-bold text-lg leading-tight">
                          Beverly Hathcock
                        </h4>
                        <p className="text-[#704FE6] text-xs mt-1">
                          Junior Instructor
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#E9E2FF] rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-[18px] h-[7px] bg-[#704FE6] rotate-[-30deg]" />
                        <svg
                          className="w-5 h-5 text-[#704FE6] ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="12" x2="16" y2="12" />
                          <polyline points="12 8 16 12 12 16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donald Gonzales — Lower */}
                <div className="relative w-full max-w-[342px] h-[338px] mt-12">
                  <div className="absolute inset-0 rounded-lg overflow-hidden outline outline-[5.33px] outline-[#704FE6] -outline-offset-[5.33px]">
                    <img
                      src={trainer2}
                      alt="Donald Gonzales"
                      className="absolute left-[5.33px] top-[5.33px] w-[332px] h-[327px] object-cover rounded-lg"
                    />
                    <div className="absolute right-8 top-9 w-10 h-10 bg-[#704FE6] rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="17" cy="7" r="3"></circle>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="12" r="3"></circle>
                        <path
                          d="M14.5 8.5L9.5 11.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 15.5L9.5 12.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* centered name tag inside image */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[240px] h-[60px] bg-white rounded-lg shadow-2xl border border-purple-100 flex items-center px-5">
                      <div className="flex-1">
                        <h4 className="text-[#0E2A46] font-bold text-lg leading-tight">
                          Donald Gonzales
                        </h4>
                        <p className="text-[#704FE6] text-xs mt-1">
                          Junior Instructor
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#E9E2FF] rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-[18px] h-[7px] bg-[#704FE6] rotate-[-30deg]" />
                        <svg
                          className="w-5 h-5 text-[#704FE6] ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="12" x2="16" y2="12" />
                          <polyline points="12 8 16 12 12 16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eddie Lenz — Lower */}
                <div className="relative w-full max-w-[342px] h-[338px] mt-12">
                  <div className="absolute inset-0 rounded-lg overflow-hidden outline outline-[5.33px] outline-[#704FE6] -outline-offset-[5.33px]">
                    <img
                      src={trainer1}
                      alt="Eddie Lenz"
                      className="absolute left-[5.33px] top-[5.33px] w-[332px] h-[327px] object-cover rounded-lg"
                    />
                    <div className="absolute right-8 top-9 w-10 h-10 bg-[#704FE6] rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="17" cy="7" r="3"></circle>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="12" r="3"></circle>
                        <path
                          d="M14.5 8.5L9.5 11.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 15.5L9.5 12.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* centered name tag inside image */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[240px] h-[60px] bg-white rounded-lg shadow-2xl border border-purple-100 flex items-center px-5">
                      <div className="flex-1">
                        <h4 className="text-[#0E2A46] font-bold text-lg leading-tight">
                          Eddie Lenz
                        </h4>
                        <p className="text-[#704FE6] text-xs mt-1">
                          Junior Instructor
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-[#E9E2FF] rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-[18px] h-[7px] bg-[#704FE6] rotate-[-30deg]" />
                        <svg
                          className="w-5 h-5 text-[#704FE6] ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="4" y1="12" x2="16" y2="12" />
                          <polyline points="12 8 16 12 12 16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================== NEW TESTIMONIAL SECTION (REPLACES "RECOGNIZED BY") ================== */}
     <section
  className="relative py-28 overflow-hidden w-full"
  style={{
    backgroundImage: `url(${worldmap})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="relative max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-10">

    {/* Section Label */}
    <div className="text-center mb-6">
      <span className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-[#E5DEFF] text-[#7C3AED] text-[11px] font-semibold tracking-[0.18em] uppercase">
        Testimonial
      </span>
    </div>

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="font-dm-sans text-[40px] md:text-[46px] leading-tight font-extrabold text-[#050816]">
        Creating A Community Of
        <br />
        Life Long Learners.
      </h2>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">

      {[
        { name: "Kathy Sullivan", role: "CEO at ordian it" },
        { name: "Elsie Stroud", role: "CEO at Edwards" },
        { name: "Kathy Sullivan", role: "CEO at ordian it" },
      ].map((item, i) => (
        <div
          key={i}
          className="relative rounded-[22px] px-10 py-14 border shadow-xl"
          style={{
            backgroundColor: "transparent",
            borderColor: "#BFC2E2",
            borderWidth: "2.3px", // ⬅ thicker border
          }}
        >
          {/* Bigger Quote Symbol */}
          <div
            className="absolute -top-6 left-8 font-serif"
            style={{
              color: "#B8BACF",
              opacity: 0.55,
              fontSize: "85px", // ⬅ bigger quote
              lineHeight: "45px",
            }}
          >
            &ldquo;
          </div>

          <p className="text-[16px] leading-relaxed text-[#4B5563] mt-8">
            “Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim
            enim. Amet consectetur adipiscing”
          </p>

          <div className="mt-10">
            <div className="text-[16px] font-semibold text-[#111827]">
              {item.name}
            </div>
            <div className="mt-1 text-[14px] text-[#7C3AED]">{item.role}</div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>



        {/* ================== END NEW TESTIMONIAL SECTION ================== */}


        

        <Footer />
      </main>
    </div>
  );
};

export default Home;
