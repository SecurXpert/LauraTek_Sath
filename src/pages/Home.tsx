import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Contactus from "@/components/ui/contactus";

import HeroSection from "@/components/home/HeroSection";
import HeroSectionNew from "@/components/home/HeroSectionNew";
import BrowseCategoriesSection from "@/components/home/BrowseCategoriesSection";
import TopCategorySection from "@/components/home/TopCategorySection";
import UniqueSection from "@/components/home/UniqueSection";
import AboutUsSection from "@/components/home/AboutUsSection";
import PopularCoursesSection from "@/components/home/PopularCoursesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TrendingCoursesSection from "@/components/home/TrendingCoursesSection";
import WorkshopTestimonialSection from "@/components/home/WorkshopTestimonialSection";
import ContactFaqSection from "@/components/home/ContactFaqSection";
import NewsletterFooterSection from "@/components/home/NewsletterFooterSection";

const Home = () => {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCourseTab, setActiveCourseTab] = useState("All");

  // Handle scroll on load if there's a hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background">
        <Header />
      </div>

      {/* Main content */}
      <main className="flex-1 ">
        <HeroSection />
        <HeroSectionNew />
        <BrowseCategoriesSection />
        <TopCategorySection />
        <UniqueSection />
        <AboutUsSection />
        <PopularCoursesSection activeCourseTab={activeCourseTab} setActiveCourseTab={setActiveCourseTab} />
        <WhyChooseUsSection />
        <TrendingCoursesSection />
        <WorkshopTestimonialSection />
        <ContactFaqSection />
        <Contactus open={contactOpen} setOpen={setContactOpen} />
        <NewsletterFooterSection />
      </main>
    </div>
  );
};

export default Home;
