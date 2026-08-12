import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ShieldCheck,
  Compass,
  Target,
  Eye,
  HeartHandshake,
  UserCheck,
  CheckCircle,
  Building2,
  Briefcase
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import engineeringDeskImage from '../assets/images/engineering_desk_1786117394689.jpg';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'values' | 'timeline'>('story');

  const timelineEvents = [
    {
      year: "2014",
      title: "Foundation & Vision",
      desc: "Er. S. Vishnu Prasadh established the firm in Virudhachalam focusing on precision building execution and quality engineering analysis."
    },
    {
      year: "2017",
      title: "Expansion to Turnkey Projects",
      desc: "Expanded from structural consultancy to full turnkey residential & commercial building execution across Cuddalore district."
    },
    {
      year: "2020",
      title: "BIM & 3D Engineering Adoption",
      desc: "Integrated STAAD.Pro load simulation, 3D architectural visualizers, and digital BOQ software for zero cost escalation."
    },
    {
      year: "2024+",
      title: "100+ Landmark Deliveries",
      desc: "Crossed 100+ successful project handovers with a 98% on-time completion record and top-rated client satisfaction."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            About Prasadh Construction
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Engineering Precision Meets <span className="shiny-text-blue">Architectural Artistry.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Headquartered in Virudhachalam, we bridge the gap between traditional Tamil construction and state-of-the-art building engineering.
          </p>
        </motion.div>

        {/* Content Tabs Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-white rounded-full shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'story'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1E3A8A]'
              }`}
            >
              Our Story & Leadership
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'values'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1E3A8A]'
              }`}
            >
              Mission, Vision & Values
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#1E3A8A]'
              }`}
            >
              Growth Timeline
            </button>
          </div>
        </div>

        {/* TAB 1: STORY & LEADERSHIP */}
        {activeTab === 'story' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={engineeringDeskImage}
                  alt="Er. S. Vishnu Prasadh Engineering Studio"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                      Founder
                    </p>
                    <h3 className="text-2xl font-bold font-display mt-0.5">
                      {COMPANY_INFO.founder}
                    </h3>
                    
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
                Built On Integrity, Transparency & Local Trust.
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Prasadh Construction Company & Consultant was established with a singular vision: to bring engineering sophistication to Virudhachalam, Cuddalore, Neyveli, and surrounding regions.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Unlike traditional non-technical contractors, every project undertaken by our company is designed using advanced structural calculation algorithms (STAAD.Pro, ETABS), soil bearing test metrics, and strict compliance with Indian Standard Building Codes (IS 456, IS 1893).
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-200">
                  <ShieldCheck className="w-6 h-6 text-[#1E3A8A] mb-2" />
                  <h4 className="text-sm font-bold text-[#0F172A]">Zero Compromise</h4>
                  <p className="text-xs text-slate-500 mt-1">Only 100% verified Tata Tiscon & UltraTech materials.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-200">
                  <UserCheck className="w-6 h-6 text-[#1E3A8A] mb-2" />
                  <h4 className="text-sm font-bold text-[#0F172A]">Owner Oversight</h4>
                  <p className="text-xs text-slate-500 mt-1">Direct communication with Er. Prasadh on all milestones.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: MISSION, VISION & VALUES */}
        {activeTab === 'values' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="p-8 rounded-3xl bg-white shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-display mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To deliver structurally superior, aesthetically breathtaking, and cost-optimized residential and commercial spaces while setting the gold standard for construction transparency in Tamil Nadu.
                </p>
              </div>
              <ul className="mt-6 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  100% Itemized BOQ Transparency
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Seismic-Resistant Structural Code
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[#0F172A] text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-950 text-amber-400 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">Our Vision</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To be recognized as the premier engineering consultancy and turnkey construction firm trusted across Tamil Nadu for landmark villas, modern commercial hubs, and structural safety.
                </p>
              </div>
              <ul className="mt-6 space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  Building Smart Sustainable Spaces
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400" />
                  Lifetime Structural Guarantee
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-6">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-display mb-3">Core Values</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Integrity, technical accuracy, local commitment, client peace of mind, and absolute devotion to engineering craft above all short-cut practices.
                </p>
              </div>
              <ul className="mt-6 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  On-Time Delivery Protection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Direct WhatsApp Site Reports
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* TAB 3: GROWTH TIMELINE */}
        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {timelineEvents.map((evt, idx) => (
              <div
                key={evt.year}
                className="p-6 rounded-3xl bg-white shadow-md border border-slate-200 relative overflow-hidden group hover:border-[#1E3A8A] transition-colors"
              >
                <span className="text-3xl font-extrabold text-[#1E3A8A] font-display block mb-2">
                  {evt.year}
                </span>
                <h4 className="text-base font-bold text-[#0F172A] mb-2">{evt.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.desc}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Milestone {idx + 1}
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};
