import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  Star,
  Award,
  CheckCircle2,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import prasadhHeroBg from '../assets/Prasadh_Hero2.png';

interface HeroProps {
  onOpenConsultationModal: () => void;
  onSelectProject: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultationModal
}) => {
  // Ultra-Smooth GPU-Accelerated Parallax Scroll Effect
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 800], [0, 150]);
  const yBg = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacityText = useTransform(scrollY, [0, 500], [1, 0.9]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex flex-col justify-center bg-slate-950 text-white">
      
      {/* 1. FULL WIDTH & FULL HEIGHT PARALLAX BACKGROUND IMAGE WITH HARDWARE ACCELERATION */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[135%] -top-[18%] pointer-events-none z-0 overflow-hidden will-change-transform transform-gpu translate-z-0"
      >
        <img
          src={prasadhHeroBg}
          alt="Prasadh Construction Architectural Building Facade"
          className="w-full h-full object-cover object-[center_50%] sm:object-[center_45%] md:object-[center_42%] filter brightness-105 contrast-[1.02] saturate-[1.05] transition-opacity duration-700 scale-105 transform-gpu"
        />
      </motion.div>

      {/* 2. TARGETED GRADIENT OVERLAYS - KEEPING IMAGE ULTRA BRIGHT WHILE ENSURING TEXT READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 z-1 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-1" />

      {/* 3. HERO CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 my-auto">
        
        {/* Floating Right-Side Glass Badge */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            scale: { duration: 0.8, delay: 0.6 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
          className="hidden lg:flex absolute top-28 xl:top-32 right-4 sm:right-6 xl:right-12 z-20 items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-amber-400/30 shadow-2xl max-w-xs pointer-events-auto"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shrink-0">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-white">4.9 ★</span>
              <span className="text-xs font-semibold text-amber-300">Google Rated</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">
              STAAD.Pro Certified Structural Consultancy
            </p>
          </div>
        </motion.div> */}

        {/* Top Registered Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-amber-500/30 shadow-xl max-w-full"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
            <span className="text-xs font-bold text-slate-100 tracking-wide truncate">
              Registered Structural Consultancy • <span className="shiny-text-gold">Er. S. Vishnu Prasadh</span>
            </span>
          </motion.div>
        </div>

        {/* HERO MAIN TEXT CONTENT */}
        <motion.div
          style={{ opacity: opacityText }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display drop-shadow-md"
          >
            Building{' '}
            <span className="shiny-text-gold inline-block">
              Strong Foundations
            </span>{' '}
            <br className="hidden sm:inline" />
            <span className="text-white">For Better Living.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm"
          >
            Professional residential & commercial construction, 2D/3D architectural planning, STAAD.Pro structural consultancy, and 100% turnkey project execution.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-3.5"
          >
            <a
              href="#projects"
              className="relative overflow-hidden group flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-full transition-all duration-300 shadow-xl hover:shadow-amber-500/25 hover:scale-[1.04] active:scale-[0.98]"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-sweep pointer-events-none" />
              <span className="relative z-10">Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform text-slate-950" />
            </a>

            <button
              onClick={onOpenConsultationModal}
              className="flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-white/25 hover:border-amber-400/50 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-[1.03] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Free Site Visit</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-[1.03] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-200"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>10-Year Structural Guarantee</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Itemized BOQ Pricing</span>
            </div>
          </motion.div>
        </motion.div>

        {/* STATS BANNER WITH SHINY TEXT & REVEAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/15 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl"
        >
          <div className="border-r border-slate-800/80 last:border-0 pr-3 sm:pr-4">
            <p className="text-2xl sm:text-4xl font-black font-display shiny-text-gold">
              {COMPANY_INFO.completedProjects}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">
              Projects Completed
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Residential & Commercial</p>
          </div>

          <div className="border-r border-slate-800/80 lg:border-r last:border-0 pr-3 sm:pr-4">
            <p className="text-2xl sm:text-4xl font-black font-display shiny-text-light">
              {COMPANY_INFO.happyClients}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">
              Satisfied Families
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Virudhachalam & Tamil Nadu</p>
          </div>

          <div className="border-r border-slate-800/80 last:border-0 pr-3 sm:pr-4">
            <p className="text-2xl sm:text-4xl font-black font-display shiny-text-gold">
              {COMPANY_INFO.experienceYears}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">
              Years Standing
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Uncompromising Quality</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-4xl font-black font-display shiny-text-light">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium uppercase tracking-wider mt-1">
              Google Rating
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Based on 68 Verified Reviews</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

