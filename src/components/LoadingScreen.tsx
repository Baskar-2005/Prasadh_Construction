import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import prasadhLogoEmblem from '../assets/images/prasadh_logo_emblem_1786205642641.jpg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Smooth non-linear progress acceleration
      const increment = Math.max(2, Math.floor(Math.random() * 8) + 3);
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 700); // Duration matching curtain rise exit transition
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Dynamic status text based on real progress
  const getStatusText = () => {
    if (progress < 35) return "Initializing Blueprint Engine...";
    if (progress < 70) return "Loading Structural Models...";
    if (progress < 95) return "Welcoming to Prasadh Construction";
    return "Engineering Excellence Verified";
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none pointer-events-auto"
        >
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 blueprint-grid-dark opacity-40 pointer-events-none" />

          {/* Radial Ambient Gold & Blue Glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg text-center px-6">
            
            {/* Animated Blueprint Compass Icon Box */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              {/* Outer Rotating Dotted Blueprint Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-amber-400/30 rounded-full"
              />

              {/* Inner Counter-Rotating Pulse Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 border border-blue-400/20 rounded-full"
              />

              {/* Central Glowing 3D Logo Emblem */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-16 h-16 rounded-2xl overflow-hidden border border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center bg-slate-900"
              >
                <img
                  src={prasadhLogoEmblem}
                  alt="Prasadh Logo Emblem"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Laser Line Circle Effect around compass */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full fill-none pointer-events-none"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ ease: 'linear' }}
                  className="stroke-amber-400/80 stroke-[2]"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-0.5 mb-8 flex flex-col items-center"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white font-display leading-tight">
                PRASADH
              </h2>
              <h3 className="text-lg sm:text-xl font-bold tracking-widest text-amber-400 font-display">
                CONSTRUCTION
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 tracking-[0.25em] uppercase font-medium pt-1">
                Structural Consultancy & Engineering • Virudhachalam
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 sm:w-80 space-y-3">
              <div className="relative w-full h-2.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden shadow-inner p-[1px]">
                {/* Champagne Gold Metallic Progress Fill */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Counter & Status Row */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[11px] text-slate-300 font-medium">{getStatusText()}</span>
                </span>
                <span className="font-bold text-amber-400 tracking-wider">
                  {progress}%
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

