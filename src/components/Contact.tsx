import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Building,
  Compass
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ContactProps {
  initialServiceTitle?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialServiceTitle }) => {
  const { companyInfo } = useCMS();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialServiceTitle || 'Residential Villa');
  const [budget, setBudget] = useState('₹30 Lakhs - ₹60 Lakhs');
  const [mapLocationUrl, setMapLocationUrl] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialServiceTitle) {
      setProjectType(initialServiceTitle);
    }
  }, [initialServiceTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Prasadh Construction! I would like to inquire about a project:
• Name: ${name || 'Interested Client'}
• Phone: ${phone || 'N/A'}
• Project Type: ${projectType}
• Budget: ${budget}
• Map Location: ${mapLocationUrl || 'Not provided'}
• Message: ${message || 'Please contact me regarding site visit.'}`;

    const url = `https://wa.me/${companyInfo.whatsapp || '918056658861'}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden">
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
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Let's Build Something <span className="shiny-text-blue">Great Together.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Visit our office in Virudhachalam or send us a message below. Er. V. Prasadh and our engineering team are ready to guide your vision.
          </p>
        </motion.div>

        {/* MAIN CONTACT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Office Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Office Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] font-display pb-4 border-b border-slate-100">
                Office Location & Contact
              </h3>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#1E3A8A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Main Office</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5 leading-relaxed">
                      {companyInfo.address}
                    </p>
                    <p className="text-[11px] text-[#1E3A8A] font-medium mt-1">
                      Virudhachalam & Villupuram Branches
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#1E3A8A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone / Call</h4>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#1E3A8A] block mt-0.5"
                    >
                      Primary: {companyInfo.phone}
                    </a>
                    <a
                      href={`tel:${companyInfo.secondaryPhone}`}
                      className="text-xs text-slate-600 font-semibold hover:text-[#1E3A8A] block mt-0.5"
                    >
                      Secondary: {companyInfo.secondaryPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#1E3A8A] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Email</h4>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#1E3A8A] block mt-0.5 truncate"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-50 text-[#1E3A8A] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Business Hours</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                      {companyInfo.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat directly on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Interactive Google Maps Preview Card */}
            <div className="bg-[#0F172A] text-white p-6 rounded-3xl shadow-md border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Google Maps Location
                </span>
                <a
                  href="https://maps.google.com/?q=Virudhachalam+Tamil+Nadu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
                >
                  Open in Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 mb-3">
                {/* Embed Styled Google Maps Iframe for Virudhachalam */}
                <iframe
                  title="Prasadh Construction Virudhachalam Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.485741639!2d79.3100!3d11.5200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54d5b244444445%3A0x2444444444444445!2sVirudhachalam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>

              <p className="text-[11px] text-slate-300">
                📍 140/2A, Velan Nagar, Aladi Road, Virudhachalam (Landmark: Near Aladi Road Bus Stop)
              </p>
            </div>

          </div>

          {/* RIGHT: Working Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h3 className="text-2xl font-extrabold text-[#0F172A] font-display mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Fill out the project scope details below to request a callback or free site visit.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950 font-display">
                  Inquiry Received Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-bold">{name}</span>. Er. V. Prasadh and our site engineering team will review your project details and contact you at <span className="font-bold">{phone}</span> within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#0F172A] text-white text-xs font-semibold rounded-full hover:bg-[#1E3A8A] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. K. Vignesh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="vignesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Project Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50 text-slate-800"
                    >
                      <option value="Residential Villa">Residential Villa Construction</option>
                      <option value="Commercial Building">Commercial Complex / Hub</option>
                      <option value="Structural Consultancy">Structural Engineering Consultancy</option>
                      <option value="Architectural Planning">2D/3D Architectural Planning</option>
                      <option value="Building Approval">Building Approval Sanction</option>
                      <option value="Interior Design">Luxury Interior Design</option>
                      <option value="Renovation">Renovation & Extension</option>
                      <option value="Turnkey Project">100% Turnkey Execution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Estimated Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50 text-slate-800"
                  >
                    <option value="₹20 Lakhs - ₹35 Lakhs">₹20 Lakhs - ₹35 Lakhs</option>
                    <option value="₹35 Lakhs - ₹60 Lakhs">₹35 Lakhs - ₹60 Lakhs</option>
                    <option value="₹60 Lakhs - ₹1 Crore">₹60 Lakhs - ₹1 Crore</option>
                    <option value="₹1 Crore+ Ultra Luxury">₹1 Crore+ Ultra Luxury</option>
                    <option value="Consultancy Fee Only">Engineering Consultancy Fee Only</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-1.5">
                    <span>Google Maps Location Link (Optional)</span>
                    <span className="text-[10px] text-[#1E3A8A] font-normal">Paste GPS pin or map link</span>
                  </label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="url"
                      placeholder="https://maps.google.com/?q=..."
                      value={mapLocationUrl}
                      onChange={(e) => setMapLocationUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Project Notes & Plot Details</label>
                  <textarea
                    rows={3}
                    placeholder="Provide site location (e.g. Aladi Road, Virudhachalam), plot area, preferred floors, or architectural questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none bg-slate-50/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
