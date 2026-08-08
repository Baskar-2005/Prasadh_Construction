import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, ArrowLeftRight } from 'lucide-react';
import heroVillaImage from '../assets/images/luxury_villa_hero_1786117380623.jpg';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
            Site Transformation
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Before & After <span className="shiny-text-blue">Precision Execution.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Drag the slider to see how raw land and bare plot foundations are transformed into turnkey luxury architectural masterpieces.
          </p>
        </motion.div>

        {/* COMPARISON SLIDER STAGE */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
          >
            {/* AFTER IMAGE (Luxury Completed Villa) */}
            <img
              src={heroVillaImage}
              alt="Completed Prasadh Luxury Residence"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 z-10 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFTER • Completed Villa</span>
            </div>

            {/* BEFORE IMAGE (Bare Plot / Construction Foundation) */}
            <div
              style={{ width: `${sliderPosition}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden z-10 border-r-2 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
                alt="Bare Site Before Construction"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />

              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                <span>BEFORE • Raw Site Plot</span>
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
            <span>Slide left/right to compare plot groundwork vs finished structure</span>
          </p>
        </div>

      </div>
    </section>
  );
};
