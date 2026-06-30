import React from 'react';
import { ChevronRight } from 'lucide-react';

const PremiumBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#191147] via-[#24135D] to-[#36278A] rounded-[24px] p-6 lg:p-8 relative overflow-hidden shadow-lg border border-[#4837A3] w-full mt-2">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 relative hidden sm:block">
            <div className="absolute inset-0 bg-transparent rounded-xl transform flex items-center justify-center">
              <span className="text-[40px] filter drop-shadow-[0_0_12px_rgba(91,79,255,0.6)]">🚀</span>
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase mb-1">Next-Generation Platform</p>
            <h2 className="text-[24px] font-bold text-white mb-2">Become Interview Ready</h2>
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#D8B4FE]">
              <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> Practice coding daily</span>
              <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> Master DSA</span>
              <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> Build confidence</span>
              <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> Crack top tech interviews</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-gray-50 text-[#5B4FFF] text-[13px] font-bold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2">
            Start Learning <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-transparent border border-white/20 text-white hover:bg-white/10 text-[13px] font-bold rounded-full transition-colors whitespace-nowrap">
            Explore Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;
