import React from 'react';
import contactHeroBg from '@/assets/Background (1).png';

const ContactHeroSection: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] flex items-center bg-[#111116] bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url("${contactHeroBg}")` }}
    >
      {/* Text and image are baked into the background asset */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center h-full">
      </div>
    </div>
  );
};

export default ContactHeroSection;
