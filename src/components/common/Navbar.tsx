"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Fill, RiCloseLargeFill } from "react-icons/ri";
import { quentine } from "@/app/fonts";
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

  // Function to determine active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY;

    // 1. FORCE HOME: If we are within 100px of the top, it's always Home
    if (scrollPosition < 100) {
      setActiveSection("home");
      return;
    }

    // 2. CHECK SECTIONS: Find which section is currently in view
    for (const link of navLinks) {
      const element = document.getElementById(link.id);
      if (element) {
        const offsetTop = element.offsetTop - 200; // Adjust for navbar height
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
      
      // Update UI states
      setIsScrolled(currentScrollY > 20);
      updateActiveSection();

      // Show/Hide Navbar logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check on mount
    updateActiveSection();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateActiveSection]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none"
    >
      <div
        className={`max-w-4xl mx-auto rounded-full transition-all duration-500 border pointer-events-auto ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-2 px-3" 
            : "bg-transparent border-transparent py-4 px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-9 h-9 rounded-full overflow-hidden bg-white/5 border border-white/10"
            >
               <Image src="/images/logo.png" alt="logo" fill className="p-1 object-contain" />
            </motion.div>
            <span className={`${quentine.className} text-xl tracking-tight hidden md:block text-foreground/90`}>
              {selfData.name}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2">
            <Button
              variant={isScrolled ? "default" : "outline"}
              size="sm"
              className="rounded-full px-6 h-9 font-medium transition-all"
              asChild
            >
              <Link href="https://wa.me/+9779826216084" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </Link>
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <RiCloseLargeFill size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <RiMenu4Fill size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="md:hidden absolute left-4 right-4 top-20 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl font-semibold transition-colors ${
                      activeSection === link.id ? "text-primary" : "text-white/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};