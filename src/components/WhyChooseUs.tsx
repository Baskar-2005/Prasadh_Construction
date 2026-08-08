import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Shield, Award, Sparkles, AlertTriangle } from 'lucide-react';
import { COMPARISON_METRICS } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Why Prasadh Construction
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            We Deliver More Than Just <span className="shiny-text-blue">Strong Buildings.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Compare our structural engineering standards against traditional unorganized local builders. Experience total peace of mind.
          </p>
        </motion.div>

        {/* COMPARISON CARD GRID CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Others Column */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-rose-100 mb-6">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 font-display">
                    Standard Local Contractors
                  </h3>
                  <p className="text-xs text-rose-600 font-medium">Typical Non-Technical Practices</p>
                </div>
              </div>

              <div className="space-y-4">
                {COMPARISON_METRICS.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {metric.feature}
                    </p>
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{metric.others}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-100 text-center">
              <span className="text-xs font-semibold text-rose-600">
                High Risk of Budget Escalation & Structural Crack Defects
              </span>
            </div>
          </div>

          {/* VS Divider badge for desktop */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#0F172A] text-amber-300 font-black text-xl font-display flex items-center justify-center shadow-xl border-4 border-white">
              VS
            </div>
          </div>

          {/* RIGHT: Prasadh Construction Column */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#1E3A8A] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Gold Accent Light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-900 text-amber-300 rounded-2xl">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Prasadh Construction
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> M.E. Structural Engineering Precision
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase">
                  RECOMMENDED
                </span>
              </div>

              <div className="space-y-4">
                {COMPARISON_METRICS.map((metric, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-colors">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      {metric.feature}
                    </p>
                    <div className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{metric.prasadh}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1">
                <Award className="w-4 h-4" /> 10-Year Structural Integrity Warranty & Fixed Price BOQ
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
