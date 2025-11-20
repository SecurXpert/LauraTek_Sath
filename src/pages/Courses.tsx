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
import cloud from "@/assets/cloud1.jpg"
 
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
    description: "structured to equip you with professional skills in programming, database management, and building scalable APIs using FastAPI",
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
 
const Courses = () => {
  return (
    <div className="min-h-screen bg-background">
     <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>
     
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-course-hero to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-dm-sans  font-bold mb-4">
            All Courses
          </h1>
          <p className="text-xl font-mulish text-white/90 max-w-2xl mx-auto">
            Explore our comprehensive collection of industry-focused courses designed to advance your career.
          </p>
        </div>
      </section>
 
      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>
 
      <Footer />
    </div>
  );
};
 
export default Courses;