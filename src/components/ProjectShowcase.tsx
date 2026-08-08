import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Maximize2,
  Calendar,
  Building,
  X,
  Layers,
  Sparkles,
  CheckCircle2,
  Grid,
  ChevronRight
} from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Project } from '../types';

interface ProjectShowcaseProps {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
  onOpenConsultationModal: (title?: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  selectedProjectId,
  onClearSelectedProject,
  onOpenConsultationModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalBlueprintMode, setModalBlueprintMode] = useState(false);

  // Auto select modal project if selectedProjectId is provided
  React.useEffect(() => {
    if (selectedProjectId) {
      const proj = PROJECTS.find((p) => p.id === selectedProjectId);
      if (proj) {
        setActiveModalProject(proj);
      }
    }
  }, [selectedProjectId]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'villas', label: 'Luxury Villas' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'structural', label: 'Structural Engg.' },
    { id: 'interiors', label: 'Interiors' },
    { id: 'renovation', label: 'Renovation' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const closeModal = () => {
    setActiveModalProject(null);
    setModalBlueprintMode(false);
    if (onClearSelectedProject) {
      onClearSelectedProject();
    }
  };

  // Close modal on Escape key press and prevent body scrolling when modal is open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Project Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Our Landmark <span className="shiny-text-blue">Completed Handovers.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 font-normal leading-relaxed">
            Explore our architectural portfolio built across Virudhachalam, Cuddalore, Neyveli, and surrounding regions.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-COLUMN MOBILE & MASONRY GRID SHOWCASE */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl border border-slate-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              onClick={() => setActiveModalProject(proj)}
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-36 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 bg-[#0F172A]/80 backdrop-blur-md text-amber-300 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                    {proj.constructionType}
                  </div>

                  {/* Zoom Overlay Button */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 sm:p-3 bg-white/90 rounded-full text-slate-900 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#1E3A8A] font-semibold mb-1 sm:mb-2">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>

                  <h3 className="text-xs sm:text-xl font-bold text-[#0F172A] font-display mb-1 sm:mb-2 group-hover:text-[#1E3A8A] transition-colors leading-tight">
                    {proj.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 mb-2 sm:mb-4 leading-tight sm:leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                      <span>{proj.area}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:justify-end">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                      <span>Completed {proj.completionYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-3 pb-3 sm:px-6 sm:pb-6 pt-1 sm:pt-2 flex items-center justify-between text-[10px] sm:text-xs font-semibold text-[#1E3A8A] group-hover:text-[#0F172A]">
                <span className="truncate">View Specs & Blueprint</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN PROJECT LIGHTBOX & BLUEPRINT MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-4xl w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-auto max-h-[85vh] sm:max-h-[90vh] flex flex-col z-[110] cursor-default"
            >
              {/* Prominent Floating Close Button */}
              <button
                onClick={closeModal}
                aria-label="Close project modal"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto flex-1">
                {/* Top Hero Image Banner with Blueprint Mode Toggle */}
                <div className="relative h-64 sm:h-80 md:h-[380px] overflow-hidden bg-slate-900">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Blueprint Mode Overlay */}
                  {modalBlueprintMode && (
                    <div className="absolute inset-0 bg-[#1E3A8A]/60 mix-blend-multiply backdrop-blur-[2px] flex items-center justify-center">
                      <div className="p-4 sm:p-6 rounded-2xl border-2 border-dashed border-amber-300 text-center text-white font-mono">
                        <p className="text-amber-300 font-bold uppercase tracking-widest text-xs sm:text-sm">
                          STRUCTURAL BLUEPRINT METRICS
                        </p>
                        <p className="text-[11px] sm:text-xs mt-1">Rebar: Tata Tiscon Fe550D • Foundation: Deep Footing</p>
                        <p className="text-[11px] sm:text-xs text-slate-300 mt-1">Tested Concrete Strength: M30 Grade</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-4 sm:p-8">
                    <div className="text-white space-y-1">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-400 text-slate-950 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                          {activeModalProject.constructionType}
                        </span>
                        <button
                          onClick={() => setModalBlueprintMode(!modalBlueprintMode)}
                          className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-bold text-white flex items-center gap-1 border border-white/30 cursor-pointer"
                        >
                          <Grid className="w-3 h-3 text-amber-300" />
                          <span>{modalBlueprintMode ? 'Photo Mode' : 'Blueprint Mode'}</span>
                        </button>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-extrabold font-display leading-tight pr-10">
                        {activeModalProject.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{activeModalProject.location}</span>
                        <span>•</span>
                        <span>{activeModalProject.area}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Body Specifications */}
                <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1.5 sm:mb-2">
                      Project Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2.5 sm:mb-3">
                      Engineering Specs & Key Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {activeModalProject.highlights.map((hl, i) => (
                        <div key={i} className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Reference Box */}
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-amber-900">Client Reference</p>
                      <p className="text-xs text-slate-700">{activeModalProject.clientName}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                      Verified Handover
                    </span>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500 text-center sm:text-left">
                      Want a similar build in Virudhachalam?
                    </div>
                    <button
                      onClick={() => {
                        const title = activeModalProject.title;
                        closeModal();
                        onOpenConsultationModal(`Project Inquiry: ${title}`);
                      }}
                      className="px-6 py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-semibold text-xs rounded-full shadow-md transition-colors cursor-pointer"
                    >
                      Discuss Similar Project
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
