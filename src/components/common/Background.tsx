"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, useSpring, useTransform } from "framer-motion";

export const Background = () => {
  const springConfig = { damping: 50, stiffness: 90, mass: 1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const [rawPos, setRawPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100;
      const yPct = (e.clientY / window.innerHeight) * 100;
      
      setRawPos({ x: xPct, y: yPct });
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const meshScale = useTransform(mouseX, [-20, 20], [1.05, 1.1]);

  return (
    <div className="fixed inset-0 -z-10 h-[100svh] w-screen overflow-hidden bg-[#020202]">
      
      {/* LAYER 1: THE CORE MESH (Darkened Palette) */}
      <motion.div 
        style={{ x: mouseX, y: mouseY, scale: meshScale }}
        className="absolute inset-0 h-full w-full opacity-40 grayscale-[0.4] contrast-150"
      >
        <MeshGradient
          className="h-full w-full"
          // Swapped light purples for deep navys and pure blacks
          colors={["#000000", "#020617", "#0f172a", "#000000", "#020617"]}
          speed={0.05} // Slower speed for a heavier feel
        />
      </motion.div>

      {/* LAYER 2: INTERACTIVE STEALTH GLOW */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          // Reduced radius and opacity for a more subtle "flashlight" effect
          background: `radial-gradient(450px circle at ${rawPos.x}% ${rawPos.y}%, rgba(99, 102, 241, 0.08), transparent 70%)`,
        }}
      />

      {/* LAYER 3: MICRO-GRAIN (Reduced opacity for darkness) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LAYER 4: THE GLASS PANEL (Increased Blur) */}
      <div className="absolute inset-0 backdrop-blur-[3px] pointer-events-none">
        {/* Deeper inner shadow */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
      </div>

      {/* LAYER 5: SCANLINE OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0) 50%, rgba(255,255,255,0.05) 50%)`,
          backgroundSize: `100% 3px`,
        }}
      />

      {/* LAYER 6: AGGRESSIVE VIGNETTE (Crucial for the 'Dark' look) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />
      
    </div>
  );
};