import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import placement from "@/assets/placement.jpg";
import project from "@/assets/project.jpg";
import training from "@/assets/training.jpg";
import  mission from "@/assets/mission.jpg";
import vision from "@/assets/vision.jpg";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-course-hero via-primary to-course-gradient-end text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About LauraTek</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Where education meets execution — and ambition meets achievement.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
      <section className="py-16">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12">
  
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 bg-indigo-100 flex items-center justify-center p-0 overflow-hidden">
          <img 
            src={mission}
            alt="Mission image" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide industry-relevant, experiential learning that prepares learners for the demands of real-world technology jobs — going far beyond the boundaries of classroom theory and examination-based education.
          </p>
        </div>
      </div>
      
    
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 bg-indigo-100 flex items-center justify-center p-0 overflow-hidden">
          <img 
            src={vision}
            alt="Vision image" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to help every learner succeed — by offering practical tech training, real-time experience, and placement support that prepares them for real jobs, no matter where they come from.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
        {/* Why LauraTek Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Why We Built LauraTek
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              At LauraTek, we believe learning should go beyond the classroom. Our platform is designed to ensure that every learner not only understands concepts but also knows how to apply them in practical situations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Live Instructor-Led Sessions",
                  description: "Learn from working professionals with real-world insights.",
                  icon: "🎓"
                },
                {
                  title: "Real-Time Projects",
                  description: "Work on live company platforms like OneStep Medi and DOHRA HRMS.",
                  icon: "💻"
                },
                {
                  title: "Placement Assistance",
                  description: "End-to-end support with resume building, mock interviews, and more.",
                  icon: "🤝"
                },
                {
                  title: "Hybrid Learning",
                  description: "Flexible online and in-class training at our Hyderabad center.",
                  icon: "🌐"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              What Makes LauraTek Different?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Trainers",
                  description: "Mentors with 8–12+ years of experience in full-stack, DevOps, cloud, and AI.",
                  image: training
                },
                {
                  title: "Real-Time Project Exposure",
                  description: "Build portfolios with hands-on projects that mirror real job roles.",
                  image: project
                },
                {
                  title: "Placement-First Approach",
                  description: "From resume preparation to recruitment drives, we ensure your employability.",
                  image: placement
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;