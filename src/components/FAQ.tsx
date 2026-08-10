import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { useCMS } from '../context/CMSContext';

export const FAQ: React.FC = () => {
  const { faqs } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'construction', label: 'Construction' },
    { id: 'cost', label: 'Costing' },
    { id: 'timeline', label: 'Timelines' },
    { id: 'approvals', label: 'Approvals' },
    { id: 'consultancy', label: 'Consultancy' },
    { id: 'warranty', label: 'Warranty' }
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 md:py-28 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            Frequently Asked <span className="shiny-text-blue">Questions.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Clear answers about our engineering process, cost estimates, DTCP approvals, and structural warranties.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search question (e.g., cost, approval, timeline)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] outline-none shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
              No questions found matching your search. Please contact our office directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0F172A] font-display">
                      {faq.question}
                    </span>
                    <span className={`p-1.5 rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-100 text-[#1E3A8A]' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
