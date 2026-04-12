"use client";

import { nasalization, mono, quentine } from "@/app/fonts";
import { selfData } from "@/constant";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const PreLoader = () => {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // High-speed countdown for "Data Stream" effect
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : 100));
    }, 15);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2400); // Snappier exit for better UX

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }} // "Cutter" exit effect
          transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-8 md:p-16 overflow-hidden"
        >
          {/* 1. TOP TELEMETRY: ASYMMETRIC DATA */}
          <div className="flex justify-between items-start z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-primary animate-pulse" />
                <span className={`${mono.className} text-[8px] tracking-[0.5em] text-white/40 uppercase`}>
                  System_Handshake
                </span>
              </div>
              <p className={`${mono.className} text-[7px] text-white/10 uppercase tracking-[0.3em]`}>
                AUTH_REF: 0x2A9F // KTM_NP
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`${mono.className} text-2xl md:text-4xl font-black text-white tabular-nums tracking-tighter`}>
                {counter}%
              </span>
              <span className={`${mono.className} text-[7px] text-primary uppercase tracking-[0.4em]`}>
                Loading_Assets
              </span>
            </div>
          </div>

          {/* 2. CENTER: KINETIC ARCHETYPE (SCALED FOR IPHONE) */}
          <div className="relative flex flex-col items-start justify-center">
             {/* Huge Ghost Number behind everything */}
             <span className={`${nasalization.className} absolute -left-10 text-[60vw] text-white/[0.01] pointer-events-none select-none`}>
               {counter.toString().padStart(2, '0')}
             </span>

             <div className="flex flex-col gap-0 md:gap-4 relative z-10">
                <motion.span 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`${nasalization.className} text-[18vw] md:text-[12vw] text-white leading-[0.8] tracking-tighter`}
                >
                  {selfData.first_name.toUpperCase()}
                </motion.span>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 ml-8 md:ml-16"
                >
                  <div className="h-[1px] w-12 md:w-24 bg-primary/40" />
                  <span className={`${quentine.className} text-[12vw] md:text-[8vw] text-primary italic leading-none`}>
                    {selfData.last_name}
                  </span>
                </motion.div>
             </div>
          </div>

          {/* 3. BOTTOM: PROGRESS ARCHITECTURE */}
          <div className="flex flex-col gap-8 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="border-l border-white/10 pl-3">
                  <span className={`${mono.className} text-[6px] text-white/20 uppercase tracking-widest`}>Kernel</span>
                  <span className={`${mono.className} text-[8px] text-white/60 block`}>Stable_v2</span>
               </div>
               <div className="border-l border-white/10 pl-3">
                  <span className={`${mono.className} text-[6px] text-white/20 uppercase tracking-widest`}>Mode</span>
                  <span className={`${mono.className} text-[8px] text-white/60 block`}>Production</span>
               </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <span className={`${mono.className} text-[7px] uppercase tracking-[0.6em] text-white/20`}>
                  Deployment_Protocol
                </span>
                <span className={`${mono.className} text-[7px] text-primary font-bold`}>
                  {counter === 100 ? "SUCCESS" : "RUNNING"}
                </span>
              </div>
              {/* SURGICAL PROGRESS TRACK */}
              <div className="w-full h-[2px] bg-white/[0.03] overflow-hidden">
                <motion.div 
                  className="h-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${counter}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center opacity-20">
              <span className={`${mono.className} text-[7px] uppercase tracking-[0.5em]`}>
                © 2026 // SUSHANT_DEV
              </span>
              <div className="flex gap-1">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-1 h-1 bg-white rounded-full" />
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};