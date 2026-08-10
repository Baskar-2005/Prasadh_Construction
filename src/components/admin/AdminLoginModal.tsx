import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Key, Eye, EyeOff, X, ShieldAlert, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = useCMS();
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = loginAdmin(pinInput);
    if (success) {
      setPinInput('');
      onSuccess();
    } else {
      setErrorMessage('Invalid PIN. Please try default PIN: 1234');
    }
  };

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative p-6 sm:p-8 cursor-default my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close admin login modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E3A8A] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-1">
              Protected Access
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 font-display">
              Admin CMS Login
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your secret PIN to access the website management portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Security PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-800 flex items-center justify-between">
              <span className="font-medium">Default System PIN:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-blue-200 font-bold font-mono text-blue-900">
                1234
              </code>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Unlock CMS Dashboard</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
