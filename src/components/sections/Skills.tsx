"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect, useState, FC } from "react";
import { nasalization, mono } from "@/app/fonts";
import { skillsData } from "@/constant";
import { SkillCard } from "@/components/Cards";

const Marquee: FC<{ skills: any[]; direction: "left" | "right" }> = ({ skills, direction }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) setWidth(marqueeRef.current.scrollWidth / 3);
  }, [skills]);

  return (
    <div className="relative py-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        ref={marqueeRef}
        className="flex gap-4 items-center"
        animate={{ x: direction === "right" ? [0, -width] : [-width, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex-shrink-0 scale-75 md:scale-90 hover:scale-100 transition-transform duration-300">
             <SkillCard 
                title={skill.title} 
                Icon={skill.logoComponent} 
                color={skill.color}
                className="!p-2 !bg-transparent border-none shadow-none" // Stripping internal padding to make it smaller
             />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="skills" ref={ref} className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* 1. COMPACT HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div className="space-y-1">
             <motion.span 
               initial={{ opacity: 0 }}
               animate={isInView ? { opacity: 0.5 } : {}}
               className={`${mono.className} text-[10px] uppercase tracking-[0.3em] text-primary font-bold`}
             >
               Tech Stack
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               className={`${nasalization.className} text-3xl md:text-4xl font-bold tracking-tighter`}
             >
               Expertise<span className="text-primary">.</span>
             </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : {}}
            className="text-xs max-w-[240px] leading-relaxed italic"
          >
            A streamlined collection of tools I use to build the future.
          </motion.p>
        </div>

        {/* 2. THE COMPACT DOCK CONTAINER */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-4 md:p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle internal glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="space-y-6">
            {skillsData.map((category: any, idx: number) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-3 mb-1 px-2">
                   <div className="h-[1px] w-4 bg-primary/30 group-hover:w-8 transition-all" />
                   <span className={`${mono.className} text-[9px] uppercase tracking-widest text-muted-foreground/50 group-hover:text-primary transition-colors`}>
                    {category.title}
                   </span>
                </div>
                <Marquee 
                  skills={category.data} 
                  direction={idx % 2 === 0 ? "right" : "left"} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. FOOTER TAG */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/30 font-bold border border-white/5 px-4 py-1 rounded-full">
            Continuous Learning
          </div>
        </motion.div>
      </div>
    </section>
  );
};