"use client";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { BsSend, BsSendCheck } from "react-icons/bs";
import { Card } from "../ui/card";

export const ContactFormCard = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formValues, setFormValues] = useState({
    senderName: "",
    senderEmail: "",
    reasonToContact: "General inquries",
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
          setFormValues({ senderName: "", senderEmail: "", reasonToContact: "General inquries", senderMsg: "" });
          resolve("Success");
        } else {
          const data = await response.json();
          reject(new Error(data.error || "Failed to send"));
        }
      } catch (error) {
        reject(error);
      } finally {
        setIsSending(false);
      }
    });

    toast.promise(sendEmailPromise, {
      loading: "Transmitting message...",
      success: "Got it! I'll be in touch soon.",
      error: (err) => err.message,
    });
  };

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => setIsSent(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const inputStyles = "w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground/30 outline-none transition-all focus:bg-white/[0.06] focus:border-primary/50 focus:ring-4 focus:ring-primary/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="perspective-1000 group h-full"
    >
      <Card className="relative overflow-hidden border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl rounded-[2.5rem] p-1 transition-all duration-500 group-hover:border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <form onSubmit={sendEmail} className="relative z-10 p-6 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-1 font-bold">Your Name</label>
              <input required type="text" name="senderName" placeholder="Full Name" value={formValues.senderName} onChange={handleChange} className={inputStyles} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-1 font-bold">Email Address</label>
              <input required type="email" name="senderEmail" placeholder="Email Address" value={formValues.senderEmail} onChange={handleChange} className={inputStyles} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-1 font-bold">Inquiry Type</label>
            <div className="relative">
              <select name="reasonToContact" value={formValues.reasonToContact} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer`}>
                <option value="General inquries">General Inquiries</option>
                <option value="Project inquiries">Project Inquiries</option>
                <option value="Collaboration">Collaboration Request</option>
                <option value="Feedback">Feedback / Question</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-1 font-bold">Message</label>
            <textarea required name="senderMsg" rows={4} placeholder="Tell me about your vision..." value={formValues.senderMsg} onChange={handleChange} className={`${inputStyles} resize-none`} />
          </div>

          <motion.button
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSending}
            className="group relative w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold text-sm tracking-widest uppercase overflow-hidden shadow-[0_20px_40px_rgba(var(--primary-rgb),0.2)] disabled:opacity-70 transition-all flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isSending ? (
                <motion.div 
                  key="loading"
                  className="flex items-center justify-center gap-3 w-full"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </motion.div>
              ) : isSent ? (
                <motion.div 
                  key="sent"
                  className="flex items-center justify-center gap-2 w-full"
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                >
                  <BsSendCheck size={18} /> <span>Message Delivered</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  className="flex items-center justify-center gap-2 w-full"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <span>Send Message</span>
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5, y: -5 }}
                  >
                    <BsSend size={18} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </Card>
    </motion.div>
  );
};