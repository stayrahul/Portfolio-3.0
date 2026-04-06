"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuGithub, LuTwitter, LuMail, LuInstagram, LuFacebook } from "react-icons/lu";
import { TbBrandTiktok, TbBrandWhatsapp } from "react-icons/tb";

import { quentine } from "@/app/fonts";
import { selfData } from "@/constant/";
import spaceImg from "@/assets/images/space.png";

const floatingParticles = [
  { x: "10%", y: "25%", color: "hsl(var(--primary))", duration: 7 },
  { x: "85%", y: "45%", color: "hsl(var(--secondary))", duration: 8 },
  { x: "40%", y: "75%", color: "hsl(var(--primary))", duration: 9 },
  { x: "75%", y: "15%", color: "hsl(var(--secondary))", duration: 10 },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: LuGithub, href: `https://github.com/${selfData.socials_username.github}`, label: "GitHub" },
    { icon: LuInstagram, href: `https://instagram.com/${selfData.socials_username.instagram}`, label: "Instagram" },
    { icon: LuFacebook, href: `https://facebook.com/${selfData.socials_username.facebook}`, label: "Facebook" },
    { icon: TbBrandWhatsapp, href: `https://wa.me/${selfData.socials_username.whatsapp}`, label: "WhatsApp" },
    { icon: TbBrandTiktok, href: `https://www.tiktok.com/@${selfData.socials_username.tiktok}`, label: "TikTok" },
    { icon: LuTwitter, href: `https://twitter.com/${selfData.socials_username.twitter}`, label: "Twitter" },
    { icon: LuMail, href: `mailto:${selfData.email}`, label: "Email" },
  ];

  return (
    <footer className="relative bg-background/10 border-t border-white/5 overflow-hidden py-8">
      {/* Space Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url(${spaceImg.src})`, backgroundSize: "cover" }}
      />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* 1. LEFT: Identity */}
          <div className="flex items-center gap-3 order-2 lg:order-1 flex-1 justify-start">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 p-1.5"
            >
              <Image src="/images/logo.png" alt="Logo" fill className="p-1 object-contain" />
            </motion.div>
            <span className={`${quentine.className} text-xl text-primary/80 tracking-wide`}>
              {selfData.name}
            </span>
          </div>

          {/* 2. CENTER: Copyright Area */}
          <div className="flex flex-col items-center justify-center gap-1.5 order-1 lg:order-2 flex-1 text-center">
             <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium opacity-50">
              &copy; {currentYear} 
              <span className="text-foreground font-bold tracking-normal uppercase ml-1"> {selfData.name}</span>
              <span className="mx-3 opacity-20">|</span>
              All rights reserved
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-20 italic font-light">
              Built with Passion • Kathmandu, Nepal
            </p>
          </div>

          {/* 3. RIGHT: Social Icons (No BG, Reduced Length) */}
          <div className="flex items-center gap-2 order-3 flex-1 justify-center lg:justify-end">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative group p-2 text-muted-foreground/50 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                <link.icon 
                  size={18} 
                  className="group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)] transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

        </div>
      </div>

      {/* Floating Particles */}
      {floatingParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '1px', height: '1px',
            background: particle.color,
            left: particle.x, top: particle.y,
            boxShadow: `0 0 4px ${particle.color}`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </footer>
  );
};