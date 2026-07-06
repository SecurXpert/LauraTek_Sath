import React from 'react';
import contactHeroBg from '@/assets/Background (1).png';

const ContactHeroSection: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[180px] xs:h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] flex items-center bg-[#111116] bg-cover bg-left md:bg-center bg-no-repeat" 
      style={{ backgroundImage: `url("${contactHeroBg}")` }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center h-full">
        {/* Text and image are baked into the background asset */}
      </div>
    </div>
  );
};

export default ContactHeroSection;
