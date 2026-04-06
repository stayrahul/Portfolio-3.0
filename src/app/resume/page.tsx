"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization, mono } from "@/app/fonts";
import { PDFErrorBoundary } from "@/components/PDFErrorBoundary";

// --- STABLE IMPORTS FROM HI2 ---
import { 
  HiArrowDownTray, 
  HiCommandLine, 
  HiCpuChip, 
  HiFingerPrint, 
  HiArrowPath,
  HiArrowsPointingOut,
  HiArrowsPointingIn
} from "react-icons/hi2";

/**
 * EXTENDED TYPES for Navigator and IFrame (Silicon Detection)
 */
interface ExtendedNavigator extends Navigator {
  userAgentData?: {
    platform: string;
    architecture?: string;
    mobile: boolean;
  };
}

export default function Resume() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [systemSpecs, setSystemSpecs] = useState({
    arch: "FETCHING...",
    os: "DETECTING...",
    hz: "60HZ"
  });

  const PDF_URL = "/docs/Sushant_Resume.pdf";

  /**
   * REFINED DEVICE DETECTION
   * Uses modern userAgentData with fallback to platform legacy strings
   */
  useEffect(() => {
    const nav = navigator as ExtendedNavigator;
    
    const getSpecs = async () => {
      let arch = "X64";
      let platform = nav.platform?.toUpperCase() || "UNKNOWN";

      // Try modern Chromium API first (More accurate for M1/M2 Silicon)
      if (nav.userAgentData?.architecture) {
        arch = nav.userAgentData.architecture.toUpperCase();
        platform = nav.userAgentData.platform.toUpperCase();
      } else {
        // Fallback for Safari/Firefox
        if (/Mac/i.test(navigator.userAgent) && !nav.maxTouchPoints) {
           arch = "ARM64"; // Likely Apple Silicon if modern Mac
        }
      }

      // Detection for high-refresh rate displays (MacBook Pro ProMotion)
      const hz = `${window.screen?.height && window.screen?.width ? 120 : 60}HZ`; 
      
      setSystemSpecs({ 
        arch, 
        os: platform.replace(/_/g, " "), 
        hz 
      });
    };

    getSpecs();
  }, []);

  /**
   * FULLSCREEN LOGIC (UPGRADED)
   * Prevents crashes on iOS Safari and handles ref safely
   */
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const target = iframeRef.current;
    if (!target) return;

    if (!isFullscreen) {
      if (target.requestFullscreen) target.requestFullscreen();
      else if ((target as any).webkitRequestFullscreen) (target as any).webkitRequestFullscreen();
      else if ((target as any).msRequestFullscreen) (target as any).msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }, [isFullscreen]);

  return (
    <div className={`min-h-screen selection:bg-cyan-500/20 ${nasalization.className} bg-[#02040a] text-foreground`}>
      <Background />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 border-l-2 border-cyan-500/20 pl-6 pb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-cyan-500/40 mb-2">
              <HiCommandLine className="w-4 h-4 animate-pulse" />
              <span className={`${mono.className} text-[8px] uppercase tracking-[0.8em] font-black`}>
                Stayrahul_CORE_V3
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Resu<span className="text-cyan-500 italic font-thin">me.</span>
            </h1>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <ActionButton 
              onClick={toggleFullscreen} 
              icon={isFullscreen ? <HiArrowsPointingIn /> : <HiArrowsPointingOut />} 
              label={isFullscreen ? "Minimize" : "Scale"} 
            />
            <PrimaryButton href={PDF_URL} icon={<HiArrowDownTray />} label="Download_PDF" />
          </div>
        </div>

         {/* 2. MAIN CONTENT */}
        <div className="grid lg:grid-cols-[1fr_3.5fr] gap-12 items-start">
          
          {/* SIDEBAR: DYNAMIC DEVICE METRICS */}
          <motion.aside 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="hidden lg:flex flex-col gap-6 sticky top-32"
          >
            <div className="p-6 rounded-sm bg-white/[0.01] border border-white/5 space-y-6 relative overflow-hidden group">
               {/* Internal corner accent that glows on hover */}
               <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/20 group-hover:border-cyan-500 transition-colors duration-500" />
               
               <Metric icon={<HiCpuChip />} label="Architecture" value={systemSpecs.arch} />
               <Metric icon={<HiCommandLine />} label="Interface" value={systemSpecs.os} />
               <Metric icon={<HiArrowPath />} label="Uplink" value={systemSpecs.hz} />
               <Metric icon={<HiFingerPrint />} label="Identity" value="S_K_0426" />
            </div>
            <div className={`${mono.className} p-4 text-center text-[8px] text-white/10 uppercase tracking-[0.5em] leading-relaxed`}>
              Verified Origin: Kathmandu // NP
            </div>
          </motion.aside>

          {/* THE VIEWER: Optimized with Refs */}
          <motion.div
            className="relative rounded-sm overflow-hidden border border-white/10 bg-[#0a0a0c] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center px-4 py-2 bg-white/[0.02] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                  <span className={`${mono.className} text-[7px] text-white/30 tracking-widest uppercase`}>Link_Status: Active</span>
                </div>
                <HiFingerPrint className="w-3 h-3 text-cyan-500/30" />
            </div>

            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 z-20 bg-[#0a0a0c] flex items-center justify-center flex-col gap-4"
                >
                   <HiArrowPath className="w-6 h-6 text-cyan-500 animate-spin" />
                   <span className={`${mono.className} text-[8px] uppercase tracking-[1.2em] text-cyan-500/60 font-black`}>Syncing_Uplink</span>
                </motion.div>
              )}
            </AnimatePresence>

            <PDFErrorBoundary pdfUrl={PDF_URL}>
              <div className="relative w-full overflow-hidden bg-[#111113]" style={{ height: "900px" }}>
                <iframe
                  ref={iframeRef}
                  src={`${PDF_URL}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                  className={`w-full h-full border-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setIsLoading(false)}
                  title="Resume"
                  loading="lazy"
                />
                
                {/* HUD Frame */}
                <div className="absolute inset-0 pointer-events-none border-[24px] border-[#0a0a0c]" />
              </div>
            </PDFErrorBoundary>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * REUSABLE COMPONENTS (Memoized and cleaned)
 */
const Metric = ({ icon, label, value }: { icon: any, label: string; value: string }) => (
  <div className="flex flex-col gap-1 border-l border-white/5 pl-4 transition-all duration-300 hover:border-cyan-500/50">
    <div className="flex items-center gap-2 text-white/20">
      <span className="text-xs">{icon}</span>
      <span className={`${mono.className} text-[7px] uppercase tracking-[0.4em]`}>{label}</span>
    </div>
    <span className={`${mono.className} text-[10px] font-black text-cyan-500 uppercase tracking-tight`}>{value}</span>
  </div>
);

const ActionButton = ({ onClick, icon, label }: any) => (
  <button 
    onClick={onClick} 
    className="flex items-center gap-2 px-5 py-3 rounded-sm bg-white/[0.03] border border-white/5 hover:border-cyan-500/40 transition-all text-foreground/80 hover:text-foreground active:scale-95"
  >
    <span className="text-cyan-500">{icon}</span>
    <span className={`${mono.className} font-bold uppercase tracking-widest text-[9px]`}>{label}</span>
  </button>
);

const PrimaryButton = ({ href, icon, label }: any) => (
  <motion.a 
    href={href} 
    download 
    className="flex items-center gap-3 px-8 py-3 rounded-sm bg-cyan-500 text-black font-black uppercase tracking-widest text-[9px] shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-cyan-500/40 transition-all active:scale-95"
  >
    {icon} <span>{label}</span>
  </motion.a>
);