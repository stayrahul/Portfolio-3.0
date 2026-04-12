"use client";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { BsSend, BsSendCheck } from "react-icons/bs";
import { Card } from "../ui/card";
import { mono, quentine } from "@/app/fonts";

export const ContactFormCard = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formValues, setFormValues] = useState({
    senderName: "",
    senderEmail: "",
    reasonToContact: "General inquiries",
    senderMsg: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const sendEmailPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          setIsSent(true);
          setFormValues({ senderName: "", senderEmail: "", reasonToContact: "General inquiries", senderMsg: "" });
          resolve("Success");
        } else {
          const data = await response.json();
          reject(new Error(data.error || "Uplink failed."));
        }
      } catch (error) {
        reject(error);
      } finally {
        setIsSending(false);
      }
    });

    toast.promise(sendEmailPromise, {
      loading: "Transmitting...",
      success: "Received.",
      error: (err: any) => err.message,
    });
  };

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => setIsSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  // TIGHTENED STYLES: Reduced padding (py-3), smaller text (text-xs), and smaller radius (rounded-xl)
  const inputStyles = "w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-xs placeholder:text-white/10 outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-primary/30 text-white/70";
  const labelStyles = `${mono.className} text-[7px] uppercase tracking-[0.4em] text-white/20 ml-1 font-bold block mb-1.5`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto h-full" // Added max-w-xl to constrain width
    >
      <Card className="relative overflow-hidden border-white/[0.03] bg-white/[0.01] backdrop-blur-3xl shadow-2xl rounded-[2rem] p-0.5 transition-all duration-700 group-hover:border-primary/10">
        
        <form onSubmit={sendEmail} className="relative z-10 p-6 md:p-8 space-y-6">
          
          {/* 1. HEADER: Reduced scale */}
          <div className="flex flex-col gap-1 items-center text-center">
             <h3 className={`${mono.className} text-[7px] uppercase tracking-[0.5em] text-primary/40`}>
               System // Init
             </h3>
             <h2 className={`${quentine.className} text-3xl md:text-4xl text-white lowercase leading-none`}>
                Start a <span className="text-primary italic">conversation</span>
             </h2>
          </div>

          {/* 2. FORM FIELDS: Denser layout */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={labelStyles}>Identification</label>
                <input required type="text" name="senderName" placeholder="Full Name" value={formValues.senderName} onChange={handleChange} className={inputStyles} />
              </div>
              <div className="space-y-1">
                <label className={labelStyles}>Return_Uplink</label>
                <input required type="email" name="senderEmail" placeholder="Email Address" value={formValues.senderEmail} onChange={handleChange} className={`${inputStyles} lowercase`} />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelStyles}>Classification</label>
              <div className="relative">
                <select name="reasonToContact" value={formValues.reasonToContact} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer uppercase text-[9px] tracking-widest`}>
                  <option className="bg-[#0A0A0A]" value="General inquiries">General Inquiry</option>
                  <option className="bg-[#0A0A0A]" value="Project inquiries">Project Build</option>
                  <option className="bg-[#0A0A0A]" value="Collaboration">Collaboration</option>
                  <option className="bg-[#0A0A0A]" value="Feedback">System Feedback</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelStyles}>Payload</label>
              <textarea required name="senderMsg" rows={3} placeholder="Enter your message here..." value={formValues.senderMsg} onChange={handleChange} className={`${inputStyles} resize-none`} />
            </div>
          </div>

          {/* 3. BUTTON: Reduced height (h-12) */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSending}
            className="group relative w-full h-12 bg-primary text-black rounded-xl font-black text-[10px] tracking-[0.3em] uppercase overflow-hidden shadow-lg disabled:opacity-50 transition-all flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isSending ? (
                <motion.div 
                  key="loading"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Sending</span>
                </motion.div>
              ) : isSent ? (
                <motion.div 
                  key="sent"
                  className="flex items-center gap-2"
                  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                >
                  <BsSendCheck size={14} /> <span>Sent</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <span>Execute</span>
                  <BsSend size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* 4. FOOTER: Minimal telemetry */}
          <div className="pt-3 flex justify-between items-center opacity-10">
             <span className={`${mono.className} text-[6px] uppercase tracking-[0.5em]`}>Encrypted</span>
             <span className={`${mono.className} text-[6px] uppercase tracking-[0.5em]`}>Kathmandu, Nepal</span>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};