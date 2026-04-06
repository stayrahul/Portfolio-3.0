"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create a subtle parallax effect (-10 to 10 range)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-black"
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`,
        transition: "transform 0.2s ease-out", // Smooths the parallax
      }}
    >
      {/* 1. The Mesh Gradient Layer */}
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-80"
        colors={["#000000", "#4c1d95", "#1e1b4b", "#8b5cf6", "#000000"]}
        speed={0.2}
      />

      {/* 2. Film Grain / Noise Overlay (Crucial for "Premium" look) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Cline x1='0' y1='0' x2='200' y2='200' stroke='white'/%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Vignette (Focuses the eye on the center content) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* SVG Filters (Kept for specific component use later) */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};