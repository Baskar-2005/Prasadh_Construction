import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, Heart, Star, Lock, LayoutDashboard } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import prasadhLogoEmblem from '../assets/images/prasadh_logo_emblem_1786205642641.jpg';
import { useCMS } from '../context/CMSContext';

export const Footer: React.FC = () => {
  const { companyInfo, openLoginModal, openDashboard, isAuthenticated } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-12 relative overflow-hidden border-t border-slate-800">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-400/40 shadow-lg group-hover:border-amber-300 transition-all shrink-0">
                <img
                  src={prasadhLogoEmblem}
                  alt="Prasadh Construction Emblem"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold tracking-wider text-base font-display text-white">
                  PRASADH
                </span>
                <span className="font-bold tracking-widest text-xs font-display text-amber-400">
                  CONSTRUCTION
                </span>
                <span className="text-[9px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">
                  Company & Consultant • Virudhachalam
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Engineering excellence, modern architecture, structural consultancy, and turnkey project execution with uncompromising quality and 100% itemized pricing transparency.
            </p>

            <div className="inline-flex items-center gap-2 p-2 px-3 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-slate-500">• 68 Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Firm</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Project Portfolio</a></li>
              <li><a href="#consultancy" className="hover:text-white transition-colors">Structural Consultancy</a></li>
              <li><a href="#cost-estimator" className="hover:text-white transition-colors">Cost Estimator</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Office</a></li>
            </ul>
          </div>

          {/* Col 3: Practice Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
              Services Scope
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Residential Luxury Villas</li>
              <li>Commercial Building Hubs</li>
              <li>Structural Rebar Analysis</li>
              <li>2D/3D Architectural Layouts</li>
              <li>DTCP / Panchayat Approvals</li>
              <li>Turnkey Interior Joinery</li>
              <li>Building Renovation</li>
            </ul>
          </div>

          {/* Col 4: Address & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
              Office Locations & Contact
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              📍 <strong>Main:</strong> {companyInfo.address}
            </p>
            {companyInfo.branchAddress && (
              <p className="text-xs text-slate-300 leading-relaxed">
                📍 <strong>Branch:</strong> {companyInfo.branchAddress}
              </p>
            )}
            <p className="text-xs text-slate-300">
              📞 <a href={`tel:${companyInfo.phone}`} className="hover:text-amber-300 font-semibold">{companyInfo.phone}</a>
              {companyInfo.secondaryPhone && (
                <span className="block text-slate-400 text-[11px] mt-0.5">Secondary: {companyInfo.secondaryPhone}</span>
              )}
            </p>
            <p className="text-xs text-slate-300 truncate">
              ✉️ <a href={`mailto:${companyInfo.email}`} className="hover:text-amber-300">{companyInfo.email}</a>
            </p>
            {companyInfo.gstin && (
              <p className="text-[11px] text-amber-300 font-mono">
                GSTIN: {companyInfo.gstin}
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-2">
              ⏰ {companyInfo.hours}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Prasadh Construction Company & Consultant. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={openDashboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all text-[11px] font-semibold"
                title="Open Admin CMS Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                CMS Dashboard
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-all text-[11px] font-medium"
                title="Admin Content Management Login"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin CMS
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors border border-slate-800"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
