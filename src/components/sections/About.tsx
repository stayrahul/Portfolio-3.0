"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiOutlineMapPin, HiOutlineArrowUpRight, HiOutlineFingerPrint } from "react-icons/hi2";

import { nasalization, mono, quentine } from "@/app/fonts";
import { selfData } from "@/constant";
import Link from "next/link";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section id="about" ref={ref} className="py-24 md:py-40 relative overflow-hidden bg-[#050505]">
      
      {/* SUBTLE AMBIENT DEPTH - Matches the dark theme */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: DOWNSIZED ARTISTIC FRAME */}
          <div className="relative flex justify-center lg:justify-start lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[240px] md:max-w-[280px] aspect-[3/4]" // Smaller, more portrait-focused size
            >
              {/* ASYMMETRIC BORDERS - Very thin for a high-end feel */}
              <div className="absolute -inset-3 border-l border-t border-white/10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-primary/30 pointer-events-none" />

              {/* MAIN IMAGE CONTAINER */}
              <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 ease-out overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src="/images/me1.png"
                  alt={selfData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"

                  className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                  priority
                />
                
                {/* FLOATING DATA PILL */}
                <div className="absolute top-0 left-0">
                  <div className={`${mono.className} px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[7px] tracking-[0.3em] uppercase text-white/70`}>
                    Identity_Verified
                  </div>
                </div>

                {/* BOTTOM CAPTION */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={`${mono.className} text-[6px] text-primary tracking-[0.5em] mb-0.5 uppercase`}>Identity</p>
                      <h4 className="text-white text-[10px] font-bold tracking-[0.2em]">{selfData.name.toUpperCase()}</h4>
                    </div>
                    <HiOutlineFingerPrint className="text-primary/40 w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: EDITORIAL CONTENT */}
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-4"
              >
                <span className={`${mono.className} text-[10px] text-primary uppercase tracking-[0.5em] font-bold`}>
                  Who I am
                </span>
                <div className="h-[1px] flex-grow bg-white/10" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className={`${nasalization.className} text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-white`}
              >
                THE <br />
                <span className={`${quentine.className} text-primary normal-case font-thin italic tracking-normal`}>Archetype</span>
              </motion.h2>
            </div>

            <div className="max-w-xl space-y-8">
              {selfData.about.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <p className="text-base md:text-lg leading-relaxed text-white/40 hover:text-white/80 transition-colors duration-500 font-light">
                    {paragraph}
                  </p>
                </motion.div>
              ))}

              {/* STATS / INFO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                {/* LOCATION */}
                <div className="p-6 bg-white/[0.02] border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
                  <HiOutlineMapPin className="text-primary w-5 h-5 mb-4 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className={`${mono.className} text-[8px] text-white/30 uppercase tracking-[0.4em] block mb-1`}>Location</span>
                    <span className="text-sm text-white/80 font-bold tracking-widest uppercase">Kathmandu // NP</span>
                  </div>
                </div>

                {/* PROJECTS LINK */}
                <Link 
                  href="#projects" 
                  className="group p-6 bg-primary text-black flex flex-col justify-between transition-all duration-500 hover:brightness-110"
                >
                  <div className="flex justify-between items-start">
                    <span className={`${mono.className} text-[8px] uppercase tracking-[0.4em] font-bold`}>Portfolio</span>
                    <HiOutlineArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <span className="text-sm font-black tracking-widest uppercase mt-4">See Work</span>
                </Link>
              </div>

              {/* SYSTEM DETAILS */}
              <div className={`${mono.className} flex gap-8 pt-6 opacity-20 text-[9px] uppercase tracking-[0.3em] text-white`}>
                <span>Status: Online</span>
                <span>V: 2.0.26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};