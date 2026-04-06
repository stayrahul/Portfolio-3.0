"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { IoMailOutline, IoLocationOutline, IoTerminalOutline } from "react-icons/io5";

import { selfData } from "@/constant";
import { nasalization, mono } from "@/app/fonts";
import { ContactFormCard, ContactSocials } from "@/components/Cards";

export const Contact = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} id="contact" className="py-24 max-w-6xl mx-auto relative overflow-hidden">
      <div className="px-6 relative z-10">
        
        {/* 1. HEADER: Technical & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-primary">
              <IoTerminalOutline size={14} />
              <span className={`${mono.className} text-[10px] uppercase tracking-[0.4em] font-bold`}>
                Communication_Port: 8080
              </span>
            </div>
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter ${nasalization.className}`}>
              Let's <span className="text-primary italic">Connect.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-[11px] max-w-[240px] leading-relaxed italic md:text-right"
          >
            Currently seeking new opportunities and open-source collaborations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. LEFT SIDE: TECHNICAL HUD (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] overflow-hidden group">
              {/* Internal Square Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/30" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/30" />
              
              <div className="space-y-6 relative z-10">
                <h3 className={`${mono.className} text-[10px] uppercase tracking-[0.3em] text-primary/60 font-black mb-8`}>
                  System.Identity_Data
                </h3>
                
                <div className="grid gap-3">
                  <ContactItem
                    icon={IoMailOutline}
                    label="Mail_Server"
                    value={selfData.email}
                    href={`mailto:${selfData.email}`}
                  />
                  <ContactItem
                    icon={IoLocationOutline}
                    label="Base_Coordinates"
                    value={`${selfData.current_location.city}, ${selfData.current_location.country}`}
                    hr
                  />
                </div>
              </div>
            </div>

            {/* Social Hub: Refined */}
            <div className="p-6 rounded-[2rem] border border-white/5 bg-white/[0.01]">
               {/* 1. HEADER: MINIMALIST TEXT */}
    <div className="flex flex-col items-center mb-6">
      <h3 className={`${mono.className} text-[9px] uppercase tracking-[0.6em] text-white/30 font-bold`}>
        Digital_Handshake.sys
      </h3>
      <div className="h-[1px] w-4 bg-white/10 mt-2" />
    </div>
              <ContactSocials />
            </div>
          </div>

          {/* 3. RIGHT SIDE: THE UPLINK FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="h-full rounded-[2rem] border border-white/5 bg-white/[0.01] p-1 hover:border-primary/20 transition-colors duration-700"
            >
              <ContactFormCard />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, value, href }: any) => {
  const content = (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.01] transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
        <Icon size={18} />
      </div>
      <div>
        <p className={`${mono.className} text-[9px] uppercase tracking-widest text-muted-foreground/40`}>
          {label}
        </p>
        <p className="text-sm font-bold tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? <a href={href} className="block">{content}</a> : content;
};