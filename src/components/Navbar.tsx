import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Award, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'welfare', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Me', href: '#about', id: 'about' },
    { name: 'Social Welfare', href: '#welfare', id: 'welfare' },
    { name: 'Publications', href: '#publications', id: 'publications' },
    { name: 'Socials & Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#C8A35F]/30 py-3.5'
          : 'bg-[#FAF8F5] border-b border-[#C8A35F]/20 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Crest & Title */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C8A35F]/50 p-0.5 bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/images/logo.png"
              alt="Dharovar House Crest"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-widest text-[#0F382C] group-hover:text-[#1A535C] transition-colors">
              DHAROVAR HOUSE
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#C8A35F] font-semibold uppercase -mt-1">
              Mumbai • India
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative py-1 ${
                activeSection === link.id
                  ? 'text-[#0F382C]'
                  : 'text-[#1A535C]/80 hover:text-[#0F382C]'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A35F] rounded-full animate-pulse" />
              )}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0F382C] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[#FAF8F5] z-40 flex flex-col justify-between px-6 py-8 border-t border-[#C8A35F]/20 animate-fadeIn">
          <div className="flex flex-col gap-6 items-center pt-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-2xl tracking-wide ${
                  activeSection === link.id
                    ? 'text-[#C8A35F] font-semibold'
                    : 'text-[#0F382C]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-center border-t border-[#C8A35F]/20 pt-6">
            <p className="text-xs text-[#1A535C]/70 tracking-widest uppercase mb-3">
              Dharovar House • Policy & Welfare Forum
            </p>
            <div className="flex justify-center gap-4 text-[#C8A35F]">
              <Globe size={18} />
              <Award size={18} />
              <BookOpen size={18} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
