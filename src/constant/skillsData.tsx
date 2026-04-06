import React from "react";

import {
  FaHtml5,
  FaCss3,
  FaSquareJs,
  FaJava,
  FaPython,
  FaReact,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaLaptopCode,
  FaMobile,
  FaTruckMoving,
  FaWheelchair,
  FaCodeBranch,
  FaRobot,
  FaSearchengin,
  FaGaugeHigh,
} from "react-icons/fa6";

import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiVercel,
  SiPostman,
  SiReplit,
  SiFramer,
} from "react-icons/si";

import { TbBrandCpp } from "react-icons/tb";
import { MdApi } from "react-icons/md";
import { GrOracle } from "react-icons/gr";
import { GiBrain } from "react-icons/gi";

interface LogoProps {
  title: string;
  logoComponent: React.FC;
  color?: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

export const skillsData: SkillsDataProps[] = [
  {
    title: "Languages & Databases",
    data: [
      { title: "C/C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3, color: "#1572B6" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "Oracle SQL", logoComponent: GrOracle, color: "#F80000" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    data: [
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#000000" },
      { title: "Express.js", logoComponent: SiExpress, color: "#d4d4d8" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "Bootstrap", logoComponent: FaBootstrap, color: "#7952B3" },
      { title: "Framer Motion", logoComponent: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Tools & Platforms",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#181717" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Vercel", logoComponent: SiVercel, color: "#000000" },
      { title: "Firebase", logoComponent: SiFirebase, color: "#FFCA28" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Replit", logoComponent: SiReplit, color: "#667881" },
    ],
  },
  {
    title: "Concepts & Technologies",
    data: [
      { title: "API Design", logoComponent: MdApi, color: "#5C2D91" },
      { title: "Full-Stack Development", logoComponent: FaLaptopCode, color: "#607D8B" },
      { title: "Responsive Design", logoComponent: FaMobile, color: "#009688" },
      { title: "Accessibility", logoComponent: FaWheelchair, color: "#1E88E5" },
      { title: "SEO Optimization", logoComponent: FaSearchengin, color: "#FF5722" },
      { title: "Performance Optimization", logoComponent: FaGaugeHigh, color: "#388E3C" },
      { title: "CI/CD", logoComponent: FaTruckMoving, color: "#0A66C2" },
      { title: "Machine Learning & AI", logoComponent: GiBrain, color: "#3F51B5" },
      { title: "Test Automation", logoComponent: FaRobot, color: "#9C27B0" },
      { title: "Version Control", logoComponent: FaCodeBranch, color: "#4CAF50" },
    ],
  },
];