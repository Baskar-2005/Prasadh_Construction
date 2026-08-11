import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Eye,
  Calendar,
  Coins,
  Compass,
  CheckCircle2,
  FileCheck2,
  Send,
  Building,
  Phone,
  MessageSquare,
  Award,
  ShieldCheck,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  FileCode2
} from 'lucide-react';
import { CONSULTANCY_FEATURES, COMPANY_INFO } from '../data/mockData';
import { ConsultancyFeature } from '../types';

interface ConsultancyProps {
  onOpenConsultationModal: (title?: string) => void;
}

// Extra technical metadata for each consultancy feature
const FEATURE_SPECS: Record<string, { software: string; compliance: string; turnaround: string; stamp: string }> = {
  'c-1': {
    software: 'STAAD.Pro V8i & ETABS 20',
    compliance: 'IS 456:2000 & IS 1893:2016 (Seismic)',
    turnaround: '48 - 72 Hours Express Delivery',
    stamp: 'Chartered Civil Engineer Sign-off'
  },
  'c-2': {
    software: 'Ultrasonic Pulse Velocity & NDT',
    compliance: 'IS 516 (Concrete Testing Standards)',
    turnaround: '24-Hour Post-Audit Report',
    stamp: 'On-Site Quality Verification Seal'
  },
  'c-3': {
    software: 'Primavera P6 & MS Project Matrix',
    compliance: 'Lean Construction Management',
    turnaround: 'Customized Project Gantt Chart',
    stamp: 'Resource & Labor Allocation Audit'
  },
  'c-4': {
    software: 'Quantity Surveying & Auto-BOQ Engine',
    compliance: 'CPWD Specifications & DSR Standards',
    turnaround: 'Bank Loan Approved Estimation Sheet',
    stamp: 'Zero-Escalation Price Certification'
  },
  'c-5': {
    software: 'AutoCAD 3D & Vaastu Energy Alignment',
    compliance: 'Traditional Tamil Vaastu Shastra & NBC',
    turnaround: 'Interactive 2D/3D Plan Package',
    stamp: 'Architectural Approval Guarantee'
  }
};

export const Consultancy: React.FC<ConsultancyProps> = ({ onOpenConsultationModal }) => {
  const [activeFeature, setActiveFeature] = useState<ConsultancyFeature>(CONSULTANCY_FEATURES[0]);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTabMouseEnter = (feat: ConsultancyFeature) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // 60ms subtle delay makes mouse movement intentional and prevents accidental jitter
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveFeature(feat);
    }, 60);
  };

  const handleTabMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleTabClick = (feat: ConsultancyFeature) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveFeature(feat);
  };

  const getConsultancyIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'Coins': return <Coins className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      default: return <Building className={className} />;
    }
  };

  const specs = FEATURE_SPECS[activeFeature.id] || {
    software: 'STAAD.Pro & AutoCAD 3D',
    compliance: 'IS 456 Structural Codes',
    turnaround: 'Rapid Engineering Turnaround',
    stamp: 'Certified Engineering Seal'
  };

  const encodedWhatsAppMsg = encodeURIComponent(
    `Hello Er. S. Vishnu Prasadh, I would like to inquire about your Engineering Consultancy service: "${activeFeature.title}". Please provide details on structural auditing and pricing.`
  );

  return (
    <section id="consultancy" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F59E0B 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px, 64px 64px, 64px 64px'
        }}
      />
      
      {/* Glowing Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          {/* Top Tag & Floating Accreditation Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-400/30 inline-flex items-center gap-1.5 shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Certified Engineering Office
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Expert Consultation.{' '}
            <span className="shiny-text-gold inline-block">
              Stronger Construction.
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Even if you already have an active contractor, our independent engineering consultancy ensures your building is 100% structurally safe, cost-optimized, and IS-code compliant.
          </p>

          {/* Floating Badges Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>STAAD.Pro & ETABS Certified Analysis</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>IS Code 456 & 1893 Compliant</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Independent Site Audits</span>
            </div>
          </div>
        </motion.div>

        {/* CONSULTANCY MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 3D/Glass Tab Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 flex items-center justify-between">
              <span>Select Consultancy Service</span>
              <span className="text-[11px] text-amber-400 font-medium">5 Core Disciplines</span>
            </div>

            <div className="space-y-2.5">
              {CONSULTANCY_FEATURES.map((feat) => {
                const isSelected = activeFeature.id === feat.id;
                return (
                  <div
                    key={feat.id}
                    onClick={() => handleTabClick(feat)}
                    onMouseEnter={() => handleTabMouseEnter(feat)}
                    onMouseLeave={handleTabMouseLeave}
                    className="relative group cursor-pointer"
                  >
                    {/* Active Tab Sliding Pill Highlight via layoutId */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeConsultancyTab"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-400/50 rounded-2xl shadow-xl shadow-amber-500/15 pointer-events-none"
                      >
                        <div className="absolute inset-0 bg-amber-400/5 rounded-2xl" />
                      </motion.div>
                    )}

                    <div className={`relative p-4 rounded-2xl transition-all duration-300 transform-gpu flex items-center justify-between border ${
                      isSelected
                        ? 'text-white border-transparent translate-x-1 sm:translate-x-1.5 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 hover:bg-slate-900/95 text-slate-300 border-white/10 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10 hover:translate-x-1 sm:hover:translate-x-1.5'
                    }`}>
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 group-hover:text-amber-400 group-hover:bg-slate-800/80'
                        }`}>
                          {getConsultancyIcon(feat.iconName, "w-5 h-5")}
                        </div>
                        <div>
                          <h3 className={`text-sm font-bold font-display transition-colors ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {feat.title}
                          </h3>
                          <p className={`text-[11px] transition-colors ${
                            isSelected ? 'text-amber-300/90' : 'text-slate-400'
                          }`}>
                            Certified Engineering Standards • Certified
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isSelected ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Engineer Contact Callout */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 font-bold text-xs">
                    VP
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full animate-ping" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Er. S. Vishnu Prasadh</p>
                  <p className="text-[11px] text-emerald-400 font-medium">● Instant Call with Er. S. Vishnu Prasadh</p>
                </div>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="px-3.5 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Active Feature Detail Panel with Dynamic Reveal */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-6 sm:p-8 md:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-2xl relative overflow-hidden"
              >
                {/* Background CAD Graphic Accent */}
                <div className="absolute -top-6 -right-6 p-8 opacity-10 pointer-events-none text-amber-400">
                  {getConsultancyIcon(activeFeature.iconName, "w-36 h-36")}
                </div>

                {/* Scope Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Specialized Engineering Scope</span>
                  </div>

                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    STAAD.Pro / ETABS Verified
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4 leading-tight">
                  {activeFeature.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                  {activeFeature.description}
                </p>

                {/* Key Deliverables Block */}
                <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/10 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-amber-400" />
                      Key Tangible Deliverables
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                      Engineering Guarantee
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {activeFeature.keyOutputs.map((out, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08 }}
                        className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-amber-400/30 transition-all group"
                      >
                        <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-slate-200 leading-snug">
                          {out}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                      Software / Tool
                    </span>
                    <span className="font-bold text-slate-200 block truncate">
                      {specs.software}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                      IS Code Standard
                    </span>
                    <span className="font-bold text-slate-200 block truncate">
                      {specs.compliance}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                      Estimated Turnaround
                    </span>
                    <span className="font-bold text-slate-200 block truncate">
                      {specs.turnaround}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                      Certification Seal
                    </span>
                    <span className="font-bold text-amber-300 block truncate">
                      {specs.stamp}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  {/* Primary Request Button */}
                  <button
                    onClick={() => onOpenConsultationModal(`Consultancy: ${activeFeature.title}`)}
                    className="relative overflow-hidden group flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-full transition-all duration-300 shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep pointer-events-none" />
                    <Send className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Request Calculation / Audit</span>
                  </button>

                  {/* Direct WhatsApp Query Button */}
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodedWhatsAppMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 hover:border-emerald-400 rounded-full transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Query</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 text-center sm:text-left mt-3 font-medium">
                  ✓ Direct consultation with Er. S. Vishnu Prasadh (+91 80566 58861) • No obligation quote
                </p>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
