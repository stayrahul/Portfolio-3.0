"use client";

import { useState, useEffect, useRef, useCallback, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization, mono, quentine } from "@/app/fonts";
import { IconType } from "react-icons";

import { 
  HiArrowDownTray, 
  HiCommandLine, 
  HiCpuChip, 
  HiFingerPrint, 
  HiArrowPath,
  HiArrowsPointingOut,
  HiArrowsPointingIn,
  HiSignal
} from "react-icons/hi2";

interface SystemSpecs {
  arch: string;
  os: string;
  hz: string;
  uptime: string;
}

export default function Resume() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [systemSpecs, setSystemSpecs] = useState<SystemSpecs>({
    arch: "FETCHING...",
    os: "DETECTING...",
    hz: "60HZ",
    uptime: "00:00:00"
  });

  useEffect(() => {
    const startTime = Date.now();
    const fetchTelemetry = async () => {
      // DEFAULT FALLBACKS
      let arch = "ARM64"; 
      let os = "DARWIN // KERNEL";

      // 1. Refresh Rate Detection
      const getHz = () => new Promise((res) => {
        requestAnimationFrame((t1) => {
          requestAnimationFrame((t2) => res(t2 - t1 < 10 ? "120HZ" : "60HZ"));
        });
      });

      // 2. Hardware Detection (Fixing the browser compatibility)
      const nav = navigator as any;
      if (nav.userAgentData) {
        const entropy = await nav.userAgentData.getHighEntropyValues(["architecture"]);
        arch = entropy.architecture?.toUpperCase() || "ARM64";
        os = nav.userAgentData.platform.toUpperCase();
      } else {
        // Safari/Firefox Fallback
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) os = "IOS // MOBILE";
        else if (/Mac/i.test(navigator.userAgent)) os = "MACOS // UNIX";
        else os = "STATION // WEB";
      }

      const hz = await getHz();

      // 3. Uptime Pulse
      const interval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const hrs = Math.floor(diff / 3600).toString().padStart(2, '0');
        const mins = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const secs = (diff % 60).toString().padStart(2, '0');
        
        setSystemSpecs(prev => ({ 
          ...prev, 
          arch, 
          os, 
          hz: hz as string,
          uptime: `${hrs}:${mins}:${secs}` 
        }));
      }, 1000);

      return () => clearInterval(interval);
    };

    fetchTelemetry();
  }, []);

  const toggleFullscreen = useCallback(() => {
    const target = iframeRef.current;
    if (!target) return;
    try {
        if (!isFullscreen) {
          if (target.requestFullscreen) target.requestFullscreen();
          else if ((target as any).webkitRequestFullscreen) (target as any).webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
          else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
        }
    } catch (e) {
        console.warn("Fullscreen protocol failed.");
    }
  }, [isFullscreen]);

  // Sync fullscreen state with browser events
  useEffect(() => {
    const handler = () => setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  return (
    <div className={`min-h-screen selection:bg-cyan-500/20 ${nasalization.className} bg-[#050505] text-foreground`}>
      <Background />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-40 pb-20 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col gap-8 mb-12 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-cyan-500/50" />
                <span className={`${mono.className} text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-cyan-500/60 font-bold`}>
                    Archive_Ref: {systemSpecs.uptime}
                </span>
             </div>
             <h1 className="text-[18vw] md:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] select-none">
               Resu<span className={`${quentine.className} text-cyan-500 italic font-thin normal-case tracking-normal`}>me</span>
             </h1>
          </motion.div>

          <div className="flex flex-row md:justify-end gap-3">
             <ActionButton onClick={toggleFullscreen} icon={isFullscreen ? HiArrowsPointingIn : HiArrowsPointingOut} label={isFullscreen ? "MIN" : "FOCUS"} />
             <PrimaryButton href="/docs/Sushant_Resume.pdf" icon={HiArrowDownTray} label="GET_PDF" />
          </div>
        </div>

        {/* MOBILE TELEMETRY (Hidden on Desktop) */}
        <div className="lg:hidden flex overflow-x-auto gap-8 pb-6 mb-8 border-b border-white/5 no-scrollbar scroll-smooth">
            <Metric icon={HiCpuChip} label="Arch" value={systemSpecs.arch} />
            <Metric icon={HiCommandLine} label="Kernel" value={systemSpecs.os} />
            <Metric icon={HiArrowPath} label="Freq" value={systemSpecs.hz} />
            <Metric icon={HiSignal} label="Uptime" value={systemSpecs.uptime} />
        </div>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-16 items-start">
          
          {/* DESKTOP SIDEBAR */}
          <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hidden lg:flex flex-col gap-12 sticky top-32">
            <div className="space-y-10 p-8 border-l border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
               <Metric icon={HiCpuChip} label="Kernel_Arch" value={systemSpecs.arch} />
               <Metric icon={HiCommandLine} label="Env_Interface" value={systemSpecs.os} />
               <Metric icon={HiArrowPath} label="Refresh_Rate" value={systemSpecs.hz} />
               <Metric icon={HiSignal} label="Uplink_Status" value="ACTIVE" />
            </div>
            <div className="px-8 flex flex-col gap-1">
               <span className={`${mono.className} text-[8px] text-white/20 uppercase tracking-[0.4em]`}>Origin</span>
               <span className={`${mono.className} text-[10px] text-white/60 font-bold uppercase`}>KTM // NP</span>
            </div>
          </motion.aside>

          {/* VIEWER */}
          <motion.div 
            className="relative border border-white/5 bg-[#08080a] shadow-3xl overflow-hidden rounded-sm" 
            initial={{ opacity: 0, scale: 0.99 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* SCANLINES */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

            <div className="flex justify-between items-center px-5 py-4 bg-white/[0.02] border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  <span className={`${mono.className} text-[8px] md:text-[10px] text-white/40 tracking-[0.3em] uppercase`}>Live_Decryption</span>
                </div>
                <HiFingerPrint className="w-4 h-4 text-cyan-500/20" />
            </div>

            <div className="relative w-full overflow-hidden bg-[#0d0d0f] h-[75vh] md:h-[950px]">
              <AnimatePresence>
                {isLoading && (
                   <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#0d0d0f] flex items-center justify-center">
                      <HiArrowPath className="w-6 h-6 text-cyan-500 animate-spin opacity-20" />
                   </motion.div>
                )}
              </AnimatePresence>
              
              <iframe
                ref={iframeRef}
                src="/docs/Sushant_Resume.pdf#view=FitH&toolbar=0&navpanes=0"
                className={`w-full h-full border-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                title="Sushant Resume"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[40px] border-[#08080a]" />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const Metric: FC<{ icon: IconType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-1 md:gap-3 min-w-max border-l border-white/5 pl-4 md:pl-0 md:border-none">
    <div className="flex items-center gap-2 text-white/20">
      <Icon size={12} />
      <span className={`${mono.className} text-[7px] md:text-[9px] uppercase tracking-[0.4em]`}>{label}</span>
    </div>
    <span className={`${mono.className} text-[10px] md:text-[12px] font-black text-white/80 uppercase tracking-widest`}>{value}</span>
  </div>
);

const ActionButton: FC<{ onClick: () => void; icon: IconType; label: string }> = ({ onClick, icon: Icon, label }) => (
  <button onClick={onClick} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 text-white/40 hover:text-white hover:border-cyan-500/30 transition-all active:scale-95 group">
    <Icon className="text-cyan-500 group-hover:scale-110 transition-transform" />
    <span className={`${mono.className} font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]`}>{label}</span>
  </button>
);

const PrimaryButton: FC<{ href: string; icon: IconType; label: string }> = ({ href, icon: Icon, label }) => (
  <motion.a href={href} download className="flex-1 md:flex-none flex items-center justify-center gap-4 px-8 py-4 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/40 transition-all active:scale-95">
    <Icon size={14} /> <span>{label}</span>
  </motion.a>
);