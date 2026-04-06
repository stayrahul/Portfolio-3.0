"use client";

import Link from "next/link";
import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { nasalization, mono } from "@/app/fonts";

interface ProjectCardProps {
  index: number;
  title: string;
  desc: string;
  github: string;
  demo?: string;
  tech: string[];
}

export const ProjectCard: FC<ProjectCardProps> = ({
  index,
  title,
  desc,
  github,
  demo,
  tech,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full group"
    >
      <Card
        className="relative h-full flex flex-col overflow-hidden border-white/5 bg-white/[0.01] backdrop-blur-xl transition-all duration-500 group-hover:border-primary/40 group-hover:bg-white/[0.03] rounded-2xl p-6"
      >
        {/* 1. TOP SECTION: Index & Title */}
        <div className="space-y-2 mb-4">
          <span className={`${mono.className} text-[9px] text-primary/40 font-bold tracking-[0.3em]`}>
            ID: 0{index + 1}
          </span>
          <h3 className={`${nasalization.className} text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors`}>
            {title}
          </h3>
        </div>

        {/* 2. MIDDLE SECTION: Description & Tech */}
        <div className="space-y-4 mb-8 flex-grow">
          <p className="text-[13px] leading-relaxed text-muted-foreground/60 line-clamp-3 italic">
            {desc}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 3).map((t) => (
              <Badge
                key={t}
                variant="outline"
                className={`${mono.className} text-[8px] uppercase px-2 py-0.5 border-primary/10 bg-primary/5 text-primary/60 rounded-md`}
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* 3. BOTTOM CENTER BUTTONS */}
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/5">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            <a href={github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="mr-2 h-3.5 w-3.5" />
              Github
            </a>
          </Button>

          {demo && (
            <Button
              asChild
              size="sm"
              className="h-9 px-4 rounded-xl bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all font-bold text-[10px] uppercase tracking-widest"
            >
              <Link href={demo} target="_blank" rel="noopener noreferrer">
                <FiExternalLink className="mr-2 h-3.5 w-3.5" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>

        {/* Subtle Bottom Glow Line */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-primary/50 blur-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </Card>
    </motion.div>
  );
};