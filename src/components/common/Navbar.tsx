"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Fill, RiCloseLargeFill } from "react-icons/ri";
import { quentine, mono } from "@/app/fonts";
import { Button } from "../ui/button";
import { selfData } from "@/constant";

const navLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" }
];

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 100) {
      setActiveSection("home");
      return;
    }

    for (const link of navLinks) {
      const element = document.getElementById(link.id);
      if (element) {
        const offsetTop = element.offsetTop - 120;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(link.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      updateActiveSection();

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveSection]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-8 pointer-events-none"
    >
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-700 border pointer-events-auto ${
          isScrolled 
            ? "bg-[#0A0A0A]/80 backdrop-blur-md border-white/10 shadow-2xl py-2 px-3" 
            : "bg-transparent border-transparent py-4 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-white/10 bg-white/5 group-hover:border-primary/50 transition-colors">
               <Image 
  src="/images/logo.png" 
  alt="Logo" 
  fill 
  sizes="50px" 
  priority 
/>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`${quentine.className} text-lg md:text-xl tracking-tight text-white`}>
                {selfData.name.split(' ')[0]}
              </span>
              <span className={`${mono.className} text-[7px] uppercase tracking-[0.3em] text-primary hidden md:block opacity-60`}>
                Creative Dev
              </span>
            </div>
          </Link>

          {/* Floating Pill Nav (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08] backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                  activeSection === link.id ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Area */}
          <div className="flex items-center gap-3">
            <Link href="https://wa.me/+9779826216084" target="_blank">
              <Button
                variant="ghost"
                /* REMOVED: {isScrolled ? 'opacity-100' : 'opacity-0'} */
                /* UPDATED: Added constant border and slight background for visibility */
                className="hidden md:flex rounded-full px-5 h-9 text-[10px] uppercase tracking-widest border border-white/10 bg-white/[0.02] hover:bg-white/10 transition-all opacity-100"
              >
                Inquire
              </Button>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <RiCloseLargeFill size={18} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <RiMenu4Fill size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute left-4 right-4 top-24 bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 shadow-3xl overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            
            <div className="flex flex-col gap-8 relative z-10">
              <span className={`${mono.className} text-[8px] uppercase tracking-[0.5em] text-primary`}>Navigation</span>
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-4xl font-bold tracking-tighter transition-all ${
                        activeSection === link.id ? "text-white" : "text-white/20"
                      }`}
                    >
                      {link.name}<span className="text-primary">.</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                <p className={`${mono.className} text-[10px] text-white/40`}>© 2026 Kathmandu, Nepal</p>
                <Link href="https://wa.me/+9779826216084" className={`${quentine.className} text-2xl text-primary`}>
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};