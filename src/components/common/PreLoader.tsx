"use client";

import { nasalization, mono } from "@/app/fonts";
import { selfData } from "@/constant";
import { motion, AnimatePresence } from "framer-motion";
import { FC, useState, useEffect } from "react";

const NamePart: FC<{ text: string; delay: number }> = ({ text, delay }) => {
  return (
    <div className="relative overflow-hidden px-2">
      <motion.span
        initial={{ y: "100%", opacity: 0, letterSpacing: "0.5em" }}
        animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay }}
        className={`block text-white text-4xl md:text-6xl font-black ${nasalization.className} leading-none tracking-tighter`}
      >
        {text}
      </motion.span>
    </div>
  );
};

export const PreLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 3800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          exit={{ 
            opacity: 0,
            scale: 0.9, // Shrinks away into a point for a "Power Off" look
            filter: "brightness(2) contrast(1.2) blur(10px)",
            transition: { duration: 1, ease: [0.8, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010103] overflow-hidden"
        >
          {/* 1. THE 3D KINETIC CUBE (The "Square" Core) */}
          <div className="absolute inset-0 perspective-[1500px] pointer-events-none flex items-center justify-center">
            <motion.div 
              initial={{ rotateX: 45, rotateZ: 45, opacity: 0, scale: 0.5 }}
              animate={{ rotateX: [45, 90, 45], rotateZ: [45, 135, 45], opacity: 0.15, scale: 1.2 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-[500px] h-[500px] border-[1px] border-cyan-500/40 relative"
            >
              {/* Internal Square Accents */}
              <div className="absolute inset-10 border border-cyan-500/20" />
              <div className="absolute inset-20 border border-cyan-500/10" />
            </motion.div>

            {/* Floor/Ceiling Grids */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                transform: 'rotateX(75deg) translateY(400px) scale(3)',
                maskImage: 'radial-gradient(circle, black, transparent 80%)'
              }} />
            </div>
          </div>

          {/* 2. REFINED HUD CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Minimalist Viewfinder Brackets */}
            <div className="relative p-12 border-x border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
              />
              
              <div className="flex flex-col md:flex-row items-center gap-0 md:gap-4">
                <NamePart text={selfData.first_name} delay={0.2} />
                <div className="hidden md:block w-2 h-2 bg-cyan-500 shadow-[0_0_10px_#22d3ee] rotate-45" />
                <NamePart text={selfData.last_name} delay={0.4} />
              </div>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-cyan-400 to-transparent" 
              />
            </div>

            {/* Micro Technical Data */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-4"
              >
                <span className={`${mono.className} text-[8px] uppercase tracking-[1em] text-white/40`}>
                  System.Protocol.Init
                </span>
                <div className="w-[1px] h-3 bg-white/20" />
                <span className={`${mono.className} text-[8px] uppercase tracking-[1em] text-cyan-400`}>
                  v2.026_Stable
                </span>
              </motion.div>

              {/* Square Node Loading */}
              <div className="flex gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    className="w-1.5 h-1.5 border border-cyan-500/50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3. ATMOSPHERIC OVERLAYS */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Scanline Grain */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '100px' }}
            />
            {/* Luminous Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(1,1,3,0.95) 100%)]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};