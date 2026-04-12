"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import { selfData } from "@/constant";
import { quentine, mono } from "@/app/fonts";

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col px-4 py-24 md:px-24 md:py-24 lg:px-12 overflow-hidden bg-background">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      {/* 1. TOP NAV STRIP - Added explicit padding-bottom and z-index */}
      <nav className="flex justify-between items-start z-30 w-full pb-10 md:pb-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className={`${mono.className} text-[10px] md:text-xs tracking-[0.4em] uppercase leading-relaxed`}
        >
          <span className="text-primary font-bold">{selfData.roles[0]}</span> <br />
          <span className="opacity-40">Portfolio // 2026</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-right"
        >
          <Link 
            href={`https://instagram.com/${selfData.socials_username.instagram}`}
            className={`${mono.className} group flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase hover:text-primary transition-all`}
          >
            Connect 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </nav>

      {/* 2. MAIN KINETIC CENTERPIECE - Removed justify-between from parent, using flex-grow and margins */}
      <div className="relative flex flex-col items-center justify-center flex-grow py-12 md:py-0 mt-12 md:mt-0">
        {/* Large Decorative Stroke Text */}
        <h2 className="absolute text-[22vw] font-black opacity-[0.03] dark:opacity-[0.07] pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap">
          {selfData.name.split(' ')[0].toUpperCase()}
        </h2>

        <div className="z-10 text-center space-y-4 md:space-y-6">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${quentine.className} text-7xl sm:text-8xl md:text-[12vw] lg:text-[14vw] leading-[0.8] tracking-tighter`}>
              {selfData.name.split(' ')[0]}
              <span className="text-primary italic">.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
             <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-muted-foreground/80 max-w-[280px] sm:max-w-md md:max-w-3xl mx-auto leading-tight">
               Crafting <span className="text-foreground font-medium underline underline-offset-4 decoration-primary/30">digital experiences</span> that balance technical precision with <span className="italic font-serif">aesthetic beauty.</span>
             </p>
          </motion.div>
        </div>
      </div>

      {/* 3. BOTTOM INFO & ACTIONS - Added pt-12 to push away from center content on small screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-8 md:gap-4 z-20 pt-12 md:pt-0">
        
        {/* Bio */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="hidden md:block space-y-3"
        >
          <p className={`${mono.className} text-[10px] uppercase tracking-[0.3em] text-primary font-bold`}>Biography</p>
          <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[250px]">
            {selfData.bio}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-4 order-3 md:order-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className={`${mono.className} text-[8px] uppercase tracking-[0.4em] opacity-40 rotate-180 [writing-mode:vertical-lr]`}>Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </div>

        {/* CV Link & Location */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center md:items-end gap-4 md:gap-6 order-2 md:order-3"
        >
          <Link href="/resume" className="group relative">
            <span className={`${quentine.className} text-4xl sm:text-5xl md:text-5xl lg:text-6xl hover:text-primary transition-colors duration-500`}>
              Curriculum Vitae
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-foreground/10" />
            <motion.div 
              className="absolute -bottom-1 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-500" 
            />
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className={`${mono.className} text-[9px] md:text-[10px] uppercase tracking-widest opacity-60`}>
              Based in Kathmandu, NP
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
};