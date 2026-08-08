import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  BarChart3,
  DraftingCompass,
  ShieldCheck,
  Layers,
  Building,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

export const Process: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getProcessIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'DraftingCompass': return <DraftingCompass className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
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
            Our Work Process
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            From Concept To Creation, We Build With <span className="shiny-text-blue">Perfection.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Our structured 8-stage engineering process eliminates guesswork, controls costs, and guarantees on-time delivery.
          </p>
        </motion.div>

        {/* 8-STEP HORIZONTAL STEPPER BADGES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#1E3A8A] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold mb-1 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  {step.stepNumber}
                </span>
                <div className={`p-2 rounded-xl mb-1 ${isActive ? 'bg-blue-900 text-amber-300' : 'bg-slate-100 text-[#1E3A8A]'}`}>
                  {getProcessIcon(step.iconName)}
                </div>
                <span className="text-xs font-bold font-display truncate w-full">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STEP FEATURE DISPLAY CARD */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-white shadow-xl bg-white/90 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-amber-300 font-black text-2xl font-display flex items-center justify-center shadow-lg">
                {PROCESS_STEPS[activeStepIndex].stepNumber}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
                  Stage {activeStepIndex + 1} of 8
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A] font-display">
                  {PROCESS_STEPS[activeStepIndex].title} • {PROCESS_STEPS[activeStepIndex].subtitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] bg-amber-50 px-3.5 py-2 rounded-full border border-amber-200">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <span>Quality Milestone Verified</span>
            </div>
          </div>

          <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {PROCESS_STEPS[activeStepIndex].description}
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
            <div className="text-xs text-slate-700">
              <span className="font-bold text-[#1E3A8A] block">Stage Deliverable:</span>
              {PROCESS_STEPS[activeStepIndex].deliverable}
            </div>

            <button
              onClick={() => {
                if (activeStepIndex < PROCESS_STEPS.length - 1) {
                  setActiveStepIndex(activeStepIndex + 1);
                } else {
                  setActiveStepIndex(0);
                }
              }}
              className="px-4 py-2 bg-[#0F172A] text-white text-xs font-semibold rounded-full hover:bg-[#1E3A8A] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{activeStepIndex === PROCESS_STEPS.length - 1 ? 'Restart Process' : 'Next Stage'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
