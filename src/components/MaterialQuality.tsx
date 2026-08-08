import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { MATERIAL_BRANDS } from '../data/mockData';

export const MaterialQuality: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden">
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
            Uncompromising Standards
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            100% Certified Brand & <span className="shiny-text-blue">Material Matrix.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 font-normal leading-relaxed">
            We never compromise on rebar ductility or cement grade. Every batch delivered to your site in Virudhachalam undergoes quality batch verification.
          </p>
        </motion.div>

        {/* MATERIAL CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {MATERIAL_BRANDS.map((mat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-[#1E3A8A] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {mat.category}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {mat.grade}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] font-display mb-2 group-hover:text-[#1E3A8A] transition-colors">
                  {mat.brandName}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                  {mat.benefit}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#1E3A8A]">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Verified Direct Manufacturer Supply</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-white shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-900">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">Concrete Cube & Compression Testing Protocol</p>
              <p className="text-xs text-slate-500">Every RCC slab cast on site is tested for 7-day and 28-day compression strength.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A8A] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
            <span>10-Year Structural Guarantee</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
