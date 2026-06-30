import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfoCards: React.FC = () => {
  return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px] mt-16 relative z-20 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-[#F6F7F9] rounded-[20px] p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow border-b-4 border-[#273B96]">
              <div className="w-12 h-12 rounded-full bg-[#273B96] text-white flex items-center justify-center mb-6 shadow-md">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-[#050816] font-extrabold text-[16px] mb-2 tracking-wide">Call US 24/7</h3>
              <p className="text-[#64748B] font-medium text-[14px]">(316) 555-0116</p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#273B96] rounded-[20px] p-10 flex flex-col items-center justify-center text-center shadow-lg transform md:-translate-y-2 hover:-translate-y-4 transition-transform text-white border-b-4 border-[#1E2E78]">
              <div className="w-12 h-12 rounded-full bg-white text-[#273B96] flex items-center justify-center mb-6 shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[16px] mb-2 tracking-wide">Email Us Anytime</h3>
              <p className="text-blue-100 font-medium text-[14px]">tranthuy.nute@gmail.com</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F6F7F9] rounded-[20px] p-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow border-b-4 border-[#273B96]">
              <div className="w-12 h-12 rounded-full bg-[#273B96] text-white flex items-center justify-center mb-6 shadow-md">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-[#050816] font-extrabold text-[16px] mb-2 tracking-wide">Our Location</h3>
              <p className="text-[#64748B] font-medium text-[14px]">George Bush Intercontinental Airport</p>
            </div>

          </div>
        </div>
  );
};

export default ContactInfoCards;
