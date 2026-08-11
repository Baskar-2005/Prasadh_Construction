import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialTopic
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [consultationType, setConsultationType] = useState(
    initialTopic || 'Free Site Visit & Structural Consultation'
  );
  const [confirmed, setConfirmed] = useState(false);

  React.useEffect(() => {
    if (initialTopic) {
      setConsultationType(initialTopic);
    }
  }, [initialTopic]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setConfirmed(true);
  };

  const handleWhatsAppBooking = () => {
    const text = `Hello Prasadh Construction! I would like to book a consultation session:
• Name: ${name || 'Interested Client'}
• Phone: ${phone || 'N/A'}
• Subject: ${consultationType}
• Preferred Date: ${date || 'Earliest Available'}
• Time Slot: ${timeSlot}
Location: Virudhachalam / Site Visit`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative p-6 sm:p-8 cursor-default my-auto max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close consultation modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Direct Structural Consultation</span>
          </div>

          <h3 className="text-2xl font-extrabold text-[#0F172A] font-display mb-1">
            Book Free Consultation
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Consult directly with Er. S. Vishnu Prasadh for your project in Virudhachalam.
          </p>

          {confirmed ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-emerald-950 font-display">
                Consultation Session Booked!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you, <span className="font-bold">{name}</span>. Our team has reserved your consultation slot on <span className="font-bold">{date || 'Next Available Slot'}</span> ({timeSlot}). We will call <span className="font-bold">{phone}</span> to confirm details.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-200 text-slate-800 text-xs font-semibold rounded-full hover:bg-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. K. Vignesh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 80566 58861"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Consultation Topic</label>
                <input
                  type="text"
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none text-slate-800"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="05:00 PM - 06:30 PM">05:00 PM - 06:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-semibold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Reserve Consultation Slot</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span>Book Instantly on WhatsApp</span>
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
