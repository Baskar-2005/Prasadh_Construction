import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Shield, Award, CheckCircle2, Building, Compass, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO, PROJECTS } from '../data/mockData';

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative my-auto max-h-[90vh] overflow-y-auto p-6 sm:p-10 cursor-default"
        >
          <button
            onClick={onClose}
            aria-label="Close company profile modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 print:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* DOCUMENT HEADER */}
          <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-display">
                  PRASADH CONSTRUCTION
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Company & Consultant • Virudhachalam, Tamil Nadu
                </p>
              </div>
            </div>

            <button
              onClick={handlePrintDownload}
              className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-2 print:hidden"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download / Print Profile PDF</span>
            </button>
          </div>

          {/* PROFILE BODY */}
          <div className="py-6 space-y-6 text-slate-800">
            
            {/* Executive Summary */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Official Corporate Brief
              </span>
              <h3 className="text-lg font-bold font-display text-[#0F172A] mt-2">
                Executive Profile & Engineering Credentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-normal">
                {COMPANY_INFO.name} is a leading engineering consultancy and turnkey building execution firm headquartered at {COMPANY_INFO.address}. Founded and headed by {COMPANY_INFO.founder}, the company combines structural load simulation with modern architectural aesthetics.
              </p>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xl font-extrabold text-[#0F172A] font-display">{COMPANY_INFO.completedProjects}</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Projects Delivered</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xl font-extrabold text-[#0F172A] font-display">{COMPANY_INFO.experienceYears}</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Years Industry Standing</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xl font-extrabold text-[#1E3A8A] font-display">100%</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Itemized BOQ Match</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-xl font-extrabold text-emerald-700 font-display">4.9 / 5</p>
                <p className="text-[10px] uppercase font-bold text-slate-500">Google Client Rating</p>
              </div>
            </div>

            {/* Key Services & Capabilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                Capabilities & Practice Areas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Residential Luxury Villas & Bungalows</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Commercial Buildings & Retail Hubs</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>STAAD.Pro & ETABS Structural Analysis</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DTCP & Panchayat Sanction Approvals</span>
                </div>
              </div>
            </div>

            {/* Quality Standard */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold flex items-center gap-1 mb-1">
                <Award className="w-4 h-4 text-amber-600" /> Material Assurance Policy
              </span>
              Exclusive usage of Tata Tiscon Fe550D SD rebar, UltraTech/Ramco cement, Ashirvad lead-free CPVC piping, Finolex FR electrical wires, and 100% Seasoned First-Grade Teak Wood.
            </div>

            {/* Official Contact Footnote */}
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-[#0F172A]">{COMPANY_INFO.name}</p>
              <p>📍 <strong>Main Office:</strong> {COMPANY_INFO.address}</p>
              {COMPANY_INFO.branchAddress && <p>📍 <strong>Branch Office:</strong> {COMPANY_INFO.branchAddress}</p>}
              <p>📞 Phone: {COMPANY_INFO.phone} {COMPANY_INFO.secondaryPhone && `| Alt: ${COMPANY_INFO.secondaryPhone}`} | ✉️ {COMPANY_INFO.email}</p>
              {COMPANY_INFO.gstin && <p className="font-mono text-[11px] text-slate-500">GSTIN: {COMPANY_INFO.gstin}</p>}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
