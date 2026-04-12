"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuGithub, LuTwitter, LuMail, LuInstagram, LuFacebook } from "react-icons/lu";
import { TbBrandTiktok, TbBrandWhatsapp } from "react-icons/tb";

import { quentine, mono, nasalization } from "@/app/fonts";
import { selfData } from "@/constant/";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: LuGithub, href: `https://github.com/${selfData.socials_username.github}`, label: "GitHub" },
    { icon: LuInstagram, href: `https://instagram.com/${selfData.socials_username.instagram}`, label: "Instagram" },
    { icon: LuFacebook, href: `https://facebook.com/${selfData.socials_username.facebook}`, label: "Facebook" },
    { icon: TbBrandWhatsapp, href: `https://wa.me/${selfData.socials_username.whatsapp}`, label: "WhatsApp" },
    { icon: TbBrandTiktok, href: `https://www.tiktok.com/@${selfData.socials_username.tiktok}`, label: "TikTok" },
    { icon: LuTwitter, href: `https://twitter.com/${selfData.socials_username.twitter}`, label: "Twitter" },
    { icon: LuMail, href: `mailto:${selfData.email.toLowerCase()}`, label: "Email" }, // Forced lowercase
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.03] py-0 md:py-0 overflow-hidden">
      
      {/* BACKGROUND TEXTURE: Tactical Dot Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-08 md:gap-2 py-2">

          {/* 2. MIDDLE ROW: IDENTITY WATERMARK */}
          <div className="py-6 border-y border-white/[0.03] flex flex-col items-center justify-center gap-8">
             <h2 className={`${quentine.className} text-5xl md:text-6xl lg:text-6xl text-white/5 hover:text-primary transition-colors duration-1000 cursor-default select-none lowercase`}>
                stayrahul
             </h2>
             </div>
          
          {/* 1. TOP ROW: BRANDING & TELEMETRY */}
<div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 md:gap-2 border-b border-white/[0.03] pb-4 md:pb-0 md:border-none">
  
  {/* BRANDING - Centered on mobile */}
  <div className="flex flex-col items-center md:items-start gap-0">
    <div className="relative w-8 h-8 grayscale opacity-40">
      <Image 
  src="/images/logo.png" 
  alt="Logo" 
  fill 
  sizes="50px" 
  priority 
/>
    </div>
    <div className="flex flex-col items-center md:items-start leading-none">
      <span className={`${nasalization.className} text-xl md:text-lg text-white tracking-tighter uppercase`}>
        Sushant<span className="text-primary ml-1">©</span>
      </span>
      <span className={`${mono.className} text-[6px] md:text-[7px] uppercase tracking-[0.5em] text-white/20 mt-2`}>
        System_Build_2.0.26
      </span>
    </div>
  </div>

  {/* TELEMETRY - Now handles small screens gracefully */}
  <div className="flex gap-2 mb:0 md:gap-4 items-center justify-center w-full md:w-auto">
    <div className="flex flex-col items-center md:items-end">
      <span className={`${mono.className} text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/20 mb-1`}>
        Location
      </span>
      <span className={`${mono.className} text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold`}>
        Kathmandu, Nepal
      </span>
    </div>

    <div className="h-6 w-[1px] bg-white/5" />

    <div className="flex flex-col items-center md:items-end">
      <span className={`${mono.className} text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/20 mb-1`}>
        Status
      </span>
      <div className="flex items-center gap-1.5">
         <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
         <span className={`${mono.className} text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold`}>
           Online
         </span>
      </div>
    </div>
  </div>
</div>

          {/* 2. MIDDLE ROW: SOCIALS */}
             <div className="flex items-center justify-center gap-2 md:gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="p-2 text-white/20 hover:text-primary transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  title={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            
          </div>

          {/* 3. BOTTOM ROW: COPYRIGHT & SOCIALS */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            
            <div className="flex flex-col items-center lg:items-start gap-2 order-2 lg:order-1">
              <p className={`${mono.className} text-[9px] uppercase tracking-[0.4em] text-white/30`}>
                &copy; {currentYear} Sushant. All rights reserved.
              </p>
              <p className={`${mono.className} text-[7px] uppercase tracking-[0.2em] text-white/10 italic`}>
                Built with technical precision • Kathmandu, Nepal
              </p>
            </div>

            

          </div>
        </div>
      </div>
    </footer>
  );
};