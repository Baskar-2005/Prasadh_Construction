import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, CheckCircle2, Send, Download, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { useCMS } from '../context/CMSContext';

interface CostEstimatorProps {
  onOpenConsultationModal: (details?: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onOpenConsultationModal }) => {
  const { estimatorRates, companyInfo } = useCMS();
  const [areaSqFt, setAreaSqFt] = useState<number>(2400);
  const [packageType, setPackageType] = useState<'standard' | 'premium' | 'sovereign'>('premium');
  const [floors, setFloors] = useState<number>(2); // G+1
  const [includeStructuralDesign, setIncludeStructuralDesign] = useState<boolean>(true);
  const [includeInterior, setIncludeInterior] = useState<boolean>(false);
  const [includeApproval, setIncludeApproval] = useState<boolean>(true);

  // Cost Per Sq Ft Logic
  const getRatePerSqFt = () => {
    switch (packageType) {
      case 'standard': return estimatorRates.standardRate;
      case 'premium': return estimatorRates.premiumRate;
      case 'sovereign': return estimatorRates.sovereignRate;
    }
  };

  const baseRate = getRatePerSqFt();
  const rawBaseCost = areaSqFt * baseRate * (1 + (floors - 1) * 0.12);
  
  const structAddon = includeStructuralDesign ? estimatorRates.structAddon : 0;
  const interiorAddon = includeInterior ? areaSqFt * estimatorRates.interiorAddonPerSqFt : 0;
  const approvalAddon = includeApproval ? estimatorRates.approvalAddon : 0;

  const totalEstimatedCost = Math.round(rawBaseCost + structAddon + interiorAddon + approvalAddon);

  // Material Quantities Approximations
  const estimatedSteelTons = (areaSqFt * estimatorRates.steelMultiplier * (1 + (floors - 1) * 0.15)).toFixed(1);
  const estimatedCementBags = Math.round(areaSqFt * estimatorRates.cementMultiplier * (1 + (floors - 1) * 0.12));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleWhatsAppEstimate = () => {
    const text = `Hello Prasadh Construction! I generated a cost estimate on your website:
• Built-up Area: ${areaSqFt} Sq. Ft.
• Floors: ${floors === 1 ? 'Ground Floor' : `G+${floors - 1}`}
• Package: ${packageType.toUpperCase()} (₹${baseRate}/sq.ft.)
• Total Estimated Budget: ${formatCurrency(totalEstimatedCost)}
Please share an itemized BOQ for my site in Virudhachalam.`;

    const url = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="cost-estimator" className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Interactive Construction Tool
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Instant Budget & <span className="shiny-text-blue">Material Estimator.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Configure your dream plot parameters below to receive a transparent, real-time construction cost and material quantity estimate.
          </p>
        </motion.div>

        {/* ESTIMATOR CALCULATOR CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Controls Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-200/80 space-y-6">
            
            {/* 1. Built-up Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Built-up Area (Sq. Ft.)
                </label>
                <span className="text-lg font-extrabold text-[#1E3A8A] font-display bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
                  {areaSqFt.toLocaleString()} Sq. Ft.
                </span>
              </div>
              <input
                type="range"
                min={600}
                max={8000}
                step={50}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>600 Sq. Ft. (Starter)</span>
                <span>4,000 Sq. Ft.</span>
                <span>8,000 Sq. Ft. (Estate)</span>
              </div>
            </div>

            {/* 2. Package Tier Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-3">
                Quality Specification Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Standard */}
                <div
                  onClick={() => setPackageType('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    packageType === 'standard'
                      ? 'bg-[#0F172A] text-white border-[#1E3A8A] shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider">Standard</p>
                  <p className="text-lg font-black font-display mt-1">₹2,050 <span className="text-xs font-normal opacity-80">/sq.ft</span></p>
                  <p className="text-[10px] opacity-80 mt-1">Quality basics, vitrified tiles, standard rebar.</p>
                </div>

                {/* Premium */}
                <div
                  onClick={() => setPackageType('premium')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                    packageType === 'premium'
                      ? 'bg-[#0F172A] text-white border-amber-400 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                    POPULAR
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Premium</p>
                  <p className="text-lg font-black font-display mt-1">₹2,350 <span className="text-xs font-normal opacity-80">/sq.ft</span></p>
                  <p className="text-[10px] opacity-80 mt-1">Teak wood doors, Tata Tiscon steel, Kohler fittings.</p>
                </div>

                {/* Sovereign */}
                <div
                  onClick={() => setPackageType('sovereign')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    packageType === 'sovereign'
                      ? 'bg-[#0F172A] text-white border-[#1E3A8A] shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Sovereign Turnkey</p>
                  <p className="text-lg font-black font-display mt-1">₹2,750 <span className="text-xs font-normal opacity-80">/sq.ft</span></p>
                  <p className="text-[10px] opacity-80 mt-1">Italian marble, smart home, solar ready & interiors.</p>
                </div>

              </div>
            </div>

            {/* 3. Floors Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-3">
                Building Elevation (Floors)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { num: 1, label: 'Ground (G)' },
                  { num: 2, label: 'G + 1' },
                  { num: 3, label: 'G + 2' },
                  { num: 4, label: 'G + 3' }
                ].map((f) => (
                  <button
                    key={f.num}
                    onClick={() => setFloors(f.num)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      floors === f.num
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Engineering Consultancy Add-ons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-3">
                Optional Engineering Add-ons
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeStructuralDesign}
                      onChange={(e) => setIncludeStructuralDesign(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1E3A8A]"
                    />
                    <span>3D Structural Analysis & Rebar Blueprint</span>
                  </div>
                  <span className="font-bold text-slate-700">+₹45,000</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeApproval}
                      onChange={(e) => setIncludeApproval(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1E3A8A]"
                    />
                    <span>DTCP / Panchayat Building Approval Assistance</span>
                  </div>
                  <span className="font-bold text-slate-700">+₹25,000</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeInterior}
                      onChange={(e) => setIncludeInterior(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1E3A8A]"
                    />
                    <span>Turnkey Interior Woodwork & False Ceiling</span>
                  </div>
                  <span className="font-bold text-slate-700">+₹450 / sq.ft</span>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Live Estimate Summary Output */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-4">
              <Calculator className="w-4 h-4" />
              <span>Real-Time Construction Estimate</span>
            </div>

            <div className="pb-6 border-b border-slate-800">
              <p className="text-xs text-slate-400">Total Estimated Project Budget</p>
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-1">
                {formatCurrency(totalEstimatedCost)}
              </p>
              <p className="text-[11px] text-amber-300 font-medium mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Includes Zero Price Escalation Protection
              </p>
            </div>

            {/* Material Allocations */}
            <div className="py-6 border-b border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Material Allocation Preview
              </h4>

              <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Tata Tiscon Fe550D Steel:</span>
                <span className="font-bold text-amber-300">~{estimatedSteelTons} Metric Tons</span>
              </div>

              <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">UltraTech / Ramco Cement:</span>
                <span className="font-bold text-amber-300">~{estimatedCementBags} Bags</span>
              </div>

              <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Teak Wood & Joinery:</span>
                <span className="font-bold text-amber-300">100% Grade A Teak</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleWhatsAppEstimate}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Get Detailed Itemized BOQ via WhatsApp</span>
              </button>

              <button
                onClick={() => onOpenConsultationModal(`Calculated Estimate: ${formatCurrency(totalEstimatedCost)} for ${areaSqFt} Sq.Ft.`)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/20 transition-all"
              >
                Book Site Consultation for This Estimate
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
