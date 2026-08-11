import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, ArrowLeftRight, MapPin, Clock, Tag } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const BeforeAfterSlider: React.FC = () => {
  const { beforeAfterProjects } = useCMS();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = beforeAfterProjects[selectedIndex] || beforeAfterProjects[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  if (!activeProject) return null;

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden" id="before-after">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Site Transformation Gallery
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Before & After <span className="shiny-text-blue">Precision Execution.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Select a project below and drag the slider to compare raw site plots or original structures with our completed engineering works.
          </p>
        </motion.div>

        {/* PROJECT SELECTOR TABS */}
        {beforeAfterProjects.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {beforeAfterProjects.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                  selectedIndex === idx
                    ? 'bg-[#0F172A] text-amber-300 ring-2 ring-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{item.title.split(' - ')[0]}</span>
              </button>
            ))}
          </div>
        )}

        {/* COMPARISON SLIDER STAGE */}
        <div className="max-w-4xl mx-auto">
          {/* Active Project Info Card */}
          <div className="mb-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 uppercase">
                {activeProject.category}
              </span>
              <h3 className="text-lg font-extrabold text-[#0F172A] mt-1.5 font-display">
                {activeProject.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {activeProject.description}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold shrink-0">
              <span className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {activeProject.location}
              </span>
              <span className="flex items-center gap-1 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {activeProject.duration}
              </span>
            </div>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
          >
            {/* AFTER IMAGE */}
            <img
              src={activeProject.afterImage}
              alt={`After: ${activeProject.title}`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 z-10 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFTER • Completed Execution</span>
            </div>

            {/* BEFORE IMAGE */}
            <div
              style={{ width: `${sliderPosition}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden z-10 border-r-2 border-white"
            >
              <img
                src={activeProject.beforeImage}
                alt={`Before: ${activeProject.title}`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                <span>BEFORE • Initial Site State</span>
              </div>
            </div>

            {/* SLIDER DIVIDER LINE & HANDLE */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute inset-y-0 z-20 -ml-px w-1 bg-white shadow-2xl flex items-center justify-center pointer-events-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-amber-300 border-2 border-white shadow-xl flex items-center justify-center transform -translate-x-1/2 pointer-events-auto">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 font-medium mt-4 flex items-center justify-center gap-2">
            <Sliders className="w-4 h-4 text-[#1E3A8A]" />
            <span>Slide left/right to compare initial plot state vs finished structure</span>
          </p>
        </div>

      </div>
    </section>
  );
};
