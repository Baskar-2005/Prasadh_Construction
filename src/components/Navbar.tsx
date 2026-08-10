import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, Menu, X, FileText, Lock, LayoutDashboard } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import prasadhLogoEmblem from '../assets/images/prasadh_logo_emblem_1786205642641.jpg';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onOpenConsultationModal: () => void;
  onOpenCompanyProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultationModal,
  onOpenCompanyProfileModal
}) => {
  const { isAuthenticated, openLoginModal, openDashboard } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Consultancy', href: '#consultancy' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-500 ease-out pointer-events-none">
      <div className={`mx-auto transition-all duration-500 ease-out pointer-events-auto ${
        scrolled ? 'max-w-5xl' : 'max-w-7xl'
      }`}>
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between transition-all duration-500 ease-out rounded-full ${
            scrolled
              ? 'bg-slate-900/92 backdrop-blur-2xl border border-white/20 shadow-2xl py-1.5 px-4 sm:px-6'
              : 'bg-transparent border border-transparent py-3 px-3 sm:px-5'
          }`}
        >
          {/* Brand Logo - Top PRASADH, Bottom CONSTRUCTION */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 group transition-all duration-300 shrink-0 whitespace-nowrap"
          >
            <div className={`relative flex items-center justify-center rounded-xl overflow-hidden border border-amber-400/40 shadow-lg group-hover:border-amber-300 group-hover:scale-105 group-hover:shadow-amber-500/25 transition-all duration-300 shrink-0 ${
              scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-10 h-10 sm:w-11 sm:h-11'
            }`}>
              <img
                src={prasadhLogoEmblem}
                alt="Prasadh Construction Emblem"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col justify-center whitespace-nowrap leading-tight">
              <span className={`font-extrabold tracking-wider text-white font-display drop-shadow-sm transition-all duration-300 ${
                scrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
              }`}>
                PRASADH
              </span>
              <span className={`font-bold tracking-widest text-amber-400 font-display transition-all duration-300 ${
                scrolled ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
              }`}>
                CONSTRUCTION
              </span>
              {!scrolled && (
                <span className="text-[9px] text-slate-300 font-medium tracking-widest uppercase hidden sm:block opacity-90 transition-opacity duration-300">
                  & Consultant • Virudhachalam
                </span>
              )}
            </div>
          </a>

          {/* Desktop Nav Links with Vertical Dividers */}
          <div className={`hidden lg:flex items-center rounded-full transition-all duration-300 shrink-0 whitespace-nowrap ${
            scrolled
              ? 'p-0.5 bg-white/10 border border-white/15 gap-0.5'
              : 'p-1 bg-slate-950/40 backdrop-blur-md border border-white/15 gap-1'
          }`}>
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                {index > 0 && (
                  <span className={`w-px shrink-0 bg-white/20 my-auto transition-all ${
                    scrolled ? 'h-3' : 'h-3.5'
                  }`} />
                )}
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-medium tracking-wide text-slate-100 hover:text-amber-300 rounded-full hover:bg-white/15 transition-all duration-200 whitespace-nowrap ${
                    scrolled ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm'
                  }`}
                >
                  {link.name}
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap">
            {/* Admin CMS Button */}
            {isAuthenticated ? (
              <button
                onClick={openDashboard}
                className={`flex items-center gap-1.5 font-semibold text-amber-300 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 rounded-full transition-all backdrop-blur-md shadow-2xs whitespace-nowrap ${
                  scrolled ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'
                }`}
                title="Open CMS Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className={`flex items-center gap-1.5 font-medium text-slate-300 hover:text-amber-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-all backdrop-blur-md shadow-2xs whitespace-nowrap ${
                  scrolled ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs'
                }`}
                title="Admin Login"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* Call Now Button */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className={`flex items-center gap-1.5 font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all backdrop-blur-md shadow-2xs hover:shadow-xs whitespace-nowrap ${
                scrolled ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-xs sm:text-sm'
              }`}
            >
              <Phone className="text-amber-300 w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Call Now</span>
            </a>

            {/* Book Consultation Button */}
            <button
              onClick={onOpenConsultationModal}
              className={`flex items-center gap-1.5 font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap ${
                scrolled ? 'px-3.5 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm'
              }`}
            >
              <Calendar className="text-slate-950 w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenConsultationModal}
              className={`sm:hidden flex items-center gap-1 font-bold text-slate-950 bg-amber-400 rounded-full shadow-md ${
                scrolled ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]'
              }`}
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-white/20 transition-all backdrop-blur-md ${
                scrolled ? 'p-1.5' : 'p-2'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={scrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              ) : (
                <Menu className={scrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              )}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden max-w-7xl mx-auto mt-2 overflow-hidden pointer-events-auto"
          >
            <div className="bg-slate-900/95 backdrop-blur-2xl p-5 rounded-3xl shadow-2xl border border-white/20 flex flex-col gap-3 text-white">
              <div className="grid grid-cols-2 gap-2">
                {[...navLinks, { name: 'Reviews', href: '#reviews' }].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="p-3 text-xs font-semibold text-slate-200 hover:text-amber-300 hover:bg-white/10 rounded-2xl transition-colors border border-transparent hover:border-white/10"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="h-px bg-white/10 my-1" />

              <div className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openDashboard();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-amber-300 bg-amber-400/20 hover:bg-amber-400/30 rounded-2xl border border-amber-400/30"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-300" />
                    <span>Open Admin CMS Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLoginModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Admin CMS Login</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCompanyProfileModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-2xl border border-white/15"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>View Company Profile PDF</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-2xl border border-white/15"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Call +91 80566 58861</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultationModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 rounded-2xl shadow-lg"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book Free Consultation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
