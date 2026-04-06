"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { selfData } from "@/constant";
import { quentine, mono } from "@/app/fonts";

export const Hero = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-start px-6 relative"
    >
      {/* BACKGROUND REMOVED: 
          No solid colors, no gradients, no grids. 
          This will now inherit the background of your 'main' or 'body' tag.
      */}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-5xl space-y-12">
          
          {/* 1. Ultra-Clean Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className={`${mono.className} text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground`}>
              {selfData.roles[0]}
            </span>
          </motion.div>

          <div className="space-y-6">
            {/* 2. Focused Typography Headline */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`${quentine.className} text-7xl md:text-[9rem] leading-[0.8] tracking-tighter`}
            >
              <span className="block text-foreground/40 mb-4 text-3xl md:text-5xl font-light tracking-normal">
                Hello, I am
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient-x">
                {selfData.name.split(' ')[0]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl max-w-2xl leading-relaxed text-muted-foreground/80"
            >
              {selfData.bio}
            </motion.p>
          </div>

          {/* 3. High-Contrast Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95"
            >
              <Link href="/resume" className="flex items-center gap-3">
                <span>Resume</span>
                <FiDownload size={18} />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-14 px-10 rounded-2xl font-bold text-foreground/100
             hover:bg-white/[0.5] hover:text-primary hover:border-white/10 
             border border-transparent transition-all active:scale-95 backdrop-blur-sm"

           >
              <Link href={`https://instagram.com/${selfData.socials_username.instagram}`} className="flex items-center gap-3">
                <span>Get in touch</span>
                <FiArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};