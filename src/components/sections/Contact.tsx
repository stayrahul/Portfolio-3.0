"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { IoMailOutline, IoLocationOutline, IoTerminalOutline } from "react-icons/io5";

import { selfData } from "@/constant";
import { nasalization, mono, quentine } from "@/app/fonts";
import { ContactFormCard, ContactSocials } from "@/components/Cards";

export const Contact = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} id="contact" className="py-24 md:py-40 bg-[#050505] relative overflow-hidden border-t border-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. HEADER: ARCHETYPE UPLINK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-primary">
              <div className="h-[1px] w-8 bg-primary" />
              <span className={`${mono.className} text-[10px] uppercase tracking-[0.5em] font-black`}>
                Signal_Origin: KTM.SYS
              </span>
            </div>
            <h2 className={`${nasalization.className} text-6xl md:text-8xl font-black tracking-tighter uppercase text-white`}>
              UPLINK<span className="text-primary">.</span>
              <span className={`${quentine.className} block text-4xl md:text-5xl text-primary lowercase italic font-thin -mt-4 tracking-normal`}>
                contact_protocol
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className={`${mono.className} text-[9px] max-w-[280px] uppercase tracking-[0.3em] leading-relaxed text-white text-right`}
          >
            Transmission ready. Currently accepting <br /> 
            new projects and collaborations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* 2. LEFT SIDE: DATA TERMINAL (5 Columns) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative p-8 border border-white/5 bg-white/[0.01] group">
              {/* Corner Brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-primary" />
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-primary" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className={`${mono.className} text-[10px] uppercase tracking-[0.4em] text-white/40 font-black`}>
                    Identity_Data
                  </h3>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-primary/40 rounded-full" />
                    <div className="w-1 h-1 bg-primary/10 rounded-full" />
                  </div>
                </div>
                
                <div className="grid gap-6">
                  <ContactItem
                    icon={IoMailOutline}
                    label="Mail_Server"
                    value={selfData.email}
                    href={`mailto:${selfData.email}`}
                  />
                  <ContactItem
                    icon={IoLocationOutline}
                    label="Coordinates"
                    value="Simraungadh, Nepal" // High-end abbreviation
                    href="https://www.google.com/maps/place/Simraungadh,+Nepal"
                  />
                </div>
              </div>
            </div>

            {/* Social Hub: Refined Strip */}
            <div className="py-8 border-t border-white/5 flex flex-col items-center lg:items-start gap-6">
               <h3 className={`${mono.className} text-[8px] uppercase tracking-[0.6em] text-white/20 font-bold`}>
                 Network_Nodes
               </h3>
              <ContactSocials />
            </div>
          </div>

          {/* 3. RIGHT SIDE: THE ENCRYPTION FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative p-1 border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-700"
            >
              {/* Form Label for mobile accessibility */}
              <div className="absolute -top-6 left-4 px-6 bg-[#050505]">
                <span className={`${mono.className} text-[8px] uppercase tracking-[0.5em] text-primary`}>
                  Input_Field
                </span>
              </div>
              <ContactFormCard />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, value, href }: any) => {
  // Determine if this is the email item
  const isEmail = label.toLowerCase().includes("mail");

  const content = (
    <div className="group flex items-center gap-5 transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center border border-white/5 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
        <Icon size={18} />
      </div>
      <div>
        <p className={`${mono.className} text-[8px] uppercase tracking-[0.4em] text-white/20 mb-1`}>
          {label}
        </p>
        <p 
          className={`text-sm font-bold tracking-widest text-white/70 group-hover:text-primary transition-colors ${
            isEmail ? "lowercase" : "uppercase"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return href ? <a href={href} className="block">{content}</a> : content;
};