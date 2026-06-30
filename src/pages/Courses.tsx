import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Import course images
import webDevCourse from "@/assets/UIUX Developer1.jpg";
import python from "@/assets/python1.jpg";
import node from "@/assets/node1.jpg";
import react from "@/assets/react1.jpg";
import java from "@/assets/java1.jpg";
import sql from "@/assets/sql1.jpg";
import cloud from "@/assets/cloud1.jpg";
import iot from "@/assets/iot.png";
import embeddedlinux from "@/assets/embeddedlinux.png";
import embeddedsystems from "@/assets/embeddedsystems.png";
import printing from "@/assets/3dprinting.png";
import building from "@/assets/buildinginformationmodeling.png"
import Construction from "@/assets/constructionplanning.png";
import industrial from "@/assets/industrialautomation.png";
import evtechnology from "@/assets/evtechnology.png";
import productdesign from "@/assets/productdesign.png";
import solar from "@/assets/solarsystemdesign.png";
import structural from "@/assets/structuraldesign.png";
import power from "@/assets/powersystemsimulation.png"

const allCourses = [
 {
   id: "web-development",
   title: "UI/UX Design",
   image: webDevCourse,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "ReactJS",
   title: "ReactJS Developer",
   image: react,
   description: " Build high-performing, responsive web and mobile applications using a single JavaScript library — React.",
   duration: "16 weeks",
   level: "Intermediate"
 },
 {
   id: "Python",
   title: "Python Developer",
   image: python,
   description: "structured to equip you with professional skills in programming, database management, and building ",
   duration: "8 weeks",
   level: "Beginner"
 },
 {
   id: "Java Developer",
   title: "Java Developer",
   image: java,
   description: " Develop secure, scalable, and high-performance backend systems using Java — one of the most trusted languages in the software industry.",
   duration: "10 weeks",
   level: "Advanced"
 },
 {
   id: "Node.js Developer",
   title: "Node.js Developer",
   image: node,
   description: "Thoughtfully designed to help you build scalable, high-performance server-side applications using JavaScript — the language you already know from the frontend",
   duration: "20 weeks",
   level: "Advanced"
 },
 {
   id: "SQL & Database Management ",
   title: "SQL & Database Management ",
   image: sql,
   description: "Help you learn how to manage and query structured data in relational databases to support analysis, reporting, and application development.",
   duration: "6 weeks",
   level: "Intermediate"
 },
   {
   id: "Cloud + DevOps Program",
   title: " Cloud + DevOps Program",
   image: cloud,
   description: " secure environments, automate CI/CD pipelines, and operate mission-critical applications in multi-cloud environments",
   duration: "6 weeks",
   level: "Intermediate"
 },
 {
   id: "Java fullStack Developer",
   title: "Java FullStack Developer",
   image: java,
   description: "Designed to help you build dynamic web applications from the ground up — covering frontend design, backend logic, and database integration using industry-standard Java technologies.",
   duration: "6 weeks",
   level: "Intermediate"
 }
];

const MechCourses = [
 {
   id: "Additive Manufacturing & 3D Printing",
   title: "Additive Manufacturing & 3D Printing",
   image: printing,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "EV Technology & Powertrain Systems",
   title: "EV Technology & Powertrain Systems",
   image: evtechnology,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "Product Design & Prototyping",
   title: "Product Design & Prototyping ",
   image: productdesign,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
];
// ECE Courses
const EceCourses = [
 {
   id: "Embedded Systems",
   title: "Embedded Systems",
   image: embeddedsystems,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "Internet of Things (IoT)",
   title: "Internet of Things (IoT)",
   image: iot,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "Embedded Linux",
   title: "Embedded Linux",
   image: embeddedlinux,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
];
// Civil
const civilCourses = [
 {
   id: "Building Information Modeling (BIM) ",
   title: "Building Information Modeling (BIM) ",
   image: building,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "ETABS & STAAD for Structural Design ",
   title: "ETABS & STAAD for Structural Design ",
   image: structural,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "Construction Planning & Primavera",
   title: "Construction Planning & Primavera",
   image: Construction,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
];

// EEE
const EeeCourses = [
 {
   id: "Solar PV System Design",
   title: "Solar PV System Design",
   image: solar,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "PLC & Industrial Automation ",
   title: "PLC & Industrial Automation",
   image: industrial,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
 {
   id: "Power System Simulation (MATLAB)",
   title: "Power System Simulation (MATLAB)",
   image: power,
   description: "Designed to build industry-ready professionals skilled in both design principles and front-end development..",
   duration: "12 weeks",
   level: "Beginner"
 },
];

// ECE

const CourseSection = ({ title, courses }: { title: string; courses: any[] }) => {
  const isITSection = title === "IT";
  const gridCols = isITSection ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-10 text-gray-800">
        {title}
      </h2>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8 justify-items-center`}>
          {courses.map((course) => (
            <div key={course.id} className="w-full max-w-sm">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
      {/*  SCROLLBAR HIDDEN GLOBALLY (ONLY ADDITION) */}
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


      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-course-hero to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-dm-sans font-bold mb-4">
            All Courses
          </h1>
          <p className="text-xl font-mulish text-white/90 max-w-2xl mx-auto">
            Explore Our Comprehensive Collection Of Industry-focused Courses Designed To Advance Your Career.
          </p>
        </div>
      </section>

<CourseSection title="Learn the IT skills companies hire for with real-time project exposure." courses={allCourses} />
 
      {/* Civil - 3 cards centered */}
      <CourseSection title="Master Essential Civil Skills Through Clear And Real-world Training." courses={civilCourses} />
 
      {/* Mechanical */}
      <CourseSection title="Master core mechanical skills with real projects and clear guidance" courses={MechCourses} />
 
      {/* EEE */}
      <CourseSection title="Start Your EEE Journey With Hands-on And  Career-focused Learning." courses={EeeCourses} />
 
      {/* ECE */}
      <CourseSection title="Discover ECE courses built for real-world electronics and communication careers" courses={EceCourses} />

      <Footer />
    </div>
  );
};
export default Courses;
