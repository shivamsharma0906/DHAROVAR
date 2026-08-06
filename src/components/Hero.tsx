import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Compass, BookOpen, ShieldCheck, Sparkles, Landmark, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Archival Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative bg-white rounded-2xl p-8 sm:p-12 md:p-16 border border-[#E8E2D8] shadow-soft text-center overflow-hidden"
        >
          {/* Subtle Corner Gold Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C8A35F]/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C8A35F]/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#C8A35F]/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C8A35F]/40" />

          {/* Central Logo Crest Banner */}
          <div className="inline-flex flex-col items-center mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#C8A35F]/60 p-1.5 bg-[#FAF8F5] shadow-sm mb-4 relative hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Dharovar House Archival Crest"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#9E7C3B]">
              <Sparkles size={13} className="text-[#C8A35F]" />
              <span>Independent Think Tank • Mumbai, India</span>
              <Sparkles size={13} className="text-[#C8A35F]" />
            </div>
          </div>

          {/* H1 Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F382C] leading-[1.15] max-w-3xl mx-auto mb-6">
            Reimagining India's Position in <span className="text-[#C8A35F] italic font-serif">Global Affairs.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#1A535C]/90 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            A youth-led, independent think tank dedicated to a grounded, unapologetic, historically aware, and postcolonial critique of global affairs—placing <span className="font-semibold text-[#0F382C] underline decoration-[#C8A35F]/50 underline-offset-4">India's civilizational ethos</span> at the center of strategic debates.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 bg-[#0F382C] text-[#FAF8F5] font-semibold text-sm rounded-full shadow-md hover:bg-[#1A535C] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Our Areas of Focus</span>
              <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#publications"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#0F382C] border-2 border-[#C8A35F] font-semibold text-sm rounded-full hover:bg-[#C8A35F]/10 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={18} className="text-[#C8A35F]" />
              <span>Read Research Publications</span>
            </a>
          </div>

          {/* Policy Badges Footer Ribbon */}
          <div className="pt-8 border-t border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#1A535C]">
            <div className="flex items-center justify-center gap-2">
              <Landmark size={15} className="text-[#C8A35F]" />
              <span>Domestic Policy & Governance</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Globe size={15} className="text-[#C8A35F]" />
              <span>Indian External Relations</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass size={15} className="text-[#C8A35F]" />
              <span>Geopolitics & Multipolar Order</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
