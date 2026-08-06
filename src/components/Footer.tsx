import React from 'react';
import { Globe, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] text-[#0F382C] border-t-2 border-[#C8A35F]/40 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Crest Mark Logo */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8A35F] p-1 bg-white shadow-sm mb-4">
          <img
            src="/images/logo.png"
            alt="Dharovar House Logo Crest"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold tracking-widest text-[#0F382C] mb-1">
          DHAROVAR HOUSE
        </h3>
        <p className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold mb-8">
          Youth Leadership • Social Welfare • Global Policy Forum
        </p>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#1A535C] mb-10">
          <a href="#home" className="hover:text-[#C8A35F] transition-colors">Home</a>
          <span>•</span>
          <a href="#about" className="hover:text-[#C8A35F] transition-colors">About Me</a>
          <span>•</span>
          <a href="#welfare" className="hover:text-[#C8A35F] transition-colors">Social Welfare</a>
          <span>•</span>
          <a href="#publications" className="hover:text-[#C8A35F] transition-colors">Publications</a>
          <span>•</span>
          <a href="#contact" className="hover:text-[#C8A35F] transition-colors">Contact</a>
        </div>

        <div className="gold-divider w-full max-w-xl mx-auto mb-8" />

        {/* Copyright & Credentials */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl text-xs text-[#1A535C]/70 gap-4">
          <p>© {new Date().getFullYear()} Dharovar House. All Rights Reserved. Mumbai, India.</p>
          <div className="flex items-center gap-4 text-[#9E7C3B]">
            <span className="flex items-center gap-1">
              <Globe size={13} />
              Mumbai Network
            </span>
            <span className="flex items-center gap-1">
              <Shield size={13} />
              Archival Standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
