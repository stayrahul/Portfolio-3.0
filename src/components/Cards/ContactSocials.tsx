"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaInstagram, 
  FaWhatsapp, 
  FaTiktok, 
  FaFacebook, 
  FaTwitter 
} from "react-icons/fa6";

import { selfData } from "@/constant";

const socialLinks = [
  { 
    Icon: FaGithub, 
    link: `https://github.com/${selfData.socials_username.github}`,
    color: "hover:bg-[#24292e]", // GitHub Gray
    shadow: "hover:shadow-[#24292e]/40"
  },
  { 
    Icon: FaInstagram, 
    link: `https://instagram.com/${selfData.socials_username.instagram}`,
    color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]", // Insta Gradient
    shadow: "hover:shadow-pink-500/40"
  },
  { 
    Icon: FaWhatsapp, 
    link: `https://wa.me/${selfData.socials_username.whatsapp}`,
    color: "hover:bg-[#25D366]", // WhatsApp Green
    shadow: "hover:shadow-green-500/40"
  },
  { 
    Icon: FaTiktok, 
    link: `https://tiktok.com/@${selfData.socials_username.tiktok}`,
    color: "hover:bg-[#000000]", // TikTok Black
    shadow: "hover:shadow-cyan-500/40"
  },
  { 
    Icon: FaFacebook, 
    link: `https://facebook.com/${selfData.socials_username.facebook}`,
    color: "hover:bg-[#1877F2]", // Facebook Blue
    shadow: "hover:shadow-blue-600/40"
  },
  { 
    Icon: FaTwitter, 
    link: `https://twitter.com/${selfData.socials_username.twitter}`,
    color: "hover:bg-[#1DA1F2]", // Twitter Blue
    shadow: "hover:shadow-sky-400/40"
  },
];

export const ContactSocials = () => {
  return (
    <div className="mt-12">
      <motion.ul 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
          }
        }}
        className="flex flex-wrap gap-5"
      >
        {socialLinks.map((social, index) => (
          <ContactSocialItem
            key={index}
            Icon={social.Icon}
            link={social.link}
            hoverColor={social.color}
            shadowColor={social.shadow}
          />
        ))}
      </motion.ul>
    </div>
  );
};

const ContactSocialItem = ({ 
  Icon, 
  link, 
  hoverColor, 
  shadowColor 
}: { 
  Icon: IconType; 
  link: string; 
  hoverColor: string;
  shadowColor: string;
}) => {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.5, y: 20 },
        show: { opacity: 1, scale: 1, y: 0 }
      }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 ease-out ${hoverColor} ${shadowColor} hover:shadow-2xl hover:-translate-y-2 hover:border-transparent`}
      >
        {/* Subtle Background Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 bg-white" />
        
        <Icon className="relative z-10 w-6 h-6 text-slate-400 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
        
        {/* Animated Border effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
      </Link>
    </motion.li>
  );
};  