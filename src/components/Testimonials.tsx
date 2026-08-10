import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, Quote, ShieldCheck, Plus, X, Send } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';
import { useCMS } from '../context/CMSContext';

export const Testimonials: React.FC = () => {
  const { testimonials, addTestimonial } = useCMS();
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newLocation, setNewLocation] = useState('Virudhachalam');
  const [newProjectType, setNewProjectType] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newComment) return;

    addTestimonial({
      clientName: newClientName,
      location: newLocation,
      projectType: newProjectType || 'Residential Home',
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      projectPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      verified: true
    });

    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddReviewModal(false);
      setNewClientName('');
      setNewComment('');
      setNewProjectType('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden">
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
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] font-display tracking-tight">
            What Our Clients Say <span className="shiny-text-blue">About Us.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
            Real feedback from homeowners, NRIs, and commercial clients in Virudhachalam, Cuddalore, and Chennai.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 p-2 px-4 rounded-full bg-white shadow-sm border border-slate-200">
            <span className="text-xs font-bold text-slate-800">Google Business Score:</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-900 font-display">4.9 / 5.0</span>
            <button
              onClick={() => setShowAddReviewModal(true)}
              className="ml-2 text-[11px] font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Write a Review
            </button>
          </div>
        </motion.div>

        {/* GOOGLE REVIEWS STYLE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-blue-100 transition-colors pointer-events-none" />

              <div>
                {/* Top Google Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6 italic">
                  "{rev.comment}"
                </p>

                {/* Project Photo Preview Thumbnail */}
                <div className="mb-6 rounded-2xl overflow-hidden h-36 bg-slate-100 border border-slate-200">
                  <img
                    src={rev.projectPhoto}
                    alt={rev.projectType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Client Info Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.clientName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-display flex items-center gap-1.5">
                    <span>{rev.clientName}</span>
                    {rev.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 fill-blue-50" title="Verified Client" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.location}</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{rev.projectType}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {showAddReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 relative"
            >
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#0F172A] font-display mb-1">
                Write a Client Review
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Share your experience working with Prasadh Construction Company & Consultant.
              </p>

              {submittedMessage ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800">
                  <p className="font-bold text-base">Thank You!</p>
                  <p className="text-xs mt-1">Your review has been verified and added to our showcase.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. Vignesh K."
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Virudhachalam"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Project Type</label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury Villa"
                        value={newProjectType}
                        onChange={(e) => setNewProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Rating</label>
                    <div className="flex gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Review Feedback</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about the structural quality, timeline, and communication..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-semibold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
