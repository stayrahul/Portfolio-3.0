"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LuMapPinned, LuZap, LuArrowUpRight } from "react-icons/lu";

import { quentine, mono } from "@/app/fonts";
import { selfData } from "@/constant";
import Link from "next/link";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* BACKGROUND ELEMENTS REMOVED */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: Reduced Photo & Status */}
          <div className="relative flex flex-col items-center lg:items-end gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Animated Orbit ring */}
              <div className="absolute -inset-4 border border-dashed border-primary/20 rounded-[10rem] animate-[spin_40s_linear_infinite] pointer-events-none" />
              
              {/* THE SMALLER PHOTO CONTAINER */}
              <div className="relative w-56 h-72 md:w-64 md:h-80 overflow-hidden rounded-[10rem] border border-white/10 shadow-2xl bg-muted/20">
                <Image
                  src="/images/me1.png"
                  alt={selfData.name}
                  fill
                  className="object-cover transition-all duration-700  group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Float Experience Tag */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-2xl shadow-xl border-4 border-background"
              >
                <LuZap size={20} className="animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Location Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Kathmandu%2C%20Nepal"
                target="_blank"
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.06] transition-all group"
              >
                <LuMapPinned className="text-primary w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className={`${mono.className} text-[10px] uppercase tracking-widest text-muted-foreground font-bold`}>
                  {selfData.current_location.city}, {selfData.current_location.state}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Typography & Content */}
          <div className="space-y-12 pt-4">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-2 text-primary"
              >
                <div className="h-[1px] w-10 bg-current opacity-50" />
                <span className={`${mono.className} text-[10px] uppercase tracking-[0.4em] font-bold`}>
                  Biography
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className={`${quentine.className} text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.8]`}
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary/80">Me.</span>
              </motion.h2>
            </div>

            <div className="max-w-2xl space-y-8">
              {selfData.about.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium selection:bg-primary/30"
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <Link 
                  href="#projects"
                  className="group inline-flex items-center gap-2 text-foreground font-bold text-lg hover:text-primary transition-colors"
                >
                  Check my work
                  <LuArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};