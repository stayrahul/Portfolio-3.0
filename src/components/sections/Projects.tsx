"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { nasalization, mono, quentine } from "@/app/fonts";
import { ProjectCard } from "../Cards";
import { projectsData } from "@/constant/";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="projects"
      className="py-24 md:py-40 bg-[#050505] relative overflow-hidden border-t border-white/[0.02]"
    >
      {/* BACKGROUND DECOR - Huge ghost text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className={`${nasalization.className} text-[20vw] leading-none uppercase whitespace-nowrap`}>
          Selected_Artifacts
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. HEADER: ARCHETYPE STYLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "60px" } : {}}
              className="h-[1px] bg-primary"
            />
            <h2 className={`${nasalization.className} text-6xl md:text-8xl font-black tracking-tighter uppercase text-white`}>
              Artifacts<span className="text-primary">.</span>
              <span className={`${quentine.className} block text-4xl md:text-5xl text-primary lowercase italic font-thin -mt-4 tracking-normal`}>
                build_logs
              </span>
            </h2>
          </div>
          
          <div className="max-w-xs text-right md:text-left">
            <p className={`${mono.className} text-[9px] uppercase tracking-[0.4em] text-white/30 leading-relaxed`}>
              Phase 02 // Functional Output <br />
              Systematic deployment of scalable digital solutions.
            </p>
          </div>
        </div>

        {/* 2. THE GALLERY GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projectsData.map((proj, index) => (
            <div key={proj.name} className="group relative">
              {/* Refined Index Number */}
              <div className="absolute -top-6 left-0">
                <span className={`${mono.className} text-[8px] text-white/20 tracking-[0.5em] group-hover:text-primary transition-colors`}>
                  REF_0{index + 1}
                </span>
              </div>
              
              <ProjectCard
                index={index}
                title={proj.name}
                desc={proj.description}
                github={proj.github_link}
                demo={proj.demo}
                tech={proj.tech}
                // Ensure your ProjectCard inside Cards.tsx uses standard colors 
                // and no flashy borders to match this aesthetic
              />

              {/* Bottom detail line for a more "designed" look */}
              <div className="mt-6 h-[1px] w-full bg-white/5 origin-left group-hover:bg-primary/40 group-hover:scale-x-110 transition-all duration-700" />
            </div>
          ))}
        </motion.div>

        {/* 3. SYSTEM STATUS FOOTER */}
        <div className="mt-24 pt- border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`${mono.className} text-[8px] text-white/20 uppercase tracking-[0.3em]`}>
            Archive v.2.0.26
          </div>
          <div className="flex gap-1">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};