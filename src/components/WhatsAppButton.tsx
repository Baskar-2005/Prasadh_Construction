import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const text = "Hello Prasadh Construction! I would like to inquire about a project in Virudhachalam.";
    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip */}
      <div className="mr-3 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap border border-slate-800">
        Chat with Er. Prasadh on WhatsApp
      </div>

      <button
        onClick={handleClick}
        className="relative p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40 pointer-events-none" />
        <MessageSquare className="w-6 h-6 fill-slate-950 text-emerald-500 relative z-10" />
      </button>
    </div>
  );
};
