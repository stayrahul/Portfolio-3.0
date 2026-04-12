"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect, useState, FC } from "react";
import { nasalization, mono, quentine } from "@/app/fonts"; // Consistency
import { skillsData } from "@/constant";
import { SkillCard } from "@/components/Cards";

const Marquee: FC<{ skills: any[]; direction: "left" | "right" }> = ({ skills, direction }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) setWidth(marqueeRef.current.scrollWidth / 3);
  }, [skills]);

  return (
    <div className="relative py-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        ref={marqueeRef}
        className="flex gap-6 items-center"
        animate={{ x: direction === "right" ? [0, -width] : [-width, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }} // Slower is more premium
      >
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex-shrink-0 flex items-center gap-2 group/item opacity-40 hover:opacity-100 transition-opacity duration-500">
             <SkillCard 
                title={skill.title} 
                Icon={skill.logoComponent} 
                color={skill.color}
                className="!p-0 !bg-transparent border-none shadow-none scale-75 md:scale-90" 
             />
             <span className={`${mono.className} text-[9px] tracking-widest uppercase hidden md:block`}>
               {skill.title}
             </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-24 md:py-40 bg-[#050505] border-t border-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* 1. ARCHETYPE HEADER */}
        <div className="grid md:grid-cols-[1fr_0.5fr] items-end gap-8 mb-16">
          <div className="space-y-4">
             <motion.div
               initial={{ width: 0 }}
               animate={isInView ? { width: "40px" } : {}}
               className="h-[1px] bg-primary"
             />
             <h2 className={`${nasalization.className} text-5xl md:text-7xl font-black tracking-tighter uppercase text-white`}>
               TOOLS<span className="text-primary tracking-normal">.</span>
               <span className={`${quentine.className} lowercase italic text-primary font-thin block text-4xl md:text-5xl -mt-4`}>expertise</span>
             </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.3 } : {}}
            className={`${mono.className} text-[9px] leading-relaxed uppercase tracking-widest text-white`}
          >
            A selective collection of technologies prioritized for performance and aesthetic scalability.
          </motion.p>
        </div>

        {/* 2. THE SPECIFICATION GRID */}
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-sm divide-y divide-white/5">
          {skillsData.map((category: any, idx: number) => (
            <div key={idx} className="group relative grid grid-cols-1 md:grid-cols-[180px_1fr] items-center">
              
              {/* Category Label */}
              <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.01]">
                <div className="flex flex-col gap-1">
                  <span className={`${mono.className} text-[7px] text-primary tracking-[0.4em] uppercase font-bold`}>
                    CAT_00{idx + 1}
                  </span>
                  <span className={`${mono.className} text-[10px] md:text-xs text-white/60 tracking-widest uppercase font-bold group-hover:text-white transition-colors`}>
                    {category.title}
                  </span>
                </div>
              </div>

              {/* Marquee Content */}
              <div className="p-4 md:p-0 overflow-hidden">
                <Marquee 
                  skills={category.data} 
                  direction={idx % 2 === 0 ? "right" : "left"} 
                />
              </div>

              {/* Status Tag (Floating on Desktop) */}
              <div className="hidden lg:block absolute right-6 text-[8px] text-white/10 uppercase tracking-[0.5em]">
                STABLE_RELEASE
              </div>
            </div>
          ))}
        </div>

        {/* 3. FOOTER TELEMETRY */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className={`${mono.className} text-[8px] text-white/20 uppercase tracking-[0.3em]`}>Real-time Stack update</span>
            </div>
          </div>
          <div className={`${mono.className} text-[8px] text-white/20 uppercase tracking-[0.5em]`}>
            Ref: Build_2.0.26 // Kathmandu
          </div>
        </div>
      </div>
    </section>
  );
};