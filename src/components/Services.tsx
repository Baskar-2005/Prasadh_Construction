import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Building2,
  Compass,
  Ruler,
  FileCheck,
  Paintbrush,
  Hammer,
  Key,
  ShieldCheck,
  Calculator,
  ArrowRight,
  X,
  Check,
  Send
} from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ServiceItem } from '../types';
import { useCMS } from '../context/CMSContext';

interface ServicesProps {
  onOpenConsultationModal: (serviceTitle?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenConsultationModal }) => {
  const { services } = useCMS();
  const visibleServices = services.filter((s) => !s.hidden);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string, className = "w-4 h-4 sm:w-6 sm:h-6") => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Ruler': return <Ruler className={className} />;
      case 'FileCheck': return <FileCheck className={className} />;
      case 'Paintbrush': return <Paintbrush className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Key': return <Key className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Calculator': return <Calculator className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Comprehensive Services
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Full-Spectrum Construction & <span className="shiny-text-blue">Engineering Expertise.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 font-normal leading-relaxed">
            From initial soil test calculations to final key handover, we provide single-window engineering excellence tailored for residential and commercial success.
          </p>
        </motion.div>

        {/* 10 Services Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6">
          {visibleServices.map((serv, index) => (
            <motion.div
              key={serv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white shadow-xs hover:shadow-xl border border-slate-200/80 hover:border-[#1E3A8A] transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedService(serv)}
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 group-hover:bg-[#1E3A8A] text-[#1E3A8A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-2.5 sm:mb-5">
                  {getServiceIcon(serv.iconName, "w-4 h-4 sm:w-6 sm:h-6")}
                </div>

                <h3 className="text-xs sm:text-base font-bold text-[#0F172A] font-display mb-1 sm:mb-2 group-hover:text-[#1E3A8A] transition-colors leading-tight">
                  {serv.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 sm:line-clamp-3 leading-tight sm:leading-relaxed">
                  {serv.description}
                </p>
              </div>

              <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs font-semibold text-[#1E3A8A]">
                <span>Scope & Specs</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Need Custom Engineering Guidance?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-1">
              Have a specialized plot or commercial project requirement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Book a direct 1-on-1 session with Er. S. Vishnu Prasadh in Virudhachalam.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultationModal('Custom Engineering Project')}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform shrink-0"
          >
            Book Free Site Inspection
          </button>
        </div>

      </div>

      {/* SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 text-[#1E3A8A] rounded-2xl">
                  {getServiceIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] font-display">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Prasadh Engineering Scope
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedService.description}
              </p>

              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Key Deliverables & Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-6">
                <span className="font-bold block mb-0.5">Ideal For:</span>
                {selectedService.idealFor}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onOpenConsultationModal(title);
                  }}
                  className="flex-1 py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Request Quote for {selectedService.title}</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
